import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // if (!supabaseUrl || !supabaseAnonKey) {
  //   console.error(
  //     "[v0] Supabase environment variables are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
  //   )
  //   throw new Error(
  //     "Supabase configuration missing. Please add the required environment variables in the Vars section.",
  //   )
  // }

  // if (client) return client

  // client = createBrowserClient(supabaseUrl, supabaseAnonKey)

  // return client
}
