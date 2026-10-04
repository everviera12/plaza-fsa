"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/directorio", label: "Directorio" },
    { href: "/eventos", label: "Eventos" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="mx-auto max-w-400">
      <nav className="flex items-center justify-between px-10 py-3">
        <Link href="/" className="flex items-center">
          <Image src="/plaza-fiesta-san-aguistin.svg" alt="Logo de Plaza Fiesta San Agustín" width={70} height={70} />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-700 hover:text-blue transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/renta-un-local"
            className="rounded-full bg-blue px-7 py-2.5 text-sm font-semibold text-white"
          >
            Renta un local
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-7 w-7 transition-transform duration-300 rotate-90" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-60 bg-white flex flex-col px-10 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/plaza-fiesta-san-aguistin.svg" alt="Logo de Plaza Fiesta San Agustín" width={70} height={70} />
            </Link>

            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-7 w-7" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-12 space-y-8">
            <nav className="grid gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-blue">
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link href="/renta-un-local" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full rounded-full bg-blue px-8 py-3 text-lg font-semibold text-white">
              Renta un local
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}