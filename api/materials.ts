import { createClient } from "@supabase/supabase-js";

export const config = { maxDuration: 10 };

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const FALLBACK_MATERIALS = [
  { id: "mat-f1", subject_id: "edafologia-suelos", title: "Guía de Determinación de Humedad del Suelo por Gravimetría", category: "Guía Práctica", author: "Cátedra de Edafología", file_size: "1.2 MB", downloads: 145, link: "#", timestamp: "15 May 2026" },
  { id: "mat-f2", subject_id: "edafologia-suelos", title: "Apunte Teoría de Coloides y Capacidad de Intercambio Catiónico (CIC)", category: "Apunte", author: "Santiago Rossi", file_size: "3.4 MB", downloads: 210, link: "#", timestamp: "12 Jun 2026" },
  { id: "mat-f3", subject_id: "climatologia-fenologia", title: "Recopilación de Efemérides de Heladas en Hurlingham (2010-2025)", category: "Resumen", author: "Ing. Climatología", file_size: "850 KB", downloads: 98, link: "#", timestamp: "02 Jun 2026" },
  { id: "mat-f4", subject_id: "quimica-general", title: "Modelo de examen libre y respuestas - Química General", category: "Examen", author: "Matias G.", file_size: "2.1 MB", downloads: 320, link: "#", timestamp: "28 May 2026" },
  { id: "mat-f5", subject_id: "manejo-adversidades", title: "Ficha Técnica: Manejo Agroecológico de Malezas en el Cinturón Hortícola", category: "Guía Práctica", author: "Programa Extensión UNAHUR", file_size: "4.8 MB", downloads: 184, link: "#", timestamp: "20 Jun 2026" },
];

async function getCurrentUser(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  if (!token) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

async function isAdmin(userId: string) {
  const { data } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", userId)
    .single();
  return data?.role === "admin";
}

export async function GET() {
  try {
    const { data } = await supabase
      .from("shared_materials")
      .select("*")
      .order("timestamp", { ascending: false });
    if (data && data.length > 0) {
      return Response.json({ success: true, data }, {
        headers: { "Cache-Control": "no-cache" },
      });
    }
    return Response.json({ success: true, data: FALLBACK_MATERIALS }, {
      headers: { "Cache-Control": "no-cache" },
    });
  } catch {
    return Response.json({ success: true, data: FALLBACK_MATERIALS }, {
      headers: { "Cache-Control": "no-cache" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser(request);
    const body = await request.json();

    // Delete material
    if (body.action === "delete") {
      if (!currentUser) {
        return Response.json({ success: false, error: "No autenticado" }, { status: 401 });
      }
      const userIsAdmin = await isAdmin(currentUser.id);
      const { data: mat } = await supabase
        .from("shared_materials")
        .select("user_id")
        .eq("id", body.id)
        .single();
      if (mat && mat.user_id && mat.user_id !== currentUser.id && !userIsAdmin) {
        return Response.json({ success: false, error: "No autorizado" }, { status: 403 });
      }
      const { error } = await supabase.from("shared_materials").delete().eq("id", body.id);
      if (error) throw error;
      return Response.json({ success: true });
    }

    // Increment download count
    if (body.action === "download") {
      const { data: mat } = await supabase
        .from("shared_materials")
        .select("downloads")
        .eq("id", body.id)
        .single();
      const currentDownloads = mat?.downloads ?? 0;
      const { error } = await supabase
        .from("shared_materials")
        .update({ downloads: currentDownloads + 1 })
        .eq("id", body.id);
      if (error) throw error;
      return Response.json({ success: true, data: { downloads: currentDownloads + 1 } });
    }

    // Create material
    if (!currentUser) {
      return Response.json({ success: false, error: "No autenticado" }, { status: 401 });
    }

    const newMaterial = {
      id: `mat-${Date.now()}`,
      subject_id: body.subjectId,
      title: body.title,
      category: body.category || "Apunte",
      author: body.author || currentUser.email || "Estudiante",
      file_size: body.fileSize || `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      downloads: 0,
      link: "#",
      timestamp: body.timestamp || "Hoy",
      user_id: currentUser.id,
      user_email: currentUser.email,
    };

    const { data, error } = await supabase.from("shared_materials").insert(newMaterial).select().single();
    if (error) throw error;
    return Response.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}
