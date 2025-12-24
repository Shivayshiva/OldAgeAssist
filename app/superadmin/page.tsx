"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlobalButton } from "@/components/ui/GlobalButton"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  Users,
  UserCheck,
  BedDouble,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Calendar,
} from "lucide-react"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { Column, CustomTable } from "./CustomTable"
// import { CustomTable, type Column } from "@/components/ui/CustomTable"

// Mock data for charts
const residentGrowthData = [
  { month: "Jan", residents: 45 },
  { month: "Feb", residents: 48 },
  { month: "Mar", residents: 52 },
  { month: "Apr", residents: 55 },
  { month: "May", residents: 58 },
  { month: "Jun", residents: 62 },
]

const occupancyData = [
  { week: "Week 1", rate: 92 },
  { week: "Week 2", rate: 95 },
  { week: "Week 3", rate: 89 },
  { week: "Week 4", rate: 94 },
]

// Mock data for recent admissions
const recentAdmissions = [
  { id: 1, name: "Margaret Wilson", room: "A-204", status: "Admitted", date: "2024-01-15", priority: "standard" },
  { id: 2, name: "James Rodriguez", room: "B-105", status: "Pending", date: "2024-01-14", priority: "urgent" },
  { id: 3, name: "Elizabeth Chen", room: "C-308", status: "Admitted", date: "2024-01-13", priority: "standard" },
]

const chartConfig = {
  residents: {
    label: "Residents",
    color: "hsl(var(--chart-1))",
  },
  rate: {
    label: "Occupancy %",
    color: "hsl(var(--chart-2))",
  },
}

export default function DashboardPage() {
  const columns: Column<typeof recentAdmissions[0]>[] = [
    {
      header: "Resident Name",
      cell: (item) => (
        <>
          <div className="font-semibold">{item.name}</div>
          <div className="text-xs text-muted-foreground md:hidden">Room {item.room}</div>
        </>
      ),
    },
    {
      header: "Room",
      className: "hidden md:table-cell",
      cell: (item) => <span className="font-medium text-primary">{item.room}</span>,
    },
    {
      header: "Status",
      cell: (item) => (
        <Badge
          variant={item.status === "Admitted" ? "default" : "outline"}
          className={
            item.status === "Admitted"
              ? "bg-success text-success-foreground shadow-sm"
              : "border-chart-4 text-chart-4"
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      header: "Date",
      className: "hidden sm:table-cell",
      cell: (item) => <span className="text-muted-foreground">{item.date}</span>,
    },
  ]

  return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CustomTitle
            title="Dashboard Overview"
            description="Welcome back! Here's what's happening with your elder care facility today."
          />
          <div className="flex items-center gap-2">
            <GlobalButton
              variant="outline"
              className="gap-2 bg-transparent h-9 px-3"
              icon={<Calendar className="size-4" />}
              title="Last 30 days"
            />
            <GlobalButton
              className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-md shadow-primary/20 h-9 px-3"
              icon={<ArrowUpRight className="size-4" />}
              title="Generate Report"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Residents Card */}
          <Card className="overflow-hidden border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute right-0 top-0 size-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="font-medium">Total Residents</CardDescription>
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
                  <Users className="size-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-primary">62</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="size-3 text-success" />
                <span className="text-success font-semibold">+6.7%</span> from last month
              </p>
            </CardContent>
          </Card>

          {/* Active Staff Card */}
          <Card className="overflow-hidden border-secondary/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute right-0 top-0 size-24 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="font-medium">Active Staff</CardDescription>
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-sm">
                  <UserCheck className="size-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-secondary">28</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span className="text-muted-foreground">On duty today</span>
              </p>
            </CardContent>
          </Card>

          {/* Room Occupancy Card */}
          <Card className="overflow-hidden border-accent/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute right-0 top-0 size-24 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="font-medium">Room Occupancy</CardDescription>
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-sm">
                  <BedDouble className="size-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-accent">94%</div>
              <div className="mt-2">
                <Progress value={94} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">62 of 66 rooms occupied</p>
            </CardContent>
          </Card>

          {/* Pending Incidents Card */}
          <Card className="overflow-hidden border-chart-4/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute right-0 top-0 size-24 bg-gradient-to-br from-chart-4/10 to-transparent rounded-bl-full" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="font-medium">Pending Incidents</CardDescription>
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-chart-4 to-chart-4/80 text-white shadow-sm">
                  <AlertTriangle className="size-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-chart-4">3</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingDown className="size-3 text-success" />
                <span className="text-success font-semibold">-40%</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Resident Growth Chart */}
          <Card className="shadow-sm border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                Resident Growth
              </CardTitle>
              <CardDescription>6-month admission trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <LineChart data={residentGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="residents"
                    stroke="var(--color-residents)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-residents)", r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Occupancy Rate Chart */}
          <Card className="shadow-sm border-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-accent" />
                Weekly Occupancy Rate
              </CardTitle>
              <CardDescription>Last 4 weeks performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rate" fill="var(--color-rate)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-secondary" />
                  Recent Admissions
                </CardTitle>
                <CardDescription>Latest resident admission activity</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 hover:bg-primary/10">
                View All
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CustomTable data={recentAdmissions} columns={columns} />
          </CardContent>
        </Card>
      </div>
  )
}
