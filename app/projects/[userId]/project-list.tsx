"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Download, MapPin } from "lucide-react"
import type { TraktatProject } from "@/lib/projects"

const statusStyle: Record<string, string> = {
  ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-parchment-800 text-ochre-400 border-parchment-800",
}

const statusLabel: Record<string, string> = {
  ready: "Готов",
  draft: "Черновик",
  delivered: "Отправлен",
}

export function ProjectList({ items }: { items: TraktatProject[] }) {
  return (
    <ul className="space-y-5">
      {items.map((p, i) => (
        <motion.li
          key={p.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          className="parchment-card rounded-lg p-5 transition hover:border-ochre-500 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-parchment-300 bg-parchment-100 font-rune text-4xl text-ochre-600 sm:h-20 sm:w-20 sm:text-5xl">
                {p.mainRune.glyph}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${statusStyle[p.status]}`}
                  >
                    {statusLabel[p.status]}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-parchment-500">
                    {p.mainRune.name} · {p.mainRune.code}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold text-parchment-800 sm:text-2xl">
                  {p.clientName}
                </h2>
                {p.hebrewName && (
                  <p className="mt-0.5 font-serif text-lg italic text-parchment-600">
                    {p.hebrewName}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-parchment-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {p.birthDate}
                  </span>
                  {p.birthPlace && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {p.birthPlace}
                      {p.country && ` → ${p.country}`}
                    </span>
                  )}
                  <span className="text-parchment-500">Создан {p.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
              <a
                href={p.htmlPath}
                target="_blank"
                rel="noreferrer"
                className="btn-ink flex-1 justify-center sm:flex-none"
              >
                Открыть
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={p.htmlPath}
                download
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-parchment-500 hover:text-ochre-600"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                HTML
              </a>
            </div>
          </div>

          <p className="mt-5 border-t border-parchment-200 pt-4 font-serif text-base italic text-parchment-800">
            {p.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.keyRunes.map((r) => (
              <span
                key={r.name}
                className="inline-flex items-center gap-2 rounded border border-parchment-300 bg-parchment-100 px-2.5 py-1 text-xs text-parchment-600"
                title={r.note}
              >
                <span className="font-rune text-base text-ochre-600">{r.glyph}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                  {r.name}
                </span>
              </span>
            ))}
          </div>
        </motion.li>
      ))}
    </ul>
  )
}
