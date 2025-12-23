import { Suspense } from "react"
import { OpportunitiesContent } from "@/components/opportunities/opportunities-content"

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={null}>
      <OpportunitiesContent />
    </Suspense>
  )
}
