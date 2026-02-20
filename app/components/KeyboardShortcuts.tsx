"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";

interface KeyboardShortcutsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Shortcut {
  keys: string[];
  description: string;
  category: "Navigation" | "Filtering" | "View";
}

const shortcuts: Shortcut[] = [
  {
    keys: ["Cmd/Ctrl", "K"],
    description: "Focus search box",
    category: "Navigation",
  },
  {
    keys: ["Esc"],
    description: "Close modal or clear search",
    category: "Navigation",
  },
  {
    keys: ["Cmd/Ctrl", "R"],
    description: "Reset all filters",
    category: "Filtering",
  },
  {
    keys: ["G"],
    description: "Switch to grid view",
    category: "View",
  },
  {
    keys: ["L"],
    description: "Switch to list view",
    category: "View",
  },
];

const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

export function KeyboardShortcuts({
  open,
  onOpenChange,
}: KeyboardShortcutsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border border-muted bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Quickly navigate and control the dashboard with these shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-muted bg-muted/20 p-3"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {shortcut.description}
                      </p>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIdx) => (
                          <div key={keyIdx} className="flex items-center gap-1">
                            <Kbd className="bg-accent/10 border-accent/30">
                              {key}
                            </Kbd>
                            {keyIdx < shortcut.keys.length - 1 && (
                              <span className="text-muted-foreground text-xs mx-1">
                                +
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
