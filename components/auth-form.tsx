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

interface AuthFormProps {
  onAuthSuccess?: () => void // Callback to close dialog on success
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let error = null
    if (isRegister) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      error = signUpError
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      error = signInError
    }

    if (error) {
      toast({
        title: "Erro de Autenticação",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: isRegister ? "Registro Sucesso!" : "Login Sucesso!",
        description: isRegister ? "Verifique seu e-mail para confirmar sua conta." : "Redirecionando para o painel...",
      })
      if (!isRegister) {
        router.push("/dashboard")
        onAuthSuccess?.() // Call callback to close dialog
      }
    }
    setLoading(false)
  }

  const handleMagicLink = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast({
        title: "Erro ao enviar Magic Link",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Magic Link Enviado!",
        description: "Verifique seu e-mail para fazer login.",
      })
    }
    setLoading(false)
  }

  const handlePasswordReset = async () => {
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "E-mail de redefinição enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      })
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-sk-gray-200 dark:border-sk-gray-800 bg-sk-white-DEFAULT dark:bg-sk-gray-900 animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        {/* Título do formulário: Texto em azul */}
        <CardTitle className="text-2xl font-bold text-sk-blue-DEFAULT">
          {isRegister ? "Crie sua conta" : "Faça Login"}
        </CardTitle>
        <CardDescription className="text-sk-gray-600 dark:text-sk-gray-400">
          {isRegister
            ? "Insira seu e-mail e senha para criar uma conta."
            : "Insira seu e-mail e senha para acessar sua conta."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sk-gray-700 dark:text-sk-gray-300">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-sk-gray-300 dark:border-sk-gray-700 bg-sk-white-DEFAULT dark:bg-sk-gray-800 text-sk-gray-900 dark:text-sk-white-DEFAULT focus:border-sk-blue-DEFAULT focus:ring-sk-blue-DEFAULT" /* Borda e anel de foco em azul */
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sk-gray-700 dark:text-sk-gray-300">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-sk-gray-300 dark:border-sk-gray-700 bg-sk-white-DEFAULT dark:bg-sk-gray-800 text-sk-gray-900 dark:text-sk-white-DEFAULT focus:border-sk-blue-DEFAULT focus:ring-sk-blue-DEFAULT" /* Borda e anel de foco em azul */
            />
          </div>
          {/* Botão de submit: Fundo azul, hover mais escuro */}
          <Button
            type="submit"
            className="w-full bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-sk-white-DEFAULT transition-colors"
            disabled={loading}
          >
            {loading ? "Carregando..." : isRegister ? "Registrar" : "Entrar"}
          </Button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-sk-gray-200 dark:border-sk-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-sk-white-DEFAULT dark:bg-sk-gray-900 px-2 text-sk-gray-500 dark:text-sk-gray-400">
              Ou
            </span>
          </div>
        </div>
        {/* Botão "Entrar com Magic Link": Borda e texto em azul, fundo azul claro no hover */}
        <Button
          variant="outline"
          className="w-full mb-2 border-sk-blue-DEFAULT text-sk-blue-DEFAULT hover:bg-sk-blue-100 dark:hover:bg-sk-blue-700 bg-transparent transition-colors"
          onClick={handleMagicLink}
          disabled={loading || !email}
        >
          {loading ? "Enviando..." : "Entrar com Magic Link"}
        </Button>
        {/* Link "Já tem uma conta? Faça login" / "Não tem uma conta? Registre-se": Texto em azul, hover mais escuro */}
        <Button
          variant="link"
          className="w-full text-sm text-sk-blue-DEFAULT hover:text-sk-blue-DEFAULT/80 transition-colors"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Já tem uma conta? Faça login" : "Não tem uma conta? Registre-se"}
        </Button>
        {!isRegister && (
          /* Link "Esqueceu sua senha?": Texto em azul, hover mais escuro */
          <Button
            variant="link"
            className="w-full text-sm text-sk-blue-DEFAULT/80 hover:text-sk-blue-DEFAULT transition-colors"
            onClick={handlePasswordReset}
            disabled={loading || !email}
          >
            Esqueceu sua senha?
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
