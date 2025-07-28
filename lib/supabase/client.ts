import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/lib/database.types"

export function createClient() {
  // Verificar se as variáveis de ambiente estão definidas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    )
  }

  // Create a singleton Supabase client for the browser
  // This prevents multiple client instances from being created
  // which can lead to issues with authentication and real-time subscriptions.
  if (typeof window === "undefined") {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  let supabaseClient: ReturnType<typeof createBrowserClient<Database>>

  if (!globalThis.supabase) {
    globalThis.supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  supabaseClient = globalThis.supabase

  return supabaseClient
}

declare global {
  var supabase: ReturnType<typeof createBrowserClient<Database>> | undefined
}
