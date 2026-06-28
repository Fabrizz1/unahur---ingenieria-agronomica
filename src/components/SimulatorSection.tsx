import React, { useState, useEffect, useRef } from "react";
import {
  Sprout,
  Droplet,
  Layers,
  CornerDownRight,
  Search,
  Filter,
  Leaf,
  Beaker,
  DollarSign,
  Globe,
  Wheat,
  Flower2,
} from "lucide-react";
import { motion } from "motion/react";
import type { SoilTexture, Season, PestControl, IrrigationMethod, FertilizationType } from "../types";
import { CROP_DATA, SOIL_DATA, CROP_CATEGORIES, getCropById } from "../simulatorData";
import { runSimulation } from "../simulationEngine";
import { Reveal } from "./Reveal";

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    let start = prevRef.current;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 800;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{prefix}{display.toLocaleString("es-AR")}{suffix}</>;
}

interface SimulatorSectionProps {
  triggerNotification: (msg: string) => void;
}

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({
  triggerNotification,
}) => {
  const [cropFilter, setCropFilter] = useState("todos");
  const [config, setConfig] = useState({
    cropId: "maiz",
    soilId: "Franco" as SoilTexture,
    season: "Primavera-Verano" as Season,
    irrigationLevel: 50,
    irrigationMethod: "Goteo" as IrrigationMethod,
    fertilizerLevel: 40,
    fertilizationType: "Orgánico (Compost)" as FertilizationType,
    pestControl: "MIP Agroecológico" as PestControl,
    organicMatterPct: 2.5,
    soilPh: 6.5,
    useCoverCrop: true,
    useRotation: true,
    useCompostTea: false,
    usePolyculture: false,
  });

  const [result, setResult] = useState<ReturnType<typeof runSimulation> | null>(null);
  const [simulating, setSimulating] = useState(false);

  const selectedCrop = getCropById(config.cropId);
  const selectedSoil = SOIL_DATA[config.soilId];

  const filteredCrops = cropFilter === "todos"
    ? CROP_DATA
    : CROP_DATA.filter((c) => c.category === cropFilter);

  const handleRun = () => {
    setSimulating(true);
    setResult(null);
    setTimeout(() => {
      const res = runSimulation(config);
      setResult(res);
      setSimulating(false);
      triggerNotification("¡Simulación agroecológica completada!");
    }, 1200);
  };

  return (
    <div className="space-y-8" id="simulator-section">
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="space-y-2 border-b border-[var(--border-10)] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
            <Flower2 className="w-4 h-4" />
            <span>Laboratorio Virtual Agroecológico</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
            Simulador de Rendimiento Agroecológico
          </h2>
          <p className="text-xs text-[var(--text2)] font-sans max-w-2xl leading-relaxed">
            Modelo edafológico basado en FAO-56, balances de nutrientes y
            principios agroecológicos. 26 cultivos · 8 tipos de suelo · manejo
            orgánico, biológico, MIP y sintético.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ===== LEFT PANEL: INPUTS ===== */}
        <div className="md:col-span-5 space-y-5">
          <div className="bg-[var(--bg-white)] p-6 rounded-none border border-[var(--border-15)] space-y-5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text)] font-bold pb-2 border-b border-[var(--stone-border)] flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Parámetros del Ensayo
            </h3>

            {/* Crop Category Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-serif font-bold text-[var(--text)] block">Filtrar cultivos por categoría</label>
              <div className="flex flex-wrap gap-1">
                {CROP_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setCropFilter(cat.key)}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-tight border transition-all cursor-pointer ${
                      cropFilter === cat.key
                        ? "bg-[var(--footer)] text-white border-[var(--border)] font-bold"
                        : "bg-[var(--bg-white)] text-[var(--text2)] border-[var(--stone-border)] hover:bg-[var(--stone-bg)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Crop Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-serif font-bold text-[var(--text)] block flex items-center gap-1">
                <Wheat className="w-3.5 h-3.5" /> Cultivo
              </label>
              <select
                value={config.cropId}
                onChange={(e) => setConfig({ ...config, cropId: e.target.value })}
                className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg2)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
              >
                {filteredCrops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name} — {c.scientificName}
                  </option>
                ))}
              </select>
              {selectedCrop && (
                <div className="bg-[var(--stone-bg)] p-2 border border-[var(--stone-border)] text-[10px] text-[var(--text2)] leading-relaxed">
                  <span className="font-bold">{selectedCrop.family}</span> · {selectedCrop.habit} · {selectedCrop.category}
                  <br />Ciclo: {selectedCrop.seasonDays} días · GDD: {selectedCrop.gddRequirement}°C
                  {selectedCrop.nitrogenFixer && (
                    <span className="text-emerald-700 dark:text-emerald-400"> · Fija N₂</span>
                  )}
                </div>
              )}
            </div>

            {/* Soil Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-serif font-bold text-[var(--text)] block flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Tipo de Suelo
              </label>
              <select
                value={config.soilId}
                onChange={(e) => setConfig({ ...config, soilId: e.target.value as SoilTexture })}
                className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg2)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
              >
                {Object.values(SOIL_DATA).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — CC {s.fieldCapacity}% · PMP {s.wiltingPoint}% · CIC {s.cec} meq/100g
                  </option>
                ))}
              </select>
              {selectedSoil && (
                <div className="bg-[var(--stone-bg)] p-2 border border-[var(--stone-border)] text-[10px] text-[var(--text2)] leading-relaxed">
                  {selectedSoil.description}
                  <br />Drenaje: {selectedSoil.drainage} · DA: {selectedSoil.bulkDensity} g/cm³
                </div>
              )}
            </div>

            {/* Season */}
            <div className="space-y-1.5">
              <label className="text-xs font-serif font-bold text-[var(--text)] block">Ventana de Siembra</label>
              <div className="grid grid-cols-3 gap-1">
                {(["Primavera-Verano", "Otoño-Invierno", "Todo el año"] as Season[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setConfig({ ...config, season: s })}
                    className={`py-2 px-1 text-[10px] font-mono uppercase tracking-tight border transition-all cursor-pointer ${
                      config.season === s
                        ? "bg-[var(--footer)] text-white border-[var(--border)] font-bold"
                        : "bg-[var(--bg-white)] text-[var(--text2)] border-[var(--stone-border)] hover:bg-[var(--stone-bg)]"
                    }`}
                  >
                    {s === "Primavera-Verano" ? "☀️ PV" : s === "Otoño-Invierno" ? "❄️ OI" : "🔄 Anual"}
                  </button>
                ))}
              </div>
            </div>

            {/* Soil pH */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif font-bold text-[var(--text)] flex items-center gap-1">
                  <Beaker className="w-3.5 h-3.5" /> pH del Suelo
                </span>
                <span className="font-mono text-[11px] bg-[var(--stone-bg)] px-2 py-0.5 border border-[var(--stone-border)] font-bold">
                  {config.soilPh.toFixed(1)}
                </span>
              </div>
              <input
                type="range" min="4" max="9" step="0.1"
                value={config.soilPh}
                onChange={(e) => setConfig({ ...config, soilPh: parseFloat(e.target.value) })}
                className="w-full h-1.5 accent-[var(--text)] bg-[var(--stone-bg)] rounded-none appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-mono text-[var(--text3)]">
                <span>4.0 Ácido</span>
                <span>Neutro 7.0</span>
                <span>9.0 Alcalino</span>
              </div>
            </div>

            {/* Organic Matter */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif font-bold text-[var(--text)] flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" /> Materia Orgánica
                </span>
                <span className="font-mono text-[11px] bg-[var(--stone-bg)] px-2 py-0.5 border border-[var(--stone-border)] font-bold">
                  {config.organicMatterPct.toFixed(1)}%
                </span>
              </div>
              <input
                type="range" min="0.5" max="10" step="0.1"
                value={config.organicMatterPct}
                onChange={(e) => setConfig({ ...config, organicMatterPct: parseFloat(e.target.value) })}
                className="w-full h-1.5 accent-[var(--text)] bg-[var(--stone-bg)] rounded-none appearance-none cursor-pointer"
              />
            </div>

            {/* Irrigation */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif font-bold text-[var(--text)] flex items-center gap-1">
                  <Droplet className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                  Riego
                </span>
                <span className="font-mono text-[11px] bg-[var(--stone-bg)] px-2 py-0.5 border border-[var(--stone-border)] font-bold">
                  {config.irrigationLevel}%
                </span>
              </div>
              <input
                type="range" min="0" max="100"
                value={config.irrigationLevel}
                onChange={(e) => setConfig({ ...config, irrigationLevel: Number(e.target.value) })}
                className="w-full h-1.5 accent-[var(--text)] bg-[var(--stone-bg)] rounded-none appearance-none cursor-pointer"
              />
              <select
                value={config.irrigationMethod}
                onChange={(e) => setConfig({ ...config, irrigationMethod: e.target.value as IrrigationMethod })}
                className="w-full text-xs py-1.5 px-2 rounded-none border border-[var(--border-15)] bg-[var(--bg2)]"
              >
                <option value="Goteo">💧 Riego por Goteo (eficiencia 90%)</option>
                <option value="Aspersión">💦 Aspersión (eficiencia 75%)</option>
                <option value="Surco">🌊 Riego por Surco (eficiencia 55%)</option>
                <option value="Nebulización">🌫️ Nebulización (eficiencia 80%)</option>
              </select>
            </div>

            {/* Fertilizer */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif font-bold text-[var(--text)] flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  Fertilización
                </span>
                <span className="font-mono text-[11px] bg-[var(--stone-bg)] px-2 py-0.5 border border-[var(--stone-border)] font-bold">
                  {config.fertilizerLevel} kg N eq/ha
                </span>
              </div>
              <input
                type="range" min="0" max="200"
                value={config.fertilizerLevel}
                onChange={(e) => setConfig({ ...config, fertilizerLevel: Number(e.target.value) })}
                className="w-full h-1.5 accent-[var(--text)] bg-[var(--stone-bg)] rounded-none appearance-none cursor-pointer"
              />
              <select
                value={config.fertilizationType}
                onChange={(e) => setConfig({ ...config, fertilizationType: e.target.value as FertilizationType })}
                className="w-full text-xs py-1.5 px-2 rounded-none border border-[var(--border-15)] bg-[var(--bg2)]"
              >
                <option value="Orgánico (Compost)">🌱 Orgánico — Compost (libera lento)</option>
                <option value="Orgánico (Biol)">🧪 Orgánico — Biol fermentado</option>
                <option value="Biofertilizantes">🦠 Biofertilizantes (micorrizas + rizobios)</option>
                <option value="Mixto">🔄 Mixto (sintético + compost)</option>
                <option value="Sintético NPK">⚗️ Sintético NPK (respuesta rápida)</option>
              </select>
            </div>

            {/* Pest Control */}
            <div className="space-y-1.5">
              <label className="text-xs font-serif font-bold text-[var(--text)] block">Manejo Sanitario</label>
              <div className="grid grid-cols-2 gap-1">
                {(["Ecológico (Preventivo)", "Control Biológico", "MIP Agroecológico", "Químico Integrado", "Ninguno"] as PestControl[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setConfig({ ...config, pestControl: m })}
                    className={`py-1.5 px-1 text-[9px] font-mono uppercase tracking-tight border transition-all cursor-pointer ${
                      config.pestControl === m
                        ? "bg-[var(--footer)] text-white border-[var(--border)] font-bold"
                        : "bg-[var(--bg-white)] text-[var(--text2)] border-[var(--stone-border)] hover:bg-[var(--stone-bg)]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Agroecological Practices */}
            <div className="space-y-2 pt-2 border-t border-[var(--stone-border)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text4)] font-bold">
                Prácticas Agroecológicas Complementarias
              </span>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.useCoverCrop}
                  onChange={(e) => setConfig({ ...config, useCoverCrop: e.target.checked })}
                  className="accent-[var(--text)]"
                />
                <span className="text-[var(--text2)]">Cultivo de cobertura / abono verde (+MO)</span>
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.useRotation}
                  onChange={(e) => setConfig({ ...config, useRotation: e.target.checked })}
                  className="accent-[var(--text)]"
                />
                <span className="text-[var(--text2)]">Rotación de cultivos (3+ años)</span>
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.useCompostTea}
                  onChange={(e) => setConfig({ ...config, useCompostTea: e.target.checked })}
                  className="accent-[var(--text)]"
                />
                <span className="text-[var(--text2)]">Té de compost / microorganismos benéficos</span>
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer border-t border-[var(--stone-border)] pt-2 mt-1">
                <input
                  type="checkbox"
                  checked={config.usePolyculture}
                  onChange={(e) => setConfig({ ...config, usePolyculture: e.target.checked })}
                  className="accent-[var(--text)]"
                />
                <span className="font-bold text-[var(--text)]">🌽🫘🎃 Sistema Milpa (Maíz + Poroto + Zapallo)</span>
              </label>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRun}
              disabled={simulating}
              className="w-full bg-[var(--footer)] hover:bg-[var(--accent4)] disabled:bg-[var(--text4)] text-white font-serif font-bold text-xs py-3.5 rounded-none uppercase tracking-wider transition-all border border-[var(--border)] cursor-pointer flex items-center justify-center gap-2"
            >
              {simulating ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Ejecutando modelo FAO-56...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Simular Ensayo Agroecológico</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ===== RIGHT PANEL: OUTPUTS ===== */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {!simulating && !result ? (
            <div className="bg-[var(--bg3)] rounded-none border-2 border-dashed border-[var(--border-15)] p-12 text-center flex flex-col justify-center items-center h-full space-y-4">
              <Flower2 className="w-16 h-16 text-[var(--accent3)]/30" />
              <h4 className="font-serif font-black text-[var(--text)] text-lg">
                Laboratorio Virtual Agroecológico
              </h4>
              <p className="text-xs text-[var(--text2)] max-w-md leading-relaxed font-sans">
                Seleccioná un cultivo, tipo de suelo, y ajustá las variables de
                manejo. El simulador calcula el rendimiento estimado usando un
                modelo de múltiples factores: textura del suelo, pH, MO, balance
                hídrico FAO-56, demanda de nutrientes, fijación biológica de N₂
                y manejo agroecológico.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center pt-4">
                <div>
                  <span className="text-2xl font-serif font-black text-[var(--accent3)]">{CROP_DATA.length}</span>
                  <p className="text-[10px] font-mono text-[var(--text3)]">Cultivos</p>
                </div>
                <div>
                  <span className="text-2xl font-serif font-black text-[var(--accent3)]">{Object.keys(SOIL_DATA).length}</span>
                  <p className="text-[10px] font-mono text-[var(--text3)]">Suelos</p>
                </div>
                <div>
                  <span className="text-2xl font-serif font-black text-[var(--accent3)]">+30</span>
                  <p className="text-[10px] font-mono text-[var(--text3)]">Variables</p>
                </div>
              </div>
            </div>
          ) : simulating ? (
            <div className="bg-[var(--bg-white)] rounded-none border border-[var(--border-15)] p-12 text-center flex flex-col justify-center items-center h-full space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-[var(--border)] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[var(--text)] text-sm">
                  Balanceando parámetros edafológicos...
                </h4>
                <p className="text-[10px] font-mono text-[var(--text4)]">
                  Calculando compatibilidad textural, balance hídrico y eficiencia de nutrientes.
                </p>
              </div>
            </div>
          ) : result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--bg-white)] p-5 rounded-none border border-[var(--border-15)] space-y-4 h-full flex flex-col justify-between text-xs"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-[var(--stone-border)]">
                <div>
                  <span className="text-[8px] text-[var(--text4)] font-mono tracking-widest uppercase">
                    REPORTE DE ENSAYO
                  </span>
                  <h3 className="text-sm font-serif font-black text-[var(--text)] flex items-center gap-1.5">
                    {selectedCrop?.icon} {selectedCrop?.name}
                    <span className="text-[10px] font-mono font-normal text-[var(--text3)] italic">
                      {selectedCrop?.scientificName}
                    </span>
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[8px] bg-[var(--stone-bg)] text-[var(--text2)] px-2 py-0.5 border border-[var(--stone-border)] font-mono uppercase font-bold">
                    {config.season}
                  </span>
                  <div className="text-[8px] text-[var(--text3)] mt-0.5">{selectedSoil?.name}</div>
                </div>
              </div>

              {/* === TOP: 3 KPIs === */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[var(--bg3)] p-3 border border-[var(--border-10)] text-center">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-[var(--text4)] font-bold">Rendimiento</span>
                  <span className="text-lg md:text-xl font-serif font-black text-[var(--text)] block mt-0.5">
                    <AnimatedCounter value={result.cropYield} />
                  </span>
                  <span className="text-[8px] text-[var(--text3)] font-mono">{selectedCrop?.yieldUnit || "kg/ha"}</span>
                  <div className="mt-1 bg-[var(--stone-border)] h-1 rounded-none overflow-hidden">
                    <div className="bg-emerald-700 dark:bg-emerald-400 h-full" style={{ width: `${result.yieldPctOfPotential}%` }}></div>
                  </div>
                  <span className="text-[8px] text-[var(--text3)]">{result.yieldPctOfPotential}% del potencial</span>
                </div>
                <div className="bg-[var(--accent1-30)] p-3 border border-[var(--border-10)] text-center">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-[var(--accent3)] font-bold">Margen Neto</span>
                  <span className={`text-lg md:text-xl font-serif font-black block mt-0.5 ${result.financialReturn >= 0 ? "text-emerald-800 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
                    {result.financialReturn >= 0 ? "+" : "-"}<AnimatedCounter value={Math.abs(result.financialReturn)} />
                  </span>
                  <span className="text-[8px] text-[var(--text3)] font-mono">USD/ha</span>
                  <div className="mt-1 text-[8px] text-[var(--text3)]">
                    Costo: USD {result.productionCost}/ha
                  </div>
                </div>
                <div className="bg-[var(--accent2)] p-3 border border-[var(--border-10)] text-center">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-[var(--accent4)] font-bold">Sustentabilidad</span>
                  <span className="text-lg md:text-xl font-serif font-black text-[var(--accent4)] block mt-0.5">
                    <AnimatedCounter value={result.sustainabilityScore} /> / 100
                  </span>
                  <span className="text-[8px] text-[var(--text3)] font-mono">eco-score</span>
                  <div className="mt-1 text-[8px]">
                    <span className={`font-bold ${result.carbonFootprint === "Baja" ? "text-emerald-600" : result.carbonFootprint === "Media" ? "text-amber-600" : "text-rose-600"}`}>
                      CO₂: {result.carbonFootprint}
                    </span>
                    <span className="mx-1">·</span>
                    <span className={`font-bold ${result.biodiversityImpact === "Positivo" ? "text-emerald-600" : result.biodiversityImpact === "Neutro" ? "text-blue-600" : "text-rose-600"}`}>
                      {result.biodiversityImpact}
                    </span>
                  </div>
                </div>
              </div>

              {/* === MIDDLE: DETAILED METRICS === */}
              <div className="bg-[var(--bg3)] p-3 border border-[var(--border-10)] space-y-2">
                <h4 className="text-[9px] font-mono uppercase tracking-wider text-[var(--text4)] font-bold">Indicadores Técnicos</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Salud del suelo:</span>
                    <span className={`font-bold font-mono text-[10px] ${
                      result.soilHealthImpact === "Mejora" ? "text-emerald-700 dark:text-emerald-400" :
                      result.soilHealthImpact === "Estable" ? "text-blue-700 dark:text-blue-400" :
                      result.soilHealthImpact === "Degradación Leve" ? "text-amber-700 dark:text-amber-400" :
                      "text-rose-700 dark:text-rose-400"
                    }`}>{result.soilHealthImpact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Biodiversidad del suelo:</span>
                    <span className="font-bold font-mono">{result.soilBiodiversityScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">MO del suelo:</span>
                    <span className="font-mono">{result.organicMatterChange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Agua total usada:</span>
                    <span className="font-mono"><AnimatedCounter value={result.totalWaterUsed} suffix=" mm" /></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Eficiencia de agua (EUA):</span>
                    <span className="font-mono"><AnimatedCounter value={result.waterEfficiency} suffix="%" /></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Productividad del agua:</span>
                    <span className="font-mono">{result.waterProductivity} kg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Eficiencia uso de N:</span>
                    <span className="font-mono">{result.nitrogenUseEfficiency} kg/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Punto equilibrio:</span>
                    <span className={`font-bold font-mono ${result.breakEven ? "text-emerald-600" : "text-rose-600"}`}>
                      {result.breakEven ? "Sí, rentable" : "No, pérdida"}
                    </span>
                  </div>
                </div>
              </div>

              {/* === POLICULTIVO (MILPA) === */}
              {result.polycultureActive && (
                <div className="bg-amber-50 dark:bg-amber-950/30 p-3 border border-amber-200 dark:border-amber-800 space-y-2">
                  <h4 className="text-[9px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold flex items-center gap-1">
                    🌽🫘🎃 SISTEMA MILPA — Policultivo
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                    <div className="flex justify-between col-span-2">
                      <span className="text-[var(--text2)]">Rendimiento combinado:</span>
                      <span className="font-bold font-mono"><AnimatedCounter value={result.polycultureYield} suffix=" kg/ha" /></span>
                    </div>
                    <div className="col-span-2 text-[10px] text-[var(--text2)] font-mono">
                      {result.polycultureDetails}
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-[var(--text2)]">LER (Land Equivalent Ratio):</span>
                      <span className={`font-bold font-mono ${result.landEquivalentRatio > 1 ? "text-emerald-700 dark:text-emerald-400" : "text-[var(--text)]"}`}>
                        {result.landEquivalentRatio.toFixed(2)} {result.landEquivalentRatio > 1 ? "✅" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* === SOBERANÍA ALIMENTARIA === */}
              <div className="bg-green-50 dark:bg-green-950/30 p-3 border border-green-200 dark:border-green-800 space-y-2">
                <h4 className="text-[9px] font-mono uppercase tracking-wider text-green-800 dark:text-green-400 font-bold flex items-center gap-1">
                  🥗 Soberanía Alimentaria
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Proteína:</span>
                    <span className="font-bold font-mono">{result.proteinPerHa} kg/ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Energía:</span>
                    <span className="font-bold font-mono">{(result.caloriesPerHa / 1000 / 1000).toFixed(1)} Mcal/ha</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-[var(--text2)]">Personas alimentadas:</span>
                    <span className="font-bold font-mono">{result.peopleFedPerHa} personas/ha/año</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-[var(--text2)]">Puntaje de soberanía local:</span>
                    <span className={`font-bold font-mono ${result.localFoodScore >= 70 ? "text-emerald-700 dark:text-emerald-400" : result.localFoodScore >= 40 ? "text-amber-700 dark:text-amber-400" : "text-rose-700 dark:text-rose-400"}`}>
                      {result.localFoodScore}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* === ENERGÍA FÓSIL === */}
              <div className="bg-stone-50 dark:bg-stone-900/50 p-3 border border-stone-200 dark:border-stone-800 space-y-2">
                <h4 className="text-[9px] font-mono uppercase tracking-wider text-stone-700 dark:text-stone-400 font-bold flex items-center gap-1">
                  ⚡ Balance Energético
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Energía invertida:</span>
                    <span className="font-mono">{result.energyInput.toLocaleString("es-AR")} MJ/ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Energía obtenida:</span>
                    <span className="font-mono">{result.energyOutput.toLocaleString("es-AR")} MJ/ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Balance neto:</span>
                    <span className={`font-bold font-mono ${result.netEnergyBalance >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                      {result.netEnergyBalance >= 0 ? "+" : ""}{result.netEnergyBalance.toLocaleString("es-AR")} MJ/ha
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text2)]">Eficiencia:</span>
                    <span className="font-bold font-mono">{result.energyEfficiency}:1</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-[var(--text2)]">Ahorro combustible fósil:</span>
                    <span className="font-bold font-mono text-emerald-700 dark:text-emerald-400">{result.fossilFuelSaved} L diésel eq./ha</span>
                  </div>
                </div>
              </div>

              {/* === FEEDBACK === */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                <p className="text-[8px] font-mono uppercase tracking-wider text-[var(--text4)] font-bold flex items-center gap-1">
                  <CornerDownRight className="w-3 h-3" /> Devolución Académica ({result.feedback.length} observaciones)
                </p>
                {result.feedback.map((fb, i) => (
                  <div key={i} className="flex gap-1.5 items-start text-[10px] text-[var(--text2)] leading-relaxed font-sans border-b border-[var(--stone-border)] pb-1 last:border-0">
                    <span className="text-[8px] font-mono text-[var(--text3)] shrink-0 mt-0.5">[{i + 1}]</span>
                    <span>{fb}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[var(--stone-border)] text-center">
                <span className="text-[9px] text-[var(--text3)] font-serif italic">
                  Simulación basada en FAO-56, balances de nutrientes INTA-FAO y datos edafológicos de referencia.
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
