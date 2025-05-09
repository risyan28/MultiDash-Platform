"use client";

import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import {
  Activity,
  Battery,
  Calendar,
  FileBarChart,
  Filter,
  Gauge,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Zap,
  ZapOff,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Switch } from "~/components/ui/switch";
import { Badge } from "~/components/ui/badge";
import MachineLineChart from "~/components/energy/machine-line-chart";

interface MachineMetrics {
  kWh: number;
  kW: number;
  voltage: number;
  pf: string;
  ampere: number;
}

interface Machine {
  id: number;
  name: string;
  location?: string;
  type?: string;
  status: string;
  selected: boolean;
  metrics: MachineMetrics;
}

// Generate sample machine data
const generateMachines = (count: number) => {
  const types = ["Production", "Assembly", "Packaging", "Testing", "Cooling"];
  const areas = ["Area A", "Area B", "Area C", "Area D"];

  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    return {
      id: i + 1,
      name: `${type} Machine ${i + 1}`,
      location: area,
      type: type,
      status: Math.random() > 0.1 ? "Operational" : "Maintenance",
      selected: true,
      metrics: {
        kWh: Math.floor(1000 + Math.random() * 2000),
        kW: Math.floor(100 + Math.random() * 200),
        voltage: Math.floor(380 + Math.random() * 20),
        pf: (0.85 + Math.random() * 0.1).toFixed(2),
        ampere: Math.floor(50 + Math.random() * 150),
      },
    };
  });
};

const machines = generateMachines(30);

// Metric options
const metricOptions = [
  { value: "kWh", label: "Energy (kWh)", icon: <Zap className="h-4 w-4" /> },
  { value: "kW", label: "Power (kW)", icon: <Activity className="h-4 w-4" /> },
  {
    value: "voltage",
    label: "Voltage (V)",
    icon: <ZapOff className="h-4 w-4" />,
  },
  { value: "pf", label: "Power Factor", icon: <Gauge className="h-4 w-4" /> },
  {
    value: "ampere",
    label: "Current (A)",
    icon: <Battery className="h-4 w-4" />,
  },
];

