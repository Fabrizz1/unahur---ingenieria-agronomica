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
    hours: 64,
    units: [
      "Sistemas agroalimentarios",
      "Territorios periurbanos",
      "Agricultura familiar",
      "Rol del ingeniero agrónomo en la región"
    ],
    bibliography: [
      "Freire, P. ¿Extensión o Comunicación? La Concientización en el Medio Rural. 1973.",
      "INTA. Manual de Extensión Rural. Buenos Aires.",
      "Schejtman, A. & Berdegué, J. Desarrollo Territorial Rural. RIMISP, 2004."
    ]
  },
  {
    id: "ateneo-estudio-casos",
    name: "Ateneo de Estudio de Casos",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Taller de integración donde se analizan casos reales de sistemas productivos intensivos. Resolución de problemas multidisciplinarios con enfoque agroecológico.",
    hours: 64,
    units: [
      "Metodología de estudio de casos",
      "Análisis de sistemas productivos intensivos",
      "Resolución multidisciplinaria de problemas",
      "Integración de saberes agronómicos",
      "Presentación y discusión de casos"
    ],
    bibliography: [
      "Yin, R. Case Study Research: Design and Methods. Sage, 2014.",
      "Chevallard, Y. La Transposición Didáctica. Aique, 1997.",
      "Schön, D. El Profesional Reflexivo. Paidós, 1983."
    ]
  },
  {
    id: "agroecologia",
    name: "Agroecología",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Fundamentos ecológicos de la producción agropecuaria. Ciclos de nutrientes, energía en agroecosistemas, biodiversidad y principios de sustentabilidad.",
    hours: 80,
    units: [
      "Principios ecológicos aplicados a la agricultura",
      "Ciclos de nutrientes y flujo de energía en agroecosistemas",
      "Biodiversidad funcional y servicios ecosistémicos",
      "Sustentabilidad: dimensión ecológica, social y económica",
      "Agroecología como ciencia, práctica y movimiento"
    ],
    bibliography: [
      "Gliessman, S. Agroecología: Procesos Ecológicos en Agricultura Sostenible. CATIE, 2002.",
      "Altieri, M. Agroecología: Bases Científicas para una Agricultura Sustentable. Nordan, 1999.",
      "Sarandón, S. Agroecología: El Camino Hacia una Agricultura Sustentable. Ediciones INTA, 2020."
    ]
  },
  {
    id: "biologia",
    name: "Biología",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Biología celular, genética molecular, tejidos y organismos. Niveles de organización biológica aplicados al estudio de sistemas agropecuarios.",
    hours: 96,
    units: [
      "Composición química de la materia viva",
      "Estructura y función celular: procariotas y eucariotas",
      "Ciclo celular, mitosis y meiosis",
      "Genética molecular: ADN, ARN y síntesis de proteínas",
      "Tejidos vegetales y animales",
      "Niveles de organización biológica"
    ],
    bibliography: [
      "Campbell, N. & Reece, J. Biología. Editorial Médica Panamericana, 2007.",
      "Alberts, B. et al. Biología Molecular de la Célula. Omega, 2010.",
      "Solomon, E. et al. Biología. McGraw Hill, 2013."
    ]
  },
  {
    id: "matematica-aplicada",
    name: "Matemática Aplicada",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Álgebra, funciones, cálculo diferencial e integral. Modelado matemático de fenómenos agronómicos como crecimiento de cultivos y balance hídrico.",
    hours: 96,
    units: [
      "Números reales, ecuaciones e inecuaciones",
      "Funciones: lineales, cuadráticas, exponenciales y logarítmicas",
      "Límites, derivadas y aplicaciones",
      "Integrales y cálculo de áreas",
      "Modelado matemático en agronomía",
      "Estadística descriptiva y probabilidades"
    ],
    bibliography: [
      "Stewart, J. Cálculo de Una Variable. Cengage Learning, 2012.",
      "Leithold, L. El Cálculo. Oxford University Press, 1998.",
      "Devore, J. Probabilidad y Estadística para Ingeniería y Ciencias. Cengage, 2016."
    ]
  },
  {
    id: "nuevos-entornos",
    name: "Nuevos Entornos y Lenguajes",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Alfabetización digital, herramientas colaborativas, procesamiento de datos y comunicación audiovisual aplicada al ámbito universitario y profesional.",
    hours: 32,
    units: [
      "Alfabetización digital y ciudadanía digital",
      "Herramientas colaborativas en la nube",
      "Procesamiento de datos con planillas de cálculo",
      "Comunicación audiovisual y presentaciones efectivas",
      "Ética y seguridad en entornos digitales"
    ],
    bibliography: [
      "Area Moreira, M. Introducción a la Tecnología Educativa. Universidad de La Laguna, 2009.",
      "Burbules, N. & Callister, T. Riesgos y Promesas de las Nuevas Tecnologías. Granica, 2006.",
      "Litwin, E. Tecnologías Educativas en Tiempos de Internet. Paidós, 2005."
    ]
  },
  {
    id: "unahur-1",
    name: "UNAHUR I",
    year: 1,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Taller de ambientación universitaria. Derechos estudiantiles, funcionamiento institucional, estrategias de estudio y vida universitaria en la UNAHUR.",
    hours: 32,
    units: [
      "Ambientación universitaria",
      "Derechos estudiantiles",
      "Funcionamiento institucional de la UNAHUR",
      "Estrategias de estudio y aprendizaje",
      "Vida universitaria y participación"
    ],
    bibliography: [
      "UNAHUR. Guía del Ingresante.",
      "UNAHUR. Reglamento General de Alumnos.",
      "Carlino, P. Escribir, Leer y Aprender en la Universidad. FCE, 2005."
    ]
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
    correlatives: ["biologia"],
    units: [
      "La célula vegetal: pared celular, plastidios y vacuola",
      "Tejidos vegetales: meristemáticos, protectores, fundamentales, vasculares",
      "Morfología de raíz, tallo y hojas",
      "Organografía reproductiva: flor, fruto y semilla",
      "Anatomía comparada de monocotiledóneas y dicotiledóneas",
      "Identificación de especies de interés agronómico"
    ],
    bibliography: [
      "Esau, K. Anatomía Vegetal. Omega, 1982.",
      "Strassburger, E. Tratado de Botánica. Omega, 2004.",
      "Valla, J.J. Botánica: Morfología de las Plantas Superiores. Hemisferio Sur, 2005."
    ]
  },
  {
    id: "quimica-general",
    name: "Química General",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Estructura atómica, enlaces, estequiometría, soluciones, equilibrio químico y pH. Bases para entender la química de suelos, agua y agroinsumos.",
    hours: 96,
    correlatives: ["biologia"],
    units: [
      "Estructura atómica y tabla periódica",
      "Enlaces químicos: iónico, covalente y metálico",
      "Estequiometría y reacciones químicas",
      "Soluciones, concentraciones y propiedades coligativas",
      "Equilibrio químico y pH",
      "Química orgánica: grupos funcionales básicos"
    ],
    bibliography: [
      "Chang, R. Química General. McGraw Hill, 2010.",
      "Brown, T. et al. Química: La Ciencia Central. Pearson, 2009.",
      "Atkins, P. & Jones, L. Principios de Química. Editorial Médica Panamericana, 2012."
    ]
  },
  {
    id: "floricultura-1",
    name: "Floricultura I",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Introducción a la producción de flores de corte y plantas ornamentales. Manejo de vivero, sustratos, propagación y comercialización en el cinturón verde.",
    hours: 80,
    correlatives: ["introduccion-botanica"],
    units: [
      "Importancia de la floricultura en Argentina y el AMBA",
      "Sustratos, contenedores y manejo de vivero",
      "Propagación sexual y asexual de ornamentales",
      "Fertirriego y nutrición de plantas florícolas",
      "Poscosecha de flores de corte",
      "Comercialización y mercado florícola"
    ],
    bibliography: [
      "Larson, R.A. Introduction to Floriculture. Academic Press, 1992.",
      "Argerich, C. & Troilo, L. Manual de Floricultura. INTA, 2008.",
      "Hessayon, D.G. El Experto en Plantas de Interior. Editorial Hessayon, 2000."
    ]
  },
  {
    id: "discusiones-desarrollo",
    name: "Discusiones sobre Desarrollo",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Debate crítico sobre modelos de desarrollo agrario. Teorías del desarrollo, extractivismo, soberanía alimentaria y alternativas desde la economía social.",
    hours: 64,
    units: [
      "Pensamiento ambiental latinoamericano",
      "Extractivismo y ecología política",
      "Bienes comunes y cercamientos",
      "Buen Vivir / Sumak Kawsay",
      "Decrecimiento y posdesarrollo"
    ],
    bibliography: [
      "Gudynas, E. Extractivismos y Ecología Política. 2015.",
      "Acosta, A. El Buen Vivir. Icaria, 2013.",
      "Martínez Alier, J. El Ecologismo de los Pobres. Icaria, 2005.",
      "Polanyi, K. La Gran Transformación. FCE, 1944."
    ]
  },
  {
    id: "fundamentos-sanidad-vegetal",
    name: "Fundamentos de Sanidad Vegetal",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Conceptos básicos de sanidad: agentes bióticos y abióticos que afectan cultivos. Principios de diagnóstico y prevención de enfermedades y plagas.",
    hours: 80,
    correlatives: ["biologia"],
    units: [
      "Conceptos de sanidad vegetal y pérdidas económicas",
      "Agentes bióticos: hongos, bacterias, virus, nematodos e insectos",
      "Agentes abióticos: estrés hídrico, térmico y nutricional",
      "Síntomas y signos: diagnóstico de enfermedades",
      "Principios de prevención y manejo integrado",
      "Muestreo y monitoreo de adversidades"
    ],
    bibliography: [
      "Agrios, G.N. Fitopatología. Limusa, 2005.",
      "CABI. Manual de Fitopatología. CAB International, 2010.",
      "Fernández Valiela, M.V. Introducción a la Fitopatología. INTA, 1998."
    ]
  },
  {
    id: "ingles-1",
    name: "Inglés I",
    year: 1,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Comprensión lectora de textos técnicos en inglés. Vocabulario específico de ciencias agrarias y producción agropecuaria intensiva.",
    hours: 32,
    units: [
      "Estrategias de lectura: skimming y scanning",
      "Vocabulario técnico de ciencias agrarias",
      "Estructura de textos científicos en inglés",
      "Traducción de resúmenes y abstracts",
      "Comprensión de artículos de divulgación"
    ],
    bibliography: [
      "Swales, J. & Feak, C. Academic Writing for Graduate Students. Michigan Press, 2004.",
      "Murphy, R. English Grammar in Use. Cambridge University Press, 2012.",
      "Diccionario Oxford de Ciencias Agrarias. Oxford University Press."
    ]
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
    correlatives: ["biologia"],
    units: [
      "Conceptos fundamentales de ecología",
      "Dinámica de poblaciones: crecimiento, competencia y regulación",
      "Estructura y función de comunidades ecológicas",
      "Flujo de energía y ciclos biogeoquímicos",
      "Sucesión ecológica y disturbios",
      "Ecología del paisaje y fragmentación"
    ],
    bibliography: [
      "Krebs, C.J. Ecología: Estudio de la Distribución y la Abundancia. Oxford, 2014.",
      "Odum, E. Ecología. Interamericana, 1972.",
      "Begon, M. et al. Ecología: Individuos, Poblaciones y Comunidades. Omega, 2006."
    ]
  },
  {
    id: "bases-produccion-animal",
    name: "Bases Biológicas de la Producción Animal",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Producción Animal",
    description: "Anatomía, fisiología y etología de animales de interés productivo. Manejo reproductivo, sanidad básica y bienestar animal en sistemas intensivos.",
    hours: 80,
    correlatives: ["biologia"],
    units: [
      "Anatomía y fisiología comparada de animales domésticos",
      "Sistemas digestivos: monogástricos y poligástricos",
      "Reproducción animal: ciclo estral, gestación y parto",
      "Etología y bienestar animal en sistemas intensivos",
      "Sanidad básica: prevención y manejo de enfermedades",
      "Nutrición y requerimientos alimenticios"
    ],
    bibliography: [
      "Cunningham, J.G. Fisiología Veterinaria. Elsevier, 2013.",
      "McDonald, P. et al. Nutrición Animal. Acribia, 2010.",
      "Broom, D. & Fraser, A. Comportamiento y Bienestar Animal. Acribia, 2005."
    ]
  },
  {
    id: "horticultura-1",
    name: "Horticultura I",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Producción de hortalizas a campo y bajo cubierta. Implantación de cultivos, rotaciones, manejo de cultivos protegidos y producción estacional en el AMBA.",
    hours: 80,
    correlatives: ["introduccion-botanica", "quimica-general"],
    units: [
      "Importancia de la horticultura en el AMBA",
      "Implantación de cultivos: siembra directa y trasplante",
      "Rotaciones y asociaciones de cultivos",
      "Cultivos protegidos: invernaderos y túneles",
      "Manejo estacional y planificación de campaña",
      "Cosecha, poscosecha y comercialización hortícola"
    ],
    bibliography: [
      "Krarup, C. & Moreira, I. Horticultura General. Pontificia Universidad Católica de Chile, 2000.",
      "INTA. Manual de Horticultura. Buenos Aires, 2015.",
      "Maroto, J.V. Horticultura Herbácea Especial. Mundi-Prensa, 2008."
    ]
  },
  {
    id: "inmersion-realidad-social",
    name: "Inmersión a la Realidad Social Agraria",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Práctica de campo que vincula al estudiante con productores y organizaciones del territorio. Diagnóstico participativo de problemáticas del cinturón hortícola.",
    hours: 64,
    correlatives: ["discusiones-desarrollo"],
    units: [
      "Práctica de campo y vinculación territorial",
      "Relacionamiento con productores y organizaciones",
      "Diagnóstico participativo de problemáticas",
      "Caracterización del cinturón hortícola",
      "Herramientas de relevamiento social"
    ],
    bibliography: [
      "Freire, P. ¿Extensión o Comunicación? 1973.",
      "INTA. Manual de Extensión Rural. Buenos Aires.",
      "Geilfus, F. 80 Herramientas para el Desarrollo Participativo. IICA, 2002."
    ]
  },
  {
    id: "geografia-agraria",
    name: "Geografía Agraria Nacional",
    year: 2,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Regiones agroproductivas argentinas. Uso del suelo, estructura agraria, tenencia de la tierra y conflictos territoriales en el contexto nacional.",
    hours: 64,
    units: [
      "Regiones agroproductivas de Argentina",
      "Uso del suelo y aptitud agrícola",
      "Estructura agraria: minifundio, PyME y latifundio",
      "Tenencia de la tierra: formas y conflictos",
      "Periurbanos y agricultura familiar",
      "Cartografía agraria y sistemas de información"
    ],
    bibliography: [
      "Barsky, O. & Gelman, J. Historia del Agro Argentino. 2009.",
      "CNA 2018/2022. Censo Nacional Agropecuario.",
      "INDEC. Mapas de Regiones Agrícolas. 2020."
    ]
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
    correlatives: ["introduccion-botanica", "quimica-general"],
    units: [
      "Relaciones hídricas: potencial hídrico y transpiración",
      "Fotosíntesis: mecanismos C3, C4 y CAM",
      "Respiración y metabolismo vegetal",
      "Radiación solar e índice de área foliar",
      "Efectos de la temperatura: grados día y estrés térmico",
      "Balance de carbono y productividad de cultivos"
    ],
    bibliography: [
      "Taiz, L. & Zeiger, E. Fisiología Vegetal. Universitat Jaume I, 2006.",
      "Lambers, H. et al. Plant Physiological Ecology. Springer, 2008.",
      "Salisbury, F. & Ross, C. Fisiología de las Plantas. Paraninfo, 2000."
    ]
  },
  {
    id: "fruticultura-1",
    name: "Fruticultura I",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo de frutales de clima templado. Implantación, poda, injertación, manejo de suelo y cosecha de especies frutícolas regionales.",
    hours: 80,
    correlatives: ["introduccion-botanica"],
    units: [
      "Importancia de la fruticultura templada en Argentina",
      "Implantación de montes frutales: marco de plantación y diseño",
      "Poda de formación, producción y renovación",
      "Injertación: técnicas y portainjertos",
      "Manejo de suelo y cobertura vegetal",
      "Cosecha, madurez y poscosecha"
    ],
    bibliography: [
      "Gil, G. Fruticultura: El Potencial Productivo. Universidad Católica de Chile, 2004.",
      "Sozzi, G. Árboles Frutales: Ecofisiología, Cultivo y Aprovechamiento. FAUBA, 2014.",
      "Westwood, M.N. Fruticultura. Acribia, 1982."
    ]
  },
  {
    id: "produccion-animal-1",
    name: "Producción Animal I",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Producción Animal",
    description: "Sistemas de producción de carne y leche bovina. Manejo de rodeos, alimentación, sanidad, reproducción e instalaciones para producción intensiva.",
    hours: 96,
    correlatives: ["bases-produccion-animal"],
    units: [
      "Sistemas de producción bovina: cría, recría y engorde",
      "Manejo reproductivo: sincronización e inseminación artificial",
      "Alimentación y nutrición del rodeo",
      "Sanidad bovina: enfermedades y plan sanitario",
      "Producción lechera: ordeño, calidad de leche y tambo",
      "Instalaciones y bienestar animal en feedlot"
    ],
    bibliography: [
      "INTA. Manual de Producción Bovina. Buenos Aires, 2010.",
      "McDonald, P. et al. Nutrición Animal. Acribia, 2010.",
      "Cunningham, J.G. Fisiología Veterinaria. Elsevier, 2013."
    ]
  },
  {
    id: "economia-social-ecologica",
    name: "Economía Social y Ecológica",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Principios de economía ecológica y solidaria. Valoración de bienes comunes, mercados locales, comercio justo y circuitos cortos de comercialización.",
    hours: 80,
    correlatives: ["discusiones-desarrollo"],
    units: [
      "Economía clásica y neoclásica: oferta, demanda y costos",
      "Economía social y solidaria: cooperativas y ESS",
      "Economía ecológica: huella ecológica y decrecimiento",
      "Administración de agroecosistemas",
      "Evaluación financiera: VAN, TIR y relación B/C"
    ],
    bibliography: [
      "Coraggio, J.L. Economía Social y Solidaria. 2011.",
      "Martínez Alier, J. El Ecologismo de los Pobres. Icaria, 2005.",
      "Polanyi, K. La Gran Transformación. FCE, 1944.",
      "Sapag Chain, N. Preparación y Evaluación de Proyectos. McGraw Hill."
    ]
  },
  {
    id: "edafologia-suelos",
    name: "Edafología y Manejo de Suelos",
    year: 2,
    term: "2° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Génesis, morfología, clasificación y cartografía de suelos. Física, química y biología del suelo. Fertilidad, labranza y conservación de suelos agrícolas.",
    hours: 96,
    correlatives: ["quimica-general", "ecologia-teorica"],
    units: [
      "Génesis y morfología del suelo: perfil, horizontes y propiedades",
      "Clasificación de suelos: taxonomía y capacidad de uso",
      "Física del suelo: textura, estructura, porosidad y densidad",
      "Química del suelo: pH, materia orgánica, CIC y nutrientes",
      "Biología del suelo: microorganismos, macrofauna y descomposición",
      "Labranza, compactación y conservación de suelos"
    ],
    bibliography: [
      "Porta Casanellas, J. et al. Edafología. Mundi-Prensa, 2014.",
      "INTA. Cartas de Suelos de la República Argentina.",
      "Navarro, G. & Navarro, S. Química Agrícola. Mundi-Prensa, 2013."
    ]
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
    correlatives: ["fundamentos-sanidad-vegetal", "ecologia-teorica"],
    units: [
      "Principios del Manejo Integrado de Plagas (MIP)",
      "Control biológico: parasitoides, depredadores y entomopatógenos",
      "Control cultural y etológico",
      "Manejo ecológico de malezas",
      "Control químico selectivo y resistencia",
      "Monitoreo, muestreo y umbrales de daño"
    ],
    bibliography: [
      "Metcalf, R. & Luckmann, W. Introducción al Manejo de Plagas. Limusa, 1994.",
      "Nicholls, C. Control Biológico de Plagas. CATIE, 2008.",
      "Altieri, M. & Nicholls, C. Control de Plagas con Enfoque Agroecológico. 2011."
    ]
  },
  {
    id: "arboricultura-1",
    name: "Arboricultura I",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Producción de especies forestales y ornamentales leñosas. Viveros forestales, plantación, poda de formación y manejo de arbolado urbano y rural.",
    hours: 80,
    correlatives: ["introduccion-botanica"],
    units: [
      "Importancia de la arboricultura urbana y rural",
      "Viveros forestales: producción de plantines",
      "Especies forestales nativas y exóticas de Argentina",
      "Plantación, tutorado y poda de formación",
      "Manejo de arbolado urbano: criterios de riesgo",
      "Sanidad forestal: plagas y enfermedades clave"
    ],
    bibliography: [
      "INTA. Manual de Viveros Forestales. Buenos Aires.",
      "Shigo, A. Modern Arboriculture. Shigo and Trees, 1991.",
      "Giménez, A. & Moglia, J. Árboles Nativos de Argentina. Editorial UNSE, 2005."
    ]
  },
  {
    id: "historia-acceso-tierra",
    name: "Historia del Acceso a la Tierra",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Procesos históricos de distribución y concentración de la tierra en Argentina. Reforma agraria, colonización, agricultura familiar y conflictos territoriales.",
    hours: 64,
    correlatives: ["geografia-agraria"],
    units: [
      "Herencia colonial y Ley de Enfiteusis",
      "Campaña del Desierto y modelo agroexportador",
      "Ley de Arrendamientos y reforma agraria peronista",
      "Revolución Verde y neoliberalismo",
      "Sojización y Ley de Agricultura Familiar (27.118)",
      "Estructura agraria actual (CNA 2018/2022)"
    ],
    bibliography: [
      "Barsky, O. & Gelman, J. Historia del Agro Argentino. 2009.",
      "Giberti, H. Historia Económica de la Ganadería Argentina. 1954.",
      "Ley 27.118 de Agricultura Familiar.",
      "CNA 2018/2022. Censo Nacional Agropecuario."
    ]
  },
  {
    id: "nutricion-soberania",
    name: "Nutrición y Soberanía Alimentaria",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Bases de la nutrición humana y animal. Sistemas alimentarios locales, derecho a la alimentación, soberanía vs. seguridad alimentaria y hábitos regionales.",
    hours: 80,
    correlatives: ["economia-social-ecologica"],
    units: [
      "Nutrición humana: macro y micronutrientes",
      "Leyes de alimentación y requerimientos nutricionales",
      "Soberanía alimentaria vs seguridad alimentaria",
      "Agricultura familiar como pilar del sistema alimentario",
      "Mercados locales y circuitos cortos",
      "Derecho a la alimentación (Art. 11 PIDESC)"
    ],
    bibliography: [
      "FAO. Soberanía Alimentaria. Roma.",
      "Ley 27.118 de Agricultura Familiar.",
      "PIDESC. Pacto Internacional de Derechos Económicos, Sociales y Culturales."
    ]
  },
  {
    id: "seguridad-practicas",
    name: "Seguridad en Prácticas Agrícolas",
    year: 3,
    term: "1° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Normativas de higiene y seguridad en el ámbito agropecuario. Manejo seguro de agroquímicos, maquinaria y equipos. Protección personal y ambiental.",
    hours: 32,
    correlatives: ["fundamentos-sanidad-vegetal"],
    units: [
      "Marco normativo: Ley 19.587 de Higiene y Seguridad",
      "Riesgos en tareas agrícolas: físicos, químicos y biológicos",
      "Manejo seguro de agroquímicos: almacenamiento y aplicación",
      "Equipos de protección personal (EPP)",
      "Seguridad en maquinaria agrícola",
      "Primeros auxilios en el ámbito rural"
    ],
    bibliography: [
      "Ley 19.587 de Higiene y Seguridad en el Trabajo.",
      "Decreto 351/79 Reglamentario de Higiene y Seguridad.",
      "SENASA. Manual de Buenas Prácticas Agrícolas. 2010.",
      "OIT. Guía de Seguridad Agrícola. Ginebra."
    ]
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
    correlatives: ["introduccion-botanica"],
    units: [
      "Sistemática vegetal: clasificación y nomenclatura",
      "Familia Poaceae: cereales y forrajeras",
      "Familia Fabaceae: legumbres y forrajeras",
      "Familia Solanaceae: hortalizas de fruto",
      "Familia Asteraceae: hortalizas de hoja y ornamentales",
      "Identificación de malezas de importancia agronómica"
    ],
    bibliography: [
      "Cabrera, A. Flora de la Provincia de Buenos Aires. INTA, 1963.",
      "Valla, J.J. Botánica: Morfología de las Plantas Superiores. Hemisferio Sur, 2005.",
      "Kiesling, R. Flora de la Región Pampeana. INTA, 2009."
    ]
  },
  {
    id: "analisis-territorios",
    name: "Análisis de Territorios",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Sistemas de Información Geográfica (SIG) aplicados al agro. Teledetección, cartografía temática, zonificación de cultivos y ordenamiento territorial.",
    hours: 80,
    correlatives: ["geografia-agraria", "matematica-aplicada"],
    units: [
      "Fundamentos de los SIG: componentes y funcionalidades",
      "Modelos de datos: raster y vectorial",
      "Teledetección: sensores, índices espectrales y NDVI",
      "Cartografía temática y análisis espacial",
      "Zonificación de cultivos y aptitud del suelo",
      "Ordenamiento territorial y uso del suelo"
    ],
    bibliography: [
      "Buzai, G. Geografía y Sistemas de Información Geográfica. Lugar Editorial, 2003.",
      "Chuvieco, E. Teledetección Ambiental. Ariel, 1996.",
      "INTA. SIG Aplicados al Agro. Buenos Aires, 2015."
    ]
  },
  {
    id: "biofisica-aplicada",
    name: "Biofísica Aplicada",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Principios físicos aplicados a sistemas biológicos. Mecánica de fluidos, termodinámica, radiación, óptica y electricidad en el contexto agropecuario.",
    hours: 80,
    correlatives: ["matematica-aplicada"],
    units: [
      "Mecánica de fluidos: densidad, viscosidad y caudal",
      "Termodinámica: calor, temperatura y transferencia de energía",
      "Radiación electromagnética: espectro solar e interacción con vegetación",
      "Óptica: refracción, lentes y microscopía",
      "Electricidad: circuitos, sensores y electrofisiología",
      "Biofísica del agua en el sistema suelo-planta"
    ],
    bibliography: [
      "Frumento, A. Biofísica. Mosby, 1995.",
      "Cromer, A. Física para las Ciencias de la Vida. Reverté, 1985.",
      "Giancoli, D. Física: Principios con Aplicaciones. Pearson, 2008."
    ]
  },
  {
    id: "politicas-desarrollo-territorial",
    name: "Políticas para el Desarrollo Territorial",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Políticas públicas agrarias y de desarrollo rural. Planificación territorial, presupuesto participativo, legislación vigente y organismos de intervención.",
    hours: 64,
    correlatives: ["historia-acceso-tierra"],
    units: [
      "Marco institucional: INTA, SENASA, INASE, CONICET",
      "Planes y programas: PRODAF, Cambio Rural, ProHuerta",
      "Legislación agraria: Ley 27.118, 26.331, 20.247, 10.699",
      "Certificaciones agroecológicas: SPG y orgánica SENASA",
      "Cooperativismo y asociativismo (Ley 20.337)"
    ],
    bibliography: [
      "Ley 27.118 de Agricultura Familiar.",
      "Ley 26.331 de Bosques Nativos.",
      "Ley 20.337 de Cooperativas.",
      "Ley 20.247 de Semillas y Creaciones Fitogenéticas."
    ]
  },
  {
    id: "unahur-2",
    name: "UNAHUR II",
    year: 3,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Taller de integración y práctica profesional. Elaboración de proyectos, inserción laboral, vinculación con el medio y trayectorias formativas.",
    hours: 32,
    correlatives: ["unahur-1"],
    units: [
      "Integración profesional y práctica laboral",
      "Elaboración de proyectos profesionales",
      "Inserción laboral y trayectorias formativas",
      "Vinculación con el medio productivo",
      "Planificación de carrera y perfiles profesionales"
    ],
    bibliography: [
      "UNAHUR. Documento Institucional de Prácticas Profesionales.",
      "Freire, P. Pedagogía de la Autonomía. 1996.",
      "Schön, D. El Profesional Reflexivo. Paidós, 1983."
    ]
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
    correlatives: ["floricultura-1"],
    units: [
      "Fisiología de la floración: fotoperíodo y vernalización",
      "Propagación comercial masiva",
      "Manejo fitosanitario en florícolas",
      "Poscosecha y vida en florero",
      "Gestión de empresas florícolas",
      "Nuevas especies y tendencias del mercado"
    ],
    bibliography: [
      "Halevy, A.H. Handbook of Flowering. CRC Press, 1989.",
      "Larson, R.A. Introduction to Floriculture. Academic Press, 1992.",
      "Argerich, C. & Troilo, L. Manual de Floricultura. INTA, 2008."
    ]
  },
  {
    id: "horticultura-2",
    name: "Horticultura II",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Sistemas intensivos de producción hortícola. Hidroponía, fertirriego, manejo de adversidades en cultivos protegidos y planificación de campañas.",
    hours: 96,
    correlatives: ["horticultura-1", "ecofisiologia-vegetal"],
    units: [
      "Sistemas hidropónicos: NFT, sustrato y floating",
      "Fertirriego: formulación y monitoreo de soluciones",
      "Manejo de adversidades en cultivos protegidos",
      "Planificación de campaña y programación de siembras",
      "Buenas Prácticas Agrícolas (BPA) en horticultura",
      "Comercialización en mercados concentradores"
    ],
    bibliography: [
      "Resh, H. Cultivos Hidropónicos. Mundi-Prensa, 2013.",
      "Maroto, J.V. Horticultura Herbácea Especial. Mundi-Prensa, 2008.",
      "INTA. Manual de Producción en Invernaderos. 2012."
    ]
  },
  {
    id: "biodiversidad-agricola",
    name: "Biodiversidad Agrícola",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Diversidad genética de cultivos y parientes silvestres. Conservación de germoplasma, bancos de semillas, policultivos y servicios ecosistémicos.",
    hours: 80,
    correlatives: ["ecologia-teorica", "botanica-agricola"],
    units: [
      "Centros de origen y diversidad genética de los cultivos",
      "Bancos de germoplasma y conservación ex situ e in situ",
      "Policultivos, rotaciones y diversificación funcional",
      "Servicios ecosistémicos de la biodiversidad agrícola",
      "Parientes silvestres de cultivos y su conservación",
      "Recursos fitogenéticos y legislación (Tratado FAO)"
    ],
    bibliography: [
      "FAO. Tratado Internacional sobre los Recursos Fitogenéticos.",
      "Harlan, J. Crops and Man. American Society of Agronomy, 1992.",
      "Altieri, M. Biodiversidad y Agroecología. Nordan, 2002."
    ]
  },
  {
    id: "climatologia-fenologia",
    name: "Climatología y Fenología",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Variables climáticas, balance hídrico, heladas, grados día y fenología de cultivos. Interpretación de cartas climáticas y modelos agroclimáticos.",
    hours: 80,
    correlatives: ["matematica-aplicada"],
    units: [
      "Atmósfera: composición, capas y circulación general",
      "Variables climáticas: temperatura, presión, viento y precipitación",
      "Balance hídrico y evapotranspiración",
      "Heladas: tipos, predicción y protección",
      "Grados día y fenología de cultivos",
      "Cartas climáticas y modelos agroclimáticos"
    ],
    bibliography: [
      "OMM. Atlas Climático de la República Argentina.",
      "Ferrari, L. Climatología Agrícola. FAUBA, 2010.",
      "Sivori, E. Fenología Agrícola. INTA, 2005."
    ]
  },
  {
    id: "agua-riego",
    name: "Agua y Sistemas de Riego",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Suelos y Clima",
    description: "Relación agua-suelo-planta. Sistemas de riego presurizado, gravedad y drenaje. Calidad de agua, eficiencia de uso y programación del riego.",
    hours: 80,
    correlatives: ["edafologia-suelos", "biofisica-aplicada"],
    units: [
      "Relación agua-suelo-planta: potencial mátrico y osmótico",
      "Evapotranspiración del cultivo: método FAO Penman-Monteith",
      "Sistemas de riego: gravedad, aspersión y localizado",
      "Programación del riego: tensiómetros, sensores y balance",
      "Calidad de agua: salinidad y sodicidad",
      "Drenaje agrícola y manejo de excesos hídricos"
    ],
    bibliography: [
      "Allen, R. et al. Evapotranspiración del Cultivo. FAO Riego y Drenaje 56, 2006.",
      "Pizarro, F. Riego Localizado. Mundi-Prensa, 1996.",
      "Ayers, R. & Westcot, D. Calidad del Agua para la Agricultura. FAO, 1987."
    ]
  },
  {
    id: "modelos-conocimiento",
    name: "Modelos de Producción de Conocimiento",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Epistemología y metodología de la investigación. Enfoques cuantitativos y cualitativos. Diseño experimental, muestreo y comunicación científica.",
    hours: 64,
    correlatives: ["ecologia-teorica"],
    units: [
      "Epistemología: conocimiento científico y otros saberes",
      "Paradigmas de investigación: positivismo y constructivismo",
      "Diseño experimental: hipótesis, variables y tratamientos",
      "Muestreo y tamaños muestrales",
      "Comunicación científica: artículos, pósters e informes",
      "Bioética en investigación agropecuaria"
    ],
    bibliography: [
      "Kuhn, T. La Estructura de las Revoluciones Científicas. FCE, 1962.",
      "Sampieri, R. et al. Metodología de la Investigación. McGraw Hill, 2010.",
      "Dieterich, H. Nueva Guía para la Investigación Científica. Ariel, 2011."
    ]
  },
  {
    id: "bioinsumos",
    name: "Bioinsumos Agropecuarios",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Inoculantes biológicos, biofertilizantes, biopesticidas y enmiendas orgánicas. Producción, control de calidad y aplicación en sistemas agroecológicos.",
    hours: 64,
    correlatives: ["manejo-adversidades"],
    units: [
      "Tipos de bioinsumos: inoculantes, biofertilizantes y biopesticidas",
      "Microorganismos benéficos: rizobacterias, micorrizas y Trichoderma",
      "Producción de bioinsumos: escalado y control de calidad",
      "Bioinsumos en la normativa SENASA",
      "Aplicación en cultivos intensivos",
      "Biofábricas y experiencias locales"
    ],
    bibliography: [
      "SENASA. Resolución 350/99: Registro de Bioinsumos.",
      "IRAM. Normas de Calidad para Inoculantes.",
      "Cassán, F. Biofertilizantes en Argentina. UNRC, 2015."
    ]
  },
  {
    id: "ingles-2",
    name: "Inglés II",
    year: 4,
    term: "1° Cuatrimestre",
    area: "Ciencias Básicas",
    description: "Lectura y análisis de publicaciones científicas en inglés. Redacción de abstracts, informes técnicos y comunicación oral en contextos académicos.",
    hours: 32,
    correlatives: ["ingles-1"],
    units: [
      "Estructura de artículos científicos: IMRyD",
      "Análisis crítico de publicaciones en inglés",
      "Redacción de abstracts y conclusiones",
      "Vocabulario avanzado de la investigación agronómica",
      "Presentaciones orales en inglés técnico"
    ],
    bibliography: [
      "Swales, J. Genre Analysis: English in Academic and Research Settings. CUP, 1990.",
      "Day, R. How to Write and Publish a Scientific Paper. Greenwood, 2006.",
      "Wallwork, A. English for Academic Research. Springer, 2011."
    ]
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
    correlatives: ["modelos-conocimiento"],
    units: [
      "Diseño experimental en bioensayos",
      "Ensayos de germinación y vigor de semillas",
      "Evaluación de fitotoxicidad y eficacia de bioinsumos",
      "Análisis de calidad de suelo: respirometría y biomasa microbiana",
      "Ensayos de control biológico in vitro e in vivo",
      "Análisis estadístico con software específico"
    ],
    bibliography: [
      "ISTA. International Rules for Seed Testing. 2015.",
      "Sampieri, R. et al. Metodología de la Investigación. McGraw Hill, 2010.",
      "INTA. Manual de Técnicas de Laboratorio. Buenos Aires."
    ]
  },
  {
    id: "tecnologias-agricolas",
    name: "Tecnologías Agrícolas",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Tecnología e Ingeniería",
    description: "Maquinaria, equipos e innovaciones tecnológicas para sistemas intensivos. Agricultura de precisión, automatización de invernaderos y trazabilidad digital.",
    hours: 80,
    correlatives: ["biofisica-aplicada"],
    units: [
      "Maquinaria agrícola para sistemas intensivos",
      "Agricultura de precisión: GPS, sensores y mapas de rendimiento",
      "Automatización de invernaderos: clima, riego y fertirriego",
      "Drones y teledetección aplicada",
      "Trazabilidad digital y blockchain en alimentos",
      "Internet de las Cosas (IoT) en el agro"
    ],
    bibliography: [
      "INTA. Agricultura de Precisión. Buenos Aires, 2018.",
      "Pierce, J. & Nowak, P. Aspects of Precision Agriculture. Springer, 1999.",
      "Gebbers, R. & Adamchuk, V. Precision Agriculture and Food Security. Science, 2010."
    ]
  },
  {
    id: "extension-agraria",
    name: "Desarrollo Rural y Extensión Agraria",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Teoría y práctica de la extensión rural. Metodologías participativas, comunicación dialógica, transferencia de tecnología y trabajo con comunidades campesinas.",
    hours: 80,
    correlatives: ["inmersion-realidad-social"],
    units: [
      "Enfoques de desarrollo rural: DRI, DTR y nueva ruralidad",
      "Agricultura familiar, campesina e indígena",
      "Extensión rural: difusionismo, Freire, constructivismo",
      "Métodos de extensión: visita, día de campo, parcela demostrativa",
      "Marco lógico y diagnóstico participativo",
      "Herramientas: FODA, transecto y mapa parlante"
    ],
    bibliography: [
      "Freire, P. ¿Extensión o Comunicación? 1973.",
      "Rogers, E. Diffusion of Innovations. Free Press, 1962.",
      "Schejtman, A. & Berdegué, J. Desarrollo Territorial Rural. 2004.",
      "INTA. Manual de Extensión Rural."
    ]
  },
  {
    id: "turismo-rural",
    name: "Turismo Rural y Periurbano",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Agroturismo, turismo rural y recreación en espacios periurbanos. Planificación de emprendimientos turísticos en establecimientos agropecuarios familiares.",
    hours: 64,
    correlatives: ["economia-social-ecologica"],
    units: [
      "Nueva ruralidad y turismo rural",
      "Agroturismo, turismo de estancia y enoturismo",
      "Gestión del turismo rural: planificación y recursos",
      "Atractivos turísticos y análisis de demanda",
      "Legislación turística (Ley 25.997)",
      "Impactos económicos, sociales y ambientales"
    ],
    bibliography: [
      "Ley 25.997 de Turismo Nacional.",
      "Schejtman, A. & Berdegué, J. Desarrollo Territorial Rural. 2004.",
      "Barrera, E. Turismo Rural: Una Alternativa para el Desarrollo. 2006."
    ]
  },
  {
    id: "fruticultura-2",
    name: "Fruticultura II",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo especializado de frutales. Riego localizado, nutrición, poda de producción, raleo, control de adversidades y cosecha con criterios de calidad.",
    hours: 80,
    correlatives: ["fruticultura-1", "ecofisiologia-vegetal"],
    units: [
      "Riego localizado y fertirriego en frutales",
      "Nutrición y diagnóstico foliar",
      "Poda de producción y raleo de frutos",
      "Control de adversidades en frutales",
      "Madurez, cosecha y estándares de calidad",
      "Comercialización y agregado de valor"
    ],
    bibliography: [
      "Gil, G. Fruticultura: El Potencial Productivo. UC Chile, 2004.",
      "Sozzi, G. Árboles Frutales: Ecofisiología, Cultivo y Aprovechamiento. FAUBA, 2014.",
      "INTA. Manual de Fruticultura. Buenos Aires, 2015."
    ]
  },
  {
    id: "arboricultura-2",
    name: "Arboricultura II",
    year: 4,
    term: "2° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Manejo de plantaciones forestales. Silvicultura, turnos de corta, podas de producción, sanidad forestal y certificación de manejo sustentable.",
    hours: 80,
    correlatives: ["arboricultura-1"],
    units: [
      "Silvicultura: densidad de plantación y raleos",
      "Turnos de corta y planificación forestal",
      "Podas de producción en forestales",
      "Sanidad forestal: plagas y enfermedades clave",
      "Certificación forestal: FSC y PEFC",
      "Servicios ecosistémicos de los bosques cultivados"
    ],
    bibliography: [
      "INTA. Manual Forestal. Buenos Aires, 2010.",
      "Hawley, R.C. & Smith, D.M. Silvicultura Práctica. Omega, 1972.",
      "FAO. Evaluación de los Recursos Forestales Mundiales. 2015."
    ]
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
    correlatives: ["biodiversidad-agricola", "botanica-agricola"],
    units: [
      "Bases genéticas del fitomejoramiento: herencia y variabilidad",
      "Selección: masal, individual y recurrente",
      "Hibridación y cruzamientos dirigidos",
      "Mutagénesis inducida y mejoramiento por mutaciones",
      "Biotecnología: cultivo de tejidos, marcadores moleculares y transgénesis",
      "Registro de cultivares: INASE y derechos de obtentor"
    ],
    bibliography: [
      "Allard, R.W. Principios de la Mejora Genética de las Plantas. Omega, 1976.",
      "Cubero, J.I. Introducción a la Mejora Genética Vegetal. Mundi-Prensa, 2013.",
      "Ley 20.247 de Semillas y Creaciones Fitogenéticas."
    ]
  },
  {
    id: "diseno-agroecosistemas",
    name: "Diseño y Manejo de Agroecosistemas",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Diseño integral de sistemas productivos diversificados. Rotaciones, asociaciones, integración agrícola-ganadera y planificación predial con enfoque agroecológico.",
    hours: 96,
    correlatives: ["horticultura-2", "manejo-adversidades"],
    units: [
      "Principios del diseño de agroecosistemas sustentables",
      "Rotaciones, asociaciones y policultivos",
      "Integración agrícola-ganadera",
      "Planificación predial con enfoque agroecológico",
      "Indicadores de sustentabilidad y evaluación",
      "Transición agroecológica: estrategias y barreras"
    ],
    bibliography: [
      "Gliessman, S. Agroecología: Procesos Ecológicos en Agricultura Sostenible. CATIE, 2002.",
      "Sarandón, S. Agroecología: El Camino Hacia una Agricultura Sustentable. INTA, 2020.",
      "Altieri, M. Agroecología: Bases Científicas para una Agricultura Sustentable. Nordan, 1999."
    ]
  },
  {
    id: "administracion-agroecosistemas",
    name: "Administración de Agroecosistemas",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Gestión empresarial de establecimientos agropecuarios. Costos, presupuestos, planificación estratégica, certificaciones y comercialización de productos.",
    hours: 80,
    correlatives: ["economia-social-ecologica"],
    units: [
      "Teoría general de sistemas en producción agropecuaria",
      "Estructura de costos agrarios: directos e indirectos",
      "Medidas de resultado económico: ingreso bruto, margen bruto/neto",
      "Evaluación financiera: VAN, TIR, payback y B/C",
      "Rentabilidad y planificación estratégica"
    ],
    bibliography: [
      "Sapag Chain, N. Preparación y Evaluación de Proyectos. McGraw Hill.",
      "Coraggio, J.L. Economía Social y Solidaria. 2011.",
      "Frank, R. Microeconomía y Conducta. McGraw Hill."
    ]
  },
  {
    id: "electiva",
    name: "Materia Electiva",
    year: 5,
    term: "1° Cuatrimestre",
    area: "Producción Vegetal",
    description: "Espacio curricular optativo. Ofertas disponibles: Apicultura, Forrajicultura, Cerealicultura o Cannabicultura. Se cursa según la oferta del cuatrimestre.",
    hours: 64,
    correlatives: ["diseno-agroecosistemas"],
    units: [
      "Contenidos variables según la electiva cursada",
      "Apicultura: manejo de colmenas, sanidad apícola y productos",
      "Forrajicultura: especies forrajeras, pasturas y conservación",
      "Cerealicultura: producción de cereales de invierno y verano",
      "Cannabicultura: marco normativo, producción y usos"
    ],
    bibliography: [
      "Material específico según la electiva seleccionada.",
      "INTA. Cuadernos de Actualización Técnica. Buenos Aires."
    ]
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
    correlatives: ["produccion-animal-1"],
    units: [
      "Producción porcina: manejo, sanidad y nutrición",
      "Avicultura: pollos parrilleros y postura",
      "Producción ovina y caprina",
      "Apicultura: manejo de colmenas y productos",
      "Instalaciones y bienestar animal",
      "Comercialización de productos animales alternativos"
    ],
    bibliography: [
      "INTA. Manual de Producción Porcina. Buenos Aires, 2010.",
      "North, M. & Bell, D. Manual de Producción Avícola. McGraw Hill, 2002.",
      "SENASA. Manual de Buenas Prácticas Pecuarias. 2015.",
      "Crane, E. El Libro de la Miel. Acribia, 1990."
    ]
  },
  {
    id: "formulacion-proyectos",
    name: "Formulación y Evaluación de Proyectos",
    year: 5,
    term: "2° Cuatrimestre",
    area: "Socioeconomía y Extensión",
    description: "Metodología de formulación de proyectos agropecuarios. Evaluación social, económica y ambiental. Marco lógico, indicadores y fuentes de financiamiento.",
    hours: 80,
    correlatives: ["administracion-agroecosistemas"],
    units: [
      "Diagnóstico: línea de base, problemas y actores",
      "Marco lógico: árbol de problemas y árbol de objetivos",
      "Evaluación económica: flujo de fondos, VAN, TIR y B/C",
      "Análisis de sensibilidad y payback",
      "Evaluación social y ambiental: empleo, género, matriz de Leopold"
    ],
    bibliography: [
      "Sapag Chain, N. Preparación y Evaluación de Proyectos. McGraw Hill.",
      "ILPES. Metodología del Marco Lógico. CEPAL.",
      "Geilfus, F. 80 Herramientas para el Desarrollo Participativo. IICA."
    ]
  },
  {
    id: "taller-integracion-final",
    name: "Taller de Integración Final",
    year: 5,
    term: "Anual",
    area: "Tecnología e Ingeniería",
    description: "Trabajo final integrador que articula los saberes de toda la carrera. Resolución de una problemática real del territorio con intervención profesional supervisada.",
    hours: 160,
    correlatives: ["diseno-agroecosistemas", "formulacion-proyectos"],
    units: [
      "Definición del problema y marco conceptual",
      "Metodología de intervención profesional",
      "Diagnóstico y relevamiento de datos",
      "Propuesta técnica y plan de intervención",
      "Evaluación de impactos y sustentabilidad",
      "Presentación y defensa del trabajo final"
    ],
    bibliography: [
      "Schön, D. El Profesional Reflexivo. Paidós, 1983.",
      "Sampieri, R. et al. Metodología de la Investigación. McGraw Hill, 2010.",
      "Normativas UNAHUR para Trabajo Final Integrador."
    ]
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
