"use client"

import { SuperAdminLayout } from "@/components/super-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Search, Filter, Download, DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react"

// Mock financial data
const revenueData = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 132000 },
  { month: "Mar", revenue: 128000 },
  { month: "Apr", revenue: 145000 },
  { month: "May", revenue: 138000 },
  { month: "Jun", revenue: 155000 },
]

const transactions = [
  {
    id: 1,
    resident: "Margaret Wilson",
    type: "Monthly Fee",
    amount: 4500,
    status: "Paid",
    date: "2024-01-15",
  },
  {
    id: 2,
    resident: "James Rodriguez",
    type: "Medical Services",
    amount: 850,
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: 3,
    resident: "Elizabeth Chen",
    type: "Monthly Fee",
    amount: 4500,
    status: "Paid",
    date: "2024-01-13",
  },
  {
    id: 4,
    resident: "Robert Thompson",
    type: "Additional Care",
    amount: 1200,
    status: "Overdue",
    date: "2024-01-10",
  },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}

export default function FinancialsPage() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Financials</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Track revenue, expenses, and resident billing information
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="size-4" />
              This Month
            </Button>
            <Button size="sm">
              <Download className="size-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Revenue</CardDescription>
                <DollarSign className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$155,000</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="size-3 text-chart-2" />
                <span className="text-chart-2 font-medium">+12.3%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground mt-1">8 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Overdue Payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,200</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingDown className="size-3 text-accent" />
                <span className="text-accent font-medium">-28%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Collection Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">97.9%</div>
              <p className="text-xs text-muted-foreground mt-1">Excellent performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
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
                  content={<ChartTooltipContent />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>View and manage billing transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <Filter className="size-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resident</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.resident}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{transaction.type}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{transaction.type}</TableCell>
                      <TableCell className="font-medium">${transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Paid"
                              ? "default"
                              : transaction.status === "Pending"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
