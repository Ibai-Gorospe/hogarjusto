"use client";

import { useState, useMemo } from "react";
import { BARRIOS, AÑOS_HISTORICO, formatEur, formatPct, getColor, getLabel } from "@/app/lib/data";

export default function MapaPrecios() {
  const [selectedBarrio, setSelectedBarrio] = useState<string | null>(null);
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("precio");

  // Filtrar y ordenar barrios
  const filteredBarrios = useMemo(() => {
    let b = [...BARRIOS];
    if (filterTipo !== "todos") b = b.filter(x => x.tipo === filterTipo);
    if (sortBy === "precio") b.sort((a, c) => a.precioM2 - c.precioM2);
    else if (sortBy === "precio-desc") b.sort((a, c) => c.precioM2 - a.precioM2);
    else if (sortBy === "variacion") b.sort((a, c) => c.var - a.var);
    return b;
  }, [filterTipo, sortBy]);

  // Stats generales
  const precioMin = Math.min(...BARRIOS.map(b => b.precioM2));
  const precioMax = Math.max(...BARRIOS.map(b => b.precioM2));
  const precioMedio = Math.round(BARRIOS.reduce((s, b) => s + b.precioM2, 0) / BARRIOS.length);
  const zonaCara = BARRIOS.reduce((a, b) => a.precioM2 > b.precioM2 ? a : b);
  const zonaBarata = BARRIOS.reduce((a, b) => a.precioM2 < b.precioM2 ? a : b);

  return (
    <div>
      {/* Stats resumen */}
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

      {/* Filtros */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <select
          value={filterTipo}
          onChange={e => setFilterTipo(e.target.value)}
          className="bg-white border border-[#ddd5c8] rounded-lg px-3 py-2 text-sm text-[#3d3528] outline-none"
        >
          <option value="todos">Todos los barrios</option>
          <option value="premium">Premium</option>
          <option value="medio-alto">Medio-Alto</option>
          <option value="medio">Medio</option>
          <option value="asequible">Asequible</option>
          <option value="económico">Económico</option>
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-white border border-[#ddd5c8] rounded-lg px-3 py-2 text-sm text-[#3d3528] outline-none"
        >
          <option value="precio">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="variacion">Mayor subida</option>
        </select>
      </div>

      {/* Lista de barrios */}
      <div className="space-y-3">
        {filteredBarrios.map(b => (
          <div
            key={b.name}
            onClick={() => setSelectedBarrio(selectedBarrio === b.name ? null : b.name)}
            className="bg-white rounded-2xl p-4 border border-[#e8e0d4] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Cabecera del barrio */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-bold text-[#3d3528]">{b.name}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold" style={{ color: getColor(b.precioM2) }}>
                  {formatEur(b.precioM2)}
                </div>
                <div className="text-xs text-[#8a7e6d]">€/m²</div>
              </div>
            </div>

            {/* Barra de precio + badges */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-[#f0ebe3] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((b.precioM2 - precioMin) / (precioMax - precioMin)) * 100}%`,
                    background: getColor(b.precioM2)
                  }}
                />
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: getColor(b.precioM2) + "18", color: getColor(b.precioM2) }}
              >
                {formatPct(b.var)}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f5f0e8] text-[#8a7e6d]">
                {getLabel(b.tipo)}
              </span>
            </div>

            {/* Detalle expandido: serie histórica */}
            {selectedBarrio === b.name && (
              <div className="mt-3 pt-3 border-t border-[#e8e0d4]">
                <div className="text-[10px] text-[#8a7e6d] uppercase tracking-wider font-semibold mb-2">Evolución €/m² (2015–2026)</div>
                <div className="flex items-end gap-[3px] h-16">
                  {b.historico.map((p, i) => {
                    if (p === 0) return <div key={i} className="flex-1" />;
                    const maxH = Math.max(...b.historico.filter(v => v > 0));
                    const minH = Math.min(...b.historico.filter(v => v > 0));
                    const pct = maxH === minH ? 100 : ((p - minH) / (maxH - minH)) * 80 + 20;
                    const isLast = i === b.historico.length - 1;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div
                          className="w-full rounded-sm transition-all"
                          style={{
                            height: `${pct}%`,
                            background: isLast ? getColor(b.precioM2) : "#d4cfc6",
                          }}
                          title={`${AÑOS_HISTORICO[i]}: ${formatEur(p)}/m²`}
                        />
                        {(i === 0 || i === 6 || isLast) && (
                          <div className="text-[8px] text-[#8a7e6d]">{String(AÑOS_HISTORICO[i]).slice(2)}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-center text-xs text-[#8a7e6d]">
                  Piso medio de 80m²: <span className="font-bold text-[#3d3528]">{formatEur(b.precioM2 * 80)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tendencias */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mt-4">
        <div className="text-sm font-bold text-[#7a9e6d] mb-2">💡 Tendencias clave 2026</div>
        <ul className="text-sm text-[#5a5040] space-y-2 list-disc pl-4">
          <li>Subidas de <strong className="text-[#c0534f]">dos dígitos</strong> en muchas zonas: El Pilar, Salburua, Txagorritxu y Zaramaga lideran</li>
          <li><strong className="text-[#3d3528]">Salburua y Zabalgana</strong> ya superan los 3.000€/m², consolidados como barrios premium</li>
          <li>Zonas más caras (Lovaina, Armentia, Ciudad Jardín) superan los <strong className="text-[#3d3528]">4.000€/m²</strong> en compraventas reales</li>
          <li>El stock sigue bajo y la demanda crece por empleo, salarios y tipos de interés atractivos</li>
        </ul>
      </div>
    </div>
  );
}
