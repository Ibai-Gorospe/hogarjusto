"use client";

/**
 * PrecioJusto — Pestaña "¿Precio justo?"
 *
 * Flujo en cascada por cada valoración:
 *   Bloque 1: Valoración + veredicto (lógica existente)
 *   Bloque 2+3: Costes de compra + Hipoteca (lado a lado en desktop)
 *   Bloque 4: Resumen final
 *
 * Las valoraciones guardadas aparecen colapsadas debajo del resumen.
 * Solo una puede estar expandida a la vez.
 */

import { useState, useEffect, useCallback } from "react";
import {
  BARRIOS, formatEur, valorarPiso, geocodificarDireccion,
  calcularPrecioReferencia, Piso, PisoForm, Valoracion
} from "@/app/lib/data";
import { useLocalStorage } from "@/app/lib/useLocalStorage";
import { useAuth } from "@/app/lib/AuthContext";
import { supabase } from "@/app/lib/supabase";

// ============================================================
// Formulario vacío y mapeos BD
// ============================================================

const FORM_VACIO: PisoForm = {
  nombre: "", url: "", barrio: "", direccion: "", lat: null, lng: null,
  precio: "", m2: "",
  planta: 3, ascensor: true, estado: "bueno", energetica: "D",
  exterior: true, orientacionSur: false, garaje: false,
  trastero: false, terraza: false, antiguedad: "2000s", notas: ""
};

function pisoToDb(p: Piso, userId: string) {
  return {
    user_id: userId, nombre: p.nombre, url: p.url || "", barrio: p.barrio,
    precio: p.precio, m2: p.m2, planta: p.planta, ascensor: p.ascensor,
    estado: p.estado, energetica: p.energetica, exterior: p.exterior,
    orientacion_sur: p.orientacionSur, garaje: p.garaje, trastero: p.trastero,
    terraza: p.terraza, antiguedad: p.antiguedad, notas: p.notas || "",
    direccion: p.direccion || "", lat: p.lat || null, lng: p.lng || null,
  };
}

function dbToPiso(row: Record<string, unknown>): Piso {
  return {
    id: row.id as number,
    nombre: row.nombre as string, url: (row.url as string) || "",
    barrio: row.barrio as string, direccion: (row.direccion as string) || "",
    lat: (row.lat as number) || null, lng: (row.lng as number) || null,
    precio: row.precio as number, m2: row.m2 as number,
    planta: (row.planta as number) || 3, ascensor: row.ascensor as boolean,
    estado: (row.estado as string) || "bueno", energetica: (row.energetica as string) || "D",
    exterior: row.exterior as boolean, orientacionSur: row.orientacion_sur as boolean,
    garaje: row.garaje as boolean, trastero: row.trastero as boolean,
    terraza: row.terraza as boolean, antiguedad: (row.antiguedad as string) || "2000s",
    notas: (row.notas as string) || "",
  };
}

// ============================================================
// Toggle segmentado reutilizable
// ============================================================

