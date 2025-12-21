import { connectDB } from "@/lib/mongodb"
import Donation from "@/models/Donation"
import User from "@/models/User"
import DonorsClientPage, { Donor } from "./DonorsClientPage"

export const dynamic = "force-dynamic"

async function getDonors(): Promise<Donor[]> {
  try {
    await connectDB()

    const donors = await Donation.find()
      .populate({
        path: "userId",
        model: User,
      })
      .sort({ createdAt: -1 })
      .lean()

    return JSON.parse(JSON.stringify(donors))
  } catch (error) {
    console.error("Error fetching donors:", error)
    return []
  }
}

export default async function DonorsPage() {
  const donors = await getDonors()
  return <DonorsClientPage donors={donors} />
}
