"use client";

import { Project } from "@/app/lib/types";
import { formatDate, daysRemaining } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
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

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const daysLeft = daysRemaining(project.endDate);
  const isOverdue = daysLeft < 0 && project.status !== "Completed";
  const config = statusConfig[project.status];

  return (
    <Card
      className="group relative cursor-pointer border-muted bg-card transition-colors duration-200 hover:bg-muted"
      onClick={() => onClick(project)}
    >
      <div className="p-6 space-y-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="line-clamp-2 text-lg font-bold text-foreground">
                {project.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {project.clientName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${config.dot}`} />
            <Badge
              className={`${config.bg} ${config.text} border-0 text-xs font-medium`}
              variant="secondary"
            >
              {project.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 py-4 border-y border-muted">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Timeline
            </span>
            <span
              className={`text-xs font-semibold ${isOverdue ? "text-red-400" : "text-emerald-400"}`}
            >
              {isOverdue
                ? `${Math.abs(daysLeft)}d overdue`
                : `${daysLeft}d left`}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Start</p>
              <p className="font-medium text-foreground">
                {formatDate(project.startDate)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">End</p>
              <p className="font-medium text-foreground">
                {formatDate(project.endDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Completion
            </span>
            <span className="text-sm font-bold">
              {project.completionPercentage}%
            </span>
          </div>
          <Progress
            value={project.completionPercentage}
            className="h-2 bg-muted"
          />
        </div>
      </div>
    </Card>
  );
}
