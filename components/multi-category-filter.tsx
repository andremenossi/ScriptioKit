"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface MultiCategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryToggle: (category: string) => void
  onClearCategories: () => void
  templateCounts: Record<string, number>
}

export function MultiCategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
  templateCounts,
}: MultiCategoryFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-sk-gray-800 dark:text-sk-gray-200">Filtrar por Categoria</h3>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCategories}
            className="text-sk-blue-DEFAULT hover:text-sk-blue-DEFAULT/80 hover:bg-sk-blue-100 dark:hover:bg-sk-blue-900"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category)
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryToggle(category)}
              className={`transition-colors ${
                isSelected
                  ? "bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-white"
                  : "border-sk-gray-300 dark:border-sk-gray-600 text-sk-gray-700 dark:text-sk-gray-300 hover:bg-sk-blue-100 dark:hover:bg-sk-blue-900"
              }`}
            >
              {category}
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-sk-gray-200 dark:bg-sk-gray-700 text-sk-gray-700 dark:text-sk-gray-300"
                }`}
              >
                {templateCounts[category] || 0}
              </Badge>
            </Button>
          )
        })}
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-sm text-sk-gray-600 dark:text-sk-gray-400 mr-2">Filtros ativos:</span>
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-sk-blue-100 dark:bg-sk-blue-900 text-sk-blue-800 dark:text-sk-blue-200 cursor-pointer hover:bg-sk-blue-200 dark:hover:bg-sk-blue-800"
              onClick={() => onCategoryToggle(category)}
            >
              {category}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
