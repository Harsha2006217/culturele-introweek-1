"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { generateSchedule } from "@/lib/planning-algorithm"
import { Sparkles, Download, AlertCircle, CheckCircle2 } from "lucide-react"

// Mock data for demonstration
const mockInstitutions = [
  {
    id: "2",
    name: "NEMO Science Museum",
    address: "Oosterdok 2, Amsterdam Centrum",
    capacity: 3,
    duration: 75,
    availability: {
      "2026-08-31": ["09:00", "11:00", "13:00", "15:00"],
      "2026-09-02": ["09:00", "11:00", "13:00"],
    },
  },
  {
    id: "3",
    name: "STRAAT Museum",
    address: "NDSM-plein 1, Amsterdam Noord",
    capacity: 2,
    duration: 60,
    availability: {
      "2026-09-01": ["10:00", "13:00", "15:00"],
      "2026-09-03": ["10:00", "13:00", "15:00"],
    },
  },
]

const mockClasses = [
  {
    id: "1",
    teacherName: "Jan Jansen",
    college: "MBO College Centrum",
    schoolAddress: "Wibautstraat 2, Amsterdam Centrum",
    className: "1A",
    studentCount: "<25",
    year: "1",
    previousVisits: [],
    selectedDay: "2026-08-31",
    activityCount: 2,
  },
  {
    id: "2",
    teacherName: "Maria de Vries",
    college: "MBO College Zuidoost",
    schoolAddress: "Bijlmerplein 888, Amsterdam Zuidoost",
    className: "2B",
    studentCount: "<20",
    year: "2",
    previousVisits: [],
    selectedDay: "2026-09-01",
    activityCount: 1,
    dayPart: "morning",
  },
  {
    id: "3",
    teacherName: "Pieter Bakker",
    college: "MBO College Noord",
    schoolAddress: "Zamenhofstraat 3, Amsterdam Noord",
    className: "3C",
    studentCount: "<30",
    year: "3",
    previousVisits: [],
    selectedDay: "2026-09-01",
    activityCount: 2,
  },
]

export default function AdminPlanningPage() {
  const [schedule, setSchedule] = useState<ReturnType<typeof generateSchedule> | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate processing time
    setTimeout(() => {
      const result = generateSchedule(mockInstitutions, mockClasses)
      setSchedule(result)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Automatische Planning</h1>
          <p className="text-gray-600">Genereer een optimaal programma voor alle aangemelde klassen en instellingen</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Planning Genereren</h2>
              <p className="text-sm text-gray-600">
                Het algoritme houdt rekening met geografische ligging, capaciteit, eerdere bezoeken en diversiteit
              </p>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {isGenerating ? "Bezig met genereren..." : "Genereer Planning"}
            </Button>
          </div>
        </Card>

        {schedule && (
          <>
            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Totaal Klassen</div>
                <div className="text-2xl font-bold">{schedule.stats.totalClasses}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Toegewezen</div>
                <div className="text-2xl font-bold text-green-600">{schedule.stats.assignedClasses}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Niet Toegewezen</div>
                <div className="text-2xl font-bold text-red-600">{schedule.stats.unassignedClasses}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Diversiteit Score</div>
                <div className="text-2xl font-bold text-orange-600">{schedule.stats.diversityScore}</div>
              </Card>
            </div>

            {/* Conflicts */}
            {schedule.conflicts.length > 0 && (
              <Card className="p-6 mb-6 border-orange-300 bg-orange-50">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Waarschuwingen</h3>
                    <ul className="space-y-1 text-sm">
                      {schedule.conflicts.map((conflict, index) => (
                        <li key={index} className="text-gray-700">
                          {conflict}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            {/* Assignments */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Planning Overzicht</h2>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporteer naar Excel
                </Button>
              </div>

              <div className="space-y-4">
                {schedule.assignments.map((assignment, index) => {
                  const institution = mockInstitutions.find((i) => i.id === assignment.institutionId)
                  const classInfo = mockClasses.find((c) => c.id === assignment.classId)

                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="font-semibold">
                          {classInfo?.className} - {classInfo?.college}
                        </div>
                        <div className="text-sm text-gray-600">
                          {institution?.name} • {assignment.date} om {assignment.time} ({assignment.duration} min)
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
