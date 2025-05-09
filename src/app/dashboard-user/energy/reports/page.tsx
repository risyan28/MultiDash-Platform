import type { Metadata } from "next";
import EnergyReports from "~/components/energy/energy-reports";

export const metadata: Metadata = {
  title: "Energy Monitoring System | Reports",
  description: "Energy consumption reports and cost analysis",
};

export default function ReportsPage() {
  return <EnergyReports />;
}
