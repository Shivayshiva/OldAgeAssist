"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, ArrowLeft, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data for donors
const donors = [
  {
    name: "Rajesh Kumar",
    amount: 5000,
    city: "Mumbai",
    date: "2024-01-15",
    message: "Happy to support this wonderful cause",
  },
  { name: "Priya Sharma", amount: 2500, city: "Delhi", date: "2024-01-14", message: "May our elders be blessed" },
  { name: "Amit Patel", amount: 10000, city: "Ahmedabad", date: "2024-01-13", message: "" },
  {
    name: "Sneha Reddy",
    amount: 1000,
    city: "Bangalore",
    date: "2024-01-12",
    message: "Small contribution for a big cause",
  },
  {
    name: "Vikram Singh",
    amount: 7500,
    city: "Jaipur",
    date: "2024-01-11",
    message: "Proud to be part of this mission",
  },
  { name: "Anjali Desai", amount: 3000, city: "Pune", date: "2024-01-10", message: "Respect and care for our elders" },
  { name: "Karthik Iyer", amount: 5000, city: "Chennai", date: "2024-01-09", message: "" },
  { name: "Neha Gupta", amount: 2000, city: "Lucknow", date: "2024-01-08", message: "Every little bit helps!" },
  { name: "Rohit Verma", amount: 15000, city: "Kolkata", date: "2024-01-07", message: "In memory of my grandparents" },
  { name: "Pooja Nair", amount: 4000, city: "Kochi", date: "2024-01-06", message: "Keep up the great work!" },
  { name: "Arjun Mehta", amount: 8000, city: "Surat", date: "2024-01-05", message: "" },
  { name: "Divya Krishnan", amount: 3500, city: "Hyderabad", date: "2024-01-04", message: "Supporting our seniors" },
]

export default function DonorsPage() {
  const totalDonation = donors.reduce((sum, donor) => sum + donor.amount, 0)
  const totalDonors = donors.length

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <motion.div {...fadeInUp}>
          <Button asChild variant="ghost" className="mb-4 md:mb-6 min-h-[44px]">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial="initial" animate="animate" className="text-center mb-8 md:mb-12">
            <motion.div variants={fadeInUp}>
              <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary" />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-balance leading-tight px-4"
            >
              Our Generous Supporters
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-muted-foreground text-pretty leading-relaxed px-4"
            >
              These kind-hearted individuals are making a real difference in the lives of our elderly community
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12 max-w-3xl mx-auto"
          >
            <Card className="p-5 md:p-6 text-center bg-primary text-primary-foreground">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3" />
              <div className="text-2xl md:text-3xl font-bold mb-1">₹{totalDonation.toLocaleString("en-IN")}</div>
              <div className="text-sm md:text-base text-primary-foreground/80">Total Donations</div>
            </Card>
            <Card className="p-5 md:p-6 text-center bg-accent text-accent-foreground">
              <Heart className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3" />
              <div className="text-2xl md:text-3xl font-bold mb-1">{totalDonors}</div>
              <div className="text-sm md:text-base text-muted-foreground">Generous Donors</div>
            </Card>
          </motion.div>

          {/* Donors Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {donors.map((donor, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-5 md:p-6 h-full flex flex-col hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 bg-primary text-primary-foreground flex-shrink-0">
                      <AvatarFallback className="text-base md:text-lg font-semibold">
                        {getInitials(donor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base md:text-lg mb-1 truncate">{donor.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{donor.city}</p>
                    </div>
                  </div>

                  <div className="mb-3 md:mb-4">
                    <Badge variant="secondary" className="text-base md:text-lg px-2 md:px-3 py-1">
                      ₹{donor.amount.toLocaleString("en-IN")}
                    </Badge>
                  </div>

                  {donor.message && (
                    <div className="mb-3 md:mb-4 flex-1">
                      <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed">
                        "{donor.message}"
                      </p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mt-auto pt-3 md:pt-4 border-t border-border">
                    Donated on{" "}
                    {new Date(donor.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 md:mt-16"
          >
            <Card className="p-6 md:p-8 max-w-2xl mx-auto bg-accent/30">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 leading-tight">
                Join Our Community of Supporters
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-6 leading-relaxed">
                Your name could be here, making a difference in someone's life today.
              </p>
              <Button asChild size="lg" className="text-base md:text-lg min-h-[48px] w-full sm:w-auto">
                <Link href="/donate">
                  Make a Donation
                  <Heart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
