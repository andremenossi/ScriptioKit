"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  templateCounts: Record<string, number>
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  templateCounts,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className={`transition-colors ${
          selectedCategory === null
            ? "bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-white"
            : "border-sk-gray-300 dark:border-sk-gray-600 text-sk-gray-700 dark:text-sk-gray-300 hover:bg-sk-blue-100 dark:hover:bg-sk-blue-900"
        }`}
      >
        Todos
        <Badge
          variant="secondary"
          className="ml-2 bg-sk-gray-200 dark:bg-sk-gray-700 text-sk-gray-700 dark:text-sk-gray-300"
        >
          {Object.values(templateCounts).reduce((sum, count) => sum + count, 0)}
        </Badge>
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`transition-colors ${
            selectedCategory === category
              ? "bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-white"
              : "border-sk-gray-300 dark:border-sk-gray-600 text-sk-gray-700 dark:text-sk-gray-300 hover:bg-sk-blue-100 dark:hover:bg-sk-blue-900"
          }`}
        >
          {category}
          <Badge
            variant="secondary"
            className="ml-2 bg-sk-gray-200 dark:bg-sk-gray-700 text-sk-gray-700 dark:text-sk-gray-300"
          >
            {templateCounts[category] || 0}
          </Badge>
        </Button>
      ))}
    </div>
  )
}
