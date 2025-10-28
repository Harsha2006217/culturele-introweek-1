"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Download, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

const mockInstitutions = [
  {
    id: "2",
    name: "NEMO Science Museum",
    contact: "Jan Bakker",
    email: "jan@nemo.nl",
    address: "Oosterdok 2, Amsterdam",
    capacity: 3,
    duration: 75,
    status: "approved",
  },
  {
    id: "3",
    name: "Van Gogh Museum",
    contact: "Sophie de Vries",
    email: "sophie@vangoghmuseum.nl",
    address: "Museumplein 6, Amsterdam",
    capacity: 5,
    duration: 90,
    status: "pending",
  },
]

export default function AdminInstellingenPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredInstitutions = mockInstitutions.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.contact.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar Dashboard
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Instellingen Beheren</h1>
          <p className="text-gray-600">Overzicht van alle aangemelde culturele instellingen</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Zoek op naam of contactpersoon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporteer naar Excel
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredInstitutions.map((institution) => (
            <Card key={institution.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{institution.name}</h3>
                      <p className="text-sm text-gray-600">{institution.address}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        institution.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {institution.status === "approved" ? "Goedgekeurd" : "In behandeling"}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-gray-600">Contactpersoon</div>
                      <div className="font-medium">{institution.contact}</div>
                      <div className="text-sm text-gray-600">{institution.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Capaciteit & Duur</div>
                      <div className="font-medium">{institution.capacity} klassen per tijdslot</div>
                      <div className="text-sm text-gray-600">{institution.duration} minuten programma</div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Bekijk
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                    <Edit className="mr-2 h-4 w-4" />
                    Bewerk
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 md:flex-none text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Verwijder
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredInstitutions.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500">Geen instellingen gevonden</p>
          </Card>
        )}
      </div>
    </div>
  )
}
