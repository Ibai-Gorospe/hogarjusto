"use client";

import { useMemo } from "react";
import { formatEur } from "@/app/lib/data";
import { useLocalStorage } from "@/app/lib/useLocalStorage";

interface HipState {
  precio: number;
  entrada: number;
  anos: number;
  interes: number;
  sueldo1: number;
  sueldo2: number;
}

export default function Hipoteca() {
  const [hip, setHip] = useLocalStorage<HipState>("hip", {
    precio: 200000, entrada: 0, anos: 30, interes: 1.85, sueldo1: 2000, sueldo2: 2000
  });

  // Cálculo de hipoteca (amortización francesa)
  const calc = useMemo(() => {
    const principal = hip.precio - hip.entrada;
    const r = hip.interes / 100 / 12;
    const n = hip.anos * 12;

    if (r === 0) return { cuota: principal / n, total: principal, intereses: 0, ratio: 0, principal };

    const cuota = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = cuota * n;
    const intereses = total - principal;
    const ratio = cuota / (hip.sueldo1 + hip.sueldo2) * 100;

    return { cuota, total, intereses, ratio, principal };
  }, [hip]);

  const inputClass = "w-full bg-white border border-[#ddd5c8] rounded-lg px-3 py-2.5 text-sm text-[#3d3528] outline-none focus:border-[#7a9e6d]";

  return (
    <div>
      {/* Datos de la hipoteca */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] mb-4">
        <div className="text-sm font-semibold text-[#7a9e6d] mb-3">Datos de la hipoteca</div>
        <div className="space-y-3">
          {/* Precio slider */}
          <div>
            <label className="block text-xs text-[#8a7e6d] font-medium mb-1">
              Precio vivienda: {formatEur(hip.precio)}
            </label>
            <input type="range" min={80000} max={500000} step={5000}
              value={hip.precio}
              onChange={e => setHip({ ...hip, precio: +e.target.value })}
              className="w-full accent-[#6a8a5a]" />
          </div>

          {/* Entrada slider */}
          <div>
            <label className="block text-xs text-[#8a7e6d] font-medium mb-1">
              Aportación inicial: {formatEur(hip.entrada)} ({(hip.entrada / hip.precio * 100).toFixed(0)}%)
            </label>
            <input type="range" min={0} max={hip.precio * 0.5} step={1000}
              value={hip.entrada}
              onChange={e => setHip({ ...hip, entrada: +e.target.value })}
              className="w-full accent-[#6a8a5a]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Duración */}
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">
                Duración: {hip.anos} años
              </label>
              <input type="range" min={10} max={35}
                value={hip.anos}
                onChange={e => setHip({ ...hip, anos: +e.target.value })}
                className="w-full accent-[#6a8a5a]" />
            </div>
            {/* Interés */}
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">
                Interés anual: {hip.interes}%
              </label>
              <input type="range" min={0.5} max={5} step={0.05}
                value={hip.interes}
                onChange={e => setHip({ ...hip, interes: +e.target.value })}
                className="w-full accent-[#6a8a5a]" />
            </div>
            {/* Sueldos */}
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">Sueldo persona 1 (€/mes)</label>
              <input className={inputClass} type="number" value={hip.sueldo1}
                onChange={e => setHip({ ...hip, sueldo1: +e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-[#8a7e6d] font-medium mb-1">Sueldo persona 2 (€/mes)</label>
              <input className={inputClass} type="number" value={hip.sueldo2}
                onChange={e => setHip({ ...hip, sueldo2: +e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      {/* Resultados principales */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] text-center">
          <div className="text-[11px] text-[#8a7e6d]">Cuota mensual</div>
          <div className="text-2xl font-bold text-[#7a9e6d]">{formatEur(calc.cuota)}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] text-center">
          <div className="text-[11px] text-[#8a7e6d]">% sobre sueldo</div>
          <div className={`text-2xl font-bold ${
            calc.ratio > 35 ? "text-[#c0534f]" : calc.ratio > 30 ? "text-[#c0935a]" : "text-[#5a8a5a]"
          }`}>
            {calc.ratio.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Desglose */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] mb-4">
        {[
          { label: "Capital prestado", value: formatEur(calc.principal) },
          { label: "Total a devolver", value: formatEur(calc.total) },
          { label: "Total intereses", value: formatEur(calc.intereses), color: "text-[#c0534f]" },
          { label: "Intereses / Principal", value: (calc.intereses / calc.principal * 100).toFixed(1) + "%" },
        ].map((r, i) => (
          <div key={i} className={`flex justify-between py-2 text-sm ${i < 3 ? "border-b border-[#e8e0d4]" : ""}`}>
            <span className="text-[#8a7e6d]">{r.label}</span>
            <span className={`font-semibold ${r.color || "text-[#3d3528]"}`}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Barra visual capital vs intereses */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] mb-4">
        <div className="text-sm font-semibold text-[#7a9e6d] mb-2.5">Distribución del pago total</div>
        <div className="flex rounded-lg overflow-hidden h-8">
          <div
            className="flex items-center justify-center text-[11px] font-bold text-white"
            style={{
              width: `${(calc.principal / calc.total) * 100}%`,
              background: "linear-gradient(90deg, #6a8a5a, #8aaa6d)"
            }}
          >
            Capital {((calc.principal / calc.total) * 100).toFixed(0)}%
          </div>
          <div
            className="flex items-center justify-center text-[11px] font-bold text-white"
            style={{
              width: `${(calc.intereses / calc.total) * 100}%`,
              background: "linear-gradient(90deg, #c0735e, #b06050)"
            }}
          >
            Intereses {((calc.intereses / calc.total) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Semáforo */}
      <div className={`bg-white rounded-2xl p-4 border mb-4 ${
        calc.ratio > 35 ? "border-[#c0534f44]" : calc.ratio > 30 ? "border-[#c0935a44]" : "border-[#5a8a5a44]"
      }`}>
        <div className={`text-sm font-bold mb-2 ${
          calc.ratio > 35 ? "text-[#c0534f]" : calc.ratio > 30 ? "text-[#c0935a]" : "text-[#5a8a5a]"
        }`}>
          {calc.ratio > 35 ? "⛔ Cuota excesiva" : calc.ratio > 30 ? "⚠️ Cuota algo elevada" : "✅ Cuota saludable"}
        </div>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          {calc.ratio > 35
            ? "La cuota supera el 35% de los ingresos. Los bancos podrían poner pegas y financieramente es arriesgado. Valora reducir el importe, ampliar plazo o aumentar la entrada."
            : calc.ratio > 30
              ? "Estás en el límite. El Banco de España recomienda no superar el 30-35%. Ve con cuidado y valora si puedes aumentar la entrada."
              : "La cuota está por debajo del 30% de los ingresos. Es un ratio saludable que deja margen para imprevistos y ahorro."
          }
        </p>
      </div>

      {/* Tip actuarial */}
      <div className="bg-gradient-to-br from-[#f8f4ed] to-[#faf7f2] rounded-2xl p-4 border border-[#5a7a5a22]">
        <div className="text-sm font-bold text-[#7a9e6d] mb-2">💡 Truco actuarial: el efecto del plazo</div>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          Con {formatEur(calc.principal)} al {hip.interes}%: pasar de 30 a 25 años sube la cuota ~{formatEur(calc.cuota * 0.12)}/mes
          pero ahorra ~{formatEur(calc.intereses * 0.25)} en intereses totales.
          Y si consigues hacer amortizaciones anticipadas parciales, el ahorro es aún mayor. ¡Juega con los sliders!
        </p>
      </div>
    </div>
  );
}
