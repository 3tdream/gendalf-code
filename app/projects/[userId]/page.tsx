import Link from "next/link"
import { notFound } from "next/navigation"
import { FileText, User } from "lucide-react"
import { getProjectsByUser } from "@/lib/projects"
import { ProjectList } from "./project-list"

type PageProps = { params: Promise<{ userId: string }> }

export default async function UserProjectsPage({ params }: PageProps) {
  const { userId } = await params
  if (!userId) notFound()
  const items = getProjectsByUser(userId)

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
        <header className="mb-10 border-b border-parchment-300 pb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-parchment-500 hover:text-ochre-600"
          >
            ← На главную
          </Link>
          <p className="label-micro mt-5">Код Гендальфа · Личный кабинет</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-parchment-800 sm:text-4xl">
            Проекты пользователя
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-parchment-600">
            <User className="h-4 w-4" strokeWidth={1.5} />
            <code className="rounded bg-parchment-200 px-2 py-0.5 font-mono text-xs">
              {userId}
            </code>
            <span className="text-parchment-500">· всего трактатов: {items.length}</span>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="parchment-card rounded-lg px-6 py-14 text-center sm:px-8 sm:py-16">
            <FileText className="mx-auto mb-4 h-10 w-10 text-ochre-600" strokeWidth={1.5} />
            <h2 className="font-display text-xl text-parchment-800">Проектов пока нет</h2>
            <p className="mt-3 font-serif text-parchment-600">
              Запустите систему разбора — после генерации трактат появится здесь.
            </p>
            <Link href="/form" className="btn-ochre mt-7">
              Создать первый
            </Link>
          </div>
        ) : (
          <ProjectList items={items} />
        )}

        <footer className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-parchment-300 pt-6 text-xs uppercase tracking-[0.22em] text-parchment-500 sm:flex-row sm:mt-16">
          <Link href="/" className="hover:text-ochre-600">
            ← На главную
          </Link>
          <span>Версия 7.0 · MMXXVI</span>
        </footer>
      </div>
    </main>
  )
}
