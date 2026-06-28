export interface Subject {
  id: string;
  name: string;
  year: number;
  term: "1° Cuatrimestre" | "2° Cuatrimestre" | "Anual";
  area: "Ciencias Básicas" | "Suelos y Clima" | "Producción Vegetal" | "Producción Animal" | "Tecnología e Ingeniería" | "Socioeconomía y Extensión";
  description: string;
  hours: number;
  correlatives?: string[];
  units?: string[];
  bibliography?: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  skills: string[];
  jobs: string[];
  salaryRange: string;
  icon: string;
  color: string;
}

// ============ SOIL TYPES ============
export type SoilTexture =
  | "Arenoso"
  | "Franco-Arenoso"
  | "Franco"
  | "Franco-Limoso"
  | "Limoso"
  | "Franco-Arcilloso"
  | "Arcilloso"
  | "Orgánico";

export interface SoilProperties {
  id: SoilTexture;
  name: string;
  description: string;
  fieldCapacity: number;        // % agua retenida a CC (-0.33 bar)
  wiltingPoint: number;         // % agua retenida a PMP (-15 bar)
  availableWater: number;       // % agua útil (CC - PMP)
  bulkDensity: number;          // g/cm³
  porosity: number;             // %
  cec: number;                  // meq/100g (CIC)
  organicMatterTypical: string; // rango típico %
  phTypical: [number, number];  // rango típico
  drainage: "Rápido" | "Moderado" | "Lento";
  suitabilitySummary: string;
  compactionRisk: number;       // 0-1
  nutrientRetention: number;    // 0-1
  rootPenetration: number;      // 0-1
  aeration: number;             // 0-1
}

// ============ CROP TYPES ============
export type CropCategory =
  | "Cereal" | "Oleaginosa" | "Legumbre" | "Hortícola"
  | "Forrajera" | "Frutal" | "Industrial" | "Aromática" | "Forestal";

export type GrowthHabit = "Anual" | "Perenne" | "Bianual";

export type Season = "Primavera-Verano" | "Otoño-Invierno" | "Todo el año";

export type IrrigationMethod = "Goteo" | "Aspersión" | "Surco" | "Nebulización";

export type FertilizationType =
  | "Orgánico (Compost)"
  | "Orgánico (Biol)"
  | "Biofertilizantes"
  | "Sintético NPK"
  | "Mixto";

export type PestControl =
  | "Ecológico (Preventivo)"
  | "Control Biológico"
  | "MIP Agroecológico"
  | "Químico Integrado"
  | "Ninguno";

export type SoilHealthImpact =
  | "Mejora"
  | "Estable"
  | "Degradación Leve"
  | "Degradación Alta";

export interface CropSoilPreference {
  texture: SoilTexture;
  suitability: number; // 0-1
  notes: string;
}

export interface CropProperties {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  category: CropCategory;
  habit: GrowthHabit;
  icon: string;

  // ===== RENDIMIENTO =====
  baseYield: number;    // kg/ha típico
  maxYield: number;     // kg/ha potencial
  yieldUnit: "kg/ha" | "tn/ha";

  // ===== ECONÓMICO =====
  pricePerKg: number;   // USD
  fixedCostPerHa: number; // USD/ha

  // ===== AGUA (FAO 56 Kc) =====
  kcInit: number;       // coeficiente de cultivo inicial
  kcMid: number;        // coeficiente de cultivo medio
  kcEnd: number;        // coeficiente de cultivo final
  seasonDays: number;   // duración del ciclo (días)
  idealIrrigationPct: number; // % de la ETc ideal
  droughtTolerance: number;   // 0-1
  waterloggingTolerance: number; // 0-1
  rootingDepth: "Superficial" | "Moderada" | "Profunda";

  // ===== NUTRIENTES =====
  nitrogenDemand: number;   // kg N / ha
  phosphorusDemand: number; // kg P₂O₅ / ha
  potassiumDemand: number;  // kg K₂O / ha
  calciumDemand: number;    // kg CaO / ha
  magnesiumDemand: number;  // kg MgO / ha
  nitrogenFixer: boolean;   // fijación biológica de N₂
  idealPhMin: number;
  idealPhMax: number;
  saltTolerance: number;    // 0-1

  // ===== SUELO =====
  soilPreferences: CropSoilPreference[];

  // ===== FENOLOGÍA =====
  idealSeasons: Season[];
  gddRequirement: number;   // grados día de crecimiento
  baseTemperature: number;  // °C temperatura base
  frostTolerance: number;   // 0-1

  // ===== AGROECOLOGÍA =====
  goodCompanions: string[];
  badCompanions: string[];
  followCrops: string[];
  pestResistance: number;   // 0-1
  mycorrhizalDependency: number; // 0-1

  // ===== DESCRIPCIÓN =====
  description: string;
  agroecologicalNotes: string;
}

// ============ SIMULATION CONFIG ============
export interface SimulationConfig {
  cropId: string;
  soilId: SoilTexture;
  season: Season;
  irrigationLevel: number;      // 0-100 (% de la necesidad)
  irrigationMethod: IrrigationMethod;
  fertilizerLevel: number;      // 0-100 (kg N eq / ha aproximado)
  fertilizationType: FertilizationType;
  pestControl: PestControl;
  organicMatterPct: number;    // 0-10 (% de MO en el suelo)
  soilPh: number;              // 4.0 - 9.0
  useCoverCrop: boolean;
  useRotation: boolean;
  useCompostTea: boolean;
}

// ============ SIMULATION RESULT ============
export interface SimulationResult {
  // Rendimiento
  cropYield: number;            // kg/ha
  yieldPctOfPotential: number;  // % del rendimiento potencial

  // Agua
  waterEfficiency: number;      // 0-100%
  totalWaterUsed: number;       // mm estimados

  // Suelo
  soilHealthImpact: SoilHealthImpact;
  organicMatterChange: string;  // "+0.2%" etc
  soilBiodiversityScore: number; // 0-100

  // Económico
  financialReturn: number;      // USD/ha
  productionCost: number;       // USD/ha
  revenue: number;              // USD/ha
  breakEven: boolean;

  // Ambiental
  sustainabilityScore: number;  // 0-100
  carbonFootprint: "Baja" | "Media" | "Alta";
  biodiversityImpact: "Positivo" | "Neutro" | "Negativo";

  // Técnico
  nitrogenUseEfficiency: number; // kg yield / kg N
  waterProductivity: number;     // kg/m³

  // Feedback
  feedback: string[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface SharedMaterial {
  id: string;
  subjectId: string;
  title: string;
  category: "Apunte" | "Resumen" | "Examen" | "Guía Práctica";
  author: string;
  fileSize: string;
  downloads: number;
  link: string;
  timestamp: string;
  userId?: string;
  userEmail?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorRole: "Estudiante de 1° año" | "Estudiante de 3° año" | "Egresado/a" | "Ayudante de Cátedra" | "Técnico Universitario";
  content: string;
  tags: string[];
  likes: number;
  likedByUser: boolean;
  replies: {
    id: string;
    author: string;
    authorRole: string;
    content: string;
    timestamp: string;
  }[];
  timestamp: string;
  subjectId?: string;
  userId?: string;
  userEmail?: string;
}
