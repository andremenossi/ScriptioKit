import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Handshake, Star } from "lucide-react"
import { TemplateCard } from "@/components/template-card"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/database.types"
import { LoginRegisterDialog } from "@/components/login-register-dialog"
import { HeroSection } from "@/components/hero-section"
import { InteractiveButton } from "@/components/interactive-button"

export default async function HomePage() {
  const supabase = createServerSupabaseClient()
  const { data: featuredTemplates, error } = await supabase.from("templates").select("*").limit(3)

  if (error) {
    console.error("Error fetching featured templates:", error)
  }

  const templates: Tables<"templates">[] = featuredTemplates || []

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Linha divisória com gradiente azul - fundo ajustado */}
      <div className="w-full py-6 bg-sk-white-DEFAULT dark:bg-background">
        <div className="w-full h-1" style={{ background: "linear-gradient(to right, #2A68E1, transparent)" }} />
      </div>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-sk-white-DEFAULT dark:bg-background transition-colors duration-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#2A68E1" }}>
                Por que escolher a ScriptioKit?
              </h2>
              <p className="max-w-[900px] text-sk-gray-600 dark:text-sk-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simplificamos o acesso a documentos jurídicos de alta qualidade para que você possa focar no que
                realmente importa: seu negócio.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col items-center text-center p-6 shadow-sm border border-sk-gray-200 dark:border-sk-gray-600 hover:shadow-md transition-all duration-300 animate-fade-in bg-sk-white-DEFAULT dark:bg-card">
              <CheckCircle className="h-12 w-12 mb-4" style={{ color: "#2A68E1" }} />
              <CardTitle className="text-xl font-bold mb-2" style={{ color: "#2A68E1" }}>
                Qualidade Garantida
              </CardTitle>
              <CardDescription className="text-sk-gray-600 dark:text-sk-gray-300">
                Modelos elaborados por advogados experientes, garantindo conformidade e segurança.
              </CardDescription>
            </Card>
            <Card
              className="flex flex-col items-center text-center p-6 shadow-sm border border-sk-gray-200 dark:border-sk-gray-600 hover:shadow-md transition-all duration-300 animate-fade-in bg-sk-white-DEFAULT dark:bg-card"
              style={{ animationDelay: "0.1s" }}
            >
              <Shield className="h-12 w-12 mb-4" style={{ color: "#1F52B3" }} />
              <CardTitle className="text-xl font-bold mb-2" style={{ color: "#1F52B3" }}>
                Proteção Completa
              </CardTitle>
              <CardDescription className="text-sk-gray-600 dark:text-sk-gray-300">
                Proteja seus interesses, ativos e relacionamentos comerciais com documentos robustos.
              </CardDescription>
            </Card>
            <Card
              className="flex flex-col items-center text-center p-6 shadow-sm border border-sk-gray-200 dark:border-sk-gray-600 hover:shadow-md transition-all duration-300 animate-fade-in bg-sk-white-DEFAULT dark:bg-card"
              style={{ animationDelay: "0.2s" }}
            >
              <Handshake className="h-12 w-12 mb-4" style={{ color: "#2A68E1" }} />
              <CardTitle className="text-xl font-bold mb-2" style={{ color: "#2A68E1" }}>
                Facilidade de Uso
              </CardTitle>
              <CardDescription className="text-sk-gray-600 dark:text-sk-gray-300">
                Interface intuitiva e modelos fáceis de personalizar para suas necessidades.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-muted transition-colors duration-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#1F52B3" }}>
                Modelos em Destaque
              </h2>
              <p className="max-w-[900px] text-sk-gray-600 dark:text-sk-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Confira alguns dos nossos modelos mais populares e comece a proteger seu negócio hoje mesmo.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
            {templates.length > 0 ? (
              templates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-sk-gray-500 dark:text-sk-gray-400">
                Nenhum modelo em destaque encontrado.
              </p>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/templates" prefetch={false}>
              <InteractiveButton
                variant="outline"
                className="px-8 py-3 text-lg font-semibold transition-all transform hover:scale-105 bg-transparent border-2"
                baseColor="#1F52B3"
                hoverColor="#163D85"
              >
                Ver todos os modelos
              </InteractiveButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-sk-white-DEFAULT dark:bg-background transition-colors duration-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#2A68E1" }}>
                O que nossos clientes dizem
              </h2>
              <p className="max-w-[900px] text-sk-gray-600 dark:text-sk-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Depoimentos de empreendedores que transformaram seus negócios com a ScriptioKit.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 shadow-sm border border-sk-gray-200 dark:border-sk-gray-600 hover:shadow-md transition-all duration-300 animate-fade-in bg-sk-white-DEFAULT dark:bg-card">
              <CardContent className="text-center">
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <p className="text-lg font-medium leading-relaxed mb-4 text-sk-gray-800 dark:text-sk-gray-200">
                  &quot;A ScriptioKit simplificou demais a parte jurídica do meu negócio. Modelos claros e fáceis de
                  usar!&quot;
                </p>
                <p className="text-sm font-semibold" style={{ color: "#1F52B3" }}>
                  - Ana Paula, Designer Freelancer
                </p>
              </CardContent>
            </Card>
            <Card
              className="p-6 shadow-sm border border-sk-gray-200 dark:border-sk-gray-600 hover:shadow-md transition-all duration-300 animate-fade-in bg-sk-white-DEFAULT dark:bg-card"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="text-center">
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <p className="text-lg font-medium leading-relaxed mb-4 text-sk-gray-800 dark:text-sk-gray-200">
                  &quot;Economizei tempo e dinheiro com os contratos da ScriptioKit. Essencial para qualquer pequeno
                  negócio.&quot;
                </p>
                <p className="text-sm font-semibold" style={{ color: "#2A68E1" }}>
                  - João Silva, Proprietário de E-commerce
                </p>
              </CardContent>
            </Card>
            <Card
              className="p-6 shadow-sm border border-sk-gray-200 dark:border-sk-gray-600 hover:shadow-md transition-all duration-300 animate-fade-in bg-sk-white-DEFAULT dark:bg-card"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="text-center">
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <Star className="h-5 w-5 text-sk-gold-DEFAULT inline-block mb-2" />
                <p className="text-lg font-medium leading-relaxed mb-4 text-sk-gray-800 dark:text-sk-gray-200">
                  &quot;A segurança jurídica que eu precisava, de forma acessível e prática. Recomendo!&quot;
                </p>
                <p className="text-sm font-semibold" style={{ color: "#1F52B3" }}>
                  - Mariana Costa, Consultora de Marketing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action for Login/Register */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-muted text-foreground transition-colors duration-300">
        <div className="container px-4 md:px-6 text-center">
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4 animate-fade-in"
            style={{ color: "#1F52B3" }}
          >
            Comece a proteger seu negócio hoje!
          </h2>
          <p
            className="max-w-[700px] mx-auto text-lg md:text-xl mb-8 text-sk-gray-600 dark:text-sk-gray-300 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Crie sua conta gratuita para acessar modelos essenciais e gerenciar seus documentos.
          </p>
          <LoginRegisterDialog>
            <InteractiveButton
              className="px-10 py-4 text-xl font-semibold shadow-lg transition-transform transform hover:scale-105 animate-fade-in text-white"
              style={{ animationDelay: "0.2s" }}
              baseColor="#2A68E1"
              hoverColor="#1F52B3"
            >
              Criar Conta Gratuita
            </InteractiveButton>
          </LoginRegisterDialog>
        </div>
      </section>
    </div>
  )
}
