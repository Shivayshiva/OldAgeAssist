"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Phone, MapPin } from "lucide-react"
import { CustomGridView, type FilterOption } from "./CustomGridView"

type Resident = {
  id: number
  name: string
  room: string
  age: number
  status: "Active" | "On Leave" | "Discharged"
  admissionDate: string
  primaryContact: string
  primaryContactPhone: string
  medicalCondition: string
  profilePhoto: string
  mentalHealthStatus: string
  disabilities: string[]
  gender: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "default"
    case "On Leave":
      return "secondary"
    case "Discharged":
      return "outline"
    default:
      return "default"
  }
}

interface ResidentGridViewProps {
  data: Resident[]
  searchPlaceholder?: string
  filters?: FilterOption[]
  emptyMessage?: string
}

export function ResidentGridView({
  data,
  searchPlaceholder = "Search residents by name...",
  filters = [
    {
      key: "status",
      title: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "On Leave", value: "On Leave" },
        { label: "Discharged", value: "Discharged" },
      ],
    },
  ],
  emptyMessage = "No residents found.",
}: ResidentGridViewProps) {
  const renderResidentCard = (resident: Resident) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={resident.profilePhoto || `/generic-placeholder-icon.png?height=48&width=48`} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {resident.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{resident.name}</CardTitle>
              <CardDescription className="text-sm">
                {resident.age} years • {resident.gender}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
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
              <DropdownMenuItem className="text-destructive">
                Mark as Discharged
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Room:</span>
          <Badge variant="outline">{resident?.room}</Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant={getStatusColor(resident?.status)}>
            {resident?.status}
          </Badge>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <Phone className="size-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-muted-foreground text-xs">Primary Contact</p>
            <p className="font-medium">{resident?.primaryContact}</p>
            <p className="text-xs text-muted-foreground">{resident?.primaryContactPhone}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="size-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-muted-foreground text-xs">Medical Condition</p>
            <p className="font-medium text-xs line-clamp-2">
              {resident?.medicalCondition}
            </p>
          </div>
        </div>
        {resident?.disabilities && resident?.disabilities.length > 0 && (
          <div className="text-xs">
            <span className="text-muted-foreground">Disabilities: </span>
            <span className="font-medium">{resident?.disabilities.join(", ")}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-xs border-t pt-2">
          <span className="text-muted-foreground">Mental Health:</span>
          <Badge variant="outline" className="text-xs">{resident?.mentalHealthStatus}</Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          Admitted: {new Date(resident?.admissionDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <CustomGridView
      data={data}
      renderCard={renderResidentCard}
      searchKey="name"
      searchPlaceholder={searchPlaceholder}
      filters={filters}
      emptyMessage={emptyMessage}
    />
  )
}
