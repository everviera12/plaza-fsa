"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Utensils,
  Shirt,
  Gamepad2,
  Sparkles,
  Wrench,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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

const SCROLL_AMOUNT = 320;

export default function CategoriesCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  // Disable native horizontal scroll on mobile
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const preventScroll = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      el.dataset.startX = touch.clientX.toString();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!el.dataset.startX) return;
      const touch = e.touches[0];
      const diff = touch.clientX - parseInt(el.dataset.startX);
      if (Math.abs(diff) > 5) {
        e.preventDefault();
      }
    };

    el.addEventListener("touchstart", preventScroll, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", preventScroll);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 overscroll-x-contain touch-pan-y"
            style={{ overscrollBehaviorX: "contain", scrollSnapType: "x mandatory" }}
            role="region"
            aria-label="Categorías"
          >
            {categories.map((cat) => (
              <article
                key={cat.number}
                className="relative group flex flex-col p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:border-blue/30 hover:shadow-lg hover:shadow-blue/10 hover:-translate-y-1 flex-shrink-0 w-full sm:w-auto basis-[280px] sm:basis-auto scroll-snap-start"
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

          {showLeft && (
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:hidden z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-lg text-gray-700 hover:bg-white hover:text-blue transition-all"
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {showRight && (
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:hidden z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-lg text-gray-700 hover:bg-white hover:text-blue transition-all"
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}