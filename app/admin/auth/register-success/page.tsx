import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Bedankt voor je registratie!</CardTitle>
              <CardDescription>Controleer je email om je account te bevestigen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Je hebt je succesvol geregistreerd. Controleer je email om je account te bevestigen voordat je inlogt.
              </p>
              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                <Link href="/admin/auth/login">Terug naar login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