export default function MultiMachineDashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [viewMode, setViewMode] = useState<"daily" | "monthly">("daily");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selectedMachines, setSelectedMachines] = useState(machines);
  const [searchQuery, setSearchQuery] = useState("");
  const [gridSize, setGridSize] = useState<"2x2" | "3x3" | "4x4">("3x3");
  const [selectedMetric, setSelectedMetric] = useState<
    "kWh" | "kW" | "voltage" | "pf" | "ampere"
  >("kWh");
  const [isRealtime, setIsRealtime] = useState(true);
  const [machineMetrics, setMachineMetrics] = useState<
    Record<number, MachineMetrics>
  >({});

  // Initialize machine metrics
  useEffect(() => {
    const metrics: Record<number, MachineMetrics> = {};
    machines.forEach((machine) => {
      metrics[machine.id] = { ...machine.metrics };
    });
    setMachineMetrics(metrics);
  }, []);

  // Simulate real-time updates for machine metrics
  useEffect(() => {
    if (!isRealtime) return;

    const interval = setInterval(() => {
      setMachineMetrics((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          const machineId = Number.parseInt(id);
          const currentMetrics = updated[machineId];
          if (!currentMetrics) return updated;

          updated[machineId] = {
            kWh: Math.max(0, currentMetrics.kWh + (Math.random() * 20 - 5)),
            kW: Math.max(0, currentMetrics.kW + (Math.random() * 10 - 5)),
            voltage: Math.max(
              360,
              Math.min(420, currentMetrics.voltage + (Math.random() * 4 - 2)),
            ),
            pf: Math.max(
              0.8,
              Math.min(
                1,
                Number.parseFloat(currentMetrics.pf) +
                  (Math.random() * 0.02 - 0.01),
              ),
            ).toFixed(2),
            ampere: Math.max(
              0,
              currentMetrics.ampere + (Math.random() * 8 - 4),
            ),
          };
        });
        return updated;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isRealtime]);

  // Filter machines based on search query
  const filteredMachines = machines.filter(
    (machine) =>
      machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ??
      machine.location?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false ??
      machine.type?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false,
  );

  // Toggle machine selection
  const toggleMachine = (id: number) => {
    setSelectedMachines((prev) =>
      prev.map((machine) =>
        machine.id === id
          ? { ...machine, selected: !machine.selected }
          : machine,
      ),
    );
  };

  // Select all machines
  const selectAllMachines = () => {
    setSelectedMachines(
      machines.map((machine) => ({ ...machine, selected: true })),
    );
  };

  // Deselect all machines
  const deselectAllMachines = () => {
    setSelectedMachines(
      machines.map((machine) => ({ ...machine, selected: false })),
    );
  };

  // Get grid template columns based on grid size
  const getGridTemplateColumns = () => {
    if (layout !== "grid") return "";

    switch (gridSize) {
      case "2x2":
        return "md:grid-cols-2";
      case "3x3":
        return "md:grid-cols-2 lg:grid-cols-3";
      case "4x4":
        return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "md:grid-cols-2 lg:grid-cols-3";
    }
  };

  // Get metric display info
  const getMetricInfo = (metric: string) => {
    return (
      metricOptions.find((option) => option.value === metric) ??
      metricOptions[0]
    );
  };

  // Get metric value with appropriate formatting
  const getFormattedMetricValue = (
    machine: Machine,
    metric: keyof MachineMetrics,
  ) => {
    const value = machineMetrics[machine.id]?.[metric] ?? 0;
    if (metric === "pf") return value;
    return Math.round(Number(value));
  };

  // Get status color
  const getStatusColor = (status: string) => {
    return status === "Operational" ? "text-green-500" : "text-amber-500";
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Multi-Machine Monitoring
        </h2>
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

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="flex w-full overflow-x-auto">
          <TabsTrigger value="dashboard" className="min-w-[100px]">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="kWh" className="min-w-[100px]">
            Energy (kWh)
          </TabsTrigger>
          <TabsTrigger value="kW" className="min-w-[100px]">
            Power (kW)
          </TabsTrigger>
          <TabsTrigger value="voltage" className="min-w-[100px]">
            Voltage (V)
          </TabsTrigger>
          <TabsTrigger value="pf" className="min-w-[100px]">
            Power Factor
          </TabsTrigger>
          <TabsTrigger value="ampere" className="min-w-[100px]">
            Current (A)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-shrink-0 md:w-64">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Machines</CardTitle>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input
                      placeholder="Search machines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Filter Machines</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={selectAllMachines}>
                            Select All
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={deselectAllMachines}>
                            Deselect All
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>By Type</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Checkbox id="production" className="mr-2" />
                            <label htmlFor="production">Production</label>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Checkbox id="assembly" className="mr-2" />
                            <label htmlFor="assembly">Assembly</label>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Checkbox id="packaging" className="mr-2" />
                            <label htmlFor="packaging">Packaging</label>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>By Location</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Checkbox id="areaA" className="mr-2" />
                            <label htmlFor="areaA">Area A</label>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Checkbox id="areaB" className="mr-2" />
                            <label htmlFor="areaB">Area B</label>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Checkbox id="areaC" className="mr-2" />
                            <label htmlFor="areaC">Area C</label>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-1">
                      {filteredMachines.map((machine) => (
                        <div
                          key={machine.id}
                          className="flex items-center space-x-2 py-1"
                        >
                          <Checkbox
                            id={`machine-${machine.id}`}
                            checked={
                              selectedMachines.find((m) => m.id === machine.id)
                                ?.selected
                            }
                            onCheckedChange={() => toggleMachine(machine.id)}
                          />
                          <label
                            htmlFor={`machine-${machine.id}`}
                            className="flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="flex flex-col">
                              <span suppressHydrationWarning>
                                {machine.name}
                              </span>
                              <span
                                suppressHydrationWarning
                                className="text-xs text-muted-foreground"
                              >
                                {machine.location}
                              </span>
                            </div>
                            <span
                              suppressHydrationWarning
                              className={getStatusColor(machine.status)}
                            >
                              {machine.status}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            <div className="flex-1">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {getMetricInfo(selectedMetric)?.label ?? "Default Label"}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2 space-x-2">
                      <Select
                        value={selectedMetric}
                        onValueChange={(value) =>
                          setSelectedMetric(
                            value as "kWh" | "kW" | "voltage" | "pf" | "ampere",
                          )
                        }
                      >
                        <SelectTrigger className="h-8 w-[140px]">
                          <SelectValue placeholder="Select metric" />
                        </SelectTrigger>
                        <SelectContent>
                          {metricOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center">
                                {option.icon}
                                <span className="ml-2">{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant={layout === "grid" ? "default" : "outline"}
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setLayout("grid")}
                        >
                          <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={layout === "list" ? "default" : "outline"}
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setLayout("list")}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                      {layout === "grid" && (
                        <Select
                          value={gridSize}
                          onValueChange={(value) =>
                            setGridSize(value as "2x2" | "3x3" | "4x4")
                          }
                        >
                          <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder="Grid" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2x2">2×2</SelectItem>
                            <SelectItem value="3x3">3×3</SelectItem>
                            <SelectItem value="4x4">4×4</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Options
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Chart Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center justify-between">
                            <span>Auto-refresh</span>
                            <Switch
                              checked={isRealtime}
                              onCheckedChange={setIsRealtime}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {layout === "grid" ? (
                    <div
                      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${getGridTemplateColumns()}`}
                    >
                      {selectedMachines
                        .filter((machine) => machine.selected)
                        .map((machine) => (
                          <Card key={machine.id} className="overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">
                                  {machine.name}
                                </CardTitle>
                                <Badge variant="outline" className="ml-2">
                                  {getFormattedMetricValue(
                                    machine,
                                    selectedMetric as keyof MachineMetrics,
                                  )}
                                  {selectedMetric === "pf"
                                    ? ""
                                    : ` ${selectedMetric}`}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <MachineLineChart
                                machineId={machine.id}
                                viewMode={viewMode}
                                height={180}
                                metric={selectedMetric as keyof MachineMetrics}
                                realtime={isRealtime}
                              />
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedMachines
                        .filter((machine) => machine.selected)
                        .map((machine) => (
                          <div key={machine.id}>
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="font-medium">{machine.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {machine.location}
                                </span>
                                <Badge variant="outline">
                                  {getFormattedMetricValue(
                                    machine,
                                    selectedMetric as keyof MachineMetrics,
                                  )}
                                  {selectedMetric === "pf"
                                    ? ""
                                    : ` ${selectedMetric}`}
                                </Badge>
                              </div>
                            </div>
                            <MachineLineChart
                              machineId={machine.id}
                              viewMode={viewMode}
                              height={200}
                              metric={selectedMetric as keyof MachineMetrics}
                              realtime={isRealtime}
                            />
                            <Separator className="my-4" />
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Individual metric tabs */}
        {metricOptions.map((option) => (
          <TabsContent
            key={option.value}
            value={option.value}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {option.icon}
                  {option.label} Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${getGridTemplateColumns()}`}
                >
                  {selectedMachines
                    .filter((machine) => machine.selected)
                    .map((machine) => (
                      <Card key={machine.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                              {machine.name}
                            </CardTitle>
                            <Badge variant="outline" className="ml-2">
                              {getFormattedMetricValue(
                                machine,
                                option.value as keyof MachineMetrics,
                              )}
                              {option.value === "pf" ? "" : ` ${option.value}`}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <MachineLineChart
                            machineId={machine.id}
                            viewMode={viewMode}
                            height={180}
                            metric={option.value as keyof MachineMetrics}
                            realtime={isRealtime}
                          />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
