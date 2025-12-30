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
  <Card className="shadow-sm border-primary/10">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-primary" />
        Resident Growth
      </CardTitle>
      <CardDescription>6-month admission trend</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis className="text-xs" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone"
            dataKey="residents"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ fill: "var(--primary)", r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
