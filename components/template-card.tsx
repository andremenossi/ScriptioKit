"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Download, Lock } from "lucide-react"
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
  const IconComponent = IconMap[template.icon || "FileText"]

  return (
    <Card
      className="flex flex-col justify-between shadow-sm border border-sk-gray-200 dark:border-sk-gray-600 hover:shadow-md transition-all duration-300 animate-fade-in bg-sk-white-DEFAULT dark:bg-card"
      style={style}
    >
      <CardHeader>
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full text-white mb-4"
          style={{ backgroundColor: "#2A68E1" }}
        >
          {IconComponent && <IconComponent className="h-6 w-6" />}
        </div>
        <CardTitle className="text-xl font-bold" style={{ color: "#2A68E1" }}>
          {template.title}
        </CardTitle>
        <CardDescription className="text-sk-gray-600 dark:text-sk-gray-300">{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-sk-gray-500 dark:text-sk-gray-400">Categoria: {template.category}</p>
      </CardContent>
      <CardFooter>
        {template.is_premium ? (
          <Link href={template.gumroad_link || "#"} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button
              variant="outline"
              className="w-full bg-transparent transition-colors"
              style={{ borderColor: "#C9A236", color: "#C9A236" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C9A236"
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#C9A236"
              }}
            >
              <Lock className="h-4 w-4 mr-2" /> Comprar Premium
            </Button>
          </Link>
        ) : (
          <Link href={template.file_path || "#"} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button
              variant="outline"
              className="w-full bg-transparent transition-colors"
              style={{ borderColor: "#2A68E1", color: "#2A68E1" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2A68E1"
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#2A68E1"
              }}
            >
              <Download className="h-4 w-4 mr-2" /> Download Grátis
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
