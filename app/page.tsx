import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Building2, GraduationCap, Sparkles, ArrowRight, Play } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="w-full overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 py-2">
        <Image
          src="/amsterdam750-slinger.svg"
          alt="Amsterdam 750"
          width={1920}
          height={64}
          className="w-full h-12 md:h-14 lg:h-16 object-contain"
          priority
        />
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/hand-gesture-1.png"
            alt=""
            width={300}
            height={300}
            className="absolute top-10 right-10 w-32 md:w-48 opacity-30"
          />
          <Image
            src="/hand-gesture-2.png"
            alt=""
            width={300}
            height={300}
            className="absolute bottom-10 left-10 w-32 md:w-48 opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-pink-500 text-white rounded-full text-xs md:text-sm font-bold shadow-lg">
                31 AUGUSTUS - 4 SEPTEMBER 2026
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-gray-900">Culturele</span>
                <br />
                <span className="text-gray-900">INTROWEEK</span>
                <br />
                <span className="text-gray-900">MBO</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 font-medium leading-relaxed">
                Hoe en waar kun je het nieuwe collegejaar beter beginnen dan in inspirerend Amsterdam? In week 36 van 31
                augustus t/m 4 september 2026 opent de cultuursector in Amsterdam haar deuren voor alle mbo-studenten in
                Amsterdam.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm md:text-base h-12 md:h-14 px-6"
                >
                  <Link href="/instellingen/aanmelden">
                    <Building2 className="mr-2 h-5 w-5" />
                    Aanmelden als Instelling
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm md:text-base h-12 md:h-14 px-6"
                >
                  <Link href="/docenten/aanmelden">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Aanmelden als Docent
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/kikker-spraycan.png"
                alt="Kikker Mascot"
                width={400}
                height={400}
                className="w-64 md:w-80 lg:w-96 h-auto animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4">
          <Image
            src="/event-banner-2026.jpg"
            alt="Cultuur Educatie Markt - 9 Oktober 2026"
            width={1920}
            height={240}
            className="w-full h-auto max-h-32 md:max-h-40 lg:max-h-48 object-contain rounded-lg shadow-2xl"
            priority
          />
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              Laat je inspireren door het rijke culturele aanbod van Amsterdam
            </h2>
          </div>
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
          </Card>
          <div className="text-center mt-6">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-bold bg-transparent border-2 border-pink-500 hover:bg-pink-50"
            >
              <Link href="/bronnen">
                <Play className="mr-2 h-5 w-5" />
                Bekijk meer video's en bronnen
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12 text-gray-900">Hoe werkt het?</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 md:p-8 border-4 border-pink-500 hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-pink-500 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                <Building2 className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 text-pink-500">Culturele Instellingen</h3>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                Meld je instelling aan en open je deuren voor de toekomst van Amsterdam
              </p>
              <div className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-bold inline-block text-xs md:text-sm">
                Deadline: 1 maart 2026
              </div>
            </Card>

            <Card className="p-6 md:p-8 border-4 border-yellow-400 hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                <GraduationCap className="h-6 w-6 md:h-7 md:w-7 text-black" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 text-yellow-600">Docenten</h3>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                Meld je klas aan voor een inspirerende culturele ervaring in Amsterdam
              </p>
              <div className="bg-pink-500 text-white px-3 py-2 rounded-lg font-bold inline-block text-xs md:text-sm">
                Deadline: 1 maart 2026
              </div>
            </Card>

            <Card className="p-6 md:p-8 border-4 border-blue-500 hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                <Calendar className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 text-blue-500">Programma</h3>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                Bekijk het volledige programma van de Culturele INTROWEEK MBO 2026
              </p>
              <div className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold inline-block text-xs md:text-sm">
                Beschikbaar: 1 juni 2026
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 md:w-64 md:h-64 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
          <Sparkles className="h-12 w-12 md:h-16 md:w-16 text-yellow-400 mx-auto" />
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">Ontdek Amsterdam door kunst en cultuur</h2>
          <p className="text-base md:text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto">
            Ook deze derde editie van de Culturele INTROWEEK MBO brengt mbo-studenten in contact met de stad door middel
            van kunst en cultuur. Studenten leren elkaar beter kennen, ontdekken Amsterdam en maken kennis met het brede
            culturele aanbod van de stad. Laat je inspireren door al het moois dat Amsterdam te bieden heeft.
          </p>
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-2xl font-black shadow-2xl">
            CULTUUR WERKT
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12 text-gray-900">
            Organisatie & Partners
          </h2>
          <Card className="p-6 md:p-10 border-4 border-pink-500 bg-white">
            <p className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed text-center">
              Een initiatief van de <strong>Cultuurcoördinatoren</strong> van het ROC van Amsterdam, Mediacollege
              Amsterdam en Hout en Meubileringscollege Amsterdam. Georganiseerd door het{" "}
              <strong>Amsterdams Platform Cultuureducatie MBO</strong>, Stichting Museumnacht Amsterdam, Museum
              Vereniging, GVB, MOCCA Expertisecentrum Cultuuronderwijs en CJP.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Image
                src="/team-cuco-logo.png"
                alt="Team CuCo Logo"
                width={400}
                height={150}
                className="w-64 md:w-80 h-auto"
              />
              <p className="text-sm text-gray-600 italic text-center">
                Mede mogelijk gemaakt door studenten van Amstelland (Internship Amstelland)
              </p>
            </div>
          </Card>
        </div>
      </section>

      <footer className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Contact</h3>
              <p className="text-white/90 text-sm md:text-base">
                <a href="mailto:cultureleintroweek@rocva.nl" className="hover:underline">
                  cultureleintroweek@rocva.nl
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Links</h3>
              <ul className="space-y-2 text-white/90 text-sm md:text-base">
                <li>
                  <Link href="/bronnen" className="hover:underline">
                    Bronnen & Video's
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Cultuurcoördinatoren
                  </Link>
                </li>
                <li>
                  <Link href="/programma" className="hover:underline">
                    Programma
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Deadlines</h3>
              <ul className="space-y-2 text-white/90 text-sm md:text-base">
                <li>1 maart 2026: Instellingen</li>
                <li>1 maart 2026: Docenten</li>
                <li>1 juni 2026: Programma</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <Image
              src="/kikker-footer.svg"
              alt="Kikker Footer"
              width={1920}
              height={96}
              className="w-full h-16 md:h-20 lg:h-24 object-contain mb-4"
            />
            <p className="text-white/80 text-sm md:text-base">© 2026 Culturele INTROWEEK MBO Amsterdam</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
