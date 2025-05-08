"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { DateRange } from "react-day-picker";
import { addDays, format, subDays } from "date-fns";
import { id } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  ArrowUp,
  Battery,
  Bolt,
  CreditCard,
  DollarSign,
  Factory,
  Gauge,
  History,
  RefreshCw,
  BarChart3,
  Zap,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";

// Generate sample consumption data for line charts
const generateTimeSeriesData = (hours = 24, interval = 15) => {
  const now = new Date();
  const data = [];
  const totalPoints = (hours * 60) / interval;

  for (let i = totalPoints - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * interval * 60 * 1000);

    // Base load + random variation + time-of-day pattern
    const baseLoad = 350; // kW
    const randomVariation = Math.random() * 50 - 25; // -25 to +25

    // Time-of-day pattern: higher during work hours (8am-5pm)
    const hourOfDay = time.getHours();
    let timeOfDayFactor = 1;
    if (hourOfDay >= 8 && hourOfDay <= 17) {
      timeOfDayFactor = 1.5 + (hourOfDay - 8) * 0.1; // Peaks around noon-2pm
      if (hourOfDay > 13) {
        timeOfDayFactor = 1.5 + (17 - hourOfDay) * 0.1; // Decreases after 2pm
      }
    } else if (hourOfDay >= 18 && hourOfDay <= 22) {
      timeOfDayFactor = 1.2; // Evening shift
    } else {
      timeOfDayFactor = 0.7; // Night/early morning
    }

    const power = Math.max(
      50,
      Math.round(baseLoad * timeOfDayFactor + randomVariation),
    );

    data.push({
      time: format(time, "HH:mm"),
      timestamp: time.getTime(),
      power: power,
      min: Math.round(power * 0.8),
      max: Math.round(power * 1.2),
    });
  }

  return data;
};

// Generate hourly data
const generateHourlyData = () => {
  const now = new Date();
  const data = [];

  for (let i = 23; i >= 0; i--) {
    const hour = subDays(now, 0);
    hour.setHours(now.getHours() - i);

    // Base load + random variation + time-of-day pattern
    const baseLoad = 350; // kW
    const randomVariation = Math.random() * 100 - 50; // -50 to +50

    // Time-of-day pattern: higher during work hours (8am-5pm)
    const hourOfDay = hour.getHours();
    let timeOfDayFactor = 1;
    if (hourOfDay >= 8 && hourOfDay <= 17) {
      timeOfDayFactor = 1.5 + (hourOfDay - 8) * 0.1; // Peaks around noon-2pm
      if (hourOfDay > 13) {
        timeOfDayFactor = 1.5 + (17 - hourOfDay) * 0.1; // Decreases after 2pm
      }
    } else if (hourOfDay >= 18 && hourOfDay <= 22) {
      timeOfDayFactor = 1.2; // Evening shift
    } else {
      timeOfDayFactor = 0.7; // Night/early morning
    }

    const power = Math.max(
      50,
      Math.round(baseLoad * timeOfDayFactor + randomVariation),
    );
    const energy = power * 1; // kWh for 1 hour
    const cost = energy * 1500; // Rp 1,500 per kWh

    data.push({
      time: format(hour, "HH:mm"),
      timestamp: hour.getTime(),
      power: power,
      energy: energy,
      cost: cost,
    });
  }

  return data;
};

// Generate daily data
const generateDailyData = () => {
  const now = new Date();
  const data = [];

  for (let i = 29; i >= 0; i--) {
    const day = subDays(now, i);

    // Base load + random variation + day-of-week pattern
    const baseLoad = 7500; // kWh per day
    const randomVariation = Math.random() * 1500 - 750; // -750 to +750

    // Day-of-week pattern: lower on weekends
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const dayFactor = isWeekend ? 0.7 : 1.0 + (dayOfWeek - 1) * 0.05; // Peaks mid-week

    const energy = Math.max(
      1000,
      Math.round(baseLoad * dayFactor + randomVariation),
    );
    const cost = energy * 1500; // Rp 1,500 per kWh

    data.push({
      date: format(day, "dd MMM", { locale: id }),
      timestamp: day.getTime(),
      energy: energy,
      cost: cost,
    });
  }

  return data;
};

