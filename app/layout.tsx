import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gendalf Code",
  description: "Gendalf Code — AI-powered development platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
