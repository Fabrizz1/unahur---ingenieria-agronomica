import type {
  SimulationConfig,
  SimulationResult,
  SoilProperties,
  CropProperties,
  SoilHealthImpact,
} from "./types";
import { getCropById, getSoilById } from "./simulatorData";

interface FactorResult {
  value: number;
  feedback: string[];
}

// ══════════════════════════════════════════════════════════════
//  FACTOR DE SUELO: Evalúa compatibilidad textural + pH + MO
// ══════════════════════════════════════════════════════════════
function calcSoilFactor(
  crop: CropProperties,
  soil: SoilProperties,
  config: SimulationConfig,
): FactorResult {
  const feedback: string[] = [];

  // 1) Compatibilidad textural
  const pref = crop.soilPreferences.find((p) => p.texture === soil.id);
  const textureScore = pref ? pref.suitability : 0.3;

  if (textureScore >= 0.9) {
    feedback.push(`✔️ El suelo ${soil.name} es ideal para ${crop.name}. ${pref!.notes}.`);
  } else if (textureScore >= 0.7) {
    feedback.push(`✅ ${soil.name} es adecuado para ${crop.name}. ${pref!.notes}.`);
  } else if (textureScore >= 0.4) {
    feedback.push(`⚠️ ${soil.name} no es el suelo óptimo para ${crop.name}. ${pref!.notes}.`);
  } else {
    feedback.push(`❌ ${soil.name} es un suelo marginal para ${crop.name}. ${pref!.notes}.`);
  }

  // 2) pH
  const phOk =
    config.soilPh >= crop.idealPhMin && config.soilPh <= crop.idealPhMax;
  const phDistance = phOk
    ? 0
    : Math.min(
        Math.abs(config.soilPh - crop.idealPhMin),
        Math.abs(config.soilPh - crop.idealPhMax),
      );
  const phScore = Math.max(0, 1 - phDistance * 0.25);

  if (!phOk) {
    if (config.soilPh < crop.idealPhMin) {
      feedback.push(
        `⚠️ pH ${config.soilPh} es demasiado ácido para ${crop.name}. Rango ideal: ${crop.idealPhMin}-${crop.idealPhMax}. Considere encalado (1-3 t CaCO₃/ha).`,
      );
    } else {
      feedback.push(
        `⚠️ pH ${config.soilPh} es demasiado alcalino para ${crop.name}. Rango ideal: ${crop.idealPhMin}-${crop.idealPhMax}. Considere incorporar azufre o materia orgánica.`,
      );
    }
  } else {
    feedback.push(
      `✔️ pH ${config.soilPh} dentro del rango ideal para ${crop.name} (${crop.idealPhMin}-${crop.idealPhMax}).`,
    );
  }

  // 3) Materia orgánica
  const moScore =
    config.organicMatterPct >= 2.0
      ? Math.min(1, config.organicMatterPct / 5)
      : config.organicMatterPct / 2;
  if (config.organicMatterPct < 1.5) {
    feedback.push(
      `⚠️ MO baja (${config.organicMatterPct}%). Aporte de compost necesario. Ideal: >2.5% para buena actividad biológica.`,
    );
  } else if (config.organicMatterPct >= 3.0) {
    feedback.push(
      `✔️ Excelente nivel de MO (${config.organicMatterPct}%). Buena estructura y retención de humedad.`,
    );
  } else {
    feedback.push(
      `✅ Nivel de MO aceptable (${config.organicMatterPct}%). Seguir incorporando residuos orgánicos.`,
    );
  }

  const combinedFactor = Math.min(
    1,
    textureScore * 0.55 + phScore * 0.25 + moScore * 0.2,
  );

  return { value: combinedFactor, feedback };
}

