"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroHeader() {
    return (
        <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center">
            <div className="absolute inset-0 z-0">
                <Image src="/assets/san-aguistin-fachada.png" alt="Fachada de Plaza Fiesta San Agustín" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-5">
                <div className="grid gap-4 max-w-2xl sm:max-w-xl sm:gap-6">
                    <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Tu lugar en el corazón de San Agustín</h1>
                    <p className="text-base text-white sm:text-lg lg:text-xl">
                        Descubre la mejor oferta comercial, gastronómica y de entretenimiento en un solo lugar.
                        Espacios diseñados para que tu negocio crezca.
                    </p>
                    <Link
                        href="/directorio"
                        className="w-fit items-center gap-2 rounded-full bg-white px-8 py-2 text-sm sm:text-base font-semibold text-blue"
                    >
                        Ver directorio
                    </Link>
                </div>
            </div>
        </section>
    );
}