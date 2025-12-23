"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { OpportunityCard } from "@/components/opportunities/opportunity-card"
import { Search, Filter, X } from "lucide-react"

export function OpportunitiesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("")

  const opportunities = [
    {
      id: "1",
      title: "Environmental Cleanup Drive",
      camp: "Green City",
      category: "Environment",
      image: "/environmental-cleanup-park.jpg",
      description: "Help us clean up local parks and restore natural habitats. Suitable for all skill levels.",
      location: "Central Park, New York",
      volunteers: 24,
      maxVolunteers: 50,
      timeCommitment: "4 hours",
      date: "Dec 29, 2025",
      difficulty: "easy" as const,
    },
    {
      id: "2",
      title: "Youth Mentorship Program",
      camp: "Education First",
      category: "Education",
      image: "/youth-mentorship-classroom.jpg",
      description: "Mentor underprivileged youth and help them with homework and life skills.",
      location: "Brooklyn Community Center",
      volunteers: 12,
      maxVolunteers: 20,
      timeCommitment: "6 hours",
      date: "Jan 5, 2026",
      difficulty: "moderate" as const,
    },
    {
      id: "3",
      title: "Community Food Bank",
      camp: "Hunger Relief",
      category: "Charity",
      image: "/community-food-bank-distribution.jpg",
      description: "Sort and distribute food packages to families in need throughout the city.",
      location: "Manhattan Food Bank",
      volunteers: 35,
      maxVolunteers: 40,
      timeCommitment: "3 hours",
      date: "Dec 28, 2025",
      difficulty: "easy" as const,
    },
    {
      id: "4",
      title: "Housing Construction Project",
      camp: "Habitat Heroes",
      category: "Housing",
      image: "/housing-construction-build.jpg",
      description: "Help build homes for families in need. Training provided for all skill levels.",
      location: "Queens Development Area",
      volunteers: 18,
      maxVolunteers: 35,
      timeCommitment: "8 hours",
      date: "Jan 10, 2026",
      difficulty: "challenging" as const,
    },
    {
      id: "5",
      title: "Senior Companion Program",
      camp: "Silver Hearts",
      category: "Healthcare",
      image: "/senior-companion-program.jpg",
      description: "Spend quality time with elderly residents, reading, playing games, and sharing stories.",
      location: "Riverside Senior Home",
      volunteers: 8,
      maxVolunteers: 15,
      timeCommitment: "4 hours",
      date: "Jan 2, 2026",
      difficulty: "easy" as const,
    },
    {
      id: "6",
      title: "Animal Shelter Care",
      camp: "Paws & Love",
      category: "Animal Welfare",
      image: "/animal-shelter-care-dogs.jpg",
      description: "Care for animals, help with feeding, cleaning, and socializing our furry friends.",
      location: "NYC Animal Shelter",
      volunteers: 22,
      maxVolunteers: 30,
      timeCommitment: "5 hours",
      date: "Jan 3, 2026",
      difficulty: "moderate" as const,
    },
    {
      id: "7",
      title: "Arts Workshop Facilitation",
      camp: "Creative Minds",
      category: "Arts & Culture",
      image: "/arts-workshop-painting.jpg",
      description: "Lead art and craft workshops for children. No art experience needed!",
      location: "Lower East Side Arts Center",
      volunteers: 6,
      maxVolunteers: 12,
      timeCommitment: "3 hours",
      date: "Jan 4, 2026",
      difficulty: "easy" as const,
    },
    {
      id: "8",
      title: "Community Garden Project",
      camp: "Green Harvest",
      category: "Environment",
      image: "/community-garden-planting.jpg",
      description: "Plant and maintain community gardens. Learn urban farming techniques.",
      location: "Harlem Community Garden",
      volunteers: 16,
      maxVolunteers: 25,
      timeCommitment: "3 hours",
      date: "Dec 30, 2025",
      difficulty: "easy" as const,
    },
  ]

  const categories = [
    "All",
    "Environment",
    "Education",
    "Charity",
    "Housing",
    "Healthcare",
    "Animal Welfare",
    "Arts & Culture",
  ]
  const difficulties = ["All", "easy", "moderate", "challenging"]

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesSearch =
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.camp.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || selectedCategory === "All" || opp.category === selectedCategory

      const matchesDifficulty =
        !selectedDifficulty || selectedDifficulty === "All" || opp.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [searchQuery, selectedCategory, selectedDifficulty])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Volunteer Opportunities</h1>
          <p className="text-muted-foreground">
            {filteredOpportunities.length} opportunities available to make a difference
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search opportunities, camps, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category || (category === "All" && !selectedCategory)
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDifficulty === diff || (diff === "All" && !selectedDifficulty)
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory || selectedDifficulty) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchQuery && (
              <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm">
                <span>{searchQuery}</span>
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {selectedCategory && selectedCategory !== "All" && (
              <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm">
                <span>{selectedCategory}</span>
                <button onClick={() => setSelectedCategory("")}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {selectedDifficulty && selectedDifficulty !== "All" && (
              <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm">
                <span>{selectedDifficulty}</span>
                <button onClick={() => setSelectedDifficulty("")}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Opportunities Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} {...opp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No opportunities found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("")
                setSelectedDifficulty("")
              }}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
