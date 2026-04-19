export type TraktatStatus = "draft" | "ready" | "delivered"

export type TraktatProject = {
  slug: string
  userId: string
  clientName: string
  hebrewName?: string
  birthDate: string
  birthPlace?: string
  country?: string
  mainRune: { glyph: string; name: string; code: number }
  keyRunes: { glyph: string; name: string; note: string }[]
  createdAt: string
  status: TraktatStatus
  htmlPath: string
  summary: string
}

// Demo fixture — replace via `/form` submissions or mirror the shape
// in a local `lib/projects.local.ts` (gitignored) for real client data.
export const projects: TraktatProject[] = [
  {
    slug: "example",
    userId: "user_demo",
    clientName: "Демо Клиент",
    hebrewName: "דמו",
    birthDate: "15.03.1990",
    birthPlace: "Город",
    country: "Страна",
    mainRune: { glyph: "ᛞ", name: "Dagaz", code: 23 },
    keyRunes: [
      { glyph: "ᚨ", name: "Ansuz", note: "Слово как инструмент" },
      { glyph: "ᚷ", name: "Gebo", note: "Партнёрский обмен" },
      { glyph: "ᛚ", name: "Laguz", note: "Интуитивный поток" },
      { glyph: "ᛟ", name: "Othala", note: "Родовое основание" },
      { glyph: "ᛒ", name: "Berkana", note: "Материнская ветвь" },
    ],
    createdAt: "2026-04-19",
    status: "ready",
    htmlPath: "/traktats/example.html",
    summary:
      "Демонстрационный трактат — шаблон структуры. Полный набор из 16 разделов, карточек рун, якорных фраз и денежной формулы.",
  },
]

export function getProjectsByUser(userId: string): TraktatProject[] {
  return projects.filter((p) => p.userId === userId)
}

export function getProject(userId: string, slug: string): TraktatProject | undefined {
  return projects.find((p) => p.userId === userId && p.slug === slug)
}
