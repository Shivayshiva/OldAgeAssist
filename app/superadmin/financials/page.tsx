"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { DollarSign, TrendingDown } from "lucide-react"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { CommonCard } from "@/components/ui/CustomCard"
import { CustomTable } from "@/components/ui/CustomTable"
import { subMonths, format } from "date-fns"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}

const donationColumns = [
  { header: "Donor Name", accessorKey: "donorId", cell: (d) => d?.donorId?.name || "-" },
  { header: "Amount", accessorKey: "amount", cell: (d) => `₹ ${d?.amount}` },
  { header: "Currency", accessorKey: "currency", cell: (d) => `₹ ${d?.currency}` },
  { header: "Status", accessorKey: "status", cell: (d) => `${d?.status}` },
  { header: "Payment Method", accessorKey: "paymentMethod", cell: (d) => `${d?.paymentMethod}` },
  { header: "Date", accessorKey: "createdAt", cell: (d) => new Date(d.createdAt).toLocaleDateString() },
];

export default function FinancialsPage() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [revenueData, setRevenueData] = useState([
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
  ])

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true)
      const res = await fetch("/api/donations")
      const data = await res.json()
      setDonations(data.donations || [])
      setLoading(false)

      const now = new Date()
      const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i))
      const monthLabels = months.map((d) => format(d, "MMM"))
      const revenueByMonth = months.map((monthDate, idx) => {
        const month = monthDate.getMonth()
        const year = monthDate.getFullYear()
        const revenue = (data.donations || []).reduce((sum, d) => {
          const date = new Date(d.createdAt)
          if (date.getMonth() === month && date.getFullYear() === year && d.status === "paid") {
            return sum + (d.amount || 0)
          }
          return sum
        }, 0)
        return { month: monthLabels[idx], revenue }
      })
      setRevenueData(revenueByMonth)
    }
    fetchDonations()
  }, [])

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CustomTitle title="Financials" description="Track revenue, expenses, and resident billing information" />
          </div>
          <div className="flex gap-2">
            {/* <GlobalButton size="sm" title="Export Data" icon={<Download className="size-4" />} /> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <CommonCard
            title="Total Donation"
            icon={<DollarSign className="size-4 text-muted-foreground" />}
            value={`₹ ${donations.filter(d => d.status === "paid").reduce((sum, d) => sum + (d.amount || 0), 0).toLocaleString()}`}
            // description={<span className="flex items-center gap-1"><TrendingUp className="size-3 text-chart-2" /><span className="text-chart-2 font-medium">{donations.length > 1 ? `+${(((donations.filter(d => d.status === "paid" && new Date(d.createdAt) >= subMonths(new Date(), 1)).reduce((sum, d) => sum + (d.amount || 0), 0)) / Math.max(1, donations.filter(d => d.status === "paid" && new Date(d.createdAt) < subMonths(new Date(), 1)).reduce((sum, d) => sum + (d.amount || 0), 0)) - 1) * 100).toFixed(1)}%` : '+0%'} </span> from last month</span>}
          />
          <CommonCard
            title="Total Donar"
            value={donations.filter(d => d.status === "paid").map(d => d.donorId?._id).filter((v, i, a) => v && a.indexOf(v) === i).length}
            // description={<span>{donations.filter(d => d.status === "paid").length} transactions</span>}
          />
          <CommonCard
            title="Total NGOs collaborated "
            value="20"
            icon={<TrendingDown className="size-3 text-accent" />}
            // description={<span className="flex items-center gap-1"><TrendingDown className="size-3 text-accent" /><span className="text-accent font-medium">-28%</span> from last month</span>}
          />
          <CommonCard
            title="Collection Rate"
            value="25.4%"
            // description={<span>Excellent performance</span>}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>6-month revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip
                  content={<ChartTooltipContent className="bg-primary text-primary-foreground border-none shadow-lg" />}
                  formatter={(value) => `₹ ${Number(value).toLocaleString()}`}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

  

        <Card>
          <CardHeader>
            <CardTitle>All Donations</CardTitle>
            <CardDescription>List of all donations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomTable
              data={donations}
              columns={donationColumns}
              searchKey="donorId"
              searchPlaceholder="Search by donor name..."
              filters={[
                {
                  key: "status",
                  title: "Status",
                  options: [
                    { label: "Paid", value: "paid" },
                    { label: "Created", value: "created" },
                    { label: "Failed", value: "failed" },
                  ],
                },
              ]}
            />
            {loading && <div className="text-center text-muted-foreground">Loading donations...</div>}
          </CardContent>
        </Card>
      </div>
  )
}
