import { Zap } from "lucide-react"

export function HomeTitle() {
  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Zap className="w-6 h-6" />
        <h1 className="text-3xl font-bold">Volunteer Updates</h1>
      </div>
      <p className="text-white/90">Discover the latest news and activities from our volunteer community</p>
    </div>
  )
}