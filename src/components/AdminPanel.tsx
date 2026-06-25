import React, { useState, useEffect } from "react";
import { Shield, Users, MessageSquare, BookOpen, Rss, Trash2, Pin, PinOff, PlusCircle } from "lucide-react";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";

type AdminTab = "dashboard" | "users" | "forum" | "materials" | "rss";

export function AdminPanel() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  return (
    <div className="space-y-6">
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold mb-2">
          <Shield className="w-4 h-4" />
          <span>Panel de Administración</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
          Control del Sitio
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: "dashboard" as const, label: "Dashboard", icon: Shield },
          { id: "users" as const, label: "Usuarios", icon: Users },
          { id: "forum" as const, label: "Foro", icon: MessageSquare },
          { id: "materials" as const, label: "Materiales", icon: BookOpen },
          { id: "rss" as const, label: "Fuentes RSS", icon: Rss },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border transition-colors cursor-pointer font-serif font-bold text-xs uppercase tracking-wider rounded-none flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-[var(--footer)] text-[var(--bg2)] dark:text-white border-[var(--border)]"
                  : "bg-[var(--bg3)] text-[var(--text)] border-[var(--border-15)] hover:border-[var(--border-50)]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === "dashboard" && <DashboardView />}
      {activeTab === "users" && <UsersView />}
      {activeTab === "forum" && <ForumView />}
      {activeTab === "materials" && <MaterialsView />}
      {activeTab === "rss" && <RssView />}
    </div>
  );

  function DashboardView() {
    const [stats, setStats] = useState<any>(null);
    const { getAuthHeaders } = useApi();

    useEffect(() => {
      getAuthHeaders().then((headers) => {
        fetch("/api/admin", { headers })
          .then((r) => r.json())
          .then((j) => { if (j.success) setStats(j.data); })
          .catch(() => {});
      });
    }, []);

    if (!stats) {
      return <div className="text-xs text-[var(--text3)] p-8 text-center font-mono">Cargando estadísticas...</div>;
    }

    const cards = [
      { label: "Usuarios", value: stats.users, icon: Users, color: "text-blue-600" },
      { label: "Posts en Foro", value: stats.posts, icon: MessageSquare, color: "text-green-600" },
      { label: "Materiales", value: stats.materials, icon: BookOpen, color: "text-orange-600" },
      { label: "Fuentes RSS", value: stats.rssSources, icon: Rss, color: "text-purple-600" },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-[var(--bg3)] border border-[var(--border-15)] p-6">
              <div className="flex items-center gap-3">
                <Icon className={`w-8 h-8 ${card.color}`} />
                <div>
                  <p className="text-2xl font-serif font-black text-[var(--text)]">{card.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text3)]">{card.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function UsersView() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const { getAuthHeaders } = useApi();

    const load = async () => {
      setLoading(true);
      const headers = await getAuthHeaders();
      const r = await fetch("/api/admin?section=users", { headers });
      const j = await r.json();
      if (j.success) setUsers(j.data);
      setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const changeRole = async (userId: string, role: string) => {
      const headers = await getAuthHeaders();
      const r = await fetch("/api/admin", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "changeRole", userId, role }),
      });
      const j = await r.json();
      if (j.success) {
        setMessage(`Rol cambiado a ${role}`);
        load();
      }
    };

    if (loading) return <div className="text-xs text-[var(--text3)] p-8 text-center font-mono">Cargando usuarios...</div>;

    return (
      <div className="bg-[var(--bg3)] border border-[var(--border-15)]">
        {message && <div className="bg-green-50 dark:bg-green-900/20 p-3 text-xs text-green-700 dark:text-green-400 border-b border-green-200">{message}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans">
            <thead>
              <tr className="border-b border-[var(--border-10)] bg-[var(--bg2)]">
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Email</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Nombre</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Rol</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Registro</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-b border-[var(--border-5)] hover:bg-[var(--bg2)]">
                  <td className="p-3 text-[var(--text)]">{u.email}</td>
                  <td className="p-3 text-[var(--text2)]">{u.full_name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold ${
                      u.role === "admin" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : "bg-[var(--accent2)] text-[var(--accent4)]"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--text3)]">{new Date(u.created_at).toLocaleDateString("es-AR")}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      className="text-[10px] py-1 px-2 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] cursor-pointer"
                    >
                      <option value="Estudiante">Estudiante</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function ForumView() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { getAuthHeaders } = useApi();

    useEffect(() => {
      (async () => {
        const { data } = await supabase
          .from("forum_posts")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(50);
        setPosts(data ?? []);
        setLoading(false);
      })();
    }, []);

    const deletePost = async (postId: string) => {
      if (!confirm("¿Eliminar este post permanentemente?")) return;
      const headers = await getAuthHeaders();
      await fetch("/api/admin", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "deleteAnyPost", postId }),
      });
      setPosts((p) => p.filter((x: any) => x.id !== postId));
    };

    const togglePin = async (postId: string) => {
      const headers = await getAuthHeaders();
      const r = await fetch("/api/admin", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "togglePin", postId }),
      });
      const j = await r.json();
      if (j.success) {
        setPosts((p: any[]) => p.map((x: any) => x.id === postId ? { ...x, is_pinned: j.data.is_pinned } : x));
      }
    };

    if (loading) return <div className="text-xs text-[var(--text3)] p-8 text-center font-mono">Cargando posts...</div>;

    return (
      <div className="space-y-3">
        {posts.length === 0 && <div className="text-xs text-[var(--text3)] p-8 text-center">No hay posts en el foro.</div>}
        {posts.map((post: any) => (
          <div key={post.id} className="bg-[var(--bg3)] border border-[var(--border-15)] p-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text3)] mb-1">
                {post.is_pinned && <Pin className="w-3 h-3 text-purple-500" />}
                <span>{post.author || "Anónimo"}</span>
                <span>·</span>
                <span>{post.timestamp}</span>
              </div>
              <h3 className="text-sm font-serif font-bold text-[var(--text)] truncate">{post.title}</h3>
              <p className="text-[11px] text-[var(--text2)] mt-1 line-clamp-2">{post.content}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => togglePin(post.id)} className="p-1.5 border border-[var(--border-15)] hover:bg-[var(--accent1)] cursor-pointer" title={post.is_pinned ? "Desfijar" : "Fijar"}>
                {post.is_pinned ? <PinOff className="w-3 h-3 text-[var(--text3)]" /> : <Pin className="w-3 h-3 text-[var(--text3)]" />}
              </button>
              <button onClick={() => deletePost(post.id)} className="p-1.5 border border-[var(--border-15)] hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer" title="Eliminar">
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function MaterialsView() {
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const { getAuthHeaders } = useApi();

    const load = async () => {
      setLoading(true);
      const r = await fetch("/api/materials");
      const j = await r.json();
      if (j.success) setMaterials(j.data);
      setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const deleteMaterial = async (materialId: string) => {
      if (!confirm("¿Eliminar este material?")) return;
      const headers = await getAuthHeaders();
      const r = await fetch("/api/admin", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "deleteAnyMaterial", materialId }),
      });
      const j = await r.json();
      if (j.success) {
        setMessage("Material eliminado");
        setMaterials((m: any[]) => m.filter((x: any) => x.id !== materialId));
      }
    };

    if (loading) return <div className="text-xs text-[var(--text3)] p-8 text-center font-mono">Cargando materiales...</div>;

    return (
      <div className="bg-[var(--bg3)] border border-[var(--border-15)]">
        {message && <div className="bg-green-50 dark:bg-green-900/20 p-3 text-xs text-green-700 dark:text-green-400 border-b border-green-200">{message}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans">
            <thead>
              <tr className="border-b border-[var(--border-10)] bg-[var(--bg2)]">
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Título</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Autor</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Categoría</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Descargas</th>
                <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Acción</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m: any) => (
                <tr key={m.id} className="border-b border-[var(--border-5)] hover:bg-[var(--bg2)]">
                  <td className="p-3 text-[var(--text)] font-medium">{m.title}</td>
                  <td className="p-3 text-[var(--text2)]">{m.author}</td>
                  <td className="p-3">
                    <span className="bg-[var(--accent2)] text-[var(--accent4)] text-[9px] font-mono px-2 py-0.5">{m.category}</span>
                  </td>
                  <td className="p-3 text-[var(--text3)]">{m.downloads}</td>
                  <td className="p-3">
                    <button onClick={() => deleteMaterial(m.id)} className="p-1 border border-[var(--border-15)] hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer">
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function RssView() {
    const [sources, setSources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newSection, setNewSection] = useState("Noticias");
    const { getAuthHeaders } = useApi();

    const load = async () => {
      setLoading(true);
      const headers = await getAuthHeaders();
      const r = await fetch("/api/admin?section=rss", { headers });
      const j = await r.json();
      if (j.success) setSources(j.data);
      setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const addSource = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newName.trim() || !newUrl.trim()) return;
      const headers = await getAuthHeaders();
      const r = await fetch("/api/admin", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "addRssSource", name: newName.trim(), url: newUrl.trim(), section: newSection }),
      });
      const j = await r.json();
      if (j.success) {
        setMessage(`Fuente "${newName}" agregada`);
        setNewName("");
        setNewUrl("");
        load();
      } else {
        setMessage(`Error: ${j.error}`);
      }
    };

    const removeSource = async (id: string, name: string) => {
      if (!confirm(`¿Eliminar "${name}"?`)) return;
      const headers = await getAuthHeaders();
      await fetch("/api/admin", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "deleteRssSource", id }),
      });
      setMessage(`Fuente "${name}" eliminada`);
      load();
    };

    const toggleSource = async (id: string, enabled: boolean) => {
      const headers = await getAuthHeaders();
      await fetch("/api/admin", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "toggleRssSource", id, enabled: !enabled }),
      });
      load();
    };

    if (loading) return <div className="text-xs text-[var(--text3)] p-8 text-center font-mono">Cargando fuentes...</div>;

    return (
      <div className="space-y-6">
        {message && <div className="bg-green-50 dark:bg-green-900/20 p-3 text-xs text-green-700 dark:text-green-400 border border-green-200">{message}</div>}

        <form onSubmit={addSource} className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 space-y-4">
          <h3 className="font-serif font-bold text-sm text-[var(--text)]">Agregar nueva fuente RSS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" required placeholder="Nombre (ej: Infocampo)" value={newName} onChange={(e) => setNewName(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]" />
            <input type="url" required placeholder="URL del feed RSS" value={newUrl} onChange={(e) => setNewUrl(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]" />
            <div className="flex gap-2">
              <select value={newSection} onChange={(e) => setNewSection(e.target.value)}
                className="flex-1 text-xs py-2 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none">
                <option value="Noticias">Noticias</option>
                <option value="Economía">Economía</option>
                <option value="Política">Política</option>
                <option value="Agroecología">Agroecología</option>
                <option value="Investigación">Investigación</option>
              </select>
              <button type="submit" className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-white font-serif font-bold text-xs px-4 py-2 rounded-none border border-[var(--border)] cursor-pointer flex items-center gap-1">
                <PlusCircle className="w-3 h-3" /> Agregar
              </button>
            </div>
          </div>
        </form>

        <div className="bg-[var(--bg3)] border border-[var(--border-15)]">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans">
              <thead>
                <tr className="border-b border-[var(--border-10)] bg-[var(--bg2)]">
                  <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Nombre</th>
                  <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">URL</th>
                  <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Sección</th>
                  <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Activo</th>
                  <th className="text-left p-3 font-mono uppercase tracking-wider text-[var(--text3)]">Acción</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((s: any) => (
                  <tr key={s.id} className="border-b border-[var(--border-5)] hover:bg-[var(--bg2)]">
                    <td className="p-3 text-[var(--text)] font-medium">{s.name}</td>
                    <td className="p-3 text-[var(--text3)] max-w-[200px] truncate">{s.url}</td>
                    <td className="p-3">
                      <span className="bg-[var(--accent2)] text-[var(--accent4)] text-[9px] font-mono px-2 py-0.5">{s.section}</span>
                    </td>
                    <td className="p-3">
                      <button onClick={() => toggleSource(s.id, s.enabled)}
                        className={`text-[10px] px-2 py-1 border cursor-pointer font-mono uppercase ${s.enabled ? 'bg-green-100 dark:bg-green-900/30 text-green-700 border-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-300'}`}>
                        {s.enabled ? "Sí" : "No"}
                      </button>
                    </td>
                    <td className="p-3">
                      <button onClick={() => removeSource(s.id, s.name)} className="p-1 border border-[var(--border-15)] hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer">
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// ─── Hooks internos ───
function useApi() {
  const { session } = useAuth();
  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    headers["Authorization"] = `Bearer ${session?.access_token}`;
    return headers;
  };
  return { getAuthHeaders, session };
}
