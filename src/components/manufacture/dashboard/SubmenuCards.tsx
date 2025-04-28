export function SubmenuCards() {
  return (
    <div className="container mx-auto mb-20 px-4 md:mb-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Maintenance Dashboard Card */}
        <div className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <h3 className="mb-2 text-xl font-semibold text-gray-800 md:text-2xl">
            🛠️ Maintenance Dashboard
          </h3>
          <p className="text-sm text-gray-600 md:text-base">
            Pantau dan kelola aktivitas maintenance secara real-time.
          </p>
        </div>

        {/* Inventory & Material Flow Card */}
        <div className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <h3 className="text-no mb-2 text-xl font-semibold text-gray-800 md:text-2xl">
            📦 Inventory & Material Flow
          </h3>
          <p className="text-sm text-gray-600 md:text-base">
            Lacak pergerakan material dan ketersediaan inventory secara efisien.
          </p>
        </div>
      </div>
    </div>
  );
}
