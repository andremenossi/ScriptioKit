// This page is now redundant as login/register is handled via a modal.
// Keeping it here for reference, but it's not linked in the Navbar anymore.
// You can delete this file if you prefer.

import { AuthForm } from "@/components/auth-form" // Importação corrigida

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center py-12 px-4">
      <AuthForm />
    </div>
  )
}
