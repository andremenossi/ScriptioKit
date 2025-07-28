export default function TermsOfUsePage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold text-center mb-8 gradient-blue-text dark:gradient-blue-text-dark">
        Termos de Uso
      </h1>
      <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 space-y-6">
        <p>
          Bem-vindo à JuridiDocs. Estes Termos de Uso regem o uso de nosso site e serviços. Ao acessar ou usar nossos
          serviços, você concorda em cumprir estes termos.
        </p>

        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          1. Aceitação dos Termos
        </h2>
        <p>
          Ao acessar e usar este site, você aceita e concorda em ficar vinculado aos termos e condições deste acordo. Se
          você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
        </p>

        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          2. Uso dos Modelos
        </h2>
        <p>
          Os modelos de documentos fornecidos pela JuridiDocs são para uso pessoal e comercial do comprador. É
          estritamente proibida a revenda, redistribuição ou compartilhamento dos modelos com terceiros.
        </p>

        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          3. Propriedade Intelectual
        </h2>
        <p>
          Todos os conteúdos, modelos, textos, gráficos, logotipos e outros materiais no site são propriedade da
          JuridiDocs e estão protegidos por leis de direitos autorais e propriedade intelectual.
        </p>

        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          4. Limitação de Responsabilidade
        </h2>
        <p>
          Os modelos fornecidos são para fins informativos e não constituem aconselhamento jurídico. Recomendamos
          consultar um advogado para situações específicas. A JuridiDocs não se responsabiliza por danos decorrentes do
          uso dos modelos.
        </p>

        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          5. Modificações dos Termos
        </h2>
        <p>
          Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
          imediatamente após a publicação no site. É sua responsabilidade revisar periodicamente estes termos.
        </p>

        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">6. Contato</h2>
        <p>
          Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail:
          <a
            href="mailto:contato@juridocs.com.br"
            className="gradient-blue-text dark:gradient-blue-text-dark hover:underline ml-1"
          >
            contato@juridocs.com.br
          </a>
          .
        </p>
      </div>
    </div>
  )
}
