"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { useState } from "react";
import { nav, site } from "@/content/site";
import { BookButton } from "@/components/ui/BookButton";
import { Logo } from "./Logo";

/**
 * Menú móvil: Radix Dialog (la base accesible de shadcn/ui: foco atrapado, Esc, aria),
 * sin ningún estilo por defecto; toda la apariencia es propia.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="relative -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
        aria-label="Abrir menú"
      >
        <span className="relative block h-3 w-7" aria-hidden>
          <span className="absolute inset-x-0 top-0 h-px bg-current" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-[2px] data-[state=open]:animate-[fade_0.3s_ease-out]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[70] flex flex-col bg-ivory text-ink outline-none"
        >
          <Dialog.Title className="sr-only">Menú de navegación</Dialog.Title>
          <div className="wrap flex h-[4.5rem] shrink-0 items-center justify-between">
            <Logo />
            <Dialog.Close className="-mr-2 flex h-12 w-12 items-center justify-center" aria-label="Cerrar menú">
              <span className="relative block h-7 w-7" aria-hidden>
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-ink" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-ink" />
              </span>
            </Dialog.Close>
          </div>

          <nav aria-label="Menú móvil" className="wrap flex flex-1 flex-col justify-center gap-1 pb-6">
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display flex items-baseline gap-4 border-b border-[var(--line)] py-3 text-[2.4rem] min-[390px]:text-[2.7rem]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="wrap shrink-0 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <BookButton className="w-full" />
            <p className="mt-4 text-center text-sm text-muted">
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
