import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { socket } from "../utils/socket";
import DashboardMetrics from "../components/DashboardMetrics";

// Dynamically import Map to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 animate-pulse rounded">Loading Map...</div>
});

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  fuelEfficiency: number;
  status: "moving" | "idle" | "maintenance";
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFleetUpdate(data: Vehicle[]) {
      setVehicles(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("fleet-update", onFleetUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("fleet-update", onFleetUpdate);
      socket.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Autonomous Logistics Dashboard</h1>
          <p className="text-gray-600">Real-time Fleet Tracking (DHL Style)</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isConnected ? "System Online" : "Disconnected"}
        </div>
      </header>

      <DashboardMetrics vehicles={vehicles} />

      <section className="bg-white p-4 rounded shadow h-[600px] border border-gray-200">
        <MapComponent vehicles={vehicles} />
      </section>
    </main>
  );
}
