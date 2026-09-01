"use client"

import {
  Briefcase,
  GraduationCap,
  Home,
  Landmark,
  Sprout,
  Store,
  type LucideIcon,
} from "lucide-react"
import { inr, type Category, type Scheme } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const icons: Record<Category, LucideIcon> = {
  Business: Briefcase,
  Housing: Home,
  Education: GraduationCap,
  Agriculture: Sprout,
  Employment: Landmark,
  Welfare: Store,
}

export function SchemeCard({ scheme, onView }: { scheme: Scheme; onView: (s: Scheme) => void }) {
  const Icon = icons[scheme.category]
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight">{scheme.shortName ?? scheme.name}</h3>
            {scheme.match != null && (
              <span className="shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                {scheme.match}%
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {scheme.category} · {scheme.ministry}
          </p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-muted-foreground">{scheme.summary}</p>

      {scheme.match != null && (
        <div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${scheme.match}%` }} />
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm">
          <span className="text-muted-foreground">Up to </span>
          <span className="font-semibold">{inr(scheme.maxAmount)}</span>
        </span>
        <Button size="sm" onClick={() => onView(scheme)}>
          View details
        </Button>
      </div>
    </Card>
  )
}
