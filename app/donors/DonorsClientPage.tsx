"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, ArrowLeft, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export interface Donor {
  _id: string
  amount: number
  createdAt: string
  userId: {
    name: string
    mobile?: string
    aadhaarNumber?: string
    townVillage?: string
    district?: string
    state?: string
  } | null
  message?: string
}

interface DonorsClientPageProps {
  donors: Donor[]
}

export default function DonorsClientPage({ donors }: DonorsClientPageProps) {
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
    return (name || "AN")
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

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {donors.map((donor) => (
              <motion.div
                key={donor._id}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-5 md:p-6 h-full flex flex-col hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 bg-primary text-primary-foreground flex-shrink-0">
                      <AvatarFallback className="text-base md:text-lg font-semibold">
                        {getInitials(donor.userId?.name || "Anonymous")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base md:text-lg mb-1 truncate">
                        {donor.userId?.name || "Anonymous"}
                      </h3>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {donor.userId?.mobile && <p>Mobile: {donor.userId.mobile}</p>}
                        {donor.userId?.aadhaarNumber && <p>Aadhaar: {donor.userId.aadhaarNumber}</p>}
                        <p>
                          {[donor.userId?.townVillage, donor.userId?.district, donor.userId?.state]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
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
                    {new Date(donor.createdAt).toLocaleDateString("en-IN", {
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