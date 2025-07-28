import { createServerSupabaseClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, Download } from "lucide-react"
import { PurchaseForm } from "@/components/purchase-form"

interface ComprarPageProps {
  params: {
    id: string
  }
}

export default async function ComprarPage({ params }: ComprarPageProps) {
  const supabase = createServerSupabaseClient()

  // Buscar template
  const { data: template, error } = await supabase.from("templates").select("*").eq("id", params.id).single()

  if (error || !template) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-blue-text dark:gradient-blue-text-dark">Comprar Template</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Você está prestes a adquirir um template premium de alta qualidade.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Detalhes do Template */}
          <Card className="bg-white dark:bg-gray-900 thin-border border-black dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full text-white gradient-blue dark:gradient-blue-dark">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl gradient-blue-text dark:gradient-blue-text-dark">
                    {template.title}
                  </CardTitle>
                  <Badge className="gradient-blue dark:gradient-blue-dark text-white border-0 mt-2">
                    {formatPrice(template.price)}
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Documento elaborado por advogados</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Download imediato após pagamento</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700 dark:text-gray-300">Formato .DOCX editável</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Compra */}
          <Card className="bg-white dark:bg-gray-900 thin-border border-black dark:border-gray-700">
            <CardHeader>
              <CardTitle className="gradient-blue-text dark:gradient-blue-text-dark">Finalizar Compra</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Preencha os dados abaixo para concluir sua compra.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PurchaseForm template={template} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
