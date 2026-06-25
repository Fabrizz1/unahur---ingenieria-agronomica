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

export type CropType = "Soja" | "Maíz" | "Trigo" | "Girasol" | "Alfalfa" | "Hortícola (Tomate)";
export type SoilType = "Franco" | "Franco-Arenoso" | "Franco-Arcilloso" | "Arcilloso (Saturado)";
export type Season = "Primavera-Verano" | "Otoño-Invierno";

export interface SimulationConfig {
  cropType: CropType;
  soilType: SoilType;
  irrigationLevel: number;
  fertilizerLevel: number;
  pestControl: "Ecológico" | "Químico Integrado" | "Ninguno";
  season: Season;
}

export interface SimulationResult {
  cropYield: number;
  waterEfficiency: number;
  soilHealthImpact: "Mejora" | "Estable" | "Degradación Leve" | "Degradación Alta";
  financialReturn: number;
  sustainabilityScore: number;
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
