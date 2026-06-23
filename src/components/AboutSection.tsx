import React from "react";
import { Sprout, Target, Heart, Globe } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8" id="about-section">
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="space-y-2 border-b border-[var(--border-10)] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
            <Sprout className="w-4 h-4" />
            <span>Editorial</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
            Sobre el proyecto
          </h2>
          <p className="text-xs text-[var(--text2)] font-sans max-w-xl leading-relaxed">
            Conocé la historia, la misión y el equipo detrás de este portal
            académico colaborativo.
          </p>
        </div>
      </div>

      {/* Mission cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-white)] p-6 border border-[var(--border-15)] space-y-4">
          <div className="bg-[var(--accent2)] p-3 w-fit">
            <Target className="w-5 h-5 text-[var(--text)]" />
          </div>
          <h3 className="font-serif font-black text-lg text-[var(--text)]">
            Nuestra Misión
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans leading-relaxed">
            Este portal nace como un espacio colaborativo para acompañar a los
            estudiantes de Ingeniería Agronómica de la Universidad Nacional de
            Hurlingham (UNAHUR) en su formación académica. Creemos que la
            agroecología no es solo una disciplina técnica, sino una forma de
            entender la producción de alimentos en armonía con los ecosistemas,
            las comunidades y las culturas locales.
          </p>
        </div>

        <div className="bg-[var(--bg-white)] p-6 border border-[var(--border-15)] space-y-4">
          <div className="bg-[var(--accent1)] p-3 w-fit">
            <Heart className="w-5 h-5 text-[var(--text)]" />
          </div>
          <h3 className="font-serif font-black text-lg text-[var(--text)]">
            Valores
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text2)] font-sans">
            <li className="flex gap-2">
              <span className="text-[var(--accent3)] font-bold">•</span>
              <span>
                <strong>Colaboración:</strong> Todo el contenido es generado
                por y para la comunidad estudiantil.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent3)] font-bold">•</span>
              <span>
                <strong>Colaboración:</strong> Todo el contenido es generado
                por y para la comunidad estudiantil.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent3)] font-bold">•</span>
              <span>
                <strong>Compromiso territorial:</strong> Pensado desde y para el
                conurbano bonaerense y la agricultura familiar.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-[var(--bg-white)] p-6 border border-[var(--border-15)] space-y-4">
          <div className="bg-[var(--accent2)] p-3 w-fit">
            <Globe className="w-5 h-5 text-[var(--text)]" />
          </div>
          <h3 className="font-serif font-black text-lg text-[var(--text)]">
            El Futuro es la Agroecología
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans leading-relaxed">
            Creemos firmemente que la transición hacia sistemas agroalimentarios
            sustentables, soberanos y justos es el camino. Este espacio aspira a
            ser un granito de arena en esa dirección, formando profesionales
            comprometidos con la tierra y la comunidad.
          </p>
        </div>

        <div className="bg-[var(--bg-white)] p-6 border border-[var(--border-15)] space-y-4">
          <div className="bg-[var(--accent1)] p-3 w-fit">
            <Sprout className="w-5 h-5 text-[var(--text)]" />
          </div>
          <h3 className="font-serif font-black text-lg text-[var(--text)]">
            Stack Tecnológico
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans leading-relaxed">
            Construido con React + Vite + Tailwind CSS v4. Diseño editorial con tipografía moderna
            (Plus Jakarta Sans + Playfair Display). Código abierto y
            colaborativo.
          </p>
        </div>
      </div>

      {/* Original vision block */}
      <div className="bg-[var(--accent1-20)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="flex items-center gap-3 mb-4">
          <Sprout className="w-6 h-6 text-[var(--accent3)]" />
          <h3 className="font-serif font-black text-xl text-[var(--text)]">
            🌱 El Futuro es la Agroecología
          </h3>
        </div>
        <p className="text-xs text-[var(--text2)] font-sans leading-relaxed max-w-3xl">
          Este proyecto comenzó con la idea de crear un portal educativo llamado
          "El Futuro es la Agroecología", un espacio para que estudiantes de
          UNAHUR con enfoque agroecológico encuentren materiales, noticias y un
          lugar para preguntar y responder. Esa semilla creció hasta convertirse
          en esta plataforma integral que hoy incluye biblioteca colaborativa,
          foro de debate, simulador de cultivos, asistente con IA y más.
          Todo sigue siendo completamente abierto y gratuito.
        </p>
      </div>
    </div>
  );
};
