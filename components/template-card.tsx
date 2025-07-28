"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, Download, Lock, ShoppingCart } from "lucide-react"
import type { Tables } from "@/lib/database.types"

interface TemplateCardProps {
  template: Tables<"templates">
  style?: React.CSSProperties
}

const IconMap: { [key: string]: React.ElementType } = {
  FileText: FileText,
  Download: Download,
  Lock: Lock,
}

export function TemplateCard({ template, style }: TemplateCardProps) {
  const IconComponent = IconMap["FileText"] // Sempre usar FileText por simplicidade

  // Formatação do preço
  const formatPrice = (price: number) => {
    if (price === 0) return "Gratuito"
    return `R$ ${price.toFixed(2).replace(".", ",")}`
  }

  // URL para download (templates gratuitos) ou compra (premium)
  const getActionUrl = () => {
    if (!template.is_premium) {
      // Template gratuito - link direto para download do Supabase Storage
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/free-templates/${template.file_path}`
    } else {
      // Template premium - redirecionar para página de compra
      return `/comprar/${template.id}`
    }
  }

  return (
    <Card
      className="uniform-card shadow-sm thin-border border-black dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in bg-white dark:bg-gray-900"
      style={style}
    >
      <div className="card-content">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full text-white gradient-blue dark:gradient-blue-dark">
              <IconComponent className="h-6 w-6" />
            </div>
            <Badge
              variant={template.is_premium ? "default" : "secondary"}
              className={
                template.is_premium
                  ? "gradient-blue dark:gradient-blue-dark text-white border-0"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 thin-border border-green-600"
              }
            >
              {formatPrice(template.price)}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold gradient-blue-text dark:gradient-blue-text-dark line-clamp-2">
            {template.title}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-3 flex-1">
            {template.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">{template.category}</p>
            <Badge variant="outline" className="text-xs thin-border border-gray-400 dark:border-gray-500">
              {template.is_premium ? "Premium" : "Gratuito"}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          {template.is_premium ? (
            <Link href={getActionUrl()} className="w-full">
              <Button className="w-full gradient-blue dark:gradient-blue-dark text-white hover:opacity-90 transition-opacity border-0">
                <ShoppingCart className="h-4 w-4 mr-2" /> Comprar
              </Button>
            </Link>
          ) : (
            <Link href={getActionUrl()} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button
                variant="outline"
                className="w-full thin-border gradient-blue-border text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            </Link>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}
