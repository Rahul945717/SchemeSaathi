"use client"

import { useState } from "react"
import {
  Bell,
  Calculator,
  FileText,
  Home,
  Landmark,
  Search,
  User,
} from "lucide-react"
import type { Scheme } from "@/lib/data"
import { schemes } from "@/lib/data"
import { DashboardShell, type NavItem } from "@/components/dashboard-shell"
import { AiAssistant } from "@/components/ai-assistant"
import { SchemeDetailDialog } from "@/components/scheme-detail-dialog"
import { SchemeCard } from "@/components/scheme-card"
import { EmiCalculator } from "@/components/emi-calculator"
import { CitizenOverview } from "@/components/citizen/overview"
import { FindSchemes } from "@/components/citizen/find-schemes"
import { ApplicationsPanel } from "@/components/citizen/applications-panel"
import { ProfilePanel } from "@/components/citizen/profile-panel"

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: Home, group: "Main" },
  { key: "find", label: "Find Schemes", icon: Search, group: "Main" },
  { key: "schemes", label: "My Schemes", icon: Landmark, group: "Main" },
  { key: "applications", label: "Applications", icon: FileText, group: "Main" },
  { key: "emi", label: "EMI Calculator", icon: Calculator, group: "Main" },
  { key: "profile", label: "My Profile", icon: User, group: "Account" },
  { key: "notifications", label: "Notifications", icon: Bell, group: "Account" },
]

const headings: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "My Dashboard", subtitle: "Discover government schemes you may be eligible for." },
  find: { title: "Find Schemes", subtitle: "Describe your need and let AI rank the best matches." },
  schemes: { title: "My Schemes", subtitle: "Schemes matched and saved to your profile." },
  applications: { title: "My Applications", subtitle: "Track the status of your submissions." },
  emi: { title: "EMI Calculator", subtitle: "Plan repayments using scheme-specific terms." },
  profile: { title: "My Profile", subtitle: "Manage your personal details and documents." },
  notifications: { title: "Notifications", subtitle: "Updates on your schemes and applications." },
}

const notifications = [
  { title: "PM Awas Yojana approved", detail: "Your application APP-10482 has been approved.", time: "2h ago", tone: "success" },
  { title: "Document required", detail: "Upload your Caste Certificate to proceed with PMEGP.", time: "1d ago", tone: "warning" },
  { title: "New scheme match", detail: "MUDRA Loan is a 90% match for your profile.", time: "2d ago", tone: "info" },
  { title: "Application under review", detail: "PM-KISAN APP-10472 is being reviewed.", time: "3d ago", tone: "info" },
]

export default function CitizenDashboard() {
  const [active, setActive] = useState("dashboard")
  const [selected, setSelected] = useState<Scheme | null>(null)
  const h = headings[active]

  return (
    <>
      <DashboardShell
        portalName="Citizen Portal"
        navItems={navItems}
        active={active}
        onNavigate={setActive}
        title={h.title}
        subtitle={h.subtitle}
        user={{ name: "Rahul Kumar", role: "Citizen", initials: "RK" }}
      >
        {active === "dashboard" && (
          <CitizenOverview onView={setSelected} onFind={() => setActive("find")} />
        )}

        {active === "find" && <FindSchemes onView={setSelected} />}

        {active === "schemes" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schemes.map((s) => (
              <SchemeCard key={s.id} scheme={s} onView={setSelected} />
            ))}
          </div>
        )}

        {active === "applications" && <ApplicationsPanel />}

        {active === "emi" && (
          <div className="max-w-3xl">
            <EmiCalculator />
          </div>
        )}

        {active === "profile" && <ProfilePanel />}

        {active === "notifications" && (
          <div className="mx-auto max-w-2xl space-y-3">
            {notifications.map((n) => (
              <div key={n.title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span
                  className={`mt-1 size-2.5 shrink-0 rounded-full ${
                    n.tone === "success"
                      ? "bg-success"
                      : n.tone === "warning"
                        ? "bg-warning"
                        : "bg-info"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardShell>

      <SchemeDetailDialog scheme={selected} onOpenChange={(v) => !v && setSelected(null)} />
      <AiAssistant />
    </>
  )
}
