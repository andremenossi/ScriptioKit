"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PremiumFilterProps {
  selectedTypes: ("free" | "premium")[]
  onTypeToggle: (type: "free" | "premium") => void
  freeCounts: { free: number; premium: number }
}

export function PremiumFilter({ selectedTypes, onTypeToggle, freeCounts }: PremiumFilterProps) {
  const types = [
    { key: "free" as const, label: "Gratuitos", count: freeCounts.free },
    { key: "premium" as const, label: "Premium", count: freeCounts.premium },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filtrar por Tipo</h3>

      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type.key)
          return (
            <Button
              key={type.key}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onTypeToggle(type.key)}
              className={`transition-colors ${
                isSelected
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500"
              }`}
            >
              {type.label}
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  isSelected
                    ? "bg-white/20 text-white border-0"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {type.count}
              </Badge>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
