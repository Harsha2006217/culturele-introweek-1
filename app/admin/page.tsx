"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, GraduationCap, Calendar, Sparkles, Users, FileText, LogOut, Edit3 } from "lucide-react"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/admin/auth/login")
        return
      }

      // Load admin profile
      const { data: profile } = await supabase.from("admin_profiles").select("full_name").eq("id", user.id).single()

      setUserName(profile?.full_name || user.email || "Admin")
      setIsLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/auth/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p>Laden...</p>
        </div>
      </div>
    )
  }

  // Mock statistics
  const stats = {
    institutions: 42,
    teachers: 156,
    classes: 203,
    totalStudents: 4875,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Culturele INTROWEEK MBO 2026 - Beheer & Overzicht</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welkom, {userName}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Uitloggen
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-3xl font-bold">{stats.institutions}</span>
            </div>
            <div className="text-sm text-gray-600">Aangemelde Instellingen</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-3xl font-bold">{stats.teachers}</span>
            </div>
            <div className="text-sm text-gray-600">Aangemelde Docenten</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-3xl font-bold">{stats.classes}</span>
            </div>
            <div className="text-sm text-gray-600">Aangemelde Klassen</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-3xl font-bold">{stats.totalStudents}</span>
            </div>
            <div className="text-sm text-gray-600">Totaal Studenten</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Edit3 className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Content Beheer</h3>
            <p className="text-gray-600 mb-4 text-sm">Bewerk teksten op de website zonder code aan te passen</p>
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/admin/content">Beheer Content</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instellingen Beheren</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Bekijk en beheer alle aangemelde culturele instellingen, hun beschikbaarheid en capaciteit
            </p>
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/admin/instellingen">Bekijk Instellingen</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Docenten Beheren</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Overzicht van alle aangemelde docenten en hun klassen met voorkeuren en eerdere bezoeken
            </p>
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/admin/docenten">Bekijk Docenten</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Automatische Planning</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Genereer een optimaal programma op basis van locatie, capaciteit en diversiteit
            </p>
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/admin/planning">Genereer Planning</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Planning Overzicht</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Bekijk het volledige programma per dag, instelling of klas met mogelijkheid tot aanpassen
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/schema">Bekijk Schema</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rapporten & Export</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Exporteer programma's voor instellingen, docenten en algemeen overzicht naar Excel/PDF
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/export">Exporteer Data</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Beheer</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Verstuur bevestigingsmails, programma's en herinneringen naar instellingen en docenten
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/emails">Email Systeem</Link>
            </Button>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Recente Aanmeldingen</h2>
          <div className="space-y-3">
            {[
              { type: "institution", name: "Stedelijk Museum", time: "2 uur geleden" },
              { type: "teacher", name: "Anna Visser - MBO College West", time: "3 uur geleden" },
              { type: "institution", name: "Van Gogh Museum", time: "5 uur geleden" },
              { type: "teacher", name: "Tom de Jong - MBO College Centrum", time: "1 dag geleden" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    activity.type === "institution" ? "bg-orange-100" : "bg-blue-100"
                  }`}
                >
                  {activity.type === "institution" ? (
                    <Building2 className="h-5 w-5 text-orange-600" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.name}</div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
