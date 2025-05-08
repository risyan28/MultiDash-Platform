"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MachineLineChartProps {
  machineId: number;
  viewMode: "daily" | "monthly";
  height?: number;
  metric?: "kWh" | "kW" | "voltage" | "pf" | "ampere";
  realtime?: boolean;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
  metric: "kWh" | "kW" | "voltage" | "pf" | "ampere";
}

interface DataPoint {
  time?: string;
  date?: string;
  timestamp?: number;
  value: number;
}

// Generate random data for each machine and metric
const generateDailyData = (
  machineId: number,
  metric: string,
  pointCount = 96,
) => {
  // Use machineId as seed for somewhat consistent random data
  const seed = machineId * 10;
  const baseValues: Record<string, number> = {
    kWh: 100 + seed,
    kW: 50 + seed / 2,
    voltage: 380 + (seed % 20),
    pf: 0.85 + (seed % 10) / 100,
    ampere: 60 + seed / 3,
  };

  const baseValue = baseValues[metric] ?? 100;
  const variance = baseValue * 0.3; // 30% variance
  const now = new Date();
  const data = [];

  // Generate data points for the last 24 hours (15-minute intervals = 96 points)
  for (let i = pointCount - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000);
    data.push({
      time: format(time, "HH:mm"),
      timestamp: time.getTime(),
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    });
  }

  return data;
};

const generateMonthlyData = (machineId: number, metric: string) => {
  // Use machineId as seed for somewhat consistent random data
  const seed = machineId * 100;
  const baseValues: Record<string, number> = {
    kWh: 2500 + seed,
    kW: 120 + seed / 10,
    voltage: 380 + (seed % 20),
    pf: 0.85 + (seed % 10) / 100,
    ampere: 70 + seed / 5,
  };

  const baseValue = baseValues[metric] ?? 2500;
  const variance = baseValue * 0.2; // 20% variance

  return [
    {
      date: "Jan",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Feb",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Mar",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Apr",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "May",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Jun",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Jul",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Aug",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Sep",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Oct",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Nov",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
    {
      date: "Dec",
      value: baseValue + Math.floor(Math.random() * variance - variance / 2),
    },
  ];
};

// Cache data to avoid regenerating on every render
const machineDataCache = new Map<string, DataPoint[]>();

// Custom tooltip component to match the design
const CustomTooltip = ({ active, payload, label, metric }: TooltipProps) => {
  if (active && payload?.length && payload[0]) {
    const value = payload[0].value;
    const formattedValue =
      metric === "pf" ? value.toFixed(2) : Math.round(value);
    const unit = metric === "pf" ? "" : metric;

    return (
      <div className="rounded-md border border-gray-200 bg-white p-2 shadow-sm">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">
          {metric.toUpperCase()}{" "}
          <span className="text-blue-600">
            {formattedValue}
            {unit ? ` ${unit}` : ""}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function MachineLineChart({
  machineId,
  viewMode,
  height = 200,
  metric = "kWh",
  realtime = false,
}: MachineLineChartProps) {
  const cacheKey = `${machineId}-${viewMode}-${metric}`;
  const [data, setData] = useState<DataPoint[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Initialize data
  useEffect(() => {
    if (!machineDataCache.has(cacheKey)) {
      machineDataCache.set(
        cacheKey,
        viewMode === "daily"
          ? generateDailyData(machineId, metric)
          : generateMonthlyData(machineId, metric),
      );
    }

    setData(machineDataCache.get(cacheKey) ?? []);
  }, [machineId, viewMode, metric, cacheKey]);

  // Simulate real-time updates with continuous shifting
  useEffect(() => {
    if (!realtime || viewMode !== "daily") return;

    const interval = setInterval(
      () => {
        const now = new Date();
        const newTime = format(now, "HH:mm");

        setData((prevData) => {
          // Create a copy of the previous data
          const newData = [...prevData];

          // Get the last data point and create a new one with updated time and slightly varied value
          const lastPoint = newData[newData.length - 1];
          if (!lastPoint) return newData;

          const baseValue = lastPoint.value;
          const variance = metric === "pf" ? 0.02 : baseValue * 0.05;

          // Create new data point
          const newPoint = {
            time: newTime,
            timestamp: now.getTime(),
            value:
              metric === "pf"
                ? Math.min(
                    1,
                    Math.max(
                      0.8,
                      Number(baseValue) +
                        (Math.random() * variance - variance / 2),
                    ),
                  )
                : Math.max(
                    0,
                    baseValue + (Math.random() * variance - variance / 2),
                  ),
          };

          // Remove the oldest point and add the new one
          newData.shift();
          newData.push(newPoint);

          // Update the cache
          machineDataCache.set(cacheKey, newData);

          return newData;
        });

        setLastUpdated(now);
      },
      3000 + (machineId % 5) * 500,
    ); // Stagger updates to reduce simultaneous renders

    return () => clearInterval(interval);
  }, [realtime, machineId, metric, cacheKey, viewMode]);

  const dataKey = viewMode === "daily" ? "time" : "date";

  // Get color based on metric
  const getColor = () => {
    const metricColors: Record<string, string> = {
      kWh: "#3b82f6", // blue
      kW: "#10b981", // green
      voltage: "#8b5cf6", // purple
      pf: "#f59e0b", // amber
      ampere: "#06b6d4", // cyan
    };

    return metricColors[metric] ?? "#3b82f6"; // blue as default
  };

  const color = getColor();

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient
              id={`gradient-${machineId}-${metric}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={dataKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            dy={10}
            minTickGap={15}
          />
          <YAxis
            hide={true}
            domain={metric === "pf" ? [0.8, 1] : ["auto", "auto"]}
          />
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f3f4f6"
          />
          <Tooltip
            content={<CustomTooltip metric={metric} />}
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: "5 5" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={0.3}
            fill={color}
            activeDot={{ r: 6, fill: color, stroke: "white", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      {realtime && (
        <div className="mt-1 text-right text-xs text-muted-foreground">
          Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