// ══════════════════════════════════════════════════════════════
//  FACTOR DE AGUA: Basado en Kc de FAO 56 y balance hídrico
// ══════════════════════════════════════════════════════════════
function calcWaterFactor(
  crop: CropProperties,
  soil: SoilProperties,
  config: SimulationConfig,
): FactorResult {
  const feedback: string[] = [];
  const kcAvg = (crop.kcInit + crop.kcMid + crop.kcEnd) / 3;

  // Cuánta agua disponible hay en el suelo (mm) en los primeros 30 cm
  const waterHolding30cm =
    (soil.availableWater / 100) * 300; // mm en 30cm de profundidad

  // Cuánta agua necesita el cultivo como % de la ideal
  const irrigationMatch =
    1 -
    Math.abs(config.irrigationLevel - crop.idealIrrigationPct) / 100;

  // Penalización por exceso en suelos arcillosos (anegamiento)
  let waterExcessPenalty = 0;
  if (
    config.irrigationLevel > crop.idealIrrigationPct + 25 &&
    soil.drainage === "Lento"
  ) {
    waterExcessPenalty = 0.25;
    feedback.push(
      `❌ Riesgo alto de anegamiento: suelo ${soil.name} drena lentamente y el riego supera el ${config.irrigationLevel}%. Las raíces pueden sufrir asfixia.`,
    );
  }

  // Sequía
  if (
    config.irrigationLevel < crop.idealIrrigationPct - 30 &&
    crop.droughtTolerance < 0.5
  ) {
    feedback.push(
      `⚠️ Estrés hídrico severo: el riego al ${config.irrigationLevel}% está muy por debajo del ideal (${crop.idealIrrigationPct}%). ${crop.name} tiene baja tolerancia a sequía.`,
    );
  }

  // Eficiencia según método de riego
  const methodEfficiency: Record<string, number> = {
    Goteo: 0.9,
    Aspersión: 0.75,
    Surco: 0.55,
    Nebulización: 0.8,
  };
  const eff = methodEfficiency[config.irrigationMethod] ?? 0.7;

  // Eficiencia en uso de agua teórica
  const waterUseEff = Math.round(
    Math.max(10, Math.min(100, (crop.idealIrrigationPct / Math.max(config.irrigationLevel, 1)) * 100 * eff)),
  );

  const combinedFactor = Math.max(
    0,
    Math.min(1, irrigationMatch * 0.6 + eff * 0.3 - waterExcessPenalty),
  );

  feedback.push(
    `💧 Eficiencia del método ${config.irrigationMethod}: ${Math.round(eff * 100)}%. Capacidad de campo del suelo: ${soil.fieldCapacity}%, agua útil: ${soil.availableWater}%.`,
  );

  return { value: combinedFactor, feedback: [feedback.join("\n")] };
}

// ══════════════════════════════════════════════════════════════
//  FACTOR DE NUTRIENTES: N-P-K + MO + fijación biológica
// ══════════════════════════════════════════════════════════════
function calcNutrientFactor(
  crop: CropProperties,
  soil: SoilProperties,
  config: SimulationConfig,
): FactorResult {
  const feedback: string[] = [];

  // N disponible del fertilizante (0-100 escala)
  const nSupply = config.fertilizerLevel;

  // Aporte por fijación biológica
  let bioFixationBonus = 0;
  if (crop.nitrogenFixer) {
    bioFixationBonus = 0.2;
    if (nSupply > 60) {
      bioFixationBonus = -0.1; // Exceso de N inhibe la nodulación
      feedback.push(
        `⚠️ El exceso de N sintético (${nSupply} kg N/ha) inhibe la fijación biológica de ${crop.name}. Para leguminosas, lo ideal es ≤ 30 kg N/ha de arrancador.`,
      );
    } else {
      feedback.push(
        `✔️ ${crop.name} fija N₂ atmosférico. La fertilización nitrogenada es baja (${nSupply} kg N/ha), lo que favorece la nodulación. Aporte potencial: 80-250 kg N/ha/año.`,
      );
    }
  }

  // Fertilizante orgánico vs sintético
  let fertScore = 0;
  switch (config.fertilizationType) {
    case "Orgánico (Compost)":
      fertScore = 0.85 + (crop.mycorrhizalDependency * 0.1);
      feedback.push(
        `🌱 Fertilización con compost: mejora la MO, la CIC y la actividad microbiana. Liberación lenta de nutrientes. Ideal para ${crop.name}.`,
      );
      break;
    case "Orgánico (Biol)":
      fertScore = 0.8 + (crop.mycorrhizalDependency * 0.1);
      feedback.push(
        `🌱 Biol fermentado: aporta nutrientes disponibles y microorganismos benéficos. Estimula la microbiota del suelo.`,
      );
      break;
    case "Biofertilizantes":
      fertScore = 0.85;
      feedback.push(
        `🧪 Biofertilizantes (micorrizas + Rhizobium/Azospirillum): mejoran la eficiencia de absorción de N, P y agua. Compatible con agroecología.`,
      );
      break;
    case "Sintético NPK":
      fertScore = 0.65;
      if (config.organicMatterPct < 2) {
        fertScore -= 0.1;
        feedback.push(
          `⚠️ Fertilización sintética en suelos con MO baja (${config.organicMatterPct}%). Riesgo de lixiviación de nitratos. Considere complementar con compost.`,
        );
      } else {
        feedback.push(
          `🧪 Fertilización NPK sintética. Responde rápido pero no mejora la fertilidad del suelo a largo plazo.`,
        );
      }
      break;
    case "Mixto":
      fertScore = 0.8;
      feedback.push(
        `🔄 Fertilización mixta: combina la respuesta rápida de los fertilizantes sintéticos con los beneficios del compost. Buen equilibrio.`,
      );
      break;
  }

  // Relación con la demanda del cultivo
  const nRatio = Math.min(1, nSupply / Math.max(crop.nitrogenDemand, 1));
  const nScore =
    crop.nitrogenFixer
      ? Math.min(1, 0.8 + bioFixationBonus)
      : 0.3 + nRatio * 0.6;

  // Retención de nutrientes según CIC del suelo
  const cicScore = Math.min(1, soil.cec / 30);

  const combinedFactor = Math.min(
    1,
    nScore * 0.5 + fertScore * 0.3 + cicScore * 0.2,
  );

  return { value: combinedFactor, feedback };
}

