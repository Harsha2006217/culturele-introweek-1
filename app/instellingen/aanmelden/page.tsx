"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import { InstitutionCalendar } from "@/components/institution-calendar"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { ProgramDuration } from "@/lib/types"

export default function InstellingenAanmeldenPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    institutionName: "",
    generalEmail: "",
    contactPerson: "",
    email: "",
    emailConfirm: "",
    postalAddress: "",
    address: "",
    addressUnknown: false,
    description: "",
    activityDescription: "",
    capacity: "",
    duration: "60" as ProgramDuration,
    comments: "",
  })

  const [logo, setLogo] = useState<File | null>(null)
  const [availability, setAvailability] = useState<Record<string, string[]>>({})
  const [emailError, setEmailError] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "emailConfirm" || field === "email") {
      if (field === "emailConfirm" && value !== formData.email) {
        setEmailError("E-mailadressen komen niet overeen")
      } else if (field === "email" && formData.emailConfirm && value !== formData.emailConfirm) {
        setEmailError("E-mailadressen komen niet overeen")
      } else {
        setEmailError("")
      }
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.email !== formData.emailConfirm) {
      setEmailError("E-mailadressen komen niet overeen")
      return
    }

    if (Object.keys(availability).length === 0) {
      toast({
        title: "Fout",
        description: "Selecteer minimaal één tijdslot in de kalender",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const editToken = crypto.randomUUID()

      let logoUrl = null
      if (logo) {
        const fileExt = logo.name.split(".").pop()
        const fileName = `${editToken}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("institution-logos")
          .upload(fileName, logo)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("institution-logos").getPublicUrl(fileName)

        logoUrl = publicUrl
      }

      const { data: institution, error: institutionError } = await supabase
        .from("institutions")
        .insert({
          name: formData.institutionName,
          general_email: formData.generalEmail,
          contact_person: formData.contactPerson,
          email: formData.email,
          logo_url: logoUrl,
          postal_address: formData.postalAddress,
          visit_address: formData.addressUnknown ? "Nog niet bekend" : formData.address,
          description: formData.description,
          activity_description: formData.activityDescription,
          capacity_per_slot: Number.parseInt(formData.capacity),
          program_duration: Number.parseInt(formData.duration) as ProgramDuration,
          comments: formData.comments || null,
          edit_token: editToken,
        })
        .select()
        .single()

      if (institutionError) throw institutionError

      const availabilityRecords = Object.entries(availability).flatMap(([date, times]) =>
        times.map((time) => ({
          institution_id: institution.id,
          date,
          start_time: time,
          end_time: calculateEndTime(time, Number.parseInt(formData.duration)),
          is_available: true,
        })),
      )

      const { error: availabilityError } = await supabase.from("institution_availability").insert(availabilityRecords)

      if (availabilityError) throw availabilityError

      toast({
        title: "Aanmelding succesvol!",
        description: "U ontvangt een bevestigingsmail met een link om uw gegevens aan te passen.",
      })

      router.push(`/instellingen/bevestiging?token=${editToken}`)
    } catch (error) {
      console.error("[v0] Submission error:", error)
      toast({
        title: "Fout bij aanmelden",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const endMinutes = minutes + duration
    const endHours = hours + Math.floor(endMinutes / 60)
    const finalMinutes = endMinutes % 60
    return `${String(endHours).padStart(2, "0")}:${String(finalMinutes).padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar home
          </Link>
        </Button>

        <Card className="p-8 border-4 border-pink-500">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-purple-900">Aanmelden Culturele Instelling</h1>
            <p className="text-gray-600">
              Meld uw instelling aan voor de Culturele INTROWEEK MBO 2026 (31 augustus - 4 september 2026)
            </p>
            <p className="text-sm text-pink-600 font-bold mt-2">Deadline: 1 maart 2026</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-900">Basisgegevens</h2>

              <div>
                <Label htmlFor="institutionName">Naam van de culturele instelling *</Label>
                <Input
                  id="institutionName"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange("institutionName", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="generalEmail">Algemeen e-mailadres instelling *</Label>
                <Input
                  id="generalEmail"
                  type="email"
                  value={formData.generalEmail}
                  onChange={(e) => handleInputChange("generalEmail", e.target.value)}
                  placeholder="info@instelling.nl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactPerson">Naam contactpersoon *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">E-mailadres contactpersoon *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="emailConfirm">Bevestig e-mailadres *</Label>
                <Input
                  id="emailConfirm"
                  type="email"
                  value={formData.emailConfirm}
                  onChange={(e) => handleInputChange("emailConfirm", e.target.value)}
                  required
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && <p className="text-sm text-red-600 mt-1">{emailError}</p>}
              </div>

              <div>
                <Label htmlFor="logo">Logo van de instelling *</Label>
                <p className="text-xs text-gray-500 mb-2">Zoals u in het programma vermeld wilt worden</p>
                <div className="mt-2">
                  <label
                    htmlFor="logo"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 transition-colors"
                  >
                    {logo ? (
                      <div className="text-center">
                        <p className="text-sm font-medium">{logo.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Klik om te wijzigen</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Klik om logo te uploaden</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG tot 5MB</p>
                      </div>
                    )}
                  </label>
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="postalAddress">Postadres van de instelling *</Label>
                <Input
                  id="postalAddress"
                  value={formData.postalAddress}
                  onChange={(e) => handleInputChange("postalAddress", e.target.value)}
                  placeholder="Straat, huisnummer, postcode, plaats"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Bezoekadres van de instelling *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Straat, huisnummer, postcode, plaats"
                  required={!formData.addressUnknown}
                  disabled={formData.addressUnknown}
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="addressUnknown"
                    checked={formData.addressUnknown}
                    onChange={(e) => handleInputChange("addressUnknown", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="addressUnknown" className="font-normal cursor-pointer">
                    Nog niet bekend
                  </Label>
                </div>
              </div>
            </div>

            {/* Program Information */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold text-purple-900">Programma Informatie</h2>

              <div>
                <Label htmlFor="description">Beschrijving van de instelling *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Zoals u in het programma vermeld wilt worden"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="activityDescription">Beschrijving van de activiteit tijdens de INTROWEEK *</Label>
                <Textarea
                  id="activityDescription"
                  value={formData.activityDescription}
                  onChange={(e) => handleInputChange("activityDescription", e.target.value)}
                  placeholder="Wat kunnen studenten verwachten tijdens hun bezoek?"
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Aantal klassen per tijdslot *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", e.target.value)}
                    placeholder="Bijv. 4 (voor 100 plaatsen)"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Gemiddeld 25 studenten per klas</p>
                </div>

                <div>
                  <Label htmlFor="duration">Tijdsduur programma (minuten) *</Label>
                  <select
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="60">60 minuten</option>
                    <option value="75">75 minuten</option>
                    <option value="90">90 minuten</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Availability Calendar */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-pink-600" />
                <h2 className="text-xl font-semibold text-purple-900">Beschikbaarheid</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Selecteer de tijdsloten waarop uw instelling studenten kan ontvangen (31 augustus - 4 september 2026)
              </p>
              <InstitutionCalendar availability={availability} onChange={setAvailability} />
            </div>

            {/* Comments */}
            <div className="space-y-4 pt-6 border-t">
              <div>
                <Label htmlFor="comments">Opmerkingen / Uitzonderingen / Verzoek tot contact</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleInputChange("comments", e.target.value)}
                  placeholder="Bijv. afwijkende tijden, speciale wensen, etc."
                  rows={3}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold"
                disabled={!!emailError || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Bezig met aanmelden...
                  </>
                ) : (
                  "Aanmelding Versturen"
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Na het versturen ontvangt u een bevestigingsmail met een link om uw gegevens aan te passen tot de
                deadline.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
