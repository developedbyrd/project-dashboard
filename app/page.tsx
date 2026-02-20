"use client";

import { useState, useMemo, useEffect } from "react";
import { Project, ProjectStatus } from "@/app/lib/types";
import { filterProjects } from "@/lib/utils";
import projectsData from "@/app/data/projects.json";
import { ProjectFilters } from "@/app/components/ProjectFilters";
import { ProjectList } from "@/app/components/ProjectList";
import { ProjectDetailSheet } from "@/app/components/ProjectDetailSheet";
import { EmptyState } from "@/app/components/EmptyState";
import { DashboardStats } from "@/app/components/DashboardStats";
import { ViewControls } from "@/app/components/ViewControls";
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { KeyboardShortcuts } from "@/app/components/KeyboardShortcuts";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "deadline" | "progress">(
    "name",
  );
  const [helpOpen, setHelpOpen] = useState(false);

  const projects: Project[] = projectsData as Project[];

  const filteredProjects = useMemo(() => {
    let result = filterProjects(projects, searchQuery, selectedStatuses);

    switch (sortBy) {
      case "deadline":
        result = [...result].sort(
          (a, b) =>
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
        );
        break;
      case "progress":
        result = [...result].sort(
          (a, b) => b.completionPercentage - a.completionPercentage,
        );
        break;
      case "name":
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedStatuses, sortBy]);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setSheetOpen(true);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStatuses([]);
    setSortBy("name");
    setViewMode("grid");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" || (e.ctrlKey && e.shiftKey && e.key === "?")) {
        e.preventDefault();
        setHelpOpen(!helpOpen);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        e.preventDefault();
        handleReset();
      }

      if (e.key === "g") {
        e.preventDefault();
        setViewMode("grid");
      }

      if (e.key === "l") {
        e.preventDefault();
        setViewMode("list");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [helpOpen]);

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <DashboardHeader onHelpClick={() => setHelpOpen(true)} />

        <div className="mb-12">
          <DashboardStats projects={projects} />
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-xl border border-muted bg-card/50 backdrop-blur-sm p-6 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  Filters
                </h2>
                <div className="mt-6">
                  <ProjectFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStatuses={selectedStatuses}
                    onStatusChange={setSelectedStatuses}
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-4">
            {projects.length === 0 ? (
              <EmptyState
                message="No projects available"
                description="There are no projects to display at this time"
              />
            ) : (
              <>
                <div className="flex flex-col gap-4 rounded-lg border border-muted bg-muted/30 p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[lab(91_0_-0.01)]" />
                      <p className="text-sm font-medium text-foreground">
                        <span className="font-bold text-emerald-400">
                          {filteredProjects.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-foreground">
                          {projects.length}
                        </span>{" "}
                        projects
                      </p>
                    </div>
                  </div>
                  <ViewControls
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onReset={handleReset}
                  />
                </div>

                <ProjectList
                  projects={filteredProjects}
                  onProjectSelect={handleProjectSelect}
                  viewMode={viewMode}
                />
              </>
            )}
          </div>
        </div>
      </main>

      <ProjectDetailSheet
        project={selectedProject}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />

      <KeyboardShortcuts open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
}
