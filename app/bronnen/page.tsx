import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, FileText, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function BronnenPage() {
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
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-purple-900">Bronnen & Media</h1>
          <p className="text-lg text-gray-700">
            Bekijk video's, aftermovies en evaluaties van de Culturele INTROWEEK MBO
          </p>
        </div>

        {/* Video Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Play className="h-6 w-6 text-pink-500" />
            <h2 className="text-2xl md:text-3xl font-black text-purple-900">Video's</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden border-4 border-pink-500">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/pNj8QdObrtI"
                  title="Je eerste bezoek aan een culturele instelling"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">Je eerste bezoek aan een culturele instelling</h3>
                <p className="text-sm text-gray-600">
                  Ontdek wat je kunt verwachten tijdens je eerste bezoek aan een culturele instelling in Amsterdam
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden border-4 border-yellow-400">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/M7VNuI5jsek"
                  title="Aftermovie Culturele INTROWEEK MBO"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">Aftermovie Culturele INTROWEEK MBO</h3>
                <p className="text-sm text-gray-600">
                  Beleef de hoogtepunten van de vorige editie van de Culturele INTROWEEK MBO
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden border-4 border-blue-500">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/l2C8KLfJL0I"
                  title="Interviews Culturele INTROWEEK MBO"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">Interviews met studenten en docenten</h3>
                <p className="text-sm text-gray-600">
                  Hoor wat studenten en docenten te vertellen hebben over hun ervaringen
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Evaluation Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-pink-500" />
            <h2 className="text-2xl md:text-3xl font-black text-purple-900">Evaluatie 2025</h2>
          </div>

          <Card className="p-6 md:p-8 border-4 border-pink-500">
            <h3 className="text-xl font-bold mb-4">Resultaten en inzichten</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              De Culturele INTROWEEK MBO 2025 was een groot succes met meer dan 5.000 deelnemende studenten en 60+
              culturele instellingen. Studenten gaven de week gemiddeld een 8,5 en 92% gaf aan meer interesse te hebben
              gekregen in het culturele aanbod van Amsterdam.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-black text-pink-500 mb-2">5.000+</div>
                <div className="text-sm text-gray-700">Deelnemende studenten</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-black text-yellow-600 mb-2">60+</div>
                <div className="text-sm text-gray-700">Culturele instellingen</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-black text-blue-500 mb-2">8,5</div>
                <div className="text-sm text-gray-700">Gemiddeld cijfer</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Photos Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="h-6 w-6 text-pink-500" />
            <h2 className="text-2xl md:text-3xl font-black text-purple-900">Foto's van eerdere edities</h2>
          </div>

          <Card className="p-6 md:p-8 border-4 border-blue-500 text-center">
            <p className="text-gray-600 mb-4">Foto's van de Culturele INTROWEEK MBO worden binnenkort toegevoegd</p>
            <p className="text-sm text-gray-500">
              Heeft u foto's die u wilt delen? Neem contact op via{" "}
              <a href="mailto:cultureleintroweek@rocva.nl" className="text-pink-500 hover:underline font-medium">
                cultureleintroweek@rocva.nl
              </a>
            </p>
          </Card>
        </section>
      </div>
    </div>
  )
}
