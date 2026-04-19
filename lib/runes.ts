export type Rune = {
  glyph: string
  name: string
  code: number
  meaning: string
}

export const elderFuthark: Rune[] = [
  { glyph: "ᚠ", name: "Fehu", code: 1, meaning: "Богатство · Движение · Импульс" },
  { glyph: "ᚢ", name: "Uruz", code: 2, meaning: "Сила · Первородная воля" },
  { glyph: "ᚦ", name: "Thurisaz", code: 3, meaning: "Врата · Защита · Испытание" },
  { glyph: "ᚨ", name: "Ansuz", code: 4, meaning: "Слово · Вдохновение · Откровение" },
  { glyph: "ᚱ", name: "Raidho", code: 5, meaning: "Путь · Ритм · Порядок движения" },
  { glyph: "ᚲ", name: "Kenaz", code: 6, meaning: "Огонь ремесла · Знание · Творчество" },
  { glyph: "ᚷ", name: "Gebo", code: 7, meaning: "Дар · Партнёрский обмен · Союз" },
  { glyph: "ᚹ", name: "Wunjo", code: 8, meaning: "Радость · Гармония · Совпадение" },
  { glyph: "ᚺ", name: "Hagalaz", code: 9, meaning: "Град · Разрушение ради нового" },
  { glyph: "ᚾ", name: "Nauthiz", code: 10, meaning: "Нужда · Дисциплина · Предел" },
  { glyph: "ᛁ", name: "Isa", code: 11, meaning: "Лёд · Пауза · Концентрация" },
  { glyph: "ᛃ", name: "Jera", code: 12, meaning: "Год · Урожай · Возврат усилий" },
  { glyph: "ᛇ", name: "Eihwaz", code: 13, meaning: "Ось · Тис · Связь миров" },
  { glyph: "ᛈ", name: "Perthro", code: 14, meaning: "Жребий · Тайна · Игра судьбы" },
  { glyph: "ᛉ", name: "Algiz", code: 15, meaning: "Защита · Священная граница" },
  { glyph: "ᛋ", name: "Sowilo", code: 16, meaning: "Солнце · Победа · Целостность" },
  { glyph: "ᛏ", name: "Tiwaz", code: 17, meaning: "Меч · Справедливость · Намерение" },
  { glyph: "ᛒ", name: "Berkana", code: 18, meaning: "Берёза · Материнство · Рост" },
  { glyph: "ᛖ", name: "Ehwaz", code: 19, meaning: "Конь · Движение в паре · Доверие" },
  { glyph: "ᛗ", name: "Mannaz", code: 20, meaning: "Человек · Отражение · Сообщество" },
  { glyph: "ᛚ", name: "Laguz", code: 21, meaning: "Вода · Интуиция · Поток" },
  { glyph: "ᛜ", name: "Ingwaz", code: 22, meaning: "Зерно · Инкубация · Внутренний свет" },
  { glyph: "ᛞ", name: "Dagaz", code: 23, meaning: "Рассвет · Прорыв · Трансформация" },
  { glyph: "ᛟ", name: "Othala", code: 24, meaning: "Род · Наследие · Дом" },
]

function digitSum(input: string): number {
  return input.replace(/\D/g, "").split("").reduce((acc, d) => acc + Number(d), 0)
}

function reduceToRange(n: number, max: number): number {
  if (n <= 0) return 1
  let r = n
  while (r > max) r = digitSum(String(r)) || 1
  return Math.max(1, Math.min(max, r))
}

export function mainRuneForDate(dateIso: string): Rune {
  const index = reduceToRange(digitSum(dateIso), 24)
  return elderFuthark[index - 1]
}

export function keyRunesForDate(dateIso: string, count = 5): Rune[] {
  const seed = digitSum(dateIso) || 1
  const picks = new Set<number>()
  let i = seed
  while (picks.size < count) {
    i = (i * 17 + 7) % 24
    picks.add(i)
  }
  return Array.from(picks).map((idx) => elderFuthark[idx])
}
