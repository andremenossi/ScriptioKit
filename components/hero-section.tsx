"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-sk-white-DEFAULT dark:bg-sk-gray-950 text-foreground transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4 animate-fade-in">
            <div className="space-y-2">
              {/* Título principal da Hero: Azul direto com estilo inline */}
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                style={{ color: "#2A68E1" }}
              >
                Documentos jurídicos prontos para proteger seu negócio.
              </h1>
              <p className="max-w-[600px] text-lg md:text-xl text-sk-gray-600 dark:text-sk-gray-400">
                Obtenha modelos de contratos comerciais, trabalhistas e mais, criados por especialistas para sua
                tranquilidade.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/templates" prefetch={false}>
                {/* Botão "Veja os modelos": Fundo dourado (mantido para contraste) */}
                <Button className="bg-sk-gold-DEFAULT text-sk-gray-900 hover:bg-sk-gold-DEFAULT/90 px-8 py-3 text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
                  Veja os modelos
                </Button>
              </Link>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=550&width=550"
            width={550}
            height={550}
            alt="Hero Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last animate-fade-in"
          />
        </div>
      </div>
    </section>
  )
}
