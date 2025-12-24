"use client"

import { SuperAdminLayout } from "@/components/super-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export default function ReportsPage() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Generate comprehensive reports and view facility analytics
            </p>
          </div>
          <Button size="sm">
            <FileText className="size-4" />
            Custom Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Reports Generated</CardDescription>
                <FileText className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Pending Reviews</CardDescription>
                <Calendar className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Scheduled Reports</CardDescription>
                <TrendingUp className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">Auto-generated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Last Generated</CardDescription>
                <FileText className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Occupancy Report */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Occupancy Report</CardTitle>
                  <CardDescription>Room and resident data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last run</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frequency</span>
                <Badge variant="outline">Daily</Badge>
              </div>
              <Button className="w-full bg-transparent" variant="outline" size="sm">
                <Download className="size-4" />
                Download Report
              </Button>
            </CardContent>
          </Card>

          {/* Financial Report */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-chart-2/10">
                  <DollarSign className="size-5 text-chart-2" />
                </div>
                <div>
                  <CardTitle className="text-base">Financial Summary</CardTitle>
                  <CardDescription>Revenue and expenses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last run</span>
                <span>Yesterday</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frequency</span>
                <Badge variant="outline">Weekly</Badge>
              </div>
              <Button className="w-full bg-transparent" variant="outline" size="sm">
                <Download className="size-4" />
                Download Report
              </Button>
            </CardContent>
          </Card>

          {/* Medical Incidents Report */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                  <Activity className="size-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-base">Medical Incidents</CardTitle>
                  <CardDescription>Health and safety data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last run</span>
                <span>3 days ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frequency</span>
                <Badge variant="outline">Monthly</Badge>
              </div>
              <Button className="w-full bg-transparent" variant="outline" size="sm">
                <Download className="size-4" />
                Download Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
