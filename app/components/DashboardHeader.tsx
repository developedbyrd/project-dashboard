"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface DashboardHeaderProps {
  onHelpClick: () => void;
}

export function DashboardHeader({ onHelpClick }: DashboardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-12">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-balance text-foreground">
          Project Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage and track all your active projects in one place
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onHelpClick}
        className="shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted/30 cursor-pointer"
        title="Keyboard shortcuts (? or Cmd+Shift+?)"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  );
}
