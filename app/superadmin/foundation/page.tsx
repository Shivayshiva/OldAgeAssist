"use client"
import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlobalButton } from "@/components/ui/GlobalButton"
import { CustomTitle } from "@/components/ui/CustomTitle"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Users,
  Target,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react"
import { CustomTable, type Column } from "@/components/ui/CustomTable"
import { CommonCard } from "../../../components/ui/CustomCard"
import Link from "next/link"

// Foundation work type matching API response
type FoundationWork = {
  _id: string
  title: string
  description: string
  category: string
  status: "Planning" | "Active" | "Completed" | "On Hold"
  startDate: string
  endDate?: string
  startTime: string
  endTime: string
  budget: number
  beneficiaries: number
  impact: string
  location: string
  googleMapLocation?: string
  requirement: string
  imageUrl?: string
  volunteerRequirement: Array<{ type: string; requiredCount: number }>
  rewards: string[]
  facilities: string[]
  organizedBy: any
  createdAt: string
  updatedAt: string
}

export default function FoundationWorkPage() {
  const [foundationWorks, setFoundationWorks] = useState<FoundationWork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFoundationWorks()
  }, [])

  const fetchFoundationWorks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/foundation-intiative")
      
      if (!response.ok) {
        throw new Error("Failed to fetch foundation works")
      }

      const result = await response.json()
      setFoundationWorks(result.data || [])
    } catch (error) {
      console.error("Error fetching foundation works:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics from foundation works
  const { totalBudget, totalBeneficiaries, activeProjects } = useMemo(() => {
    const budget = foundationWorks.reduce((sum, work) => sum + (work.budget || 0), 0)
    const beneficiaries = foundationWorks.reduce((sum, work) => sum + (work.beneficiaries || 0), 0)
    const active = foundationWorks.filter((work) => work.status === "Active").length

    return {
      totalBudget: budget,
      totalBeneficiaries: beneficiaries,
      activeProjects: active,
    }
  }, [foundationWorks])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Completed":
        return "secondary"
      case "Planning":
        return "outline"
      case "On Hold":
        return "destructive"
      default:
        return "default"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const columns: Column<FoundationWork>[] = [
    {
      header: "Initiative",
      cell: (work) => (
        <div>
          <div className="font-medium">{work.title}</div>
          <div className="text-xs text-muted-foreground line-clamp-1 md:hidden">
            {work.category} • ₹{work.budget.toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      className: "hidden md:table-cell",
      accessorKey: "category",
      cell: (work) => <Badge variant="outline">{work.category}</Badge>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (work) => <Badge variant={getStatusColor(work.status)}>{work.status}</Badge>,
    },
    {
      header: "Start Date",
      className: "hidden lg:table-cell",
      accessorKey: "startDate",
      cell: (work) => (
        <div className="flex items-center gap-1">
          <Calendar className="size-3 text-muted-foreground" />
          <span className="text-sm">{new Date(work.startDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      header: "End Date",
      className: "hidden xl:table-cell",
      accessorKey: "endDate",
      cell: (work) => (
        <span className="text-sm">
          {work.endDate ? new Date(work.endDate).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      header: "Time",
      className: "hidden lg:table-cell",
      cell: (work) => (
        <div className="flex items-center gap-1">
          <Clock className="size-3 text-muted-foreground" />
          <span className="text-sm">{work.startTime} - {work.endTime}</span>
        </div>
      ),
    },
    {
      header: "Budget",
      className: "hidden md:table-cell",
      accessorKey: "budget",
      cell: (work) => <span>₹{work.budget.toLocaleString()}</span>,
    },
    // {
    //   header: "Beneficiaries",
    //   className: "hidden sm:table-cell",
    //   accessorKey: "beneficiaries",
    // },
    // {
    //   header: "Impact",
    //   className: "hidden xl:table-cell",
    //   accessorKey: "impact",
    //   cell: (work) => (
    //     <div className="flex items-center gap-2">
    //       <div className={`size-2 rounded-full ${getImpactColor(work.impact)}`} />
    //       <span className="text-sm">{work.impact}</span>
    //     </div>
    //   ),
    // },
    {
      header: "Location",
      className: "hidden 2xl:table-cell",
      cell: (work) => (
        work.googleMapLocation ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(work.googleMapLocation, "_blank")}
          >
            <MapPin className="size-4 mr-1" />
            View Map
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        )
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (work) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 size-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem >
              <Edit2 className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CustomTitle
            title="Foundation Work"
            description="Manage community initiatives, charitable programs, and social impact projects"
          />
          <Link href="/superadmin/foundation/createNew">
           <GlobalButton
            size="sm"
            icon={<Plus className="size-4" />}
            title="New Initiative"
          />
          </Link>
         
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <CommonCard
            title="Active Projects"
            icon={<Target className="size-6 text-muted-foreground" />}
            value={activeProjects}
            description="Currently running"
          />

          <CommonCard
            title="Total Budget Allocated"
            icon={<TrendingUp className="size-6 text-muted-foreground" />}
            value={`₹ ${totalBudget.toLocaleString()}`}
            description="Across all initiatives"
          />

          <CommonCard
            title="Total Beneficiaries"
            icon={<Users className="size-6 text-muted-foreground" />}
            value={totalBeneficiaries}
            description="People impacted"
          />
        </div>

        {/* Foundation Work Table */}
        <Card className="max-w-screen">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>All Foundation Initiatives</CardTitle>
                <CardDescription>View and manage all charitable programs and community projects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading foundation works...</div>
              </div>
            ) : (
              <CustomTable
                data={foundationWorks}
                columns={columns}
                searchKey="title"
                searchPlaceholder="Search initiatives..."
                filters={[
                  {
                    key: "status",
                    title: "Status",
                    options: [
                      { label: "Active", value: "Active" },
                      { label: "Planning", value: "Planning" },
                      { label: "Completed", value: "Completed" },
                      { label: "On Hold", value: "On Hold" },
                    ],
                  },
                ]}
              />
              // <h1>hello</h1>
            )}
          </CardContent>
        </Card>
      </div>
  )
}
