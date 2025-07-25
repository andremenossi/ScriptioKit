import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google" // Ensure this import is present
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

// Configure Montserrat using @next/font/google
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Explicitly define weights
  variable: "--font-montserrat", // Optional: if you want to use it via CSS variable
})

export const metadata: Metadata = {
  title: "ScriptioKit - Documentos Jurídicos Prontos",
  description: "Obtenha modelos de contratos comerciais, trabalhistas e mais para proteger seu negócio.",
  keywords: ["contratos", "documentos jurídicos", "modelos", "negócios", "freelancers", "jurídico"],
  openGraph: {
    title: "ScriptioKit - Documentos Jurídicos Prontos",
    description: "Obtenha modelos de contratos comerciais, trabalhistas e mais para proteger seu negócio.",
    url: "https://www.scriptiokit.com.br", // Replace with your actual domain
    siteName: "ScriptioKit",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "ScriptioKit - Documentos Jurídicos Prontos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptioKit - Documentos Jurídicos Prontos",
    description: "Obtenha modelos de contratos comerciais, trabalhistas e mais para proteger seu negócio.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
          {/* Google Analytics Placeholder */}
          {process.env.NODE_ENV === "production" && (
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_TRACKING_ID"></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-YOUR_GA_TRACKING_ID');
                  `,
                }}
              />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
