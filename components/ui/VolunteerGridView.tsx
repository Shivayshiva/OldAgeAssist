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
import { MoreVertical, Phone, Mail, Calendar, Award } from "lucide-react"
import { CustomGridView, type FilterOption } from "./CustomGridView"

type Volunteer = {
  id: string
  name: string
  email: string
  phone: string
  status: "Active" | "Inactive" | "Pending"
  availabilityDays: string[]
  availabilityTimes: string[],
  skills: string[]
  joinedDate: string
  hoursContributed: number
  profilePhoto?: string,
  onboardingCompleted: boolean

}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "default"
    case "Pending":
      return "secondary"
    case "Inactive":
      return "outline"
    default:
      return "default"
  }
}

interface VolunteerGridViewProps {
  data: Volunteer[]
  searchPlaceholder?: string
  filters?: FilterOption[]
  emptyMessage?: string
}

export function VolunteerGridView({
  data,
  searchPlaceholder = "Search volunteers by name...",
  filters = [
    {
      key: "status",
      title: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Pending", value: "Pending" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ],
  emptyMessage = "No volunteers found.",
}: VolunteerGridViewProps) {
  const renderVolunteerCard = (volunteer: Volunteer) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={volunteer.profilePhoto || `/generic-placeholder-icon.png?height=48&width=48`} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {volunteer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
             
            </Avatar>
             
            <div>
              <CardTitle className="text-base">{volunteer.name}</CardTitle>
              <CardDescription className="text-sm flex items-center gap-1">
                <Award className="size-3" />
                {volunteer.hoursContributed} hours
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
              <DropdownMenuItem>Assign Task</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant={getStatusColor(volunteer.status)}>
            {volunteer.status}
          </Badge>
        </div>
        
        <div className="flex items-start gap-2 text-sm">
          <Mail className="size-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-muted-foreground text-xs">Email</p>
            <p className="font-medium text-xs truncate">{volunteer.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Phone className="size-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-muted-foreground text-xs">Phone</p>
            <p className="font-medium">{volunteer.phone}</p>
          </div>
        </div>

        {volunteer.skills && volunteer.skills.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Skills</p>
            <div className="flex flex-wrap gap-1">
              {volunteer.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {volunteer.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{volunteer.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {volunteer.availabilityDays && volunteer.availabilityDays.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Availability</p>
            <div className="flex flex-wrap gap-1">
              {volunteer.availabilityDays.slice(0, 2).map((day, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {day}
                </Badge>
              ))}
              {volunteer.availabilityDays.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{volunteer.availabilityDays.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {volunteer.availabilityTimes && volunteer.availabilityTimes.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Available Times</p>
            <div className="flex flex-wrap gap-1">
              {volunteer.availabilityTimes.slice(0, 2).map((time, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {time}
                </Badge>
              ))}
              {volunteer.availabilityTimes.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{volunteer.availabilityTimes.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-muted-foreground border-t pt-2">
          <Calendar className="size-3" />
          Joined: {new Date(volunteer.joinedDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <CustomGridView
      data={data}
      renderCard={renderVolunteerCard}
      searchKey="name"
      searchPlaceholder={searchPlaceholder}
      filters={filters}
      emptyMessage={emptyMessage}
    />
  )
}
