'use client'

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth/logout"
import Link from "next/link"

function AdminNav() {
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <Link href="/admin" className="font-semibold text-orange-600">
          Dashboard
        </Link>
        <Link href="/admin/content" className="text-gray-600 hover:text-orange-600">
          Content
        </Link>
        <Link href="/admin/planning" className="text-gray-600 hover:text-orange-600">
          Planning
        </Link>
        <Link href="/admin/docenten" className="text-gray-600 hover:text-orange-600">
          Docenten
        </Link>
        <Link href="/admin/instellingen" className="text-gray-600 hover:text-orange-600">
          Instellingen
        </Link>
      </div>
      <Button 
        onClick={handleLogout}
        variant="ghost"
        className="text-gray-600 hover:text-red-600"
      >
        Uitloggen
      </Button>
    </nav>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="p-6">{children}</main>
    </div>
  )
}