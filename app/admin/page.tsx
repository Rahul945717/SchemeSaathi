"use client"

import { useMemo, useState } from "react"
import { DashboardShell, type NavItem } from "@/components/dashboard-shell"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import { BarChart } from "@/components/bar-chart"
import { AiAssistant } from "@/components/ai-assistant"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  schemes as allSchemes,
  applications,
  partners,
  users,
  monthlyApplications,
  inr,
} from "@/lib/data"
import {
  LayoutDashboard,
  FileText,
  Users,
  Building2,
  BarChart3,
  Search,
  TrendingUp,
  CheckCircle2,
  Landmark,
  UserCog,
} from "lucide-react"
import { toast } from "sonner"

const navItems: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, group: "Monitor" },
  { key: "schemes", label: "Schemes", icon: Landmark, group: "Monitor" },
  { key: "applications", label: "Applications", icon: FileText, group: "Monitor" },
  { key: "users", label: "Users", icon: Users, group: "Manage" },
  { key: "partners", label: "Partners", icon: Building2, group: "Manage" },
  { key: "analytics", label: "Analytics", icon: BarChart3, group: "Manage" },
]

const titles: Record<string, { title: string; subtitle: string }> = {
  overview: { title: "Platform overview", subtitle: "Network-wide performance at a glance" },
  schemes: { title: "Scheme management", subtitle: "Enable, disable and review schemes" },
  applications: { title: "All applications", subtitle: "Applications routed through the platform" },
  users: { title: "User management", subtitle: "Citizens and partners on the platform" },
  partners: { title: "Partner network", subtitle: "Banks, NBFCs and agencies" },
  analytics: { title: "Analytics", subtitle: "Distribution and processing performance" },
}

export default function AdminDashboard() {
  const [active, setActive] = useState("overview")
  const [schemes, setSchemes] = useState(allSchemes)
  const [userQuery, setUserQuery] = useState("")

  const totalApplicants = useMemo(
    () => schemes.reduce((s, x) => s + x.applicants, 0),
    [schemes],
  )
  const approved = applications.filter((a) => a.status === "Approved").length
  const approvalRate = Math.round((approved / applications.length) * 100)
  const disbursed = applications
    .filter((a) => a.status === "Approved")
    .reduce((s, a) => s + a.amount, 0)

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(userQuery.toLowerCase()),
  )

  function toggleScheme(id: string) {
    setSchemes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    )
    const s = schemes.find((x) => x.id === id)
    toast.success(`${s?.shortName ?? s?.name} ${s?.active ? "disabled" : "enabled"}`)
  }

  const h = titles[active]

  return (
    <DashboardShell
      portalName="Admin Console"
      navItems={navItems}
      active={active}
      onNavigate={setActive}
      title={h.title}
      subtitle={h.subtitle}
      user={{ name: "Dr. Meera Iyer", role: "Administrator", initials: "MI" }}
    >
      {active === "overview" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-balance">Platform overview</h1>
            <p className="text-muted-foreground">
              Monitor scheme performance, applications and partner activity across the network.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total applicants" value={totalApplicants.toLocaleString("en-IN")} icon={Users} trend="+12% vs last month" />
            <StatCard label="Active schemes" value={`${schemes.filter((s) => s.active).length}/${schemes.length}`} icon={Landmark} />
            <StatCard label="Approval rate" value={`${approvalRate}%`} icon={CheckCircle2} trend="+4% vs last month" />
            <StatCard label="Funds disbursed" value={inr(disbursed)} icon={TrendingUp} />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Applications trend</CardTitle>
                <CardDescription>Monthly submitted applications</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart data={monthlyApplications.map((m) => ({ label: m.month, value: m.value }))} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top schemes</CardTitle>
                <CardDescription>By applicant volume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...schemes]
                  .sort((a, b) => b.applicants - a.applicants)
                  .slice(0, 5)
                  .map((s) => (
                    <div key={s.id} className="flex items-center justify-between text-sm">
                      <span className="truncate pr-2">{s.shortName ?? s.name}</span>
                      <span className="font-semibold tabular-nums">
                        {s.applicants.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {active === "schemes" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Scheme management</h1>
            <p className="text-muted-foreground">Enable, disable and review government schemes.</p>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden md:table-cell">Ministry</TableHead>
                    <TableHead className="text-right">Applicants</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemes.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.shortName ?? s.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{s.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {s.ministry}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {s.applicants.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-muted-foreground">
                            {s.active ? "Active" : "Off"}
                          </span>
                          <Switch checked={s.active} onCheckedChange={() => toggleScheme(s.id)} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {active === "applications" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">All applications</h1>
            <p className="text-muted-foreground">Every application routed through the platform.</p>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead className="hidden md:table-cell">Scheme</TableHead>
                    <TableHead className="hidden lg:table-cell">Partner</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono text-xs">{a.id}</TableCell>
                      <TableCell className="font-medium">{a.applicant}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {a.schemeName}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {a.partner}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{inr(a.amount)}</TableCell>
                      <TableCell className="text-right">
                        <StatusBadge status={a.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {active === "users" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">User management</h1>
              <p className="text-muted-foreground">Citizens and partners on the platform.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden lg:table-cell">Location</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {u.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.role === "Partner" ? "default" : "secondary"}>
                          {u.role === "Partner" ? (
                            <UserCog className="mr-1 size-3" />
                          ) : null}
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {u.location}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            u.status === "Active"
                              ? "border-success/40 text-success"
                              : "border-destructive/40 text-destructive"
                          }
                        >
                          {u.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                        No users match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {active === "partners" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Partner network</h1>
            <p className="text-muted-foreground">Banks, NBFCs and agencies processing applications.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {partners.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <CardDescription>
                        {p.type} · {p.distanceKm} km · ★ {p.rating}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        p.status === "Available"
                          ? "border-success/40 text-success"
                          : p.status === "Busy"
                            ? "border-warning/40 text-warning"
                            : "border-border text-muted-foreground"
                      }
                    >
                      {p.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {p.schemes.length} schemes supported
                  </span>
                  <span className="font-semibold tabular-nums">
                    {p.processed.toLocaleString("en-IN")} processed
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {active === "analytics" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Category distribution and processing performance.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Applicants by category</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={Object.entries(
                    schemes.reduce<Record<string, number>>((acc, s) => {
                      acc[s.category] = (acc[s.category] ?? 0) + s.applicants
                      return acc
                    }, {}),
                  ).map(([label, value]) => ({ label, value }))}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Application status split</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(["Approved", "Under Review", "Pending", "Rejected"] as const).map((st) => {
                  const count = applications.filter((a) => a.status === st).length
                  const pct = Math.round((count / applications.length) * 100)
                  return (
                    <div key={st}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <StatusBadge status={st} />
                        <span className="tabular-nums text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Report actions</CardTitle>
              <CardDescription>Generate exports for stakeholders (demo).</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success("Monthly report exported (demo)")}>
                Export monthly report
              </Button>
              <Button variant="outline" onClick={() => toast.success("Partner summary exported (demo)")}>
                Partner summary
              </Button>
              <Button variant="outline" onClick={() => toast.success("Disbursement CSV exported (demo)")}>
                Disbursement CSV
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <AiAssistant />
    </DashboardShell>
  )
}
