"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Calendar,
  FileBarChart,
  DollarSign,
  Zap,
  Clock,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  AlertTriangle,
  Droplets,
  Waves,
  Leaf,
  Battery,
  Download,
  Settings,
  FileText,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";

// Generate sample machine data
const generateMachines = (count: number) => {
  const types = ["Production", "Assembly", "Packaging", "Testing", "Cooling"];
  const areas = ["Area A", "Area B", "Area C", "Area D"];

  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const dailyConsumption = 100 + Math.floor(Math.random() * 900);
    const monthlyConsumption =
      dailyConsumption * 30 + Math.floor(Math.random() * 5000);

    return {
      id: i + 1,
      name: `${type} Machine ${i + 1}`,
      location: area,
      type: type,
      dailyConsumption,
      monthlyConsumption,
      dailyCost: dailyConsumption * 1500, // Rp 1,500 per kWh
      monthlyCost: monthlyConsumption * 1500,
      efficiency: 70 + Math.floor(Math.random() * 25), // 70-95%
      co2Emissions: (monthlyConsumption * 0.7) / 1000, // 0.7 kg CO2 per kWh, converted to tons
      runningHours: 400 + Math.floor(Math.random() * 300), // monthly running hours
    };
  });
};

const machines = generateMachines(20);

// Generate monthly history data for a machine
const generateMonthlyHistory = (machineId: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const baseConsumption = 2500 + machineId * 100;

  return months.map((month) => {
    const consumption =
      baseConsumption + Math.floor(Math.random() * 1000 - 500);
    return {
      month,
      consumption,
      cost: consumption * 1500, // Rp 1,500 per kWh
    };
  });
};

// Generate yearly comparison data
const generateYearlyComparison = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();

  return months.map((month) => {
    const baseConsumption = 75000 + Math.floor(Math.random() * 20000);
    const prevYearConsumption = baseConsumption * (0.8 + Math.random() * 0.4); // 80-120% of base
    return {
      month,
      [currentYear]: baseConsumption,
      [currentYear - 1]: prevYearConsumption,
      change:
        ((baseConsumption - prevYearConsumption) / prevYearConsumption) * 100,
    };
  });
};

// Generate hourly data for a typical day
const generateHourlyData = () => {
  const data = [];

  for (let hour = 0; hour < 24; hour++) {
    // Create pattern with peak during work hours
    let baseFactor = 1;
    if (hour >= 8 && hour <= 17) {
      baseFactor = 1.5 + (hour - 8) * 0.1;
      if (hour > 13) {
        baseFactor = 1.5 + (17 - hour) * 0.1;
      }
    } else if (hour >= 18 && hour <= 22) {
      baseFactor = 1.2;
    } else {
      baseFactor = 0.7;
    }

    const consumption = Math.round(350 * baseFactor + Math.random() * 50 - 25);
    const demand = Math.round(consumption * (0.9 + Math.random() * 0.2));

    data.push({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      consumption,
      demand,
      cost: consumption * 1500,
    });
  }

  return data;
};

// Generate peak demand data for the month
const generatePeakDemand = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const data = [];

  let previousPeak = 500 + Math.random() * 200;

  for (const day of days) {
    // Create a general upward or downward trend with some randomness
    previousPeak = previousPeak + (Math.random() * 40 - 20);
    const peak = Math.max(300, Math.round(previousPeak));
    const average = Math.round(peak * (0.6 + Math.random() * 0.1));

    data.push({
      day,
      peak,
      average,
      ratio: +(peak / average).toFixed(2),
    });
  }

  return data;
};

// Generate energy source breakdown
const generateEnergySourceBreakdown = () => {
  return [
    { name: "Grid Power", value: 82, color: "#4CAF50" },
    { name: "Solar", value: 12, color: "#FFC107" },
    { name: "Generator", value: 6, color: "#F44336" },
  ];
};

// Generate carbon intensity data
const generateCarbonIntensity = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug, Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month) => {
    const value = 400 + Math.floor(Math.random() * 100 - 50);
    const target = 400;

    return {
      month,
      value, // g CO2 per kWh
      target,
    };
  });
};

// Generate water and waste data
const generateResourceUsage = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month) => {
    return {
      month,
      water: 3000 + Math.floor(Math.random() * 1000), // cubic meters
      waste: 150 + Math.floor(Math.random() * 50), // tons
      recycling: 80 + Math.floor(Math.random() * 40), // tons
    };
  });
};