// ══════════════════════════════════════════════════════════════
//  FACTOR SANITARIO: Manejo de plagas y enfermedades
// ══════════════════════════════════════════════════════════════
function calcPestFactor(
  crop: CropProperties,
  config: SimulationConfig,
): FactorResult {
  const feedback: string[] = [];
  let baseScore = 1;

  switch (config.pestControl) {
    case "Ecológico (Preventivo)":
      baseScore = 0.85 + crop.pestResistance * 0.1;
      feedback.push(
        `🌿 Control ecológico preventivo: rotación, asociación y coberturas. Menor impacto ambiental, protege polinizadores. Pérdidas aceptables del ${Math.round((1 - baseScore) * 100)}%.`,
      );
      break;
    case "Control Biológico":
      baseScore = 0.88 + crop.pestResistance * 0.1;
      feedback.push(
        `🐞 Control biológico (Trichogramma, Crisopas, Bacillus thuringiensis): excelente selectividad, nulo impacto en fauna benéfica. Eficacia alta si se monitorea correctamente.`,
      );
      break;
    case "MIP Agroecológico":
      baseScore = 0.92 + crop.pestResistance * 0.05;
      feedback.push(
        `🔄 MIP Agroecológico: monitoreo + umbrales + control biológico + cultural. El enfoque más equilibrado para producción agroecológica.`,
      );
      break;
    case "Químico Integrado":
      baseScore = 0.9;
      feedback.push(
        `🧪 Control químico integrado: efectivo pero impacta en la fauna benéfica y puede generar resistencias. Use solo cuando supere el UDE.`,
      );
      break;
    case "Ninguno":
      baseScore = 0.5 - crop.pestResistance * 0.2;
      feedback.push(
        `⚠️ Sin control sanitario: las pérdidas por plagas y enfermedades pueden ser significativas (${Math.round((1 - baseScore) * 100)}% estimado). Considere al menos manejo preventivo.`,
      );
      break;
  }

  // Prácticas agroecológicas complementarias
  if (config.useCoverCrop) {
    baseScore += 0.05;
    feedback.push(
      `🌱 Cultivo de cobertura: refugio para controladores biológicos y mejora de la biodiversidad funcional.`,
    );
  }
  if (config.useRotation) {
    baseScore += 0.05;
    feedback.push(
      `🔄 Rotación de cultivos: interrumpe el ciclo de plagas y enfermedades específicas.`,
    );
  }

  return { value: Math.min(1, baseScore), feedback };
}

// ══════════════════════════════════════════════════════════════
//  FACTOR DE ESTACIONALIDAD Y FENOLOGÍA
// ══════════════════════════════════════════════════════════════
function calcSeasonFactor(
  crop: CropProperties,
  config: SimulationConfig,
): FactorResult {
  const feedback: string[] = [];

  const seasonOk = crop.idealSeasons.some((s) => s === config.season) ||
    crop.idealSeasons.includes("Todo el año");

  if (seasonOk) {
    // Bonus si es la estación ideal
    const isIdeal = crop.idealSeasons.includes("Todo el año") ||
      crop.idealSeasons.includes(config.season);
    if (isIdeal) {
      feedback.push(
        `✔️ ${config.season} es una estación adecuada para ${crop.name}.`,
      );
      return { value: 1.0, feedback };
    }
    feedback.push(
      `✅ ${config.season} es aceptable para ${crop.name}.`,
    );
    return { value: 0.85, feedback };
  }

  // Penalización por estación inadecuada
  const isSummerCrop = crop.idealSeasons.includes("Primavera-Verano");
  if (isSummerCrop && config.season === "Otoño-Invierno") {
    feedback.push(
      `❌ ${crop.name} es un cultivo de estación cálida. Sembrar en ${config.season} puede resultar en heladas, bajo crecimiento y pérdida total si hay frost.`,
    );
    return { value: 0.2, feedback };
  }

  if (!isSummerCrop && config.season === "Primavera-Verano") {
    feedback.push(
      `❌ ${crop.name} es un cultivo de estación fría. Sembrar en verano causa estrés térmico, floración precoz y bajo rendimiento.`,
    );
    return { value: 0.25, feedback };
  }

  feedback.push(
    `⚠️ ${config.season} no es la estación óptima para ${crop.name}.`,
  );
  return { value: 0.4, feedback };
}

