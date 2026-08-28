'use server';

const DISTRICTS = [
  { lat: -14.11, lon: 29.39, moisture: 0.34 },
  { lat: -16.81, lon: 26.98, moisture: 0.22 },
  { lat: -13.63, lon: 32.64, moisture: 0.29 }
];

export async function getZambianAgroData(index) {
  const target = DISTRICTS[index] || DISTRICTS[0];
   const BASE_URL = process.env.NEXT_PUBLIC_OPEN_METEO_URL;
  const URL = `${BASE_URL}?latitude=${target.lat}&longitude=${target.lon}&hourly=soil_moisture_0_to_7cm,et0_window_evapotranspiration&forecast_days=3`;

  try {
    const res = await fetch(URL, { next: { revalidate: 3600 } });
    const data = await res.json();
    const chartData = data.hourly.time.map((time, i) => ({
      time: new Date(time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      'Soil Moisture': data.hourly.soil_moisture_0_to_7cm[i],
      'Water Evaporation': data.hourly.et0_window_evapotranspiration[i]
    })).filter((_, i) => i % 6 === 0);

    return { chartData, curM: chartData[chartData.length - 1]['Soil Moisture'], curE: chartData[chartData.length - 1]['Water Evaporation'] };
  } catch {
    const mock = Array.from({ length: 12 }).map((_, i) => ({
      time: new Date(Date.now() - (11 - i) * 6 * 3600000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      'Soil Moisture': parseFloat((target.moisture + Math.sin(i) * 0.03).toFixed(3)),
      'Water Evaporation': parseFloat((0.14 + Math.cos(i) * 0.05).toFixed(2))
    }));
    return { chartData: mock, curM: mock[mock.length - 1]['Soil Moisture'], curE: mock[mock.length - 1]['Water Evaporation'] };
  }
}
