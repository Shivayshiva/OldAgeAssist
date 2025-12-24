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
import { Search, Filter, MoreVertical, UserPlus, Download } from "lucide-react"

// Mock resident data
const residents = [
  {
    id: 1,
    name: "Margaret Wilson",
    room: "A-204",
    age: 78,
    status: "Active",
    admissionDate: "2023-08-15",
    primaryContact: "John Wilson",
    medicalCondition: "Diabetes, Hypertension",
  },
  {
    id: 2,
    name: "James Rodriguez",
    room: "B-105",
    age: 82,
    status: "Active",
    admissionDate: "2023-09-22",
    primaryContact: "Maria Rodriguez",
    medicalCondition: "Arthritis",
  },
  {
    id: 3,
    name: "Elizabeth Chen",
    room: "C-308",
    age: 75,
    status: "Active",
    admissionDate: "2023-10-05",
    primaryContact: "David Chen",
    medicalCondition: "Alzheimer's, Heart Disease",
  },
  {
    id: 4,
    name: "Robert Thompson",
    room: "A-112",
    age: 80,
    status: "On Leave",
    admissionDate: "2023-07-01",
    primaryContact: "Sarah Thompson",
    medicalCondition: "Osteoporosis",
  },
  {
    id: 5,
    name: "Mary Johnson",
    room: "B-201",
    age: 77,
    status: "Active",
    admissionDate: "2023-11-18",
    primaryContact: "Michael Johnson",
    medicalCondition: "None",
  },
]

export default function ResidentsPage() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Resident Management</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Manage resident information, admissions, and health records
            </p>
          </div>
          <Button size="sm">
            <UserPlus className="size-4" />
            New Admission
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Residents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">62</div>
              <p className="text-xs text-muted-foreground mt-1">Currently in facility</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>New Admissions (This Month)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Age</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">79</div>
              <p className="text-xs text-muted-foreground mt-1">years old</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>All Residents</CardTitle>
            <CardDescription>View and manage resident information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search residents..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <Filter className="size-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="leave">On Leave</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="size-4" />
                </Button>
              </div>
            </div>

            {/* Residents Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resident</TableHead>
                    <TableHead className="hidden md:table-cell">Room</TableHead>
                    <TableHead className="hidden lg:table-cell">Age</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Primary Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {residents.map((resident) => (
                    <TableRow key={resident.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarImage src={`/generic-placeholder-icon.png?height=36&width=36`} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {resident.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{resident.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              Room {resident.room} • {resident.age} yrs
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{resident.room}</TableCell>
                      <TableCell className="hidden lg:table-cell">{resident.age}</TableCell>
                      <TableCell>
                        <Badge variant={resident.status === "Active" ? "default" : "outline"}>{resident.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {resident.primaryContact}
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Information</DropdownMenuItem>
                            <DropdownMenuItem>Medical Records</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Mark as Discharged</DropdownMenuItem>
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
      </div>
  )
}
