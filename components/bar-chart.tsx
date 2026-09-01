"use client"

export function BarChart({
  data,
  height = 200,
  suffix = "",
}: {
  data: { label: string; value: number; value2?: number }[]
  height?: number
  suffix?: string
}) {
  const max = Math.max(...data.flatMap((d) => [d.value, d.value2 ?? 0])) || 1
  return (
    <div className="w-full">
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div className="flex w-full items-end justify-center gap-1" style={{ height: height - 24 }}>
              <div
                className="w-full max-w-8 rounded-t-md bg-primary transition-all"
                style={{ height: `${(d.value / max) * 100}%` }}
                title={`${d.value}${suffix}`}
              />
              {d.value2 != null && (
                <div
                  className="w-full max-w-8 rounded-t-md bg-success transition-all"
                  style={{ height: `${(d.value2 / max) * 100}%` }}
                  title={`${d.value2}${suffix}`}
                />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
