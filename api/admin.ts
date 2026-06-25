import { createClient } from "@supabase/supabase-js";

export const config = { maxDuration: 10 };

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function requireAdmin(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  if (!token) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return null;
  const user = data.user;
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") return null;
  return user;
}

export async function GET(request: Request) {
  const user = await requireAdmin(request);
  if (!user) {
    return Response.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const url = new URL(request.url);
  const section = url.searchParams.get("section") || "stats";

  if (section === "users") {
    const { data: users } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false });
    return Response.json({ success: true, data: users ?? [] });
  }

  if (section === "materials") {
    const { data: materials } = await supabase
      .from("shared_materials")
      .select("*")
      .order("created_at", { ascending: false });
    return Response.json({ success: true, data: materials ?? [] });
  }

  if (section === "rss") {
    const { data: sources } = await supabase
      .from("rss_sources")
      .select("*")
      .order("created_at", { ascending: true });
    return Response.json({ success: true, data: sources ?? [] });
  }

  // Stats
  const [
    { count: userCount },
    { count: postCount },
    { count: materialCount },
    { count: rssCount },
  ] = await Promise.all([
    supabase.from("user_profiles").select("*", { count: "exact", head: true }),
    supabase.from("forum_posts").select("*", { count: "exact", head: true }),
    supabase.from("shared_materials").select("*", { count: "exact", head: true }),
    supabase.from("rss_sources").select("*", { count: "exact", head: true }),
  ]);

  return Response.json({
    success: true,
    data: {
      users: userCount ?? 0,
      posts: postCount ?? 0,
      materials: materialCount ?? 0,
      rssSources: rssCount ?? 0,
    },
  });
}

export async function POST(request: Request) {
  const user = await requireAdmin(request);
  if (!user) {
    return Response.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // ─── Users ───
    if (body.action === "changeRole") {
      const { error } = await supabase
        .from("user_profiles")
        .update({ role: body.role })
        .eq("id", body.userId);
      if (error) throw error;
      return Response.json({ success: true });
    }

    if (body.action === "deleteUser") {
      const { error } = await supabase
        .from("user_profiles")
        .delete()
        .eq("id", body.userId);
      if (error) throw error;
      // Nota: No eliminamos de auth.users porque Supabase no lo permite con anon key
      return Response.json({ success: true });
    }

    // ─── Forum ───
    if (body.action === "deleteAnyPost") {
      const { error } = await supabase
        .from("forum_posts")
        .delete()
        .eq("id", body.postId);
      if (error) throw error;
      return Response.json({ success: true });
    }

    if (body.action === "togglePin") {
      const { data: post } = await supabase
        .from("forum_posts")
        .select("is_pinned")
        .eq("id", body.postId)
        .single();
      if (!post) {
        return Response.json({ success: false, error: "Post no encontrado" }, { status: 404 });
      }
      const { error } = await supabase
        .from("forum_posts")
        .update({ is_pinned: !post.is_pinned })
        .eq("id", body.postId);
      if (error) throw error;
      return Response.json({ success: true, data: { is_pinned: !post.is_pinned } });
    }

    // ─── Materials ───
    if (body.action === "deleteAnyMaterial") {
      const { error } = await supabase
        .from("shared_materials")
        .delete()
        .eq("id", body.materialId);
      if (error) throw error;
      return Response.json({ success: true });
    }

    // ─── RSS ───
    if (body.action === "addRssSource") {
      if (!body.name || !body.url) {
        return Response.json({ success: false, error: "Nombre y URL requeridos" }, { status: 400 });
      }
      const { data, error } = await supabase
        .from("rss_sources")
        .insert({ name: body.name, url: body.url, section: body.section || "Noticias" })
        .select()
        .single();
      if (error) throw error;
      return Response.json({ success: true, data });
    }

    if (body.action === "deleteRssSource") {
      const { error } = await supabase
        .from("rss_sources")
        .delete()
        .eq("id", body.id);
      if (error) throw error;
      return Response.json({ success: true });
    }

    if (body.action === "toggleRssSource") {
      const { error } = await supabase
        .from("rss_sources")
        .update({ enabled: body.enabled })
        .eq("id", body.id);
      if (error) throw error;
      return Response.json({ success: true });
    }

    return Response.json({ success: false, error: "Acción desconocida" }, { status: 400 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
