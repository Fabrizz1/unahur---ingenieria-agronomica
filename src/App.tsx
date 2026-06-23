import React, { useState, useEffect } from "react";
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
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SUBJECTS_DATA } from "./data";
import { Subject } from "./types";

import { MaterialsSection } from "./components/MaterialsSection";
import { ForumSection } from "./components/ForumSection";
import { NewsSection } from "./components/NewsSection";
import { SimulatorSection } from "./components/SimulatorSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { BentoSidebar } from "./components/BentoSidebar";
import { useTheme } from "./ThemeContext";

// Key constants for local storage
const LS_FORUM_POSTS = "unahur_agronomia_forum_posts";
const LS_STUDY_MATERIALS = "unahur_agronomia_materials";

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorRole: "Estudiante de 1° año" | "Estudiante de 3° año" | "Egresado/a" | "Ayudante de Cátedra" | "Técnico Universitario";
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

// Prepopulated Forum Posts (Argentine college style)
const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: "post-1",
    title: "¿Consejos para rendir el final de Edafología?",
    author: "Mateo Fernández",
    authorRole: "Estudiante de 3° año",
    content: "Hola gente, ¿cómo están? Rindo Edafología y Manejo de Suelos la semana que viene con el profe Gómez. ¿Tienen idea si toma mucho de la clasificación de suelos de la provincia o va más por el lado físico (retención de agua y textura)? Cualquier tip me sirve una banda.",
    tags: ["Edafología", "Suelos", "Finales"],
    likes: 18,
    likedByUser: false,
    timestamp: "Hace 2 horas",
    subjectId: "edafologia-suelos",
    replies: [
      {
        id: "rep-1-1",
        author: "Sofía Martínez",
        authorRole: "Técnico Universitario",
        content: "¡Hola Mateo! Gómez le da mucha bola al triángulo de texturas y cómo afecta la capacidad de campo. Seguro te hace calcular el agua útil. Estudiate re bien las propiedades del horizonte Argílico de acá de la zona bonaerense. ¡Éxitos!",
        timestamp: "Hace 1 hora"
      },
      {
        id: "rep-1-2",
        author: "Profe Lucas (Ayudante)",
        authorRole: "Ayudante de Cátedra",
        content: "Sumo a lo de Sofi: repasen el método de la pipeta de Robinson para textura y no dejen de leer sobre la compactación por labranza pesada. ¡Nos vemos el miércoles!",
        timestamp: "Hace 30 mins"
      }
    ]
  },
  {
    id: "post-2",
    title: "Resumen completo de Ecofisiología Vegetal (Metabolismo C3/C4/CAM)",
    author: "Lucía Carrizo",
    authorRole: "Estudiante de 3° año",
    content: "¡Buenas! Armé un cuadro comparativo super prolijo de las rutas de fijación del carbono, transpiración y eficiencia en el uso de agua para los distintos grupos de cultivos. Espero que les sirva para el segundo parcial de Ecofisiología Vegetal.",
    tags: ["Ecofisiología Vegetal", "Resúmenes", "Parciales"],
    likes: 34,
    likedByUser: false,
    timestamp: "Hace 1 día",
    subjectId: "ecofisiologia-vegetal",
    replies: [
      {
        id: "rep-2-1",
        author: "Facundo Díaz",
        authorRole: "Estudiante de 1° año",
        content: "¡Uf, genial Lu! Me salvaste la vida, no entendía una goma la diferencia de anatomía Kranz. Te ganaste el cielo.",
        timestamp: "Hace 18 horas"
      }
    ]
  },
  {
    id: "post-3",
    title: "Prácticas de Tecnologías Agrícolas en el predio de UNAHUR",
    author: "Nacho Alarcón",
    authorRole: "Estudiante de 3° año",
    content: "Hola! ¿Alguien sabe si el sábado que viene hay colectivos saliendo de la sede para ir al lote de prácticas o nos encontramos directamente allá? Es para la calibración de sembradora y el manejo del dron de precisión.",
    tags: ["Tecnologías Agrícolas", "Prácticas", "Lote de Campo"],
    likes: 7,
    likedByUser: false,
    timestamp: "Hace 2 días",
    subjectId: "tecnologias-agricolas",
    replies: [
      {
        id: "rep-3-1",
        author: "Bedelía Agronomía",
        authorRole: "Egresado/a",
        content: "Hola Nacho, sale un micro desde Origone a las 7:45 AM. Asegurate de llevar calzado cerrado de seguridad y libreta de campo.",
        timestamp: "Hace 1 día"
      }
    ]
  }
];

