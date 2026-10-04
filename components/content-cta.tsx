import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContentCTA() {
  return (
    <div className="px-5 py-8 lg:px-10 lg:py-16 bg-teal text-white">
      <div className="grid gap-3 place-items-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Atención a visitantes</h2>
        <p className="text-lg sm:text-xl leading-relaxed">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo.
        </p>

        <Link href="/contacto" className="inline-flex mt-8 items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-teal">
          Contáctanos
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}