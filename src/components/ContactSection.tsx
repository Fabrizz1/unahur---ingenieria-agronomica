import React, { useState, useRef } from "react";
import { Mail, Send, CheckCircle2, Sprout } from "lucide-react";

interface ContactSectionProps {
  triggerNotification: (message: string, type?: "success" | "info") => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  triggerNotification,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    triggerNotification("¡Mensaje enviado! Te responderemos a la brevedad.");
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSent(false);
    }, 3000);
  };

  return (
    <div className="space-y-8" id="contact-section">
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="space-y-2 border-b border-[var(--border-10)] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
            <Mail className="w-4 h-4" />
            <span>Correspondencia</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
            Contacto
          </h2>
          <p className="text-xs text-[var(--text2)] font-sans max-w-xl leading-relaxed">
            ¿Tenés sugerencias, querés colaborar con contenido o encontraste
            algún error? Escribinos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-[var(--bg-white)] border border-[var(--border-15)] p-6 rounded-none">
            <h3 className="font-serif font-black text-base text-[var(--text)] mb-5 pb-3 border-b border-[var(--stone-border)]">
              Formulario de Consulta
            </h3>

            {sent ? (
              <div className="bg-[var(--accent2)] p-8 text-center space-y-3 border border-[var(--border-10)]">
                <CheckCircle2 className="w-10 h-10 text-[var(--accent3)] mx-auto" />
                <p className="font-serif font-bold text-[var(--text)] text-sm">
                  ¡Mensaje enviado con éxito!
                </p>
                <p className="text-xs text-[var(--text2)] font-sans">
              Gracias por comunicarte. Te responderemos a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text3)] font-bold block">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      required
                      className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg2)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text3)] font-bold block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg2)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text3)] font-bold block">
                    Mensaje
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribí tu mensaje, sugerencia o reporte de error..."
                    rows={5}
                    required
                    className="w-full text-xs py-2.5 px-3 rounded-none border border-[var(--border-15)] bg-[var(--bg2)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] font-sans resize-y"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-[var(--bg2)] dark:text-white dark:hover:bg-[var(--bg3)] font-serif font-bold text-xs px-6 py-3 rounded-none uppercase tracking-wider transition-all border border-[var(--border)] cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar mensaje</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-4">
          <div className="bg-[var(--accent1-20)] border border-[var(--border-15)] p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[var(--accent3)]" />
              <h4 className="font-serif font-black text-xs text-[var(--text)] uppercase tracking-wider">
                ¿Querés colaborar?
              </h4>
            </div>
            <p className="text-[11px] text-[var(--text2)] font-sans leading-relaxed">
              Si tenés apuntes, resúmenes o guías de estudio para compartir,
              usá la sección{" "}
              <strong className="text-[var(--text)]">Biblioteca de Apuntes</strong>{" "}
              y subí tu material. El conocimiento se construye entre todes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
