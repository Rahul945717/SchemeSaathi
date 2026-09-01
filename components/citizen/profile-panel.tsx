"use client"

import { CheckCircle2, FileText, Upload } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const docs = [
  { name: "Aadhaar Card", uploaded: true },
  { name: "PAN Card", uploaded: true },
  { name: "Income Certificate", uploaded: true },
  { name: "Caste Certificate", uploaded: false },
  { name: "Bank Passbook", uploaded: true },
  { name: "Project Report", uploaded: false },
]

export function ProfilePanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <Card className="p-6">
        <h3 className="font-semibold">Personal details</h3>
        <p className="text-sm text-muted-foreground">
          This information powers your eligibility and scheme matching.
        </p>
        <form
          className="mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            toast.success("Profile saved")
          }}
        >
          <Field label="Full name" defaultValue="Rahul Kumar" />
          <Field label="Age" defaultValue="29" type="number" />
          <Field label="Annual income (₹)" defaultValue="180000" type="number" />
          <Field label="Category" defaultValue="OBC" />
          <Field label="State" defaultValue="Madhya Pradesh" />
          <Field label="District" defaultValue="Bhopal" />
          <div className="sm:col-span-2">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold">My documents</h3>
        <p className="text-sm text-muted-foreground">Keep documents ready for faster applications.</p>
        <ul className="mt-4 space-y-2">
          {docs.map((d) => (
            <li key={d.name} className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="flex items-center gap-2 text-sm">
                <FileText className="size-4 text-muted-foreground" />
                {d.name}
              </span>
              {d.uploaded ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                  <CheckCircle2 className="size-4" /> Uploaded
                </span>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast("Upload dialog", { description: d.name })}
                >
                  <Upload className="size-3.5" /> Upload
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string
  defaultValue: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input defaultValue={defaultValue} type={type} />
    </div>
  )
}
