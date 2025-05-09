"use client";

import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import { addDays, format, subDays } from "date-fns";
import { id } from "date-fns/locale";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  Battery,
  Bolt,
  CreditCard,
  DollarSign,
  Download,
  Factory,
  Gauge,
  History,
  RefreshCw,
  Settings,
  Zap,
} from "lucide-react";
import { type ValueType } from "recharts/types/component/DefaultTooltipContent";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import React from "react";

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

interface ForecastData {
  time: string;
  power: number;
  energy: number;
  cost: number;
}

interface TooltipFormatter {
  name: string;
  value: number;
}

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
  const [demandResponseStatus, setDemandResponseStatus] = useState("Normal");
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [todayEnergy, setTodayEnergy] = useState(9270); // kWh
  const [todayCost, setTodayCost] = useState(13905000); // Rp
  const [monthCost, setMonthCost] = useState(396751500); // Rp
  const [energyRate, setEnergyRate] = useState(1500); // Rp per kWh
  const [co2Emissions, setCo2Emissions] = useState(4.2); // tons
  const todayEnergyRef = React.useRef(0);
  const [energyEfficiency, setEnergyEfficiency] = useState({
    kwhPerUnit: 2.34, // kWh per unit produced
    peakDemand: 720, // kW
    loadFactor: 0.76, // ratio of average to peak demand
    powerFactor: 0.92, // power factor
    co2Emissions: 4.2, // tons
    thdi: 4.5, // Total Harmonic Distortion for current (%)
    voltageDeviation: 1.2, // Voltage deviation from nominal (%)
  });
  const [machineEfficiency, setMachineEfficiency] = useState({
    oee: 78.5, // Overall Equipment Effectiveness
    availability: 85.2,
    performance: 82.3,
    quality: 94.1,
    downtime: 124, // minutes
    productionRate: 92.7, // percent of target
    specificEnergy: 2.1, // kWh per unit produced
  });

  const machines = Array(30).fill(null); // Placeholder for machine count

  // Calculate values
  // const todayEnergy = 9270 // kWh
  // const todayCost = 13905000 // Rp
  // const monthCost = 396751500 // Rp

  // Calculate power factor alert
  const powerFactorAlert = energyEfficiency.powerFactor < 0.85;

  // Calculate peak demand alert
  const peakDemandAlert = currentPower > energyEfficiency.peakDemand * 0.9;

  const updateForecastData = () => {
    const data = [];
    const now = new Date();
    const baseLoad = currentPower;

    for (let i = 1; i <= 24; i++) {
      const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hourOfDay = hour.getHours();

      // Time-of-day pattern
      let timeOfDayFactor = 1;
      if (hourOfDay >= 8 && hourOfDay <= 17) {
        timeOfDayFactor = 1.5 + (hourOfDay - 8) * 0.1;
        if (hourOfDay > 13) {
          timeOfDayFactor = 1.5 + (17 - hourOfDay) * 0.1;
        }
      } else if (hourOfDay >= 18 && hourOfDay <= 22) {
        timeOfDayFactor = 1.2;
      } else {
        timeOfDayFactor = 0.7;
      }

      const forecastPower = Math.max(
        50,
        Math.round(baseLoad * timeOfDayFactor + (Math.random() * 80 - 40)),
      );
      const forecastEnergy = forecastPower; // kWh for 1 hour
      const forecastCost = forecastEnergy * energyRate;

      data.push({
        time: format(hour, "HH:mm"),
        power: forecastPower,
        energy: forecastEnergy,
        cost: forecastCost,
      });
    }

    setForecastData(data);
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealtime) return;

    // Initialize cumulative energy for the day if not set
    if (todayEnergyRef.current === 0) {
      todayEnergyRef.current = todayEnergy;
    }

    const interval = setInterval(() => {
      // Update current power with small random variations
      setCurrentPower((prev) => {
        const variation = Math.random() * 40 - 20; // -20 to +20
        const newPower = Math.max(50, Math.round(prev + variation));

        // Calculate energy consumed in this interval (kWh) - assuming 3 second interval = 1/1200 hour
        const energyInterval = newPower / 1200;

        // Update cumulative energy
        todayEnergyRef.current += energyInterval;

        // Update today's energy display
        setTodayEnergy(Math.round(todayEnergyRef.current));

        // Update costs
        const newTodayCost = Math.round(todayEnergyRef.current * energyRate);
        setTodayCost(newTodayCost);

        // Update monthly cost (add the incremental cost to the existing monthly cost)
        setMonthCost((prev) => prev + energyInterval * energyRate);

        // Update CO2 emissions (assuming 0.7 kg CO2 per kWh)
        setCo2Emissions((prev) => prev + (energyInterval * 0.7) / 1000);

        return newPower;
      });

      // Update time series data with continuous shifting - using the exact same current power value
      setTimeSeriesData((prev) => {
        const newData = [...prev];

        // Remove the oldest data point
        newData.shift();

        // Create a new data point with the current time and power
        const now = new Date();
        const newPoint = {
          time: format(now, "HH:mm"),
          timestamp: now.getTime(),
          power: currentPower, // Use the current power value for consistency
          min: Math.round(currentPower * 0.8),
          max: Math.round(currentPower * 1.2),
        };

        // Add the new point
        newData.push(newPoint);

        return newData;
      });

      // Update current demand
      setCurrentDemand((prev) => {
        const variation = Math.random() * 30 - 15; // -15 to +15
        return Math.max(50, Math.round(prev + variation));
      });

      // Update the last hourly data point
      setHourlyData((prev) => {
        const newData = [...prev];
        const lastItem = newData[newData.length - 1];

        // Only update the most recent hour
        if (
          lastItem &&
          new Date().getHours() === new Date(lastItem.timestamp).getHours()
        ) {
          lastItem.power = currentPower;
          lastItem.energy = Math.round(currentPower * 1); // kWh for 1 hour
          lastItem.cost = Math.round(lastItem.energy * energyRate);
        } else {
          // Add a new hour if we've moved to a new hour
          const newHour = new Date();
          newData.push({
            time: format(newHour, "HH:00"),
            timestamp: newHour.getTime(),
            power: currentPower,
            energy: Math.round(currentPower * 1),
            cost: Math.round(currentPower * 1 * energyRate),
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
          thdi: Math.max(
            2.0,
            Math.min(8.0, prev.thdi + (Math.random() * 0.5 - 0.25)),
          ),
          voltageDeviation: Math.max(
            -3.0,
            Math.min(3.0, prev.voltageDeviation + (Math.random() * 0.4 - 0.2)),
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
          specificEnergy: Math.max(
            1.5,
            Math.min(3.5, prev.specificEnergy + (Math.random() * 0.1 - 0.05)),
          ),
        };
      });

      // Update demand response status
      setDemandResponseStatus((prev) => {
        // 10% chance of changing status
        if (Math.random() < 0.1) {
          const statuses = ["Normal", "Advisory", "Warning", "Critical"];
          const currentIndex = statuses.indexOf(prev);
          let newIndex;

          // More likely to move toward normal than away from it
          if (currentIndex === 0) {
            newIndex = Math.random() < 0.8 ? 0 : 1;
          } else if (currentIndex === statuses.length - 1) {
            newIndex = Math.random() < 0.8 ? currentIndex - 1 : currentIndex;
          } else {
            newIndex = currentIndex + (Math.random() < 0.6 ? -1 : 1);
          }

          return statuses[newIndex] ?? prev;
        }
        return prev;
      });

      // Update forecast data occasionally
      if (Math.random() < 0.05) {
        updateForecastData();
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isRealtime, currentPower, energyRate]);

  // Initialize forecast data on component mount
  useEffect(() => {
    updateForecastData();
  }, []);

  // COLORS
  const COLORS = ["#4CAF50", "#2196F3", "#FFC107"];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  <h2 className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-3xl font-bold">
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
                    formatter={(value: ValueType, name: string) => {
                      if (name === "Power")
                        return [`${formatNumber(Number(value))} kW`, name];
                      if (name === "Energy")
                        return [`${formatNumber(Number(value))} kWh`, name];
                      return [formatRupiah(Number(value)), name];
                    }}
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
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

        {/* Power Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Power Quality & Grid Metrics</CardTitle>
            <CardDescription>
              Monitoring power quality parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">THDi</span>
                  <span
                    className={`text-sm font-medium ${energyEfficiency.thdi > 5 ? "text-amber-500" : "text-green-500"}`}
                  >
                    {energyEfficiency.thdi.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={Math.min(100, (energyEfficiency.thdi / 10) * 100)}
                  className={`h-2 ${energyEfficiency.thdi > 5 ? "bg-amber-100" : "bg-green-100"}`}
                />
                <p className="text-xs text-muted-foreground">
                  Total Harmonic Distortion (current)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Voltage</span>
                  <span
                    className={`text-sm font-medium ${Math.abs(energyEfficiency.voltageDeviation) > 2.5 ? "text-amber-500" : "text-green-500"}`}
                  >
                    {(
                      380 +
                      (380 * energyEfficiency.voltageDeviation) / 100
                    ).toFixed(1)}{" "}
                    V
                  </span>
                </div>
                <Progress
                  value={50 + energyEfficiency.voltageDeviation * 10}
                  className={`h-2 ${Math.abs(energyEfficiency.voltageDeviation) > 2.5 ? "bg-amber-100" : "bg-green-100"}`}
                />
                <p className="text-xs text-muted-foreground">
                  Deviation: {energyEfficiency.voltageDeviation > 0 ? "+" : ""}
                  {energyEfficiency.voltageDeviation.toFixed(1)}%
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Demand Response</span>
                  <span
                    className={`text-sm font-medium ${
                      demandResponseStatus === "Normal"
                        ? "text-green-500"
                        : demandResponseStatus === "Advisory"
                          ? "text-blue-500"
                          : demandResponseStatus === "Warning"
                            ? "text-amber-500"
                            : "text-red-500"
                    }`}
                  >
                    {demandResponseStatus}
                  </span>
                </div>
                <div className="flex h-2 space-x-1">
                  <div
                    className={`h-2 w-1/4 rounded-l-sm ${demandResponseStatus === "Normal" ? "bg-green-500" : "bg-green-200"}`}
                  ></div>
                  <div
                    className={`h-2 w-1/4 ${demandResponseStatus === "Advisory" ? "bg-blue-500" : "bg-blue-200"}`}
                  ></div>
                  <div
                    className={`h-2 w-1/4 ${demandResponseStatus === "Warning" ? "bg-amber-500" : "bg-amber-200"}`}
                  ></div>
                  <div
                    className={`h-2 w-1/4 rounded-r-sm ${demandResponseStatus === "Critical" ? "bg-red-500" : "bg-red-200"}`}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Grid demand response status
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">CO₂ Emissions</span>
                  <span className="text-sm font-medium">
                    {co2Emissions.toFixed(2)} tons
                  </span>
                </div>
                <Progress
                  value={Math.min(100, (co2Emissions / 10) * 100)}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Daily carbon footprint
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Forecast</CardTitle>
            <CardDescription>
              Predicted consumption for the next 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={forecastData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorForecast"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#8884d8"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, "dataMax + 100"]} />
                  <Tooltip
                    formatter={(value: ValueType, name: string) => {
                      if (name === "Power")
                        return [`${formatNumber(Number(value))} kW`, name];
                      if (name === "Energy")
                        return [`${formatNumber(Number(value))} kWh`, name];
                      return [formatRupiah(Number(value)), name];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="power"
                    name="Power"
                    stroke="#8884d8"
                    fillOpacity={0.3}
                    fill="url(#colorForecast)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium">Predicted Peak</p>
                <p className="text-lg font-bold">
                  {Math.max(...forecastData.map((d) => d.power))} kW
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">24h Energy</p>
                <p className="text-lg font-bold">
                  {formatNumber(
                    forecastData.reduce((sum, d) => sum + d.energy, 0),
                  )}{" "}
                  kWh
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">24h Cost</p>
                <p className="text-lg font-bold">
                  {formatRupiah(
                    forecastData.reduce((sum, d) => sum + d.cost, 0),
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Benchmarking */}
        <Card>
          <CardHeader>
            <CardTitle>Industry Benchmarking</CardTitle>
            <CardDescription>
              Comparing your energy metrics with industry standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 overflow-x-auto">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">Energy Intensity</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium">
                      {machineEfficiency.specificEnergy.toFixed(2)} kWh/unit
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      -12% vs Industry
                    </Badge>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center">
                      <div className="h-4 w-1 bg-gray-300"></div>
                      <div className="ml-1 text-xs">Industry Avg: 2.4</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">Power Factor</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium">
                      {(energyEfficiency.powerFactor * 100).toFixed(1)}%
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        powerFactorAlert
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {powerFactorAlert ? "-5% vs Target" : "+2% vs Industry"}
                    </Badge>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-gray-200">
                        <div
                          className={`h-2 ${powerFactorAlert ? "bg-red-500" : "bg-green-500"} rounded-full`}
                          style={{
                            width: `${energyEfficiency.powerFactor * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center">
                      <div className="h-4 w-1 bg-gray-300"></div>
                      <div className="ml-1 text-xs">Industry Avg: 90%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">OEE</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium">
                      {machineEfficiency.oee.toFixed(1)}%
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        machineEfficiency.oee < 80
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {machineEfficiency.oee < 80
                        ? "-7% vs Target"
                        : "+3% vs Industry"}
                    </Badge>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-gray-200">
                        <div
                          className={`h-2 ${machineEfficiency.oee < 80 ? "bg-amber-500" : "bg-green-500"} rounded-full`}
                          style={{ width: `${machineEfficiency.oee}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center">
                      <div className="h-4 w-1 bg-gray-300"></div>
                      <div className="ml-1 text-xs">Industry Avg: 75%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
