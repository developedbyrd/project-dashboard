"use client";

import { ProjectStatus } from "@/app/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatuses: ProjectStatus[];
  onStatusChange: (statuses: ProjectStatus[]) => void;
}

const allStatuses: ProjectStatus[] = ["Active", "On Hold", "Completed"];

const statusColors: Record<
  ProjectStatus,
  { bg: string; text: string; hoverBg: string }
> = {
  Active: {
    bg: "bg-emerald-500/10 border-emerald-500/30",
    text: "text-emerald-400",
    hoverBg: "hover:bg-emerald-500/20",
  },
  "On Hold": {
    bg: "bg-amber-500/10 border-amber-500/30",
    text: "text-amber-400",
    hoverBg: "hover:bg-amber-500/20",
  },
  Completed: {
    bg: "bg-blue-500/10 border-blue-500/30",
    text: "text-blue-400",
    hoverBg: "hover:bg-blue-500/20",
  },
};

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  selectedStatuses,
  onStatusChange,
}: ProjectFiltersProps) {
  const handleStatusToggle = (status: ProjectStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const clearSearch = () => onSearchChange("");
  const clearFilters = () => onStatusChange([]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Search Projects
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or client..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/30 border-muted text-foreground placeholder:text-muted-foreground focus-visible:border-accent"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-muted cursor-pointer"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Filter by Status
          </label>
          {selectedStatuses.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {allStatuses.map((status) => {
            const isSelected = selectedStatuses.includes(status);
            const config = statusColors[status];
            return (
              <Button
                key={status}
                onClick={() => handleStatusToggle(status)}
                variant="outline"
                className={`w-full justify-start border cursor-pointer ${
                  isSelected
                    ? `${config.bg} ${config.text}`
                    : "border-muted bg-muted/20 hover:bg-muted/40"
                } transition-all ${config.hoverBg}`}
              >
                <div
                  className={`h-2 w-2 rounded-full mr-2 ${
                    isSelected
                      ? status === "Active"
                        ? "bg-emerald-500"
                        : status === "On Hold"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      : "bg-muted-foreground"
                  }`}
                />
                <span className="text-sm font-medium">{status}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
