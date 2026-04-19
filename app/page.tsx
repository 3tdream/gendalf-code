import Link from "next/link"
import { ArrowRight, BookOpen, Feather, ScrollText, Sparkles } from "lucide-react"

const runeOfTheDay = { glyph: "ᛞ", name: "Dagaz", meaning: "Прорыв · Рассвет · Трансформация" }

const steps = [
  {
    icon: Feather,
    title: "Дата рождения",
    body: "Введи имя и дату — формула вычислит главную руну и пять ключей.",
  },
  {
    icon: ScrollText,
    title: "Трактат в 16 главах",
    body: "Система сплетает карту рун, якорные фразы и денежную формулу.",
  },
  {
    icon: BookOpen,
    title: "Личный свод",
    body: "Открывай, перечитывай, скачивай как HTML-манускрипт.",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="label-micro">Tractatus Runicus · Anno 2026</p>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-wide text-parchment-800 sm:text-7xl">
              Код Гендальфа
            </h1>
            <div className="ornament-divider mx-auto mt-6 max-w-sm">
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-parchment-600 sm:text-2xl">
              Древний свод рун по твоей дате рождения —
              <br className="hidden sm:block" />
              главная руна, пять ключей, денежная формула.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/form" className="btn-ochre w-full justify-center sm:w-auto">
                Создать трактат
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects/user_demo" className="btn-ghost w-full justify-center sm:w-auto">
                Мои проекты
              </Link>
            </div>
          </div>

          {/* Rune of the day */}
          <div className="mt-16 sm:mt-24">
            <div className="parchment-card mx-auto max-w-md rounded-lg px-6 py-8 text-center sm:px-10">
              <p className="label-micro">Руна дня</p>
              <div className="mt-5 flex flex-col items-center gap-4">
                <div className="rune-circle">{runeOfTheDay.glyph}</div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-parchment-800">
                    {runeOfTheDay.name}
                  </h2>
                  <p className="mt-2 font-serif italic text-parchment-600">
                    {runeOfTheDay.meaning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="ornament-divider mx-auto max-w-md">
            <span className="font-display text-xs uppercase tracking-[0.28em]">Ordo</span>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="parchment-card rounded-lg p-7 text-center transition hover:-translate-y-0.5"
                >
                  <div className="label-micro">{String(i + 1).padStart(2, "0")}</div>
                  <Icon
                    className="mx-auto mt-4 h-8 w-8 text-ochre-600"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-4 font-display text-lg font-semibold text-parchment-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-serif text-base leading-relaxed text-parchment-600">
                    {s.body}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <Link href="/form" className="btn-ink">
              Начать разбор
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-parchment-300 bg-parchment-50/60 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-parchment-500 sm:flex-row">
          <span className="font-display">Код Гендальфа</span>
          <span>Версия 7.0 · MMXXVI</span>
        </div>
      </footer>
    </main>
  )
}
