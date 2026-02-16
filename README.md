# Autonomous Logistics Dashboard (DHL Style)

A real-time fleet tracking dashboard built with Next.js, TypeScript, and Docker. This application visualizes 50+ vehicles on an interactive map using OpenStreetMap and displays live fleet efficiency metrics.

## Features
- **Real-Time Tracking:** Consumes a live data stream via Socket.io.
- **Fleet Metrics:** Calculates average fuel efficiency and active vehicle count.
- **Compliance:** Uses OpenStreetMap (Leaflet) with no paid API keys.
- **Performance:** Handles 50+ simultaneous markers efficiently.

## Tech Stack
- **Frontend:** Next.js, TypeScript, React-Leaflet, Tailwind CSS
- **Backend:** Node.js, Express, Socket.io (Mock Data Stream)
- **Containerization:** Docker

## Getting Started

### 1. Install Dependencies
```bash
npm install
