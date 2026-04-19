import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Calendar, Download, FileText, MapPin, User } from "lucide-react"
import { getProjectsByUser } from "@/lib/projects"

type PageProps = { params: Promise<{ userId: string }> }

const statusStyle: Record<string, string> = {
  ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-stone-900 text-amber-200 border-stone-900",
}

const statusLabel: Record<string, string> = {
  ready: "Готов",
  draft: "Черновик",
  delivered: "Отправлен",
}

export default async function UserProjectsPage({ params }: PageProps) {
  const { userId } = await params
  const items = getProjectsByUser(userId)

  if (!userId) notFound()

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#2a1f14]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12 border-b border-[#d8cfbe] pb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#c8741a]">
            Код Гендальфа · Личный кабинет
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-wide">
            Проекты пользователя
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#5a4a38]">
            <User className="h-4 w-4" />
            <code className="rounded bg-[#ece6da] px-2 py-0.5 font-mono text-xs">{userId}</code>
            <span className="text-[#8a7a60]">· всего трактатов: {items.length}</span>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#d8cfbe] bg-[#fbf7ee] px-8 py-16 text-center">
            <FileText className="mx-auto mb-4 h-10 w-10 text-[#c8741a]" />
            <h2 className="font-serif text-xl">Проектов пока нет</h2>
            <p className="mt-2 text-sm text-[#5a4a38]">
              Запустите систему разбора — после генерации трактат появится здесь.
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {items.map((p) => (
              <li
                key={p.slug}
                className="group rounded-lg border border-[#d8cfbe] bg-[#fbf7ee] p-7 transition hover:border-[#c8741a] hover:shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-[#d8cfbe] bg-[#f4f0e8] font-serif text-5xl text-[#a45a10]">
                      {p.mainRune.glyph}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${statusStyle[p.status]}`}
                        >
                          {statusLabel[p.status]}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a7a60]">
                          {p.mainRune.name} · {p.mainRune.code}
                        </span>
                      </div>
                      <h2 className="mt-2 font-serif text-2xl font-semibold">{p.clientName}</h2>
                      {p.hebrewName && (
                        <p className="mt-0.5 font-serif text-lg italic text-[#5a4a38]">{p.hebrewName}</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#5a4a38]">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {p.birthDate}
                        </span>
                        {p.birthPlace && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {p.birthPlace}
                            {p.country && ` → ${p.country}`}
                          </span>
                        )}
                        <span className="text-[#8a7a60]">Создан {p.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <a
                      href={p.htmlPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#0a0a0a] px-4 py-2 text-sm font-medium text-[#f1e4bf] transition hover:bg-[#1a1510]"
                    >
                      Открыть трактат
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href={p.htmlPath}
                      download
                      className="inline-flex items-center gap-1.5 text-xs text-[#5a4a38] hover:text-[#a45a10]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Скачать HTML
                    </a>
                  </div>
                </div>

                <p className="mt-5 border-t border-[#e8dfca] pt-4 font-serif text-base italic text-[#2a1f14]">
                  {p.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.keyRunes.map((r) => (
                    <span
                      key={r.name}
                      className="inline-flex items-center gap-2 rounded border border-[#d8cfbe] bg-[#f4f0e8] px-2.5 py-1 text-xs text-[#5a4a38]"
                      title={r.note}
                    >
                      <span className="font-serif text-base text-[#a45a10]">{r.glyph}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em]">{r.name}</span>
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-16 flex items-center justify-between border-t border-[#d8cfbe] pt-6 text-xs uppercase tracking-[0.22em] text-[#8a7a60]">
          <Link href="/" className="hover:text-[#a45a10]">
            ← На главную
          </Link>
          <span>Версия 7.0 · 2026</span>
        </footer>
      </div>
    </main>
  )
}
