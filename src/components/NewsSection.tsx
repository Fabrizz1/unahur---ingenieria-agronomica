import React, { useState, useEffect, useMemo } from "react";
import { Calendar, Heart, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
];

function pickFallbackImage(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return FALLBACK_IMAGES[Math.abs(hash) % FALLBACK_IMAGES.length];
}

const NEWS_DATA_FALLBACK = [
  {
    id: "fallback-noticias-1",
    title: "Inauguración de la nueva Estación Agroclimatológica Digital en el Campus",
    section: "Noticias",
    date: "22 de Junio, 2026",
    summary: "La UNAHUR instaló sensores IoT de última generación para medir temperatura de suelo, radiación solar y humedad del aire, de acceso abierto para toda la carrera.",
    likes: 42,
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-noticias-2",
    title: "Visita de campo al INTA Castelar: Manejo de Plagas en Horticultura",
    section: "Noticias",
    date: "18 de Junio, 2026",
    summary: "Estudiantes de Manejo Agroecológico de Adversidades visitaron el instituto nacional para capacitarse en técnicas de biocontrol usando parasitoides nativos de la pampa.",
    likes: 56,
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-economia-1",
    title: "Abierta la Convocatoria de Becas de Estímulo a la Investigación Agraria",
    section: "Economía",
    date: "15 de Junio, 2026",
    summary: "Se seleccionarán 4 proyectos enfocados en la sustentabilidad del Cinturón Verde Bonaerense. Convocatoria abierta para alumnos de 4° y 5° año.",
    likes: 29,
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-politica-1",
    title: "Nueva Ley de Presupuestos Mínimos para la Agricultura Familiar en debate legislativo",
    section: "Política",
    date: "10 de Junio, 2026",
    summary: "El Congreso debate un proyecto de ley que establece un marco regulatorio para la agricultura familiar, incluyendo acceso a tierras, créditos blandos y asistencia técnica estatal.",
    likes: 34,
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-agroecologia-1",
    title: "Taller de Conservación de Semillas Nativas en la Huerta Comunidad Ferroviaria",
    section: "Agroecología",
    date: "5 de Junio, 2026",
    summary: "Se realizó un taller gratuito de conservación de semillas criollas y nativas, abierto a toda la comunidad, con enfoque en la recuperación de variedades locales y soberanía alimentaria.",
    likes: 48,
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-investigacion-1",
    title: "Ensayo comparativo de rendimiento entre cultivos de cobertura y barbecho químico en la Pampa Ondulada",
    section: "Investigación",
    date: "1 de Junio, 2026",
    summary: "Un estudio conjunto entre UNAHUR e INTA evaluó el impacto de diferentes cultivos de cobertura sobre la materia orgánica del suelo, la retención hídrica y el rendimiento del cultivo subsiguiente de maíz.",
    likes: 22,
    link: "#",
    source: "UNAHUR",
  },
];

interface NewsItem {
  id: string;
  title: string;
  section: string;
  date: string;
  summary: string;
  image: string;
  likes: number;
  link: string;
  source: string;
}

interface NewsSectionProps {
  triggerNotification: (msg: string) => void;
}

const SECTION_ORDER = ["Todas", "Noticias", "Economía", "Política", "Agroecología", "Investigación"];

const SECTION_ICONS: Record<string, string> = {
  Todas: "◎",
  Noticias: "●",
  Economía: "▲",
  Política: "■",
  Agroecología: "✦",
  Investigación: "◆",
};

