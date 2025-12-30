"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalButton } from "@/components/ui/GlobalButton"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { CommonCard } from "@/components/ui/CustomCard"
import { VolunteerGridView } from "@/components/ui/VolunteerGridView"
import { UserPlus, Users, Calendar, Award, Loader2 } from "lucide-react"
import Link from "next/link"

type Volunteer = {
  id: string
  name: string
  email: string
  phone: string
  status: "Active" | "Inactive" | "Pending"
  availability: string[]
  skills: string[]
  joinedDate: string
  hoursContributed: number
  profilePhoto?: string
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/volunteer")
      const result = await response.json()

      console.log("VOLUNTEERSAPI_volunteerapi", result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch volunteers")
      }

      // Transform API data to match component structure
      const transformedData = result?.data?.map((volunteer: any) => ({
        id: volunteer._id,
        name: volunteer?.profile?.fullName || " ",
        email: volunteer?.auth?.email,
        phone: volunteer.phone || volunteer.mobileNumber || "N/A",
        status: volunteer?.status?.isActive ? "Active" :  "Inactive",
        availabilityDays: volunteer?.volunteer?.availability?.days || [],
        availabilityTimes: volunteer?.volunteer?.availability?.timeSlots || [],
        skills: volunteer?.volunteer?.skills || [],
        joinedDate: volunteer.createdAt || volunteer.joinedDate || "",
        hoursContributed: volunteer.hoursContributed || 0,
        profilePhoto: volunteer?.profile?.profilePhoto || "",
        onboardingCompleted: volunteer?.volunteer?.availability?.onboardingCompleted || false,
      }))

      setVolunteers(transformedData)
    } catch (error) {
      console.error("Error fetching volunteers:", error)
      setError(error instanceof Error ? error.message : "Failed to load volunteers")
    } finally {
      setLoading(false)
    }
  }

  const activeVolunteers = volunteers.filter(v => v.status === "Active")
  const totalHours = volunteers.reduce((acc, v) => acc + v.hoursContributed, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CustomTitle
          title="Volunteer Management"
          description="Manage volunteers, schedules, and contributions"
        />
        {/* <Link href="/superadmin/volunteer/addNew">
          <GlobalButton
            size="sm"
            icon={<UserPlus className="size-4" />}
            title="Add Volunteer"
          />
        </Link> */}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <CommonCard
          title="Total Volunteers"
          icon={<Users className="size-6 text-muted-foreground" />}
          value={loading ? "..." : volunteers.length}
          description="Registered volunteers"
        />

        <CommonCard
          title="Active Volunteers"
          icon={<Award className="size-6 text-muted-foreground" />}
          value={loading ? "..." : activeVolunteers.length}
          description="Currently active"
        />

        <CommonCard
          title="Total Hours"
          icon={<Calendar className="size-6 text-muted-foreground" />}
          value={loading ? "..." : totalHours}
          description="Volunteer hours contributed"
        />
      </div>

      {/* Volunteers Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Volunteers</CardTitle>
          <CardDescription>View and manage volunteer information</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-destructive mb-2">{error}</p>
              <button
                onClick={fetchVolunteers}
                className="text-sm text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <VolunteerGridView data={volunteers} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
