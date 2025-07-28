import { Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Título da página: Texto em azul */}
      <h1 className="text-4xl font-bold text-center mb-8 gradient-blue-text dark:gradient-blue-text-dark">
        Entre em Contato
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
        Tem alguma dúvida, sugestão ou precisa de suporte? Fale conosco!
      </p>

      <div className="max-w-xl mx-auto grid gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm animate-fade-in bg-white dark:bg-gray-800">
          {/* Ícone de e-mail: Texto em azul */}
          <Mail className="h-12 w-12 gradient-blue-text dark:gradient-blue-text-dark mb-4" />
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">E-mail</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Envie-nos um e-mail e responderemos o mais breve possível.
          </p>
          {/* Link de e-mail: Texto em azul no hover */}
          <Link
            href="mailto:contato@juridocs.com.br"
            className="gradient-blue-text dark:gradient-blue-text-dark hover:underline font-semibold hover:opacity-80 transition-opacity"
          >
            contato@juridocs.com.br
          </Link>
        </div>

        <div
          className="flex flex-col items-center text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm animate-fade-in bg-white dark:bg-gray-800"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Ícone de telefone: Texto em azul */}
          <Phone className="h-12 w-12 gradient-blue-text dark:gradient-blue-text-dark mb-4" />
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Telefone</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Para suporte mais rápido, ligue para nós.</p>
          {/* Link de telefone: Texto em azul no hover */}
          <Link
            href="tel:+5511999999999"
            className="gradient-blue-text dark:gradient-blue-text-dark hover:underline font-semibold hover:opacity-80 transition-opacity"
          >
            +55 (11) 99999-9999
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>Nosso horário de atendimento é de Segunda a Sexta-feira, das 9h às 18h (Horário de Brasília).</p>
      </div>
    </div>
  )
}
