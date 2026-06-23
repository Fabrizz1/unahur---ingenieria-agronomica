import { Subject, CareerPath } from "./types";

export const SUBJECTS_DATA: Subject[] = [
  // ═══ 1° AÑO — 1° CUATRIMESTRE ═══
  {
    id: "intro-desarrollo-agrario",
    name: "Introducción al Desarrollo Agrario",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Primer acercamiento a la profesión agronómica. Sistemas agroalimentarios, territorios periurbanos, agricultura familiar y el rol del ingeniero agrónomo en la región.",
    hours: 64
  },
  {
    id: "ateneo-estudio-casos",
    name: "Ateneo de Estudio de Casos",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Taller de integración donde se analizan casos reales de sistemas productivos intensivos. Resolución de problemas multidisciplinarios con enfoque agroecológico.",
    hours: 64
  },
  {
    id: "agroecologia",
    name: "Agroecología",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Fundamentos ecológicos de la producción agropecuaria. Ciclos de nutrientes, energía en agroecosistemas, biodiversidad y principios de sustentabilidad.",
    hours: 80
  },
  {
    id: "biologia",
    name: "Biología",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Biología celular, genética molecular, tejidos y organismos. Niveles de organización biológica aplicados al estudio de sistemas agropecuarios.",
    hours: 96
  },
  {
    id: "matematica-aplicada",
    name: "Matemática Aplicada",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Álgebra, funciones, cálculo diferencial e integral. Modelado matemático de fenómenos agronómicos como crecimiento de cultivos y balance hídrico.",
    hours: 96
  },
  {
    id: "nuevos-entornos",
    name: "Nuevos Entornos y Lenguajes",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Alfabetización digital, herramientas colaborativas, procesamiento de datos y comunicación audiovisual aplicada al ámbito universitario y profesional.",
    hours: 32
  },
  {
    id: "unahur-1",
    name: "UNAHUR I",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Taller de ambientación universitaria. Derechos estudiantiles, funcionamiento institucional, estrategias de estudio y vida universitaria en la UNAHUR.",
    hours: 32
  },

  // ═══ 1° AÑO — 2° CUATRIMESTRE ═══
  {
    id: "introduccion-botanica",
    name: "Introducción a la Botánica",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Morfología, anatomía y organografía vegetal. Identificación de estructuras vegetativas y reproductivas de especies de interés agronómico.",
    hours: 96,
    correlatives: ["biologia"]
  },
  {
    id: "quimica-general",
    name: "Química General",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Estructura atómica, enlaces, estequiometría, soluciones, equilibrio químico y pH. Bases para entender la química de suelos, agua y agroinsumos.",
    hours: 96,
    correlatives: ["biologia"]
  },
  {
    id: "floricultura-1",
    name: "Floricultura I",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Introducción a la producción de flores de corte y plantas ornamentales. Manejo de vivero, sustratos, propagación y comercialización en el cinturón verde.",
    hours: 80,
    correlatives: ["introduccion-botanica"]
  },
  {
    id: "discusiones-desarrollo",
    name: "Discusiones sobre Desarrollo",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Debate crítico sobre modelos de desarrollo agrario. Teorías del desarrollo, extractivismo, soberanía alimentaria y alternativas desde la economía social.",
    hours: 64
  },
  {
    id: "fundamentos-sanidad-vegetal",
    name: "Fundamentos de Sanidad Vegetal",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Conceptos básicos de sanidad: agentes bióticos y abióticos que afectan cultivos. Principios de diagnóstico y prevención de enfermedades y plagas.",
    hours: 80,
    correlatives: ["biologia"]
  },
  {
    id: "ingles-1",
    name: "Inglés I",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Comprensión lectora de textos técnicos en inglés. Vocabulario específico de ciencias agrarias y producción agropecuaria intensiva.",
    hours: 32
  },

  // ═══ 2° AÑO — 3° CUATRIMESTRE ═══
  {
    id: "ecologia-teorica",
    name: "Ecología Teórica",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Ecosistemas, poblaciones, comunidades y flujos de materia y energía. Sucesión ecológica, nicho, competencia y dinámica de disturbios en agroecosistemas.",
    hours: 80,
    correlatives: ["biologia"]
  },
  {
    id: "bases-produccion-animal",
    name: "Bases Biológicas de la Producción Animal",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Producción Animal",
    description: "Anatomía, fisiología y etología de animales de interés productivo. Manejo reproductivo, sanidad básica y bienestar animal en sistemas intensivos.",
    hours: 80,
    correlatives: ["biologia"]
  },
  {
    id: "horticultura-1",
    name: "Horticultura I",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Producción de hortalizas a campo y bajo cubierta. Implantación de cultivos, rotaciones, manejo de cultivos protegidos y producción estacional en el AMBA.",
    hours: 80,
    correlatives: ["introduccion-botanica", "quimica-general"]
  },
  {
    id: "inmersion-realidad-social",
    name: "Inmersión a la Realidad Social Agraria",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Práctica de campo que vincula al estudiante con productores y organizaciones del territorio. Diagnóstico participativo de problemáticas del cinturón hortícola.",
    hours: 64,
    correlatives: ["discusiones-desarrollo"]
  },
  {
    id: "geografia-agraria",
    name: "Geografía Agraria Nacional",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Regiones agroproductivas argentinas. Uso del suelo, estructura agraria, tenencia de la tierra y conflictos territoriales en el contexto nacional.",
    hours: 64
  },

  // ═══ 2° AÑO — 4° CUATRIMESTRE ═══
  {
    id: "ecofisiologia-vegetal",
    name: "Ecofisiología Vegetal",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Relaciones hídricas, fotosíntesis, respiración y metabolismo vegetal. Respuesta de los cultivos a factores ambientales: radiación, temperatura y agua.",
    hours: 96,
    correlatives: ["introduccion-botanica", "quimica-general"]
  },
  {
    id: "fruticultura-1",
    name: "Fruticultura I",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo de frutales de clima templado. Implantación, poda, injertación, manejo de suelo y cosecha de especies frutícolas regionales.",
    hours: 80,
    correlatives: ["introduccion-botanica"]
  },
  {
    id: "produccion-animal-1",
    name: "Producción Animal I",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Producción Animal",
    description: "Sistemas de producción de carne y leche bovina. Manejo de rodeos, alimentación, sanidad, reproducción e instalaciones para producción intensiva.",
    hours: 96,
    correlatives: ["bases-produccion-animal"]
  },
  {
    id: "economia-social-ecologica",
    name: "Economía Social y Ecológica",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Principios de economía ecológica y solidaria. Valoración de bienes comunes, mercados locales, comercio justo y circuitos cortos de comercialización.",
    hours: 80,
    correlatives: ["discusiones-desarrollo"]
  },
  {
    id: "edafologia-suelos",
    name: "Edafología y Manejo de Suelos",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Génesis, morfología, clasificación y cartografía de suelos. Física, química y biología del suelo. Fertilidad, labranza y conservación de suelos agrícolas.",
    hours: 96,
    correlatives: ["quimica-general", "ecologia-teorica"]
  },

  // ═══ 3° AÑO — 5° CUATRIMESTRE ═══
  {
    id: "manejo-adversidades",
    name: "Manejo Agroecológico de Adversidades",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo ecológico de plagas, enfermedades y malezas. Control biológico, cultural, etológico y químico selectivo. Bioinsumos y monitoreo de adversidades.",
    hours: 96,
    correlatives: ["fundamentos-sanidad-vegetal", "ecologia-teorica"]
  },
  {
    id: "arboricultura-1",
    name: "Arboricultura I",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Producción de especies forestales y ornamentales leñosas. Viveros forestales, plantación, poda de formación y manejo de arbolado urbano y rural.",
    hours: 80,
    correlatives: ["introduccion-botanica"]
  },
  {
    id: "historia-acceso-tierra",
    name: "Historia del Acceso a la Tierra",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Procesos históricos de distribución y concentración de la tierra en Argentina. Reforma agraria, colonización, agricultura familiar y conflictos territoriales.",
    hours: 64,
    correlatives: ["geografia-agraria"]
  },
  {
    id: "nutricion-soberania",
    name: "Nutrición y Soberanía Alimentaria",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Bases de la nutrición humana y animal. Sistemas alimentarios locales, derecho a la alimentación, soberanía vs. seguridad alimentaria y hábitos regionales.",
    hours: 80,
    correlatives: ["economia-social-ecologica"]
  },
  {
    id: "seguridad-practicas",
    name: "Seguridad en Prácticas Agrícolas",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Normativas de higiene y seguridad en el ámbito agropecuario. Manejo seguro de agroquímicos, maquinaria y equipos. Protección personal y ambiental.",
    hours: 32,
    correlatives: ["fundamentos-sanidad-vegetal"]
  },

  // ═══ 3° AÑO — 6° CUATRIMESTRE ═══
  {
    id: "botanica-agricola",
    name: "Botánica Agrícola",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Taxonomía y sistemática de especies cultivadas y espontáneas de interés agronómico. Familias botánicas relevantes: poáceas, fabáceas, solanáceas y asteráceas.",
    hours: 96,
    correlatives: ["introduccion-botanica"]
  },
  {
    id: "analisis-territorios",
    name: "Análisis de Territorios",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Sistemas de Información Geográfica (SIG) aplicados al agro. Teledetección, cartografía temática, zonificación de cultivos y ordenamiento territorial.",
    hours: 80,
    correlatives: ["geografia-agraria", "matematica-aplicada"]
  },
  {
    id: "biofisica-aplicada",
    name: "Biofísica Aplicada",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Principios físicos aplicados a sistemas biológicos. Mecánica de fluidos, termodinámica, radiación, óptica y electricidad en el contexto agropecuario.",
    hours: 80,
    correlatives: ["matematica-aplicada"]
  },
  {
    id: "politicas-desarrollo-territorial",
    name: "Políticas para el Desarrollo Territorial",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Políticas públicas agrarias y de desarrollo rural. Planificación territorial, presupuesto participativo, legislación vigente y organismos de intervención.",
    hours: 64,
    correlatives: ["historia-acceso-tierra"]
  },
  {
    id: "unahur-2",
    name: "UNAHUR II",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Taller de integración y práctica profesional. Elaboración de proyectos, inserción laboral, vinculación con el medio y trayectorias formativas.",
    hours: 32,
    correlatives: ["unahur-1"]
  },

  // ═══ 4° AÑO — 7° CUATRIMESTRE ═══
  {
    id: "floricultura-2",
    name: "Floricultura II",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo avanzado de cultivos florícolas. Propagación comercial, fisiología de floración, poscosecha, fitosanidad y gestión de empresas florícolas.",
    hours: 80,
    correlatives: ["floricultura-1"]
  },
  {
    id: "horticultura-2",
    name: "Horticultura II",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Sistemas intensivos de producción hortícola. Hidroponía, fertirriego, manejo de adversidades en cultivos protegidos y planificación de campañas.",
    hours: 96,
    correlatives: ["horticultura-1", "ecofisiologia-vegetal"]
  },
  {
    id: "biodiversidad-agricola",
    name: "Biodiversidad Agrícola",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Diversidad genética de cultivos y parientes silvestres. Conservación de germoplasma, bancos de semillas, policultivos y servicios ecosistémicos.",
    hours: 80,
    correlatives: ["ecologia-teorica", "botanica-agricola"]
  },
  {
    id: "climatologia-fenologia",
    name: "Climatología y Fenología",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Variables climáticas, balance hídrico, heladas, grados día y fenología de cultivos. Interpretación de cartas climáticas y modelos agroclimáticos.",
    hours: 80,
    correlatives: ["matematica-aplicada"]
  },
  {
    id: "agua-riego",
    name: "Agua y Sistemas de Riego",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Relación agua-suelo-planta. Sistemas de riego presurizado, gravedad y drenaje. Calidad de agua, eficiencia de uso y programación del riego.",
    hours: 80,
    correlatives: ["edafologia-suelos", "biofisica-aplicada"]
  },
  {
    id: "modelos-conocimiento",
    name: "Modelos de Producción de Conocimiento",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Epistemología y metodología de la investigación. Enfoques cuantitativos y cualitativos. Diseño experimental, muestreo y comunicación científica.",
    hours: 64,
    correlatives: ["ecologia-teorica"]
  },
  {
    id: "bioinsumos",
    name: "Bioinsumos Agropecuarios",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Inoculantes biológicos, biofertilizantes, biopesticidas y enmiendas orgánicas. Producción, control de calidad y aplicación en sistemas agroecológicos.",
    hours: 64,
    correlatives: ["manejo-adversidades"]
  },
  {
    id: "ingles-2",
    name: "Inglés II",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Lectura y análisis de publicaciones científicas en inglés. Redacción de abstracts, informes técnicos y comunicación oral en contextos académicos.",
    hours: 32,
    correlatives: ["ingles-1"]
  },

  // ═══ 4° AÑO — 8° CUATRIMESTRE ═══
  {
    id: "taller-bioensayos",
    name: "Taller de Bioensayos",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Diseño y ejecución de ensayos biológicos. Técnicas de laboratorio y campo para evaluar germinación, fitotoxicidad, eficacia de bioinsumos y calidad de suelo.",
    hours: 80,
    correlatives: ["modelos-conocimiento"]
  },
  {
    id: "tecnologias-agricolas",
    name: "Tecnologías Agrícolas",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Maquinaria, equipos e innovaciones tecnológicas para sistemas intensivos. Agricultura de precisión, automatización de invernaderos y trazabilidad digital.",
    hours: 80,
    correlatives: ["biofisica-aplicada"]
  },
  {
    id: "extension-agraria",
    name: "Desarrollo Rural y Extensión Agraria",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Teoría y práctica de la extensión rural. Metodologías participativas, comunicación dialógica, transferencia de tecnología y trabajo con comunidades campesinas.",
    hours: 80,
    correlatives: ["inmersion-realidad-social"]
  },
  {
    id: "turismo-rural",
    name: "Turismo Rural y Periurbano",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Agroturismo, turismo rural y recreación en espacios periurbanos. Planificación de emprendimientos turísticos en establecimientos agropecuarios familiares.",
    hours: 64,
    correlatives: ["economia-social-ecologica"]
  },
  {
    id: "fruticultura-2",
    name: "Fruticultura II",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo especializado de frutales. Riego localizado, nutrición, poda de producción, raleo, control de adversidades y cosecha con criterios de calidad.",
    hours: 80,
    correlatives: ["fruticultura-1", "ecofisiologia-vegetal"]
  },
  {
    id: "arboricultura-2",
    name: "Arboricultura II",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo de plantaciones forestales. Silvicultura, turnos de corta, podas de producción, sanidad forestal y certificación de manejo sustentable.",
    hours: 80,
    correlatives: ["arboricultura-1"]
  },

  // ═══ 5° AÑO — 9° CUATRIMESTRE ═══
  {
    id: "fitomejoramiento",
    name: "Fitomejoramiento",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Métodos de mejoramiento genético vegetal. Selección, hibridación, mutagénesis y biotecnología aplicada al desarrollo de cultivares adaptados al periurbano.",
    hours: 96,
    correlatives: ["biodiversidad-agricola", "botanica-agricola"]
  },
  {
    id: "diseno-agroecosistemas",
    name: "Diseño y Manejo de Agroecosistemas",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Diseño integral de sistemas productivos diversificados. Rotaciones, asociaciones, integración agrícola-ganadera y planificación predial con enfoque agroecológico.",
    hours: 96,
    correlatives: ["horticultura-2", "manejo-adversidades"]
  },
  {
    id: "administracion-agroecosistemas",
    name: "Administración de Agroecosistemas",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Gestión empresarial de establecimientos agropecuarios. Costos, presupuestos, planificación estratégica, certificaciones y comercialización de productos.",
    hours: 80,
    correlatives: ["economia-social-ecologica"]
  },
  {
    id: "electiva",
    name: "Materia Electiva",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Espacio curricular optativo. Ofertas disponibles: Apicultura, Forrajicultura, Cerealicultura o Cannabicultura. Se cursa según la oferta del cuatrimestre.",
    hours: 64,
    correlatives: ["diseno-agroecosistemas"]
  },

  // ═══ 5° AÑO — 10° CUATRIMESTRE ═══
  {
    id: "produccion-animal-2",
    name: "Producción Animal II",
    year: 5,
    term: "2° Cuatrimestre",
    area: "Producción Animal",
    description: "Sistemas alternativos de producción animal. Porcinos, avicultura, ovinos, caprinos y apicultura. Manejo, sanidad, nutrición y comercialización específica.",
    hours: 96,
    correlatives: ["produccion-animal-1"]
  },
  {
    id: "formulacion-proyectos",
    name: "Formulación y Evaluación de Proyectos",
    year: 5,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Metodología de formulación de proyectos agropecuarios. Evaluación social, económica y ambiental. Marco lógico, indicadores y fuentes de financiamiento.",
    hours: 80,
    correlatives: ["administracion-agroecosistemas"]
  },
  {
    id: "taller-integracion-final",
    name: "Taller de Integración Final",
    year: 5,
    term: "Anual",
    area: "Tecnología e Ingeniería",
    description: "Trabajo final integrador que articula los saberes de toda la carrera. Resolución de una problemática real del territorio con intervención profesional supervisada.",
    hours: 160,
    correlatives: ["diseno-agroecosistemas", "formulacion-proyectos"]
  }
];

