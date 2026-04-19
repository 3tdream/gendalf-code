import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Код Гендальфа · Tractatus Runicus",
  description: "Рунический трактат по дате рождения — древний свод в современной обёртке",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${cinzel.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <body className="font-serif antialiased">{children}</body>
    </html>
  )
}
