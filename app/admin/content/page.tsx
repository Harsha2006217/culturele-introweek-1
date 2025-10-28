"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ContentItem {
  id: string
  key: string
  content: string
  section: string
}

export default function ContentManagementPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const { data, error } = await supabase.from("site_content").select("*").order("section", { ascending: true })

      if (error) throw error
      setContent(data || [])
    } catch (error) {
      console.error("Error loading content:", error)
      setMessage({ type: "error", text: "Fout bij laden van content" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (id: string, newContent: string) => {
    setIsSaving(true)
    setMessage(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/admin/auth/login")
        return
      }

      const { error } = await supabase
        .from("site_content")
        .update({ content: newContent, updated_by: user.id })
        .eq("id", id)

      if (error) throw error

      setMessage({ type: "success", text: "Content succesvol opgeslagen!" })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error updating content:", error)
      setMessage({ type: "error", text: "Fout bij opslaan van content" })
    } finally {
      setIsSaving(false)
    }
  }

  const groupedContent = content.reduce(
    (acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    },
    {} as Record<string, ContentItem[]>,
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p>Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar Dashboard
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Content Beheer</h1>
          <p className="text-gray-600">Bewerk de teksten op de website zonder code aan te passen</p>
        </div>

        {message && (
          <Card
            className={`p-4 mb-6 ${message.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
          >
            <p className={message.type === "success" ? "text-green-700" : "text-red-700"}>{message.text}</p>
          </Card>
        )}

        <div className="space-y-6">
          {Object.entries(groupedContent).map(([section, items]) => (
            <Card key={section} className="p-6">
              <h2 className="text-xl font-semibold mb-4 capitalize">{section}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <Label htmlFor={item.key} className="text-sm font-medium">
                      {item.key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Label>
                    {item.content.length > 100 ? (
                      <Textarea
                        id={item.key}
                        value={item.content}
                        onChange={(e) => {
                          const newContent = [...content]
                          const index = newContent.findIndex((c) => c.id === item.id)
                          newContent[index].content = e.target.value
                          setContent(newContent)
                        }}
                        rows={4}
                        className="w-full"
                      />
                    ) : (
                      <Input
                        id={item.key}
                        value={item.content}
                        onChange={(e) => {
                          const newContent = [...content]
                          const index = newContent.findIndex((c) => c.id === item.id)
                          newContent[index].content = e.target.value
                          setContent(newContent)
                        }}
                        className="w-full"
                      />
                    )}
                    <Button
                      onClick={() => handleUpdate(item.id, item.content)}
                      disabled={isSaving}
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Opslaan
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
