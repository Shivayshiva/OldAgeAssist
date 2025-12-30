"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalButton } from "@/components/ui/GlobalButton"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { CommonCard } from "@/components/ui/CustomCard"
import { ResidentGridView } from "@/components/ui/ResidentGridView"
import { UserPlus, Users, UserCheck, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"

type Resident = {
  id: number
  name: string
  room: string
  age: number
  status: "Active" | "On Leave" | "Discharged"
  admissionDate: string
  primaryContact: string
  primaryContactPhone: string
  medicalCondition: string
  profilePhoto: string
  mentalHealthStatus: string
  disabilities: string[]
  gender: string
}

export default function ResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResidents()
  }, [])

  const fetchResidents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/resident")
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch residents")
      }

      // Transform API data to match component structure
      const transformedData = result?.data?.map((resident: any) => ({
        id: resident._id,
        name: resident.fullName,
        room: resident.admissionDetails?.roomNumber || "N/A",
        age: resident.age || 0,
        status: resident.status === "active" ? "Active" : resident.status === "inactive" ? "On Leave" : "Discharged",
        admissionDate: resident.admissionDetails?.admissionDate || "",
        primaryContact: resident.emergencyContact?.name || "N/A",
        primaryContactPhone: resident.emergencyContact?.phone || "N/A",
        medicalCondition: resident.medicalConditions?.join(", ") || "None",
        profilePhoto: resident.profilePhoto || "",
        mentalHealthStatus: resident.mentalHealthStatus || "Stable",
        disabilities: resident.disabilities || [],
        gender: resident.gender || "Not Specified",
      }))
      console.log("Fetched_Residents_Resident", result.data)
      setResidents(transformedData)
    } catch (error) {
      console.error("Error fetching residents:", error)
      setError(error instanceof Error ? error.message : "Failed to load residents")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CustomTitle
          title="Resident Management"
          description="Manage resident information, admissions, and health records"
        />
        <Link href="/superadmin/residents/addNew">
        <GlobalButton
              size="sm"
              icon={<UserPlus className="size-4" />}
              title="New Admission"
            />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <CommonCard
          title="Total Residents"
          icon={<Users className="size-6 text-muted-foreground" />}
          value={loading ? "..." : residents.length}
          description="Currently in facility"
        />

        <CommonCard
          title="New Admissions"
          icon={<UserCheck className="size-6 text-muted-foreground" />}
          value={loading ? "..." : residents.filter(r => {
            const admissionDate = new Date(r.admissionDate)
            const now = new Date()
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
            return admissionDate >= monthAgo
          }).length}
          description="This month"
        />

        <CommonCard
          title="Average Age"
          icon={<Calendar className="size-6 text-muted-foreground" />}
          value={loading ? "..." : residents.length > 0 ? `${Math.round(residents.reduce((acc, r) => acc + r.age, 0) / residents.length)} years` : "N/A"}
          description="Resident average"
        />
      </div>

      {/* Residents Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Residents</CardTitle>
          <CardDescription>View and manage resident information</CardDescription>
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
                onClick={fetchResidents}
                className="text-sm text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <ResidentGridView data={residents} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