export const NewsSection: React.FC<NewsSectionProps> = ({ triggerNotification }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [localLikes, setLocalLikes] = useState<Record<string, number>>({});
  const [activeSection, setActiveSection] = useState("Todas");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/noticias", { signal: AbortSignal.timeout(10000) });
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          const mapped: NewsItem[] = json.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            section: item.section || "Noticias",
            date: item.date,
            summary: item.summary,
            image: item.image || pickFallbackImage(item.id),
            likes: 0,
            link: item.link,
            source: item.source,
          }));
          setNews(mapped);
          return;
        }
      } catch {}
      setNews(NEWS_DATA_FALLBACK);
    };
    fetchNews().finally(() => setLoading(false));
  }, []);

  const sections = useMemo(() => {
    const unique = Array.from(new Set(news.map((item) => item.section)));
    return SECTION_ORDER.filter((s) => s === "Todas" || unique.includes(s));
  }, [news]);

  const filteredNews = useMemo(() => {
    if (activeSection === "Todas") return news;
    return news.filter((item) => item.section === activeSection);
  }, [news, activeSection]);

  const handleLike = (id: string, title: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    setLocalLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (likedMap[id] ? -1 : 1),
    }));
    if (!likedMap[id]) {
      triggerNotification(`¡Apoyaste la publicación: "${title}"!`);
    }
  };

  return (
    <div className="space-y-8" id="news-section">
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="space-y-2 border-b border-[var(--border-10)] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
            <Calendar className="w-4 h-4" />
            <span>Crónica Universitaria</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
            Cartelera de Noticias y Salidas
          </h2>
          <p className="text-xs text-[var(--text2)] font-sans max-w-xl leading-relaxed">
            Noticias del agro argentino organizadas por sección — actualizadas desde INTA, Infocampo, Bichos de Campo, Agroecología en Red, FAO y más.
          </p>
        </div>

        {!loading && sections.length > 1 && (
          <div className="flex flex-wrap gap-1.5 pt-4">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                  activeSection === sec
                    ? "bg-[var(--footer)] text-[var(--bg2)] dark:text-white border-[var(--border)] font-bold"
                    : "bg-[var(--bg2)] text-[var(--text3)] border-[var(--border-10)] hover:border-[var(--border-35)] hover:text-[var(--text)]"
                }`}
              >
                <span className="mr-1.5">{SECTION_ICONS[sec] || "●"}</span>
                {sec}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[var(--bg3)] border border-[var(--border-15)] rounded-none overflow-hidden animate-pulse">
              <div className="h-44 bg-[var(--stone-bg)]" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-[var(--stone-bg)] w-1/3" />
                <div className="h-5 bg-[var(--stone-bg)] w-full" />
                <div className="h-4 bg-[var(--stone-bg)] w-full" />
                <div className="h-4 bg-[var(--stone-bg)] w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-12 border border-[var(--border-10)] bg-[var(--bg2)]">
          <p className="text-xs text-[var(--text3)] font-mono uppercase tracking-wider">
            No hay noticias en esta sección
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Reveal key={item.id} y={20}>
            <motion.div
              whileHover={{ scale: 1.015 }}
              className="bg-[var(--bg3)] border border-[var(--border-15)] rounded-none overflow-hidden flex flex-col hover:border-[var(--border-35)] transition-all"
            >
              <div className="h-44 relative bg-[var(--stone-bg)] border-b border-[var(--border-10)]">
                <img
                  src={item.image || pickFallbackImage(item.id)}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).src = pickFallbackImage(item.id + "-fallback"); }}
                />
                <span className="absolute top-3 left-3 bg-[var(--footer)] text-[var(--bg2)] dark:text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded-none font-bold">
                  {item.section}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[var(--bg-white)]">
                <div className="space-y-2">
                  <span className="text-[10px] text-[var(--text3)] font-mono tracking-widest uppercase block">
                    {item.date}
                  </span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif font-black text-[var(--text)] text-base leading-tight hover:text-[var(--accent3)] transition-colors inline-flex items-center gap-1"
                  >
                    {item.title}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <p className="text-xs text-[var(--text2)] leading-relaxed font-sans line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--stone-border)] flex justify-between items-center text-xs text-[var(--text3)] font-serif">
                  <button
                    onClick={() => handleLike(item.id, item.title)}
                    className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedMap[item.id] ? "fill-[var(--text)] text-[var(--text)]" : "text-[var(--text4)]"}`} />
                    <span>{item.likes + (localLikes[item.id] || 0)}</span>
                  </button>
                  <span className="text-[10px] text-[var(--text4)]">{item.source}</span>
                </div>
              </div>
            </motion.div>
            </Reveal>
          ))}
        </div>
      )}

      <div className="bg-[var(--accent1-40)] rounded-none p-6 md:p-8 border border-[var(--border-15)] flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
        <div className="space-y-2">
          <span className="bg-[var(--footer)] text-[var(--bg2)] dark:text-white text-[9px] font-mono uppercase tracking-wider px-2 py-0.5">
            Taller Optativo de Extensión
          </span>
          <h3 className="font-serif font-black text-[var(--text)] text-xl md:text-2xl leading-tight">
            Preparación Biológica de Microorganismos Nativos de Suelo
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans max-w-2xl leading-relaxed">
            Se llevará a cabo en los laboratorios de Origone y se formularán inóculos sólidos y líquidos utilizando hojarasca de monte nativo de la cuenca bonaerense. <strong className="font-serif">Sábado 27 de Junio, 09:00hs</strong>.
          </p>
        </div>
        <button
          onClick={() =>
            triggerNotification("¡Tu inscripción fue procesada! Recibirás los detalles técnicos en tu casilla de alumno.")
          }
          className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-[var(--bg2)] dark:text-white dark:hover:bg-[var(--bg3)] font-serif font-bold text-xs px-5 py-3 rounded-none uppercase tracking-wider transition-all border border-[var(--border)] cursor-pointer shrink-0 self-stretch md:self-auto text-center"
        >
          Anotarse (Cupos Limitados)
        </button>
      </div>
    </div>
  );
};
