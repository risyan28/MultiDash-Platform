import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import type { FinancialItem } from "./types";
import { motion } from "framer-motion";

export function FinancialSummary() {
  const financialItems: FinancialItem[] = [
    {
      type: "income",
      amount: "Rp 5.250.000",
      period: "Bulan ini",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 text-green-600",
    },
    {
      type: "expense",
      amount: "Rp 3.750.000",
      period: "Bulan ini",
      icon: <TrendingDown className="h-5 w-5 text-red-600" />,
      color: "bg-red-100 text-red-600",
    },
    {
      type: "balance",
      amount: "Rp 8.500.000",
      period: "Saat ini",
      icon: <Wallet className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="mb-4 text-xl font-bold">Ringkasan Keuangan</h2>

      {/* Mobile: 2-row layout, Desktop: 1-row layout */}
      <div className="block md:hidden">
        {/* Mobile Layout */}
        <div className="grid gap-4">
          {/* First row: Pemasukan & Pengeluaran side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Pemasukan */}
            <Card className="border-none bg-gradient-to-br from-green-50 to-emerald-50 shadow-md">
              <CardContent className="p-4">
                <div className="mb-2 flex flex-col">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-xs font-medium">Pemasukan</span>
                </div>
                <p className="text-base font-bold text-green-600">
                  {financialItems[0]?.amount}
                </p>
                <p className="text-xs text-gray-500">
                  {financialItems[0]?.period}
                </p>
              </CardContent>
            </Card>

            {/* Pengeluaran */}
            <Card className="border-none bg-gradient-to-br from-red-50 to-rose-50 shadow-md">
              <CardContent className="p-4">
                <div className="mb-2 flex flex-col">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-xs font-medium">Pengeluaran</span>
                </div>
                <p className="text-base font-bold text-red-600">
                  {financialItems[1]?.amount}
                </p>
                <p className="text-xs text-gray-500">
                  {financialItems[1]?.period}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Second row: Saldo takes full width */}
          <Card className="border-none bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Saldo</span>
              </div>
              <p className="text-lg font-bold text-purple-600">
                {financialItems[2]?.amount}
              </p>
              <p className="text-xs text-gray-500">
                {financialItems[2]?.period}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Desktop Layout - Single row with 3 columns */}
      <div className="hidden cursor-pointer md:grid md:grid-cols-3 md:gap-4">
        {financialItems.map((item, index) => (
          <motion.div
            key={index}
            className="w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              key={index}
              className={`border-none shadow-md ${
                item.type === "income"
                  ? "bg-gradient-to-br from-green-50 to-emerald-50"
                  : item.type === "expense"
                    ? "bg-gradient-to-br from-red-50 to-rose-50"
                    : "bg-gradient-to-br from-purple-50 to-indigo-50"
              }`}
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      item.type === "income"
                        ? "bg-green-100"
                        : item.type === "expense"
                          ? "bg-red-100"
                          : "bg-purple-100"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">
                    {item.type === "income"
                      ? "Pemasukan"
                      : item.type === "expense"
                        ? "Pengeluaran"
                        : "Saldo"}
                  </span>
                </div>
                <p
                  className={`text-lg font-bold ${
                    item.type === "income"
                      ? "text-green-600"
                      : item.type === "expense"
                        ? "text-red-600"
                        : "text-purple-600"
                  }`}
                >
                  {item.amount}
                </p>
                <p className="text-xs text-gray-500">{item.period}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