// Generate monthly data
const generateMonthlyData = () => {
  const data = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, i, 1);

    // Base load + seasonal pattern
    const baseLoad = 220000; // kWh per month
    const seasonalFactor = 1 + Math.sin((i / 12) * Math.PI * 2) * 0.2; // Seasonal variation
    const randomVariation = Math.random() * 20000 - 10000; // -10000 to +10000

    const energy = Math.max(
      100000,
      Math.round(baseLoad * seasonalFactor + randomVariation),
    );
    const cost = energy * 1500; // Rp 1,500 per kWh

    data.push({
      month: format(date, "MMM", { locale: id }),
      energy: energy,
      cost: cost,
    });
  }

  return data;
};

// Generate area breakdown data for pie chart
const generateAreaBreakdown = () => {
  return [
    { name: "Area Produksi", value: 46 },
    { name: "Area Pengemasan", value: 28 },
    { name: "Area Perakitan", value: 26 },
  ];
};

// Generate machine efficiency data
const generateMachineEfficiency = () => {
  return {
    oee: 78.5, // Overall Equipment Effectiveness
    availability: 85.2,
    performance: 82.3,
    quality: 94.1,
    downtime: 124, // minutes
    productionRate: 92.7, // percent of target
  };
};

// Generate energy efficiency data
const generateEnergyEfficiency = () => {
  return {
    kwhPerUnit: 2.34, // kWh per unit produced
    peakDemand: 720, // kW
    loadFactor: 0.76, // ratio of average to peak demand
    powerFactor: 0.92, // power factor
    co2Emissions: 4.2, // tons
  };
};

// Format currency in IDR
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with thousand separators
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

// Format percentage
const formatPercent = (num: number) => {
  return `${num.toFixed(1)}%`;
};

