import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import React from "react";

interface CommonCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  borderColor: string;
  gradientBg: string;
  valueColor: string;
  description?: React.ReactNode;
}

export const CommonCard: React.FC<CommonCardProps> = ({
  title,
  value,
  icon,
  iconBg,
  borderColor,
  gradientBg,
  valueColor,
  description,
}) => (
  <Card className={`overflow-hidden ${borderColor} shadow-sm hover:shadow-md transition-shadow`}>
    <div className={`absolute right-0 top-0 size-24 bg-gradient-to-br ${gradientBg} to-transparent rounded-bl-full`} />
    <CardHeader className="pb-3 relative">
      <div className="flex items-center justify-between">
        <CardDescription className="font-medium">{title}</CardDescription>
        <div className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${iconBg} text-primary-foreground shadow-sm`}>
          {icon}
        </div>
      </div>
    </CardHeader>
    <CardContent className="relative">
      <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
      {description}
    </CardContent>
  </Card>
);
