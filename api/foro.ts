import { createClient } from "@supabase/supabase-js";

export const config = {
  maxDuration: 10,
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

function mapRow(row: any) {
  return {
    ...row,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags ?? [],
    replies: typeof row.replies === "string" ? JSON.parse(row.replies) : row.replies ?? [],
  };
}

export async function GET() {
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
