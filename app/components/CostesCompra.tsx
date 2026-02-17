"use client";

import { useState, useMemo } from "react";
import { formatEur } from "@/app/lib/data";
import { useLocalStorage } from "@/app/lib/useLocalStorage";

interface CosteState {
  precio: number;
  tipo: string;
  primeraVivienda: boolean;
  menorDe40: boolean;
}

// Toggle segmentado reutilizable (mismo patrón que PrecioJusto)
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

const euroInputClass = "w-28 text-right bg-white border border-[#ddd5c8] rounded-lg px-2 py-1.5 text-sm text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";

export default function CostesCompra() {
  const [coste, setCoste] = useLocalStorage<CosteState>("coste_v2", {
    precio: 200000, tipo: "segunda", primeraVivienda: true, menorDe40: true
  });
  const [editingPrecio, setEditingPrecio] = useState(false);
  const [precioInput, setPrecioInput] = useState("");

  // Cálculo de costes
  const calc = useMemo(() => {
    const p = coste.precio;
    let impuesto = 0;
    let impuestoNombre = "";

    if (coste.tipo === "segunda") {
      const rate = (coste.primeraVivienda && coste.menorDe40) ? 0.025 : 0.04;
      impuesto = p * rate;
      impuestoNombre = `ITP Álava (${(rate * 100).toFixed(1)}%)`;
    } else {
      impuesto = p * 0.10;
      impuestoNombre = "IVA (10%)";
    }

    const ajd = coste.tipo === "nueva" ? p * 0.005 : 0;
    const notaria = Math.min(Math.max(p * 0.003, 600), 1000);
    const registro = Math.min(Math.max(p * 0.002, 400), 650);
    const gestoria = 300;
    const tasacion = 400;
    const total = impuesto + ajd + notaria + registro + gestoria + tasacion;

    return { impuesto, impuestoNombre, ajd, notaria, registro, gestoria, tasacion, total };
  }, [coste]);

  return (
    <div className="max-w-[700px] mx-auto">

      {/* ====== BANNER VENTAJA FISCAL ====== */}
      <div className="bg-[#f0f5ee] rounded-xl px-4 py-3 mb-4 border border-[#d5e5cf]">
        <p className="text-sm text-[#5a5040] leading-relaxed">
          <strong className="text-[#7a9e6d]">Ventaja fiscal de Álava:</strong>{" "}
          ITP del <strong className="text-[#5a8a5a]">4%</strong> en segunda mano (frente al 6-10% de otras CCAA).
          Si es primera vivienda y menor de 40 años, solo el <strong className="text-[#5a8a5a]">2,5%</strong>.
        </p>
      </div>

      {/* ====== SIMULADOR ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#3d3528] mb-1">Simulador de gastos</div>
        <p className="text-xs text-[#8a7e6d] mb-4">Fiscalidad de Álava</p>

        {/* Precio: slider + input */}
        <div className="mb-4">
          <div className="text-xs text-[#8a7e6d] font-medium mb-1">Precio de compra</div>
          <input
            type="range" min={50000} max={600000} step={5000}
            value={coste.precio}
            onChange={e => setCoste({ ...coste, precio: +e.target.value })}
            className="w-full cursor-pointer"
          />
          <div className="flex items-center gap-1.5 mt-1">
            <input
              type="number" step={1000}
              value={editingPrecio ? precioInput : coste.precio}
              onFocus={e => { setEditingPrecio(true); setPrecioInput(e.target.value); }}
              onChange={e => setPrecioInput(e.target.value)}
              onBlur={() => {
                const n = parseInt(precioInput);
                if (!isNaN(n) && n > 0) setCoste({ ...coste, precio: n });
                setEditingPrecio(false);
              }}
              className={euroInputClass}
            />
            <span className="text-xs text-[#8a7e6d]">€</span>
          </div>
        </div>

        {/* Tipo de vivienda — toggle buttons */}
        <div className="mb-3">
          <div className="text-xs text-[#8a7e6d] font-medium mb-1.5">Tipo de vivienda</div>
          <div className="flex bg-[#f0ebe3] rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setCoste({ ...coste, tipo: "segunda" })}
              className={`flex-1 px-3.5 py-1.5 rounded-md text-sm font-semibold transition-all ${
                coste.tipo === "segunda" ? "bg-[#7a9e6d] text-white shadow-sm" : "text-[#8a7e6d] hover:text-[#3d3528]"
              }`}
            >2ª mano</button>
            <button
              onClick={() => setCoste({ ...coste, tipo: "nueva" })}
              className={`flex-1 px-3.5 py-1.5 rounded-md text-sm font-semibold transition-all ${
                coste.tipo === "nueva" ? "bg-[#7a9e6d] text-white shadow-sm" : "text-[#8a7e6d] hover:text-[#3d3528]"
              }`}
            >Obra nueva</button>
          </div>
        </div>

        {/* Toggles ITP reducido (solo segunda mano) */}
        {coste.tipo === "segunda" && (
          <div className="border-t border-[#e8e0d4] pt-2 mt-2 space-y-0.5">
            <ToggleSwitch label="¿Primera vivienda?" value={coste.primeraVivienda} onChange={v => setCoste({ ...coste, primeraVivienda: v })} />
            <ToggleSwitch label="¿Menor de 40 años?" value={coste.menorDe40} onChange={v => setCoste({ ...coste, menorDe40: v })} />
            {coste.primeraVivienda && coste.menorDe40 && (
              <div className="bg-[#f0f5ee] rounded-lg px-3 py-2 text-xs text-[#5a7a5a]">
                Aplica ITP reducido (2,5%) en Álava por primera vivienda y menor de 40 años
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====== DESGLOSE DE GASTOS (factura invertida) ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        {/* Totales grandes primero */}
        <div className="text-center mb-2">
          <div className="text-[11px] text-[#7a9e6d] uppercase tracking-wider font-semibold">Coste total de la operación</div>
          <div className="mt-1">
            <span className="text-4xl font-extrabold text-[#7a9e6d]">{formatEur(coste.precio + calc.total)}</span>
          </div>
          <div className="text-xs text-[#8a7e6d] mt-1">Precio + gastos</div>
        </div>

        <div className="text-center mb-4">
          <div className="text-[11px] text-[#c0534f] uppercase tracking-wider font-semibold mt-3">Total gastos</div>
          <div className="mt-0.5">
            <span className="text-2xl font-bold text-[#c0534f]">{formatEur(calc.total)}</span>
          </div>
          <div className="text-xs text-[#8a7e6d] mt-0.5">
            {(calc.total / coste.precio * 100).toFixed(1)}% del precio de compra
          </div>
        </div>

        {/* Desglose línea a línea */}
        <div className="border-t border-[#e8e0d4] pt-1 divide-y divide-[#e8e0d4]">
          {[
            { label: calc.impuestoNombre, value: calc.impuesto },
            ...(calc.ajd > 0 ? [{ label: "AJD (0,5%)", value: calc.ajd }] : []),
            { label: "Notaría", value: calc.notaria },
            { label: "Registro de la Propiedad", value: calc.registro },
            { label: "Gestoría", value: calc.gestoria },
            { label: "Tasación hipoteca", value: calc.tasacion },
          ].map((item, i) => (
            <div key={i} className="flex justify-between py-2 text-sm">
              <span className="text-[#8a7e6d]">{item.label}</span>
              <span className="text-[#3d3528]">{formatEur(item.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ====== NOTAS ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] text-[#5a5040] leading-relaxed">
        <div className="font-bold text-[#7a9e6d] mb-3">Notas importantes para Álava <span className="font-normal text-sm text-[#8a7e6d]">(febrero 2026)</span></div>
        <div className="space-y-2.5 text-sm">
          <p>La plusvalía municipal la paga el <strong className="text-[#3d3528]">vendedor</strong>, no el comprador.</p>
          <p>Desde 2019, el banco paga los gastos de la escritura de la hipoteca (notaría, registro, gestoría y AJD). Tú solo pagas la <strong className="text-[#3d3528]">tasación (~300-500€)</strong>. Ojo: los gastos de la escritura de compraventa sí los pagas tú.</p>
          <p><strong className="text-[#3d3528]">ITP reducido del 2,5%</strong>: aplica si la vivienda es habitual, ≤120 m² construidos, y no eres propietario de &gt;25% de otra vivienda en el mismo municipio. Desde 2025 se puede usar más de una vez.</p>
          <p><strong className="text-[#3d3528]">Deducción IRPF vivienda</strong>: 18% de lo invertido (compra + intereses hipoteca), máx. 2.160€/año. Si eres menor de 36 años: 23%, máx. 2.760€/año (sin límite el año de compra). Requisito desde 2026: base liquidable ≤ 68.000€.</p>
          <p><strong className="text-[#3d3528]">Cuenta vivienda</strong>: deducción por ahorro destinado a compra. Plazo ampliado a 10 años.</p>
          <p><strong className="text-[#3d3528]">Donaciones familiares</strong>: exentas en ISD hasta 30.000€ si se destinan a vivienda habitual de menor de 36 años (familiares hasta 3er grado).</p>
          <p>Ten al menos un <strong className="text-[#3d3528]">20-25%</strong> del precio ahorrado (entrada + gastos).</p>
          <p>El IBI en Vitoria ronda los 400-800€/año según barrio y tamaño.</p>
          <p>Consulta <strong className="text-[#5a7a5a]">GazteAval</strong> (aval público 80-100% del precio, menores de 40 años, vivienda ≤340.000€) y la ayuda <strong className="text-[#5a7a5a]">Emantzipa</strong> (300€/mes durante 2 años, menores de 36).</p>
        </div>
      </div>
    </div>
  );
}
