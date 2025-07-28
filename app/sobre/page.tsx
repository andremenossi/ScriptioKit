export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Título da página: Texto em azul */}
      <h1 className="text-4xl font-bold text-center mb-8 text-sk-blue-DEFAULT gradient-blue-text dark:gradient-blue-text-dark">
        Sobre a JuridiDocs
      </h1>
      <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 space-y-6">
        <p>
          Na JuridiDocs, nossa missão é simplificar contratos e documentos jurídicos para pequenos negócios e
          freelancers. Entendemos os desafios que empreendedores enfrentam ao lidar com a burocracia legal e estamos
          aqui para oferecer soluções práticas, acessíveis e seguras.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">Nossa Missão</h2>
        <p>
          Democratizar o acesso a documentos jurídicos de qualidade, oferecendo modelos profissionais criados por
          especialistas para proteger e impulsionar seu negócio.
        </p>
        <p>
          Acreditamos que todo empreendedor merece ter acesso a ferramentas jurídicas confiáveis, sem a complexidade e
          os custos elevados tradicionalmente associados a serviços advocatícios.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          O que Oferecemos
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Modelos de contratos comerciais e trabalhistas;</li>
          <li>Documentos em conformidade com a legislação brasileira;</li>
          <li>Políticas de privacidade adequadas à LGPD;</li>
          <li>Termos de uso para websites e aplicativos;</li>
          <li>Acordos de confidencialidade e muito mais;</li>
          <li>Suporte especializado para dúvidas sobre os modelos.</li>
        </ul>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          Por que Escolher a JuridiDocs?
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Qualidade Garantida:</strong> Todos os modelos são elaborados por advogados experientes;
          </li>
          <li>
            <strong>Facilidade de Uso:</strong> Interface intuitiva e documentos fáceis de personalizar;
          </li>
          <li>
            <strong>Preços Acessíveis:</strong> Modelos gratuitos e premium com excelente custo-benefício;
          </li>
          <li>
            <strong>Atualizações Constantes:</strong> Documentos sempre em conformidade com as leis vigentes;
          </li>
          <li>
            <strong>Suporte Dedicado:</strong> Equipe pronta para ajudar com suas dúvidas.
          </li>
        </ul>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          Nosso Compromisso
        </h2>
        <p>
          Estamos comprometidos em fornecer documentos jurídicos de alta qualidade que protegem seus interesses e
          facilitam o crescimento do seu negócio. Nossa equipe trabalha constantemente para manter nossos modelos
          atualizados e em conformidade com as mudanças na legislação.
        </p>
        {/* Títulos de subseções: Texto em azul */}
        <h2 className="text-2xl font-bold gradient-blue-text dark:gradient-blue-text-dark mt-8 mb-4">
          Entre em Contato
        </h2>
        <p>
          Tem alguma dúvida ou sugestão? Adoraríamos ouvir de você! Entre em contato conosco através do nosso e-mail:
          {/* Link de e-mail: Texto em azul no hover */}
          <a
            href="mailto:contato@juridocs.com.br"
            className="gradient-blue-text dark:gradient-blue-text-dark hover:underline ml-1 hover:opacity-80 transition-opacity"
          >
            contato@juridocs.com.br
          </a>
          .
        </p>
      </div>
    </div>
  )
}
