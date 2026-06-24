import React, { useState, useEffect } from "react";
import { Calendar, Heart, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600";

const NEWS_DATA_FALLBACK = [
  {
    id: "news-1",
    title: "Inauguración de la nueva Estación Agroclimatológica Digital en el Campus",
    category: "Institucional",
    date: "22 de Junio, 2026",
    summary: "La UNAHUR instaló sensores IoT de última generación para medir temperatura de suelo, radiación solar y humedad del aire, de acceso abierto para toda la carrera.",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
    likes: 42,
    link: "#",
    source: "UNAHUR"
  },
  {
    id: "news-2",
    title: "Visita de campo al INTA Castelar: Manejo de Plagas en Horticultura",
    category: "Prácticas",
    date: "18 de Junio, 2026",
    summary: "Estudiantes de Manejo Agroecológico de Adversidades visitaron el instituto nacional para capacitarse en técnicas de biocontrol usando parasitoides nativos de la pampa.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
    likes: 56,
    link: "#",
    source: "UNAHUR"
  },
  {
    id: "news-3",
    title: "Abierta la Convocatoria de Becas de Estímulo a la Investigación Agraria",
    category: "Becas",
    date: "15 de Junio, 2026",
    summary: "Se seleccionarán 4 proyectos enfocados en la sustentabilidad del Cinturón Verde Bonaerense. Convocatoria abierta para alumnos de 4° y 5° año.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
    likes: 29,
    link: "#",
    source: "UNAHUR"
  }
];

interface NewsItem {
  id: string;
  title: string;
  category: string;
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

export const NewsSection: React.FC<NewsSectionProps> = ({ triggerNotification }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [localLikes, setLocalLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/noticias");
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          const mapped: NewsItem[] = json.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            date: item.date,
            summary: item.summary,
            image: item.image || FALLBACK_IMAGE,
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
            Noticias del sector agropecuario argentino actualizadas en tiempo real desde INTA, Infocampo, Bichos de Campo, Agritotal, FAO y TodoAgro.
          </p>
        </div>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Reveal key={item.id} y={20}>
            <motion.div
              whileHover={{ scale: 1.015 }}
              className="bg-[var(--bg3)] border border-[var(--border-15)] rounded-none overflow-hidden flex flex-col hover:border-[var(--border-35)] transition-all"
            >
              <div className="h-44 relative bg-[var(--stone-bg)] border-b border-[var(--border-10)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                />
                <span className="absolute top-3 left-3 bg-[var(--footer)] text-[var(--bg2)] dark:text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded-none font-bold">
                  {item.category}
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