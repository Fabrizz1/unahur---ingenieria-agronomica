import React from "react";
import { GraduationCap, AlertCircle, Sparkles, BookOpen, Clock, Mail } from "lucide-react";
import { CAREERS_DATA, FAQ_DATA } from "../data";

export const BentoSidebar: React.FC = () => {
  return (
    <div className="space-y-6" id="bento-sidebar">
      {/* Editorial Profile block */}
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-5 rounded-none space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Perfil Ocupacional</span>
          </div>
          <h3 className="font-serif font-black text-[var(--text)] text-lg mt-1">
            Salida Profesional Agraria
          </h3>
          <p className="text-[11px] text-[var(--text2)] font-sans mt-1">
            Campos de acción técnica y de gestión para los egresados de la UNAHUR.
          </p>
        </div>

        <div className="space-y-3.5">
          {CAREERS_DATA.slice(0, 3).map((path) => (
            <div
              key={path.id}
              className="p-4 rounded-none bg-[var(--bg-white)] border border-[var(--border-10)] hover:border-[var(--border-30)] transition-colors space-y-2"
            >
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-5)] pb-1.5">
                  <span className="text-xs font-serif font-black text-[var(--text)]">{path.title}</span>
                  <span className="bg-[var(--accent1)] text-[var(--text)] text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-none font-bold">
                  {path.salaryRange}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text2)] font-sans leading-relaxed">
                {path.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ block */}
      <div className="bg-[var(--accent1-20)] border border-[var(--border-15)] p-5 rounded-none space-y-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text)] font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h3 className="font-serif font-black text-[var(--text)] text-base mt-1">
            Consultas Académicas
          </h3>
        </div>

        <div className="space-y-4 text-xs divide-y divide-[var(--border-10)]">
          {FAQ_DATA.slice(0, 3).map((faq, index) => (
            <div key={index} className={`space-y-1.5 ${index > 0 ? "pt-3.5" : ""}`}>
              <p className="font-serif font-bold text-[var(--text)] leading-tight">{faq.question}</p>
              <p className="text-[var(--text2)] font-sans text-[11px] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Contacts Block */}
      <div className="bg-[var(--bg-white)] border border-[var(--border-15)] p-5 rounded-none space-y-3">
        <h4 className="font-serif font-black text-xs text-[var(--text)] uppercase tracking-wider pb-2 border-b border-[var(--stone-border)]">
          Oficinas de Coordinación
        </h4>
        <div className="space-y-2 text-[11px] font-mono text-[var(--text2)]">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[var(--accent3)]" />
            <span>Atención: 24 horas</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[var(--accent3)]" />
            <span>todavía no tenemos</span>
          </div>

        </div>
      </div>
    </div>
  );
};
