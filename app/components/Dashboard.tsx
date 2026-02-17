"use client";

import { useState } from "react";
import { TABS } from "@/app/lib/data";
import { useAuth } from "@/app/lib/AuthContext";
import MapaPrecios from "@/app/components/MapaPrecios";
import PrecioJusto from "@/app/components/PrecioJusto";
import CostesCompra from "@/app/components/CostesCompra";
import Hipoteca from "@/app/components/Hipoteca";
import Checklist from "@/app/components/Checklist";
import Ayudas from "@/app/components/Ayudas";
import Guia from "@/app/components/Guia";

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] via-[#f5f0e8] to-[#faf7f2] text-[#3d3528] font-sans px-4 py-5">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-3xl mb-1">🏡</div>
        <h1 className="text-3xl font-bold font-serif text-[#3d3528] leading-tight">
          HogarJusto
        </h1>
        <p className="text-[#8a7e6d] text-sm mt-1.5">
          Guía de compra de vivienda en Vitoria-Gasteiz
        </p>
        {/* Info usuario y logout */}
        {user && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-xs text-[#8a7e6d]">{user.email}</span>
            <button
              onClick={signOut}
              className="text-xs text-[#c0735e] hover:underline"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Navegación por pestañas */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
        {TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              tab === i
                ? "bg-[#7a9e6d] text-white shadow-md"
                : "bg-white text-[#8a7e6d] border border-[#e8e0d4] hover:border-[#7a9e6d] hover:text-[#7a9e6d]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Contenido de cada pestaña */}
      {tab === 0 && <MapaPrecios />}
      {tab === 1 && <PrecioJusto />}
      {tab === 2 && <CostesCompra />}
      {tab === 3 && <Hipoteca />}
      {tab === 4 && <Checklist />}
      {tab === 5 && <Ayudas />}
      {tab === 6 && <Guia />}

      {/* Footer */}
      <div className="text-center text-[#b0a898] text-xs mt-10 pb-4">
        Datos de precios actualizados a enero 2026. Fuentes: General Inmobiliaria, Perales Digital, Observatorio Vasco de Vivienda, Tinsa.
      </div>
    </div>
  );
}
