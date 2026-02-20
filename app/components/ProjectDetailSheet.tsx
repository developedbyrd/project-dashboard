"use client";

import { Project } from "@/app/lib/types";
import { formatDate, daysRemaining } from "@/lib/utils";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectDetailSheetProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function ProjectDetailSheet({
  project,
  open,
  onOpenChange,
}: ProjectDetailSheetProps) {
  if (!project) return null;

  const daysLeft = daysRemaining(project.endDate);
  const isOverdue = daysLeft < 0 && project.status !== "Completed";
  const config = statusConfig[project.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border border-muted bg-card">
        <DialogHeader className="space-y-4 border-b border-muted pb-6">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {project.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {project.clientName}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Status
            </h3>
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${config.dot}`} />
              <Badge
                className={`${config.bg} ${config.text} border-0 font-medium`}
                variant="secondary"
              >
                {project.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Timeline
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 rounded-lg border border-muted bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Start Date
                </p>
                <p className="font-semibold text-foreground">
                  {formatDate(project.startDate)}
                </p>
              </div>
              <div className="space-y-2 rounded-lg border border-muted bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  End Date
                </p>
                <p className="font-semibold text-foreground">
                  {formatDate(project.endDate)}
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-muted bg-muted/30 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                {isOverdue ? "Days Overdue" : "Days Remaining"}
              </p>
              <p
                className={`text-lg font-bold ${isOverdue ? "text-red-400" : "text-emerald-400"}`}
              >
                {Math.abs(daysLeft)} days
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Progress
              </h3>
              <span className="text-lg font-bold">
                {project.completionPercentage}%
              </span>
            </div>
            <div className="space-y-2">
              <Progress
                value={project.completionPercentage}
                className="h-2.5 bg-muted"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-muted bg-muted/30 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Project ID
            </p>
            <code className="font-mono text-sm text-foreground">
              {project.id}
            </code>
          </div>
        </div>
        <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
