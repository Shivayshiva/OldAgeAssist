"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Users, HandHeart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { HomeNavbar } from "@/components/layout/home-navbar"

export default function HomeClientPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

   const { data: session, status } = useSession();

   console.log("_____home_____", session, status)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20"></div>
        <HomeNavbar />
        <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-4 md:mb-6">
              <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto animate-pulse" />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance leading-tight"
            >
              Supporting Our Elders,
              <br />
              Building a Better Tomorrow
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-primary-foreground/90 text-pretty max-w-2xl mx-auto leading-relaxed"
            >
              Join us in making a meaningful difference in the lives of elderly residents across India. Your donation
              provides care, comfort, and dignity to those who need it most.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-base md:text-lg group w-full sm:w-auto min-h-[48px]"
              >
                <Link href="/donate">
                  Donate Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base md:text-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/30 w-full sm:w-auto min-h-[48px]"
              >
                <Link href="/donors">View Our Supporters</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, label: "Elders Supported", value: "2,500+" },
              { icon: HandHeart, label: "Active Donors", value: "1,200+" },
              { icon: Heart, label: "Homes Assisted", value: "45+" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
                  <stat.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 text-balance leading-tight"
          >
            Our Mission
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-muted-foreground text-center mb-8 md:mb-12 text-pretty leading-relaxed"
          >
            Old Age Homes Assist is dedicated to improving the quality of life for elderly individuals living in care
            facilities across India. Through community support and generous donations, we provide essential resources,
            healthcare, and companionship.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: "Healthcare Support",
                description: "Providing medical care, medications, and regular health checkups for elderly residents.",
              },
              {
                title: "Nutritious Meals",
                description: "Ensuring access to balanced, healthy meals that meet dietary requirements.",
              },
              {
                title: "Comfort & Care",
                description: "Improving living conditions with essential supplies and facility maintenance.",
              },
              {
                title: "Social Activities",
                description: "Organizing events and activities to keep our elders engaged and happy.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-5 md:p-6 h-full hover:shadow-md transition-shadow">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-accent/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-balance leading-tight px-4">
            Every Contribution Makes a Difference
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty leading-relaxed px-4">
            Your generosity brings smiles, comfort, and hope to our elderly community. Join us today in this noble
            cause.
          </p>
          <Button asChild size="lg" className="text-base md:text-lg group min-h-[48px] w-full sm:w-auto mx-4">
            <Link href="/donate">
              Start Your Donation
              <Heart className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Link>
          </Button>
          
        </motion.div>
      </section>
    </div>
  )
}