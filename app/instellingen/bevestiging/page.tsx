"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Mail, Edit, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Institution } from "@/lib/types"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [institution, setInstitution] = useState<Institution | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInstitution() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("institutions").select("*").eq("edit_token", token).single()

        if (error) throw error
        setInstitution(data)
      } catch (error) {
        console.error("[v0] Error fetching institution:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInstitution()
  }, [token])

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
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Aanmelding Succesvol!</h1>
            <p className="text-gray-600">Bedankt voor uw aanmelding voor de Culturele INTROWEEK MBO 2026</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-pink-500" />
                Wat gebeurt er nu?
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">1.</span>
                  <span>
                    U ontvangt een bevestigingsmail op <strong>{institution.email}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">2.</span>
                  <span>In deze email vindt u een unieke link om uw gegevens aan te passen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">3.</span>
                  <span>
                    U kunt uw gegevens wijzigen tot de deadline van <strong>1 januari 2026</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold mb-4">Uw Aanmelding:</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500">Instelling</dt>
                  <dd className="font-medium">{institution.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Contactpersoon</dt>
                  <dd className="font-medium">{institution.contact_person}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="font-medium">{institution.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Adres</dt>
                  <dd className="font-medium">{institution.visit_address}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Capaciteit</dt>
                  <dd className="font-medium">{institution.capacity_per_slot} klassen per tijdslot</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Programma duur</dt>
                  <dd className="font-medium">{institution.program_duration} minuten</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-pink-500 hover:bg-pink-600">
              <Link href={`/instellingen/bewerken?token=${token}`}>
                <Edit className="mr-2 h-4 w-4" />
                Gegevens Bewerken
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/">Terug naar Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function BevestigingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
