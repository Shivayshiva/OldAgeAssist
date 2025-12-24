"use client"

import { SuperAdminLayout } from "@/components/super-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreVertical, UserPlus, Clock } from "lucide-react"

// Mock staff data
const staffMembers = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Medical Director",
    department: "Medical",
    status: "On Duty",
    shiftStart: "08:00 AM",
    contact: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "John Anderson",
    role: "Registered Nurse",
    department: "Nursing",
    status: "On Duty",
    shiftStart: "08:00 AM",
    contact: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Care Assistant",
    department: "Care",
    status: "On Break",
    shiftStart: "06:00 AM",
    contact: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    role: "Physician",
    department: "Medical",
    status: "Off Duty",
    shiftStart: "Not Scheduled",
    contact: "+1 (555) 456-7890",
  },
]

const volunteers = [
  {
    id: 1,
    name: "Emily Davis",
    activity: "Recreation Activities",
    status: "Active",
    hoursThisMonth: 24,
  },
  {
    id: 2,
    name: "Robert Wilson",
    activity: "Meal Service",
    status: "Active",
    hoursThisMonth: 18,
  },
  {
    id: 3,
    name: "Lisa Thompson",
    activity: "Library Services",
    status: "Inactive",
    hoursThisMonth: 0,
  },
]

export default function StaffPage() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Staff & Volunteers</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Manage staff schedules, roles, and volunteer coordination
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock className="size-4" />
              View Schedule
            </Button>
            <Button size="sm">
              <UserPlus className="size-4" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-muted-foreground mt-1">Full-time & Part-time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>On Duty Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground mt-1">Currently working</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Volunteers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Volunteer Hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground mt-1">Total this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Staff and Volunteers Tabs */}
        <Tabs defaultValue="staff" className="space-y-4">
          <TabsList>
            <TabsTrigger value="staff">Staff Members</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          </TabsList>

          {/* Staff Tab */}
          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle>Staff Members</CardTitle>
                <CardDescription>Manage staff information and schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filter Bar */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search staff..." className="pl-9" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <Filter className="size-4" />
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="nursing">Nursing</SelectItem>
                        <SelectItem value="care">Care</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Staff Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead className="hidden md:table-cell">Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Shift Start</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffMembers.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="size-9">
                                <AvatarImage src={`/generic-placeholder-icon.png?height=36&width=36`} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {staff.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-xs text-muted-foreground">{staff.role}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{staff.department}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                staff.status === "On Duty"
                                  ? "default"
                                  : staff.status === "On Break"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {staff.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">
                            {staff.shiftStart}
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
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                                <DropdownMenuItem>View Performance</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Contact</DropdownMenuItem>
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

          {/* Volunteers Tab */}
          <TabsContent value="volunteers">
            <Card>
              <CardHeader>
                <CardTitle>Volunteers</CardTitle>
                <CardDescription>Manage volunteer activities and hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filter Bar */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search volunteers..." className="pl-9" />
                  </div>
                </div>

                {/* Volunteers Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Volunteer</TableHead>
                        <TableHead className="hidden md:table-cell">Activity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Hours (This Month)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {volunteers.map((volunteer) => (
                        <TableRow key={volunteer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="size-9">
                                <AvatarImage src={`/generic-placeholder-icon.png?height=36&width=36`} />
                                <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                                  {volunteer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{volunteer.name}</div>
                                <div className="text-xs text-muted-foreground md:hidden">{volunteer.activity}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{volunteer.activity}</TableCell>
                          <TableCell>
                            <Badge variant={volunteer.status === "Active" ? "default" : "secondary"}>
                              {volunteer.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{volunteer.hoursThisMonth} hrs</TableCell>
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
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Log Hours</DropdownMenuItem>
                                <DropdownMenuItem>View History</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Contact</DropdownMenuItem>
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
