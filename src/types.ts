export interface Subject {
  id: string;
  name: string;
  year: number; // 1 to 5
  term: "1° Cuatrimestre" | "2° Cuatrimestre" | "Anual";
  area: "Ciencias Básicas" | "Suelos y Clima" | "Producción Vegetal" | "Producción Animal" | "Tecnología e Ingeniería" | "Socioeconomía y Extensión";
  description: string;
  hours: number;
  correlatives?: string[]; // Subject IDs that must be completed or cursadas
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

export type CropType = "Soja" | "Maíz" | "Trigo" | "Girasol" | "Alfalfa" | "Hortícola (Tomate)";
export type SoilType = "Franco" | "Franco-Arenoso" | "Franco-Arcilloso" | "Arcilloso (Saturado)";
export type Season = "Primavera-Verano" | "Otoño-Invierno";

export interface SimulationConfig {
  cropType: CropType;
  soilType: SoilType;
  irrigationLevel: number; // 0 (none) to 100 (maximum)
  fertilizerLevel: number; // 0 to 100
  pestControl: "Ecológico" | "Químico Integrado" | "Ninguno";
  season: Season;
}

export interface SimulationResult {
  cropYield: number; // kg/ha
  waterEfficiency: number; // %
  soilHealthImpact: "Mejora" | "Estable" | "Degradación Leve" | "Degradación Alta";
  financialReturn: number; // USD/ha profit or loss
  sustainabilityScore: number; // 0 to 100
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
}
