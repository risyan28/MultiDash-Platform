import type { Metadata } from "next";
import EnergyConsumptionDashboard from "~/components/energy/energy-consumption-dashboard";

export const metadata: Metadata = {
  title: "Energy Monitoring System | Consumption & Cost",
  description: "Monitor total energy consumption and associated costs",
};

export default function ConsumptionPage() {
  return <EnergyConsumptionDashboard />;
}
