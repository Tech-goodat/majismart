# Majismart — Smart Water Monitoring Dashboard

Majismart is an IoT water-monitoring platform designed to help utilities and property managers monitor water consumption, detect abnormal usage, and gain actionable insights from connected water meters.

This repository contains the **Next.js frontend** for the Majismart platform.

The dashboard consumes telemetry from the Django backend and presents meter activity, consumption data, status information, and real-time updates through WebSockets.

## Features

* 📊 Real-time water meter telemetry
* 💧 Flow-rate and consumption monitoring
* 🚰 Individual meter monitoring
* 📡 Live WebSocket updates
* ⚠️ Infrastructure for anomaly and leak detection
* 📈 Consumption visualization
* 🔌 Integration with an MQTT-powered IoT backend
* 📱 Responsive dashboard interface
* 🔐 Authentication and protected application routes

## Architecture

```text
                    IoT Simulator
                         │
                         │ MQTT
                         ▼
                   HiveMQ Cloud
                         │
                         │ MQTT
                         ▼
                 Django REST Backend
                         │
              ┌──────────┴──────────┐
              │                     │
        PostgreSQL              Redis
              │                     │
              │                WebSockets
              │                     │
              └──────────┬──────────┘
                         ▼
                  Next.js Frontend
                         │
                         ▼
                    User Dashboard
```

The frontend does not communicate directly with the MQTT broker.

Instead, the Django backend acts as the application layer between the IoT infrastructure and the dashboard.

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **WebSockets**
* **REST API**
* **Vercel**

## Backend

The frontend communicates with a Django REST Framework backend responsible for:

* User authentication
* Meter management
* Telemetry storage
* MQTT ingestion
* Real-time WebSocket events
* PostgreSQL persistence

Backend repository:

`https://github.com/<your-username>/<your-backend-repository>`

## Getting Started

### Requirements

Make sure you have installed:

* Node.js
* npm

### Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, point the frontend to the deployed Django backend:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

Do not commit `.env.local` or other files containing secrets.

### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Real-Time Telemetry

Majismart uses WebSockets to stream telemetry updates from the Django backend to the dashboard.

The production connection follows this pattern:

```text
Vercel
  │
  │ WebSocket
  ▼
Django / Daphne
  │
  ▼
Redis / Channels
  │
  ▼
MQTT Telemetry
```

A meter dashboard can therefore receive new telemetry without requiring the user to manually refresh the page.

## Example Telemetry

The backend receives telemetry similar to:

```json
{
  "meter_id": "MTR-00001",
  "flow_rate": 2.31,
  "total_consumption": 3299.34,
  "status": "ONLINE",
  "timestamp": "2026-09-17T10:30:00+00:00"
}
```

The frontend transforms this data into dashboard views for monitoring water usage.

## Project Structure

```text
.
├── app/
│   ├── components/
│   ├── dashboard/
│   ├── login/
│   └── ...
├── public/
├── lib/
├── types/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

The exact structure may evolve as the application grows.

## Deployment

The frontend is deployed using **Vercel**.

Production environment variables should be configured through the Vercel project settings rather than committed to the repository.

## Project Goals

Majismart is being developed as an applied IoT and intelligent water-management platform.

The long-term system is intended to move beyond simply displaying telemetry and provide intelligence such as:

* Abnormal consumption detection
* Leak detection
* Usage-pattern analysis
* Consumption recommendations
* Automated alerts
* AI-assisted decision support

The goal is to turn raw meter telemetry into information that can help users understand **what is happening, why it may be happening, and what action should be taken.**

## Current Status

The current system demonstrates an end-to-end telemetry pipeline:

```text
Simulator
    ↓
MQTT
    ↓
HiveMQ Cloud
    ↓
Django
    ↓
PostgreSQL
    ↓
Redis / WebSockets
    ↓
Next.js Dashboard
```

The platform is currently being developed as a portfolio project with the architecture designed to evolve toward a production IoT monitoring system.

## Author

**Felix Kiprotich Cheruiyot**

Software Engineer focused on:

* Backend systems
* IoT applications
* Applied AI
* Data-driven applications
* Intelligent software systems
