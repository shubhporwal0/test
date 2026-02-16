import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  status: string;
}

interface MapProps {
  vehicles: Vehicle[];
}

const MapComponent = ({ vehicles }: MapProps) => {
  const center = { lat: 52.52, lng: 13.405 }; // Berlin

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {vehicles.map((vehicle) => (
        <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]}>
          <Popup>
            <strong>{vehicle.id}</strong><br />
            Status: {vehicle.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
