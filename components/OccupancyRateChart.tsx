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
  <Card className="shadow-sm border-accent/10 p-3 sm:p-5">
    <CardHeader className="pb-2 sm:pb-4">
      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
        <div className="size-2 sm:size-3 rounded-full bg-accent" />
        Weekly Occupancy Rate
      </CardTitle>
      <CardDescription className="text-xs sm:text-sm">Last 4 weeks performance</CardDescription>
    </CardHeader>
    <CardContent className="p-0">
      <ChartContainer config={chartConfig} className="h-[140px] sm:h-[200px] w-full">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="week" className="text-[10px] sm:text-xs" />
          <YAxis className="text-[10px] sm:text-xs" />
          <ChartTooltip content={<ChartTooltipContent className="bg-white text-black" />} />
          <Bar dataKey="rate" fill="var(--primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
