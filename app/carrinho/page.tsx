"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface CartItem {
  id: string
  title: string
  description: string
  price: number
  quantity: number
  gumroad_link?: string
}

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // Simular carregamento do carrinho (localStorage ou API)
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("juridocs-cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      } else {
        // Itens de exemplo para demonstração
        setCartItems([
          {
            id: "1",
            title: "Contrato de Prestação de Serviços Premium",
            description: "Modelo completo com cláusulas avançadas de proteção",
            price: 29.9,
            quantity: 1,
            gumroad_link: "https://gum.co/contrato-servicos-premium",
          },
          {
            id: "2",
            title: "Política de Privacidade (LGPD)",
            description: "Modelo em conformidade com a LGPD",
            price: 19.9,
            quantity: 2,
            gumroad_link: "https://gum.co/politica-privacidade-lgpd",
          },
        ])
      }
      setLoading(false)
    }

    loadCart()
  }, [])

  // Salvar carrinho no localStorage
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem("juridocs-cart", JSON.stringify(items))
    setCartItems(items)
  }

  // Atualizar quantidade
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    saveCart(updatedItems)
  }

  // Remover item
  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    saveCart(updatedItems)
  }

  // Limpar carrinho
  const clearCart = () => {
    saveCart([])
  }

  // Calcular total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="container py-12 md:py-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 gradient-blue-text dark:gradient-blue-text-dark animate-pulse" />
          <p className="text-gray-600 dark:text-gray-300">Carregando carrinho...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 gradient-blue-text dark:gradient-blue-text-dark" />
          <h1 className="text-4xl font-bold mb-4 gradient-blue-text dark:gradient-blue-text-dark">
            Carrinho de Compras
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {itemCount > 0
              ? `${itemCount} ${itemCount === 1 ? "item" : "itens"} no seu carrinho`
              : "Seu carrinho está vazio"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center p-8 bg-white dark:bg-gray-900 thin-border border-black dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Seu carrinho está vazio</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Explore nossos modelos de documentos jurídicos e adicione ao carrinho.
              </p>
              <Link href="/templates">
                <Button className="gradient-blue dark:gradient-blue-dark text-white hover:opacity-90 transition-opacity">
                  Ver Templates
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="bg-white dark:bg-gray-900 thin-border border-black dark:border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg gradient-blue-text dark:gradient-blue-text-dark">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                          {item.description}
                        </CardDescription>
                      </div>
                      <Badge className="gradient-blue dark:gradient-blue-dark text-white border-0">
                        R$ {item.price.toFixed(2)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 thin-border border-gray-400 dark:border-gray-500"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 thin-border border-gray-400 dark:border-gray-500"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg gradient-blue-text dark:gradient-blue-text-dark">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 thin-border border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <Card className="bg-white dark:bg-gray-900 thin-border border-black dark:border-gray-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="gradient-blue-text dark:gradient-blue-text-dark">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Taxa de processamento:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">R$ 0,00</span>
                  </div>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="gradient-blue-text dark:gradient-blue-text-dark">Total:</span>
                    <span className="gradient-blue-text dark:gradient-blue-text-dark">R$ {total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full gradient-blue dark:gradient-blue-dark text-white hover:opacity-90 transition-opacity">
                    Finalizar Compra
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full thin-border border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                  >
                    Limpar Carrinho
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
