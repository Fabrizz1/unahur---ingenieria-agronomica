import React from "react";
import { Sprout, Globe, Heart, BookOpen } from "lucide-react";
import { Reveal } from "./Reveal";

export const AgroecologiaSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Manifiesto */}
      <Reveal>
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-8 md:p-12 rounded-none">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
            <Sprout className="w-4 h-4" />
            <span>Manifiesto Agroecológico</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[var(--text)] leading-tight">
            La agroecología no es solo una disciplina técnica:
            <span className="text-[var(--accent3)]"> es la solución</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--text2)] font-sans leading-relaxed max-w-2xl mx-auto">
            Frente a la crisis climática, la pérdida de biodiversidad y el
            desarraigo de las comunidades rurales, la agroecología propone un
            camino concreto: producir alimentos en armonía con los ecosistemas,
            fortalecer la agricultura familiar y construir soberanía alimentaria
            desde el territorio. Este espacio es una herramienta colectiva para
            quienes creen que otro modelo productivo es posible y necesario.
          </p>
          <div className="italic text-xs text-[var(--text3)] font-serif border-t border-[var(--border-10)] pt-4 max-w-md mx-auto">
            "El saber es transformar"
          </div>
        </div>
      </div>
      </Reveal>

      {/* Pilares */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Reveal delay={0.1}>
        <div className="bg-[var(--bg-white)] border border-[var(--border-15)] p-6 rounded-none space-y-4 hover:border-[var(--accent3)] transition-colors">
          <div className="bg-[var(--accent2)] p-3 w-fit">
            <Globe className="w-5 h-5 text-[var(--text)]" />
          </div>
          <h3 className="font-serif font-black text-lg text-[var(--text)]">
            Dimensión Ecológica
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans leading-relaxed">
            Diseño de agroecosistemas que imitan los ciclos naturales.
            Biodiversidad funcional, manejo del suelo vivo, cierre de ciclos
            de nutrientes, control biológico de plagas y eliminación progresiva
            de insumos sintéticos. La naturaleza es el modelo.
          </p>
        </div>
        </Reveal>

        <Reveal delay={0.2}>
        <div className="bg-[var(--bg-white)] border border-[var(--border-15)] p-6 rounded-none space-y-4 hover:border-[var(--accent3)] transition-colors">
          <div className="bg-[var(--accent1)] p-3 w-fit">
            <Heart className="w-5 h-5 text-[var(--text)]" />
          </div>
          <h3 className="font-serif font-black text-lg text-[var(--text)]">
            Dimensión Social
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans leading-relaxed">
            Fortalecimiento de la agricultura familiar y los circuitos cortos
            de comercialización. Soberanía alimentaria, mercados locales,
            cooperativas agrarias y justicia social en el acceso a la tierra
            y los recursos productivos.
          </p>
        </div>
        </Reveal>

        <Reveal delay={0.3}>
        <div className="bg-[var(--bg-white)] border border-[var(--border-15)] p-6 rounded-none space-y-4 hover:border-[var(--accent3)] transition-colors">
          <div className="bg-[var(--accent2)] p-3 w-fit">
            <BookOpen className="w-5 h-5 text-[var(--text)]" />
          </div>
          <h3 className="font-serif font-black text-lg text-[var(--text)]">
            Dimensión Política
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans leading-relaxed">
            Incidencia en políticas públicas agrarias, defensa de las semillas
            nativas y criollas, ordenamiento territorial participativo y
            construcción de redes de conocimiento campesino a campesino.
          </p>
        </div>
        </Reveal>
      </div>

      {/* Cierre territorial */}
      <Reveal delay={0.2}>
      <div className="bg-[var(--accent2)] border border-[var(--border-15)] p-6 md:p-8 rounded-none flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <span className="bg-[var(--footer)] text-white text-[9px] font-mono uppercase tracking-wider px-2 py-0.5">
            Cinturón Verde Bonaerense
          </span>
          <h3 className="font-serif font-black text-xl text-[var(--text)]">
            Pensado desde y para el territorio
          </h3>
          <p className="text-xs text-[var(--text2)] font-sans max-w-xl leading-relaxed">
            Este proyecto nace en Hurlingham, en el corazón del cinturón
            hortícola del AMBA, donde la agricultura familiar convive con la
            expansión urbana. La agroecología no es teoría abstracta acá:
            es una necesidad concreta de productores y comunidades.
          </p>
        </div>
        <div className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-[var(--accent3)] font-bold text-right leading-relaxed">
          <div>UNAHUR</div>
          <div>Instituto de Biotecnología</div>
        </div>
      </div>
      </Reveal>
    </div>
  );
};
