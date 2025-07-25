"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface AccountSettingsFormProps {
  userEmail: string
}

export function AccountSettingsForm({ userEmail }: AccountSettingsFormProps) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      toast({
        title: "Erro ao alterar senha",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Senha alterada com sucesso!",
        description: "Sua senha foi atualizada.",
      })
      setNewPassword("")
      setConfirmPassword("")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="current-email" className="text-sk-gray-700 dark:text-sk-gray-300">
          E-mail Atual
        </Label>
        <Input
          id="current-email"
          type="email"
          value={userEmail}
          disabled
          className="bg-sk-gray-100 dark:bg-sk-gray-800 border-sk-gray-200 dark:border-sk-gray-700 text-sk-gray-700 dark:text-sk-gray-300"
        />
      </div>

      <form onSubmit={handleChangePassword} className="space-y-4">
        {/* Título da seção: Texto em azul */}
        <h3 className="text-lg font-semibold text-sk-blue-DEFAULT">Alterar Senha</h3>
        <div className="grid gap-2">
          <Label htmlFor="new-password" className="text-sk-gray-700 dark:text-sk-gray-300">
            Nova Senha
          </Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
            className="border-sk-gray-300 dark:border-sk-gray-700 bg-sk-white-DEFAULT dark:bg-sk-gray-800 text-sk-gray-900 dark:text-sk-white-DEFAULT focus:border-sk-blue-DEFAULT focus:ring-sk-blue-DEFAULT" /* Borda e anel de foco em azul */
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password" className="text-sk-gray-700 dark:text-sk-gray-300">
            Confirmar Nova Senha
          </Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border-sk-300 dark:border-sk-gray-700 bg-sk-white-DEFAULT dark:bg-sk-gray-800 text-sk-gray-900 dark:text-sk-white-DEFAULT focus:border-sk-blue-DEFAULT focus:ring-sk-blue-DEFAULT" /* Borda e anel de foco em azul */
          />
        </div>
        {/* Botão de submit: Fundo azul, hover mais escuro */}
        <Button
          type="submit"
          className="w-full bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-sk-white-DEFAULT transition-colors"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Alterar Senha"}
        </Button>
      </form>
    </div>
  )
}
