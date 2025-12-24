"use client"

import { SuperAdminLayout } from "@/components/super-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Plus, BedDouble, Users, CheckCircle2, Clock } from "lucide-react"

// Mock room data
const rooms = [
  {
    id: 1,
    number: "A-101",
    floor: "1st Floor",
    type: "Single",
    status: "Occupied",
    resident: "Margaret Wilson",
    monthlyRate: 4500,
  },
  {
    id: 2,
    number: "A-102",
    floor: "1st Floor",
    type: "Single",
    status: "Available",
    resident: null,
    monthlyRate: 4500,
  },
  {
    id: 3,
    number: "B-201",
    floor: "2nd Floor",
    type: "Shared",
    status: "Occupied",
    resident: "Mary Johnson & Lisa Davis",
    monthlyRate: 3200,
  },
  {
    id: 4,
    number: "C-305",
    floor: "3rd Floor",
    type: "Suite",
    status: "Maintenance",
    resident: null,
    monthlyRate: 6000,
  },
  {
    id: 5,
    number: "A-112",
    floor: "1st Floor",
    type: "Single",
    status: "Occupied",
    resident: "Robert Thompson",
    monthlyRate: 4500,
  },
]

export default function RoomsPage() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Room Management</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Track room occupancy, availability, and maintenance status
            </p>
          </div>
          <Button size="sm">
            <Plus className="size-4" />
            Add Room
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Rooms</CardDescription>
                <BedDouble className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">66</div>
              <p className="text-xs text-muted-foreground mt-1">Across 3 floors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Occupied</CardDescription>
                <Users className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">62</div>
              <div className="mt-2">
                <Progress value={94} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">94% occupancy rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Available</CardDescription>
                <CheckCircle2 className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">Ready for admission</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Under Maintenance</CardDescription>
                <Clock className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground mt-1">Estimated 2 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Rooms List */}
        <Card>
          <CardHeader>
            <CardTitle>All Rooms</CardTitle>
            <CardDescription>View and manage room details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search rooms..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <Filter className="size-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{room.number}</CardTitle>
                        <CardDescription>{room.floor}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          room.status === "Occupied" ? "default" : room.status === "Available" ? "outline" : "secondary"
                        }
                      >
                        {room.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium">{room.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-medium">${room.monthlyRate}/mo</span>
                    </div>
                    {room.resident && (
                      <div className="flex flex-col gap-1 text-sm pt-2 border-t">
                        <span className="text-muted-foreground text-xs">Resident</span>
                        <span className="font-medium">{room.resident}</span>
                      </div>
                    )}
                    <Button variant="outline" className="w-full mt-2 bg-transparent" size="sm">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
