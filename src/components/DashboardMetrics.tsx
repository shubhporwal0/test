interface Vehicle {
  id: string;
  fuelEfficiency: number;
  status: string;
}

interface MetricsProps {
  vehicles: Vehicle[];
}

export default function DashboardMetrics({ vehicles }: MetricsProps) {
  const activeVehicles = vehicles.filter(v => v.status === "moving").length;
  
  const avgEfficiency = vehicles.length > 0
    ? (vehicles.reduce((acc, v) => acc + v.fuelEfficiency, 0) / vehicles.length).toFixed(1)
    : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-500">
        <h3 className="text-gray-500 text-sm">Total Fleet Size</h3>
        <p className="text-2xl font-bold">{vehicles.length}</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
        <h3 className="text-gray-500 text-sm">Active Vehicles</h3>
        <p className="text-2xl font-bold">{activeVehicles}</p>
      </div>

      <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
        <h3 className="text-gray-500 text-sm">Avg. Fuel Efficiency</h3>
        <p className="text-2xl font-bold">{avgEfficiency} km/l</p>
      </div>
    </div>
  );
}
