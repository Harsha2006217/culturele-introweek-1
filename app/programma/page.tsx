"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MapPin, Clock, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

const mockInstitutions = [
  {
    id: "2",
    name: "NEMO Science Museum",
    logo: "/nemo-science-museum-logo.jpg",
    address: "Oosterdok 2, Amsterdam Centrum",
    description:
      "NEMO Science Museum is het grootste wetenschapscentrum van Nederland. Het museum nodigt bezoekers uit om zelf te ontdekken hoe de wereld werkt.",
    activity:
      "Studenten gaan aan de slag met hands-on experimenten en ontdekken de wetenschap achter alledaagse verschijnselen. Een interactieve ervaring die nieuwsgierigheid stimuleert.",
    capacity: "3 klassen per tijdslot",
    duration: "75 minuten",
    website: "https://www.nemosciencemuseum.nl",
  },
  {
    id: "3",
    name: "Van Gogh Museum",
    logo: "/van-gogh-museum-logo.jpg",
    address: "Museumplein 6, Amsterdam Zuid",
    description:
      "Het Van Gogh Museum herbergt 's werelds grootste collectie werken van Vincent van Gogh, met meer dan 200 schilderijen, 500 tekeningen en 750 brieven.",
    activity:
      "Een inspirerende rondleiding langs de meesterwerken van Van Gogh, waarbij studenten kennismaken met zijn leven, werk en de impact op de kunstwereld.",
    capacity: "5 klassen per tijdslot",
    duration: "90 minuten",
    website: "https://www.vangoghmuseum.nl",
  },
  {
    id: "4",
    name: "STRAAT Museum",
    logo: "/straat-museum-logo.jpg",
    address: "NDSM-plein 1, Amsterdam Noord",
    description:
      "STRAAT Museum is het grootste street art en graffiti museum ter wereld. Het museum toont werk van meer dan 150 kunstenaars uit alle hoeken van de wereld.",
    activity:
      "Ontdek de wereld van street art en graffiti in dit unieke museum. Studenten leren over de geschiedenis en technieken, en krijgen een rondleiding door de indrukwekkende collectie.",
    capacity: "2 klassen per tijdslot",
    duration: "60 minuten",
    website: "https://www.straatmuseum.com",
  },
  {
    id: "5",
    name: "Het Scheepvaartmuseum",
    logo: "/scheepvaartmuseum-logo.jpg",
    address: "Kattenburgerplein 1, Amsterdam Oost",
    description:
      "Het Scheepvaartmuseum vertelt het verhaal van de Nederlandse maritieme geschiedenis met een collectie van wereldklasse.",
    activity:
      "Studenten ontdekken de rijke maritieme geschiedenis van Nederland, bezoeken historische schepen en leren over de Gouden Eeuw en moderne scheepvaart.",
    capacity: "3 klassen per tijdslot",
    duration: "75 minuten",
    website: "https://www.hetscheepvaartmuseum.nl",
  },
  {
    id: "6",
    name: "Stedelijk Museum",
    logo: "/stedelijk-museum-logo.jpg",
    address: "Museumplein 10, Amsterdam Zuid",
    description:
      "Het Stedelijk Museum Amsterdam is het museum voor moderne en hedendaagse kunst en design. De collectie omvat bijna 90.000 objecten.",
    activity:
      "Een verkenning van moderne en hedendaagse kunst waarbij studenten kennismaken met verschillende stromingen en kunstenaars, van De Stijl tot pop art.",
    capacity: "4 klassen per tijdslot",
    duration: "90 minuten",
    website: "https://www.stedelijk.nl",
  },
]

const partners = [
  { name: "ROC van Amsterdam", url: "https://www.rocva.nl" },
  { name: "Mediacollege Amsterdam", url: "https://www.ma-web.nl" },
  { name: "Hout en Meubileringscollege", url: "https://www.hmc.nl" },
  { name: "Stichting Museumnacht Amsterdam", url: "https://www.n8.nl" },
  { name: "Museum Vereniging", url: "https://www.museumvereniging.nl" },
  { name: "GVB", url: "https://www.gvb.nl" },
  { name: "MOCCA Expertisecentrum", url: "https://www.mocca-amsterdam.nl" },
  { name: "CJP", url: "https://www.cjp.nl" },
]

export default function ProgrammaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInstitution, setSelectedInstitution] = useState<(typeof mockInstitutions)[0] | null>(null)

  const filteredInstitutions = mockInstitutions.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-rose-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Programma 2026</h1>
          <p className="text-xl md:text-2xl mb-2 text-orange-50">31 augustus - 4 september 2026</p>
          <p className="text-lg text-orange-100 max-w-3xl mx-auto">
            Ontdek het volledige aanbod van meer dan 60 culturele instellingen tijdens de Culturele INTROWEEK MBO
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 bg-orange-50 border-orange-200">
            <h2 className="text-xl font-semibold mb-2">Voor Docenten</h2>
            <p className="text-gray-700">
              Het programma voor uw aangemelde klas(sen) ontvangt u per email na de planning in maart 2026. Heeft u nog
              geen klas aangemeld?{" "}
              <Link href="/docenten/aanmelden" className="text-orange-600 font-medium hover:underline">
                Meld u hier aan
              </Link>
              .
            </p>
          </Card>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Zoek een culturele instelling..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-white"
            />
          </div>
        </div>
      </section>

      {/* Institutions Grid */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution) => (
              <Card
                key={institution.id}
                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedInstitution(institution)}
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center p-8">
                  <img
                    src={institution.logo || "/placeholder.svg"}
                    alt={institution.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{institution.name}</h3>
                  <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{institution.address}</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-4">{institution.description}</p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Meer Informatie</Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredInstitutions.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-gray-500">Geen instellingen gevonden</p>
            </Card>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4 bg-white border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Samenwerkende Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 border rounded-lg hover:border-orange-400 hover:shadow-md transition-all group"
              >
                <span className="text-sm text-center group-hover:text-orange-600 transition-colors">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Coordinators */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Cultuurcoördinatoren</h2>
          <p className="text-gray-700 mb-8">
            Heeft u vragen over de Culturele INTROWEEK MBO? Neem contact op met de cultuurcoördinator van uw college.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <Link href="/contact">Contactgegevens</Link>
          </Button>
        </div>
      </section>

      {/* Institution Detail Dialog */}
      <Dialog open={!!selectedInstitution} onOpenChange={() => setSelectedInstitution(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedInstitution && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedInstitution.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="aspect-video bg-gray-100 flex items-center justify-center p-8 rounded-lg">
                  <img
                    src={selectedInstitution.logo || "/placeholder.svg"}
                    alt={selectedInstitution.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    Locatie
                  </h3>
                  <p className="text-gray-700">{selectedInstitution.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Over de Instelling</h3>
                  <p className="text-gray-700">{selectedInstitution.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Activiteit tijdens de INTROWEEK</h3>
                  <p className="text-gray-700">{selectedInstitution.activity}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Users className="h-4 w-4" />
                      Capaciteit
                    </div>
                    <div className="font-medium">{selectedInstitution.capacity}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Clock className="h-4 w-4" />
                      Duur
                    </div>
                    <div className="font-medium">{selectedInstitution.duration}</div>
                  </div>
                </div>

                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                  <a href={selectedInstitution.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Bezoek Website
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