// ══════════════════════════════════════════════════════════════
//  POLICULTIVO MILPA (Maíz + Poroto + Zapallo)
// ══════════════════════════════════════════════════════════════
function calcPolyculture(
  crop: CropProperties,
  config: SimulationConfig,
  overallFactor: number,
): {
  polycultureYield: number;
  details: string;
  ler: number;
  feedback: string[];
} {
  const fb: string[] = [];

  const maiz = getCropById("maiz");
  const poroto = getCropById("poroto");
  const zapallo = getCropById("zapallo");

  if (!maiz || !poroto || !zapallo) {
    return { polycultureYield: 0, details: "", ler: 1, feedback: [] };
  }

  const maizeYield = Math.round(
    maiz.baseYield + (maiz.maxYield - maiz.baseYield) * overallFactor * 0.85,
  );
  const beanYield = Math.round(
    poroto.baseYield + (poroto.maxYield - poroto.baseYield) * overallFactor * 0.9,
  );
  const squashYield = Math.round(
    zapallo.baseYield + (zapallo.maxYield - zapallo.baseYield) * overallFactor * 0.8,
  );

  const maizePoly = Math.round(maizeYield * 0.6);
  const beanPoly = Math.round(beanYield * 0.5);
  const squashPoly = Math.round(squashYield * 0.4);

  const combinedYield = maizePoly + beanPoly + squashPoly;

  const ler =
    (maizePoly / Math.max(maizeYield, 1)) +
    (beanPoly / Math.max(beanYield, 1)) +
    (squashPoly / Math.max(squashYield, 1));

  const maizeRevenue = maizePoly * maiz.pricePerKg;
  const beanRevenue = beanPoly * poroto.pricePerKg;
  const squashRevenue = squashPoly * zapallo.pricePerKg;
  const totalRevenue = maizeRevenue + beanRevenue + squashRevenue;

  fb.push(
    `🌽🫘🎃 SISTEMA MILPA (Tres Hermanas): Rendimiento combinado de ${combinedYield.toLocaleString("es-AR")} kg/ha.`,
  );
  fb.push(
    `   Maíz: ${maizePoly.toLocaleString("es-AR")} kg · Poroto: ${beanPoly.toLocaleString("es-AR")} kg · Zapallo: ${squashPoly.toLocaleString("es-AR")} kg`,
  );
  fb.push(
    `   LER (Land Equivalent Ratio): ${ler.toFixed(2)} ${ler > 1 ? "✅ Ventaja del policultivo (+" + Math.round((ler - 1) * 100) + "% eficiencia de uso de la tierra)" : "⚠️ Similar al monocultivo"}`,
  );
  fb.push(
    `   Ingreso total milpa: USD ${Math.round(totalRevenue).toLocaleString("es-AR")}/ha (maíz: USD ${Math.round(maizeRevenue)}, poroto: USD ${Math.round(beanRevenue)}, zapallo: USD ${Math.round(squashRevenue)})`,
  );
  fb.push(
    `   Beneficios agroecológicos: el maíz tutorea al poroto, el poroto fija N₂ para los 3 cultivos, el zapallo cubre el suelo reduciendo malezas y evapotranspiración.`,
  );

  return {
    polycultureYield: combinedYield,
    details: `🌽 ${maizePoly.toLocaleString("es-AR")} kg maíz · 🫘 ${beanPoly.toLocaleString("es-AR")} kg poroto · 🎃 ${squashPoly.toLocaleString("es-AR")} kg zapallo`,
    ler: parseFloat(ler.toFixed(2)),
    feedback: fb,
  };
}

