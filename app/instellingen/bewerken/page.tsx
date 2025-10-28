"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { InstitutionCalendar } from "@/components/institution-calendar"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { Institution, ProgramDuration } from "@/lib/types"

function EditContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const token = searchParams.get("token")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [institution, setInstitution] = useState<Institution | null>(null)
  const [availability, setAvailability] = useState<Record<string, string[]>>({})

  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    email: "",
    visit_address: "",
    description: "",
    activity_description: "",
    capacity_per_slot: "",
    program_duration: "60" as ProgramDuration,
    comments: "",
  })

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()

        // Fetch institution
        const { data: instData, error: instError } = await supabase
          .from("institutions")
          .select("*")
          .eq("edit_token", token)
          .single()

        if (instError) throw instError

        setInstitution(instData)
        setFormData({
          name: instData.name,
          contact_person: instData.contact_person,
          email: instData.email,
          visit_address: instData.visit_address,
          description: instData.description,
          activity_description: instData.activity_description,
          capacity_per_slot: instData.capacity_per_slot.toString(),
          program_duration: instData.program_duration.toString() as ProgramDuration,
          comments: instData.comments || "",
        })

        // Fetch availability
        const { data: availData, error: availError } = await supabase
          .from("institution_availability")
          .select("*")
          .eq("institution_id", instData.id)

        if (availError) throw availError

        // Group availability by date
        const grouped: Record<string, string[]> = {}
        availData.forEach((slot) => {
          if (!grouped[slot.date]) {
            grouped[slot.date] = []
          }
          grouped[slot.date].push(slot.start_time)
        })
        setAvailability(grouped)
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
        toast({
          title: "Fout",
          description: "Kon gegevens niet laden",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, toast])

  const handleSave = async () => {
    if (!institution) return

    setSaving(true)
    try {
      const supabase = createClient()

      // Update institution
      const { error: updateError } = await supabase
        .from("institutions")
        .update({
          name: formData.name,
          contact_person: formData.contact_person,
          email: formData.email,
          visit_address: formData.visit_address,
          description: formData.description,
          activity_description: formData.activity_description,
          capacity_per_slot: Number.parseInt(formData.capacity_per_slot),
          program_duration: Number.parseInt(formData.program_duration) as ProgramDuration,
          comments: formData.comments || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", institution.id)

      if (updateError) throw updateError

      // Delete old availability
      await supabase.from("institution_availability").delete().eq("institution_id", institution.id)

      // Insert new availability
      const availabilityRecords = Object.entries(availability).flatMap(([date, times]) =>
        times.map((time) => ({
          institution_id: institution.id,
          date,
          start_time: time,
          end_time: calculateEndTime(time, Number.parseInt(formData.program_duration)),
          is_available: true,
        })),
      )

      if (availabilityRecords.length > 0) {
        const { error: availError } = await supabase.from("institution_availability").insert(availabilityRecords)

        if (availError) throw availError
      }

      toast({
        title: "Opgeslagen!",
        description: "Uw wijzigingen zijn succesvol opgeslagen.",
      })

      router.push(`/instellingen/bevestiging?token=${token}`)
    } catch (error) {
      console.error("[v0] Save error:", error)
      toast({
        title: "Fout bij opslaan",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const calculateEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const endMinutes = minutes + duration
    const endHours = hours + Math.floor(endMinutes / 60)
    const finalMinutes = endMinutes % 60
    return `${String(endHours).padStart(2, "0")}:${String(finalMinutes).padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    )
  }

  if (!institution) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Aanmelding niet gevonden</h1>
            <p className="text-gray-600 mb-6">
              De aanmelding kon niet worden gevonden. Controleer de link in uw email.
            </p>
            <Button asChild>
              <Link href="/">Terug naar home</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/instellingen/bevestiging?token=${token}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar bevestiging
          </Link>
        </Button>

        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Gegevens Bewerken</h1>
            <p className="text-gray-600">Pas uw aanmelding aan voor de Culturele INTROWEEK MBO 2026</p>
            <p className="text-sm text-pink-600 font-medium mt-2">U kunt wijzigingen maken tot 1 januari 2026</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Naam van de culturele instelling *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="contact_person">Naam contactpersoon *</Label>
              <Input
                id="contact_person"
                value={formData.contact_person}
                onChange={(e) => setFormData((prev) => ({ ...prev, contact_person: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="email">E-mailadres contactpersoon *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="visit_address">Bezoekadres *</Label>
              <Input
                id="visit_address"
                value={formData.visit_address}
                onChange={(e) => setFormData((prev) => ({ ...prev, visit_address: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="description">Beschrijving van de instelling *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="activity_description">Beschrijving van de activiteit *</Label>
              <Textarea
                id="activity_description"
                value={formData.activity_description}
                onChange={(e) => setFormData((prev) => ({ ...prev, activity_description: e.target.value }))}
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity_per_slot">Aantal klassen per tijdslot *</Label>
                <Input
                  id="capacity_per_slot"
                  type="number"
                  min="1"
                  value={formData.capacity_per_slot}
                  onChange={(e) => setFormData((prev) => ({ ...prev, capacity_per_slot: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="program_duration">Tijdsduur programma (minuten) *</Label>
                <select
                  id="program_duration"
                  value={formData.program_duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, program_duration: e.target.value as ProgramDuration }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="60">60 minuten</option>
                  <option value="75">75 minuten</option>
                  <option value="90">90 minuten</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Beschikbaarheid</h2>
              <InstitutionCalendar availability={availability} onChange={setAvailability} />
            </div>

            <div>
              <Label htmlFor="comments">Opmerkingen / Uitzonderingen</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => setFormData((prev) => ({ ...prev, comments: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button onClick={handleSave} disabled={saving} className="flex-1 bg-pink-500 hover:bg-pink-600">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opslaan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Wijzigingen Opslaan
                  </>
                )}
              </Button>
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href={`/instellingen/bevestiging?token=${token}`}>Annuleren</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function BewerkenPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        </div>
      }
    >
      <EditContent />
    </Suspense>
  )
}