export const CAREERS_DATA: CareerPath[] = [
  {
    id: "sustainable-production",
    title: "Sustentabilidad y Agroecología",
    description: "Diseño de agroecosistemas que respeten la biodiversidad, preserven el suelo y optimicen recursos naturales sin agroquímicos agresivos. Clave para el cordón verde hortícola local.",
    skills: ["Planificación Agroecológica", "Manejo Orgánico de Suelos", "Control Biológico de Plagas", "Certificaciones Sustentables"],
    jobs: ["Asesor de huertas comunitarias y cooperativas", "Consultor ambiental en municipios", "Inspector de cultivos orgánicos", "Investigador en INTA o universidades"],
    salaryRange: "$$$",
    icon: "Leaf",
    color: "from-emerald-500 to-green-600"
  },
  {
    id: "agrotech",
    title: "Agrotecnología y Agricultura de Precisión",
    description: "Uso de drones, sensores remotos, imágenes satelitales y sistemas de información geográfica (SIG) para optimizar la siembra, fertilización y uso de agua en tiempo real.",
    skills: ["Manejo de Drones Agrícolas", "Sistemas de Información Geográfica", "Análisis de Datos Satelitales", "Monitoreo por Sensores IoT"],
    jobs: ["Especialista en agricultura de precisión", "Analista de telemetría de maquinaria", "Gestor de Big Data agrícola", "Desarrollador de software para campo"],
    salaryRange: "$$$$",
    icon: "Cpu",
    color: "from-teal-500 to-emerald-600"
  },
  {
    id: "genetics-biotech",
    title: "Biotecnología y Fitomejoramiento",
    description: "Investigación y desarrollo de variedades vegetales resistentes a sequías, plagas y suelos salinos. Trabajo en laboratorios moleculares de alta tecnología como los de la UNAHUR.",
    skills: ["Mejoramiento Genético", "Cultivo de Tejidos In Vitro", "Ensayos de Varietales", "Análisis Fitopatológicos"],
    jobs: ["Investigador de semilleros nacionales", "Asistente de laboratorio de biotecnología", "Responsable de desarrollo de cultivares", "Asesor técnico en fitopatología"],
    salaryRange: "$$$$",
    icon: "Dna",
    color: "from-sky-500 to-blue-600"
  },
  {
    id: "extension-development",
    title: "Extensión Rural y Políticas Públicas",
    description: "Vinculación directa con pequeños agricultores y comunidades para transferir tecnologías apropiadas, fomentar el cooperativismo y garantizar la soberanía alimentaria local.",
    skills: ["Dinámicas Grupales", "Formulación de Proyectos Sociales", "Soberanía Alimentaria", "Asistencia Agropecuaria Directa"],
    jobs: ["Extensionista del INTA / Secretaría de Agricultura", "Coordinador de programas de soberanía alimentaria", "Asesor técnico en cooperativas familiares", "Planificador de desarrollo local"],
    salaryRange: "$$",
    icon: "Users",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "business-management",
    title: "Gestión de Agronegocios y Campos",
    description: "Administración integral de empresas agropecuarias, análisis de mercados nacionales y globales de granos y carne, planificación financiera y comercialización agrícola.",
    skills: ["Administración Rural", "Costos Agrícolas y Presupuestos", "Comercialización de Commodities", "Análisis de Proyectos Financieros"],
    jobs: ["Administrador de establecimientos agrícolas", "Comercializador de granos y carnes", "Gerente de cooperativas de acopio", "Consultor de inversiones rurales"],
    salaryRange: "$$$$",
    icon: "Briefcase",
    color: "from-stone-600 to-neutral-800"
  }
];

