import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Project, ProjectStatus } from '@/app/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string (YYYY-MM-DD) to a readable format
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString + 'T00:00:00Z')
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

/**
 * Calculate days remaining until end date
 */
export function daysRemaining(endDate: string): number {
  try {
    const end = new Date(endDate + 'T00:00:00Z')
    const today = new Date()
    const timeDifference = end.getTime() - today.getTime()
    return Math.ceil(timeDifference / (1000 * 3600 * 24))
  } catch {
    return 0
  }
}

/**
 * Filter projects by search query and status filters
 */
export function filterProjects(
  projects: Project[],
  searchQuery: string,
  selectedStatuses: ProjectStatus[]
): Project[] {
  return projects.filter((project) => {
    // Check status filter (if any statuses selected, project must match one of them)
    const statusMatch =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(project.status)

    // Check search query (case-insensitive, searches name and clientName)
    const searchMatch =
      !searchQuery ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase())

    return statusMatch && searchMatch
  })
}
