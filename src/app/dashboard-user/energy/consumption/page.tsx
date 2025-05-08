import type { Metadata } from "next";
import MultiMachineDashboard from "~/components/energy/multi-machine-dashboard";

export const metadata: Metadata = {
  title: "Energy Monitoring System | Multi-Machine Dashboard",
  description: "Monitor multiple machines energy consumption in real-time",
};

export default function MultiMachinePage() {
  return <MultiMachineDashboard />;
}
