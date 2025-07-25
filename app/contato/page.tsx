import { Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Título da página: Texto em azul */}
      <h1 className="text-4xl font-bold text-center mb-8 text-sk-blue-DEFAULT">Entre em Contato</h1>
      <p className="text-center text-sk-gray-600 dark:text-sk-gray-400 max-w-2xl mx-auto mb-12">
        Tem alguma dúvida, sugestão ou precisa de suporte? Fale conosco!
      </p>

      <div className="max-w-xl mx-auto grid gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center text-center p-6 border border-sk-gray-200 dark:border-sk-gray-800 rounded-lg shadow-sm animate-fade-in bg-sk-white-DEFAULT dark:bg-sk-gray-900">
          {/* Ícone de e-mail: Texto em azul */}
          <Mail className="h-12 w-12 text-sk-blue-DEFAULT mb-4" />
          <h2 className="text-xl font-bold mb-2 text-sk-gray-900 dark:text-sk-white-DEFAULT">E-mail</h2>
          <p className="text-sk-gray-600 dark:text-sk-gray-400 mb-4">
            Envie-nos um e-mail e responderemos o mais breve possível.
          </p>
          {/* Link de e-mail: Texto em azul no hover */}
          <Link
            href="mailto:contato@scriptiokit.com.br"
            className="text-sk-blue-DEFAULT hover:underline font-semibold hover:text-sk-blue-DEFAULT/80 transition-colors"
          >
            contato@scriptiokit.com.br
          </Link>
        </div>

        <div
          className="flex flex-col items-center text-center p-6 border border-sk-gray-200 dark:border-sk-gray-800 rounded-lg shadow-sm animate-fade-in bg-sk-white-DEFAULT dark:bg-sk-gray-900"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Ícone de telefone: Texto em azul */}
          <Phone className="h-12 w-12 text-sk-blue-DEFAULT mb-4" />
          <h2 className="text-xl font-bold mb-2 text-sk-gray-900 dark:text-sk-white-DEFAULT">Telefone</h2>
          <p className="text-sk-600 dark:text-sk-gray-400 mb-4">Para suporte mais rápido, ligue para nós.</p>
          {/* Link de telefone: Texto em azul no hover */}
          <Link
            href="tel:+5511999999999"
            className="text-sk-blue-DEFAULT hover:underline font-semibold hover:text-sk-blue-DEFAULT/80 transition-colors"
          >
            +55 (11) 99999-9999
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-12 text-center text-sk-gray-600 dark:text-sk-gray-400">
        <p>Nosso horário de atendimento é de Segunda a Sexta-feira, das 9h às 18h (Horário de Brasília).</p>
      </div>
    </div>
  )
}
