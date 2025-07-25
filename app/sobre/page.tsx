export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Título da página: Texto em azul */}
      <h1 className="text-4xl font-bold text-center mb-8 text-sk-blue-DEFAULT">Sobre a ScriptioKit</h1>
      <div className="max-w-3xl mx-auto text-lg text-sk-gray-600 dark:text-sk-gray-400 space-y-6">
        <p>
          Na ScriptioKit, nossa missão é simplificar contratos e documentos jurídicos para pequenos negócios e
          freelancers. Entendemos os desafios que empreendedores enfrentam ao lidar com a burocracia legal e estamos
          aqui para oferecer soluções práticas, acessíveis e seguras.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold text-sk-blue-DEFAULT mt-8 mb-4">Coleta de Informações</h2>
        <p>
          Coletamos informações que você nos fornece diretamente ao se registrar, fazer login, comprar modelos ou entrar
          em contato conosco. Isso pode incluir seu nome, endereço de e-mail e informações de pagamento.
        </p>
        <p>
          Também coletamos automaticamente certas informações quando você visita nosso site, como seu endereço IP, tipo
          de navegador, páginas visitadas e horários de acesso, através de cookies e tecnologias similares.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold text-sk-blue-DEFAULT mt-8 mb-4">Uso das Informações</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fornecer e manter nossos serviços;</li>
          <li>Processar suas transações e enviar notificações relacionadas;</li>
          <li>Melhorar, personalizar e expandir nossos serviços;</li>
          <li>Comunicar-nos com você, incluindo para fins de suporte ao cliente;</li>
          <li>Monitorar e analisar tendências, uso e atividades em conexão com nossos serviços;</li>
          <li>Detectar, investigar e prevenir atividades fraudulentas e outras atividades ilegais.</li>
        </ul>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold text-sk-blue-DEFAULT mt-8 mb-4">Compartilhamento de Informações</h2>
        <p>Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Com provedores de serviços que nos auxiliam na operação do site e na prestação de serviços (ex: Supabase
            para autenticação e banco de dados, Gumroad para processamento de pagamentos);
          </li>
          <li>Para cumprir com obrigações legais ou responder a processos judiciais;</li>
          <li>Para proteger os direitos, propriedade ou segurança da ScriptioKit, nossos usuários ou o público.</li>
        </ul>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold text-sk-blue-DEFAULT mt-8 mb-4">Segurança dos Dados</h2>
        <p>
          Empregamos medidas de segurança razoáveis para proteger suas informações pessoais contra acesso não
          autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou
          armazenamento eletrônico é 100% seguro.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold text-sk-blue-DEFAULT mt-8 mb-4">Seus Direitos</h2>
        <p>
          Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão de suas informações pessoais. Para
          exercer esses direitos, entre em contato conosco através dos canais fornecidos em nossa página de contato.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold text-sk-blue-DEFAULT mt-8 mb-4">Alterações a Esta Política</h2>
        <p>
          Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações
          publicando a nova Política de Privacidade nesta página. Recomendamos que você revise esta Política de
          Privacidade periodicamente para quaisquer alterações.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold text-sk-blue-DEFAULT mt-8 mb-4">Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do nosso
          e-mail:
          {/* Link de e-mail: Texto em azul no hover */}
          <a
            href="mailto:contato@scriptiokit.com.br"
            className="text-sk-blue-DEFAULT hover:underline ml-1 hover:text-sk-blue-DEFAULT/80 transition-colors"
          >
            contato@scriptiokit.com.br
          </a>
          .
        </p>
      </div>
    </div>
  )
}
