export const config = {
  maxDuration: 10,
};

interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorRole: string;
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

const SEED_POSTS: ForumPost[] = [
  {
    id: "seed-drenaje-001",
    title: "¿Alguien tiene material sobre cálculo de drenaje parcelario?",
    author: "Lucía M.",
    authorRole: "Estudiante de 3° año",
    content: "Estoy cursando Manejo de Suelos y necesito entender bien cómo se calcula el espaciamiento entre drenes en un lote con problemas de anegamiento. Los apuntes de la cátedra son un poco escuetos. ¿Alguien tiene una guía práctica o un ejercicio resuelto?",
    tags: ["suelos", "drenaje", "hidrología", "consulta"],
    likes: 12,
    likedByUser: false,
    replies: [
      { id: "rep-dren-001", author: "Ing. Sanchez", authorRole: "Ayudante de Cátedra", content: "Lucía, te recomiendo el capítulo 4 del manual 'Drenaje Agrícola' de la FAO (disponible en la biblioteca digital). La fórmula clave es la de Hooghoudt para flujo horizontal. En el próximo teórico vamos a resolver un caso similar.", timestamp: "15 Jun 2026" },
      { id: "rep-dren-002", author: "Tomas R.", authorRole: "Egresado/a", content: "Yo usé esta planilla de cálculo que armé cuando cursé, te la paso: https://docs.google.com/spreadsheets/d/ejemplo-drenaje. Avísame si necesitas ayuda para interpretar los resultados.", timestamp: "16 Jun 2026" },
    ],
    timestamp: "14 Jun 2026",
    subjectId: "manejo-suelos",
  },
  {
    id: "seed-frutilla-002",
    title: "Experiencias con cultivo de frutilla en el Cinturón Verde",
    author: "Camila P.",
    authorRole: "Estudiante de 1° año",
    content: "Estoy empezando un proyecto de huerta familiar y quiero incluir frutillas. ¿Alguien probó el manejo con mulching plástico vs orgánico? Me interesa especialmente el control de Botrytis sin usar químicos sintéticos.",
    tags: ["horticultura", "frutilla", "manejo", "botrytis"],
    likes: 24,
    likedByUser: false,
    replies: [
      { id: "rep-frut-001", author: "Ing. Agr. Martínez", authorRole: "Ayudante de Cátedra", content: "Buena pregunta. En el cinturón verde tenemos experiencia con mulching de paja de arroz para frutilla. Reduce significativamente la incidencia de Botrytis comparado con plástico, porque evita la condensación en la corona de la planta. También podés complementar con aplicaciones de Bacillus subtilis.", timestamp: "12 Jun 2026" },
    ],
    timestamp: "11 Jun 2026",
    subjectId: "produccion-horticola",
  },
  {
    id: "seed-ica-003",
    title: "¿Cómo afecta la relación C/N al compostaje de guano?",
    author: "Franco D.",
    authorRole: "Estudiante de 3° año",
    content: "Estoy haciendo compost con guano de conejo y cama de pastura seca. La relación C/N me da alrededor de 18:1, que entiendo es baja. ¿Debería agregar más material carbonado? ¿Qué rango es óptimo para degradación aeróbica?",
    tags: ["compost", "relación C/N", "guano", "suelos"],
    likes: 18,
    likedByUser: false,
    replies: [
      { id: "rep-ica-001", author: "Dra. Lombardi", authorRole: "Ayudante de Cátedra", content: "Franco, 18:1 está dentro del rango aceptable (ideal 25-30:1 para compostaje aeróbico). Si podés subirlo a 25:1 agregando aserrín o viruta de madera, mejor, porque reduce pérdidas de nitrógeno por volatilización. Pero con 18:1 va a compostar más rápido, solo controlá la temperatura para que no se te pasé de 65°C.", timestamp: "10 Jun 2026" },
      { id: "rep-ica-002", author: "Sofía L.", authorRole: "Estudiante de 1° año", content: "Yo uso tiras de cartón corrugado picado para subir la relación C/N y funciona muy bien. Además las lombrices lo aman.", timestamp: "11 Jun 2026" },
    ],
    timestamp: "9 Jun 2026",
    subjectId: "edafologia-suelos",
  },
  {
    id: "seed-clima-004",
    title: "Datos de estación meteorológica para trabajo práctico de Climatología",
    author: "Julián G.",
    authorRole: "Estudiante de 1° año",
    content: "Necesito series históricas de temperatura y precipitación de Hurlingham (2015-2025) para el TP de balance hídrico. ¿Alguien sabe dónde conseguir los datos? El SMN tiene datos pero no tan locales.",
    tags: ["climatología", "datos", "SMN", "balance hídrico"],
    likes: 31,
    likedByUser: false,
    replies: [
      { id: "rep-cli-001", author: "Cátedra Climatología", authorRole: "Ayudante de Cátedra", content: "Julián, subí a la sección de Materiales un consolidado con datos de la estación SMN de El Palomar y del INTA Castelar. Son las más cercanas a Hurlingham. Buscalo en la Biblioteca de Apuntes como 'Datos climáticos serie 2015-2025'.", timestamp: "8 Jun 2026" },
      { id: "rep-cli-002", author: "Martín E.", authorRole: "Egresado/a", content: "También podés usar el explorador climático del INTA (https://climayagua.inta.gob.ar/) que tiene grillado a 5 km. No es tan preciso como datos de estación pero para el TP sirve.", timestamp: "9 Jun 2026" },
    ],
    timestamp: "7 Jun 2026",
    subjectId: "climatologia-fenologia",
  },
  {
    id: "seed-cultivos-005",
    title: "Discusión: ¿Tiene sentido la agricultura regenerativa en la Pampa Húmeda?",
    author: "Martina R.",
    authorRole: "Estudiante de 3° año",
    content: "Vengo leyendo sobre agricultura regenerativa y me surge la duda de si realmente es aplicable a escala en la Pampa Húmeda o si es solo una moda para mercados nicho. Los costos de implantar cultivos de cobertura y reducir labranza parecen altos. ¿Alguien tiene datos de experiencias locales?",
    tags: ["debate", "regenerativa", "cultivos de cobertura", "Pampa Húmeda"],
    likes: 45,
    likedByUser: false,
    replies: [
      { id: "rep-reg-001", author: "Ing. Agr. González", authorRole: "Ayudante de Cátedra", content: "Excelente pregunta, Martina. Te recomiendo el ensayo a largo plazo del INTA Pergamino (iniciado en 2015) que compara siembra directa con y sin cultivos de cobertura. Los resultados a 10 años muestran incrementos de 0.5% de MOS y mejora en infiltración. A corto plazo los costos son más altos (siembra+terminación de cobertura), pero a largo plazo reduce fertilización nitrogenada. No es moda: hay datos duros.", timestamp: "6 Jun 2026" },
      { id: "rep-reg-002", author: "Pedro S.", authorRole: "Técnico Universitario", content: "En el CREA Sur de Santa Fe vienen haciendo agricultura regenerativa desde 2019. El primer año perdieron plata, a partir del tercero empezaron a empatar y hoy están 15% arriba del promedio zonal. El tema es aguantar la transición.", timestamp: "7 Jun 2026" },
      { id: "rep-reg-003", author: "Lucía M.", authorRole: "Estudiante de 3° año", content: "Además del tema económico, está el beneficio de captura de carbono que algunos proyectos están monetizando con bonos de carbono. Eso cambia completamente la ecuación.", timestamp: "8 Jun 2026" },
    ],
    timestamp: "5 Jun 2026",
    subjectId: "produccion-vegetal",
  },
];

