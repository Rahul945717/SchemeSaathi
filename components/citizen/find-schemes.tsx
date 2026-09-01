"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { categoryList, schemes, type Category, type Scheme } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SchemeCard } from "@/components/scheme-card"

export function FindSchemes({ onView }: { onView: (s: Scheme) => void }) {
  const [category, setCategory] = useState<Category | "any">("Business")
  const [amount, setAmount] = useState("500000")
  const [results, setResults] = useState<Scheme[] | null>(null)
  const [loading, setLoading] = useState(false)

  function run(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResults(null)
    setTimeout(() => {
      const amt = Number(amount) || 0
      const matched = schemes
        .filter((s) => (category === "any" ? true : s.category === category))
        .map((s) => {
          // demo scoring: closeness to requested amount + base match
          const fits = amt >= s.minAmount && amt <= s.maxAmount
          const base = s.match ?? 70
          return { ...s, match: Math.min(99, fits ? base : Math.max(55, base - 20)) }
        })
        .sort((a, b) => (b.match ?? 0) - (a.match ?? 0))
      setResults(matched)
      setLoading(false)
    }, 700)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h3 className="font-semibold">Describe what you need</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Our AI matches your requirement against scheme rules and ranks the best fits.
        </p>
        <form onSubmit={run} className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category | "any")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any category</SelectItem>
                {categoryList.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount required (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500000"
            />
          </div>
          <Button type="submit" disabled={loading} className="md:w-auto">
            {loading ? "Matching..." : "Find schemes"}
          </Button>
        </form>
      </Card>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {results && (
        <div>
          <p className="mb-3 text-sm text-muted-foreground">
            Found <span className="font-semibold text-foreground">{results.length}</span> matching schemes,
            ranked by fit.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => (
              <SchemeCard key={s.id} scheme={s} onView={onView} />
            ))}
          </div>
        </div>
      )}

      {!results && !loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.slice(0, 6).map((s) => (
            <SchemeCard key={s.id} scheme={s} onView={onView} />
          ))}
        </div>
      )}
    </div>
  )
}
