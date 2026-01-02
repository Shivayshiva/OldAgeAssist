export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Heart, Home, Users } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount")
  const name = searchParams.get("name")
  const paymentId= searchParams.get("paymentId")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  const heartVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-green-100 flex items-center justify-center px-4 py-8 md:py-12">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-2xl w-full">
        <motion.div variants={itemVariants} className="text-center mb-6 md:mb-8">
          <motion.div variants={circleVariants} className="inline-block mb-4 md:mb-6">
            <div className="relative">
              <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24 text-green-600 mx-auto" strokeWidth={1.5} />
              <motion.div variants={heartVariants} animate="animate" className="absolute -top-2 -right-2">
                <Heart className="w-7 h-7 md:w-8 md:h-8 text-green-500 fill-green-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-balance leading-tight px-4"
          >
            Thank You{name ? `, ${name}` : ""}!
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed px-4"
          >
            Your generous donation has been received successfully
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 border-green-200 shadow-lg">
            <div className="space-y-5 md:space-y-6">
              {amount && (
                <div className="text-center py-5 md:py-6 bg-green-50 rounded-lg">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">Donation Amount</p>
                  <p className="text-3xl md:text-4xl font-bold text-green-700">₹{amount.toLocaleString("en-IN")}</p>
                  {paymentId && (
                    <p className="text-xs md:text-sm text-muted-foreground mt-3 font-medium">
                      Payment ID: <span className="font-mono select-all text-foreground">{paymentId}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3 md:space-y-4 text-center">
                <p className="text-base md:text-lg leading-relaxed">
                  Your contribution will directly impact the lives of elderly residents in old age homes across India.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  A confirmation email has been sent to your inbox with the donation receipt. Thank you for making a
                  difference in the lives of those who need it most.
                </p>
              </div>

              <div className="pt-5 md:pt-6 border-t">
                <h3 className="font-semibold mb-3 text-center text-sm md:text-base">Your donation helps provide:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {[
                    "Nutritious Meals",
                    "Medical Care",
                    "Daily Comfort"
                  ].map((item, idx) => (
                    <div key={item} className="text-center p-3 md:p-4 bg-green-50 rounded-lg">
                      <p className="font-medium text-sm md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button asChild size="lg" className="w-full min-h-[48px]">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button asChild variant="outline" size="lg" className="w-full bg-transparent min-h-[48px]">
              <Link href="/donors">
                <Users className="mr-2 h-5 w-5" />
                View All Donors
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center text-xs md:text-sm text-muted-foreground mt-6 md:mt-8 leading-relaxed px-4"
        >
          Together, we're building a community of compassion. Thank you for being a part of this journey.
        </motion.p>
      </motion.div>
    </div>
  )
}
