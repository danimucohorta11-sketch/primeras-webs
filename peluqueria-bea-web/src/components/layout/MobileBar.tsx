"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site, whatsappUrl } from "@/content/site";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

/** Barra fija inferior en móvil (como el botón flotante de cita de las referencias). */
export function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 140;
      setShow(window.scrollY > window.innerHeight * 0.6 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Acciones rápidas"
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-ink/95 p-1.5 shadow-[0_18px_40px_-14px_rgba(37,22,25,0.6)] backdrop-blur md:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={site.booking.url}
            target="_blank"
            rel="noopener"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-red text-[0.95rem] font-semibold text-cream"
          >
            <CalendarIcon className="h-4.5 w-4.5" />
            Pedir cita
          </a>
          <a
            href={`tel:${site.phone.e164}`}
            aria-label={`Llamar al ${site.phone.display}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            aria-label="Escribir por WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
