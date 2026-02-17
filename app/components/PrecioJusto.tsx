"use client";

import { useState } from "react";
import { BARRIOS, formatEur, valorarPiso, Piso, PisoForm } from "@/app/lib/data";
import { useLocalStorage } from "@/app/lib/useLocalStorage";

// Formulario vacío por defecto
const FORM_VACIO: PisoForm = {
  nombre: "", url: "", barrio: "Ensanche", precio: "", m2: "",
  planta: 3, ascensor: true, estado: "bueno", energetica: "D",
  exterior: true, orientacionSur: false, garaje: false,
  trastero: false, terraza: false, antiguedad: "2000s", notas: ""
};

export default function PrecioJusto() {
  const [pisos, setPisos] = useLocalStorage<Piso[]>("pisos", []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PisoForm>(FORM_VACIO);

  // Añadir un piso nuevo
  const addPiso = () => {
    if (!form.nombre || !form.precio || !form.m2) return;
    setPisos([...pisos, {
      ...form,
      id: Date.now(),
      precio: +form.precio,
      m2: +form.m2,
      planta: +form.planta || 0,
    }]);
    setForm(FORM_VACIO);
    setShowForm(false);
  };

  // Eliminar un piso
  const deletePiso = (id: number) => {
    setPisos(pisos.filter(p => p.id !== id));
  };

  // Estilos reutilizables
  const inputClass = "w-full bg-white border border-[#ddd5c8] rounded-lg px-3 py-2.5 text-sm text-[#3d3528] outline-none focus:border-[#7a9e6d] transition-colors";
  const labelClass = "block text-xs text-[#8a7e6d] font-medium mb-1";
  const checkClass = "flex items-center gap-2 text-sm text-[#3d3528] cursor-pointer";

  return (
    <div>
      {/* Info del modelo */}
      <div className="bg-[#f0f5ee] rounded-2xl p-4 mb-4 border border-[#d5e5cf]">
        <div className="text-sm font-bold text-[#5a7a5a] mb-1">📐 Metodología</div>
        <p className="text-xs text-[#5a5040] leading-relaxed">
          Parto del precio medio real del barrio (datos enero 2026) y ajusto según las características del piso:
          estado, planta, ascensor, orientación, antigüedad, extras... El resultado es una estimación del{" "}
          <strong className="text-[#3d3528]">precio justo</strong> para ese piso concreto.
          No es una tasación oficial, pero ayuda a saber si es buena oportunidad o si conviene negociar.
        </p>
      </div>

      {/* Botón añadir */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-[#7a9e6d] text-white rounded-2xl py-3 text-sm font-semibold mb-4 hover:bg-[#6b8e5e] transition-colors"
        >
          + Valorar un piso nuevo
        </button>
      )}

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
          <div className="text-base font-bold text-[#3d3528] mb-4">Datos del piso</div>

          <div className="space-y-3">
            {/* Nombre y URL */}
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

            {/* Barrio, precio, m² */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Barrio *</label>
                <select className={inputClass} value={form.barrio}
                  onChange={e => setForm({ ...form, barrio: e.target.value })}>
                  {BARRIOS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                </select>
              </div>
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

            {/* Planta, estado, energética, antigüedad */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Planta</label>
                <input className={inputClass} type="number" min="0" max="15"
                  value={form.planta} onChange={e => setForm({ ...form, planta: +e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Estado</label>
                <select className={inputClass} value={form.estado}
                  onChange={e => setForm({ ...form, estado: e.target.value })}>
                  <option value="nuevo">Nuevo / a estrenar</option>
                  <option value="reformado">Reformado</option>
                  <option value="bueno">Buen estado</option>
                  <option value="a reformar">Necesita reforma</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Certificado energético</label>
                <select className={inputClass} value={form.energetica}
                  onChange={e => setForm({ ...form, energetica: e.target.value })}>
                  {["A", "B", "C", "D", "E", "F", "G"].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Antigüedad edificio</label>
                <select className={inputClass} value={form.antiguedad}
                  onChange={e => setForm({ ...form, antiguedad: e.target.value })}>
                  <option value="pre1970">Anterior a 1970</option>
                  <option value="1970s-80s">Años 70-80</option>
                  <option value="1990s">Años 90</option>
                  <option value="2000s">Años 2000</option>
                  <option value="2010s+">2010 en adelante</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { key: "ascensor", label: "Ascensor" },
                { key: "exterior", label: "Exterior" },
                { key: "orientacionSur", label: "Orientación sur" },
                { key: "garaje", label: "Garaje incluido" },
                { key: "trastero", label: "Trastero" },
                { key: "terraza", label: "Terraza" },
              ].map(({ key, label }) => (
                <label key={key} className={checkClass}>
                  <input
                    type="checkbox"
                    checked={form[key as keyof PisoForm] as boolean}
                    onChange={e => setForm({ ...form, [key]: e.target.checked })}
                    className="rounded border-[#ddd5c8] text-[#7a9e6d] focus:ring-[#7a9e6d]"
                  />
                  {label}
                </label>
              ))}
            </div>

            {/* Notas */}
            <div>
              <label className={labelClass}>Notas (opcional)</label>
              <input className={inputClass} placeholder="Observaciones, impresiones..."
                value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} />
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-5">
            <button onClick={addPiso}
              className="flex-1 bg-[#7a9e6d] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#6b8e5e] transition-colors">
              Valorar piso
            </button>
            <button onClick={() => { setShowForm(false); setForm(FORM_VACIO); }}
              className="px-5 bg-[#f5f0e8] text-[#8a7e6d] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#e8e0d4] transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de pisos valorados */}
      {pisos.length === 0 && !showForm && (
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d4] text-center">
          <div className="text-3xl mb-3">🏠</div>
          <p className="text-sm text-[#8a7e6d]">
            Aún no has valorado ningún piso. Añade uno para ver si su precio es justo.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {pisos.map(p => {
          const v = valorarPiso(p);
          if (!v) return null;

          return (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm">
              {/* Cabecera */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-[#3d3528]">{p.nombre}</div>
                  <div className="text-xs text-[#8a7e6d]">{p.barrio} · {p.m2}m² · Planta {p.planta}</div>
                </div>
                <div className="flex items-center gap-2">
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-[#7a9e6d] hover:underline">
                      Ver anuncio ↗
                    </a>
                  )}
                  <button onClick={() => deletePiso(p.id)}
                    className="text-[#c0534f] text-xs hover:underline">
                    Eliminar
                  </button>
                </div>
              </div>

              {/* Veredicto */}
              <div className="rounded-xl p-3 mb-3 text-center"
                style={{ background: v.vColor + "12" }}>
                <div className="text-sm font-bold" style={{ color: v.vColor }}>
                  {v.veredicto}
                </div>
                <div className="text-xs mt-1" style={{ color: v.vColor }}>
                  {v.diferencia > 0 ? "+" : ""}{v.diferencia.toFixed(1)}% respecto al precio estimado
                </div>
              </div>

              {/* Comparativa 3 columnas */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#f5f0e8] rounded-xl p-3">
                  <div className="text-[10px] text-[#8a7e6d] uppercase tracking-wide">Precio pedido</div>
                  <div className="text-base font-bold text-[#3d3528]">{formatEur(p.precio)}</div>
                  <div className="text-[10px] text-[#8a7e6d]">{formatEur(v.precioM2Pedido)}/m²</div>
                </div>
                <div className="bg-[#f0f5ee] rounded-xl p-3">
                  <div className="text-[10px] text-[#7a9e6d] uppercase tracking-wide font-semibold">Estimación justa</div>
                  <div className="text-base font-bold text-[#5a8a5a]">{formatEur(v.precioEstimado)}</div>
                  <div className="text-[10px] text-[#7a9e6d]">{formatEur(v.precioM2Est)}/m²</div>
                </div>
                <div className="bg-[#f5f0e8] rounded-xl p-3">
                  <div className="text-[10px] text-[#8a7e6d] uppercase tracking-wide">Media barrio</div>
                  <div className="text-base font-bold text-[#8a7e6d]">{formatEur(v.baseBarrio * p.m2)}</div>
                  <div className="text-[10px] text-[#8a7e6d]">{formatEur(v.baseBarrio)}/m²</div>
                </div>
              </div>

              {/* Barra visual de diferencia */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-[#8a7e6d] mb-1">
                  <span>Chollo</span>
                  <span>Justo</span>
                  <span>Caro</span>
                </div>
                <div className="h-2 bg-[#f0ebe3] rounded-full relative overflow-hidden">
                  <div className="absolute h-full w-0.5 bg-[#c0935a] left-1/2 -translate-x-1/2 z-10" />
                  <div
                    className="absolute h-full rounded-full transition-all"
                    style={{
                      width: "8px",
                      left: `${Math.min(Math.max(50 + v.diferencia * 2, 5), 95)}%`,
                      transform: "translateX(-50%)",
                      background: v.vColor,
                    }}
                  />
                </div>
              </div>

              {/* Badges de características */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {[
                  p.ascensor && "Ascensor",
                  p.exterior ? "Exterior" : "Interior",
                  p.orientacionSur && "Sur",
                  p.garaje && "Garaje",
                  p.trastero && "Trastero",
                  p.terraza && "Terraza",
                  `Energía ${p.energetica}`,
                  p.estado,
                ].filter(Boolean).map((badge, i) => (
                  <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f5f0e8] text-[#8a7e6d]">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Notas */}
              {p.notas && (
                <div className="mt-2 text-xs text-[#8a7e6d] italic">📝 {p.notas}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