// Prepopulated Shared Materials
const INITIAL_MATERIALS: SharedMaterial[] = [
  {
    id: "mat-f1",
    subjectId: "edafologia-suelos",
    title: "Guía de Determinación de Humedad del Suelo por Gravimetría",
    category: "Guía Práctica",
    author: "Cátedra de Edafología",
    fileSize: "1.2 MB",
    downloads: 145,
    link: "#",
    timestamp: "15 May 2026"
  },
  {
    id: "mat-f2",
    subjectId: "edafologia-suelos",
    title: "Apunte Teoría de Coloides y Capacidad de Intercambio Catiónico (CIC)",
    category: "Apunte",
    author: "Santiago Rossi",
    fileSize: "3.4 MB",
    downloads: 210,
    link: "#",
    timestamp: "12 Jun 2026"
  },
  {
    id: "mat-f3",
    subjectId: "climatologia-fenologia",
    title: "Recopilación de Efemérides de Heladas en Hurlingham (2010-2025)",
    category: "Resumen",
    author: "Ing. Climatología",
    fileSize: "850 KB",
    downloads: 98,
    link: "#",
    timestamp: "02 Jun 2026"
  },
  {
    id: "mat-f4",
    subjectId: "quimica-general",
    title: "Modelo de examen libre y respuestas - Química General",
    category: "Examen",
    author: "Matias G.",
    fileSize: "2.1 MB",
    downloads: 320,
    link: "#",
    timestamp: "28 May 2026"
  },
  {
    id: "mat-f5",
    subjectId: "manejo-adversidades",
    title: "Ficha Técnica: Manejo Agroecológico de Malezas en el Cinturón Hortícola",
    category: "Guía Práctica",
    author: "Programa Extensión UNAHUR",
    fileSize: "4.8 MB",
    downloads: 184,
    link: "#",
    timestamp: "20 Jun 2026"
  }
];

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Navigation & UI tabs State
  const [activeTab, setActiveTab] = useState<"materiales" | "foro" | "noticias" | "simulador" | "sobre" | "contacto">("materiales");

  // Database State (with localStorage persistence)
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [sharedMaterials, setSharedMaterials] = useState<SharedMaterial[]>([]);

  // Search & Filter State
  const [searchSubject, setSearchSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "todos">("todos");
  const [selectedArea, setSelectedArea] = useState<string | "todos">("todos");
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  // New Post State
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
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

  // On mount: Load from localStorage or set initial values
  useEffect(() => {
    const savedPosts = localStorage.getItem(LS_FORUM_POSTS);
    if (savedPosts) {
      try {
        setForumPosts(JSON.parse(savedPosts));
      } catch (e) {
        setForumPosts(INITIAL_FORUM_POSTS);
      }
    } else {
      setForumPosts(INITIAL_FORUM_POSTS);
      localStorage.setItem(LS_FORUM_POSTS, JSON.stringify(INITIAL_FORUM_POSTS));
    }

    const savedMaterials = localStorage.getItem(LS_STUDY_MATERIALS);
    if (savedMaterials) {
      try {
        setSharedMaterials(JSON.parse(savedMaterials));
      } catch (e) {
        setSharedMaterials(INITIAL_MATERIALS);
      }
    } else {
      setSharedMaterials(INITIAL_MATERIALS);
      localStorage.setItem(LS_STUDY_MATERIALS, JSON.stringify(INITIAL_MATERIALS));
    }
  }, []);

  // Save to LocalStorage helpers
  const savePostsToLS = (updatedPosts: ForumPost[]) => {
    setForumPosts(updatedPosts);
    localStorage.setItem(LS_FORUM_POSTS, JSON.stringify(updatedPosts));
  };

  const saveMaterialsToLS = (updatedMaterials: SharedMaterial[]) => {
    setSharedMaterials(updatedMaterials);
    localStorage.setItem(LS_STUDY_MATERIALS, JSON.stringify(updatedMaterials));
  };

  // Show quick status toast
  const triggerNotification = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Handle Likes on forum
  const handleLikePost = (postId: string) => {
    const updated = forumPosts.map(post => {
      if (post.id === postId) {
        const liked = !post.likedByUser;
        return {
          ...post,
          likedByUser: liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    });
    savePostsToLS(updated);
  };

  // Handle New Forum Post Submit
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const tagsArray = newPostTagString
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      author: "Vos (Estudiante)",
      authorRole: newPostAuthorRole,
      content: newPostContent,
      tags: tagsArray.length > 0 ? tagsArray : ["General"],
      likes: 1,
      likedByUser: true,
      timestamp: "Hace unos instantes",
      subjectId: newPostSubject || undefined,
      replies: []
    };

    savePostsToLS([newPost, ...forumPosts]);
    setIsNewPostOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTagString("");
    setNewPostSubject("");
    triggerNotification("¡Tu consulta fue compartida con la comunidad!");
  };

  // Handle Comment Submit
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const updated = forumPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: `rep-${Date.now()}`,
              author: "Vos (Estudiante)",
              authorRole: "Estudiante de Agronomía",
              content: text.trim(),
              timestamp: "Hace unos instantes"
            }
          ]
        };
      }
      return post;
    });

    savePostsToLS(updated);
    setCommentInputs({ ...commentInputs, [postId]: "" });
    triggerNotification("Comentario publicado");
  };

  // Handle Download material
  const handleDownloadMaterial = (materialId: string, title: string) => {
    const updated = sharedMaterials.map(m => {
      if (m.id === materialId) {
        return { ...m, downloads: m.downloads + 1 };
      }
      return m;
    });
    saveMaterialsToLS(updated);
    triggerNotification(`Descargando "${title}"...`, "info");
  };

  // Handle Create shared material
  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadSubjectId || !uploadTitle.trim()) return;

    const newMat: SharedMaterial = {
      id: `mat-${Date.now()}`,
      subjectId: uploadSubjectId,
      title: uploadTitle,
      category: uploadCategory,
      author: uploadAuthor.trim() || "Estudiante Colaborador",
      fileSize: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      downloads: 0,
      link: "#",
      timestamp: "Hoy"
    };

    saveMaterialsToLS([newMat, ...sharedMaterials]);
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-[var(--text)]">
            Ingeniería Agronómica <span className="font-serif italic font-normal text-[var(--accent3)]">UNAHUR</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text2)] font-sans max-w-2xl leading-relaxed">
            Portal académico y técnico colaborativo para estudiantes y docentes del Departamento de Ciencias Aplicadas.
          </p>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-none border border-[var(--border-15)] bg-[var(--bg3)] hover:bg-[var(--accent1)] text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Double border ticker-like row */}
          <div className="w-full border-t border-b border-[var(--border-15)] py-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-[var(--text3)]">
            <span>Volumen III · Edición 2026</span>
            <span className="text-[var(--text)] font-serif font-bold italic lowercase text-xs">Saber para transformar</span>
            <span>Estación Hurlingham: {new Date().toLocaleDateString("es-AR")}</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: "materiales", label: "Biblioteca de Apuntes", icon: BookOpen },
              { id: "foro", label: "Foro de Debate", icon: MessageSquare },
              { id: "noticias", label: "Noticias y Salidas", icon: Calendar },
              { id: "simulador", label: "Simulador de Cultivos", icon: Sprout },
              { id: "sobre", label: "Sobre el proyecto", icon: Sprout },
              { id: "contacto", label: "Contacto", icon: Mail }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 border transition-all cursor-pointer font-serif font-bold text-xs uppercase tracking-wider rounded-none ${
                    isSelected
                      ? "bg-[var(--footer)] text-[var(--bg2)] dark:text-white border-[var(--border)]"
                      : "bg-[var(--bg3)] text-[var(--text)] border-[var(--border-15)] hover:border-[var(--border-50)] dark:hover:bg-[var(--bg2)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </span>
                </button>
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
            <span className="hidden sm:inline">|</span>
            <span>Título Intermedio: Técnico Universitario en Producción Agropecuaria</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text3)]">
            <span>Sede Hurlingham, Origone 151</span>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: ACTIVE INTERACTIVE MODULE */}
        <div className="flex-1 lg:max-w-[70%] space-y-6">
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
            />
          )}

          {activeTab === "foro" && (
            <ForumSection
              forumPosts={forumPosts}
              commentInputs={commentInputs}
              setCommentInputs={setCommentInputs}
              handleLikePost={handleLikePost}
              handleAddComment={handleAddComment}
              setIsNewPostOpen={setIsNewPostOpen}
            />
          )}

          {activeTab === "noticias" && (
            <NewsSection triggerNotification={triggerNotification} />
          )}

          {activeTab === "simulador" && (
            <SimulatorSection triggerNotification={triggerNotification} />
          )}

          {activeTab === "sobre" && <AboutSection />}

          {activeTab === "contacto" && (
            <ContactSection triggerNotification={triggerNotification} />
          )}
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="lg:w-[30%] space-y-8">
          <BentoSidebar />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--footer)] text-[var(--text4)] py-12 border-t border-[var(--border)] mt-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[var(--bg2)] dark:text-white text-sm">
            <Sprout className="w-5 h-5 text-[var(--accent1)]" />
            <span className="font-serif font-black tracking-widest uppercase">UNAHUR</span>
            <span className="font-light text-[var(--text3)]">| Departamento de Ciencias Aplicadas</span>
          </div>
          <p className="text-xs text-[var(--text2)] max-w-xl mx-auto leading-relaxed">
            Este portal ha sido diseñado con estándares de rigor editorial y sirve como espacio oficial de trabajo colaborativo para la comunidad estudiantil de Ingeniería Agronómica, Sede Hurlingham, Buenos Aires.
          </p>
          <div className="text-[10px] text-[var(--text3)] font-mono uppercase tracking-widest pt-4 border-t border-[var(--border-5)] max-w-md mx-auto">
            <span>© 2026 Universidad Nacional de Hurlingham. Licencia CC BY-NC-SA 4.0.</span>
          </div>
        </div>
      </footer>

      {/* MODAL 1: NEW FORUM POST */}
      <AnimatePresence>
        {isNewPostOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4   bg-[var(--overlay)] backdrop-blur-xs">
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

      {/* MODAL 2: UPLOAD MATERIAL */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4   bg-[var(--overlay)] backdrop-blur-xs">
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
