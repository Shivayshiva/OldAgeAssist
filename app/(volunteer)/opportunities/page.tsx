import { Suspense } from "react"
import { OpportunitiesContent } from "@/components/opportunities/opportunities-content"
import { Navbar } from "@/components/layout/navbar"

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={null}>
        <div className="min-h-screen bg-background">
            <Navbar/>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                   <div className="mb-8">
                            <h1 className="text-4xl font-bold text-foreground mb-2">Volunteer Opportunities</h1>
                            <p className="text-lg text-muted-foreground">
                              Explore and engage with various volunteer opportunities to make a positive impact in our community.
                            </p>
                          </div>
            <OpportunitiesContent />
                 </main>
        </div>
      
    </Suspense>
  )
}
