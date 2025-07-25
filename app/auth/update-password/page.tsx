"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      toast({
        title: "Erro ao atualizar senha",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Senha atualizada com sucesso!",
        description: "Sua senha foi redefinida. Você será redirecionado para o login.",
      })
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md mx-auto animate-fade-in shadow-lg border border-sk-gray-200 dark:border-sk-gray-800 bg-sk-white-DEFAULT dark:bg-sk-gray-900">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-sk-blue-DEFAULT">Redefinir Senha</CardTitle>
          <CardDescription className="text-sk-gray-600 dark:text-sk-gray-400">
            Insira sua nova senha abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sk-gray-700 dark:text-sk-gray-300">
                Nova Senha
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-sk-gray-300 dark:border-sk-gray-700 bg-sk-white-DEFAULT dark:bg-sk-gray-800 text-sk-gray-900 dark:text-sk-white-DEFAULT"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-sk-gray-700 dark:text-sk-gray-300">
                Confirmar Nova Senha
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-sk-gray-300 dark:border-sk-gray-700 bg-sk-white-DEFAULT dark:bg-sk-gray-800 text-sk-gray-900 dark:text-sk-white-DEFAULT"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-sk-white-DEFAULT transition-colors"
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Atualizar Senha"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
