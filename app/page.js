'use client';

import React, { useState, useEffect } from 'react';
import { getZambianAgroData } from './actions';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const REGIONS = [
  { name: 'Mkushi Block', note: 'Commercial grain cultivation block' },
  { name: 'Choma Corridor', note: 'Maize & livestock production zone' },
  { name: 'Chipata District', note: 'Groundnuts & legumes crop focus' }
];

export default function AgroDashboard() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [telemetry, setTelemetry] = useState({ chartData: [], curM: 0, curE: 0 });

  useEffect(() => {
    setLoading(true);
    getZambianAgroData(selectedIdx).then(data => {
      if (data) setTelemetry(data);
      setLoading(false);
    });
  }, [selectedIdx]);

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8 font-sans text-slate-100 antialiased flex flex-col justify-center">
      <div className="max-w-5xl w-full mx-auto space-y-6 my-auto py-8">
        
        <header className="flex justify-between items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <span className="text-emerald-400 font-bold tracking-widest text-[10px] uppercase block mb-1">🌱 ZamSoil Planting Intelligence Network</span>
            <h1 className="text-2xl font-black tracking-tight">ZamSoil <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-light">Telemetry</span></h1>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-50/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">ONLINE</span>
        </header>

        <div className="relative overflow-hidden w-full h-64 md:h-72 rounded-2xl border border-slate-800 shadow-xl flex items-center p-8 bg-slate-200">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100 mix-blend-luminosity scale-100"
            style={{ 
              backgroundImage: `url('https://i.pinimg.com/1200x/f8/40/87/f84087424ffc2eb2efd09f755adbaa9a.jpg')` 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent"></div>
          
          <div className="relative z-10 space-y-3 max-w-xl">
            <span className="text-emerald-400 font-bold tracking-widest text-[10px] uppercase block">
              Mwanalume / Mwanakazi, Muli Bwanji 🌱
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
              Welcome to Your Farming Assistant
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Check your regional telemetry indices below before planting or sowing seeds to protect your investments and optimize crop survival.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Node Region</label>
              <div className="relative">
                <select 
                  className="w-full p-3 pr-10 border border-slate-800 rounded-xl bg-slate-950 text-slate-200 font-bold appearance-none outline-none focus:border-emerald-500 transition-colors cursor-pointer" 
                  value={selectedIdx} 
                  onChange={(e) => setSelectedIdx(Number(e.target.value))}
                >
                  {REGIONS.map((r, i) => <option key={r.name} value={i} className="bg-slate-950">{r.name}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg">{REGIONS[selectedIdx].note}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-xl border-t-emerald-500 border-t-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Moisture</span>
                <span className="text-2xl font-mono font-black text-white">{(telemetry.curM * 100).toFixed(1)}%</span>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-xl border-t-cyan-500 border-t-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Evaporate</span>
                <span className="text-2xl font-mono font-black text-white">{telemetry.curE.toFixed(2)}<span className="text-xs font-normal text-slate-400 ml-0.5">mm</span></span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-64 md:h-[268px] flex flex-col justify-between">
              {loading ? (
                <div className="text-center py-20 text-[10px] text-slate-500 uppercase tracking-widest font-bold animate-pulse">Syncing Vector Stream...</div>
              ) : (
                <>
                  <div className="w-full h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={telemetry.chartData} margin={{ left: -25, right: 5 }}>
                        <CartesianGrid stroke="#edeff2" opacity={0.3} vertical={false} />
                        <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#e2e6ed' }} tickLine={false} axisLine={{ stroke: '#334155' }} />
                        <YAxis tick={{ fontSize: 9, fill: '#c7e5d6' }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: 'black' }} />
                        <Line type="monotone" dataKey="Soil Moisture" stroke="#10b981" strokeWidth={2.5} dot={false} />
                        <Line type="monotone" dataKey="Water Evaporation" stroke="#06b6d4" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-4 bg-slate-950 p-3 rounded-lg text-[10px] font-bold tracking-wide">
                    <span className="text-emerald-400">● Soil Moisture</span>
                    <span className="text-cyan-400">-- Evaporation Index</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
