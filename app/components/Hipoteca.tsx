"use client";

import { useState, useMemo } from "react";
import { formatEur } from "@/app/lib/data";
import { useLocalStorage } from "@/app/lib/useLocalStorage";

interface HipState {
  precio: number;
  pctEntrada: number;
  anos: number;
  interes: number;
  sueldo1: number;
  sueldo2: number;
}

const numInputClass = "w-16 text-right bg-white border border-[#ddd5c8] rounded-lg px-2 py-1 text-xs text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";
const euroInputClass = "w-24 text-right bg-white border border-[#ddd5c8] rounded-lg px-2 py-1 text-xs text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";
const sueldoInputClass = "w-full bg-white border border-[#ddd5c8] rounded-lg px-3 py-2.5 text-sm text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";

export default function Hipoteca() {
  const [hip, setHip] = useLocalStorage<HipState>("hip_v2", {
    precio: 250000, pctEntrada: 20, anos: 25, interes: 2.8, sueldo1: 2000, sueldo2: 0
  });

  // Estados de edición para inputs con valores derivados
  const [editingPrecio, setEditingPrecio] = useState(false);
  const [precioInput, setPrecioInput] = useState("");
  const [editingEntrada, setEditingEntrada] = useState(false);
  const [entradaInput, setEntradaInput] = useState("");

  // Valores derivados
  const entrada = Math.round(hip.precio * (hip.pctEntrada / 100));
  const principal = hip.precio - entrada;

  // Cálculo de hipoteca (amortización francesa)
  const calc = useMemo(() => {
    const r = hip.interes / 100 / 12;
    const n = hip.anos * 12;

    if (r === 0 || principal <= 0) {
      const cuota = principal > 0 ? principal / n : 0;
      return { cuota, total: principal > 0 ? principal : 0, intereses: 0, principal: Math.max(principal, 0) };
    }

    const cuota = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = cuota * n;
    const intereses = total - principal;

    return { cuota, total, intereses, principal };
  }, [hip.interes, hip.anos, principal]);

  const totalIngresos = hip.sueldo1 + hip.sueldo2;
  const ratio = totalIngresos > 0 ? (calc.cuota / totalIngresos) * 100 : 0;

  // Posición del marcador en la barra (mapeo por tramos)
  const markerPos = (() => {
    if (ratio <= 30) return (ratio / 30) * 60;
    if (ratio <= 35) return 60 + ((ratio - 30) / 5) * 10;
    if (ratio <= 50) return 70 + ((ratio - 35) / 15) * 30;
    return 100;
  })();

  return (
    <div className="max-w-[700px] mx-auto">

      {/* ====== BANNER CONTEXTO DE MERCADO ====== */}
      <div className="bg-[#f0f5ee] rounded-xl px-4 py-3 mb-4 border border-[#d5e5cf]">
        <p className="text-sm text-[#5a5040] leading-relaxed">
          <strong className="text-[#7a9e6d]">Mercado hipotecario (feb. 2026):</strong>{" "}
          Tipo medio ~3%. Mejores ofertas fijas bonificadas: 2,3-2,7%.
          Los bancos financian hasta el 80% del valor de tasación.
        </p>
      </div>

      {/* ====== INPUTS ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#3d3528] mb-1">Simulador de hipoteca</div>
        <p className="text-xs text-[#8a7e6d] mb-4">Sistema francés (cuota fija)</p>

        <div className="space-y-4">
          {/* Precio */}
          <div>
            <div className="text-xs text-[#8a7e6d] font-medium mb-1">Precio de la vivienda</div>
            <input
              type="range" min={50000} max={600000} step={5000}
              value={hip.precio}
              onChange={e => setHip({ ...hip, precio: +e.target.value })}
              className="w-full cursor-pointer"
            />
            <div className="flex items-center gap-1.5 mt-1">
              <input
                type="number" step={1000}
                value={editingPrecio ? precioInput : hip.precio}
                onFocus={e => { setEditingPrecio(true); setPrecioInput(e.target.value); }}
                onChange={e => setPrecioInput(e.target.value)}
                onBlur={() => {
                  const n = parseInt(precioInput);
                  if (!isNaN(n) && n > 0) setHip({ ...hip, precio: n });
                  setEditingPrecio(false);
                }}
                className={euroInputClass}
              />
              <span className="text-xs text-[#8a7e6d]">€</span>
            </div>
          </div>

          {/* Entrada: slider % + input % + input € */}
          <div>
            <div className="text-xs text-[#8a7e6d] font-medium mb-1">Aportación inicial</div>
            <input
              type="range" min={0} max={60} step={1}
              value={hip.pctEntrada}
              onChange={e => setHip({ ...hip, pctEntrada: +e.target.value })}
              className="w-full cursor-pointer"
            />
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <input
                type="number" min={0} max={90} step={0.1}
                value={hip.pctEntrada}
                onChange={e => { const n = parseFloat(e.target.value); if (!isNaN(n)) setHip({ ...hip, pctEntrada: n }); }}
                className={numInputClass}
              />
              <span className="text-xs text-[#8a7e6d]">%</span>
              <span className="text-xs text-[#b0a898] mx-0.5">=</span>
              <input
                type="number" step={1}
                value={editingEntrada ? entradaInput : entrada}
                onFocus={e => { setEditingEntrada(true); setEntradaInput(e.target.value); }}
                onChange={e => setEntradaInput(e.target.value)}
                onBlur={() => {
                  const eur = parseFloat(entradaInput);
                  if (!isNaN(eur) && hip.precio > 0) {
                    setHip({ ...hip, pctEntrada: parseFloat(((eur / hip.precio) * 100).toFixed(1)) });
                  }
                  setEditingEntrada(false);
                }}
                className={euroInputClass}
              />
              <span className="text-xs text-[#8a7e6d]">€</span>
            </div>
          </div>

          {/* Duración + Interés */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#8a7e6d] font-medium mb-1">Duración</div>
              <input
                type="range" min={5} max={35} step={1}
                value={hip.anos}
                onChange={e => setHip({ ...hip, anos: +e.target.value })}
                className="w-full cursor-pointer"
              />
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="number" min={5} max={40}
                  value={hip.anos}
                  onChange={e => { const n = parseInt(e.target.value); if (!isNaN(n)) setHip({ ...hip, anos: n }); }}
                  className={numInputClass}
                />
                <span className="text-xs text-[#8a7e6d]">años</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-[#8a7e6d] font-medium mb-1">Tipo de interés</div>
              <input
                type="range" min={1} max={6} step={0.1}
                value={hip.interes}
                onChange={e => setHip({ ...hip, interes: +e.target.value })}
                className="w-full cursor-pointer"
              />
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="number" min={0.5} max={10} step={0.1}
                  value={hip.interes}
                  onChange={e => { const n = parseFloat(e.target.value); if (!isNaN(n)) setHip({ ...hip, interes: n }); }}
                  className={numInputClass}
                />
                <span className="text-xs text-[#8a7e6d]">%</span>
              </div>
            </div>
          </div>

          {/* Sueldos */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#e8e0d4] pt-4">
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">Tu sueldo neto mensual</label>
              <div className="flex items-center gap-1.5">
                <input
                  className={sueldoInputClass} type="number" placeholder="2000"
                  value={hip.sueldo1 || ""}
                  onChange={e => {
                    if (e.target.value === "") { setHip({ ...hip, sueldo1: 0 }); return; }
                    const n = parseFloat(e.target.value);
                    if (!isNaN(n)) setHip({ ...hip, sueldo1: n });
                  }}
                />
                <span className="text-xs text-[#8a7e6d] shrink-0">€/mes</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">Sueldo neto cotitular (opcional)</label>
              <div className="flex items-center gap-1.5">
                <input
                  className={sueldoInputClass} type="number" placeholder="0"
                  value={hip.sueldo2 || ""}
                  onChange={e => {
                    if (e.target.value === "") { setHip({ ...hip, sueldo2: 0 }); return; }
                    const n = parseFloat(e.target.value);
                    if (!isNaN(n)) setHip({ ...hip, sueldo2: n });
                  }}
                />
                <span className="text-xs text-[#8a7e6d] shrink-0">€/mes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== RESULTADOS PRINCIPALES ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        {/* Cuota mensual */}
        <div className="text-center mb-5">
          <div className="text-[11px] text-[#7a9e6d] uppercase tracking-wider font-semibold">Tu cuota mensual</div>
          <div className="mt-1">
            <span className="text-4xl font-extrabold text-[#7a9e6d]">{formatEur(Math.round(calc.cuota))}</span>
            <span className="text-lg font-bold text-[#7a9e6d]/70">/mes</span>
          </div>
        </div>

        {/* Ratio de endeudamiento — barra visual */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-xs text-[#8a7e6d] font-medium">Ratio de endeudamiento</div>
            <div className={`text-sm font-bold ${
              ratio > 35 ? "text-[#c0534f]" : ratio > 30 ? "text-[#c0935a]" : "text-[#5a8a5a]"
            }`}>
              {totalIngresos > 0 ? ratio.toFixed(1) + "%" : "—"}
            </div>
          </div>

          {/* Barra con 3 zonas coloreadas */}
          <div className="relative h-6 rounded-full overflow-hidden flex">
            <div className="h-full bg-[#7a9e6d]/20" style={{ width: "60%" }} />
            <div className="h-full bg-[#c0935a]/20" style={{ width: "10%" }} />
            <div className="h-full bg-[#c0534f]/20" style={{ width: "30%" }} />

            {/* Marcador */}
            {totalIngresos > 0 && (
              <div
                className="absolute top-0 h-full w-1.5 rounded-full transition-all duration-300"
                style={{
                  left: `${Math.min(markerPos, 100)}%`,
                  transform: "translateX(-50%)",
                  background: ratio > 35 ? "#c0534f" : ratio > 30 ? "#c0935a" : "#5a8a5a",
                }}
              />
            )}
          </div>

          {/* Etiquetas bajo la barra */}
          <div className="flex text-[10px] mt-1">
            <div className="text-[#5a8a5a] font-medium" style={{ width: "60%" }}>Saludable (&lt;30%)</div>
            <div className="text-[#c0935a] font-medium text-center" style={{ width: "10%" }}>Límite</div>
            <div className="text-[#c0534f] font-medium text-right" style={{ width: "30%" }}>Riesgo (&gt;35%)</div>
          </div>

          {/* Mensaje contextual */}
          <div className={`mt-2 rounded-lg px-3 py-2 text-xs ${
            totalIngresos === 0
              ? "bg-[#f5f0e8] text-[#8a7e6d]"
              : ratio > 35
                ? "bg-[#c0534f]/10 text-[#c0534f]"
                : ratio > 30
                  ? "bg-[#c0935a]/10 text-[#c0935a]"
                  : "bg-[#f0f5ee] text-[#5a7a5a]"
          }`}>
            {totalIngresos === 0
              ? "Introduce tu sueldo para calcular el ratio de endeudamiento"
              : ratio > 35
                ? "Riesgo — muy difícil que un banco lo apruebe"
                : ratio > 30
                  ? "Límite — los bancos pueden aprobar pero es ajustado"
                  : "Cuota saludable — deja margen para imprevistos y ahorro"
            }
          </div>
        </div>
      </div>

      {/* ====== DESGLOSE SECUNDARIO ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm">
        <div className="text-sm font-bold text-[#3d3528] mb-3">Desglose de la hipoteca</div>

        <div className="divide-y divide-[#e8e0d4] mb-4">
          <div className="flex justify-between py-2.5 text-sm">
            <span className="text-[#8a7e6d]">Capital prestado</span>
            <span className="text-[#3d3528]">{formatEur(calc.principal)}</span>
          </div>
          <div className="flex justify-between py-2.5 text-sm">
            <span className="font-bold text-[#3d3528]">Total a devolver al banco</span>
            <span className="font-bold text-[#3d3528]">{formatEur(Math.round(calc.total))}</span>
          </div>
          <div className="flex justify-between py-2.5 text-sm">
            <span className="text-[#8a7e6d]">Total intereses</span>
            <span className="font-semibold text-[#c0534f]">{formatEur(Math.round(calc.intereses))}</span>
          </div>
        </div>

        {/* Barra capital vs intereses */}
        <div className="text-xs text-[#8a7e6d] font-medium mb-1.5">Distribución del pago total</div>
        <div className="flex rounded-lg overflow-hidden h-7">
          <div
            className="flex items-center justify-center text-[11px] font-bold text-white"
            style={{
              width: `${calc.total > 0 ? (calc.principal / calc.total) * 100 : 100}%`,
              background: "linear-gradient(90deg, #6a8a5a, #8aaa6d)",
            }}
          >
            Capital {calc.total > 0 ? ((calc.principal / calc.total) * 100).toFixed(0) : 100}%
          </div>
          {calc.intereses > 0 && (
            <div
              className="flex items-center justify-center text-[11px] font-bold text-white"
              style={{
                width: `${(calc.intereses / calc.total) * 100}%`,
                background: "linear-gradient(90deg, #c0735e, #b06050)",
              }}
            >
              Intereses {((calc.intereses / calc.total) * 100).toFixed(0)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
