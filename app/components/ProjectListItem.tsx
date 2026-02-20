"use client";

import { Project } from "@/app/lib/types";
import { formatDate, daysRemaining } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";

interface ProjectListItemProps {
  project: Project;
  onClick: (project: Project) => void;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> =
  {
    Active: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      dot: "bg-emerald-500",
    },
    "On Hold": {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      dot: "bg-amber-500",
    },
    Completed: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      dot: "bg-blue-500",
    },
  };

export function ProjectListItem({ project, onClick }: ProjectListItemProps) {
  const daysLeft = daysRemaining(project.endDate);
  const isOverdue = daysLeft < 0 && project.status !== "Completed";
  const config = statusConfig[project.status];

  return (
    <Card
      className="group cursor-pointer border-muted bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-card hover:shadow-lg hover:shadow-accent/10"
      onClick={() => onClick(project)}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className={`h-2 w-2 rounded-full shrink-0 ${config.dot}`} />
            <h3 className="line-clamp-1 font-semibold text-foreground">
              {project.name}
            </h3>
            <Badge
              className={`${config.bg} ${config.text} border-0 text-xs font-medium shrink-0`}
              variant="secondary"
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {project.clientName}
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p className="text-sm font-medium text-foreground">
              {formatDate(project.endDate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Time left</p>
            <p
              className={`text-sm font-semibold ${isOverdue ? "text-red-400" : "text-emerald-400"}`}
            >
              {isOverdue ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d`}
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-2 shrink-0 w-32">
          <div className="flex items-center gap-2 w-full">
            <Progress
              value={project.completionPercentage}
              className="h-1.5 bg-muted flex-1"
            />
            <span className="text-xs font-bold whitespace-nowrap">
              {project.completionPercentage}%
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors shrink-0" />
      </div>
    </Card>
  );
}
