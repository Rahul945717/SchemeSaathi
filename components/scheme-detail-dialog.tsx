"use client"

import { Check, FileText, MapPin, X } from "lucide-react"
import { toast } from "sonner"
import { inr, partners, type Scheme } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EmiCalculator } from "@/components/emi-calculator"

export function SchemeDetailDialog({
  scheme,
  onOpenChange,
}: {
  scheme: Scheme | null
  onOpenChange: (v: boolean) => void
}) {
  if (!scheme) return null
  const eligible = scheme.eligibility.filter((e) => e.met).length
  const total = scheme.eligibility.length
  const matchPartners = partners.filter((p) => p.schemes.includes(scheme.id))

  return (
    <Dialog open={!!scheme} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{scheme.category}</Badge>
            {scheme.match != null && (
              <Badge className="bg-success/15 text-success hover:bg-success/15">{scheme.match}% Match</Badge>
            )}
          </div>
          <DialogTitle className="text-xl">{scheme.name}</DialogTitle>
          <DialogDescription>{scheme.ministry}</DialogDescription>
        </DialogHeader>

        <p className="mt-2 text-sm text-muted-foreground">{scheme.summary}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <InfoTile label="Loan range" value={`${inr(scheme.minAmount)} – ${inr(scheme.maxAmount)}`} />
          <InfoTile label="Interest" value={scheme.interestRate === 0 ? "Grant / Subsidy" : `${scheme.interestRate}% p.a.`} />
          <InfoTile label="Max tenure" value={scheme.maxTenureMonths === 0 ? "N/A" : `${scheme.maxTenureMonths} months`} />
        </div>

        {/* Eligibility */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold">
            Eligibility check{" "}
            <span className="text-muted-foreground">
              ({eligible}/{total} criteria met)
            </span>
          </h4>
          <ul className="mt-3 space-y-2">
            {scheme.eligibility.map((e) => (
              <li key={e.label} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                    e.met ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {e.met ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                </span>
                <span>
                  <span className="block text-sm font-medium">{e.label}</span>
                  <span className="block text-xs text-muted-foreground">{e.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold">Required documents</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {scheme.documents.map((d) => (
              <span key={d} className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs">
                <FileText className="size-3.5 text-muted-foreground" /> {d}
              </span>
            ))}
          </div>
        </div>

        {/* EMI */}
        {scheme.interestRate > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold">Plan your finances</h4>
            <div className="mt-3">
              <EmiCalculator scheme={scheme} compact />
            </div>
          </div>
        )}

        {/* Partners */}
        {matchPartners.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold">Nearby processing partners</h4>
            <div className="mt-3 space-y-2">
              {matchPartners.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-primary" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.distanceKm} km · {p.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            className="flex-1"
            onClick={() => {
              toast.success("Application started", {
                description: `Your application for ${scheme.shortName ?? scheme.name} has been drafted.`,
              })
              onOpenChange(false)
            }}
          >
            Apply for this scheme
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Saved to your schemes", { description: scheme.name })}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}
