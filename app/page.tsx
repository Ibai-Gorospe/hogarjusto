"use client";

import { AuthProvider, useAuth } from "@/app/lib/AuthContext";
import Dashboard from "@/app/components/Dashboard";
import AuthForm from "@/app/components/AuthForm";

// Componente interno que decide qué mostrar según el estado de auth
function AppContent() {
  const { user, loading } = useAuth();

  // Mientras carga, mostrar pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] via-[#f5f0e8] to-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🏡</div>
          <div className="text-[#8a7e6d] text-sm">Cargando...</div>
        </div>
      </div>
    );
  }

  // Si no hay usuario, mostrar login
  if (!user) {
    return <AuthForm />;
  }

  // Si hay usuario, mostrar dashboard
  return <Dashboard />;
}

// Página principal envuelta en AuthProvider
export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
