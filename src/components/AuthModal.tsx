import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { X, Mail, Lock, UserRound, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError("Completá todos los campos obligatorios");
      return;
    }

    if (mode === "register") {
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      if (!fullName.trim()) {
        setError("Ingresá tu nombre completo");
        return;
      }
    }

    setLoading(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      onClose();
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      setSuccess("Registro exitoso. Revisá tu correo para verificar la cuenta.");
      setMode("login");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--overlay)] backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-[var(--bg3)] w-full max-w-md rounded-none shadow-2xl overflow-hidden border border-[var(--border)]"
      >
        <div className="bg-[var(--footer)] text-white p-4 flex justify-between items-center border-b border-[var(--border)]">
          <h3 className="font-serif font-black text-sm flex items-center gap-2">
            {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-none hover:bg-[var(--accent4)] text-[var(--text4)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span className="text-red-700 dark:text-red-400 font-sans">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span className="text-green-700 dark:text-green-400 font-sans">{success}</span>
            </div>
          )}

          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-xs font-serif font-bold text-[var(--text)] block">
                Nombre Completo
              </label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text4)]" />
                <input
                  type="text"
                  placeholder="Ej: Lucía Martínez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs py-2.5 pl-9 pr-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-serif font-bold text-[var(--text)] block">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text4)]" />
              <input
                type="email"
                required
                placeholder="ejemplo@unahur.edu.ar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs py-2.5 pl-9 pr-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-serif font-bold text-[var(--text)] block">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text4)]" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs py-2.5 pl-9 pr-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
              />
            </div>
          </div>

          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-xs font-serif font-bold text-[var(--text)] block">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text4)]" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs py-2.5 pl-9 pr-3 rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--footer)] hover:bg-[var(--accent4)] text-[var(--bg2)] dark:text-white font-serif font-bold text-xs px-5 py-3 rounded-none border border-[var(--border)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : mode === "login" ? "Ingresar" : "Crear Cuenta"}
          </button>

          <div className="text-center pt-2 border-t border-[var(--border-10)]">
            <button
              type="button"
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); setSuccess(null); }}
              className="text-xs text-[var(--accent3)] hover:underline font-serif font-bold cursor-pointer"
            >
              {mode === "login" ? "¿No tenés cuenta? Registrate" : "¿Ya tenés cuenta? Iniciá sesión"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
