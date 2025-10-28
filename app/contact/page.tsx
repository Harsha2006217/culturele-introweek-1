"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Building2, ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const cultuurCoordinatoren = [
  {
    college: "MBO College Almere, Poort & Lelystad",
    name: "Jeroen Paape",
    email: "j.paape@rocvf.nl",
  },
  {
    college: "MBO College Amstelland",
    name: "Marieke Kruijssen",
    email: "m.kruijssen@rocva.nl",
  },
  {
    college: "MBO College Airport",
    name: "Jørgen van Waes",
    email: "j.vanwaes@rocva.nl",
  },
  {
    college: "MBO College Centrum",
    name: "Claudia van den Bos",
    email: "c.vandenbos@rocva.nl",
  },
  {
    college: "MBO College Hilversum",
    name: "Wordt nog bekend gemaakt",
    email: "",
  },
  {
    college: "Mediacollege Amsterdam",
    name: "Ernst Herstel",
    email: "e.herstel@ma-web.nl",
  },
  {
    college: "MBO College Noord",
    name: "Edwin Erich",
    email: "e.erich@rocva.nl",
  },
  {
    college: "MBO College West",
    name: "Jillis Slingerland",
    email: "j.slingerland@rocva.nl",
  },
  {
    college: "MBO College Westpoort",
    name: "Sevim Cecen",
    email: "s.cecen@rocva.nl",
  },
  {
    college: "MBO College Zuid",
    name: "Frie Trustfull & Lotte Bant",
    email: "f.strustfull@rocva.nl, l.bant@rocva.nl",
  },
  {
    college: "MBO College Zuidoost",
    name: "Charita Zandgrond & Lieke Koningen",
    email: "c.zandgrond@rocva.nl, l.koningen@rocva.nl",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailConfirm: "",
    subject: "",
    message: "",
  })
  const [emailError, setEmailError] = useState("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.email !== formData.emailConfirm) {
      setEmailError("E-mailadressen komen niet overeen")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, this would send an email via an API route
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Bericht verzonden!",
        description: "We nemen zo snel mogelijk contact met u op.",
      })

      setFormData({
        name: "",
        email: "",
        emailConfirm: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Fout bij verzenden",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar home
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-purple-900">Contact</h1>
          <p className="text-lg text-gray-700">
            Neem contact op met de cultuurcoördinatoren of stuur een algemeen bericht
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <Card className="p-6 md:p-8 border-4 border-pink-500">
              <h2 className="text-2xl font-black mb-6 text-purple-900">Stuur een bericht</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Naam *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
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
                  <Label htmlFor="subject">Onderwerp *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Bericht *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold"
                  disabled={!!emailError || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Bezig met verzenden...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Verstuur bericht
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Uw bericht wordt verzonden naar cultureleintroweek@rocva.nl
                </p>
              </form>
            </Card>
          </div>

          {/* Coordinators List */}
          <div>
            <h2 className="text-2xl font-black mb-6 text-purple-900">Cultuurcoördinatoren</h2>
            <div className="space-y-4">
              {cultuurCoordinatoren.map((coordinator, index) => (
                <Card key={index} className="p-4 border-2 border-purple-200 hover:border-pink-500 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-pink-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm mb-1">{coordinator.college}</h3>
                      <p className="text-sm text-gray-700 mb-2">{coordinator.name}</p>
                      {coordinator.email && (
                        <a
                          href={`mailto:${coordinator.email}`}
                          className="flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 transition-colors break-all"
                        >
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          {coordinator.email}
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 mt-6 bg-purple-50 border-2 border-purple-200">
              <h3 className="text-lg font-bold mb-2 text-purple-900">Algemene vragen</h3>
              <p className="text-sm text-gray-700 mb-3">Voor algemene vragen over de Culturele INTROWEEK MBO:</p>
              <a
                href="mailto:cultureleintroweek@rocva.nl"
                className="flex items-center gap-2 text-pink-600 font-medium hover:underline"
              >
                <Mail className="h-5 w-5" />
                cultureleintroweek@rocva.nl
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
