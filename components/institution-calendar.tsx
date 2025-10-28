"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface InstitutionCalendarProps {
  availability: Record<string, string[]>
  onChange: (availability: Record<string, string[]>) => void
}

const DAYS = [
  { date: "2026-08-31", label: "Maandag 31 aug" },
  { date: "2026-09-01", label: "Dinsdag 1 sept" },
  { date: "2026-09-02", label: "Woensdag 2 sept" },
  { date: "2026-09-03", label: "Donderdag 3 sept" },
  { date: "2026-09-04", label: "Vrijdag 4 sept" },
]

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]

export function InstitutionCalendar({ availability, onChange }: InstitutionCalendarProps) {
  const toggleSlot = (date: string, time: string) => {
    const daySlots = availability[date] || []
    const newSlots = daySlots.includes(time) ? daySlots.filter((t) => t !== time) : [...daySlots, time]

    onChange({
      ...availability,
      [date]: newSlots,
    })
  }

  const toggleAllDay = (date: string) => {
    const daySlots = availability[date] || []
    const allSelected = TIME_SLOTS.every((time) => daySlots.includes(time))

    onChange({
      ...availability,
      [date]: allSelected ? [] : [...TIME_SLOTS],
    })
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {DAYS.map((day) => {
          const daySlots = availability[day.date] || []
          const allSelected = TIME_SLOTS.every((time) => daySlots.includes(time))

          return (
            <div key={day.date} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{day.label}</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => toggleAllDay(day.date)}>
                  {allSelected ? "Deselecteer alles" : "Selecteer alles"}
                </Button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {TIME_SLOTS.map((time) => {
                  const isSelected = daySlots.includes(time)
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => toggleSlot(day.date, time)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        isSelected
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
