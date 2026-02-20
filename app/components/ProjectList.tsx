"use client";

import { Project } from "@/app/lib/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectListItem } from "./ProjectListItem";
import { EmptyState } from "./EmptyState";

interface ProjectListProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  viewMode?: "grid" | "list";
}

export function ProjectList({
  projects,
  onProjectSelect,
  viewMode = "grid",
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        message="No projects match your filters"
        description="Try adjusting your search or filter criteria"
      />
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            onClick={onProjectSelect}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={onProjectSelect}
        />
      ))}
    </div>
  );
}
