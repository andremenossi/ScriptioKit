"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ onSearch, placeholder = "Pesquisar templates...", className }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sk-gray-500 dark:text-sk-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-10 border-sk-gray-300 dark:border-sk-gray-600 bg-sk-white-DEFAULT dark:bg-sk-gray-700 text-sk-gray-900 dark:text-sk-gray-100 focus:border-sk-blue-DEFAULT focus:ring-sk-blue-DEFAULT"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-sk-gray-100 dark:hover:bg-sk-gray-600"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
