"use client";

import { AuthProvider } from "@/app/lib/AuthContext";
import Dashboard from "@/app/components/Dashboard";

// La app siempre muestra el dashboard. El login es opcional.
export default function Home() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
