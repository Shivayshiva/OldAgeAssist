
"use client"
import { CustomGridView } from "@/components/ui/CustomGridView"
import { Badge } from "@/components/ui/badge"
import { GlobalButton } from "@/components/ui/GlobalButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommonCard } from "@/components/ui/CustomCard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  MoreVertical, UserPlus, Clock } from "lucide-react"
import Link from "next/link"


import { useEffect, useState } from "react";

type StaffApi = {
  _id: string;
  fullName: string;
  department: string;
  designation: string;
  status: string;
  shift: string;
  mobileNumber: string;
  email?: string;
  // ...add more fields as needed
};


export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<StaffApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Staff_Member", staffMembers);

  useEffect(() => {
    async function fetchStaff() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/staff");
        const data = await res.json();
        if (data.success) {
          setStaffMembers(data.staff);
        } else {
          setError("Failed to fetch staff");
        }
      } catch (e) {
        setError("Failed to fetch staff");
      } finally {
        setLoading(false);
      }
    }
    fetchStaff();
  }, []);

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
            <GlobalButton variant="outline" size="sm" title="View Schedule" icon={<Clock className="size-4" />} iconPosition="left" />
            <Link href="/superadmin/staff/addNew">
            <GlobalButton size="sm" title="Add Staff" icon={<UserPlus className="size-4" />} iconPosition="left" />
            </Link>
            
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <CommonCard
            title="Total Staff"
            value={35}
            description={<>Full-time & Part-time</>}
          />
          <CommonCard
            title="On Duty Today"
            value={28}
            description={<>Currently working</>}
          />
          <CommonCard
            title="Active Volunteers"
            value={12}
            description={<>This month</>}
          />
          <CommonCard
            title="Volunteer Hours"
            value={248}
            description={<>Total this month</>}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Staff Members</h2>
          <div>
            {loading ? (
              <div className="py-8 text-center text-muted-foreground">Loading staff...</div>
            ) : error ? (
              <div className="py-8 text-center text-destructive">{error}</div>
            ) : (
              <CustomGridView
                data={staffMembers}
                searchKey="fullName"
                searchPlaceholder="Search staff..."
                filters={[{
                  key: "department",
                  title: "Department",
                  options: [
                    { label: "All Departments", value: "all" },
                    { label: "Medical", value: "Medical" },
                    { label: "Nursing", value: "Nursing" },
                    { label: "Care", value: "Care" },
                    { label: "Administration", value: "Administration" },
                  ],
                }]}
                renderCard={(staff: StaffApi) => (
                  <div className="rounded-lg border bg-card p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-14">
                        <AvatarImage src={staff.profilePhoto || `/generic-placeholder-icon.png?height=56&width=56`} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {staff.fullName.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="">
                        <div className="font-medium text-base">{staff.fullName}</div>
                        <div className="text-xs text-muted-foreground">{staff.designation} {staff.role && <>| <span className="text-xs">{staff.role}</span></>}</div>
                        <div className="text-xs text-muted-foreground mt-1 gap-2">
                          <p>Gender: {staff.gender}</p>
                          <p>Employment: {staff.employmentType}</p>
                          <p>Shift: {staff.shift}</p>
                          <p>Status: <Badge variant={staff.isActive ? "default" : "secondary"}>{staff.isActive ? "Active" : "Inactive"}</Badge></p>
                        </div>
                      </div>
                     
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <p className="mb-2"><span className="font-bold ">Department:</span> {staff.department}</p>
                      <p className="mb-2"><span className="font-bold">Phone:</span> {staff.mobileNumber}</p>
                      {staff.email && <p><span className="font-bold">Email:</span> {staff.email}</p>}
                    </div>
                    <div className="flex gap-2 justify-end mt-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <GlobalButton variant="ghost" size="icon" title="" icon={<MoreVertical className="size-4" />} iconPosition="left" />
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
                    </div>
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </div>
  )
}
