"use client";

import { Button } from "@/components/ui/button";
import { Grid3x3, List, ArrowUpDown, RotateCw } from "lucide-react";

interface ViewControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: "name" | "deadline" | "progress";
  onSortChange: (sort: "name" | "deadline" | "progress") => void;
  onReset: () => void;
}

export function ViewControls({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onReset,
}: ViewControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 rounded-lg border border-muted bg-muted/20 p-1">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="sm"
          className={`h-8 w-8 p-0 cursor-pointer ${
            viewMode === "grid"
              ? "bg-accent text-accent-foreground hover:bg-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onViewModeChange("grid")}
          title="Grid view"
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="sm"
          className={`h-8 w-8 p-0 cursor-pointer ${
            viewMode === "list"
              ? "bg-accent text-accent-foreground hover:bg-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onViewModeChange("list")}
          title="List view"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <select
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as "name" | "deadline" | "progress")
          }
          className="rounded-lg border border-muted bg-muted/20 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors cursor-pointer"
        >
          <option value="name">Sort by Name</option>
          <option value="deadline">Sort by Deadline</option>
          <option value="progress">Sort by Progress</option>
        </select>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground hover:bg-muted/30 cursor-pointer"
        onClick={onReset}
        title="Reset all filters and view"
      >
        <RotateCw className="h-4 w-4 mr-1" />
        Reset
      </Button>
    </div>
  );
}
