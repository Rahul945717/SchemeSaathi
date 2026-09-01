import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

const tones: Record<string, string> = {
  blue: "bg-primary/10 text-primary",
  green: "bg-success/15 text-success",
  orange: "bg-warning/20 text-warning-foreground",
  purple: "bg-chart-5/15 text-chart-5",
}

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "blue",
  trend,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  tone?: keyof typeof tones
  trend?: string
}) {
  return (
    <Card className="flex flex-row items-center gap-4 p-5">
      <div className={cn("grid size-12 shrink-0 place-items-center rounded-xl", tones[tone])}>
        <Icon className="size-6" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {trend ? (
          <p className="text-xs font-medium text-success">{trend}</p>
        ) : hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </Card>
  )
}
