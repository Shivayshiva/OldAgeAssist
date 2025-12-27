import { connectDB } from "@/lib/mongodb"
import Donation from "@/models/Donation"
import Donor from "@/models/Donor"
import DonorsClientPage from "./DonorsClientPage"

export const dynamic = "force-dynamic"

interface IDonor {
  _id: string
  name: string
  email: string
  amount: number
  createdAt: string
  donorId: string
}

async function getDonors(): Promise<IDonor[]> {
  try {
    await connectDB()

    const donations = await Donation.find()
      .populate({
        path: "donorId",
        model: Donor,
      })
      .sort({ createdAt: -1 })
      .lean()

    return JSON.parse(JSON.stringify(donations))
  } catch (error) {
    console.error("Error fetching donors:", error)
    return []
  }
}

export default async function DonorsPage() {
  const donations = await getDonors()
  return <DonorsClientPage donors={donations} />
}
