import { GlobalButton } from "@/components/ui/GlobalButton"
import { Progress } from "@/components/ui/progress"
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
import { CommonCard } from "@/components/ui/CustomCard"
import { ResidentGrowthChart } from "@/components/ResidentGrowthChart"
import { OccupancyRateChart } from "@/components/OccupancyRateChart"
import { DashboardRecentAdmissionTable } from "@/components/dashboard-recent-admission-table"

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


const recentAdmissions = [
  { id: 1, name: "Margaret Wilson", room: "A-204", status: "Admitted", date: "2024-01-15", priority: "standard" },
  { id: 2, name: "James Rodriguez", room: "B-105", status: "Pending", date: "2024-01-14", priority: "urgent" },
  { id: 3, name: "Elizabeth Chen", room: "C-308", status: "Admitted", date: "2024-01-13", priority: "standard" },
]


export default function DashboardPage() {
  return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CustomTitle
            title="Dashboard Overview"
            description="Welcome back! Here's what's happening with your elder care facility today."
          />
          <div className="flex items-center gap-2">
            {/* <GlobalButton
              variant="outline"
              className="gap-2 bg-transparent h-9 px-3"
              icon={<Calendar className="size-4" />}
              title="Last 30 days"
            />
            <GlobalButton
              className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-md shadow-primary/20 h-9 px-3"
              icon={<ArrowUpRight className="size-4" />}
              title="Generate Report"
            /> */}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CommonCard
              title="Total Residents"
              value="62"
              icon={<Users className="size-5" />}
              // iconBg="from-primary to-primary/80"
              // borderColor="border-primary/20"
              // gradientBg="from-primary/10"
              // valueColor="text-primary"
              description={
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="size-3 text-success" />
                  <span className="text-success font-semibold">+6.7%</span> from last month
                </p>
              }
            />

            <CommonCard
              title="Active Staff"
              value="28"
              icon={<UserCheck className="size-5" />}
              // iconBg="from-secondary to-secondary/80"
              // borderColor="border-secondary/20"
              // gradientBg="from-secondary/10"
              // valueColor="text-secondary"
              description={
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-muted-foreground">On duty today</span>
                </p>
              }
            />

            <CommonCard
              title="Room Occupancy"
              value="94%"
              icon={<BedDouble className="size-5" />}
              // iconBg="from-accent to-accent/80"
              // borderColor="border-accent/20"
              // gradientBg="from-accent/10"
              // valueColor="text-accent"
              description={
                <>
                  <div className="mt-2">
                    <Progress value={94} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">62 of 66 rooms occupied</p>
                </>
              }
            />

            <CommonCard
              title="Pending Incidents"
              value="3"
              icon={<AlertTriangle className="size-5" />}
              // iconBg="from-chart-4 to-chart-4/80"
              // borderColor="border-chart-4/20"
              // gradientBg="from-chart-4/10"
              // valueColor="text-chart-4"
              description={
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingDown className="size-3 text-success" />
                  <span className="text-success font-semibold">-40%</span> from last week
                </p>
              }
            />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ResidentGrowthChart data={residentGrowthData} chartConfig={chartConfig} />
          <OccupancyRateChart data={occupancyData} chartConfig={chartConfig} />
        </div>

        <DashboardRecentAdmissionTable data={recentAdmissions} />
      </div>
  ) 
}
