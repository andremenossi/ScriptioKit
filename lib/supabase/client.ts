import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/lib/database.types"

export function createClient() {
  // Create a singleton Supabase client for the browser
  // This prevents multiple client instances from being created
  // which can lead to issues with authentication and real-time subscriptions.
  if (typeof window === "undefined") {
    return createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  let supabaseClient: ReturnType<typeof createBrowserClient<Database>>

  if (!globalThis.supabase) {
    globalThis.supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  supabaseClient = globalThis.supabase

  return supabaseClient
}

declare global {
  var supabase: ReturnType<typeof createBrowserClient<Database>> | undefined
}
