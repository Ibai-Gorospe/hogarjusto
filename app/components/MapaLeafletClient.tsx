"use client";

/**
 * MapaLeafletClient — Mapa interactivo con Leaflet
 *
 * Se importa con dynamic() y ssr:false desde MapaPrecios.tsx
 * porque Leaflet necesita acceso a `window` (no funciona en servidor).
 *
 * Funcionalidades:
 * - Marcadores pill con precio o % de variación visible sin clicar
 * - Capa de calor (heatmap) con gradiente de colores
 * - Popups con gráficos SVG al clicar un marcador
 * - Dos vistas: precios actuales y evolución temporal
 */

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { Barrio, AÑOS_HISTORICO, formatEur, formatPct, getColor } from "@/app/lib/data";

// ============================================================
// Props del componente
// ============================================================

export interface MapaLeafletProps {
  zonas: Barrio[];                          // Zonas filtradas (para marcadores y heat)
  vista: "precios" | "evolucion";
  periodo: "1a" | "3a" | "5a" | "10a";
}

// ============================================================
// Utilidades
// ============================================================

/** Índice del array historico[] que corresponde al año base de cada período */
const PERIODO_INDEX: Record<string, number> = {
  "1a": 10,   // 2025
  "3a": 8,    // 2023
  "5a": 6,    // 2021
  "10a": 1,   // 2016
};

/** Calcula la variación % de una zona para un período dado. null si no hay datos. */
function calcVariacion(zona: Barrio, periodo: string): number | null {
  const baseIdx = PERIODO_INDEX[periodo];
  const base = zona.historico[baseIdx];
  const actual = zona.historico[11]; // 2026
  if (!base || !actual) return null;
  return ((actual - base) / base) * 100;
}

// ============================================================
// Generadores de gráficos SVG para popups
// ============================================================

/** Gráfico de barras de la serie histórica para el popup de "Precios actuales" */
function crearBarChartSVG(historico: number[], color: string): string {
  const vals = historico.filter(v => v > 0);
  if (vals.length === 0) return "";
  const maxVal = Math.max(...vals);
  const minVal = Math.min(...vals) * 0.8; // Un poco por debajo para que las barras no empiecen desde 0 visual
  const chartH = 52;
  const barW = 12;
  const gap = 3;
  const totalW = historico.length * (barW + gap) - gap;

  let bars = "";
  historico.forEach((val, i) => {
    if (val === 0) return;
    const range = maxVal - minVal;
    const normalized = range === 0 ? 1 : (val - minVal) / range;
    const h = Math.max(3, normalized * chartH);
    const x = i * (barW + gap);
    const y = chartH - h;
    const isLast = i === historico.length - 1;
    const fill = isLast ? color : "#d4cfc6";
    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${fill}" rx="2"/>`;
  });

  // Etiquetas de año (solo inicio, mitad, fin)
  const labels = [
    `<text x="2" y="${chartH + 11}" font-size="8" fill="#8a7e6d" font-family="system-ui">15</text>`,
    `<text x="${5 * (barW + gap) + 2}" y="${chartH + 11}" font-size="8" fill="#8a7e6d" font-family="system-ui">20</text>`,
    `<text x="${11 * (barW + gap) + 1}" y="${chartH + 11}" font-size="8" fill="#8a7e6d" font-family="system-ui">26</text>`,
  ];

  return `<svg width="${totalW}" height="${chartH + 14}" style="display:block;margin-top:6px">${bars}${labels.join("")}</svg>`;
}

/** Gráfico sparkline (línea) para el popup de "Evolución de precios" */
function crearSparklineSVG(historico: number[], highlightIdx: number): string {
  const vals = historico.filter(v => v > 0);
  if (vals.length < 2) return "";
  const maxVal = Math.max(...vals);
  const minVal = Math.min(...vals);
  const w = 180;
  const h = 44;
  const pad = 6;

  const pointsArr: { x: number; y: number; idx: number }[] = [];
  historico.forEach((val, i) => {
    if (val === 0) return;
    const x = pad + (i / (historico.length - 1)) * (w - 2 * pad);
    const range = maxVal - minVal;
    const normalized = range === 0 ? 0.5 : (val - minVal) / range;
    const y = h - pad - normalized * (h - 2 * pad);
    pointsArr.push({ x, y, idx: i });
  });

  const polyline = pointsArr.map(p => `${p.x},${p.y}`).join(" ");

  // Área rellena bajo la línea
  const first = pointsArr[0];
  const last = pointsArr[pointsArr.length - 1];
  const areaPath = `${polyline} ${last.x},${h - pad} ${first.x},${h - pad}`;

  // Puntos de inicio (año base) y fin (2026)
  const startPt = pointsArr.find(p => p.idx === highlightIdx);
  const endPt = pointsArr[pointsArr.length - 1];
  let dots = "";
  if (startPt) dots += `<circle cx="${startPt.x}" cy="${startPt.y}" r="3.5" fill="#8a7e6d" stroke="#fff" stroke-width="1.5"/>`;
  if (endPt) dots += `<circle cx="${endPt.x}" cy="${endPt.y}" r="3.5" fill="#7a9e6d" stroke="#fff" stroke-width="1.5"/>`;

  return `
    <svg width="${w}" height="${h}" style="display:block;margin-top:6px">
      <polygon points="${areaPath}" fill="#7a9e6d" opacity="0.12"/>
      <polyline points="${polyline}" fill="none" stroke="#7a9e6d" stroke-width="2" stroke-linejoin="round"/>
      ${dots}
    </svg>
  `;
}

