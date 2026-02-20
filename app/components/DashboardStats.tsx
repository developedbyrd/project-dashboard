"use client";

import { Project } from "@/app/lib/types";
import { Card } from "@/components/ui/card";
import { TrendingUp, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface DashboardStatsProps {
  projects: Project[];
}

export function DashboardStats({ projects }: DashboardStatsProps) {
  const activeCount = projects.filter((p) => p.status === "Active").length;
  const completedCount = projects.filter(
    (p) => p.status === "Completed",
  ).length;
  const onHoldCount = projects.filter((p) => p.status === "On Hold").length;
  const avgCompletion =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + p.completionPercentage, 0) /
            projects.length,
        )
      : 0;

  const stats = [
    {
      label: "Active Projects",
      value: activeCount,
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "On Hold",
      value: onHoldCount,
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Avg. Progress",
      value: `${avgCompletion}%`,
      icon: AlertCircle,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="relative overflow-hidden border-muted bg-card/50 backdrop-blur-sm p-5"
          >
            <div className="absolute top-0 right-0 h-20 w-20 opacity-5 rounded-full -mr-10 -mt-10" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
