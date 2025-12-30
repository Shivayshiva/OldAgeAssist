"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { CustomTable, Column } from "@/components/ui/CustomTable";
import { Badge } from "@/components/ui/badge"


type Admission = {
  id: number;
  name: string;
  room: string;
  status: string;
  date: string;
  priority: string;
};

interface DashboardRecentAdmissionTableProps {
  data: Admission[];

}



  const columns: Column<Admission>[] = [
    {
      header: "Resident Name",
      cell: (item) => (
        <>
          <div className="font-semibold">{item.name}</div>
          <div className="text-xs text-muted-foreground md:hidden">Room {item.room}</div>
        </>
      ),
    },
    {
      header: "Room",
      className: "hidden md:table-cell",
      cell: (item) => <span className="font-medium text-primary">{item.room}</span>,
    },
    {
      header: "Status",
      cell: (item) => (
        <Badge
          variant={item.status === "Admitted" ? "default" : "outline"}
          className={
            item.status === "Admitted"
              ? "bg-success text-success-foreground shadow-sm"
              : "border-chart-4 text-chart-4"
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      header: "Date",
      className: "hidden sm:table-cell",
      cell: (item) => <span className="text-muted-foreground">{item.date}</span>,
    },
  ]

export function DashboardRecentAdmissionTable({ data }: DashboardRecentAdmissionTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-secondary" />
              Recent Admissions
            </CardTitle>
            <CardDescription>Latest resident admission activity</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-primary/10">
            View All
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CustomTable data={data} columns={columns} />
      </CardContent>
    </Card>
  );
}
