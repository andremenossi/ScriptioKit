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
      <h3 className="text-lg font-semibold text-sk-gray-800 dark:text-sk-gray-200">Filtrar por Tipo</h3>

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
                  ? "bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-white"
                  : "border-sk-gray-300 dark:border-sk-gray-600 text-sk-gray-700 dark:text-sk-gray-300 hover:bg-sk-blue-100 dark:hover:bg-sk-blue-900"
              }`}
            >
              {type.label}
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-sk-gray-200 dark:bg-sk-gray-700 text-sk-gray-700 dark:text-sk-gray-300"
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
