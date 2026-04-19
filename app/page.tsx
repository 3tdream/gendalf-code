import { Wand2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Wand2 className="w-16 h-16 mx-auto text-blue-500" />
        <h1 className="text-4xl font-bold">Gendalf Code</h1>
        <p className="text-lg text-gray-500">Project ready. Start building.</p>
      </div>
    </div>
  )
}
