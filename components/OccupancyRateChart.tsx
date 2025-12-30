"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface OccupancyRateChartProps {
  data: { week: string; rate: number }[];
  chartConfig: any;
}

export const OccupancyRateChart: React.FC<OccupancyRateChartProps> = ({ data, chartConfig }) => (
  <Card className="shadow-sm border-accent/10">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-accent" />
        Weekly Occupancy Rate
      </CardTitle>
      <CardDescription>Last 4 weeks performance</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="week" className="text-xs" />
          <YAxis className="text-xs" />
          <ChartTooltip content={<ChartTooltipContent className="bg-white text-black" />} />
          <Bar dataKey="rate" fill="var(--primary)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