// ══════════════════════════════════════════════════════════════
//  SOBERANÍA ALIMENTARIA
// ══════════════════════════════════════════════════════════════
function calcFoodSovereignty(
  crop: CropProperties,
  finalYield: number,
  config: SimulationConfig,
): { proteinPerHa: number; caloriesPerHa: number; peopleFed: number; localScore: number; feedback: string[] } {
  const fb: string[] = [];

  const nutritionMap: Record<string, { protein: number; calories: number }> = {
    maiz:     { protein: 95,   calories: 3650 },
    trigo:    { protein: 120,  calories: 3400 },
    arroz:    { protein: 70,   calories: 3600 },
    sorgo:    { protein: 110,  calories: 3400 },
    cebada:   { protein: 110,  calories: 3400 },
    soja:     { protein: 360,  calories: 4460 },
    girasol:  { protein: 200,  calories: 5800 },
    poroto:   { protein: 220,  calories: 3400 },
    arveja:   { protein: 240,  calories: 3400 },
    garbanzo: { protein: 190,  calories: 3600 },
    tomate:   { protein: 18,   calories: 180 },
    papa:     { protein: 20,   calories: 770 },
    lechuga:  { protein: 15,   calories: 150 },
    cebolla:  { protein: 11,   calories: 400 },
    frutilla: { protein: 7,    calories: 320 },
    zapallo:  { protein: 10,   calories: 260 },
    alfalfa:  { protein: 160,  calories: 2300 },
    avena:    { protein: 110,  calories: 3400 },
    vid:      { protein: 7,    calories: 690 },
    manzano:  { protein: 3,    calories: 520 },
    algodon:  { protein: 0,    calories: 0 },
    caña:     { protein: 0,    calories: 3800 },
    lavanda:  { protein: 0,    calories: 0 },
    menta:    { protein: 0,    calories: 0 },
    eucalipto:{ protein: 0,    calories: 0 },
  };

  const nut = nutritionMap[crop.id];
  if (!nut || nut.calories === 0) {
    fb.push(
      `🥗 Soberanía alimentaria: ${crop.name} no es un cultivo alimentario directo.`,
    );
    return { proteinPerHa: 0, caloriesPerHa: 0, peopleFed: 0, localScore: 50, feedback: fb };
  }

  const proteinKg = parseFloat(((finalYield / 1000) * nut.protein).toFixed(1));
  const caloriesKcal = Math.round((finalYield / 1000) * nut.calories * 1000);
  const peopleFed = parseFloat((caloriesKcal / 365 / 2500).toFixed(1));

  let localScore = 50;
  if (config.fertilizationType === "Orgánico (Compost)" || config.fertilizationType === "Orgánico (Biol)") localScore += 15;
  if (config.fertilizationType === "Biofertilizantes") localScore += 10;
  if (config.pestControl === "MIP Agroecológico" || config.pestControl === "Control Biológico") localScore += 10;
  if (config.pestControl === "Ecológico (Preventivo)") localScore += 12;
  if (config.useCoverCrop) localScore += 5;
  if (config.useRotation) localScore += 5;
  if (config.usePolyculture) localScore += 10;
  if (config.fertilizationType === "Sintético NPK") localScore -= 10;

  localScore = Math.max(0, Math.min(100, localScore));

  fb.push(
    `🥗 SOBERANÍA ALIMENTARIA: ${proteinKg} kg proteína/ha · ${caloriesKcal.toLocaleString("es-AR")} kcal/ha · ` +
    `alimenta a ~${peopleFed} personas/ha/año · Puntaje local: ${localScore}/100`,
  );
  if (localScore >= 70) {
    fb.push(`   ✅ Producción local y agroecológica: fortalece la soberanía alimentaria del territorio.`);
  } else if (localScore >= 40) {
    fb.push(`   🔄 Producción mixta: puede mejorar su autonomía con más prácticas agroecológicas.`);
  } else {
    fb.push(`   ⚠️ Dependencia alta de insumos externos: la soberanía alimentaria está comprometida.`);
  }

  return {
    proteinPerHa: proteinKg,
    caloriesPerHa: caloriesKcal,
    peopleFed,
    localScore,
    feedback: fb,
  };
}

