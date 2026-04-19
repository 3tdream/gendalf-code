# Gendalf Code — Claude Instructions

## Project Context
AI-powered development platform.

## Stack
- Next.js **15.5.4** with App Router + Turbopack
- React 19, TypeScript 5
- Tailwind CSS **4** (CSS-first config in `app/globals.css`, no `tailwind.config.ts`)
- Lucide React icons, Framer Motion animations
- Port: **3099**

## Key Rules
- Do NOT use `npx next` — use `node_modules/.bin/next` or pnpm scripts
- Server Components by default, `"use client"` only when needed
- No hydration-unsafe patterns (`Date.now()`, `Math.random()` in SSR)
