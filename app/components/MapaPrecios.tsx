"use client";

/**
 * MapaPrecios — Pestaña principal "Mapa de Precios"
 *
 * Dos vistas:
 *   1. "Precios actuales" — mapa con precios €/m², capa de calor por precio,
 *      filtro por rango de precio
 *   2. "Evolución de precios" — mapa con variación %, capa de calor por subida,
 *      selector de período (1, 3, 5, 10 años)
 *
 * El mapa Leaflet se carga dinámicamente (sin SSR) desde MapaLeafletClient.
 */

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { BARRIOS, formatEur } from "@/app/lib/data";

// Importación dinámica del mapa (Leaflet no funciona en servidor)
const MapaLeaflet = dynamic(() => import("./MapaLeafletClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] md:h-[520px] bg-[#f0ebe3] rounded-2xl border border-[#e8e0d4] animate-pulse flex items-center justify-center">
      <span className="text-[#8a7e6d] text-sm">Cargando mapa...</span>
    </div>
  ),
});

// ============================================================
// Tipos y constantes
// ============================================================

type Vista = "precios" | "evolucion";
type Periodo = "1a" | "3a" | "5a" | "10a";

const RANGOS_PRECIO = [
  { key: "todos", label: "Todos", min: 0, max: Infinity },
  { key: "economico", label: "Económico", desc: "<2.200€", min: 0, max: 2200 },
  { key: "asequible", label: "Asequible", desc: "2.200–3.000€", min: 2200, max: 3000 },
  { key: "medio", label: "Medio", desc: "3.000–3.500€", min: 3000, max: 3500 },
  { key: "medio-alto", label: "Medio-alto", desc: "3.500–4.500€", min: 3500, max: 4500 },
  { key: "premium", label: "Premium", desc: ">4.500€", min: 4500, max: Infinity },
] as const;

const PERIODOS: { key: Periodo; label: string }[] = [
  { key: "1a", label: "1 año" },
  { key: "3a", label: "3 años" },
  { key: "5a", label: "5 años" },
  { key: "10a", label: "10 años" },
];

// ============================================================
// Componente
// ============================================================

