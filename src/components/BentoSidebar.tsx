import React from "react";
import { Clock, Mail } from "lucide-react";

export const BentoSidebar: React.FC = () => {
  return (
    <div className="space-y-6" id="bento-sidebar">
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