// ============================================================
// HTML de los popups
// ============================================================

/** Popup para la vista "Precios actuales" */
function popupPrecios(zona: Barrio): string {
  const varColor = zona.var >= 0 ? "#c0534f" : "#7a9e6d";
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;min-width:210px;padding:2px">
      <div style="font-weight:700;font-size:15px;color:#3d3528;margin-bottom:2px">${zona.name}</div>
      <div style="font-size:22px;font-weight:800;color:${getColor(zona.precioM2)};line-height:1.2">
        ${formatEur(zona.precioM2)}<span style="font-size:13px;font-weight:600">/m²</span>
      </div>
      <div style="display:flex;gap:8px;margin-top:6px;align-items:center;flex-wrap:wrap">
        <span style="font-size:12px;font-weight:600;color:${varColor}">
          ${formatPct(zona.var)} interanual
        </span>
        <span style="font-size:11px;padding:2px 8px;border-radius:99px;background:#f5f0e8;color:#8a7e6d">
          ${zona.tipo}
        </span>
      </div>
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid #e8e0d4">
        <div style="font-size:10px;color:#8a7e6d;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:2px">
          Evolución €/m² (2015–2026)
        </div>
        ${crearBarChartSVG(zona.historico, getColor(zona.precioM2))}
      </div>
      <div style="margin-top:6px;font-size:11px;color:#8a7e6d;text-align:center">
        Piso de 80 m²: <strong style="color:#3d3528">${formatEur(zona.precioM2 * 80)}</strong>
      </div>
    </div>
  `;
}

/** Popup para la vista "Evolución de precios" */
function popupEvolucion(zona: Barrio, periodo: string): string {
  const baseIdx = PERIODO_INDEX[periodo];
  const baseYear = AÑOS_HISTORICO[baseIdx];
  const basePrice = zona.historico[baseIdx];
  const currentPrice = zona.historico[11];
  const variacion = calcVariacion(zona, periodo);
  const varStr = variacion !== null ? formatPct(variacion) : "Sin datos";
  const varColor = variacion !== null ? (variacion >= 0 ? "#c0534f" : "#7a9e6d") : "#8a7e6d";

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;min-width:210px;padding:2px">
      <div style="font-weight:700;font-size:15px;color:#3d3528;margin-bottom:2px">${zona.name}</div>
      <div style="font-size:22px;font-weight:800;color:${varColor};line-height:1.2">
        ${varStr}
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:8px;padding:8px 0;border-top:1px solid #e8e0d4;border-bottom:1px solid #e8e0d4">
        <div>
          <div style="font-size:10px;color:#8a7e6d">${baseYear}</div>
          <div style="font-size:14px;font-weight:700;color:#3d3528">${basePrice ? formatEur(basePrice) + "/m²" : "N/D"}</div>
        </div>
        <div style="font-size:18px;color:#c8c0b0;display:flex;align-items:center">→</div>
        <div style="text-align:right">
          <div style="font-size:10px;color:#8a7e6d">2026</div>
          <div style="font-size:14px;font-weight:700;color:#3d3528">${formatEur(currentPrice)}/m²</div>
        </div>
      </div>
      <div style="margin-top:8px">
        <div style="font-size:10px;color:#8a7e6d;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:2px">
          Evolución ${baseYear}–2026
        </div>
        ${crearSparklineSVG(zona.historico, baseIdx)}
      </div>
    </div>
  `;
}

// ============================================================
// Color del marcador para vista "Evolución"
// ============================================================

function colorVariacion(v: number | null): string {
  if (v === null) return "#8a7e6d";
  if (v >= 80) return "#991b1b";   // rojo muy oscuro
  if (v >= 50) return "#dc2626";   // rojo
  if (v >= 30) return "#ef4444";   // rojo claro
  if (v >= 20) return "#f97316";   // naranja
  if (v >= 10) return "#eab308";   // amarillo
  if (v >= 0) return "#84cc16";    // lima
  return "#22c55e";                // verde (ha bajado)
}

