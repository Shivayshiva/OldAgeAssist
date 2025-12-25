import { Navbar } from "@/components/layout/navbar"
import { HomeTitle } from "@/components/HomeTitle"
import { QuickStats } from "@/components/quickStats"
import FeedPosts from "@/components/feedpost"

export const dynamic = "force-dynamic"

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <HomeTitle/>
          {/* Quick Stats */}
         <QuickStats/>
        </div>
        <FeedPosts/>
      </main>
    </div>
  )
}
