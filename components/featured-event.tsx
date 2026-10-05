"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedEvent() {
  return (
    <section className="py-16 px-10 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative lg:aspect-auto rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/assets/events/decora-pinata.png"
              alt="Taller Decora tu Piñata"
              width={800}
              height={600}
              className="object-cover"
            />
          </div>

          <div className="grid gap-6">
            <div className="space-y-3">
              <span className="inline-block text-sm font-semibold text-teal uppercase tracking-wider">Evento destacado</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Taller Decora tu Piñata</h2>
              <p>
                ¡Dale tu toque a una piñata única! Ven a disfrutar de nuestro Taller Decora tu
                Piñata, una tarde para dejar volar la creatividad y crear un diseño muy especial.
              </p>
            </div>

            <Link href="/eventos"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-teal px-8 py-2 text-base font-semibold text-white"
            >
              Ver evento
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}