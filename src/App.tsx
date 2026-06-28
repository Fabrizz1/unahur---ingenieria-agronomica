import React, { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  MessageSquare,
  Calendar,
  Sprout,
  Mail,
  X,
  Upload,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  LogIn,
  LogOut,
  User,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SUBJECTS_DATA } from "./data";
import { Subject, ForumPost } from "./types";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";
import { AuthModal } from "./components/AuthModal";

import { Reveal } from "./components/Reveal";
import { AgroecologiaSection } from "./components/AgroecologiaSection";
import { MaterialsSection } from "./components/MaterialsSection";
import { ForumSection } from "./components/ForumSection";
import { NewsSection } from "./components/NewsSection";
import { SimulatorSection } from "./components/SimulatorSection";
import { ContactSection } from "./components/ContactSection";
import { BentoSidebar } from "./components/BentoSidebar";
import { useTheme } from "./ThemeContext";
import { AdminPanel } from "./components/AdminPanel";

// Key constants for local storage
const LS_FORUM_POSTS = "unahur_agronomia_forum_posts_v2";

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
}

// Prepopulated Forum Posts — vacío (los usuarios crean sus propios posts)
const INITIAL_FORUM_POSTS: ForumPost[] = [];

const FORO_API = "/api/foro";

function mapRowFromDb(row: any): ForumPost {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    authorRole: row.author_role ?? row.authorRole,
    content: row.content,
    tags: Array.isArray(row.tags) ? row.tags : (typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags ?? []),
    likes: row.likes ?? 0,
    likedByUser: row.liked_by_user ?? row.likedByUser ?? false,
    replies: Array.isArray(row.replies) ? row.replies.map((r: any) => ({
      id: r.id,
      author: r.author,
      authorRole: r.author_role ?? r.authorRole,
      content: r.content,
      timestamp: r.timestamp,
    })) : [],
    timestamp: row.timestamp,
    subjectId: row.subject_id ?? row.subjectId,
    userId: row.user_id,
    userEmail: row.user_email,
  };
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { user, session, isAdmin, loading: authLoading } = useAuth();

  // Navigation & UI tabs State
  const [activeTab, setActiveTab] = useState<"agroecologia" | "materiales" | "foro" | "noticias" | "simulador" | "contacto" | "admin">(
    () => (localStorage.getItem("agroweb_activeTab") as any) || "agroecologia"
  );

  // Database State (with server + localStorage persistence)
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [sharedMaterials, setSharedMaterials] = useState<SharedMaterial[]>([]);
  const [materialsLoading, setMaterialsLoading] = useState(true);

  // Search & Filter State
  const [searchSubject, setSearchSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "todos">("todos");
  const [selectedArea, setSelectedArea] = useState<string | "todos">("todos");
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  // Modals
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // New Post State
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTagString, setNewPostTagString] = useState("");
  const [newPostSubject, setNewPostSubject] = useState("");
  const [newPostAuthorRole, setNewPostAuthorRole] = useState<ForumPost["authorRole"]>("Estudiante de 1° año");

  // New Comment State (for a specific post)
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  // New Material Upload State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadSubjectId, setUploadSubjectId] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<SharedMaterial["category"]>("Apunte");
  const [uploadAuthor, setUploadAuthor] = useState("");

  // Success Feedbacks (Toasts/Notifications)
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // On mount: Load from API (with localStorage fallback)
  useEffect(() => {
    const loadFromLS = () => {
      const savedPosts = localStorage.getItem(LS_FORUM_POSTS);
      if (savedPosts) {
        try { return JSON.parse(savedPosts); } catch { return INITIAL_FORUM_POSTS; }
      }
      return INITIAL_FORUM_POSTS;
    };

    const loadPosts = async () => {
      try {
        const res = await fetch(FORO_API, { signal: AbortSignal.timeout(8000) });
        const json = await res.json();
        if (json.success) {
          const mapped = json.data.map(mapRowFromDb);
          setForumPosts(mapped);
          localStorage.setItem(LS_FORUM_POSTS, JSON.stringify(mapped));
          return;
        }
      } catch {}
      setForumPosts(loadFromLS());
    };
    loadPosts();

    fetch("/api/materials")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          const mapped = j.data.map((row: any) => ({
            id: row.id,
            subjectId: row.subject_id,
            title: row.title,
            category: row.category,
            author: row.author,
            fileSize: row.file_size ?? row.fileSize,
            downloads: row.downloads ?? 0,
            link: row.link ?? "#",
            timestamp: row.timestamp,
            userId: row.user_id,
            userEmail: row.user_email,
          }));
          setSharedMaterials(mapped);
        }
      })
      .finally(() => setMaterialsLoading(false));
  }, []);

  // Realtime: escucha posts nuevos de otros usuarios
  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel("forum-posts")
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "forum_posts" },
        (payload: any) => {
          const newPost = mapRowFromDb(payload.new);
          setForumPosts((prev) => {
            if (prev.some((p) => p.id === newPost.id)) return prev;
            return [newPost, ...prev];
          });
        }
      )
      .subscribe();
    return () => { channel.unsubscribe(); };
  }, []);

  // Persist pestaña activa
  useEffect(() => {
    localStorage.setItem("agroweb_activeTab", activeTab);
  }, [activeTab]);

  // Save to LocalStorage helpers
  const savePostsToLS = (updatedPosts: ForumPost[]) => {
    setForumPosts(updatedPosts);
    localStorage.setItem(LS_FORUM_POSTS, JSON.stringify(updatedPosts));
  };

  const saveMaterialsState = (updatedMaterials: SharedMaterial[]) => {
    setSharedMaterials(updatedMaterials);
  };

  // Show quick status toast
  const triggerNotification = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }
    return headers;
  };

  const handleNewPostClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsNewPostOpen(true);
    }
  };

  // Handle Likes on forum
  const handleLikePost = async (postId: string) => {
    const liked = !forumPosts.find(p => p.id === postId)?.likedByUser;
    try {
      await fetch(FORO_API, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "like", postId, liked }),
      });
      const updated = forumPosts.map(post => {
        if (post.id === postId) return { ...post, likedByUser: liked, likes: post.likes + (liked ? 1 : -1) };
        return post;
      });
      savePostsToLS(updated);
    } catch {
      const updated = forumPosts.map(post => {
        if (post.id === postId) {
          const l = !post.likedByUser;
          return { ...post, likedByUser: l, likes: l ? post.likes + 1 : post.likes - 1 };
        }
        return post;
      });
      savePostsToLS(updated);
    }
  };

  // Handle New Forum Post Submit
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const tagsArray = newPostTagString
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      author: user?.email || "Anónimo",
      authorRole: newPostAuthorRole,
      content: newPostContent,
      tags: tagsArray.length > 0 ? tagsArray : ["General"],
      likes: 1,
      likedByUser: true,
      timestamp: "Hace unos instantes",
      subjectId: newPostSubject || undefined,
      replies: [],
      userId: user?.id,
      userEmail: user?.email,
    };

    try {
      await fetch(FORO_API, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          tags: newPost.tags,
          authorRole: newPost.authorRole,
          subjectId: newPost.subjectId,
          timestamp: newPost.timestamp,
        }),
      });
    } catch {}

    savePostsToLS([newPost, ...forumPosts]);
    setIsNewPostOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTagString("");
    setNewPostSubject("");
    triggerNotification("¡Tu consulta fue compartida con la comunidad!");
  };

  // Handle Comment Submit
  const handleAddComment = async (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const reply = {
      id: `rep-${Date.now()}`,
      author: user?.email || "Anónimo",
      authorRole: "Estudiante de Agronomía",
      content: text.trim(),
      timestamp: "Hace unos instantes"
    };

    try {
      await fetch(FORO_API, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "comment", postId, ...reply }),
      });
    } catch {}

    const updated = forumPosts.map(post => {
      if (post.id === postId) {
        return { ...post, replies: [...post.replies, reply] };
      }
      return post;
    });

    savePostsToLS(updated);
    setCommentInputs({ ...commentInputs, [postId]: "" });
    triggerNotification("Comentario publicado");
  };

  // Handle Delete Forum Post
  const handleDeletePost = async (postId: string) => {
    const post = forumPosts.find(p => p.id === postId);
    if (post && post.userId && post.userId !== user?.id && !isAdmin) return;

    try {
      await fetch(FORO_API, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "delete", postId }),
      });
    } catch {}
    const updated = forumPosts.filter(p => p.id !== postId);
    savePostsToLS(updated);
    triggerNotification("Consulta eliminada");
  };

  // Handle Delete Material
  const handleDeleteMaterial = async (materialId: string) => {
    try {
      await fetch("/api/materials", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "delete", id: materialId }),
      });
    } catch {}
    const updated = sharedMaterials.filter(m => m.id !== materialId);
    saveMaterialsState(updated);
    triggerNotification("Material eliminado");
  };

  // Handle Download material
  const handleDownloadMaterial = async (materialId: string, title: string) => {
    try {
      await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "download", id: materialId }),
      });
    } catch {}
    const updated = sharedMaterials.map(m => {
      if (m.id === materialId) {
        return { ...m, downloads: m.downloads + 1 };
      }
      return m;
    });
    saveMaterialsState(updated);
    triggerNotification(`Descargando "${title}"...`, "info");
  };

  // Handle Create shared material
  const handleUploadMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadSubjectId || !uploadTitle.trim()) return;

    const newMat: SharedMaterial = {
      id: `mat-${Date.now()}`,
      subjectId: uploadSubjectId,
      title: uploadTitle,
      category: uploadCategory,
      author: uploadAuthor.trim() || user?.email || "Estudiante Colaborador",
      fileSize: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      downloads: 0,
      link: "#",
      timestamp: "Hoy"
    };

    try {
      await fetch("/api/materials", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          subjectId: uploadSubjectId,
          title: uploadTitle,
          category: uploadCategory,
          author: uploadAuthor.trim() || user?.email || "Estudiante Colaborador",
          fileSize: newMat.fileSize,
          timestamp: "Hoy",
        }),
      });
    } catch {}

    saveMaterialsState([newMat, ...sharedMaterials]);
    setIsUploadOpen(false);
    setUploadTitle("");
    setUploadAuthor("");
    triggerNotification("¡Material compartido con éxito!");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans selection:bg-[var(--accent1)] selection:text-[var(--text)]">
      {/* Dynamic Status Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border text-xs font-mono uppercase tracking-wider font-semibold ${
              notification.type === "success"
                ? "bg-[var(--footer)] text-[var(--bg2)] dark:text-white border-[var(--border)]"
                : "bg-[var(--accent1)] text-[var(--text)] border-[var(--border-20)]"
            }`}
          >
            {notification.type === "success" ? <CheckCircle2 className="w-4 h-4 text-[var(--accent1)]" /> : <AlertCircle className="w-4 h-4" />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION (Editorial/Newspaper theme) */}
      <header className="bg-[var(--bg2)] border-b-2 border-[var(--border)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--accent3)] font-bold">
            <Sprout className="w-4 h-4 text-[var(--accent3)]" />
            <span>Universidad Nacional de Hurlingham</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-[var(--text)] leading-tight">
            Agroecología: <span className="text-[var(--accent3)]">Futuro y Solución</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text2)] font-serif font-bold italic max-w-2xl">
            Ingeniería Agronómica · UNAHUR
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] sm:text-xs text-[var(--text3)] font-mono uppercase tracking-widest max-w-2xl"
          >
            El saber es transformar.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-[10px] sm:text-xs text-[var(--text3)] font-mono uppercase tracking-widest max-w-2xl"
          >
            Volumen I · Edición 2026
          </motion.p>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-none border border-[var(--border-15)] bg-[var(--bg3)] hover:bg-[var(--accent1)] text-[var(--text)] transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--text2)] hidden sm:inline">{user.email}</span>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="p-2 rounded-none border border-[var(--border-15)] bg-[var(--bg3)] hover:bg-red-100 dark:hover:bg-red-900/30 text-[var(--text)] transition-colors cursor-pointer"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 rounded-none border border-[var(--border-15)] bg-[var(--bg3)] hover:bg-[var(--accent1)] text-[var(--text)] transition-colors cursor-pointer"
                title="Iniciar sesión"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: "agroecologia", label: "Agroecología", icon: Sprout },
              { id: "materiales", label: "Biblioteca de Apuntes", icon: BookOpen },
              { id: "foro", label: "Foro de Debate", icon: MessageSquare },
              { id: "noticias", label: "Noticias y Salidas", icon: Calendar },
              { id: "simulador", label: "Simulador de Cultivos", icon: Sprout },
              { id: "contacto", label: "Contacto", icon: Mail },
              ...(isAdmin ? [{ id: "admin" as const, label: "Admin", icon: Shield }] : []),
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 border transition-colors cursor-pointer font-serif font-bold text-xs uppercase tracking-wider rounded-none ${
                    isSelected
                      ? "bg-[var(--footer)] text-[var(--bg2)] dark:text-white border-[var(--border)]"
                      : "bg-[var(--bg3)] text-[var(--text)] border-[var(--border-15)] hover:border-[var(--border-50)] dark:hover:bg-[var(--bg2)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* SUB-HERO INFO BANNER */}
      <div className="bg-[var(--footer)] text-[var(--bg2)] dark:text-white text-[10px] py-2 px-4 border-b border-[var(--border-20)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 font-mono uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--accent1)] bg-[var(--accent4)] px-2 py-0.5 text-[9px]">Grado</span>
            <span>Plan de Estudios: Ingeniería Agronómica (5 Años)</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text3)]">
            <span>Sede Hurlingham, Origone 151</span>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: ACTIVE INTERACTIVE MODULE */}
        <div className={`flex-1 space-y-6 ${activeTab === "simulador" ? "" : "lg:max-w-[70%]"}`}>
          <Reveal key={activeTab}>
          {activeTab === "agroecologia" && (
            <AgroecologiaSection />
          )}

          {activeTab === "materiales" && (
            <MaterialsSection
              sharedMaterials={sharedMaterials}
              searchSubject={searchSubject}
              setSearchSubject={setSearchSubject}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              expandedSubjectId={expandedSubjectId}
              setExpandedSubjectId={setExpandedSubjectId}
              setIsUploadOpen={setIsUploadOpen}
              setUploadSubjectId={setUploadSubjectId}
              handleDownloadMaterial={handleDownloadMaterial}
              handleDeleteMaterial={handleDeleteMaterial}
              user={user}
              isAdmin={isAdmin}
            />
          )}

          {activeTab === "foro" && (
            <ForumSection
              forumPosts={forumPosts}
              commentInputs={commentInputs}
              setCommentInputs={setCommentInputs}
              handleLikePost={handleLikePost}
              handleAddComment={handleAddComment}
              handleDeletePost={handleDeletePost}
              setIsNewPostOpen={handleNewPostClick}
              user={user}
              isAdmin={isAdmin}
            />
          )}

          {activeTab === "noticias" && (
            <NewsSection triggerNotification={triggerNotification} />
          )}

          {activeTab === "simulador" && (
            <SimulatorSection triggerNotification={triggerNotification} />
          )}

          {activeTab === "contacto" && (
            <ContactSection triggerNotification={triggerNotification} />
          )}

          {activeTab === "admin" && (
            <AdminPanel />
          )}
          </Reveal>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className={`lg:w-[30%] space-y-8 ${activeTab === "simulador" ? "hidden lg:hidden" : ""}`}>
          <Reveal delay={0.15}>
            <BentoSidebar />
          </Reveal>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--footer)] text-[var(--text4)] py-12 border-t border-[var(--border)] mt-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[var(--bg2)] dark:text-white text-sm">
            <Sprout className="w-5 h-5 text-[var(--accent1)]" />
            <span className="font-serif font-black tracking-widest uppercase">UNAHUR</span>
             <span className="font-light text-[var(--text3)]">| Instituto de Biotecnología</span>
          </div>
          <p className="text-xs text-[var(--text2)] max-w-xl mx-auto leading-relaxed">
            Este portal ha sido diseñado con estándares de rigor editorial y sirve como espacio oficial de trabajo colaborativo para la comunidad estudiantil de Ingeniería Agronómica, Sede Hurlingham, Buenos Aires.
          </p>
          <div className="text-[10px] text-[var(--text3)] font-mono uppercase tracking-widest pt-4 border-t border-[var(--border-5)] max-w-md mx-auto">
            <span>© 2026 Universidad Nacional de Hurlingham. Licencia CC BY-NC-SA 4.0.</span>
          </div>
        </div>
      </footer>

      {/* MODAL 1: AUTH */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* MODAL 2: NEW FORUM POST */}
      <AnimatePresence>
        {isNewPostOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--overlay)] backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[var(--bg3)] w-full max-w-lg rounded-none shadow-2xl overflow-hidden border border-[var(--border)]"
            >
              <div className="bg-[var(--footer)] text-white p-4 flex justify-between items-center border-b border-[var(--border)]">
                <h3 className="font-serif font-black text-sm flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-[var(--accent1)]" />
                  Compartir una Consulta Técnica
                </h3>
                <button
                  onClick={() => setIsNewPostOpen(false)}
                    className="p-1 rounded-none hover:bg-[var(--accent4)] text-[var(--text4)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                <div className="text-[10px] font-mono text-[var(--text3)] bg-[var(--bg2)] p-2 border border-[var(--border-10)]">
                  Publicando como: <span className="font-bold text-[var(--text)]">{user?.email}</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-serif font-bold text-[var(--text)] block">Título de la Consulta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: ¿Diferencias de pH en horizonte argílico?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Vincular Materia (Opcional)</label>
                    <select
                      value={newPostSubject}
                      onChange={(e) => setNewPostSubject(e.target.value)}
                      className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                    >
                      <option value="">Ninguna - General</option>
                      {SUBJECTS_DATA.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Perfil Universitario</label>
                    <select
                      value={newPostAuthorRole}
                      onChange={(e) => setNewPostAuthorRole(e.target.value as ForumPost["authorRole"])}
                      className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                    >
                      <option value="Estudiante de 1° año">Estudiante de 1° año</option>
                      <option value="Estudiante de 3° año">Estudiante de 3° año</option>
                      <option value="Ayudante de Cátedra">Ayudante de Cátedra</option>
                      <option value="Técnico Universitario">Técnico Universitario</option>
                      <option value="Egresado/a">Egresado/a</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Etiquetas (Separadas por comas)</label>
                  <input
                    type="text"
                    placeholder="Ej: edafologia, final, practico"
                    value={newPostTagString}
                    onChange={(e) => setNewPostTagString(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                  />
                </div>

                <div className="space-y-1">
                  <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Cuerpo de la Consulta</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describí tu duda técnica u organizativa de manera prolija..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-[var(--border-10)] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewPostOpen(false)}
                    className="px-4 py-2 text-[var(--text3)] hover:text-[var(--text)] text-xs font-serif font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-white font-serif font-bold text-xs px-5 py-2.5 rounded-none border border-[var(--border)] transition-all cursor-pointer"
                  >
                    Publicar en Cartelera
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: UPLOAD MATERIAL */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--overlay)] backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[var(--bg3)] w-full max-w-lg rounded-none shadow-2xl overflow-hidden border border-[var(--border)]"
            >
              <div className="bg-[var(--footer)] text-white p-4 flex justify-between items-center border-b border-[var(--border)]">
                <h3 className="font-serif font-black text-sm flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[var(--accent1)]" />
                  Aportar un Documento Académico
                </h3>
                <button
                  onClick={() => setIsUploadOpen(false)}
                    className="p-1 rounded-none hover:bg-[var(--accent4)] text-[var(--text4)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUploadMaterial} className="p-6 space-y-4">
                <div className="space-y-1">
                  <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Materia Asociada</label>
                  <select
                    required
                    value={uploadSubjectId}
                    onChange={(e) => setUploadSubjectId(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                  >
                    <option value="">Seleccionar de la Lista...</option>
                    {SUBJECTS_DATA.map(s => (
                      <option key={s.id} value={s.id}>[{s.year}° Año] {s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Categoría de Archivo</label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value as SharedMaterial["category"])}
                      className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                    >
                      <option value="Apunte">Apunte de clase</option>
                      <option value="Resumen">Resumen integral</option>
                      <option value="Examen">Modelo de examen / Parcial</option>
                      <option value="Guía Práctica">Guía o Ficha Técnica</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Nombre del Autor (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej: Sofía L."
                      value={uploadAuthor}
                      onChange={(e) => setUploadAuthor(e.target.value)}
                      className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <                    label className="text-xs font-serif font-bold text-[var(--text)] block">Título o Descripción Corta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Resumen metabolismo fotosintético C3 vs C4"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                  />
                </div>

                {/* Dropzone mockup */}
                <div className="border-2 border-dashed border-[var(--border-15)] rounded-none p-6 text-center hover:border-[var(--border)] transition-all bg-[var(--bg2)]">
                  <Upload className="w-8 h-8 text-[var(--accent3)]/60 mx-auto mb-2" />
                  <p className="text-xs font-serif font-bold text-[var(--text)]">Arrastrá tus ficheros PDF, DOCX o Fotos aquí</p>
                  <p className="text-[10px] text-[var(--text3)] mt-1 font-mono">Límite oficial de 25MB por archivo para subir.</p>
                </div>

                <div className="pt-4 border-t border-[var(--border-10)] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="px-4 py-2 text-[var(--text3)] hover:text-[var(--text)] text-xs font-serif font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-white font-serif font-bold text-xs px-5 py-2.5 rounded-none border border-[var(--border)] transition-all cursor-pointer"
                  >
                    Archivar en Biblioteca
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
