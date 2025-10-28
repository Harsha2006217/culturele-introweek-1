"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ExportPage() {
  const [exportType, setExportType] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real implementation, this would generate and download a PDF
    alert(`PDF export voor "${exportType}" wordt gegenereerd...`)

    setIsExporting(false)
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
          <h1 className="text-3xl font-bold mb-2">Rapporten & Export</h1>
          <p className="text-gray-600">Exporteer programma's en overzichten naar PDF</p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Selecteer Export Type</h3>
              <RadioGroup value={exportType} onValueChange={setExportType}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="flex-1 cursor-pointer">
                    <div className="font-medium">Volledig Programma</div>
                    <div className="text-sm text-gray-600">Alle instellingen, docenten en klassen</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="institutions" id="institutions" />
                  <Label htmlFor="institutions" className="flex-1 cursor-pointer">
                    <div className="font-medium">Programma per Instelling</div>
                    <div className="text-sm text-gray-600">Overzicht voor elke culturele instelling</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="teachers" id="teachers" />
                  <Label htmlFor="teachers" className="flex-1 cursor-pointer">
                    <div className="font-medium">Programma per Docent</div>
                    <div className="text-sm text-gray-600">Persoonlijk programma voor elke docent</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="colleges" id="colleges" />
                  <Label htmlFor="colleges" className="flex-1 cursor-pointer">
                    <div className="font-medium">Programma per College</div>
                    <div className="text-sm text-gray-600">Overzicht per MBO College</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="schedule" id="schedule" />
                  <Label htmlFor="schedule" className="flex-1 cursor-pointer">
                    <div className="font-medium">Dagschema</div>
                    <div className="text-sm text-gray-600">Planning per dag met tijdsloten</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <FileText className="mr-2 h-5 w-5 animate-pulse" />
                    PDF wordt gegenereerd...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Exporteer naar PDF
                  </>
                )}
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Export Informatie</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• PDF's worden automatisch gedownload naar je computer</li>
                <li>• Alle programma's bevatten datum, tijd, locatie en contactgegevens</li>
                <li>• Exports zijn geschikt voor printen en digitaal delen</li>
                <li>• Programma's worden real-time gegenereerd met de laatste data</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