export const FAQ_DATA = [
  {
    question: "¿Cuáles son los requisitos de inscripción para Ingeniería Agronómica?",
    answer: "Para inscribirte necesitás tener el secundario completo (o constancia de título en trámite) y presentar tu DNI original junto con una copia, partida de nacimiento, foto 4x4 y el formulario de preinscripción online impreso. La inscripción se realiza a través de la web de la UNAHUR durante los períodos habilitados."
  },
  {
    question: "¿Qué es el Curso de Preparación Universitaria (CPU)?",
    answer: "El CPU es un curso introductorio y de acompañamiento obligatorio para todos los ingresantes de la UNAHUR. Consta de tres talleres: Vida Universitaria, Pensamiento Matemático y Comprensión y Producción de Textos. No es eliminatorio ni tiene examen de ingreso, su propósito es nivelar y ayudarte a adaptarte al ámbito universitario."
  },
  {
    question: "¿Puedo cursar si trabajo o tengo otros horarios?",
    answer: "¡Sí, totalmente! La UNAHUR tiene una oferta de comisiones muy amplia en turnos mañana (8:00 a 12:00), tarde (12:00 a 16:00), tarde-noche (16:00 a 20:00) y noche (20:00 a 24:00) para facilitar que las personas que trabajan puedan estudiar. Las materias prácticas a veces requieren salidas de campo concertadas con anticipación los fines de semana."
  },
  {
    question: "¿Dónde se realizan las prácticas de la carrera?",
    answer: "Se combinan prácticas en los laboratorios de química, biología y biotecnología de la UNAHUR (equipados con tecnología de punta), trabajo en parcelas demostrativas locales, visitas técnicas a campos agrícolas-ganaderos de la provincia de Buenos Aires y pasantías en el INTA y empresas agropecuarias de la zona."
  }
];
