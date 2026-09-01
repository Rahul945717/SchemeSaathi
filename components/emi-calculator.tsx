"use client"

import { useMemo, useState } from "react"
import { calcEmi, inr, type Scheme } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function EmiCalculator({ scheme, compact = false }: { scheme?: Scheme; compact?: boolean }) {
  const [amount, setAmount] = useState(scheme ? Math.min(500000, scheme.maxAmount) : 500000)
  const [rate, setRate] = useState(scheme && scheme.interestRate > 0 ? scheme.interestRate : 11)
  const [months, setMonths] = useState(scheme && scheme.maxTenureMonths > 0 ? Math.min(60, scheme.maxTenureMonths) : 60)

  const maxAmount = scheme?.maxAmount ?? 2500000
  const minAmount = scheme?.minAmount ?? 50000
  const maxMonths = scheme && scheme.maxTenureMonths > 0 ? scheme.maxTenureMonths : 120

  const { emi, total, interest } = useMemo(() => calcEmi(amount, rate, months), [amount, rate, months])

  return (
    <Card className={cn("gap-0 p-5", compact && "shadow-none")}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <Field
            label="Loan amount"
            value={inr(amount)}
            min={minAmount}
            max={maxAmount}
            step={10000}
            current={amount}
            onChange={setAmount}
          />
          <Field
            label="Interest rate"
            value={`${rate}% p.a.`}
            min={5}
            max={18}
            step={0.25}
            current={rate}
            onChange={setRate}
          />
          <Field
            label="Tenure"
            value={`${months} months`}
            min={6}
            max={maxMonths}
            step={6}
            current={months}
            onChange={setMonths}
          />
        </div>

        <div className="flex flex-col justify-center rounded-xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm text-primary-foreground/80">Monthly EMI</p>
          <p className="text-3xl font-bold tracking-tight">
            {inr(Math.round(emi))}
          </p>
          <div className="mt-4 space-y-2 border-t border-white/15 pt-4 text-sm">
            <Row label="Principal" value={inr(amount)} />
            <Row label="Total interest" value={inr(Math.round(interest))} />
            <Row label="Total payable" value={inr(Math.round(total))} strong />
          </div>
        </div>
      </div>
    </Card>
  )
}

function Field({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string
  value: string
  min: number
  max: number
  step: number
  current: number
  onChange: (n: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-muted-foreground">{label}</Label>
        <span className="text-sm font-semibold">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--primary)]"
      />
    </div>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-primary-foreground/80">{label}</span>
      <span className={strong ? "font-bold" : "font-medium"}>{value}</span>
    </div>
  )
}
