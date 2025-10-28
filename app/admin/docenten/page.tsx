"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Download, Eye, Mail } from "lucide-react"
import Link from "next/link"

const mockTeachers = [
  {
    id: "1",
    name: "Jan Jansen",
    function: "Docent",
    college: "MBO College Centrum",
    email: "jan.jansen@mbocollege.nl",
    classes: 2,
    totalStudents: 48,
    selectedDay: "Maandag 31 augustus",
  },
  {
    id: "2",
    name: "Maria de Vries",
    function: "Cultuurcoördinator",
    college: "MBO College Zuidoost",
    email: "maria.devries@mbocollege.nl",
    classes: 3,
    totalStudents: 72,
    selectedDay: "Dinsdag 1 september",
  },
  {
    id: "3",
    name: "Pieter Bakker",
    function: "Mentor",
    college: "MBO College Noord",
    email: "pieter.bakker@mbocollege.nl",
    classes: 1,
    totalStudents: 23,
    selectedDay: "Woensdag 2 september",
  },
]

export default function AdminDocentenPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.college.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <h1 className="text-3xl font-bold mb-2">Docenten Beheren</h1>
          <p className="text-gray-600">Overzicht van alle aangemelde docenten en hun klassen</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Zoek op naam of college..."
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
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{teacher.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {teacher.function} - {teacher.college}
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium text-sm">{teacher.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Aangemelde Klassen</div>
                      <div className="font-medium">
                        {teacher.classes} {teacher.classes === 1 ? "klas" : "klassen"} ({teacher.totalStudents}{" "}
                        studenten)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Gekozen Dag</div>
                      <div className="font-medium">{teacher.selectedDay}</div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500">Geen docenten gevonden</p>
          </Card>
        )}
      </div>
    </div>
  )
}
