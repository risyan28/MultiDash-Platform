import Link from "next/link";

const menuItems = [
  { icon: "📦", label: "Production Plan" },
  { icon: "⚙️", label: "Actual Output" },
  { icon: "📈", label: "Efficiency Report" },
  { icon: "⏱️", label: "Downtime Log" },
  { icon: "❌", label: "Defect Rate" },
  { icon: "📊", label: "OEE Monitor" },
  { icon: "🔧", label: "Preventive Maintenance" },
  { icon: "📅", label: "Shift Schedule" },
  { icon: "📋", label: "Andon History" },
  { icon: "🧪", label: "Quality Check" },
  { icon: "📡", label: "Line Performance" },
  { icon: "🧾", label: "Work Order" },
  { icon: "👤", label: "My Profile" },
  { icon: "↩️", label: "Logout" },
];

export function QuickAccess() {
  return (
    <div className="container mx-auto mb-6 px-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Menu</h2>
      </div>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-7">
        {menuItems.map((item, index) => (
          <Link
            href="#"
            key={index}
            className="flex flex-col items-center rounded-lg bg-white p-3 shadow-sm hover:bg-gray-50"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <span>{item.icon}</span>
            </div>
            <span className="text-center text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
