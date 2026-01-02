
"use client"

import { SuperAdminLayout } from "@/components/super-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, MoreVertical, FileText, AlertCircle } from "lucide-react"

// Mock incidents data
const incidents = [
  {
    id: 1,
    type: "Fall",
    resident: "Margaret Wilson",
    severity: "Minor",
    status: "Under Review",
    date: "2024-01-15 10:30 AM",
    reportedBy: "John Anderson",
  },
  {
    id: 2,
    type: "Medication Error",
    resident: "James Rodriguez",
    severity: "Moderate",
    status: "Resolved",
    date: "2024-01-14 02:15 PM",
    reportedBy: "Maria Garcia",
  },
  {
    id: 3,
    type: "Behavioral",
    resident: "Elizabeth Chen",
    severity: "Minor",
    status: "Pending",
    date: "2024-01-13 08:45 AM",
    reportedBy: "Dr. Sarah Mitchell",
  },
]

// Mock medical records
const medicalRecords = [
  {
    id: 1,
    resident: "Margaret Wilson",
    recordType: "Medication Update",
    date: "2024-01-15",
    provider: "Dr. Sarah Mitchell",
  },
  {
    id: 2,
    resident: "James Rodriguez",
    recordType: "Annual Check-up",
    date: "2024-01-14",
    provider: "Dr. Michael Brown",
  },
  {
    id: 3,
    resident: "Elizabeth Chen",
    recordType: "Blood Test Results",
    date: "2024-01-13",
    provider: "Dr. Sarah Mitchell",
  },
]

export default function MedicalPage() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Medical Records & Incidents</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Track medical records, incidents, and health-related reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="size-4" />
              Generate Report
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              New Incident
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>This Month Incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">-40% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Medical Records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground mt-1">Total records</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Upcoming Appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Incidents and Medical Records Tabs */}
        <Tabs defaultValue="incidents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
          </TabsList>

          {/* Incidents Tab */}
          <TabsContent value="incidents">
            <Card>
              <CardHeader>
                <CardTitle>Incident Reports</CardTitle>
                <CardDescription>Track and manage safety incidents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filter Bar */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search incidents..." className="pl-9" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <Filter className="size-4" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="review">Under Review</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Incidents Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead className="hidden md:table-cell">Resident</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead className="hidden lg:table-cell">Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <AlertCircle
                                className={`size-4 ${
                                  incident.severity === "Moderate" ? "text-accent" : "text-muted-foreground"
                                }`}
                              />
                              <div>
                                <div className="font-medium">{incident.type}</div>
                                <div className="text-xs text-muted-foreground md:hidden">{incident.resident}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{incident.resident}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                incident.severity === "Moderate"
                                  ? "default"
                                  : incident.severity === "Minor"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {incident.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant={incident.status === "Resolved" ? "default" : "outline"}>
                              {incident.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">{incident.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Report</DropdownMenuItem>
                                <DropdownMenuItem>Mark Resolved</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>View and manage resident health records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filter Bar */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search records..." className="pl-9" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <Filter className="size-4" />
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="checkup">Check-ups</SelectItem>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="tests">Test Results</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Medical Records Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead className="hidden md:table-cell">Record Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead className="hidden lg:table-cell">Provider</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medicalRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{record.resident}</div>
                              <div className="text-xs text-muted-foreground md:hidden">{record.recordType}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{record.recordType}</TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">{record.date}</TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">
                            {record.provider}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Record</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem>Add Note</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