function ToggleSwitch({
  label, value, onChange, labelTrue = "Sí", labelFalse = "No"
}: {
  label: string; value: boolean; onChange: (v: boolean) => void;
  labelTrue?: string; labelFalse?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-[#3d3528]">{label}</span>
      <div className="flex bg-[#f0ebe3] rounded-lg p-0.5 gap-0.5">
        <button
          onClick={() => onChange(true)}
          className={`px-3.5 py-1 rounded-md text-xs font-semibold transition-all ${
            value ? "bg-[#7a9e6d] text-white shadow-sm" : "text-[#8a7e6d] hover:text-[#3d3528]"
          }`}
        >{labelTrue}</button>
        <button
          onClick={() => onChange(false)}
          className={`px-3.5 py-1 rounded-md text-xs font-semibold transition-all ${
            !value ? "bg-[#7a9e6d] text-white shadow-sm" : "text-[#8a7e6d] hover:text-[#3d3528]"
          }`}
        >{labelFalse}</button>
      </div>
    </div>
  );
}

// ============================================================
// Estilo compartido para inputs numéricos de sliders
// ============================================================

const numInputClass = "w-16 text-right bg-white border border-[#ddd5c8] rounded-lg px-2 py-1 text-xs text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";
const euroInputClass = "w-24 text-right bg-white border border-[#ddd5c8] rounded-lg px-2 py-1 text-xs text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";

// ============================================================
// Chevron SVG
// ============================================================

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#8a7e6d] shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ============================================================
// PisoCard — tarjeta colapsable con cascada completa
// ============================================================

function PisoCard({
  piso, expanded, onToggle, onDelete
}: {
  piso: Piso;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  // --- Todos los hooks primero (regla de React) ---
  const [primeraVivienda, setPrimeraVivienda] = useState(true);
  const [menorDe40, setMenorDe40] = useState(true);
  const [obraNueva, setObraNueva] = useState(false);
  const [pctEntrada, setPctEntrada] = useState(20);
  const [plazo, setPlazo] = useState(25);
  const [tipoInteres, setTipoInteres] = useState(2.8);
  const [editingEntrada, setEditingEntrada] = useState(false);
  const [entradaInput, setEntradaInput] = useState("");

  const v = valorarPiso(piso);
  if (!v) return null;

  const precio = piso.precio;

  // --- Costes de compra ---
  let impuestoPct: number;
  let impuestoLabel: string;
  if (obraNueva) {
    impuestoPct = 0.005;
    impuestoLabel = "AJD (0,5%)";
  } else if (primeraVivienda && menorDe40) {
    impuestoPct = 0.025;
    impuestoLabel = "ITP reducido (2,5%)";
  } else {
    impuestoPct = 0.04;
    impuestoLabel = "ITP (4%)";
  }
  const impuesto = Math.round(precio * impuestoPct);
  const notaria = Math.round(precio * 0.004);
  const registro = Math.round(precio * 0.0015);
  const gestoria = 400;
  const totalGastos = impuesto + notaria + registro + gestoria;
  const costeTotal = precio + totalGastos;

  // --- Hipoteca (sistema francés) ---
  const entrada = Math.round(costeTotal * (pctEntrada / 100));
  const capitalHipoteca = costeTotal - entrada;
  const rMensual = tipoInteres / 100 / 12;
  const nMeses = plazo * 12;
  const cuotaMensual = rMensual > 0
    ? capitalHipoteca * (rMensual * Math.pow(1 + rMensual, nMeses)) / (Math.pow(1 + rMensual, nMeses) - 1)
    : capitalHipoteca / nMeses;
  const totalPrestamo = cuotaMensual * nMeses;
  const totalIntereses = totalPrestamo - capitalHipoteca;
  const salarioMinimo = cuotaMensual / 0.30;

  // Veredicto corto (solo la primera parte antes del "—")
  const verdictoCort = v.veredicto.split("—")[0].trim();

  // ================= VISTA COLAPSADA =================
  if (!expanded) {
    return (
      <div
        className="bg-white rounded-2xl p-4 border border-[#e8e0d4] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#3d3528] truncate">{piso.nombre}</div>
            <div className="text-xs text-[#8a7e6d] truncate">
              {piso.direccion || v.barrioNombre} · {piso.m2}m²
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-base font-bold text-[#3d3528]">{formatEur(precio)}</div>
            <div className="text-xs font-semibold" style={{ color: v.vColor }}>
              {verdictoCort}
            </div>
          </div>
          <Chevron expanded={false} />
        </div>
      </div>
    );
  }

  // ================= VISTA EXPANDIDA (cascada completa) =================
  return (
    <div className="space-y-4">
      {/* ================================================================
          BLOQUE 1 — VALORACIÓN
          ================================================================ */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm">
        {/* Cabecera con chevron para colapsar */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#3d3528]">{piso.nombre}</div>
            <div className="text-xs text-[#8a7e6d]">
              {piso.direccion || v.barrioNombre} · {piso.m2}m² · Planta {piso.planta}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {piso.url && (
              <a href={piso.url} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#7a9e6d] hover:underline">Ver anuncio</a>
            )}
            <button onClick={onDelete} className="text-[#c0534f] text-xs hover:underline">Eliminar</button>
            <button onClick={onToggle} className="ml-1 p-1 hover:bg-[#f5f0e8] rounded-lg transition-colors">
              <Chevron expanded={true} />
            </button>
          </div>
        </div>

        {/* Veredicto */}
        <div className="rounded-xl p-3 mb-3 text-center" style={{ background: v.vColor + "12" }}>
          <div className="text-sm font-bold" style={{ color: v.vColor }}>{v.veredicto}</div>
          <div className="text-xs mt-1" style={{ color: v.vColor }}>
            {v.diferencia > 0 ? "+" : ""}{v.diferencia.toFixed(1)}% respecto al precio estimado
          </div>
        </div>

        {/* Indicador de confianza */}
        {v.confianza !== "alta" && (
          <div className={`text-[10px] text-center mb-2 ${v.confianza === "media" ? "text-[#c0935a]" : "text-[#c0534f]"}`}>
            {v.confianza === "media"
              ? "Estimación aproximada — la dirección está entre barrios"
              : "Estimación con baja confianza — ubicación fuera del área cubierta"}
          </div>
        )}

        {/* Comparativa 3 columnas */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#f5f0e8] rounded-xl p-3">
            <div className="text-[10px] text-[#8a7e6d] uppercase tracking-wide">Precio pedido</div>
            <div className="text-base font-bold text-[#3d3528]">{formatEur(precio)}</div>
            <div className="text-[10px] text-[#8a7e6d]">{formatEur(v.precioM2Pedido)}/m²</div>
          </div>
          <div className="bg-[#f0f5ee] rounded-xl p-3">
            <div className="text-[10px] text-[#7a9e6d] uppercase tracking-wide font-semibold">Estimación justa</div>
            <div className="text-base font-bold text-[#5a8a5a]">{formatEur(v.precioEstimado)}</div>
            <div className="text-[10px] text-[#7a9e6d]">{formatEur(v.precioM2Est)}/m²</div>
          </div>
          <div className="bg-[#f5f0e8] rounded-xl p-3">
            <div className="text-[10px] text-[#8a7e6d] uppercase tracking-wide">Ref. zona</div>
            <div className="text-base font-bold text-[#8a7e6d]">{formatEur(v.baseBarrio * piso.m2)}</div>
            <div className="text-[10px] text-[#8a7e6d]">{formatEur(v.baseBarrio)}/m²</div>
          </div>
        </div>

        {/* Barra visual de diferencia */}
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-[#8a7e6d] mb-1">
            <span>Chollo</span><span>Justo</span><span>Caro</span>
          </div>
          <div className="h-2 bg-[#f0ebe3] rounded-full relative overflow-hidden">
            <div className="absolute h-full w-0.5 bg-[#c0935a] left-1/2 -translate-x-1/2 z-10" />
            <div className="absolute h-full rounded-full transition-all" style={{
              width: "8px",
              left: `${Math.min(Math.max(50 + v.diferencia * 2, 5), 95)}%`,
              transform: "translateX(-50%)", background: v.vColor,
            }} />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {[
            v.barrioNombre, piso.ascensor && "Ascensor",
            piso.exterior ? "Exterior" : "Interior", piso.orientacionSur && "Sur",
            piso.garaje && "Garaje", piso.trastero && "Trastero", piso.terraza && "Terraza",
            `Energía ${piso.energetica}`, piso.estado,
          ].filter(Boolean).map((badge, i) => (
            <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f5f0e8] text-[#8a7e6d]">{badge}</span>
          ))}
        </div>

        {piso.notas && <div className="mt-2 text-xs text-[#8a7e6d] italic">{piso.notas}</div>}
      </div>

      {/* ================================================================
          BLOQUES 2+3 — COSTES Y HIPOTECA (lado a lado en desktop)
          ================================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-cascade" style={{ animationDelay: "0.1s" }}>

        {/* ---------- BLOQUE 2: COSTES DE COMPRA ---------- */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm">
          <div className="text-base font-bold text-[#3d3528] mb-1">Costes de compra</div>
          <p className="text-xs text-[#8a7e6d] mb-3">Fiscalidad de Álava</p>

          <div className="space-y-0.5 mb-4 border-b border-[#e8e0d4] pb-3">
            <ToggleSwitch label="¿Primera vivienda?" value={primeraVivienda} onChange={setPrimeraVivienda} />
            <ToggleSwitch label="¿Menor de 40 años?" value={menorDe40} onChange={setMenorDe40} />
            <ToggleSwitch label="Tipo de vivienda" value={obraNueva} onChange={setObraNueva} labelTrue="Obra nueva" labelFalse="2ª mano" />
          </div>

          <div className="bg-[#faf8f4] rounded-xl p-4 space-y-2.5">
            {[
              { label: impuestoLabel, amount: impuesto },
              { label: "Notaría (0,4%)", amount: notaria },
              { label: "Registro (0,15%)", amount: registro },
              { label: "Gestoría", amount: gestoria },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-[#8a7e6d]">{item.label}</span>
                <span className="font-semibold text-[#3d3528]">{formatEur(item.amount)}</span>
              </div>
            ))}
            <div className="border-t border-[#e8e0d4] pt-2.5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8a7e6d] font-semibold">Total gastos</span>
                <span className="font-bold text-[#c0534f]">{formatEur(totalGastos)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold text-[#3d3528]">COSTE TOTAL</span>
                <span className="font-bold text-[#3d3528] text-lg">{formatEur(costeTotal)}</span>
              </div>
            </div>
          </div>

          {!obraNueva && primeraVivienda && menorDe40 && (
            <div className="mt-3 bg-[#f0f5ee] rounded-lg px-3 py-2 text-[11px] text-[#5a7a5a]">
              Aplica ITP reducido (2,5%) en Álava por primera vivienda y menor de 40 años
            </div>
          )}
          {obraNueva && (
            <div className="mt-3 bg-[#f0f5ee] rounded-lg px-3 py-2 text-[11px] text-[#5a7a5a]">
              En obra nueva se paga AJD (0,5%) en vez de ITP. El IVA (10%) suele estar incluido en el precio.
            </div>
          )}
        </div>

        {/* ---------- BLOQUE 3: SIMULACIÓN DE HIPOTECA ---------- */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm">
          <div className="text-base font-bold text-[#3d3528] mb-1">Simulación de hipoteca</div>
          <p className="text-xs text-[#8a7e6d] mb-3">Sistema francés (cuota fija)</p>

          {/* Sliders con inputs numéricos */}
          <div className="space-y-3 mb-4">
            {/* Entrada: slider + %input + €input */}
            <div>
              <div className="text-xs text-[#8a7e6d] font-medium mb-1">Porcentaje de entrada</div>
              <input
                type="range" min={10} max={50} step={1} value={pctEntrada}
                onChange={e => setPctEntrada(+e.target.value)}
                className="w-full cursor-pointer"
              />
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <input
                  type="number" min={5} max={90} step={0.1} value={pctEntrada}
                  onChange={e => { const n = parseFloat(e.target.value); if (!isNaN(n)) setPctEntrada(n); }}
                  className={numInputClass}
                />
                <span className="text-xs text-[#8a7e6d]">%</span>
                <span className="text-xs text-[#b0a898] mx-0.5">=</span>
                <input
                  type="number" step={1}
                  value={editingEntrada ? entradaInput : Math.round(entrada)}
                  onFocus={e => { setEditingEntrada(true); setEntradaInput(e.target.value); }}
                  onChange={e => setEntradaInput(e.target.value)}
                  onBlur={() => {
                    const eur = parseFloat(entradaInput);
                    if (!isNaN(eur) && costeTotal > 0) {
                      setPctEntrada(parseFloat(((eur / costeTotal) * 100).toFixed(1)));
                    }
                    setEditingEntrada(false);
                  }}
                  className={euroInputClass}
                />
                <span className="text-xs text-[#8a7e6d]">€</span>
              </div>
            </div>

            {/* Plazo: slider + input */}
            <div>
              <div className="text-xs text-[#8a7e6d] font-medium mb-1">Plazo</div>
              <input
                type="range" min={10} max={35} step={1} value={plazo}
                onChange={e => setPlazo(+e.target.value)}
                className="w-full cursor-pointer"
              />
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="number" min={10} max={35} value={plazo}
                  onChange={e => { const n = parseInt(e.target.value); if (!isNaN(n)) setPlazo(n); }}
                  className={numInputClass}
                />
                <span className="text-xs text-[#8a7e6d]">años</span>
              </div>
            </div>

            {/* Tipo de interés: slider + input */}
            <div>
              <div className="text-xs text-[#8a7e6d] font-medium mb-1">Tipo de interés</div>
              <input
                type="range" min={1} max={5} step={0.1} value={tipoInteres}
                onChange={e => setTipoInteres(+e.target.value)}
                className="w-full cursor-pointer"
              />
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="number" min={1} max={5} step={0.1} value={tipoInteres}
                  onChange={e => { const n = parseFloat(e.target.value); if (!isNaN(n)) setTipoInteres(n); }}
                  className={numInputClass}
                />
                <span className="text-xs text-[#8a7e6d]">%</span>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-[#faf8f4] rounded-xl p-4 space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-[#8a7e6d]">Hipoteca solicitada</span>
              <span className="font-semibold text-[#3d3528]">{formatEur(capitalHipoteca)}</span>
            </div>
            <div className="flex justify-between text-sm items-baseline">
              <span className="text-[#8a7e6d]">Cuota mensual</span>
              <span className="font-bold text-[#7a9e6d] text-lg">{formatEur(Math.round(cuotaMensual))}/mes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8a7e6d]">Salario mínimo</span>
              <span className="font-semibold text-[#3d3528]">{formatEur(Math.round(salarioMinimo))}/mes</span>
            </div>
            <div className="text-[10px] text-[#b0a898] -mt-1">
              Para que la cuota no supere el 30% de tus ingresos
            </div>
            <div className="border-t border-[#e8e0d4] pt-2.5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8a7e6d]">Total pagado al banco</span>
                <span className="font-semibold text-[#3d3528]">{formatEur(Math.round(totalPrestamo))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8a7e6d]">Total intereses</span>
                <span className="font-semibold text-[#c0534f]">{formatEur(Math.round(totalIntereses))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          BLOQUE 4 — RESUMEN FINAL
          ================================================================ */}
      <div
        className="bg-gradient-to-br from-[#f0f5ee] to-[#e8f0e4] rounded-2xl p-5 border border-[#d5e5cf] shadow-sm animate-cascade"
        style={{ animationDelay: "0.25s" }}
      >
        <div className="max-w-[500px] mx-auto">
          {/* Dato principal: Cuota mensual */}
          <div className="text-center mb-4">
            <div className="text-[11px] text-[#7a9e6d] uppercase tracking-wider font-semibold">Tu cuota mensual</div>
            <div className="mt-1">
              <span className="text-4xl font-extrabold text-[#7a9e6d]">{formatEur(Math.round(cuotaMensual))}</span>
              <span className="text-lg font-bold text-[#7a9e6d]/70">/mes</span>
            </div>
          </div>

          {/* Tabla tipo factura */}
          <div className="bg-white/60 rounded-xl px-4 py-1 divide-y divide-[#e8e0d4]">
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-[#8a7e6d]">Precio del piso</span>
              <span className="text-[#3d3528]">{formatEur(precio)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-[#8a7e6d]">Gastos de compra</span>
              <span className="text-[#3d3528]">{formatEur(totalGastos)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="font-bold text-[#3d3528]">Total a pagar</span>
              <span className="font-bold text-[#3d3528]">{formatEur(costeTotal)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-[#8a7e6d]">Entrada necesaria</span>
              <span className="text-[#3d3528]">{formatEur(entrada)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="font-bold text-[#3d3528]">Hipoteca solicitada</span>
              <span className="font-bold text-[#3d3528]">{formatEur(capitalHipoteca)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-[#8a7e6d]">Salario mínimo necesario</span>
              <span className="text-[#3d3528]">{formatEur(Math.round(salarioMinimo))}/mes</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-[#8a7e6d]">Ratio de endeudamiento</span>
              <span className="text-[#3d3528]">máx. 30%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Estado de geocodificación
// ============================================================

type GeoEstado = "idle" | "buscando" | "encontrado" | "no_encontrado" | "error";

// ============================================================
// Componente principal
// ============================================================

export default function PrecioJusto() {
  const { user } = useAuth();

  const [localPisos, setLocalPisos] = useLocalStorage<Piso[]>("pisos", []);
  const [cloudPisos, setCloudPisos] = useState<Piso[]>([]);
  const [loadingCloud, setLoadingCloud] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PisoForm>(FORM_VACIO);
  const [geoEstado, setGeoEstado] = useState<GeoEstado>("idle");
  const [geoInfo, setGeoInfo] = useState<string>("");
  const [modoManual, setModoManual] = useState(false);

  // ID del piso expandido (solo uno a la vez, null = todos colapsados)
  const [expandedId, setExpandedId] = useState<number | null>(null);
  // Flag para auto-expandir el piso recién añadido (cloud)
  const [autoExpandNewest, setAutoExpandNewest] = useState(false);

  // Pisos ordenados: más reciente primero
  const pisos = user
    ? cloudPisos
    : [...localPisos].reverse();

  // Cargar pisos cloud
  const loadCloudPisos = useCallback(async () => {
    if (!user) return;
    setLoadingCloud(true);
    const { data, error } = await supabase
      .from("valuations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setCloudPisos(data.map(dbToPiso));
    setLoadingCloud(false);
  }, [user]);

  useEffect(() => { loadCloudPisos(); }, [loadCloudPisos]);

  // Auto-expandir el piso más reciente tras añadir (cloud)
  useEffect(() => {
    if (autoExpandNewest && cloudPisos.length > 0) {
      setExpandedId(cloudPisos[0].id);
      setAutoExpandNewest(false);
    }
  }, [cloudPisos, autoExpandNewest]);

  // Geocodificar
  const geocodificar = async () => {
    if (!form.direccion.trim()) return;
    setGeoEstado("buscando");
    setGeoInfo("");
    const resultado = await geocodificarDireccion(form.direccion);
    if (resultado) {
      const ref = calcularPrecioReferencia(resultado.lat, resultado.lng);
      setForm({ ...form, lat: resultado.lat, lng: resultado.lng, barrio: ref.barrioMasCercano });
      setGeoEstado("encontrado");
      setGeoInfo(
        `${ref.barrioMasCercano} · ${formatEur(ref.precioM2)}/m² · ` +
        `${ref.distanciaBarrio < 1000 ? ref.distanciaBarrio + "m" : (ref.distanciaBarrio / 1000).toFixed(1) + "km"} del centro del barrio`
      );
    } else {
      setGeoEstado("no_encontrado");
      setGeoInfo("No se encontró la dirección. Prueba a ser más específico o usa el modo manual.");
    }
  };

  // Añadir piso
  const addPiso = async () => {
    if (!form.nombre || !form.precio || !form.m2) return;
    if (!form.barrio && !form.lat) return;
    if (modoManual && !form.barrio) return;

    const nuevoId = Date.now();
    const nuevoPiso: Piso = {
      ...form, id: nuevoId,
      precio: +form.precio, m2: +form.m2, planta: +form.planta || 0,
    };

    if (user) {
      const { error } = await supabase.from("valuations").insert(pisoToDb(nuevoPiso, user.id));
      if (!error) {
        setAutoExpandNewest(true);
        await loadCloudPisos();
      }
    } else {
      setLocalPisos([...localPisos, nuevoPiso]);
      setExpandedId(nuevoId);
    }

    setForm(FORM_VACIO);
    setShowForm(false);
    setGeoEstado("idle");
    setGeoInfo("");
    setModoManual(false);
  };

  // Eliminar piso
  const deletePiso = async (id: number) => {
    if (expandedId === id) setExpandedId(null);
    if (user) {
      await supabase.from("valuations").delete().eq("id", id);
      await loadCloudPisos();
    } else {
      setLocalPisos(localPisos.filter(p => p.id !== id));
    }
  };

  // Estilos del formulario
  const inputClass = "w-full bg-white border border-[#ddd5c8] rounded-lg px-3 py-2.5 text-sm text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";
  const labelClass = "block text-xs text-[#8a7e6d] font-medium mb-1";
  const checkClass = "flex items-center gap-2 text-sm text-[#3d3528] cursor-pointer";

  return (
    <div>
      {/* Info del modelo */}
      <div className="bg-[#f0f5ee] rounded-2xl p-4 mb-4 border border-[#d5e5cf]">
        <div className="text-sm font-bold text-[#5a7a5a] mb-1">Metodología</div>
        <p className="text-xs text-[#5a5040] leading-relaxed">
          Introduce la dirección del piso y calculamos el precio de referencia de la zona interpolando
          datos de los barrios cercanos (datos enero 2026, 56 zonas). Después ajustamos según las características
          del piso. Debajo del veredicto verás los costes reales de compra y la simulación de hipoteca.
        </p>
      </div>

      {user && (
        <div className="text-center text-[10px] text-[#7a9e6d] mb-3">Tus valoraciones se guardan en la nube</div>
      )}

      {!showForm && (
        <button onClick={() => setShowForm(true)}
          className="w-full bg-[#7a9e6d] text-white rounded-2xl py-3 text-sm font-semibold mb-4 hover:bg-[#6b8e5e] transition-colors">
          + Valorar un piso nuevo
        </button>
      )}

      {/* ============================================================
          FORMULARIO (sin cambios en la lógica)
          ============================================================ */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
          <div className="text-base font-bold text-[#3d3528] mb-4">Datos del piso</div>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Nombre / referencia *</label>
              <input className={inputClass} placeholder="Ej: Piso calle Florida 3º"
                value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>URL del anuncio (opcional)</label>
              <input className={inputClass} placeholder="https://idealista.com/..."
                value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
            </div>

            {!modoManual ? (
              <div>
                <label className={labelClass}>Dirección del piso *</label>
                <div className="flex gap-2">
                  <input className={`${inputClass} flex-1`} placeholder="Ej: Calle Florida 15, 3º"
                    value={form.direccion}
                    onChange={e => { setForm({ ...form, direccion: e.target.value, lat: null, lng: null, barrio: "" }); setGeoEstado("idle"); setGeoInfo(""); }}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); geocodificar(); } }}
                  />
                  <button onClick={geocodificar}
                    disabled={geoEstado === "buscando" || !form.direccion.trim()}
                    className="px-4 bg-[#7a9e6d] text-white rounded-lg text-sm font-semibold hover:bg-[#6b8e5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                    {geoEstado === "buscando" ? "Buscando..." : "Localizar"}
                  </button>
                </div>
                {geoEstado === "encontrado" && geoInfo && (
                  <div className="mt-2 bg-[#f0f5ee] rounded-lg px-3 py-2 text-xs text-[#5a7a5a]">{geoInfo}</div>
                )}
                {geoEstado === "no_encontrado" && (
                  <div className="mt-2 bg-[#fdf2f0] rounded-lg px-3 py-2 text-xs text-[#c0534f]">{geoInfo}</div>
                )}
                {geoEstado === "error" && (
                  <div className="mt-2 bg-[#fdf2f0] rounded-lg px-3 py-2 text-xs text-[#c0534f]">Error de conexión. Prueba de nuevo o usa el modo manual.</div>
                )}
                <button
                  onClick={() => { setModoManual(true); setForm({ ...form, lat: null, lng: null, barrio: BARRIOS[0]?.name || "" }); setGeoEstado("idle"); setGeoInfo(""); }}
                  className="mt-1.5 text-[11px] text-[#8a7e6d] hover:text-[#5a5040] underline">
                  ¿No encuentras la dirección? Seleccionar barrio manualmente
                </button>
              </div>
            ) : (
              <div>
                <label className={labelClass}>Barrio *</label>
                <select className={inputClass} value={form.barrio}
                  onChange={e => setForm({ ...form, barrio: e.target.value })}>
                  {BARRIOS.map(b => <option key={b.name} value={b.name}>{b.name} ({formatEur(b.precioM2)}/m²)</option>)}
                </select>
                <button
                  onClick={() => { setModoManual(false); setForm({ ...form, barrio: "", lat: null, lng: null }); }}
                  className="mt-1.5 text-[11px] text-[#7a9e6d] hover:text-[#5a8a5a] underline">
                  Volver a búsqueda por dirección
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Precio (€) *</label>
                <input className={inputClass} type="number" placeholder="200000"
                  value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Superficie (m²) *</label>
                <input className={inputClass} type="number" placeholder="80"
                  value={form.m2} onChange={e => setForm({ ...form, m2: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Planta</label>
                <input className={inputClass} type="number" min="0" max="15"
                  value={form.planta} onChange={e => setForm({ ...form, planta: +e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Estado</label>
                <select className={inputClass} value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
                  <option value="nuevo">Nuevo / a estrenar</option>
                  <option value="reformado">Reformado</option>
                  <option value="bueno">Buen estado</option>
                  <option value="a reformar">Necesita reforma</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Certificado energético</label>
                <select className={inputClass} value={form.energetica} onChange={e => setForm({ ...form, energetica: e.target.value })}>
                  {["A", "B", "C", "D", "E", "F", "G"].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Antigüedad edificio</label>
                <select className={inputClass} value={form.antiguedad} onChange={e => setForm({ ...form, antiguedad: e.target.value })}>
                  <option value="pre1970">Anterior a 1970</option>
                  <option value="1970s-80s">Años 70-80</option>
                  <option value="1990s">Años 90</option>
                  <option value="2000s">Años 2000</option>
                  <option value="2010s+">2010 en adelante</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { key: "ascensor", label: "Ascensor" }, { key: "exterior", label: "Exterior" },
                { key: "orientacionSur", label: "Orientación sur" }, { key: "garaje", label: "Garaje incluido" },
                { key: "trastero", label: "Trastero" }, { key: "terraza", label: "Terraza" },
              ].map(({ key, label }) => (
                <label key={key} className={checkClass}>
                  <input type="checkbox" checked={form[key as keyof PisoForm] as boolean}
                    onChange={e => setForm({ ...form, [key]: e.target.checked })}
                    className="rounded border-[#ddd5c8] text-[#7a9e6d] focus:ring-[#7a9e6d]" />
                  {label}
                </label>
              ))}
            </div>

            <div>
              <label className={labelClass}>Notas (opcional)</label>
              <input className={inputClass} placeholder="Observaciones, impresiones..."
                value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={addPiso}
              disabled={!form.nombre || !form.precio || !form.m2 || (!form.barrio && !form.lat)}
              className="flex-1 bg-[#7a9e6d] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#6b8e5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Valorar piso
            </button>
            <button onClick={() => { setShowForm(false); setForm(FORM_VACIO); setGeoEstado("idle"); setGeoInfo(""); setModoManual(false); }}
              className="px-5 bg-[#f5f0e8] text-[#8a7e6d] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#e8e0d4] transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {user && loadingCloud && (
        <div className="text-center text-sm text-[#8a7e6d] py-8">Cargando valoraciones...</div>
      )}

      {pisos.length === 0 && !showForm && !loadingCloud && (
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d4] text-center">
          <div className="text-3xl mb-3">🏠</div>
          <p className="text-sm text-[#8a7e6d]">
            Aún no has valorado ningún piso. Añade uno para ver si su precio es justo.
          </p>
        </div>
      )}

      {/* ============================================================
          LISTA DE VALORACIONES (colapsables, más reciente primero)
          ============================================================ */}
      {pisos.length > 0 && (
        <div className="space-y-3">
          {/* Encabezado de la sección si hay más de una y ninguna está expandida */}
          {pisos.length > 1 && expandedId === null && (
            <div className="text-xs text-[#8a7e6d] font-semibold uppercase tracking-wider mt-2">
              Tus valoraciones ({pisos.length})
            </div>
          )}

          {pisos.map(p => (
            <PisoCard
              key={p.id}
              piso={p}
              expanded={expandedId === p.id}
              onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
              onDelete={() => deletePiso(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