const posts: ForumPost[] = [...SEED_POSTS];
let nextId = Date.now();

function getPosts(): ForumPost[] {
  return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function GET() {
  return Response.json({ success: true, data: getPosts() }, {
    headers: { "Cache-Control": "no-cache", "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "like") {
      const post = posts.find((p) => p.id === body.postId);
      if (!post) {
        return Response.json({ success: false, error: "Post no encontrado" }, { status: 404 });
      }
      post.likedByUser = body.liked ?? !post.likedByUser;
      post.likes += post.likedByUser ? 1 : -1;
      return Response.json({ success: true, data: post });
    }

    if (body.action === "comment") {
      const post = posts.find((p) => p.id === body.postId);
      if (!post) {
        return Response.json({ success: false, error: "Post no encontrado" }, { status: 404 });
      }
      const reply = {
        id: `rep-${++nextId}`,
        author: body.author || "Vos (Estudiante)",
        authorRole: body.authorRole || "Estudiante de Agronomía",
        content: body.content,
        timestamp: body.timestamp || "Hace unos instantes",
      };
      post.replies.push(reply);
      return Response.json({ success: true, data: post });
    }

    const newPost: ForumPost = {
      id: `post-${++nextId}`,
      title: body.title,
      author: body.author || "Vos (Estudiante)",
      authorRole: body.authorRole || "Estudiante de 1° año",
      content: body.content,
      tags: body.tags?.length ? body.tags : ["General"],
      likes: 1,
      likedByUser: true,
      replies: [],
      timestamp: body.timestamp || new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" }),
      subjectId: body.subjectId || undefined,
    };

    posts.unshift(newPost);
    return Response.json({ success: true, data: newPost }, { status: 201 });
  } catch (err) {
    return Response.json({ success: false, error: "Error al procesar la solicitud" }, { status: 400 });
  }
}
