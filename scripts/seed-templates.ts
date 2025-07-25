import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import type { Database } from "@/lib/database.types"

// Ensure these are set in your environment for the script to run
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for direct DB access

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey)

async function seedTemplates() {
  console.log("Iniciando o seed de templates...")

  const templatesToSeed = [
    {
      title: "Contrato de Prestação de Serviços",
      description: "Modelo completo para contratação de serviços, ideal para freelancers e pequenas empresas.",
      category: "Comercial",
      is_premium: false,
      file_path: "/templates/contrato-servicos-gratis.docx",
      icon: "FileText",
      gumroad_link: null,
    },
    {
      title: "Termos de Uso para Website/App",
      description: "Termos e condições essenciais para proteger seu site ou aplicativo.",
      category: "Digital",
      is_premium: true,
      file_path: "termos-de-uso-premium.docx", // Path within the Supabase Storage bucket
      icon: "Lock",
      gumroad_link: "https://gum.co/termos-de-uso-premium", // Replace with actual Gumroad link
    },
    {
      title: "Política de Privacidade (LGPD)",
      description: "Modelo de política de privacidade em conformidade com a LGPD.",
      category: "Digital",
      is_premium: true,
      file_path: "politica-privacidade-lgpd-premium.docx",
      icon: "Lock",
      gumroad_link: "https://gum.co/politica-privacidade-lgpd", // Replace with actual Gumroad link
    },
    {
      title: "Contrato de Trabalho (CLT)",
      description: "Modelo de contrato de trabalho padrão CLT para contratação de funcionários.",
      category: "Trabalhista",
      is_premium: true,
      file_path: "contrato-trabalho-clt-premium.docx",
      icon: "Lock",
      gumroad_link: "https://gum.co/contrato-trabalho-clt", // Replace with actual Gumroad link
    },
    {
      title: "Contrato de Compra e Venda",
      description: "Modelo simples de contrato de compra e venda de bens.",
      category: "Comercial",
      is_premium: false,
      file_path: "/templates/contrato-compra-venda-gratis.docx",
      icon: "FileText",
      gumroad_link: null,
    },
    {
      title: "Acordo de Confidencialidade (NDA)",
      description: "Acordo para proteger informações confidenciais em negociações.",
      category: "Comercial",
      is_premium: true,
      file_path: "acordo-confidencialidade-premium.docx",
      icon: "Lock",
      gumroad_link: "https://gum.co/nda-premium", // Replace with actual Gumroad link
    },
  ]

  for (const template of templatesToSeed) {
    const { data, error } = await supabase
      .from("templates")
      .upsert({ id: uuidv4(), ...template }, { onConflict: "title" }) // Use title as conflict key for upsert
      .select()

    if (error) {
      console.error(`Erro ao inserir/atualizar template "${template.title}":`, error)
    } else {
      console.log(`Template "${template.title}" inserido/atualizado com sucesso.`, data)
    }
  }

  console.log("Seed de templates concluído.")
}

seedTemplates().catch(console.error)
