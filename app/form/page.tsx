"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, Check, MapPin, Sparkles, User } from "lucide-react"
import { mainRuneForDate, keyRunesForDate } from "@/lib/runes"

type FormData = {
  name: string
  hebrewName: string
  birthDate: string
  birthPlace: string
  country: string
}

const initial: FormData = {
  name: "",
  hebrewName: "",
  birthDate: "",
  birthPlace: "",
  country: "",
}

export default function FormPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0)
  const [data, setData] = useState<FormData>(initial)

  const mainRune = useMemo(
    () => (data.birthDate ? mainRuneForDate(data.birthDate) : null),
    [data.birthDate],
  )
  const keys = useMemo(
    () => (data.birthDate ? keyRunesForDate(data.birthDate) : []),
    [data.birthDate],
  )

  const canAdvance = (s: number) => {
    if (s === 0) return data.name.trim().length > 0
    if (s === 1) return /^\d{4}-\d{2}-\d{2}$/.test(data.birthDate)
    return true
  }

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }))

  return (
    <main className="min-h-screen px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-parchment-500 hover:text-ochre-600"
          >
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <p className="label-micro mt-6">Acta Runicus · Creatio</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-parchment-800 sm:text-4xl">
            Создание трактата
          </h1>
          <div className="ornament-divider mx-auto mt-5 max-w-xs">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
          </div>
        </header>

        {/* Stepper */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-10 rounded-full transition-colors ${
                s <= step ? "bg-ochre-500" : "bg-parchment-300"
              }`}
            />
          ))}
        </div>

        <div className="parchment-card mt-8 rounded-lg px-6 py-8 sm:px-10 sm:py-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <p className="label-micro">Шаг 01 · Имя</p>
                <Field
                  icon={User}
                  label="Имя"
                  value={data.name}
                  onChange={set("name")}
                  placeholder="Как зовут носителя трактата"
                />
                <Field
                  label="Еврейское имя (опционально)"
                  value={data.hebrewName}
                  onChange={set("hebrewName")}
                  placeholder="אם יש"
                  dir="rtl"
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <p className="label-micro">Шаг 02 · Точка входа</p>
                <Field
                  icon={Calendar}
                  label="Дата рождения"
                  type="date"
                  value={data.birthDate}
                  onChange={set("birthDate")}
                />
                <Field
                  icon={MapPin}
                  label="Место рождения"
                  value={data.birthPlace}
                  onChange={set("birthPlace")}
                  placeholder="Город"
                />
                <Field
                  label="Страна"
                  value={data.country}
                  onChange={set("country")}
                  placeholder="Страна"
                />
              </motion.div>
            )}

            {step === 2 && mainRune && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <p className="label-micro">Шаг 03 · Превью</p>
                <div className="mt-6 flex flex-col items-center gap-3">
                  <div className="rune-circle">{mainRune.glyph}</div>
                  <div>
                    <p className="label-micro">Главная руна</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-parchment-800">
                      {mainRune.name}
                    </h3>
                    <p className="mt-1 font-serif italic text-parchment-600">
                      {mainRune.meaning}
                    </p>
                  </div>
                </div>

                <div className="ornament-divider mx-auto mt-8 max-w-xs">
                  <span className="font-display text-[10px] uppercase tracking-[0.28em]">
                    Ключи
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {keys.map((r) => (
                    <div
                      key={r.code}
                      className="flex flex-col items-center rounded-md border border-parchment-300 bg-parchment-50 px-3 py-3"
                    >
                      <span className="font-rune text-2xl text-ochre-600">{r.glyph}</span>
                      <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-parchment-600">
                        {r.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded border border-parchment-300 bg-parchment-50 px-5 py-4 text-left">
                  <p className="label-micro">Сводка</p>
                  <dl className="mt-2 space-y-1 font-serif text-sm text-parchment-700">
                    <Row k="Имя" v={data.name} />
                    {data.hebrewName && <Row k="Еврейское имя" v={data.hebrewName} />}
                    <Row k="Дата" v={data.birthDate} />
                    {data.birthPlace && <Row k="Место" v={data.birthPlace} />}
                    {data.country && <Row k="Страна" v={data.country} />}
                  </dl>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-center py-4"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ochre-500 bg-ochre-400/10">
                  <Check className="h-8 w-8 text-ochre-600" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-parchment-800">
                  Трактат сплетён
                </h3>
                <p className="mt-3 font-serif italic text-parchment-600">
                  Система записала исходные данные. В бою — здесь произойдёт генерация
                  16 глав и отправка по почте.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href="/projects/user_demo" className="btn-ochre justify-center">
                    Посмотреть проекты
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setData(initial)
                      setStep(0)
                    }}
                    className="btn-ghost justify-center"
                  >
                    Ещё один
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 3 && (
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-parchment-300 pt-6">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s))}
                className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад
              </button>
              <button
                type="button"
                disabled={!canAdvance(step)}
                onClick={() => setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))}
                className="btn-ink disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 2 ? "Сплести трактат" : "Дальше"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function Field({
  icon: Icon,
  label,
  ...props
}: {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="label-micro block">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-md border border-parchment-300 bg-parchment-50 px-3 py-2.5 focus-within:border-ochre-500">
        {Icon && <Icon className="h-4 w-4 text-parchment-500" strokeWidth={1.5} />}
        <input
          {...props}
          className="w-full bg-transparent font-serif text-base text-parchment-800 placeholder:text-parchment-400 focus:outline-none"
        />
      </div>
    </label>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-parchment-500">
        {k}
      </dt>
      <dd className="text-right">{v}</dd>
    </div>
  )
}
