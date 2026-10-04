"use client";

import Link from "next/link";
import {
    Utensils,
    Shirt,
    Gamepad2,
    Sparkles,
    Wrench,
    Calendar,
    ArrowRight,
} from "lucide-react";

const categories = [
    {
        number: "01",
        icon: Utensils,
        title: "Comida",
        description: "Descubre restaurantes, cafeterías y sabores para todos.",
        href: "/directorio?categoria=comida",
    },
    {
        number: "02",
        icon: Shirt,
        title: "Moda",
        description: "Encuentra tus marcas favoritas.",
        href: "/directorio?categoria=moda",
    },
    {
        number: "03",
        icon: Gamepad2,
        title: "Entretenimiento",
        description: "Momentos para disfrutar con amigos y familia.",
        href: "/directorio?categoria=entretenimiento",
    },
    {
        number: "04",
        icon: Sparkles,
        title: "Belleza",
        description: "Todo para consentirte.",
        href: "/directorio?categoria=belleza",
    },
    {
        number: "05",
        icon: Wrench,
        title: "Servicios",
        description: "Encuentra los servicios que necesitas.",
        href: "/directorio?categoria=servicios",
    },
    {
        number: "06",
        icon: Calendar,
        title: "Eventos",
        description: "Descubre lo que está pasando en la plaza.",
        href: "/eventos",
    },
];

export default function CategoriesCards() {
    return (
        <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Eventos
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                        Descubre lo que está pasando en la plaza.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <article
                            key={cat.number}
                            className="relative group flex flex-col p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:border-blue/30 hover:shadow-lg hover:shadow-blue/10 hover:-translate-y-1"
                        >
                            <span className="absolute top-5 right-5 text-xs font-bold text-gray-300">
                                {cat.number}
                            </span>

                            <cat.icon className="h-10 w-10 text-blue mb-5" aria-hidden="true" />

                            <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6 flex-1">{cat.description}</p>

                            <Link
                                href={cat.href}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-blue/80 transition-colors group-hover:gap-3"
                            >
                                Ver más
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}