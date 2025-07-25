import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Settings } from "lucide-react"
import Link from "next/link"
import type { Tables } from "@/lib/database.types"
import { AccountSettingsForm } from "@/components/account-settings-form"

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login") // Redirect to login if not authenticated
  }

  // Fetch purchased templates for the current user
  const { data: purchases, error: purchasesError } = await supabase
    .from("purchases")
    .select("*, templates(*)") // Select all purchase data and join with template details
    .eq("user_id", user.id)

  if (purchasesError) {
    console.error("Error fetching purchases:", purchasesError)
  }

  const purchasedTemplates: (Tables<"purchases"> & { templates: Tables<"templates"> | null })[] = purchases || []

  // Generate signed URLs for premium templates
  const templatesWithSignedUrls = await Promise.all(
    purchasedTemplates.map(async (purchase) => {
      if (purchase.templates && purchase.templates.is_premium && purchase.templates.file_path) {
        const { data, error } = await supabase.storage
          .from("premium-templates") // Assuming a bucket named 'premium-templates'
          .createSignedUrl(purchase.templates.file_path, 3600) // URL valid for 1 hour

        if (error) {
          console.error(`Error generating signed URL for ${purchase.templates.title}:`, error)
          return { ...purchase, signed_url: null }
        }
        return { ...purchase, signed_url: data.signedUrl }
      }
      return { ...purchase, signed_url: null }
    }),
  )

  return (
    <div className="container py-12 md:py-24">
      {/* Título da página: Texto em azul */}
      <h1 className="text-4xl font-bold text-center mb-8 text-sk-blue-DEFAULT">Bem-vindo(a), {user.email}!</h1>
      <p className="text-center text-sk-gray-600 dark:text-sk-gray-400 max-w-2xl mx-auto mb-12">
        Aqui você pode gerenciar seus modelos comprados e suas configurações de conta.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Purchased Templates Section */}
        <Card className="animate-fade-in shadow-sm border border-sk-gray-200 dark:border-sk-gray-800 bg-sk-white-DEFAULT dark:bg-sk-gray-900">
          <CardHeader>
            {/* Título do card: Ícone e texto em azul */}
            <CardTitle className="text-2xl font-bold text-sk-blue-DEFAULT flex items-center gap-2">
              <Download className="h-6 w-6 text-sk-blue-DEFAULT" /> Meus Modelos Comprados
            </CardTitle>
            <CardDescription className="text-sk-gray-600 dark:text-sk-gray-400">
              Acesse e faça o download dos seus modelos premium.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {templatesWithSignedUrls.length > 0 ? (
              <ul className="space-y-4">
                {templatesWithSignedUrls.map((purchase) => (
                  <li
                    key={purchase.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-sk-gray-200 dark:border-sk-gray-700 rounded-md shadow-sm bg-sk-white-DEFAULT dark:bg-sk-gray-800 transition-colors"
                  >
                    <div className="flex flex-col mb-2 sm:mb-0">
                      <span className="font-semibold text-lg text-sk-gray-900 dark:text-sk-white-DEFAULT">
                        {purchase.templates?.title || "Modelo Desconhecido"}
                      </span>
                      <span className="text-sm text-sk-gray-500 dark:text-sk-gray-400">
                        {purchase.templates?.description}
                      </span>
                    </div>
                    {purchase.signed_url ? (
                      <Link href={purchase.signed_url} target="_blank" rel="noopener noreferrer">
                        {/* Botão de Download: Fundo dourado (mantido para contraste) */}
                        <Button className="bg-sk-gold-DEFAULT text-sk-gray-900 hover:bg-sk-gold-DEFAULT/90 transition-colors">
                          Download
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        variant="outline"
                        className="border-sk-gray-300 dark:border-sk-gray-700 text-sk-gray-500 dark:text-sk-gray-400 bg-transparent"
                      >
                        Download Indisponível
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sk-gray-500 dark:text-sk-gray-400 text-center">
                Você ainda não comprou nenhum modelo premium.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Account Settings Section */}
        <Card
          className="animate-fade-in shadow-sm border border-sk-gray-200 dark:border-sk-gray-800 bg-sk-white-DEFAULT dark:bg-sk-gray-900"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            {/* Título do card: Ícone e texto em azul */}
            <CardTitle className="text-2xl font-bold text-sk-blue-DEFAULT flex items-center gap-2">
              <Settings className="h-6 w-6 text-sk-blue-DEFAULT" /> Configurações da Conta
            </CardTitle>
            <CardDescription className="text-sk-gray-600 dark:text-sk-gray-400">
              Atualize suas informações e gerencie sua senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountSettingsForm userEmail={user.email || ""} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
