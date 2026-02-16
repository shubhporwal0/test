import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for demo purposes
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

// Helper to generate random coordinates near a center point (e.g., Berlin)
const BASE_LAT = 52.52;
const BASE_LNG = 13.405;

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  fuelEfficiency: number; // km/l
  status: "moving" | "idle" | "maintenance";
}

// Initialize 50 vehicles
let vehicles: Vehicle[] = Array.from({ length: 50 }, (_, i) => ({
  id: `DHL-${1000 + i}`,
  lat: BASE_LAT + (Math.random() - 0.5) * 0.1,
  lng: BASE_LNG + (Math.random() - 0.5) * 0.1,
  fuelEfficiency: 8 + Math.random() * 4,
  status: "moving",
}));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send initial data
  socket.emit("fleet-update", vehicles);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Simulate movement every 2 seconds
setInterval(() => {
  vehicles = vehicles.map((v) => ({
    ...v,
    lat: v.lat + (Math.random() - 0.5) * 0.002, // Small movement
    lng: v.lng + (Math.random() - 0.5) * 0.002,
    fuelEfficiency: v.status === "moving" ? 8 + Math.random() * 4 : 0,
  }));
  
  io.emit("fleet-update", vehicles);
}, 2000);

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
