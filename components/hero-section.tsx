"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 text-foreground transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4 animate-fade-in">
            <div className="space-y-2">
              <h1 className="hero-title text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-blue-text dark:gradient-blue-text-dark">
                Documentos jurídicos prontos para proteger seu negócio.
              </h1>
              <p className="max-w-[600px] text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Obtenha modelos de contratos comerciais, trabalhistas e mais, criados por especialistas para sua
                tranquilidade.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/templates" prefetch={false}>
                <Button className="gradient-blue dark:gradient-blue-dark text-white hover:opacity-90 px-8 py-3 text-lg font-semibold shadow-lg transition-all transform hover:scale-105 border-0">
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
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last animate-fade-in thin-border border-black dark:border-gray-700"
          />
        </div>
      </div>
    </section>
  )
}