// ============================================================
// Componente principal
// ============================================================

export default function MapaLeafletClient({ zonas, vista, periodo }: MapaLeafletProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const heatRef = useRef<L.Layer | null>(null);

  // ---- Inicializar mapa una sola vez ----
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [42.851, -2.683],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Tiles de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // ---- Actualizar marcadores y capa de calor cuando cambian props ----
  useEffect(() => {
    const map = mapRef.current;
    const markers = markersRef.current;
    if (!map || !markers) return;

    // Limpiar capas anteriores
    markers.clearLayers();
    if (heatRef.current) {
      map.removeLayer(heatRef.current);
      heatRef.current = null;
    }

    if (zonas.length === 0) return;

    // ========== CAPA DE CALOR ==========
    if (vista === "precios") {
      const prices = zonas.map(z => z.precioM2);
      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);
      const rangeP = maxP - minP || 1;

      const heatPoints: [number, number, number][] = zonas.map(z => [
        z.lat,
        z.lng,
        (z.precioM2 - minP) / rangeP,
      ]);

      heatRef.current = L.heatLayer(heatPoints, {
        radius: 40,
        blur: 30,
        maxZoom: 16,
        max: 1,
        gradient: {
          0.0: "#3b82f6",   // azul — barato
          0.25: "#22c55e",  // verde
          0.5: "#eab308",   // amarillo
          0.75: "#f97316",  // naranja
          1.0: "#ef4444",   // rojo — caro
        },
      }).addTo(map);
    } else {
      // Evolución: intensidad basada en variación %
      const vars = zonas
        .map(z => calcVariacion(z, periodo))
        .filter((v): v is number => v !== null);

      if (vars.length > 0) {
        const minV = Math.min(...vars, 0);
        const maxV = Math.max(...vars, 1);
        const rangeV = maxV - minV || 1;

        const heatPoints: [number, number, number][] = zonas
          .map(z => {
            const v = calcVariacion(z, periodo);
            if (v === null) return null;
            return [z.lat, z.lng, (v - minV) / rangeV] as [number, number, number];
          })
          .filter((p): p is [number, number, number] => p !== null);

        heatRef.current = L.heatLayer(heatPoints, {
          radius: 40,
          blur: 30,
          maxZoom: 16,
          max: 1,
          gradient: {
            0.0: "#22c55e",   // verde — poca subida
            0.3: "#84cc16",   // lima
            0.5: "#eab308",   // amarillo
            0.75: "#f97316",  // naranja
            1.0: "#ef4444",   // rojo — mucha subida
          },
        }).addTo(map);
      }
    }

    // ========== MARCADORES ==========
    zonas.forEach(zona => {
      let label: string;
      let bgColor: string;

      if (vista === "precios") {
        // Formato español con punto de miles: 3.228
        label = zona.precioM2.toLocaleString("es-ES");
        bgColor = getColor(zona.precioM2);
      } else {
        const v = calcVariacion(zona, periodo);
        if (v === null) {
          label = "N/D";
          bgColor = "#8a7e6d";
        } else {
          label = (v >= 0 ? "+" : "") + Math.round(v) + "%";
          bgColor = colorVariacion(v);
        }
      }

      // DivIcon con pill centrado mediante transform
      const icon = L.divIcon({
        className: "",
        html: `<div style="
          position:absolute;
          left:50%;top:50%;
          transform:translate(-50%,-50%);
          background:${bgColor};
          color:#fff;
          border-radius:999px;
          padding:2px 7px;
          font-size:10px;
          font-weight:700;
          font-family:system-ui,-apple-system,sans-serif;
          border:2px solid rgba(255,255,255,0.9);
          box-shadow:0 1px 5px rgba(0,0,0,0.3);
          white-space:nowrap;
          line-height:1.5;
          letter-spacing:-0.3px;
          cursor:pointer;
        ">${label}</div>`,
        iconSize: [0, 0],
      });

      const marker = L.marker([zona.lat, zona.lng], { icon });

      // Popup según la vista actual
      const popupContent = vista === "precios"
        ? popupPrecios(zona)
        : popupEvolucion(zona, periodo);

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "hogarjusto-popup",
      });

      markers.addLayer(marker);
    });
  }, [zonas, vista, periodo]);

  return (
    <div
      ref={containerRef}
      className="h-[420px] md:h-[520px] rounded-2xl border border-[#e8e0d4] shadow-sm"
      style={{ background: "#f0ebe3", zIndex: 0 }}
    />
  );
}
