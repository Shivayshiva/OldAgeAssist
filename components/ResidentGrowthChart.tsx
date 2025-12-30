"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import React from "react";

interface ResidentGrowthChartProps {
  data: { month: string; residents: number }[];
  chartConfig: any;
}

export const ResidentGrowthChart: React.FC<ResidentGrowthChartProps> = ({ data, chartConfig }) => (
  <Card className="shadow-sm border-primary/10 p-3 sm:p-5">
    <CardHeader className="pb-2 sm:pb-4">
      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
        <div className="size-2 sm:size-3 rounded-full bg-primary" />
        Resident Growth
      </CardTitle>
      <CardDescription className="text-xs sm:text-sm">6-month admission trend</CardDescription>
    </CardHeader>
    <CardContent className="p-0">
      <ChartContainer config={chartConfig} className="h-[140px] sm:h-[200px] w-full">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-[10px] sm:text-xs" />
          <YAxis className="text-[10px] sm:text-xs" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone"
            dataKey="residents"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={{ fill: "var(--primary)", r: 3.5 }}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