// ══════════════════════════════════════════════════════════════
//  ENERGÍA FÓSIL AHORRADA
// ══════════════════════════════════════════════════════════════
function calcEnergyBalance(
  crop: CropProperties,
  finalYield: number,
  config: SimulationConfig,
  totalWaterUsed: number,
): { energyInput: number; energyOutput: number; netBalance: number; efficiency: number; dieselSaved: number; feedback: string[] } {
  const fb: string[] = [];

  const fertEnergy: Record<string, number> = {
    "Orgánico (Compost)": 5,
    "Orgánico (Biol)": 4,
    "Biofertilizantes": 3,
    "Sintético NPK": 55,
    "Mixto": 30,
  };

  const energyContent: Record<string, number> = {
    maiz: 15.5, trigo: 14.5, arroz: 15.0, sorgo: 14.0, cebada: 14.0,
    soja: 18.5, girasol: 25.0, poroto: 14.0, arveja: 14.0, garbanzo: 14.0,
    tomate: 2.5, papa: 3.5, lechuga: 1.5, cebolla: 2.0, frutilla: 2.0,
    zapallo: 2.0, alfalfa: 8.0, avena: 14.0, vid: 3.0, manzano: 2.5,
    algodon: 10.0, caña: 8.0, lavanda: 5.0, menta: 5.0, eucalipto: 15.0,
  };

  const fertEnergyRate = fertEnergy[config.fertilizationType] ?? 20;
  const nEnergy = config.fertilizerLevel * fertEnergyRate;

  const irrEnergyMap: Record<string, number> = {
    Goteo: 0.5, Aspersión: 0.7, Surco: 0.2, Nebulización: 0.6,
  };
  const irrKwh = totalWaterUsed * (irrEnergyMap[config.irrigationMethod] ?? 0.5);
  const irrEnergy = Math.round(irrKwh * 3.6);

  let machineryEnergy = 800;
  if (config.pestControl === "Químico Integrado") machineryEnergy += 200;
  if (config.useCoverCrop) machineryEnergy += 300;
  if (config.useCompostTea) machineryEnergy += 100;

  const totalInput = Math.round(nEnergy + irrEnergy + machineryEnergy);

  const cropEnergyContent = energyContent[crop.id] ?? 8;
  const output = Math.round((finalYield / 1000) * cropEnergyContent * 1000);

  const netBalance = output - totalInput;
  const efficiency = parseFloat((output / Math.max(totalInput, 1)).toFixed(1));

  const convInput = (config.fertilizerLevel || 40) * 55 +
    totalWaterUsed * 0.2 * 3.6 +
    1500;
  const dieselSaved = parseFloat(
    Math.max(0, ((convInput - totalInput) / 38)).toFixed(1),
  );

  fb.push(
    `⚡ ENERGÍA: Input ${totalInput.toLocaleString("es-AR")} MJ/ha · Output ${output.toLocaleString("es-AR")} MJ/ha · Balance neto: ${netBalance >= 0 ? "+" : ""}${netBalance.toLocaleString("es-AR")} MJ/ha`,
  );
  fb.push(
    `   Eficiencia energética: ${efficiency}:1 (${efficiency >= 3 ? "✅ Alta eficiencia" : efficiency >= 1.5 ? "🔄 Moderada" : "⚠️ Baja eficiencia"}).`,
  );
  if (dieselSaved > 0) {
    fb.push(
      `   🛢️ Ahorro de combustible fósil: ~${dieselSaved} L diésel eq./ha vs manejo convencional (${Math.round(dieselSaved * 2.6)} kg CO₂ eq. evitados).`,
    );
  } else {
    fb.push(`   🛢️ El consumo energético es similar al manejo convencional.`);
  }

  return {
    energyInput: totalInput,
    energyOutput: output,
    netBalance,
    efficiency,
    dieselSaved,
    feedback: fb,
  };
}