export default function MapaPrecios() {
  const [vista, setVista] = useState<Vista>("precios");
  const [filtroRango, setFiltroRango] = useState("todos");
  const [periodo, setPeriodo] = useState<Periodo>("1a");

  // — Estadísticas generales —
  const precioMin = Math.min(...BARRIOS.map(b => b.precioM2));
  const precioMax = Math.max(...BARRIOS.map(b => b.precioM2));
  const precioMedio = Math.round(BARRIOS.reduce((s, b) => s + b.precioM2, 0) / BARRIOS.length);
  const zonaCara = BARRIOS.reduce((a, b) => (a.precioM2 > b.precioM2 ? a : b));
  const zonaBarata = BARRIOS.reduce((a, b) => (a.precioM2 < b.precioM2 ? a : b));

  // — Filtro por rango de precio (solo aplica en vista "precios") —
  const filteredZonas = useMemo(() => {
    if (vista === "evolucion" || filtroRango === "todos") return [...BARRIOS];
    const rango = RANGOS_PRECIO.find(r => r.key === filtroRango);
    if (!rango) return [...BARRIOS];
    return BARRIOS.filter(b => b.precioM2 >= rango.min && b.precioM2 < rango.max);
  }, [filtroRango, vista]);

  return (
    <div>
      {/* ========== STATS RESUMEN ========== */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Media ciudad", value: formatEur(precioMedio) + "/m²", sub: `${BARRIOS.length} zonas` },
          { label: "Más cara", value: formatEur(precioMax) + "/m²", sub: zonaCara.name },
          { label: "Más barata", value: formatEur(precioMin) + "/m²", sub: zonaBarata.name },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-[#e8e0d4] text-center">
            <div className="text-[10px] text-[#8a7e6d] uppercase tracking-wider font-semibold">{s.label}</div>
            <div className="text-base font-bold text-[#3d3528] mt-1">{s.value}</div>
            <div className="text-[10px] text-[#7a9e6d] font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ========== TABS DE VISTA ========== */}
      <div className="flex gap-1 mb-4 bg-[#f0ebe3] rounded-xl p-1">
        <button
          onClick={() => setVista("precios")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            vista === "precios"
              ? "bg-white text-[#3d3528] shadow-sm"
              : "text-[#8a7e6d] hover:text-[#3d3528]"
          }`}
        >
          Precios actuales
        </button>
        <button
          onClick={() => setVista("evolucion")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            vista === "evolucion"
              ? "bg-white text-[#3d3528] shadow-sm"
              : "text-[#8a7e6d] hover:text-[#3d3528]"
          }`}
        >
          Evolución de precios
        </button>
      </div>

      {/* ========== FILTROS ========== */}
      {vista === "precios" ? (
        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {RANGOS_PRECIO.map(r => (
            <button
              key={r.key}
              onClick={() => setFiltroRango(r.key)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filtroRango === r.key
                  ? "bg-[#7a9e6d] text-white shadow-sm"
                  : "bg-white text-[#8a7e6d] border border-[#e8e0d4] hover:border-[#7a9e6d] hover:text-[#7a9e6d]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex gap-1.5 mb-4">
          {PERIODOS.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriodo(p.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                periodo === p.key
                  ? "bg-[#7a9e6d] text-white shadow-sm"
                  : "bg-white text-[#8a7e6d] border border-[#e8e0d4] hover:border-[#7a9e6d] hover:text-[#7a9e6d]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* ========== MAPA ========== */}
      <MapaLeaflet
        zonas={filteredZonas}
        vista={vista}
        periodo={periodo}
      />

      {/* ========== LEYENDA ========== */}
      {vista === "precios" ? (
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          <span className="text-[10px] text-[#8a7e6d]">Capa de calor:</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: "#3b82f6" }} />
            <span className="text-[10px] text-[#8a7e6d]">Barato</span>
          </div>
          <div
            className="w-10 h-2.5 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)" }}
          />
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: "#ef4444" }} />
            <span className="text-[10px] text-[#8a7e6d]">Caro</span>
          </div>
          {filtroRango !== "todos" && (
            <span className="text-[10px] text-[#7a9e6d] ml-2">
              ({filteredZonas.length} de {BARRIOS.length} zonas)
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          <span className="text-[10px] text-[#8a7e6d]">Capa de calor:</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: "#22c55e" }} />
            <span className="text-[10px] text-[#8a7e6d]">Poca subida</span>
          </div>
          <div
            className="w-10 h-2.5 rounded-full"
            style={{ background: "linear-gradient(90deg, #22c55e, #eab308, #ef4444)" }}
          />
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: "#ef4444" }} />
            <span className="text-[10px] text-[#8a7e6d]">Mucha subida</span>
          </div>
        </div>
      )}

      {/* ========== TENDENCIAS ========== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mt-4">
        <div className="text-sm font-bold text-[#7a9e6d] mb-2">Tendencias clave 2026</div>
        <ul className="text-sm text-[#5a5040] space-y-2 list-disc pl-4">
          <li>
            Subidas de <strong className="text-[#c0534f]">dos dígitos</strong> en prácticamente
            todas las zonas: Asteguieta (+25%), Aranbizkarra (+24%) y Abetxuko (+22%) lideran
          </li>
          <li>
            <strong className="text-[#3d3528]">56 zonas</strong> analizadas con serie histórica
            2015–2026 de fuentes reales (Perales Digital, General Inmobiliaria)
          </li>
          <li>
            Zonas premium (Arantzabal-Castilla Sur, Sector Sur, Ciudad Jardín) superan los{" "}
            <strong className="text-[#3d3528]">4.500 €/m²</strong>
          </li>
          <li>
            El stock sigue bajo y la demanda crece por empleo, salarios y tipos de interés
            atractivos
          </li>
        </ul>
      </div>
    </div>
  );
}
