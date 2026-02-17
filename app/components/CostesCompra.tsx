"use client";

import { useMemo } from "react";
import { formatEur } from "@/app/lib/data";
import { useLocalStorage } from "@/app/lib/useLocalStorage";

interface CosteState {
  precio: number;
  tipo: string;
  habitual: boolean;
  menos120: boolean;
}

export default function CostesCompra() {
  const [coste, setCoste] = useLocalStorage<CosteState>("coste", {
    precio: 200000, tipo: "segunda", habitual: true, menos120: true
  });

  // Cálculo de costes
  const calc = useMemo(() => {
    const p = coste.precio;
    let impuesto = 0;
    let impuestoNombre = "";

    if (coste.tipo === "segunda") {
      const rate = (coste.habitual && coste.menos120) ? 0.025 : 0.04;
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

  const inputClass = "w-full bg-white border border-[#ddd5c8] rounded-lg px-3 py-2.5 text-sm text-[#3d3528] outline-none focus:border-[#7a9e6d]";

  return (
    <div>
      {/* Info ventaja fiscal */}
      <div className="bg-gradient-to-br from-[#f8f4ed] to-[#faf7f2] rounded-2xl p-5 border border-[#5a7a5a22] mb-4">
        <div className="text-sm font-bold text-[#7a9e6d] mb-2">🏛️ Ventaja fiscal de Álava</div>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          En Álava el ITP para vivienda de segunda mano es solo del <strong className="text-[#5a8a5a]">4%</strong> (frente al 6-10% de otras comunidades).
          Si es vivienda habitual y no supera 120m², baja al <strong className="text-[#5a8a5a]">2,5%</strong>.
          Esto puede suponer un ahorro de 5.000-15.000€ frente a comprar en otras CCAA.
        </p>
      </div>

      {/* Simulador */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] mb-4">
        <div className="text-sm font-semibold text-[#7a9e6d] mb-3">Simulador de gastos</div>
        <div className="space-y-3">
          {/* Precio slider */}
          <div>
            <label className="block text-xs text-[#8a7e6d] font-medium mb-1">
              Precio de compra: {formatEur(coste.precio)}
            </label>
            <input type="range" min={80000} max={500000} step={5000}
              value={coste.precio}
              onChange={e => setCoste({ ...coste, precio: +e.target.value })}
              className="w-full accent-[#6a8a5a]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Tipo vivienda */}
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">Tipo vivienda</label>
              <select className={inputClass} value={coste.tipo}
                onChange={e => setCoste({ ...coste, tipo: e.target.value })}>
                <option value="segunda">Segunda mano</option>
                <option value="nueva">Obra nueva</option>
              </select>
            </div>

            {/* Checkboxes ITP reducido */}
            <div className="flex flex-col gap-1.5 justify-center">
              {coste.tipo === "segunda" && (
                <>
                  <label className="flex items-center gap-2 text-xs text-[#5a5040] cursor-pointer">
                    <input type="checkbox" checked={coste.habitual}
                      onChange={e => setCoste({ ...coste, habitual: e.target.checked })}
                      className="accent-[#6a8a5a]" />
                    Vivienda habitual
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#5a5040] cursor-pointer">
                    <input type="checkbox" checked={coste.menos120}
                      onChange={e => setCoste({ ...coste, menos120: e.target.checked })}
                      className="accent-[#6a8a5a]" />
                    ≤ 120 m²
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desglose */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] mb-4">
        <div className="text-sm font-semibold text-[#7a9e6d] mb-3">Desglose de gastos</div>

        {[
          { label: calc.impuestoNombre, value: calc.impuesto, highlight: true },
          ...(calc.ajd > 0 ? [{ label: "AJD (0,5%)", value: calc.ajd, highlight: false }] : []),
          { label: "Notaría", value: calc.notaria, highlight: false },
          { label: "Registro Propiedad", value: calc.registro, highlight: false },
          { label: "Gestoría", value: calc.gestoria, highlight: false },
          { label: "Tasación hipoteca", value: calc.tasacion, highlight: false },
        ].map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-[#e8e0d4] text-sm">
            <span className={item.highlight ? "text-[#3d3528]" : "text-[#8a7e6d]"}>{item.label}</span>
            <span className={`font-semibold ${item.highlight ? "text-[#c0935a]" : "text-[#5a5040]"}`}>
              {formatEur(item.value)}
            </span>
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-between pt-3 text-base font-bold border-t-2 border-[#5a7a5a44] mt-2">
          <span>TOTAL GASTOS</span>
          <span className="text-[#7a9e6d]">{formatEur(calc.total)}</span>
        </div>

        {/* Coste total operación */}
        <div className="text-center mt-3 p-3 bg-[#f5f0e8] rounded-xl">
          <div className="text-xs text-[#8a7e6d]">Coste total de la operación (precio + gastos)</div>
          <div className="text-2xl font-bold text-[#3d3528]">{formatEur(coste.precio + calc.total)}</div>
          <div className="text-xs text-[#8a7e6d]">
            Gastos = {(calc.total / coste.precio * 100).toFixed(1)}% del precio
          </div>
        </div>
      </div>

      {/* Notas */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] text-sm text-[#8a7e6d] leading-relaxed">
        <div className="font-semibold text-[#7a9e6d] mb-2 text-sm">📋 Notas importantes para Álava</div>
        <p className="mb-1.5">• La plusvalía municipal la paga el <strong className="text-[#3d3528]">vendedor</strong>, no el comprador</p>
        <p className="mb-1.5">• Desde 2019, los gastos de notaría e hipoteca los asume el <strong className="text-[#3d3528]">banco</strong></p>
        <p className="mb-1.5">• Ten al menos un <strong className="text-[#3d3528]">20-25%</strong> del precio ahorrado (entrada + gastos)</p>
        <p className="mb-1.5">• El IBI en Vitoria ronda los 400-800€/año según barrio y tamaño</p>
        <p>• Consulta posibles <strong className="text-[#5a7a5a]">ayudas del Gobierno Vasco</strong> (aval para primera vivienda, Gaztelagun...)</p>
      </div>
    </div>
  );
}
