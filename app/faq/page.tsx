import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Título da página: Texto em azul */}
      <h1 className="text-4xl font-bold text-center mb-8 text-sk-blue-DEFAULT">Perguntas Frequentes (FAQ)</h1>
      <p className="text-center text-sk-gray-600 dark:text-sk-gray-400 max-w-2xl mx-auto mb-12">
        Encontre respostas para as dúvidas mais comuns sobre nossos modelos de documentos jurídicos.
      </p>

      <div className="max-w-3xl mx-auto border border-sk-gray-200 dark:border-sk-gray-800 rounded-lg overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-sk-gray-200 dark:border-sk-gray-800">
            {/* Título do Accordion: Texto em azul, fundo azul no hover */}
            <AccordionTrigger className="text-lg font-semibold text-sk-blue-DEFAULT hover:no-underline px-6 py-4 transition-colors hover:bg-sk-blue-100 dark:hover:bg-sk-blue-700">
              Os modelos são válidos legalmente?
            </AccordionTrigger>
            <AccordionContent className="text-sk-gray-600 dark:text-sk-gray-400 text-base px-6 pb-4">
              Sim, todos os nossos modelos são elaborados por advogados especializados e revisados periodicamente para
              garantir sua validade e conformidade com a legislação brasileira. No entanto, recomendamos que você
              personalize o modelo para sua situação específica e, se necessário, consulte um advogado para casos
              complexos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-sk-gray-200 dark:border-sk-gray-800">
            {/* Título do Accordion: Texto em azul, fundo azul no hover */}
            <AccordionTrigger className="text-lg font-semibold text-sk-blue-DEFAULT hover:no-underline px-6 py-4 transition-colors hover:bg-sk-blue-100 dark:hover:bg-sk-blue-700">
              Em que formato os modelos são entregues?
            </AccordionTrigger>
            <AccordionContent className="text-sk-gray-600 dark:text-sk-gray-400 text-base px-6 pb-4">
              Nossos modelos são geralmente entregues em formato .DOCX (Microsoft Word), o que permite fácil edição e
              personalização. Alguns modelos podem ter versões em PDF para referência.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-sk-gray-200 dark:border-sk-gray-800">
            {/* Título do Accordion: Texto em azul, fundo azul no hover */}
            <AccordionTrigger className="text-lg font-semibold text-sk-blue-DEFAULT hover:no-underline px-6 py-4 transition-colors hover:bg-sk-blue-100 dark:hover:bg-sk-blue-700">
              Como faço para editar os modelos?
            </AccordionTrigger>
            <AccordionContent className="text-sk-gray-600 dark:text-sk-gray-400 text-base px-6 pb-4">
              Após o download, você pode abrir o arquivo .DOCX em qualquer editor de texto compatível (como Microsoft
              Word, Google Docs, LibreOffice Writer). Basta preencher os campos indicados e adaptar o conteúdo às suas
              necessidades.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b border-sk-gray-200 dark:border-sk-gray-800">
            {/* Título do Accordion: Texto em azul, fundo azul no hover */}
            <AccordionTrigger className="text-lg font-semibold text-sk-blue-DEFAULT hover:no-underline px-6 py-4 transition-colors hover:bg-sk-blue-100 dark:hover:bg-sk-blue-700">
              Posso usar os modelos para múltiplos clientes/projetos?
            </AccordionTrigger>
            <AccordionContent className="text-sk-gray-600 dark:text-sk-gray-400 text-base px-6 pb-4">
              Sim, uma vez adquirido, você pode usar o modelo quantas vezes precisar para seus próprios negócios e
              clientes. A revenda ou distribuição dos modelos é estritamente proibida.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-b-0">
            {/* Título do Accordion: Texto em azul, fundo azul no hover */}
            <AccordionTrigger className="text-lg font-semibold text-sk-blue-DEFAULT hover:no-underline px-6 py-4 transition-colors hover:bg-sk-blue-100 dark:hover:bg-sk-blue-700">
              O que acontece se eu tiver dúvidas após o download?
            </AccordionTrigger>
            <AccordionContent className="text-sk-gray-600 dark:text-sk-gray-400 text-base px-6 pb-4">
              Nossa equipe de suporte está disponível para ajudar com dúvidas relacionadas ao acesso e formato dos
              arquivos. Para questões jurídicas específicas, recomendamos a consulta a um advogado.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
