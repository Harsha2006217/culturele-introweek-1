"use client";

import type React from "react";

import { serverLogin } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er is een fout opgetreden");
      }

      router.push("/admin");
      router.refresh();
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Er is een fout opgetreden"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Admin Login</CardTitle>
                  <CardDescription>
                    Log in om toegang te krijgen tot het admin dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@rocva.nl"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Wachtwoord</Label>
                          <Link
                            href="/admin/auth/reset-password"
                            className="text-sm underline underline-offset-4"
                          >
                            Wachtwoord vergeten?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Inloggen..." : "Inloggen"}
                      </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                      Nog geen account?{" "}
                      <Link
                        href="/admin/auth/register"
                        className="underline underline-offset-4"
                      >
                        Registreren
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <footer className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">
                Contact
              </h3>
              <p className="text-white/90 text-sm md:text-base">
                <a
                  href="mailto:cultureleintroweek@rocva.nl"
                  className="hover:underline"
                >
                  cultureleintroweek@rocva.nl
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">
                Links
              </h3>
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
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">
                Deadlines
              </h3>
              <ul className="space-y-2 text-white/90 text-sm md:text-base">
                <li>1 maart 2026: Instellingen</li>
                <li>1 maart 2026: Docenten</li>
                <li>1 juni 2026: Programma</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <Image
              src="/neus.png"
              alt="Neus Footer"
              width={1920}
              height={96}
              className="w-full h-16 md:h-20 lg:h-24 object-contain mb-4"
            />
            <p className="text-white/80 text-sm md:text-base">
              © 2026 Culturele INTROWEEK MBO Amsterdam
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
