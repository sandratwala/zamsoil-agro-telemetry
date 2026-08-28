# ZamSoil Telemetry Network

ZamSoil is a Next.js agricultural dashboard engineered to provide telemetry data for smallholder and commercial farmers across Zambia. The platform serves as an early-warning diagnostic utility to analyze soil metrics and moisture trends before crop cultivation, directly reducing the investment risk of sowing seeds into dehydrated land profiles.

The application targets three distinct regional production nodes:
* **Mkushi Block**: Commercial grain cultivation block
* **Choma Corridor**: Maize and livestock production zone
* **Chipata District**: Groundnuts and legumes crop focus

## Features

* **Geographic Telemetry Nodes**: Point-specific coordinate routing for target Zambian agricultural zones.
* **Biometric Parameter Tracking**: Live monitoring of topsoil layer moisture content (0 to 7cm depth tracking profile) and regional surface evapotranspiration indices.
* **Aggregated Historical Timeline Charting**: Recharts-driven visual grid sub-sampling raw telemetry readings into historical 6-hour interval blocks across a 3-day projection window.
* **Environmental Isolation Architecture**: Core tracking URLs and endpoints isolated out of application logic into isolated configuration boundaries.

## Architecture and Stack

* **Framework**: Next.js (App Router layout ecosystem)
* **Client Interface Layer**: React with client-side state hooks management
* **Server Interactivity Layer**: Next.js Server Actions execution pipeline
* **Data Visualization API**: Recharts vector rendering component engine
* **Style Configurations**: Tailwind CSS utility framework layout

## Getting Started

### Prerequisites
* Node.js runtime environment (LTS version recommended)
* npm packager manager console binaries

### Installation
1. Clone the repository codebase down to your localized project root directory.
2. Initialize environment configuration protocols by creating a `.env` entry file in the root directory context:
   ```env
   NEXT_PUBLIC_OPEN_METEO_URL=https://open-meteo.com
   ```
3. Execute standard node package installation scripts to bind core dependencies:
   ```bash
   npm install
   ```
4. Initialize the developer runtime local instance compilation engine:
   ```bash
   npm run dev
   ```
5. Navigate your localized web browser profile engine directly to: `http://localhost:3000`

<img width="1495" height="980" alt="image" src="https://github.com/user-attachments/assets/cf2f74be-c174-4947-bea7-872078e48d31" />

