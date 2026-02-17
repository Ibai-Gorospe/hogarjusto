"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

interface AuthFormProps {
  onSuccess?: () => void; // Callback para volver al dashboard tras login
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Introduce email y contraseña");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        // Registro exitoso — volver al dashboard (AuthContext detecta la sesión)
        onSuccess?.();
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Email o contraseña incorrectos");
      } else {
        // Login exitoso — volver al dashboard
        onSuccess?.();
      }
    }

    setLoading(false);
  };

  const inputClass = "w-full bg-white border border-[#ddd5c8] rounded-lg px-3 py-2.5 text-sm text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] via-[#f5f0e8] to-[#faf7f2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏡</div>
          <h1 className="text-3xl font-bold font-serif text-[#3d3528]">HogarJusto</h1>
          <p className="text-[#8a7e6d] text-sm mt-1">
            {mode === "login" ? "Inicia sesión para acceder" : "Crea tu cuenta gratuita"}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e0d4] shadow-sm">
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">Email</label>
              <input
                className={inputClass}
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">Contraseña</label>
              <input
                className={inputClass}
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mt-3 p-2.5 bg-[#c0534f12] rounded-lg text-sm text-[#c0534f]">
              {error}
            </div>
          )}
          {message && (
            <div className="mt-3 p-2.5 bg-[#7a9e6d12] rounded-lg text-sm text-[#5a8a5a]">
              {message}
            </div>
          )}

          {/* Botón principal */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 bg-[#7a9e6d] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#6b8e5e] transition-colors disabled:opacity-50"
          >
            {loading ? "Cargando..." : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>

          {/* Cambiar modo */}
          <div className="text-center mt-4">
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setMessage(""); }}
              className="text-sm text-[#7a9e6d] hover:underline"
            >
              {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>

        {/* Nota */}
        <p className="text-center text-[10px] text-[#b0a898] mt-4">
          Tus datos se guardan en la nube. Accede desde cualquier dispositivo.
        </p>
      </div>
    </div>
  );
}
