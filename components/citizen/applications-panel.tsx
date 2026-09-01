"use client"

import { applications, inr } from "@/lib/data"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"

export function ApplicationsPanel() {
  return (
    <Card className="p-0">
      <div className="border-b border-border p-5">
        <h3 className="font-semibold">My applications</h3>
        <p className="text-sm text-muted-foreground">Track every application you have submitted.</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Scheme</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.id}</TableCell>
                <TableCell>{a.schemeName}</TableCell>
                <TableCell className="text-muted-foreground">{a.partner}</TableCell>
                <TableCell className="text-muted-foreground">{a.date}</TableCell>
                <TableCell>{inr(a.amount)}</TableCell>
                <TableCell>
                  <StatusBadge status={a.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
