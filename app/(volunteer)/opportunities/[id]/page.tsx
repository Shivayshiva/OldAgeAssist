"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import { ArrowLeft, MapPin, Users, Clock, Calendar, CheckCircle, Heart, Share2, AlertCircle } from "lucide-react"

// Mock data for opportunities
const opportunitiesData: Record<
  string,
  {
    id: string
    title: string
    camp: string
    category: string
    image: string
    description: string
    fullDescription: string
    location: string
    volunteers: number
    maxVolunteers: number
    timeCommitment: string
    date: string
    endDate: string
    difficulty: "easy" | "moderate" | "challenging"
    skills: string[]
    requirements: string[]
    benefits: string[]
    organizer: {
      name: string
      avatar: string
      bio: string
    }
    schedule: string
    address: string
  }
> = {
  "1": {
    id: "1",
    title: "Environmental Cleanup Drive",
    camp: "Green City",
    category: "Environment",
    image: "/environmental-cleanup-park.jpg",
    description: "Help us clean up local parks and restore natural habitats. Suitable for all skill levels.",
    fullDescription:
      "Join our environmental cleanup drive to make a positive impact on our community. We are organizing a comprehensive cleanup initiative across multiple parks in the city. This is a wonderful opportunity to work outdoors, meet like-minded individuals, and contribute to environmental conservation.",
    location: "Central Park, New York",
    address: "Central Park, Manhattan, NY 10024",
    volunteers: 24,
    maxVolunteers: 50,
    timeCommitment: "4 hours",
    date: "Dec 29, 2025",
    endDate: "Dec 29, 2025",
    difficulty: "easy" as const,
    skills: ["Teamwork", "Physical fitness", "Environmental awareness"],
    requirements: [
      "Age 16 or older",
      "Comfortable working outdoors",
      "Able to lift up to 25 lbs",
      "Wear closed-toe shoes",
    ],
    benefits: ["Free t-shirt and cap", "Lunch provided", "Certificate of completion", "Meet like-minded volunteers"],
    organizer: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-avatar.png",
      bio: "Environmental advocate with 10+ years of experience in conservation",
    },
    schedule: "9:00 AM - 1:00 PM",
    address: "Central Park, Manhattan, NY 10024",
  },
  "2": {
    id: "2",
    title: "Youth Mentorship Program",
    camp: "Education First",
    category: "Education",
    image: "/youth-mentorship-classroom.jpg",
    description: "Mentor underprivileged youth and help them with homework and life skills.",
    fullDescription:
      "Be a role model and mentor for underprivileged youth in our community. Help them with academics, provide guidance on career paths, and share your life experiences. Your mentorship can make a real difference in a young person's future.",
    location: "Brooklyn Community Center",
    address: "Brooklyn Community Center, Brooklyn, NY 11201",
    volunteers: 12,
    maxVolunteers: 20,
    timeCommitment: "6 hours",
    date: "Jan 5, 2026",
    endDate: "Jan 5, 2026",
    difficulty: "moderate" as const,
    skills: ["Teaching", "Patience", "Communication", "Problem-solving"],
    requirements: [
      "High school diploma or equivalent",
      "Reliable and punctual",
      "Background check required",
      "Flexible schedule",
    ],
    benefits: [
      "Impact a young person's life",
      "Professional development",
      "Networking opportunities",
      "Certificate of appreciation",
    ],
    organizer: {
      name: "Mike Rodriguez",
      avatar: "/male-volunteer-avatar.jpg",
      bio: "Education specialist dedicated to youth empowerment and mentorship programs",
    },
    schedule: "3:00 PM - 9:00 PM",
    address: "Brooklyn Community Center, Brooklyn, NY 11201",
  },
  "3": {
    id: "3",
    title: "Community Food Bank",
    camp: "Hunger Relief",
    category: "Charity",
    image: "/community-food-bank-distribution.jpg",
    description: "Sort and distribute food packages to families in need throughout the city.",
    fullDescription:
      "Help us combat food insecurity in our community. Sort, pack, and distribute food packages to families and individuals in need. No experience necessary - we provide full training and guidance for all volunteers.",
    location: "Manhattan Food Bank",
    address: "Manhattan Food Bank, Manhattan, NY 10027",
    volunteers: 35,
    maxVolunteers: 40,
    timeCommitment: "3 hours",
    date: "Dec 28, 2025",
    endDate: "Dec 28, 2025",
    difficulty: "easy" as const,
    skills: ["Organization", "Teamwork", "Physical activity"],
    requirements: ["Age 14 or older", "Comfortable handling food items", "Basic stamina for light physical work"],
    benefits: ["Breakfast provided", "Volunteer t-shirt", "Certificate of service", "Make a direct impact"],
    organizer: {
      name: "Emma Wilson",
      avatar: "/elderly-woman-avatar.png",
      bio: "Community organizer passionate about fighting hunger and poverty",
    },
    schedule: "9:00 AM - 12:00 PM",
    address: "Manhattan Food Bank, Manhattan, NY 10027",
  },
}

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isJoined, setIsJoined] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const opportunity = opportunitiesData[params.id] || opportunitiesData["1"]

  const handleJoin = () => {
    setIsJoined(true)
    // Simulate API call
    setTimeout(() => {
      alert("Thank you for joining! Check your email for confirmation details.")
    }, 500)
  }

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    challenging: "bg-red-100 text-red-800",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Opportunities
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-6 bg-muted">
              <Image
                src={opportunity.image || "/placeholder.svg"}
                alt={opportunity.title}
                fill
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header Section */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-primary uppercase">{opportunity.camp}</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${difficultyColors[opportunity.difficulty]}`}>
                      {opportunity.difficulty.charAt(0).toUpperCase() + opportunity.difficulty.slice(1)}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground">{opportunity.title}</h1>
                </div>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">DATE</p>
                  <p className="font-semibold text-foreground">{opportunity.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">TIME</p>
                  <p className="font-semibold text-foreground">{opportunity.schedule}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">LOCATION</p>
                  <p className="font-semibold text-foreground">{opportunity.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">VOLUNTEERS</p>
                  <p className="font-semibold text-foreground">
                    {opportunity.volunteers}/{opportunity.maxVolunteers}
                  </p>
                </div>
              </div>
            </div>

            {/* Volunteers Progress */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-2">Spots Filling Up</p>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${(opportunity.volunteers / opportunity.maxVolunteers) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {opportunity.maxVolunteers - opportunity.volunteers} spots remaining
              </p>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Opportunity</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{opportunity.fullDescription}</p>
            </div>

            {/* Skills Required */}
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Skills & Experience</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {opportunity.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Requirements</h3>
              <ul className="space-y-2">
                {opportunity.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">What You'll Get</h3>
              <div className="space-y-2">
                {opportunity.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Organizer Card */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6 sticky top-20">
              <h3 className="font-bold text-foreground mb-4">Organized By</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={opportunity.organizer.avatar || "/placeholder.svg"}
                    alt={opportunity.organizer.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{opportunity.organizer.name}</p>
                  <p className="text-xs text-muted-foreground">{opportunity.camp}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{opportunity.organizer.bio}</p>
              <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors text-sm font-medium">
                Contact Organizer
              </button>
            </div>

            {/* Join Card */}
            <div className="bg-card border border-border rounded-lg p-6 sticky top-80">
              {isJoined && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900 text-sm">You've joined!</p>
                    <p className="text-xs text-green-800 mt-1">Check your email for details</p>
                  </div>
                </div>
              )}

              {opportunity.volunteers >= opportunity.maxVolunteers && !isJoined ? (
                <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900 font-medium">This opportunity is at full capacity</p>
                </div>
              ) : null}

              <button
                onClick={handleJoin}
                disabled={opportunity.volunteers >= opportunity.maxVolunteers && !isJoined}
                className={`w-full px-6 py-3 rounded-lg font-semibold mb-3 transition-colors ${
                  isJoined
                    ? "bg-primary/20 text-primary cursor-default"
                    : opportunity.volunteers >= opportunity.maxVolunteers
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {isJoined ? "Joined" : opportunity.volunteers >= opportunity.maxVolunteers ? "Full" : "Join Now"}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    isSaved ? "bg-accent text-white" : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                  Save
                </button>
                <button className="flex-1 px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* Info Box */}
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Category</p>
                  <p className="text-foreground font-medium">{opportunity.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Duration</p>
                  <p className="text-foreground font-medium">{opportunity.timeCommitment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
