import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/lib/data"

const styles: Record<ApplicationStatus, string> = {
  Approved: "bg-success/15 text-success border-success/30",
  Pending: "bg-warning/20 text-warning-foreground border-warning/40",
  "Under Review": "bg-info/15 text-info border-info/30",
  Rejected: "bg-destructive/15 text-destructive border-destructive/30",
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
