"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

type Now = { day: number; minutes: number };

/** Hora actual en Badalona (Europe/Madrid), independiente de la zona del visitante. */
function madridNow(): Now {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

function status(now: Now) {
  const today = site.hours.find((h) => h.day === now.day);
  const open = today?.spans.find(([a, b]) => now.minutes >= toMin(a) && now.minutes < toMin(b));
  if (open) return { open: true, text: `Abierto ahora · hasta las ${open[1]}` };
  const later = today?.spans.find(([a]) => now.minutes < toMin(a));
  if (later) return { open: false, text: `Cerrado · abre hoy a las ${later[0]}` };
  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7;
    const h = site.hours.find((x) => x.day === d);
    if (h && h.spans.length) {
      return { open: false, text: `Cerrado · abre ${i === 1 ? "mañana" : `el ${h.label.toLowerCase()}`} a las ${h.spans[0][0]}` };
    }
  }
  return { open: false, text: "Cerrado" };
}

function useNow() {
  const [now, setNow] = useState<Now | null>(null);
  useEffect(() => {
    const tick = () => setNow(madridNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function OpenBadge({ dark = false }: { dark?: boolean }) {
  const now = useNow();
  if (!now) return <span className="inline-block h-8" aria-hidden />;
  const s = status(now);
  const tone = dark
    ? "bg-paper/12 text-paper ring-1 ring-paper/25 backdrop-blur"
    : s.open
      ? "bg-[#e3f1e6] text-[#1f6b3a]"
      : "bg-blush text-forest";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${tone}`}>
      <span className={`h-2 w-2 rounded-full ${s.open ? "animate-pulse bg-[#4cc277]" : "bg-peach"}`} aria-hidden />
      {s.text}
    </span>
  );
}

export function HoursTable() {
  const now = useNow();
  return (
    <dl className="divide-y divide-[var(--line)]">
      {site.hours.map((h) => {
        const today = now?.day === h.day;
        return (
          <div
            key={h.day}
            className={`flex items-center justify-between gap-4 py-3 ${today ? "font-semibold text-forest-deep" : ""}`}
          >
            <dt className="flex items-center gap-2">
              {h.label}
              {today && (
                <span className="rounded-full bg-forest px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-paper">
                  Hoy
                </span>
              )}
            </dt>
            <dd className={`tabular-nums ${h.spans.length ? "" : "text-muted"}`}>
              {h.spans.length ? h.spans.map(([a, b]) => `${a} – ${b}`).join(" · ") : "Cerrado"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
