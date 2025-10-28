"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const COLLEGES = [
  "Hout en Meubileringscollege",
  "Mediacollege Amsterdam",
  "MBO College Amstelland",
  "MBO College Airport",
  "MBO College Almere",
  "MBO College Almere Poort",
  "MBO College Centrum",
  "MBO College Hilversum",
  "MBO College Lelystad",
  "MBO College Noord",
  "MBO College West",
  "MBO College Westpoort",
  "MBO College Zuid",
  "MBO College Zuidoost",
]

const DAYS = [
  { value: "monday", label: "Maandag 31 augustus 2026" },
  { value: "tuesday", label: "Dinsdag 1 september 2026" },
  { value: "wednesday", label: "Woensdag 2 september 2026" },
  { value: "thursday", label: "Donderdag 3 september 2026" },
  { value: "friday", label: "Vrijdag 4 september 2026" },
]

interface ClassInfo {
  id: string
  name: string
  studentCount: string
  year: string
  customYear: string
  previousParticipation: string
  previousVisits: string
  mentorAttending: boolean
}

export default function DocentenAanmeldenPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")

  const [formData, setFormData] = useState({
    teacherName: "",
    email: "",
    emailConfirm: "",
    function: "",
    college: "",
    program: "",
    address: "",
    selectedDay: "",
    activityCount: "1",
    dayPart: "",
  })

  const [classes, setClasses] = useState<ClassInfo[]>([
    {
      id: "1",
      name: "",
      studentCount: "",
      year: "1",
      customYear: "",
      previousParticipation: "no",
      previousVisits: "",
      mentorAttending: false,
    },
  ])

  const handleInputChange = (field: string, value: string) => {
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

  const handleClassChange = (id: string, field: keyof ClassInfo, value: string | boolean) => {
    setClasses((prev) => prev.map((cls) => (cls.id === id ? { ...cls, [field]: value } : cls)))
  }

  const addClass = () => {
    const newId = (Math.max(...classes.map((c) => Number.parseInt(c.id))) + 1).toString()
    setClasses((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        studentCount: "",
        year: "1",
        customYear: "",
        previousParticipation: "no",
        previousVisits: "",
        mentorAttending: false,
      },
    ])
  }

  const removeClass = (id: string) => {
    if (classes.length > 1) {
      setClasses((prev) => prev.filter((cls) => cls.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.email !== formData.emailConfirm) {
      setEmailError("E-mailadressen komen niet overeen")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Teacher registration submitted:", { formData, classes })

      toast({
        title: "Aanmelding succesvol!",
        description: "U ontvangt een bevestigingsmail met het programma voor uw klas(sen).",
      })

      // Reset form
      setFormData({
        teacherName: "",
        email: "",
        emailConfirm: "",
        function: "",
        college: "",
        program: "",
        address: "",
        selectedDay: "",
        activityCount: "1",
        dayPart: "",
      })
      setClasses([
        {
          id: "1",
          name: "",
          studentCount: "",
          year: "1",
          customYear: "",
          previousParticipation: "no",
          previousVisits: "",
          mentorAttending: false,
        },
      ])
    } catch (error) {
      toast({
        title: "Fout bij aanmelden",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar home
          </Link>
        </Button>

        <Card className="p-8 border-4 border-yellow-400 bg-white">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Aanmelden Docent</h1>
            <p className="text-gray-600">
              Meld uw klas(sen) aan voor de Culturele INTROWEEK MBO 2026 (31 augustus - 4 september 2026)
            </p>
            <p className="text-sm text-orange-600 font-bold mt-2">Deadline: 1 maart 2026</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Teacher Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Uw Gegevens</h2>

              <div>
                <Label htmlFor="teacherName">Naam docent/aanmelder *</Label>
                <Input
                  id="teacherName"
                  value={formData.teacherName}
                  onChange={(e) => handleInputChange("teacherName", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">E-mailadres *</Label>
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
                <Label htmlFor="function">Functie *</Label>
                <Input
                  id="function"
                  value={formData.function}
                  onChange={(e) => handleInputChange("function", e.target.value)}
                  placeholder="Bijv. Docent, Mentor, Cultuurcoördinator"
                  required
                />
              </div>

              <div>
                <Label htmlFor="college">College *</Label>
                <select
                  id="college"
                  value={formData.college}
                  onChange={(e) => handleInputChange("college", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecteer een college</option>
                  {COLLEGES.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="program">Opleiding *</Label>
                <Input
                  id="program"
                  value={formData.program}
                  onChange={(e) => handleInputChange("program", e.target.value)}
                  placeholder="Naam van de opleiding"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Adres waar de opleiding is gevestigd *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Straat, huisnummer, postcode, plaats"
                  required
                />
              </div>
            </div>

            {/* Class Information */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Klas Informatie</h2>
                <Button type="button" onClick={addClass} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Klas Toevoegen
                </Button>
              </div>

              {classes.map((classInfo, index) => (
                <Card key={classInfo.id} className="p-4 bg-gray-50 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Klas {index + 1}</h3>
                    {classes.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeClass(classInfo.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`className-${classInfo.id}`}>Naam van de klas *</Label>
                      <Input
                        id={`className-${classInfo.id}`}
                        value={classInfo.name}
                        onChange={(e) => handleClassChange(classInfo.id, "name", e.target.value)}
                        placeholder="Bijv. 1A, 2B, etc."
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`studentCount-${classInfo.id}`}>Aantal studenten *</Label>
                        <select
                          id={`studentCount-${classInfo.id}`}
                          value={classInfo.studentCount}
                          onChange={(e) => handleClassChange(classInfo.id, "studentCount", e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="">Selecteer aantal</option>
                          <option value="<20">Minder dan 20</option>
                          <option value="<25">Minder dan 25</option>
                          <option value="<30">Minder dan 30</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor={`year-${classInfo.id}`}>Leerjaar *</Label>
                        <select
                          id={`year-${classInfo.id}`}
                          value={classInfo.year}
                          onChange={(e) => handleClassChange(classInfo.id, "year", e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="1">1e jaar</option>
                          <option value="2">2e jaar</option>
                          <option value="3">3e jaar</option>
                          <option value="4">4e jaar</option>
                          <option value="anders">Anders, namelijk...</option>
                        </select>
                      </div>
                    </div>

                    {classInfo.year === "anders" && (
                      <div>
                        <Label htmlFor={`customYear-${classInfo.id}`}>Specificeer leerjaar *</Label>
                        <Input
                          id={`customYear-${classInfo.id}`}
                          value={classInfo.customYear}
                          onChange={(e) => handleClassChange(classInfo.id, "customYear", e.target.value)}
                          placeholder="Bijv. gemengd, schakelklas, etc."
                          required
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`mentorAttending-${classInfo.id}`}
                        checked={classInfo.mentorAttending}
                        onChange={(e) => handleClassChange(classInfo.id, "mentorAttending", e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={`mentorAttending-${classInfo.id}`} className="font-normal cursor-pointer">
                        De mentor gaat mee
                      </Label>
                    </div>

                    {classInfo.year !== "1" && classInfo.year !== "anders" && (
                      <>
                        <div>
                          <Label htmlFor={`previousParticipation-${classInfo.id}`}>
                            Vorig jaar ook meegedaan aan de Culturele INTROWEEK? *
                          </Label>
                          <select
                            id={`previousParticipation-${classInfo.id}`}
                            value={classInfo.previousParticipation}
                            onChange={(e) => handleClassChange(classInfo.id, "previousParticipation", e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                          >
                            <option value="no">Nee</option>
                            <option value="yes">Ja</option>
                          </select>
                        </div>

                        {classInfo.previousParticipation === "yes" && (
                          <div>
                            <Label htmlFor={`previousVisits-${classInfo.id}`}>
                              Waar zijn de studenten naartoe geweest? (indien bekend)
                            </Label>
                            <Textarea
                              id={`previousVisits-${classInfo.id}`}
                              value={classInfo.previousVisits}
                              onChange={(e) => handleClassChange(classInfo.id, "previousVisits", e.target.value)}
                              placeholder="Bijv. NEMO, Van Gogh Museum, etc."
                              rows={2}
                            />
                            <p className="text-xs text-gray-500 mt-1">Dit helpt ons om herhaling te voorkomen</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Activity Preferences */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold text-gray-900">Programma Voorkeuren</h2>

              <div>
                <Label htmlFor="selectedDay">Op welke dag wilt u deelnemen? *</Label>
                <select
                  id="selectedDay"
                  value={formData.selectedDay}
                  onChange={(e) => handleInputChange("selectedDay", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecteer een dag</option>
                  {DAYS.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="activityCount">Aantal activiteiten *</Label>
                <select
                  id="activityCount"
                  value={formData.activityCount}
                  onChange={(e) => handleInputChange("activityCount", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="1">1 activiteit</option>
                  <option value="2">2 activiteiten</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Bij 2 activiteiten wordt automatisch 1,5 uur pauze ingepland tussen de activiteiten
                </p>
              </div>

              {formData.activityCount === "1" && (
                <div>
                  <Label htmlFor="dayPart">Welk dagdeel? *</Label>
                  <select
                    id="dayPart"
                    value={formData.dayPart}
                    onChange={(e) => handleInputChange("dayPart", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Selecteer dagdeel</option>
                    <option value="morning">Ochtend (09:00 - 13:00)</option>
                    <option value="afternoon">Middag (13:00 - 17:00)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold"
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
                Na het versturen ontvangt u een bevestigingsmail met het programma voor uw klas(sen).
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
