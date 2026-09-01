"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Calculator,
  Check,
  FileText,
  Globe,
  MapPin,
  Menu,
  Rocket,
  ShieldCheck,
  Target,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { LoginDialog } from "@/components/landing/login-dialog"
import { AiAssistant } from "@/components/ai-assistant"

const features = [
  { icon: Bot, title: "AI Scheme Matching", text: "Government schemes matched to your profile, income and requirements." },
  { icon: BadgeCheck, title: "Smart Eligibility", text: "Understand whether you qualify and exactly why you are eligible or not." },
  { icon: Calculator, title: "Financial Planning", text: "Calculate EMI, interest and repayment using scheme-specific terms." },
  { icon: MapPin, title: "Partner Finder", text: "Find suitable banks, NBFCs and processing partners near you." },
  { icon: FileText, title: "Application Guidance", text: "Step-by-step guidance for documents, application and submission." },
  { icon: Globe, title: "Hindi + English AI", text: "Ask questions and understand scheme information in your language." },
]

const steps = [
  { n: 1, title: "Tell Us", text: "Share your requirements." },
  { n: 2, title: "Get Matched", text: "AI finds suitable schemes." },
  { n: 3, title: "Check Eligibility", text: "Verify scheme requirements." },
  { n: 4, title: "Plan Money", text: "Calculate EMI and repayment." },
  { n: 5, title: "Find Partner", text: "Select the right partner." },
  { n: 6, title: "Apply & Track", text: "Submit and track progress." },
]

const comparison = [
  { cap: "Scheme discovery", others: true, ours: true },
  { cap: "Eligibility matching", others: true, ours: true },
  { cap: "AI chatbot assistance", others: false, ours: true },
  { cap: "Natural-language input", others: false, ours: true },
  { cap: "EMI calculator", others: false, ours: true },
  { cap: "Location-based partner search", others: false, ours: true },
  { cap: "Intelligent partner routing", others: false, ours: true },
  { cap: "End-to-end guidance", others: false, ours: true },
]

export default function LandingPage() {
  const { lang, toggle, t } = useLanguage()
  const [dialog, setDialog] = useState<null | "login" | "signup">(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-svh bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">SchemeSaathi</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#home" className="hover:text-foreground">{t("nav.home")}</a>
            <a href="#features" className="hover:text-foreground">{t("nav.features")}</a>
            <a href="#how" className="hover:text-foreground">{t("nav.how")}</a>
            <a href="#compare" className="hover:text-foreground">{t("nav.about")}</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggle} className="font-medium">
              {lang === "en" ? "EN | हिंदी" : "हिंदी | EN"}
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => setDialog("login")}>
              {t("cta.login")}
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" onClick={() => setDialog("signup")}>
              {t("cta.signup")}
            </Button>
            <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" onClick={() => setDialog("login")}>{t("cta.login")}</Button>
              <Button size="sm" onClick={() => setDialog("signup")}>{t("cta.signup")}</Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_10%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              AI-Powered Government Scheme Assistance
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              Find the <span className="text-primary">Right Scheme</span> for You
            </h1>
            <p className="mt-4 max-w-md text-pretty text-muted-foreground md:text-lg">
              Discover government schemes matched to your needs, check your eligibility, plan your
              finances and find the right processing partner — all in one place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/dashboard" />}>
                <Rocket className="size-4" /> {t("cta.findScheme")}
              </Button>
              <Button size="lg" variant="outline" render={<a href="#features" />}>
                Explore Schemes
              </Button>
            </div>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {[
                ["148+", "Active schemes"],
                ["326", "Partners"],
                ["94.6%", "AI accuracy"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-bold text-primary">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">AI Recommendations</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-success">
                  <span className="size-1.5 animate-pulse rounded-full bg-success" /> Live Matching
                </span>
              </div>
              <div className="mt-4 rounded-xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">Your requirement</p>
                <p className="text-sm font-semibold">Business funding · ₹5,00,000</p>
              </div>
              {[
                { name: "PMEGP Business Support", score: 94, tags: ["Income", "Location", "Business Type"] },
                { name: "MUDRA Loan Scheme", score: 90, tags: ["Income", "Purpose"] },
              ].map((m) => (
                <div key={m.name} className="mt-3 rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{m.name}</p>
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                      {m.score}% Match
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.tags.map((tg) => (
                      <span key={tg} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                        <Check className="size-3 text-success" /> {tg}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -left-3 top-8 hidden rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-lg lg:block">
              <p className="text-muted-foreground">🤖 AI Verified</p>
              <p className="font-semibold">Eligibility Checked</p>
            </div>
            <div className="absolute -bottom-4 right-6 hidden rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-lg lg:block">
              <p className="text-muted-foreground">📍 Partner Found</p>
              <p className="font-semibold">2.4 km away</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">One Platform</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Everything You Need</h2>
          <p className="mt-3 text-muted-foreground">
            From discovering a scheme to completing your application, get assistance at every step.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5.5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Simple Process</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-3 text-muted-foreground">
              One simple journey from discovering a scheme to tracking your application.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why SchemeSaathi</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Beyond Existing Portals</h2>
          <p className="mt-3 text-muted-foreground">
            Existing portals help you discover schemes. SchemeSaathi guides you end-to-end.
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Capability</th>
                <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Existing portals</th>
                <th className="px-5 py-3 text-center font-semibold text-primary">SchemeSaathi</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.cap} className={i % 2 ? "bg-background" : "bg-card"}>
                  <td className="px-5 py-3">{row.cap}</td>
                  <td className="px-5 py-3 text-center">
                    {row.others ? (
                      <Check className="mx-auto size-4 text-success" />
                    ) : (
                      <X className="mx-auto size-4 text-muted-foreground/50" />
                    )}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Check className="mx-auto size-4 text-success" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-primary px-6 py-10 text-primary-foreground md:flex-row md:px-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Not sure which scheme is right for you?
            </h2>
            <p className="mt-2 max-w-lg text-primary-foreground/80">
              Tell us what you need and let our AI-powered recommendation system guide you toward
              suitable government schemes.
            </p>
          </div>
          <Button size="lg" variant="secondary" render={<Link href="/dashboard" />} className="shrink-0">
            {t("cta.findScheme")} <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" />
              </span>
              <span className="text-lg font-bold">SchemeSaathi</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered assistance for discovering, understanding and applying for suitable
              government schemes.
            </p>
          </div>
          <FooterCol title="Platform" links={[["Find Schemes", "/dashboard"], ["How It Works", "#how"], ["Citizen Portal", "/dashboard"], ["Partner Finder", "/partner"], ["Admin Portal", "/admin"]]} />
          <FooterCol title="Support" links={[["Help Center", "#"], ["AI Assistant", "#"], ["Contact", "#"], ["FAQs", "#"]]} />
          <FooterCol title="Information" links={[["About Us", "#compare"], ["Privacy", "#"], ["Terms", "#"], ["Disclaimer", "#"]]} />
        </div>
        <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">
          © 2026 SchemeSaathi · Built for Smart India Hackathon 2026 — SIH26092 · Team InnovateX
        </div>
      </footer>

      <LoginDialog open={dialog !== null} onOpenChange={(v) => !v && setDialog(null)} mode={dialog ?? "login"} />
      <AiAssistant />
    </div>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
