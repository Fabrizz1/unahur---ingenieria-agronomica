import React from "react";
import { Calendar, Heart, MessageSquare } from "lucide-react";

export const NEWS_DATA = [
  {
    id: "news-1",
    title: "Inauguración de la nueva Estación Agroclimatológica Digital en el Campus",
    category: "Institucional",
    date: "22 de Junio, 2026",
    summary: "La UNAHUR instaló sensores IoT de última generación para medir temperatura de suelo, radiación solar y humedad del aire, de acceso abierto para toda la carrera.",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
    likes: 42,
    comments: 8
  },
  {
    id: "news-2",
    title: "Visita de campo al INTA Castelar: Manejo de Plagas en Horticultura",
    category: "Prácticas",
    date: "18 de Junio, 2026",
    summary: "Estudiantes de Manejo Agroecológico de Adversidades visitaron el instituto nacional para capacitarse en técnicas de biocontrol usando parasitoides nativos de la pampa.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
    likes: 56,
    comments: 14
  },
  {
    id: "news-3",
    title: "Abierta la Convocatoria de Becas de Estímulo a la Investigación Agraria",
    category: "Becas",
    date: "15 de Junio, 2026",
    summary: "Se seleccionarán 4 proyectos enfocados en la sustentabilidad del Cinturón Verde Bonaerense. Convocatoria abierta para alumnos de 4° y 5° año.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
    likes: 29,
    comments: 3
  }
];

interface NewsSectionProps {
  triggerNotification: (msg: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ triggerNotification }) => {
  return (
    <div className="space-y-8" id="news-section">
      {/* Title block */}
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
            Enterate de las novedades institucionales, convenios con el INTA, becas científicas y jornadas prácticas obligatorias.
          </p>
        </div>
      </div>

      {/* News Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS_DATA.map((news) => (
          <div
            key={news.id}
            className="bg-[var(--bg3)] border border-[var(--border-15)] rounded-none overflow-hidden flex flex-col hover:border-[var(--border-35)] transition-all"
          >
            <div className="h-44 relative bg-[var(--stone-bg)] border-b border-[var(--border-10)]">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-[var(--footer)] text-[var(--bg2)] text-[9px] font-mono uppercase px-2 py-0.5 rounded-none font-bold">
                {news.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[var(--bg-white)]">
              <div className="space-y-2">
                <span className="text-[10px] text-[var(--text3)] font-mono tracking-widest uppercase block">
                  {news.date}
                </span>
                <h3 className="font-serif font-black text-[var(--text)] text-base leading-tight hover:text-[var(--accent3)] cursor-pointer transition-colors">
                  {news.title}
                </h3>
                <p className="text-xs text-[var(--text2)] leading-relaxed font-sans line-clamp-3">
                  {news.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--stone-border)] flex justify-between items-center text-xs text-[var(--text3)] font-serif">
                <button
                  onClick={() => triggerNotification(`¡Apoyaste la publicación: "${news.title}"!`)}
                  className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-[var(--text)]" />
                  <span>{news.likes}</span>
                </button>
                <span className="italic text-[11px]">{news.comments} comentarios</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Seminar Banner */}
      <div className="bg-[var(--accent1-40)] rounded-none p-6 md:p-8 border border-[var(--border-15)] flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
        <div className="space-y-2">
          <span className="bg-[var(--footer)] text-[var(--bg2)] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5">
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
          className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-[var(--bg2)] font-serif font-bold text-xs px-5 py-3 rounded-none uppercase tracking-wider transition-all border border-[var(--border)] cursor-pointer shrink-0 self-stretch md:self-auto text-center"
        >
          Anotarse (Cupos Limitados)
        </button>
      </div>
    </div>
  );
};
