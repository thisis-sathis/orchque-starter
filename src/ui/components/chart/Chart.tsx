// Chart — data visualization wrapper. Supports line, bar, area, and pie chart types via recharts.
"use client";

import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/ui/lib/utils";

export type ChartType = "line" | "bar" | "area" | "pie";

export interface ChartDataPoint {
  label: string;
  [key: string]: string | number;
}

export interface ChartSeries {
  key: string;
  name: string;
  color?: string;
}

export interface ChartProps {
  type: ChartType;
  data: ChartDataPoint[];
  series: ChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
  "var(--color-success)",
  "var(--color-warning)",
];

export function Chart({
  type,
  data,
  series,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className,
}: ChartProps) {
  const colors = series.map((s, i) => s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]);

  const commonProps = {
    data,
    margin: { top: 8, right: 8, left: 0, bottom: 0 },
  };

  const sharedAxes = (
    <>
      <XAxis
        dataKey="label"
        tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
        axisLine={{ stroke: "var(--color-border)" }}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
        axisLine={false}
        tickLine={false}
        width={40}
      />
      {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />}
      {showTooltip && (
        <Tooltip
          contentStyle={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "12px",
            color: "var(--color-text)",
          }}
        />
      )}
      {showLegend && <Legend wrapperStyle={{ fontSize: "12px", color: "var(--color-text-muted)" }} />}
    </>
  );

  return (
    <div className={cn("oq-chart w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        {type === "line" ? (
          <LineChart {...commonProps}>
            {sharedAxes}
            {series.map((s, i) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={colors[i]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        ) : type === "bar" ? (
          <BarChart {...commonProps}>
            {sharedAxes}
            {series.map((s, i) => (
              <Bar key={s.key} dataKey={s.key} name={s.name} fill={colors[i]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        ) : type === "area" ? (
          <AreaChart {...commonProps}>
            {sharedAxes}
            {series.map((s, i) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={colors[i]}
                fill={colors[i]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        ) : (
          <PieChart>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "12px",
                }}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ fontSize: "12px", color: "var(--color-text-muted)" }} />}
            <Pie
              data={data.map((d) => ({ name: d.label, value: d[series[0]?.key ?? "value"] }))}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="70%"
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
