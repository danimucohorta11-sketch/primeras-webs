"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { useState } from "react";
import { nav, site } from "@/content/site";
import { BookButton } from "@/components/ui/BookButton";
import { Logo } from "./Logo";

/**
 * Menú móvil: Radix Dialog (foco atrapado, Esc, aria) con apariencia propia.
 * Panel blanco a pantalla completa con enlaces grandes en mayúsculas.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="relative -ml-2 flex h-12 w-12 items-center justify-center lg:hidden"
        aria-label="Abrir menú"
      >
        <span className="relative block h-3.5 w-6" aria-hidden>
          <span className="absolute inset-x-0 top-0 h-[1.5px] bg-current" />
          <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
          <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-current" />
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/30 data-[state=open]:animate-[fade_0.3s_ease-out]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[70] flex flex-col bg-paper text-ink outline-none"
        >
          <Dialog.Title className="sr-only">Menú de navegación</Dialog.Title>
          <div className="wrap grid shrink-0 grid-cols-[1fr_auto_1fr] items-center py-3">
            <Dialog.Close className="-ml-2 flex h-12 w-12 items-center justify-center" aria-label="Cerrar menú">
              <span className="relative block h-6 w-6" aria-hidden>
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full rotate-45 bg-ink" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -rotate-45 bg-ink" />
              </span>
            </Dialog.Close>
            <Logo />
            <span />
          </div>

          <nav aria-label="Menú móvil" className="wrap flex flex-1 flex-col justify-center pb-6">
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="shout flex items-center justify-between border-b border-[var(--line)] py-4 text-[1.9rem] min-[390px]:text-[2.2rem]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {item.label}
                <span aria-hidden className="text-base font-light">
                  →
                </span>
              </motion.a>
            ))}
          </nav>

          <div className="wrap shrink-0 space-y-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <BookButton className="w-full" />
            <p className="text-center text-sm text-muted">
              {site.bookingNote} ·{" "}
              <a className="link-u text-ink" href={`tel:${site.phone.e164}`}>
                {site.phone.display}
              </a>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