// Generate energy intensity by product
const generateEnergyIntensity = () => {
  const products = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ];

  return products.map((product) => {
    const currentIntensity = 1 + Math.random() * 4;
    const previousIntensity = currentIntensity * (0.8 + Math.random() * 0.4);

    return {
      product,
      current: +currentIntensity.toFixed(2),
      previous: +previousIntensity.toFixed(2),
      change: +(
        ((currentIntensity - previousIntensity) / previousIntensity) *
        100
      ).toFixed(1),
    };
  });
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

export default function EnergyReports() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [viewMode, setViewMode] = useState<"daily" | "monthly">("monthly");
  const [selectedMachine, setSelectedMachine] = useState<string>("all");
  const [electricityRate, setElectricityRate] = useState<string>("1500");
  const [activeTab, setActiveTab] = useState<string>("consumption");

  // Sort machines by consumption (highest to lowest)
  const sortedMachines = [...machines].sort((a, b) =>
    viewMode === "daily"
      ? b.dailyConsumption - a.dailyConsumption
      : b.monthlyConsumption - a.monthlyConsumption,
  );

  // Prepare data for horizontal bar chart
  const consumptionData = sortedMachines.slice(0, 10).map((machine) => ({
    name: machine.name,
    consumption:
      viewMode === "daily"
        ? machine.dailyConsumption
        : machine.monthlyConsumption,
    cost: viewMode === "daily" ? machine.dailyCost : machine.monthlyCost,
  }));

  // Get history data for selected machine
  const getHistoryData = () => {
    if (selectedMachine === "all") {
      return generateMonthlyHistory(1); // Just show a sample if "all" is selected
    }
    const machineId = Number.parseInt(selectedMachine, 10);
    return generateMonthlyHistory(machineId);
  };

  const historyData = getHistoryData();
  const yearlyComparisonData = generateYearlyComparison();
  const hourlyData = generateHourlyData();
  const peakDemandData = generatePeakDemand();
  const energySourceData = generateEnergySourceBreakdown();
  const carbonIntensityData = generateCarbonIntensity();
  const resourceUsageData = generateResourceUsage();
  const energyIntensityData = generateEnergyIntensity();

  // Calculate totals
  const totalConsumption = machines.reduce(
    (sum, machine) =>
      sum +
      (viewMode === "daily"
        ? machine.dailyConsumption
        : machine.monthlyConsumption),
    0,
  );

  const totalCost = machines.reduce(
    (sum, machine) =>
      sum + (viewMode === "daily" ? machine.dailyCost : machine.monthlyCost),
    0,
  );

  // Calculate peak demand and average
  const peakDemandAvg = Math.round(
    peakDemandData.reduce((sum, item) => sum + item.peak, 0) /
      peakDemandData.length,
  );
  const avgDemandAvg = Math.round(
    peakDemandData.reduce((sum, item) => sum + item.average, 0) /
      peakDemandData.length,
  );
  const peakDemandRatio = +(peakDemandAvg / avgDemandAvg).toFixed(2);

  // Calculate carbon metrics
  const totalCo2Emissions = machines.reduce(
    (sum, machine) => sum + machine.co2Emissions,
    0,
  );
  const avgCarbonIntensity = Math.round(
    carbonIntensityData.reduce((sum, item) => sum + item.value, 0) /
      carbonIntensityData.length,
  );

  // Calculate water and waste totals
  const totalWater = resourceUsageData.reduce(
    (sum, item) => sum + item.water,
    0,
  );
  const totalWaste = resourceUsageData.reduce(
    (sum, item) => sum + item.waste,
    0,
  );
  const totalRecycling = resourceUsageData.reduce(
    (sum, item) => sum + item.recycling,
    0,
  );
  const recyclingRate = Math.round(
    (totalRecycling / (totalWaste + totalRecycling)) * 100,
  );

  // Colors for the bar chart
  const getBarColor = (index: number) => {
    const colors = [
      "#2563eb", // blue-600
      "#3b82f6", // blue-500
      "#60a5fa", // blue-400
      "#16a34a", // green-600
      "#22c55e", // green-500
      "#4ade80", // green-400
      "#9333ea", // purple-600
      "#a855f7", // purple-500
      "#c084fc", // purple-400
      "#ea580c", // orange-600
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Energy Reports</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "daily" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("daily")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Daily
            </Button>
            <Button
              variant={viewMode === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("monthly")}
            >
              <FileBarChart className="mr-2 h-4 w-4" />
              Monthly
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Consumption
              </CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" suppressHydrationWarning>
                {totalConsumption.toLocaleString("id-ID")} kWh
              </div>

              <p className="text-xs text-muted-foreground">
                {viewMode === "daily"
                  ? "Daily consumption"
                  : "Monthly consumption"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="truncate text-2xl font-bold">
                {formatRupiah(totalCost)}
              </div>
              <p className="text-xs text-muted-foreground">
                {viewMode === "daily" ? "Daily cost" : "Monthly cost"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Demand</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {peakDemandAvg.toLocaleString()} kW
              </div>
              <div className="mt-1 flex flex-wrap justify-between">
                <p className="text-xs text-muted-foreground">
                  Ratio: {peakDemandRatio}
                </p>
                <Badge
                  variant="outline"
                  className={
                    peakDemandRatio > 1.5
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {peakDemandRatio > 1.5 ? "Suboptimal" : "Good"}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                CO₂ Emissions
              </CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalCo2Emissions.toFixed(1)} tons
              </div>
              <p className="text-xs text-muted-foreground">
                Intensity: {avgCarbonIntensity} g/kWh
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue="consumption"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="flex w-full flex-nowrap overflow-x-auto">
            <TabsTrigger value="consumption" className="min-w-[100px] flex-1">
              Consumption
            </TabsTrigger>
            <TabsTrigger value="comparison" className="min-w-[100px] flex-1">
              Comparison
            </TabsTrigger>
            <TabsTrigger value="demand" className="min-w-[100px] flex-1">
              Demand
            </TabsTrigger>
            <TabsTrigger value="efficiency" className="min-w-[100px] flex-1">
              Efficiency
            </TabsTrigger>
            <TabsTrigger
              value="sustainability"
              className="min-w-[100px] flex-1"
            >
              Sustainability
            </TabsTrigger>
            <TabsTrigger value="details" className="min-w-[100px] flex-1">
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consumption" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Machine Energy Consumption Ranking</CardTitle>
                <CardDescription>
                  {viewMode === "daily" ? "Daily" : "Monthly"} energy
                  consumption by machine (Top 10)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={consumptionData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 100,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={100}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value: number, name) => [
                          `${value.toLocaleString()} kWh (${formatRupiah(value * Number(electricityRate))})`,
                          "Consumption",
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="consumption" name="Energy (kWh)">
                        {consumptionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={getBarColor(index)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Consumption Pattern</CardTitle>
                <CardDescription>
                  Typical 24-hour consumption pattern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={hourlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorConsumption"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorDemand"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#16a34a"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#16a34a"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        formatter={(value: number, name) => [
                          name === "Consumption"
                            ? `${value.toLocaleString()} kWh`
                            : `${value.toLocaleString()} kW`,
                          name,
                        ]}
                      />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="consumption"
                        name="Consumption"
                        stroke="#3b82f6"
                        fill="url(#colorConsumption)"
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="demand"
                        name="Demand"
                        stroke="#16a34a"
                        fill="url(#colorDemand)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">Peak Hour</p>
                    <p className="text-lg font-bold">14:00</p>
                    <p className="text-xs text-muted-foreground">
                      Highest energy usage
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Off-Peak Hours</p>
                    <p className="text-lg font-bold">22:00 - 06:00</p>
                    <p className="text-xs text-muted-foreground">
                      Lowest energy rates
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cost Saving Potential</p>
                    <p className="text-lg font-bold">Rp 12.5M</p>
                    <p className="text-xs text-muted-foreground">
                      By shifting 20% load to off-peak
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Year-over-Year Comparison</CardTitle>
                <CardDescription>
                  Monthly energy consumption comparison between{" "}
                  {new Date().getFullYear()} and {new Date().getFullYear() - 1}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={yearlyComparisonData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number, name) => [
                          `${value.toLocaleString()} kWh`,
                          name === "change" ? "% Change" : `Year ${name}`,
                        ]}
                      />
                      <Legend />
                      <Bar
                        dataKey={new Date().getFullYear().toString()}
                        name={`Year ${new Date().getFullYear()}`}
                        fill="#3b82f6"
                      />
                      <Bar
                        dataKey={(new Date().getFullYear() - 1).toString()}
                        name={`Year ${new Date().getFullYear() - 1}`}
                        fill="#93c5fd"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Annual Changes</h3>
                    <div className="space-y-4">
                      {yearlyComparisonData.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{item.month}</span>
                          <div className="flex items-center">
                            <span
                              className={`text-sm font-medium ${item.change > 0 ? "text-red-500" : "text-green-500"}`}
                            >
                              {item.change > 0 ? "+" : ""}
                              {item.change.toFixed(1)}%
                            </span>
                            {item.change > 0 ? (
                              <ArrowUpRight className="ml-1 h-4 w-4 text-red-500" />
                            ) : (
                              <ArrowDownRight className="ml-1 h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Key Contributing Factors
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Building2 className="mr-2 mt-1 h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          Production volume increased by 12%
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="mr-2 mt-1 h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          Extended operating hours in Q2
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="mr-2 mt-1 h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Energy efficiency improvements in Area B
                        </span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="mr-2 mt-1 h-4 w-4 text-amber-500" />
                        <span className="text-sm">
                          New equipment installation in Area C
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="mr-2 mt-1 h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          HVAC system optimization in March
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Recommendations
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Zap className="mr-2 mt-1 h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Apply Area B efficiency measures to Area A
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="mr-2 mt-1 h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          Review scheduling during peak demand periods
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Building2 className="mr-2 mt-1 h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          Investigate specific consumption in May peak
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="mr-2 mt-1 h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Document successful reduction strategies
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demand" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Peak Demand Analysis</CardTitle>
                <CardDescription>
                  Daily peak vs. average power demand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={peakDemandData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[1, 2.5]}
                      />
                      <Tooltip
                        formatter={(value: number, name) => [
                          name === "ratio"
                            ? value.toFixed(2)
                            : `${value.toLocaleString()} kW`,
                          name === "ratio"
                            ? "Peak/Avg Ratio"
                            : name === "peak"
                              ? "Peak Demand"
                              : "Average Demand",
                        ]}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="peak"
                        name="Peak Demand"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="average"
                        name="Average Demand"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="ratio"
                        name="Peak/Avg Ratio"
                        stroke="#f59e0b"
                        strokeDasharray="3 3"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Peak Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex justify-between">
                            <span className="text-sm font-medium">
                              Highest Peak
                            </span>
                            <span className="text-sm font-medium">
                              {Math.max(...peakDemandData.map((d) => d.peak))}{" "}
                              kW
                            </span>
                          </div>
                          <Progress value={100} className="h-2 bg-red-100">
                            <div className="h-full rounded-full bg-red-500" />
                          </Progress>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Day{" "}
                            {peakDemandData.findIndex(
                              (d) =>
                                d.peak ===
                                Math.max(...peakDemandData.map((d) => d.peak)),
                            ) + 1}
                          </p>
                        </div>

                        <div>
                          <div className="mb-1 flex justify-between">
                            <span className="text-sm font-medium">
                              Average Peak
                            </span>
                            <span className="text-sm font-medium">
                              {peakDemandAvg} kW
                            </span>
                          </div>
                          <Progress value={75} className="h-2 bg-orange-100">
                            <div className="h-full rounded-full bg-orange-500" />
                          </Progress>
                        </div>

                        <div>
                          <div className="mb-1 flex justify-between">
                            <span className="text-sm font-medium">
                              Load Factor
                            </span>
                            <span className="text-sm font-medium">
                              {((1 / peakDemandRatio) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress
                            value={(1 / peakDemandRatio) * 100}
                            className={`h-2 ${(1 / peakDemandRatio) * 100 > 70 ? "bg-green-100" : "bg-amber-100"}`}
                          >
                            <div
                              className={`h-full ${(1 / peakDemandRatio) * 100 > 70 ? "bg-green-500" : "bg-amber-500"} rounded-full`}
                            />
                          </Progress>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {(1 / peakDemandRatio) * 100 > 70
                              ? "Good"
                              : (1 / peakDemandRatio) * 100 > 60
                                ? "Fair"
                                : "Poor"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Cost Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Demand Charges</span>
                          <span className="text-sm font-medium">
                            {formatRupiah(peakDemandAvg * 100000)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">% of Total Bill</span>
                          <span className="text-sm font-medium">32%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Potential Savings</span>
                          <span className="text-sm font-medium text-green-600">
                            {formatRupiah(peakDemandAvg * 100000 * 0.2)}
                          </span>
                        </div>
                        <Separator />
                        <div className="pt-2">
                          <p className="text-sm">
                            Reducing peak demand by just 20% would save
                            approximately
                            <span className="font-medium">
                              {" "}
                              {formatRupiah(peakDemandAvg * 100000 * 0.2)}
                            </span>{" "}
                            monthly.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <Clock className="mr-2 mt-0.5 h-4 w-4 text-blue-500" />
                          <span>Stagger startup times for heavy equipment</span>
                        </li>
                        <li className="flex items-start">
                          <FileBarChart className="mr-2 mt-0.5 h-4 w-4 text-blue-500" />
                          <span>
                            Implement automated load shedding during peak
                            periods
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Battery className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                          <span>
                            Evaluate battery storage to smooth peak demand
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Zap className="mr-2 mt-0.5 h-4 w-4 text-amber-500" />
                          <span>
                            Schedule energy-intensive processes during off-peak
                            hours
                          </span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 text-red-500" />
                          <span>
                            Set up alerts for approaching peak thresholds
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Energy Intensity by Product</CardTitle>
                <CardDescription>
                  Energy consumption per unit produced (kWh/unit)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={energyIntensityData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="product" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [
                          `${value.toFixed(2)} kWh/unit`,
                          "Energy Intensity",
                        ]}
                      />
                      <Legend />
                      <Bar
                        dataKey="current"
                        name="Current Period"
                        fill="#3b82f6"
                      />
                      <Bar
                        dataKey="previous"
                        name="Previous Period"
                        fill="#93c5fd"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4">
                  <h3 className="mb-3 text-lg font-medium">
                    Product Efficiency Comparison
                  </h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Current (kWh/unit)</TableHead>
                          <TableHead>Previous (kWh/unit)</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {energyIntensityData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.product}
                            </TableCell>
                            <TableCell>{item.current.toFixed(2)}</TableCell>
                            <TableCell>{item.previous.toFixed(2)}</TableCell>
                            <TableCell
                              className={`text-right ${item.change > 0 ? "text-red-500" : "text-green-500"}`}
                            >
                              {item.change > 0 ? "+" : ""}
                              {item.change}%
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant="outline"
                                className={
                                  item.change < -5
                                    ? "bg-green-100 text-green-800"
                                    : item.change > 5
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {item.change < -5
                                  ? "Improved"
                                  : item.change > 5
                                    ? "Declined"
                                    : "Stable"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Machine Efficiency Ranking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {machines
                          .slice(0, 5)
                          .sort((a, b) => b.efficiency - a.efficiency)
                          .map((machine, index) => (
                            <div key={index}>
                              <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">
                                  {machine.name}
                                </span>
                                <span className="text-sm font-medium">
                                  {machine.efficiency}%
                                </span>
                              </div>
                              <Progress
                                value={machine.efficiency}
                                className={`h-2 ${machine.efficiency > 85 ? "bg-green-100" : machine.efficiency > 75 ? "bg-amber-100" : "bg-red-100"}`}
                              >
                                <div
                                  className={`h-full ${machine.efficiency > 85 ? "bg-green-500" : machine.efficiency > 75 ? "bg-amber-500" : "bg-red-500"} rounded-full`}
                                />
                              </Progress>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {machine.location}
                              </p>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Efficiency Improvement Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="mr-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Zap className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Variable Speed Drives for Pumps
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Potential savings of 15-25% on motor energy use
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="mr-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Compressed Air System Audit
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                              10-30% reduction in compressed air costs possible
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="mr-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            <Settings className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Process Optimization for Product C
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Reduce energy intensity by up to 20%
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="mr-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Automated Energy Management System
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                              5-15% overall energy reduction through monitoring
                              and control
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Carbon Intensity</CardTitle>
                  <CardDescription>
                    Monthly CO₂ emissions per kWh (g CO₂/kWh)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={carbonIntensityData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[300, 500]} />
                        <Tooltip
                          formatter={(value: number) => [
                            `${value} g CO₂/kWh`,
                            "Carbon Intensity",
                          ]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          name="Carbon Intensity"
                          stroke="#16a34a"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target"
                          stroke="#9ca3af"
                          strokeDasharray="5 5"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Energy Sources</CardTitle>
                  <CardDescription>Breakdown by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[350px] items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={energySourceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {energySourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number | string) => [
                            `${Number(value)}%`,
                            "Percentage",
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Renewable</span>
                      </div>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Fossil Fuels</span>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">2025 Target</span>
                      <span className="text-sm font-medium text-green-600">
                        30% Renewable
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Water & Waste Monitoring</CardTitle>
                <CardDescription>
                  Monthly tracking of water consumption and waste generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={resourceUsageData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        formatter={(value: number, name) => [
                          name === "water"
                            ? `${value.toLocaleString()} m³`
                            : `${value.toLocaleString()} tons`,
                          name === "water"
                            ? "Water Usage"
                            : name === "waste"
                              ? "Waste Generated"
                              : "Recycled Material",
                        ]}
                      />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="water"
                        name="Water Usage"
                        fill="#3b82f6"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="waste"
                        name="Waste Generated"
                        fill="#f59e0b"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="recycling"
                        name="Recycled Material"
                        fill="#16a34a"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Water Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Droplets className="mr-4 h-10 w-10 text-blue-500" />
                        <div>
                          <div className="text-2xl font-bold">
                            {(totalWater / 1000).toFixed(1)} ML
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Annual consumption
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Per Unit Production</span>
                          <span className="text-sm font-medium">
                            0.87 m³/unit
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">YoY Change</span>
                          <span className="text-sm font-medium text-green-600">
                            -5.3%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Industry Benchmark</span>
                          <span className="text-sm font-medium">
                            0.92 m³/unit
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Waste Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Waves className="mr-4 h-10 w-10 text-amber-500" />
                        <div>
                          <div className="text-2xl font-bold">
                            {(totalWaste + totalRecycling).toFixed(1)} tons
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Total waste generated
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Recycling Rate</span>
                          <span className="text-sm font-medium">
                            {recyclingRate}%
                          </span>
                        </div>
                        <Progress value={recyclingRate} className="h-2">
                          <div className="h-full rounded-full bg-green-500" />
                        </Progress>
                        <div className="mt-2 flex justify-between">
                          <span className="text-sm">Landfill Waste</span>
                          <span className="text-sm font-medium">
                            {totalWaste.toFixed(1)} tons
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">2025 Target</span>
                          <span className="text-sm font-medium text-green-600">
                            70% Recycling
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Sustainability Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium">
                            Carbon Neutrality
                          </span>
                          <span className="text-sm font-medium">2035</span>
                        </div>
                        <Progress value={15} className="h-2">
                          <div className="h-full rounded-full bg-green-500" />
                        </Progress>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current progress: 15%
                        </p>
                      </div>

                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium">
                            30% Renewable Energy
                          </span>
                          <span className="text-sm font-medium">2025</span>
                        </div>
                        <Progress value={40} className="h-2">
                          <div className="h-full rounded-full bg-green-500" />
                        </Progress>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current progress: 40%
                        </p>
                      </div>

                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium">
                            Zero Waste to Landfill
                          </span>
                          <span className="text-sm font-medium">2030</span>
                        </div>
                        <Progress value={32} className="h-2">
                          <div className="h-full rounded-full bg-green-500" />
                        </Progress>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current progress: 32%
                        </p>
                      </div>

                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium">
                            Water Reduction 25%
                          </span>
                          <span className="text-sm font-medium">2027</span>
                        </div>
                        <Progress value={42} className="h-2">
                          <div className="h-full rounded-full bg-green-500" />
                        </Progress>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current progress: 42%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Energy Consumption Report</CardTitle>
                <CardDescription>
                  {viewMode === "daily" ? "Daily" : "Monthly"} energy
                  consumption and cost by machine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between">
                  <div className="flex items-center space-x-4">
                    <Select
                      value={selectedMachine}
                      onValueChange={setSelectedMachine}
                    >
                      <SelectTrigger className="h-8 w-[200px]">
                        <SelectValue placeholder="Select machine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Machines</SelectItem>
                        {machines.map((machine) => (
                          <SelectItem
                            key={machine.id}
                            value={machine.id.toString()}
                          >
                            {machine.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      value={electricityRate}
                      onChange={(e) => setElectricityRate(e.target.value)}
                      className="h-8 w-24"
                      placeholder="Rate"
                    />
                    <span className="text-sm">Rp/kWh</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Machine</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">
                        Consumption (kWh)
                      </TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead className="text-right">Efficiency</TableHead>
                      <TableHead className="text-right">
                        Running Hours
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMachines.map((machine) => (
                      <TableRow key={machine.id}>
                        <TableCell className="font-medium">
                          {machine.name}
                        </TableCell>
                        <TableCell>{machine.location}</TableCell>
                        <TableCell>{machine.type}</TableCell>
                        <TableCell className="text-right">
                          {(viewMode === "daily"
                            ? machine.dailyConsumption
                            : machine.monthlyConsumption
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatRupiah(
                            viewMode === "daily"
                              ? machine.dailyCost
                              : machine.monthlyCost,
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              machine.efficiency > 85
                                ? "bg-green-100 text-green-800"
                                : machine.efficiency > 75
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {machine.efficiency}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {Math.round(
                            (machine.runningHours / 30) *
                              (viewMode === "daily" ? 1 : 30),
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Consumption Patterns</CardTitle>
                <CardDescription>
                  Analysis of consumption trends and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg font-medium">
                      Top Energy Consumers
                    </h3>
                    <div className="space-y-4">
                      {sortedMachines.slice(0, 5).map((machine, index) => (
                        <div key={index}>
                          <div className="mb-1 flex justify-between">
                            <span className="text-sm font-medium">
                              {machine.name}
                            </span>
                            <span className="text-sm font-medium">
                              {(viewMode === "daily"
                                ? machine.dailyConsumption
                                : machine.monthlyConsumption
                              ).toLocaleString()}{" "}
                              kWh
                            </span>
                          </div>
                          {sortedMachines[0] && (
                            <Progress
                              value={
                                viewMode === "daily"
                                  ? (machine.dailyConsumption /
                                      sortedMachines[0].dailyConsumption) *
                                    100
                                  : (machine.monthlyConsumption /
                                      sortedMachines[0].monthlyConsumption) *
                                    100
                              }
                              className="h-2"
                            />
                          )}
                          <div className="mt-1 flex justify-between">
                            <span className="text-xs text-muted-foreground">
                              {machine.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {viewMode === "daily"
                                ? (
                                    (machine.dailyConsumption /
                                      totalConsumption) *
                                    100
                                  ).toFixed(1)
                                : (
                                    (machine.monthlyConsumption /
                                      totalConsumption) *
                                    100
                                  ).toFixed(1)}
                              % of total
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">
                      Consumption by Area
                    </h3>
                    <div className="space-y-3">
                      {["Area A", "Area B", "Area C", "Area D"].map(
                        (area, index) => {
                          const areaMachines = machines.filter(
                            (m) => m.location === area,
                          );
                          const areaConsumption = areaMachines.reduce(
                            (sum, m) =>
                              sum +
                              (viewMode === "daily"
                                ? m.dailyConsumption
                                : m.monthlyConsumption),
                            0,
                          );
                          const areaPercentage =
                            (areaConsumption / totalConsumption) * 100;

                          return (
                            <div key={index}>
                              <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">
                                  {area}
                                </span>
                                <span className="text-sm font-medium">
                                  {areaConsumption.toLocaleString()} kWh
                                </span>
                              </div>
                              <Progress
                                value={areaPercentage}
                                className="h-2"
                              />
                              <div className="mt-1 flex justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {areaMachines.length} machines
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {areaPercentage.toFixed(1)}% of total
                                </span>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>

                    <div className="mt-6">
                      <h3 className="mb-3 text-lg font-medium">
                        Consumption by Type
                      </h3>
                      <div className="space-y-3">
                        {[
                          "Production",
                          "Assembly",
                          "Packaging",
                          "Testing",
                          "Cooling",
                        ].map((type, index) => {
                          const typeMachines = machines.filter(
                            (m) => m.type === type,
                          );
                          const typeConsumption = typeMachines.reduce(
                            (sum, m) =>
                              sum +
                              (viewMode === "daily"
                                ? m.dailyConsumption
                                : m.monthlyConsumption),
                            0,
                          );
                          const typePercentage =
                            (typeConsumption / totalConsumption) * 100;

                          return (
                            <div key={index}>
                              <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">
                                  {type}
                                </span>
                                <span className="text-sm font-medium">
                                  {typeConsumption.toLocaleString()} kWh
                                </span>
                              </div>
                              <Progress
                                value={typePercentage}
                                className="h-2"
                              />
                              <div className="mt-1 flex justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {typeMachines.length} machines
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {typePercentage.toFixed(1)}% of total
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