export default function EnergyConsumptionDashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [viewMode, setViewMode] = useState<"hourly" | "daily" | "monthly">(
    "daily",
  );
  const [isRealtime, setIsRealtime] = useState(true);
  const [timeSeriesData, setTimeSeriesData] = useState(
    generateTimeSeriesData(),
  );
  const [hourlyData, setHourlyData] = useState(generateHourlyData());
  const [dailyData, setDailyData] = useState(generateDailyData());
  const [monthlyData, setMonthlyData] = useState(generateMonthlyData());
  const [areaBreakdown, setAreaBreakdown] = useState(generateAreaBreakdown());
  const [currentPower, setCurrentPower] = useState(585);
  const [currentDemand, setCurrentDemand] = useState(622);
  const [selectedTab, setSelectedTab] = useState<"daily" | "monthly">("daily");
  const [machineEfficiency, setMachineEfficiency] = useState(
    generateMachineEfficiency(),
  );
  const [energyEfficiency, setEnergyEfficiency] = useState(
    generateEnergyEfficiency(),
  );

  const machines = Array(30).fill(null); // Placeholder for machine count

  // Calculate values
  const todayEnergy = 9270; // kWh
  const todayCost = 13905000; // Rp
  const monthCost = 396751500; // Rp

  // Calculate power factor alert
  const powerFactorAlert = energyEfficiency.powerFactor < 0.85;

  // Calculate peak demand alert
  const peakDemandAlert = currentPower > energyEfficiency.peakDemand * 0.9;

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealtime) return;

    const interval = setInterval(() => {
      // Update current power with small random variations
      setCurrentPower((prev) => {
        const variation = Math.random() * 40 - 20; // -20 to +20
        return Math.max(50, Math.round(prev + variation));
      });

      // Update current demand
      setCurrentDemand((prev) => {
        const variation = Math.random() * 30 - 15; // -15 to +15
        return Math.max(50, Math.round(prev + variation));
      });

      // Update time series data with continuous shifting
      setTimeSeriesData((prev) => {
        const newData = [...prev];

        // Remove the oldest data point
        newData.shift();

        // Get the last data point
        const lastPoint = newData[newData.length - 1];

        // Create a new data point with the current time
        const now = new Date();
        const newPoint = {
          time: format(now, "HH:mm"),
          timestamp: now.getTime(),
          power: Math.max(
            50,
            Math.round(lastPoint?.power ?? 350 + (Math.random() * 40 - 20)),
          ),
          min: 0,
          max: 0,
        };

        // Calculate min and max after setting the power
        newPoint.min = Math.round(newPoint.power * 0.8);
        newPoint.max = Math.round(newPoint.power * 1.2);

        // Add the new point
        newData.push(newPoint);

        return newData;
      });

      // Update the last hourly data point
      setHourlyData((prev) => {
        const newData = [...prev];
        const lastItem = newData[newData.length - 1];

        // Only update the most recent hour if lastItem exists
        if (
          lastItem &&
          new Date().getHours() === new Date(lastItem.timestamp).getHours()
        ) {
          lastItem.power = currentPower;
          lastItem.energy = Math.round(currentPower * 1); // kWh for 1 hour
          lastItem.cost = Math.round(lastItem.energy * 1500);
        } else {
          // Add a new hour if we've moved to a new hour
          const newHour = new Date();
          newData.push({
            time: format(newHour, "HH:00"),
            timestamp: newHour.getTime(),
            power: currentPower,
            energy: Math.round(currentPower * 1),
            cost: Math.round(currentPower * 1 * 1500),
          });

          // Remove oldest hour to keep 24 hours of data
          if (newData.length > 24) {
            newData.shift();
          }
        }

        return newData;
      });

      // Update energy efficiency with small variations
      setEnergyEfficiency((prev) => {
        return {
          ...prev,
          kwhPerUnit: Math.max(
            1.8,
            Math.min(3.0, prev.kwhPerUnit + (Math.random() * 0.1 - 0.05)),
          ),
          powerFactor: Math.max(
            0.8,
            Math.min(0.98, prev.powerFactor + (Math.random() * 0.02 - 0.01)),
          ),
          loadFactor: Math.max(
            0.6,
            Math.min(0.9, prev.loadFactor + (Math.random() * 0.02 - 0.01)),
          ),
        };
      });

      // Update machine efficiency with small variations
      setMachineEfficiency((prev) => {
        const newAvailability = Math.max(
          70,
          Math.min(95, prev.availability + (Math.random() * 1 - 0.5)),
        );
        const newPerformance = Math.max(
          70,
          Math.min(95, prev.performance + (Math.random() * 1 - 0.5)),
        );
        const newQuality = Math.max(
          85,
          Math.min(99, prev.quality + (Math.random() * 0.5 - 0.25)),
        );

        // OEE = Availability × Performance × Quality
        const newOEE = (newAvailability * newPerformance * newQuality) / 10000;

        return {
          ...prev,
          oee: newOEE,
          availability: newAvailability,
          performance: newPerformance,
          quality: newQuality,
          downtime: Math.max(0, prev.downtime + (Math.random() * 2 - 1)),
          productionRate: Math.max(
            70,
            Math.min(110, prev.productionRate + (Math.random() * 2 - 1)),
          ),
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isRealtime, currentPower]);

  // COLORS
  const COLORS = ["#4CAF50", "#2196F3", "#FFC107"];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center">
            <Factory className="mr-2 h-6 w-6" />
            <h2 className="text-lg font-semibold">Energy Monitoring System</h2>
          </div>

          {/* Navigasi di tengah */}
          <div className="mx-auto">
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/dashboard-user/energy"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </div>
              </Link>
              <Link
                href="/dashboard-user/energy/consumption"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  Consumption
                </div>
              </Link>
              <Link
                href="/dashboard-user/energy/reports"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  Reports
                </div>
              </Link>
            </nav>
          </div>

          {/* Tombol di sebelah kanan */}
          <div className="ml-auto">
            <Button
              variant={isRealtime ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealtime(!isRealtime)}
              className="flex items-center gap-1"
            >
              {isRealtime ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Live</span>
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4" />
                  <span>Start</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Daya Saat Ini
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    {formatNumber(currentPower)} kW
                  </h2>
                </div>
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Battery className="mr-1 h-3 w-3 text-blue-500" />
                  <span>
                    Beban:{" "}
                    {Math.round(
                      (currentPower / energyEfficiency.peakDemand) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className={
                      currentPower > currentDemand
                        ? "text-amber-500"
                        : "text-green-500"
                    }
                  >
                    {currentPower > currentDemand ? "↑" : "↓"}{" "}
                    {Math.abs(currentPower - currentDemand)} kW
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Energi Hari Ini
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    {formatNumber(todayEnergy)} kWh
                  </h2>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Activity className="mr-1 h-3 w-3 text-green-500" />
                      <span>
                        Mesin Aktif: {Math.round(machines.length * 0.85)}
                      </span>
                    </div>
                  </div>
                </div>
                <Zap className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Biaya Hari Ini
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    Rp {formatNumber(todayCost)}
                  </h2>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3 text-amber-500" />
                      <span>
                        Rp {formatNumber(Math.round(todayCost / todayEnergy))}{" "}
                        per kWh
                      </span>
                    </div>
                  </div>
                </div>
                <DollarSign className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Biaya Bulan Ini
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    Rp {formatNumber(monthCost)}
                  </h2>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <AlertTriangle
                        className={`mr-1 h-3 w-3 ${peakDemandAlert ? "text-red-500" : "text-green-500"}`}
                      />
                      <span
                        className={
                          peakDemandAlert ? "text-red-500" : "text-green-500"
                        }
                      >
                        {peakDemandAlert ? "Mendekati Puncak" : "Normal"}
                      </span>
                    </div>
                  </div>
                </div>
                <CreditCard className="h-6 w-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Power Chart */}
        <Card>
          <CardHeader>
            <CardTitle>kWh Meter (kW)</CardTitle>
            <CardDescription>Konsumsi daya listrik real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-[#f8f9fa]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeSeriesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, "dataMax + 100"]} />
                  <Tooltip
                    formatter={(value: number) => [
                      `${formatNumber(value)} kW`,
                      "Power",
                    ]}
                    cursor={{
                      stroke: "#666",
                      strokeWidth: 1,
                      strokeDasharray: "5 5",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="power"
                    name="Power"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={0.2}
                    fill="#3b82f6"
                    activeDot={{
                      r: 6,
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Energy Efficiency Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Power Factor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Gauge
                  className={`h-8 w-8 ${powerFactorAlert ? "text-red-500" : "text-green-500"}`}
                />
                <div className="mt-2 text-3xl font-bold">
                  {(energyEfficiency.powerFactor * 100).toFixed(1)}%
                </div>
                {powerFactorAlert ? (
                  <Badge variant="destructive" className="mt-2">
                    <AlertTriangle className="mr-1 h-3 w-3" /> Perlu Perbaikan
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="mt-2 bg-green-100 text-green-800"
                  >
                    Optimal
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Load Factor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Battery className="h-8 w-8 text-blue-500" />
                <div className="mt-2 text-3xl font-bold">
                  {(energyEfficiency.loadFactor * 100).toFixed(1)}%
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Peak: {formatNumber(energyEfficiency.peakDemand)} kW
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">OEE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Bolt className="h-8 w-8 text-amber-500" />
                <div className="mt-2 text-3xl font-bold">
                  {machineEfficiency.oee.toFixed(1)}%
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  A: {formatPercent(machineEfficiency.availability)} | P:{" "}
                  {formatPercent(machineEfficiency.performance)} | Q:{" "}
                  {formatPercent(machineEfficiency.quality)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Downtime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <History className="h-8 w-8 text-purple-500" />
                <div className="mt-2 text-3xl font-bold">
                  {Math.round(machineEfficiency.downtime)} min
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Production Rate: {machineEfficiency.productionRate.toFixed(1)}
                  %
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consumption & Cost + Area Distribution */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Konsumsi Energi & Biaya</CardTitle>
                  <CardDescription>
                    Konsumsi energi dan biaya per jam
                  </CardDescription>
                </div>
                <Tabs
                  value={selectedTab}
                  onValueChange={(value: string) =>
                    setSelectedTab(value as "daily" | "monthly")
                  }
                  className="w-auto"
                >
                  <TabsList className="grid w-[180px] grid-cols-2">
                    <TabsTrigger value="daily">Harian</TabsTrigger>
                    <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={selectedTab === "daily" ? hourlyData : monthlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey={selectedTab === "daily" ? "time" : "month"}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      stroke="#3b82f6"
                      tickFormatter={(value) => `${value}`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#10b981"
                      tickFormatter={(value) => `Rp${value / 1000000}k`}
                    />
                    <Tooltip
                      formatter={(value: number, name) => {
                        if (name === "Energi")
                          return [`${formatNumber(value)} kWh`, name];
                        return [formatRupiah(value), name];
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="energy"
                      name="Energi"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="cost"
                      name="Biaya"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribusi Area</CardTitle>
              <CardDescription>
                Persentase konsumsi energi per area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[350px] items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={areaBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {areaBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      isAnimationActive={true}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Energy Efficiency Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Analisis Efisiensi Energi</CardTitle>
            <CardDescription>
              Metrik kinerja energi dan rekomendasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-medium">Metrik Utama</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm font-medium">
                        Konsumsi Energi per Unit
                      </span>
                      <span className="text-sm font-medium">
                        {energyEfficiency.kwhPerUnit.toFixed(2)} kWh/unit
                      </span>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        (energyEfficiency.kwhPerUnit / 3) * 100,
                      )}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm font-medium">Power Factor</span>
                      <span className="text-sm font-medium">
                        {(energyEfficiency.powerFactor * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={energyEfficiency.powerFactor * 100}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm font-medium">Load Factor</span>
                      <span className="text-sm font-medium">
                        {(energyEfficiency.loadFactor * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={energyEfficiency.loadFactor * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Rekomendasi</h3>
                <ul className="space-y-2 text-sm">
                  {powerFactorAlert && (
                    <li className="flex items-start">
                      <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 text-red-500" />
                      <span>
                        Perbaiki power factor dengan menambahkan kapasitor bank
                      </span>
                    </li>
                  )}
                  {peakDemandAlert && (
                    <li className="flex items-start">
                      <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 text-amber-500" />
                      <span>
                        Kurangi beban puncak dengan menjadwalkan ulang operasi
                        mesin
                      </span>
                    </li>
                  )}
                  {energyEfficiency.kwhPerUnit > 2.5 && (
                    <li className="flex items-start">
                      <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 text-amber-500" />
                      <span>
                        Konsumsi energi per unit terlalu tinggi, periksa
                        efisiensi mesin
                      </span>
                    </li>
                  )}
                  {machineEfficiency.oee < 80 && (
                    <li className="flex items-start">
                      <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 text-amber-500" />
                      <span>
                        OEE di bawah target, periksa parameter availability,
                        performance, dan quality
                      </span>
                    </li>
                  )}
                  <li className="flex items-start">
                    <ArrowUp className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                    <span>
                      Potensi penghematan: Rp{" "}
                      {formatNumber(Math.round(monthCost * 0.15))} per bulan
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
