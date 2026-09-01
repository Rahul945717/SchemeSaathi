"use client"

import { useState } from "react"
import {
  Building2,
  CheckCircle2,
  ChartColumn,
  Headset,
  Landmark,
  MapPin,
  Route,
  Target,
  Users,
} from "lucide-react"
import {
  applications,
  inr,
  monthlyApplications,
  partners,
  schemes,
} from "@/lib/data"
import { cn } from "@/lib/utils"
import { DashboardShell, type NavItem } from "@/components/dashboard-shell"
import { AiAssistant } from "@/components/ai-assistant"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import { BarChart } from "@/components/bar-chart"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: ChartColumn, group: "Main" },
  { key: "applicants", label: "Routed Applicants", icon: Users, group: "Main" },
  { key: "schemes", label: "Matched Schemes", icon: Landmark, group: "Main" },
  { key: "routing", label: "Partner Routing", icon: Route, group: "Main" },
  { key: "organization", label: "Organization", icon: Building2, group: "Partner" },
  { key: "support", label: "Support", icon: Headset, group: "Partner" },
]

const headings: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Partner Dashboard", subtitle: "Monitor beneficiaries, schemes and applications." },
  applicants: { title: "Routed Applicants", subtitle: "Applicants intelligently routed to your organization." },
  schemes: { title: "Matched Schemes", subtitle: "Schemes your organization is authorised to process." },
  routing: { title: "Partner Routing", subtitle: "How SchemeSaathi ranks and routes applicants." },
  organization: { title: "Organization", subtitle: "Manage your organization profile." },
  support: { title: "Support", subtitle: "Get help from the SchemeSaathi team." },
}

const chartData = monthlyApplications.slice(-6).map((m) => ({
  label: m.month,
  value: m.value,
  value2: Math.round(m.value * 0.72),
}))

export default function PartnerDashboard() {
  const [active, setActive] = useState("dashboard")
  const h = headings[active]
  const partnerSchemes = schemes.filter((s) => partners[0].schemes.includes(s.id))

  return (
    <>
      <DashboardShell
        portalName="Partner Portal"
        navItems={navItems}
        active={active}
        onNavigate={setActive}
        title={h.title}
        subtitle={h.subtitle}
        user={{ name: "State Bank Partner", role: "Channel Partner", initials: "SB" }}
      >
        {active === "dashboard" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Users} label="Total beneficiaries" value="1,248" trend="↑ 12.5% this month" tone="blue" />
              <StatCard icon={Target} label="Scheme matches" value="3,482" trend="↑ 18.2% this month" tone="green" />
              <StatCard icon={Landmark} label="Applications" value="867" trend="↑ 9.8% this month" tone="orange" />
              <StatCard icon={CheckCircle2} label="Successful access" value="624" trend="↑ 15.4% this month" tone="purple" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <Card className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Application overview</h3>
                    <p className="text-sm text-muted-foreground">Matches vs applications, last 6 months</p>
                  </div>
                </div>
                <BarChart data={chartData} />
                <div className="mt-4 flex gap-5 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-sm bg-primary" /> Scheme matches
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-sm bg-success" /> Applications
                  </span>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold">Top matched schemes</h3>
                <p className="text-sm text-muted-foreground">Most recommended schemes</p>
                <div className="mt-4 space-y-3">
                  {partnerSchemes.slice(0, 4).map((s, i) => (
                    <div key={s.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{s.shortName}</p>
                          <p className="text-xs text-muted-foreground">{s.category}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">{s.applicants}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-0">
              <div className="border-b border-border p-5">
                <h3 className="font-semibold">Recent applications</h3>
                <p className="text-sm text-muted-foreground">Latest beneficiary applications routed to you</p>
              </div>
              <ApplicantsTable />
            </Card>
          </div>
        )}

        {active === "applicants" && (
          <Card className="p-0">
            <ApplicantsTable />
          </Card>
        )}

        {active === "schemes" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnerSchemes.map((s) => (
              <Card key={s.id} className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{s.shortName}</h3>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                    Authorised
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.ministry}</p>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{s.summary}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Applicants</span>
                  <span className="font-semibold">{s.applicants}</span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {active === "routing" && <RoutingPanel />}

        {(active === "organization" || active === "support") && (
          <Card className="p-6">
            <h3 className="font-semibold">
              {active === "organization" ? "State Bank Partner — MG Road" : "Contact support"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {active === "organization"
                ? "Bank · Available · Serving 3 authorised schemes within a 10 km radius."
                : "Our team responds within 24 hours. Raise a query and we'll get back to you."}
            </p>
            <Button className="mt-4" onClick={() => toast.success("Request submitted")}>
              {active === "organization" ? "Edit organization" : "Raise a ticket"}
            </Button>
          </Card>
        )}
      </DashboardShell>
      <AiAssistant />
    </>
  )
}

function ApplicantsTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Beneficiary</TableHead>
            <TableHead>Scheme</TableHead>
            <TableHead>Application ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-secondary text-xs">
                      {a.applicant.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{a.applicant}</span>
                </div>
              </TableCell>
              <TableCell>{a.schemeName}</TableCell>
              <TableCell className="text-muted-foreground">{a.id}</TableCell>
              <TableCell>{inr(a.amount)}</TableCell>
              <TableCell className="text-muted-foreground">{a.date}</TableCell>
              <TableCell>
                <StatusBadge status={a.status} />
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast(`Reviewing ${a.id}`, { description: a.applicant })}
                >
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function RoutingPanel() {
  const ranked = [...partners].sort((a, b) => {
    const score = (p: (typeof partners)[number]) =>
      (p.status === "Available" ? 100 : p.status === "Busy" ? 60 : 20) -
      p.distanceKm * 3 +
      p.rating * 5
    return score(b) - score(a)
  })
  return (
    <div className="space-y-4">
      <Card className="flex items-start gap-3 bg-primary/5 p-5">
        <Route className="mt-0.5 size-5 text-primary" />
        <p className="text-sm text-muted-foreground">
          SchemeSaathi ranks partners by <span className="font-medium text-foreground">scheme compatibility</span>,{" "}
          <span className="font-medium text-foreground">availability</span> and{" "}
          <span className="font-medium text-foreground">distance</span> to route each applicant to the best fit.
        </p>
      </Card>
      <div className="space-y-3">
        {ranked.map((p, i) => (
          <Card key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" /> {p.distanceKm} km · {p.type} · ★ {p.rating}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{p.processed} processed</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  p.status === "Available"
                    ? "bg-success/15 text-success"
                    : p.status === "Busy"
                      ? "bg-warning/20 text-warning-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {p.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
