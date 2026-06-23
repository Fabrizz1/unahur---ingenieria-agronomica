import { Subject, CareerPath } from "./types";

export const SUBJECTS_DATA: Subject[] = [
  // AÑO 1
  {
    id: "mat-1",
    name: "Matemática General",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Bases del análisis matemático, álgebra, geometría analítica y funciones elementales aplicadas al cálculo de dosis y dimensiones de campo.",
    hours: 96
  },
  {
    id: "qca-1",
    name: "Química General e Inorgánica",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Estructura atómica, enlaces, soluciones, equilibrio químico y reacciones fundamentales para entender el comportamiento de agroquímicos y nutrientes.",
    hours: 96
  },
  {
    id: "intro-agro",
    name: "Introducción a la Agronomía",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Primer contacto con la profesión, sistemas agroalimentarios nacionales, sustentabilidad, soberanía alimentaria y la realidad rural del conurbano bonaerense.",
    hours: 64
  },
  {
    id: "bot-morfo",
    name: "Botánica Morfológica",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Anatomía y morfología de las plantas superiores. Estudio detallado de raíces, tallos, hojas, flores y frutos desde una perspectiva utilitaria.",
    hours: 96,
    correlatives: ["intro-agro"]
  },
  {
    id: "qca-org",
    name: "Química Orgánica",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Compuestos del carbono, carbohidratos, lípidos, proteínas, ácidos nucleicos. Bioquímica de la fotosíntesis y respiración vegetal.",
    hours: 96,
    correlatives: ["qca-1"]
  },

  // AÑO 2
  {
    id: "fisica",
    name: "Física General",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Mecánica, hidrostática, termodinámica y electricidad. Principios físicos aplicados al funcionamiento de bombas de agua, tracción de maquinaria y clima.",
    hours: 96,
    correlatives: ["mat-1"]
  },
  {
    id: "bot-sist",
    name: "Botánica Sistemática",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Clasificación de familias de importancia agronómica. Identificación de malezas, cultivos comerciales, pasturas nativas y especies exóticas.",
    hours: 96,
    correlatives: ["bot-morfo"]
  },
  {
    id: "clima",
    name: "Climatología y Fenología",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Estudio de variables atmosféricas, radiación solar, heladas, vientos y balance hídrico. Interpretación de pronósticos e impacto del cambio climático.",
    hours: 80,
    correlatives: ["mat-1"]
  },
  {
    id: "estadig",
    name: "Bioestadística",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Diseño de experimentos de campo, análisis de varianza, probabilidades y testeo de hipótesis aplicados a la investigación agrícola.",
    hours: 80,
    correlatives: ["mat-1"]
  },
  {
    id: "edafologia",
    name: "Edafología (Suelos)",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Génesis, física, química y biología de suelos. Clasificación de suelos, capacidad de uso, retención de agua y bases de la fertilidad.",
    hours: 96,
    correlatives: ["qca-org"]
  },

  // AÑO 3 (Título Intermedio al completar el año)
  {
    id: "fisio-veg",
    name: "Fisiología Vegetal",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Procesos metabólicos, absorción de agua, nutrición mineral, hormonas vegetales y respuestas al estrés hídrico, salino y térmico.",
    hours: 96,
    correlatives: ["bot-sist", "qca-org"]
  },
  {
    id: "maquinaria",
    name: "Maquinaria Agrícola",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Tractores, sembradoras, cosechadoras y pulverizadoras. Mecánica elemental, mantenimiento, calibración y optimización de uso energético en el lote.",
    hours: 80,
    correlatives: ["fisica"]
  },
  {
    id: "microbiologia",
    name: "Microbiología Agrícola",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Bacterias, hongos y virus del suelo y plantas. Fijación biológica del nitrógeno, micorrizas y compostaje biológico.",
    hours: 80,
    correlatives: ["qca-org"]
  },
  {
    id: "zoologia",
    name: "Zoología Agrícola",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Estudio de insectos, ácaros y nematodos de interés agrícola. Manejo integrado de plagas, ecología de insectos benéficos y polinizadores.",
    hours: 96,
    correlatives: ["bot-sist"]
  },
  {
    id: "nutri-animal",
    name: "Bases de la Nutrición Animal",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Producción Animal",
    description: "Fisiología de la digestión en rumiantes y no rumiantes. Valoración nutritiva de forrajes, formulación de raciones y balance nutricional.",
    hours: 80,
    correlatives: ["qca-org"]
  },

  // AÑO 4
  {
    id: "fitopatologia",
    name: "Fitopatología",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Enfermedades bióticas y abióticas de los cultivos. Hongos, bacterias, virus y fitoplasmas patógenos. Métodos de diagnóstico e identificación.",
    hours: 96,
    correlatives: ["microbiologia", "fisio-veg"]
  },
  {
    id: "genetica",
    name: "Genética y Mejoramiento",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Leyes de herencia, genética de poblaciones, biotecnología aplicada. Métodos tradicionales e ingeniería genética para mejorar cultivos frente a sequías o plagas.",
    hours: 96,
    correlatives: ["fisio-veg", "estadig"]
  },
  {
    id: "cultivos-grano",
    name: "Producción de Cultivos de Grano",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Tecnología de producción de soja, maíz, trigo, girasol y cebada. Épocas de siembra, densidades, fertilización y cosecha eficiente.",
    hours: 112,
    correlatives: ["fisio-veg", "edafologia"]
  },
  {
    id: "horticultura",
    name: "Horticultura y Floricultura",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Producción intensiva de hortalizas y flores. Cultivos protegidos bajo invernadero, hidroponía y cinturones verdes urbanos bonaerenses.",
    hours: 96,
    correlatives: ["fisio-veg"]
  },
  {
    id: "pasturas",
    name: "Producción y Manejo de Pasturas",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Producción Animal",
    description: "Especies forrajeras clave. Establecimiento y manejo del pastoreo, curvas de crecimiento de forraje y reservas (henificación y silaje).",
    hours: 96,
    correlatives: ["fisio-veg", "edafologia"]
  },

  // AÑO 5
  {
    id: "riego",
    name: "Riego y Drenaje",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Sistemas de riego localizado (goteo), aspersión y gravedad. Calidad de agua de riego, necesidades hídricas y drenaje de terrenos anegados.",
    hours: 80,
    correlatives: ["edafologia", "fisica"]
  },
  {
    id: "ganaderia",
    name: "Sistemas de Producción Ganadera",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Producción Animal",
    description: "Producción de carne bovina, lechería (tambo), porcinos y aves. Modelos pastoriles, semi-intensivos y feedlots con criterio de bienestar animal.",
    hours: 112,
    correlatives: ["pasturas", "nutri-animal"]
  },
  {
    id: "agroecologia",
    name: "Agroecología y Sistemas Sustentables",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Diseño y manejo de agroecosistemas sustentables. Biodiversidad, manejo ecológico de plagas, fertilización orgánica y transición agroecológica.",
    hours: 80,
    correlatives: ["cultivos-grano", "zoologia"]
  },
  {
    id: "agro-eco",
    name: "Economía y Administración Agraria",
    year: 5,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Costos agropecuarios, mercados de granos y carnes, formulación de proyectos de inversión agrícola y administración de empresas familiares.",
    hours: 80,
    correlatives: ["mat-1"]
  },
  {
    id: "extension",
    name: "Extensión y Desarrollo Rural",
    year: 5,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Metodologías de comunicación, capacitación a pequeños y medianos productores, cooperativas agrícolas y desarrollo territorial sustentable.",
    hours: 64,
    correlatives: ["intro-agro"]
  },
  {
    id: "tfi",
    name: "Trabajo Final de Aplicación (TFI)",
    year: 5,
    term: "Anual",
    area: "Tecnología e Ingeniería",
    description: "Integración de conocimientos mediante un proyecto de resolución de una problemática real en un campo productivo o laboratorio de la UNAHUR.",
    hours: 160,
    correlatives: ["cultivos-grano", "ganaderia"]
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
    question: "¿Tengo algún título intermedio?",
    answer: "Sí. Al completar las materias correspondientes a los primeros 3 años de la carrera, obtenés el título intermedio de **Técnico/a Universitario/a en Producción Agropecuaria**, el cual tiene una excelente salida laboral directa en establecimientos ganaderos, agrícolas y hortícolas."
  },
  {
    question: "¿Dónde se realizan las prácticas de la carrera?",
    answer: "Se combinan prácticas en los laboratorios de química, biología y biotecnología de la UNAHUR (equipados con tecnología de punta), trabajo en parcelas demostrativas locales, visitas técnicas a campos agrícolas-ganaderos de la provincia de Buenos Aires y pasantías en el INTA y empresas agropecuarias de la zona."
  }
];
