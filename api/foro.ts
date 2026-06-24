import { createClient } from "@supabase/supabase-js";

export const config = {
  maxDuration: 10,
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const SEED_POSTS = [
  {
    id: "seed-drenaje-001",
    title: "¿Alguien tiene material sobre cálculo de drenaje parcelario?",
    author: "Lucía M.",
    author_role: "Estudiante de 3° año",
    content: "Estoy cursando Manejo de Suelos y necesito entender bien cómo se calcula el espaciamiento entre drenes en un lote con problemas de anegamiento. Los apuntes de la cátedra son un poco escuetos. ¿Alguien tiene una guía práctica o un ejercicio resuelto?",
    tags: ["suelos", "drenaje", "hidrología", "consulta"],
    likes: 12,
    liked_by_user: false,
    replies: [
      { id: "rep-dren-001", author: "Ing. Sanchez", author_role: "Ayudante de Cátedra", content: "Lucía, te recomiendo el capítulo 4 del manual 'Drenaje Agrícola' de la FAO (disponible en la biblioteca digital). La fórmula clave es la de Hooghoudt para flujo horizontal. En el próximo teórico vamos a resolver un caso similar.", timestamp: "15 Jun 2026" },
      { id: "rep-dren-002", author: "Tomas R.", author_role: "Egresado/a", content: "Yo usé esta planilla de cálculo que armé cuando cursé, te la paso: https://docs.google.com/spreadsheets/d/ejemplo-drenaje. Avísame si necesitas ayuda para interpretar los resultados.", timestamp: "16 Jun 2026" },
    ],
    timestamp: "14 Jun 2026",
    subject_id: "manejo-suelos",
  },
  {
    id: "seed-frutilla-002",
    title: "Experiencias con cultivo de frutilla en el Cinturón Verde",
    author: "Camila P.",
    author_role: "Estudiante de 1° año",
    content: "Estoy empezando un proyecto de huerta familiar y quiero incluir frutillas. ¿Alguien probó el manejo con mulching plástico vs orgánico? Me interesa especialmente el control de Botrytis sin usar químicos sintéticos.",
    tags: ["horticultura", "frutilla", "manejo", "botrytis"],
    likes: 24,
    liked_by_user: false,
    replies: [
      { id: "rep-frut-001", author: "Ing. Agr. Martínez", author_role: "Ayudante de Cátedra", content: "Buena pregunta. En el cinturón verde tenemos experiencia con mulching de paja de arroz para frutilla. Reduce significativamente la incidencia de Botrytis comparado con plástico, porque evita la condensación en la corona de la planta. También podés complementar con aplicaciones de Bacillus subtilis.", timestamp: "12 Jun 2026" },
    ],
    timestamp: "11 Jun 2026",
    subject_id: "produccion-horticola",
  },
  {
    id: "seed-ica-003",
    title: "¿Cómo afecta la relación C/N al compostaje de guano?",
    author: "Franco D.",
    author_role: "Estudiante de 3° año",
    content: "Estoy haciendo compost con guano de conejo y cama de pastura seca. La relación C/N me da alrededor de 18:1, que entiendo es baja. ¿Debería agregar más material carbonado? ¿Qué rango es óptimo para degradación aeróbica?",
    tags: ["compost", "relación C/N", "guano", "suelos"],
    likes: 18,
    liked_by_user: false,
    replies: [
      { id: "rep-ica-001", author: "Dra. Lombardi", author_role: "Ayudante de Cátedra", content: "Franco, 18:1 está dentro del rango aceptable (ideal 25-30:1 para compostaje aeróbico). Si podés subirlo a 25:1 agregando aserrín o viruta de madera, mejor, porque reduce pérdidas de nitrógeno por volatilización. Pero con 18:1 va a compostar más rápido, solo controlá la temperatura para que no se te pasé de 65°C.", timestamp: "10 Jun 2026" },
      { id: "rep-ica-002", author: "Sofía L.", author_role: "Estudiante de 1° año", content: "Yo uso tiras de cartón corrugado picado para subir la relación C/N y funciona muy bien. Además las lombrices lo aman.", timestamp: "11 Jun 2026" },
    ],
    timestamp: "9 Jun 2026",
    subject_id: "edafologia-suelos",
  },
  {
    id: "seed-clima-004",
    title: "Datos de estación meteorológica para trabajo práctico de Climatología",
    author: "Julián G.",
    author_role: "Estudiante de 1° año",
    content: "Necesito series históricas de temperatura y precipitación de Hurlingham (2015-2025) para el TP de balance hídrico. ¿Alguien sabe dónde conseguir los datos? El SMN tiene datos pero no tan locales.",
    tags: ["climatología", "datos", "SMN", "balance hídrico"],
    likes: 31,
    liked_by_user: false,
    replies: [
      { id: "rep-cli-001", author: "Cátedra Climatología", author_role: "Ayudante de Cátedra", content: "Julián, subí a la sección de Materiales un consolidado con datos de la estación SMN de El Palomar y del INTA Castelar. Son las más cercanas a Hurlingham. Buscalo en la Biblioteca de Apuntes como 'Datos climáticos serie 2015-2025'.", timestamp: "8 Jun 2026" },
      { id: "rep-cli-002", author: "Martín E.", author_role: "Egresado/a", content: "También podés usar el explorador climático del INTA (https://climayagua.inta.gob.ar/) que tiene grillado a 5 km. No es tan preciso como datos de estación pero para el TP sirve.", timestamp: "9 Jun 2026" },
    ],
    timestamp: "7 Jun 2026",
    subject_id: "climatologia-fenologia",
  },
  {
    id: "seed-cultivos-005",
    title: "Discusión: ¿Tiene sentido la agricultura regenerativa en la Pampa Húmeda?",
    author: "Martina R.",
    author_role: "Estudiante de 3° año",
    content: "Vengo leyendo sobre agricultura regenerativa y me surge la duda de si realmente es aplicable a escala en la Pampa Húmeda o si es solo una moda para mercados nicho. Los costos de implantar cultivos de cobertura y reducir labranza parecen altos. ¿Alguien tiene datos de experiencias locales?",
    tags: ["debate", "regenerativa", "cultivos de cobertura", "Pampa Húmeda"],
    likes: 45,
    liked_by_user: false,
    replies: [
      { id: "rep-reg-001", author: "Ing. Agr. González", author_role: "Ayudante de Cátedra", content: "Excelente pregunta, Martina. Te recomiendo el ensayo a largo plazo del INTA Pergamino (iniciado en 2015) que compara siembra directa con y sin cultivos de cobertura. Los resultados a 10 años muestran incrementos de 0.5% de MOS y mejora en infiltración. A corto plazo los costos son más altos (siembra+terminación de cobertura), pero a largo plazo reduce fertilización nitrogenada. No es moda: hay datos duros.", timestamp: "6 Jun 2026" },
      { id: "rep-reg-002", author: "Pedro S.", author_role: "Técnico Universitario", content: "En el CREA Sur de Santa Fe vienen haciendo agricultura regenerativa desde 2019. El primer año perdieron plata, a partir del tercero empezaron a empatar y hoy están 15% arriba del promedio zonal. El tema es aguantar la transición.", timestamp: "7 Jun 2026" },
      { id: "rep-reg-003", author: "Lucía M.", author_role: "Estudiante de 3° año", content: "Además del tema económico, está el beneficio de captura de carbono que algunos proyectos están monetizando con bonos de carbono. Eso cambia completamente la ecuación.", timestamp: "8 Jun 2026" },
    ],
    timestamp: "5 Jun 2026",
    subject_id: "produccion-vegetal",
  },
];

async function ensureSeeds() {
  const { count, error } = await supabase
    .from("forum_posts")
    .select("*", { count: "exact", head: true });
  if (error || (count ?? 0) > 0) return;
  const rows = SEED_POSTS.map((s) => ({
    ...s,
    tags: JSON.stringify(s.tags),
    replies: JSON.stringify(s.replies),
  }));
  await supabase.from("forum_posts").insert(rows);
}

function mapRow(row: any) {
  return {
    ...row,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags ?? [],
    replies: typeof row.replies === "string" ? JSON.parse(row.replies) : row.replies ?? [],
  };
}

export async function GET() {
  await ensureSeeds();
  const { data, error } = await supabase
    .from("forum_posts")
    .select("*")
    .order("timestamp", { ascending: false });
  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  const posts = (data ?? []).map(mapRow);
  return Response.json({ success: true, data: posts }, {
    headers: { "Cache-Control": "no-cache", "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "like") {
      const { data: post } = await supabase
        .from("forum_posts")
        .select("likes, liked_by_user")
        .eq("id", body.postId)
        .single();
      if (!post) {
        return Response.json({ success: false, error: "Post no encontrado" }, { status: 404 });
      }
      const liked = body.liked ?? !post.liked_by_user;
      const { data, error } = await supabase
        .from("forum_posts")
        .update({ liked_by_user: liked, likes: post.likes + (liked ? 1 : -1) })
        .eq("id", body.postId)
        .select()
        .single();
      if (error) throw error;
      return Response.json({ success: true, data: mapRow(data) });
    }

    if (body.action === "comment") {
      const { data: post } = await supabase
        .from("forum_posts")
        .select("replies")
        .eq("id", body.postId)
        .single();
      if (!post) {
        return Response.json({ success: false, error: "Post no encontrado" }, { status: 404 });
      }
      const existing = typeof post.replies === "string" ? JSON.parse(post.replies) : post.replies ?? [];
      const reply = {
        id: `rep-${Date.now()}`,
        author: body.author || "Vos (Estudiante)",
        author_role: body.authorRole || "Estudiante de Agronomía",
        content: body.content,
        timestamp: body.timestamp || "Hace unos instantes",
      };
      const { data, error } = await supabase
        .from("forum_posts")
        .update({ replies: JSON.stringify([...existing, reply]) })
        .eq("id", body.postId)
        .select()
        .single();
      if (error) throw error;
      return Response.json({ success: true, data: mapRow(data) });
    }

    const newPost = {
      id: `post-${Date.now()}`,
      title: body.title,
      author: body.author || "Vos (Estudiante)",
      author_role: body.authorRole || "Estudiante de 1° año",
      content: body.content,
      tags: JSON.stringify(body.tags?.length ? body.tags : ["General"]),
      likes: 1,
      liked_by_user: true,
      replies: JSON.stringify([]),
      timestamp: body.timestamp || new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" }),
      subject_id: body.subjectId || null,
    };

    const { data, error } = await supabase.from("forum_posts").insert(newPost).select().single();
    if (error) throw error;
    return Response.json({ success: true, data: mapRow(data) }, { status: 201 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message || "Error al procesar" }, { status: 400 });
  }
}
