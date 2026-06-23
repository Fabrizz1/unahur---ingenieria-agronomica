import React, { useState, useEffect, useRef } from "react";
import { Sprout, Droplet, Layers, CornerDownRight, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { CropType, SoilType, SimulationConfig, SimulationResult } from "../types";
import { Reveal } from "./Reveal";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
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

  return <>{display.toLocaleString("es-AR")}{suffix}</>;
}

interface SimulatorSectionProps {
  triggerNotification: (msg: string) => void;
}

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({
  triggerNotification,
}) => {
  // Agricultural Simulator State
  const [simConfig, setSimConfig] = useState<SimulationConfig>({
    cropType: "Maíz",
    soilType: "Franco",
    irrigationLevel: 50,
    fertilizerLevel: 40,
    pestControl: "Ecológico",
    season: "Primavera-Verano",
  });

  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [simulating, setSimulating] = useState(false);

  // Crop Harvest Simulator Logic
  const handleRunSimulation = () => {
    setSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      const { cropType, soilType, irrigationLevel, fertilizerLevel, pestControl, season } = simConfig;

      let baseYield = 0; // kg/ha
      let maxYield = 10000;
      let idealIrrigation = 60;
      let idealFertilizer = 50;
      let pricePerKg = 0.3; // USD
      let fixedCost = 400; // USD/ha

      // Crop customization
      if (cropType === "Soja") {
        baseYield = 3200;
        maxYield = 4800;
        idealIrrigation = 50;
        idealFertilizer = 30; // Nitrogen fixer, needs less!
        pricePerKg = 0.42;
        fixedCost = 350;
      } else if (cropType === "Maíz") {
        baseYield = 7500;
        maxYield = 11500;
        idealIrrigation = 70;
        idealFertilizer = 75; // Heavily consumes nitrogen
        pricePerKg = 0.21;
        fixedCost = 500;
      } else if (cropType === "Trigo") {
        baseYield = 3800;
        maxYield = 5500;
        idealIrrigation = 40;
        idealFertilizer = 55;
        pricePerKg = 0.25;
        fixedCost = 300;
      } else if (cropType === "Alfalfa") {
        baseYield = 12000;
        maxYield = 18000;
        idealIrrigation = 65;
        idealFertilizer = 20;
        pricePerKg = 0.12;
        fixedCost = 280;
      } else if (cropType === "Hortícola (Tomate)") {
        baseYield = 40000;
        maxYield = 65000;
        idealIrrigation = 85;
        idealFertilizer = 80;
        pricePerKg = 0.65;
        fixedCost = 1500;
      }

      // Calculate efficiency coefficients
      const irrDiff = Math.abs(irrigationLevel - idealIrrigation);
      const irrPenalty = Math.max(0, 1 - irrDiff / 100);

      const fertDiff = Math.abs(fertilizerLevel - idealFertilizer);
      const fertPenalty = Math.max(0, 1 - fertDiff / 100);

      // Soil adaptation multiplier
      let soilMultiplier = 1.0;
      let soilFeedback = "";
      if (soilType === "Franco") {
        soilMultiplier = 1.05;
        soilFeedback = "Suelo Franco ideal: excelente drenaje y retención equilibrada de nutrientes.";
      } else if (soilType === "Franco-Arenoso") {
        soilMultiplier = 0.9;
        soilFeedback = "El suelo Franco-Arenoso drena rápido, los nutrientes pueden lavarse rápido. Necesita riego más regular.";
        if (irrigationLevel < 40) soilMultiplier -= 0.15;
      } else if (soilType === "Franco-Arcilloso") {
        soilMultiplier = 1.0;
        soilFeedback = "El suelo Franco-Arcilloso tiene muy buena fertilidad pero tiende a compactarse con labranza pesada.";
      } else if (soilType === "Arcilloso (Saturado)") {
        soilMultiplier = 0.7;
        soilFeedback = "Suelo Arcilloso propenso a encharcamiento. Puede provocar asfixia de raíces por falta de oxígeno.";
        if (irrigationLevel > 60) soilMultiplier -= 0.2;
      }

      // Pest control impact
      let pestMultiplier = 1.0;
      let pestCost = 0;
      let ecoScore = 50;
      let pestFeedback = "";

      if (pestControl === "Ecológico") {
        pestMultiplier = 0.95;
        pestCost = 80;
        ecoScore += 40;
        pestFeedback = "Control ecológico exitoso. Menos huella química, favorece polinizadores naturales.";
      } else if (pestControl === "Químico Integrado") {
        pestMultiplier = 1.05;
        pestCost = 180;
        ecoScore -= 10;
        pestFeedback = "Pulverización química calibrada. Buena sanidad pero incrementa costos e impacto ambiental.";
      } else {
        pestMultiplier = 0.65;
        pestCost = 0;
        ecoScore -= 20;
        pestFeedback = "Sin control de plagas: Pérdidas sustanciales de rendimiento foliar y fruto por ataque biótico.";
      }

      // Nitrogen fixation for soybean/alfalfa bonus
      if ((cropType === "Soja" || cropType === "Alfalfa") && fertilizerLevel > 60) {
        pestMultiplier -= 0.1;
        pestFeedback += " Ojo: El exceso de nitrógeno sintético inhibe la fijación biológica de los nódulos de Rhizobium.";
      }

      // Seasons check
      let seasonMultiplier = 1.0;
      if (season === "Otoño-Invierno" && (cropType === "Soja" || cropType === "Maíz" || cropType === "Hortícola (Tomate)")) {
        seasonMultiplier = 0.2;
      } else if (season === "Primavera-Verano" && cropType === "Trigo") {
        seasonMultiplier = 0.3;
      }

      // Final yield calculation
      const finalYield = Math.max(0, Math.round(baseYield * irrPenalty * fertPenalty * soilMultiplier * pestMultiplier * seasonMultiplier));

      // Soil Health Impact
      let soilHealth: SimulationResult["soilHealthImpact"] = "Estable";
      if (fertilizerLevel > 80 && pestControl === "Químico Integrado") {
        soilHealth = "Degradación Alta";
        ecoScore -= 20;
      } else if (fertilizerLevel < 20 && pestControl === "Ninguno") {
        soilHealth = "Degradación Leve";
      } else if (pestControl === "Ecológico" && fertilizerLevel > 20 && fertilizerLevel < 60) {
        soilHealth = "Mejora";
        ecoScore += 10;
      }

      // Water use efficiency
      const waterEff = Math.round(Math.max(10, Math.min(100, (idealIrrigation / (irrigationLevel || 1)) * 100)));

      // Financial calculations
      const revenue = finalYield * pricePerKg;
      const totalCosts = fixedCost + (irrigationLevel * 2.5) + (fertilizerLevel * 3.5) + pestCost;
      const profit = Math.round(revenue - totalCosts);

      // Eco Score clipping
      const finalEcoScore = Math.max(0, Math.min(100, ecoScore + (waterEff * 0.2)));

      // Feedback assembly
      const feedback: string[] = [soilFeedback];
      feedback.push(pestFeedback);
      if (seasonMultiplier < 0.5) {
        feedback.push(`⚠️ Época inadecuada: Sembrar ${cropType} en ${season} arriesga pérdidas casi totales por heladas o estrés térmico.`);
      }
      if (fertilizerLevel > 85) {
        feedback.push("⚠️ Alerta por lixiviación: Niveles excesivos de fertilizante contaminan las napas freáticas locales.");
      }
      if (irrigationLevel > 85 && soilType === "Arcilloso (Saturado)") {
        feedback.push("⚠️ Anoxia radicular: Demasiado riego en arcilla ahogó las raíces de tu cultivo.");
      }

      setSimResult({
        cropYield: finalYield,
        waterEfficiency: Math.min(100, waterEff),
        soilHealthImpact: soilHealth,
        financialReturn: profit,
        sustainabilityScore: Math.round(finalEcoScore),
        feedback,
      });

      setSimulating(false);
      triggerNotification("¡Simulación de rendimiento agronómico finalizada!");
    }, 1500);
  };

  return (
    <div className="space-y-8" id="simulator-section">
      {/* Title box */}
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="space-y-2 border-b border-[var(--border-10)] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
            <Sprout className="w-4 h-4" />
            <span>Laboratorio Virtual</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
            Simulador de Rendimiento Agrícola
          </h2>
          <p className="text-xs text-[var(--text2)] font-sans max-w-xl leading-relaxed">
            Modelo de balance hídrico y nutricional calibrado para el Cinturón Hortícola y la Pampa Ondulada (Hurlingham). Probá variables físicas y químicas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Simulator Inputs Left Panel */}
        <div className="bg-[var(--bg-white)] p-6 rounded-none border border-[var(--border-15)] shadow-none md:col-span-5 space-y-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text)] font-bold pb-2 border-b border-[var(--stone-border)]">
            Parámetros del Ensayo
          </h3>

          {/* Crop Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-[var(--text)] block">
              Cultivo Seleccionado
            </label>
            <select
              value={simConfig.cropType}
              onChange={(e) => setSimConfig({ ...simConfig, cropType: e.target.value as CropType })}
              className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg2)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
            >
              <option value="Maíz">🌽 Maíz de Primera (Grano)</option>
              <option value="Soja">🌱 Soja (Variedad de Grupo IV)</option>
              <option value="Trigo">🌾 Trigo Pan (Ciclo Intermedio-Largo)</option>
              <option value="Alfalfa">☘️ Alfalfa para Pastura (Corte)</option>
              <option value="Hortícola (Tomate)">🍅 Tomate Platense (Cinturón Hortícola)</option>
            </select>
          </div>

          {/* Soil Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-[var(--text)] block">
              Tipo de Suelo (Textura)
            </label>
            <select
              value={simConfig.soilType}
              onChange={(e) => setSimConfig({ ...simConfig, soilType: e.target.value as SoilType })}
              className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg2)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
            >
              <option value="Franco">Franco (Materia Orgánica 2.5% - Óptimo)</option>
              <option value="Franco-Arenoso">Franco-Arenoso (Drena rápido, baja retención)</option>
              <option value="Franco-Arcilloso">Franco-Arcilloso (Alto contenido mineral)</option>
              <option value="Arcilloso (Saturado)">Arcilloso Compacto (Riesgo encharcamiento)</option>
            </select>
          </div>

          {/* Season */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-[var(--text)] block">Ventana de Siembras</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSimConfig({ ...simConfig, season: "Primavera-Verano" })}
                className={`py-2 px-3 rounded-none text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                  simConfig.season === "Primavera-Verano"
                    ? "bg-[var(--accent1)] border-[var(--border)] text-[var(--text)] font-bold"
                    : "bg-[var(--bg-white)] border-[var(--stone-border)] text-[var(--text2)] hover:bg-[var(--stone-bg)]"
                }`}
              >
                ☀️ Primavera/Verano
              </button>
              <button
                onClick={() => setSimConfig({ ...simConfig, season: "Otoño-Invierno" })}
                className={`py-2 px-3 rounded-none text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                  simConfig.season === "Otoño-Invierno"
                    ? "bg-[var(--footer)] border-[var(--border)] text-white font-bold"
                    : "bg-[var(--bg-white)] border-[var(--stone-border)] text-[var(--text2)] hover:bg-[var(--stone-bg)]"
                }`}
              >
                ❄️ Otoño/Invierno
              </button>
            </div>
          </div>

          {/* Irrigation slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-serif font-bold text-[var(--text)] flex items-center gap-1">
                <Droplet className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                Riego Suplementario
              </span>
              <span className="font-mono text-[11px] bg-[var(--stone-bg)] px-2 py-0.5 border border-[var(--stone-border)] font-bold">
                {simConfig.irrigationLevel}% (Saturación)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simConfig.irrigationLevel}
              onChange={(e) => setSimConfig({ ...simConfig, irrigationLevel: Number(e.target.value) })}
              className="w-full h-1.5 accent-[var(--text)] bg-[var(--stone-bg)] rounded-none appearance-none cursor-pointer"
            />
          </div>

          {/* Fertilizer slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-serif font-bold text-[var(--text)] flex items-center gap-1">
                <Layers className="w-4 h-4 text-[var(--accent3)]" />
                Nutrientes de Suelo
              </span>
              <span className="font-mono text-[11px] bg-[var(--stone-bg)] px-2 py-0.5 border border-[var(--stone-border)] font-bold">
                {simConfig.fertilizerLevel} kg N / ha
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simConfig.fertilizerLevel}
              onChange={(e) => setSimConfig({ ...simConfig, fertilizerLevel: Number(e.target.value) })}
              className="w-full h-1.5 accent-[var(--text)] bg-[var(--stone-bg)] rounded-none appearance-none cursor-pointer"
            />
          </div>

          {/* Pest Control */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-[var(--text)] block">
              Esquema Sanitario
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(["Ecológico", "Químico Integrado", "Ninguno"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSimConfig({ ...simConfig, pestControl: mode })}
                  className={`py-2 px-1 text-[10px] font-mono uppercase tracking-tight rounded-none border transition-all cursor-pointer ${
                    simConfig.pestControl === mode
                      ? "bg-[var(--footer)] text-white border-[var(--border)] font-bold"
                      : "bg-[var(--bg-white)] text-[var(--text2)] border-[var(--stone-border)] hover:bg-[var(--stone-bg)]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Action trigger button */}
          <button
            onClick={handleRunSimulation}
            disabled={simulating}
            className="w-full bg-[var(--footer)] hover:bg-[var(--accent4)] disabled:bg-[var(--text4)] text-white font-serif font-bold text-xs py-3.5 rounded-none uppercase tracking-wider transition-all border border-[var(--border)] cursor-pointer flex items-center justify-center gap-2"
          >
            {simulating ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Corriendo algoritmo agronómico...</span>
              </>
            ) : (
              <>
                <Sprout className="w-4 h-4" />
                <span>Simular Campaña</span>
              </>
            )}
          </button>
        </div>

        {/* Simulator Outputs Right Panel */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {!simulating && !simResult ? (
            <div className="bg-[var(--bg3)] rounded-none border-2 border-dashed border-[var(--border-15)] p-12 text-center flex flex-col justify-center items-center h-full space-y-4">
              <Sprout className="w-12 h-12 text-[var(--accent3)]/30" />
              <h4 className="font-serif font-black text-[var(--text)] text-lg">¿Listo para el ensayo agronómico virtual?</h4>
              <p className="text-xs text-[var(--text2)] max-w-sm leading-relaxed font-sans">
                Ajustá las variables del lote en el panel de control lateral. Evaluá las mermas por plagas, el agua útil del suelo y el rendimiento neto por hectárea.
              </p>
            </div>
          ) : simulating ? (
            <div className="bg-[var(--bg-white)] rounded-none border border-[var(--border-15)] p-12 text-center flex flex-col justify-center items-center h-full space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-[var(--border)] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[var(--text)] text-sm">Calculando tasa de nodulación...</h4>
                <p className="text-[11px] font-mono text-[var(--text4)]">Verificando balance orgánico en base a coordenadas locales.</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--bg-white)] p-6 rounded-none border border-[var(--border-15)] shadow-none space-y-5 h-full flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Simulation Badge */}
                <div className="flex justify-between items-center pb-3 border-b border-[var(--stone-border)]">
                  <div>
                    <span className="text-[9px] text-[var(--text4)] font-mono tracking-widest uppercase">
                      REPORTE DE ENSAYO #2026-B
                    </span>
                    <h3 className="text-base font-serif font-black text-[var(--text)]">
                      Rendimiento de Cultivo: <span className="italic">{simConfig.cropType}</span>
                    </h3>
                  </div>
                  <span className="text-[9px] bg-[var(--stone-bg)] text-[var(--text2)] px-2 py-0.5 border border-[var(--stone-border)] font-mono uppercase font-bold">
                    {simConfig.season}
                  </span>
                </div>

                {/* Top KPI Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Yield Card */}
                  <div className="bg-[var(--bg3)] p-4 border border-[var(--border-10)] text-center rounded-none">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text4)] block font-bold">
                      Cosecha Estimada
                    </span>
                    <span className="text-xl font-serif font-black text-[var(--text)] block mt-1.5">
                      <AnimatedCounter value={simResult!.cropYield} suffix="" />
                    </span>
                    <span className="text-[10px] text-[var(--text3)] font-mono uppercase">kg / ha</span>
                  </div>

                  {/* Financial Return Card */}
                  <div className="bg-[var(--accent1-30)] p-4 border border-[var(--border-10)] text-center rounded-none">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent3)] block font-bold">
                      Margen Neto
                    </span>
                    <span className={`text-xl font-serif font-black block mt-1.5 ${simResult!.financialReturn >= 0 ? "text-emerald-800 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
                      {simResult!.financialReturn >= 0 ? "+" : "-"}<AnimatedCounter value={Math.abs(simResult!.financialReturn)} suffix="" />
                    </span>
                    <span className="text-[10px] text-[var(--text3)] font-mono uppercase">USD / ha</span>
                  </div>

                  {/* Sustainability Card */}
                  <div className="bg-[var(--accent2)] p-4 border border-[var(--border-10)] text-center rounded-none">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent4)] block font-bold">
                      Puntaje Agro
                    </span>
                    <span className="text-xl font-serif font-black text-[var(--accent4)] block mt-1.5">
                      <AnimatedCounter value={simResult!.sustainabilityScore} suffix="" /> / 100
                    </span>
                    <span className="text-[10px] text-[var(--text3)] font-mono uppercase">sustentable</span>
                  </div>
                </div>

                {/* Middle detailed indicators */}
                <div className="space-y-3 bg-[var(--bg3)] p-4 border border-[var(--border-10)]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-serif font-bold text-[var(--text2)]">Estado Estructural del Suelo:</span>
                    <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${
                      simResult!.soilHealthImpact === "Mejora" ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800" :
                      simResult!.soilHealthImpact === "Estable" ? "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800" :
                      simResult!.soilHealthImpact === "Degradación Leve" ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800" :
                      "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800"
                    }`}>
                      {simResult!.soilHealthImpact}
                    </span>
                  </div>

                  {/* Water efficiency progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-serif font-bold text-[var(--text2)]">Eficiencia en Uso de Agua (EUA):</span>
                      <span className="font-mono font-bold text-[var(--text)]"><AnimatedCounter value={simResult!.waterEfficiency} suffix="%" /></span>
                    </div>
                    <div className="w-full bg-[var(--stone-border)] h-1 rounded-none overflow-hidden">
                      <div
                        className="bg-[var(--text)] h-full rounded-none transition-all duration-700"
                        style={{ width: `${simResult!.waterEfficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Warnings and Feedbacks */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text4)] font-bold">
                    Devolución Académica:
                  </p>
                  <div className="space-y-1.5">
                    {simResult!.feedback.map((fb, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-[var(--text2)] leading-relaxed font-sans">
                        <CornerDownRight className="w-3.5 h-3.5 text-[var(--accent3)] shrink-0 mt-0.5" />
                        <span>{fb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--stone-border)] text-center">
                <span className="text-[11px] text-[var(--text3)] font-serif italic">
                  Los resultados son estimaciones basadas en parámetros promedio de la región.
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