// ══════════════════════════════════════════════════════════════
//  MOTOR PRINCIPAL DE SIMULACIÓN
// ══════════════════════════════════════════════════════════════
export function runSimulation(config: SimulationConfig): SimulationResult {
  const crop = getCropById(config.cropId);
  const soil = getSoilById(config.soilId);

  if (!crop || !soil) {
    return {
      cropYield: 0,
      yieldPctOfPotential: 0,
      waterEfficiency: 0,
      totalWaterUsed: 0,
      soilHealthImpact: "Degradación Alta",
      organicMatterChange: "—",
      soilBiodiversityScore: 0,
      financialReturn: -9999,
      productionCost: 0,
      revenue: 0,
      breakEven: false,
      sustainabilityScore: 0,
      carbonFootprint: "Alta",
      biodiversityImpact: "Negativo",
      nitrogenUseEfficiency: 0,
      waterProductivity: 0,
      polycultureActive: false,
      polycultureYield: 0,
      polycultureDetails: "",
      landEquivalentRatio: 1,
      proteinPerHa: 0,
      caloriesPerHa: 0,
      peopleFedPerHa: 0,
      localFoodScore: 50,
      energyInput: 0,
      energyOutput: 0,
      netEnergyBalance: 0,
      energyEfficiency: 0,
      fossilFuelSaved: 0,
      feedback: ["Error: cultivo o suelo no encontrado en la base de datos."],
    };
  }

  const allFeedback: string[] = [];

  // 1) Factor suelo
  const soilRes = calcSoilFactor(crop, soil, config);
  allFeedback.push(...soilRes.feedback);

  // 2) Factor agua
  const waterRes = calcWaterFactor(crop, soil, config);
  allFeedback.push(...waterRes.feedback);

  // 3) Factor nutrientes
  const nutRes = calcNutrientFactor(crop, soil, config);
  allFeedback.push(...nutRes.feedback);

  // 4) Factor sanitario
  const pestRes = calcPestFactor(crop, config);
  allFeedback.push(...pestRes.feedback);

  // 5) Factor estacional
  const seasonRes = calcSeasonFactor(crop, config);
  allFeedback.push(...seasonRes.feedback);

  // ══════════════════════════════════════════════════════
  //  CÁLCULO DEL RENDIMIENTO
  // ══════════════════════════════════════════════════════

  // Peso relativo de cada factor
  const SOIL_WEIGHT = 0.3;
  const WATER_WEIGHT = 0.25;
  const NUTRIENT_WEIGHT = 0.2;
  const PEST_WEIGHT = 0.15;
  const SEASON_WEIGHT = 0.1;

  const overallFactor =
    soilRes.value * SOIL_WEIGHT +
    waterRes.value * WATER_WEIGHT +
    nutRes.value * NUTRIENT_WEIGHT +
    pestRes.value * PEST_WEIGHT +
    seasonRes.value * SEASON_WEIGHT;

  // Rendimiento final entre baseYield y maxYield según el factor general
  const yieldRange = crop.maxYield - crop.baseYield;
  const finalYield = Math.max(
    0,
    Math.round(crop.baseYield + yieldRange * overallFactor),
  );

  const yieldPct = Math.round(overallFactor * 100);

  // ══════════════════════════════════════════════════════
  //  POLICULTIVO (MILPA)
  // ══════════════════════════════════════════════════════
  let polycultureYield = 0;
  let polycultureDetails = "";
  let landEquivalentRatio = 1;
  let polycultureActive = false;

  if (config.usePolyculture) {
    const polyRes = calcPolyculture(crop, config, overallFactor);
    allFeedback.push(...polyRes.feedback);
    polycultureYield = polyRes.polycultureYield;
    polycultureDetails = polyRes.details;
    landEquivalentRatio = polyRes.ler;
    polycultureActive = true;
  }

  // ══════════════════════════════════════════════════════
  //  SOBERANÍA ALIMENTARIA
  // ══════════════════════════════════════════════════════
  const finalYieldForFS = config.usePolyculture ? polycultureYield : finalYield;
  const fsRes = calcFoodSovereignty(crop, finalYieldForFS, config);
  allFeedback.push(...fsRes.feedback);

  // ══════════════════════════════════════════════════════
  //  EFICIENCIA DE AGUA
  // ══════════════════════════════════════════════════════
  const waterEff = Math.round(
    Math.max(
      10,
      Math.min(
        100,
        (crop.idealIrrigationPct / Math.max(config.irrigationLevel, 1)) *
          100 *
          (soil.availableWater / 16),
      ),
    ),
  );
  const totalWaterUsed = Math.round(
    (config.irrigationLevel / 100) * crop.idealIrrigationPct * 6 + 200,
  );

  // ══════════════════════════════════════════════════════
  //  ENERGÍA FÓSIL AHORRADA
  // ══════════════════════════════════════════════════════
  const enRes = calcEnergyBalance(crop, finalYieldForFS, config, totalWaterUsed);
  allFeedback.push(...enRes.feedback);

  // ══════════════════════════════════════════════════════
  //  IMPACTO EN SALUD DEL SUELO
  // ══════════════════════════════════════════════════════
  let soilHealth: SoilHealthImpact = "Estable";
  let moChange = "±0%";
  let bioScore = 50;

  // MO aumenta con prácticas orgánicas
  if (
    config.fertilizationType === "Orgánico (Compost)" ||
    config.fertilizationType === "Orgánico (Biol)"
  ) {
    moChange = `+0.1-0.3% anual (aporte de ${config.fertilizationType})`;
    bioScore += 20;
  }

  if (config.useCoverCrop) {
    moChange = `+0.2-0.5% anual (aporte de cobertura + raíces)`;
    bioScore += 15;
  }

  // MO disminuye con manejo intensivo sintético
  if (config.fertilizationType === "Sintético NPK" && config.organicMatterPct < 2) {
    moChange = "-0.1-0.3% anual (mineralización sin reposición)";
    bioScore -= 15;
  }

  // Evaluación de salud del suelo
  const positivePractices =
    (config.useCoverCrop ? 1 : 0) +
    (config.useRotation ? 1 : 0) +
    (config.fertilizationType === "Orgánico (Compost)" ? 1 : 0) +
    (config.fertilizationType === "Orgánico (Biol)" ? 1 : 0) +
    (config.fertilizationType === "Biofertilizantes" ? 1 : 0) +
    (config.useCompostTea ? 1 : 0);

  const negativePractices =
    (config.fertilizationType === "Sintético NPK" ? 1 : 0) +
    (config.pestControl === "Químico Integrado" ? 1 : 0) +
    (config.pestControl === "Ninguno" ? 1 : 0);

  if (positivePractices >= 3 && negativePractices <= 1) {
    soilHealth = "Mejora";
    bioScore += 15;
  } else if (positivePractices <= 1 && negativePractices >= 2) {
    soilHealth = "Degradación Alta";
    bioScore = Math.max(10, bioScore - 20);
  } else if (positivePractices === 0 && negativePractices >= 2) {
    soilHealth = "Degradación Leve";
    bioScore = Math.max(20, bioScore - 10);
  }

  bioScore = Math.max(0, Math.min(100, bioScore));

  // ══════════════════════════════════════════════════════
  //  CÁLCULO ECONÓMICO
  // ══════════════════════════════════════════════════════
  const revenue = finalYield * crop.pricePerKg;

  const methodCost: Record<string, number> = {
    Goteo: 180,
    Aspersión: 120,
    Surco: 60,
    Nebulización: 150,
  };
  const irrCost = (config.irrigationLevel / 20) * (methodCost[config.irrigationMethod] ?? 100);

  let fertCost = 0;
  switch (config.fertilizationType) {
    case "Orgánico (Compost)":
      fertCost = config.fertilizerLevel * 2.5;
      break;
    case "Orgánico (Biol)":
      fertCost = config.fertilizerLevel * 2.0;
      break;
    case "Biofertilizantes":
      fertCost = config.fertilizerLevel * 3.0;
      break;
    case "Sintético NPK":
      fertCost = config.fertilizerLevel * 4.5;
      break;
    case "Mixto":
      fertCost = config.fertilizerLevel * 3.5;
      break;
  }

  let pestCost = 0;
  switch (config.pestControl) {
    case "Ecológico (Preventivo)":
      pestCost = 60;
      break;
    case "Control Biológico":
      pestCost = 100;
      break;
    case "MIP Agroecológico":
      pestCost = 80;
      break;
    case "Químico Integrado":
      pestCost = 180;
      break;
    case "Ninguno":
      pestCost = 0;
      break;
  }

  const totalCost =
    crop.fixedCostPerHa + irrCost + fertCost + pestCost +
    (config.useCoverCrop ? 80 : 0) +
    (config.useCompostTea ? 40 : 0);

  const profit = Math.round(revenue - totalCost);

  // ══════════════════════════════════════════════════════
  //  SOSTENIBILIDAD Y CARBONO
  // ══════════════════════════════════════════════════════
  let susScore = 50;
  susScore += bioScore * 0.3;
  susScore += waterEff * 0.15;
  susScore +=
    config.fertilizationType === "Orgánico (Compost)" ? 10 :
    config.fertilizationType === "Orgánico (Biol)" ? 8 :
    config.fertilizationType === "Biofertilizantes" ? 8 :
    config.fertilizationType === "Mixto" ? 4 : -5;
  susScore += config.pestControl === "Ecológico (Preventivo)" ? 8 :
    config.pestControl === "Control Biológico" ? 10 :
    config.pestControl === "MIP Agroecológico" ? 12 :
    config.pestControl === "Químico Integrado" ? -3 : -10;
  susScore += config.useCoverCrop ? 8 : 0;
  susScore += config.useRotation ? 5 : 0;

  const finalSusScore = Math.max(0, Math.min(100, Math.round(susScore)));

  const carbonFootprint: "Baja" | "Media" | "Alta" =
    finalSusScore >= 70 ? "Baja" :
    finalSusScore >= 45 ? "Media" : "Alta";

  const bioImpact: "Positivo" | "Neutro" | "Negativo" =
    finalSusScore >= 65 ? "Positivo" :
    finalSusScore >= 40 ? "Neutro" : "Negativo";

  // ══════════════════════════════════════════════════════
  //  EFICIENCIAS TÉCNICAS
  // ══════════════════════════════════════════════════════
  const nApplied = Math.max(1, config.fertilizerLevel);
  const nue = Math.round(finalYield / nApplied);
  const waterProd = parseFloat(
    (finalYield / Math.max(totalWaterUsed / 100, 0.1) / 10).toFixed(1),
  );

  // ══════════════════════════════════════════════════════
  //  ENSAMBLAR RESULTADO
  // ══════════════════════════════════════════════════════
  return {
    cropYield: finalYield,
    yieldPctOfPotential: yieldPct,
    waterEfficiency: waterEff,
    totalWaterUsed,
    soilHealthImpact: soilHealth,
    organicMatterChange: moChange,
    soilBiodiversityScore: bioScore,
    financialReturn: profit,
    productionCost: Math.round(totalCost),
    revenue: Math.round(revenue),
    breakEven: profit >= 0,
    sustainabilityScore: finalSusScore,
    carbonFootprint,
    biodiversityImpact: bioImpact,
    nitrogenUseEfficiency: nue,
    waterProductivity: waterProd,
    polycultureActive,
    polycultureYield,
    polycultureDetails,
    landEquivalentRatio,
    proteinPerHa: fsRes.proteinPerHa,
    caloriesPerHa: fsRes.caloriesPerHa,
    peopleFedPerHa: fsRes.peopleFed,
    localFoodScore: fsRes.localScore,
    energyInput: enRes.energyInput,
    energyOutput: enRes.energyOutput,
    netEnergyBalance: enRes.netBalance,
    energyEfficiency: enRes.efficiency,
    fossilFuelSaved: enRes.dieselSaved,
    feedback: allFeedback,
  };
}
