"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Tables } from "@/lib/database.types"

interface PurchaseFormProps {
  template: Tables<"templates">
}

export function PurchaseForm({ template }: PurchaseFormProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Verificar se usuário está logado
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Login necessário",
          description: "Você precisa estar logado para fazer uma compra. Redirecionando...",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      // Simular processamento de pagamento
      // Em um sistema real, aqui você integraria com um gateway de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Registrar compra no banco
      const { error } = await supabase.from("purchases").insert({
        user_id: user.id,
        template_id: template.id,
        amount_paid: template.price,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Compra realizada com sucesso!",
        description: "Você já pode acessar seu template no dashboard.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Erro na compra:", error)
      toast({
        title: "Erro na compra",
        description: "Ocorreu um erro ao processar sua compra. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handlePurchase} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
            Nome Completo
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-600 focus:ring-blue-600"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-600 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Resumo da Compra */}
      <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 dark:text-gray-400">Template:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{template.title}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 dark:text-gray-400">Preço:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(template.price)}</span>
          </div>
          <hr className="my-3 border-gray-200 dark:border-gray-600" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Total:</span>
            <span className="text-lg font-bold gradient-blue-text dark:gradient-blue-text-dark">
              {formatPrice(template.price)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full gradient-blue dark:gradient-blue-dark text-white hover:opacity-90 transition-opacity py-3 text-lg"
        disabled={loading}
      >
        {loading ? "Processando..." : `Comprar por ${formatPrice(template.price)}`}
      </Button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        * Esta é uma simulação. Em produção, seria integrado com um gateway de pagamento real.
      </p>
    </form>
  )
}
