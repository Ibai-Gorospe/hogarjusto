"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@/app/lib/useLocalStorage";
import { useAuth } from "@/app/lib/AuthContext";
import { supabase } from "@/app/lib/supabase";

// ============================================================
// Datos del checklist — actualizado febrero 2026
// ============================================================

const SECTIONS = [
  {
    title: "FASE 1 — Preparación financiera",
    items: [
      { id: "f1_1", text: "Calcular presupuesto máximo (precio + gastos + reforma si aplica)" },
      { id: "f1_2", text: "Revisar ahorros disponibles (necesitas al menos 20-25% del precio)" },
      { id: "f1_3", text: "Calcular tu ratio de endeudamiento (cuota máxima = 30-35% de ingresos netos)" },
      { id: "f1_4", text: "Consultar tu CIRBE online en bde.es (informe gratuito de deudas)" },
      { id: "f1_5", text: "Solicitar informe de vida laboral y últimas nóminas" },
      { id: "f1_6", text: "Comprobar si cumples requisitos de GazteAval (menores de 40, vivienda ≤340.000€)" },
      { id: "f1_7", text: "Pedir preaprobación hipotecaria en 2-3 bancos o un bróker hipotecario" },
    ],
  },
  {
    title: "FASE 2 — Búsqueda y selección",
    items: [
      { id: "f2_1", text: "Definir zona/barrio preferido (usa la pestaña Mapa de Precios)" },
      { id: "f2_2", text: "Establecer criterios mínimos (m², habitaciones, ascensor, garaje...)" },
      { id: "f2_3", text: "Crear alertas en Idealista, Fotocasa y Pisos.com" },
      { id: "f2_4", text: "Contactar con inmobiliarias locales (Perales, General Inmobiliaria, Etikalia...)" },
      { id: "f2_5", text: "Visitar pisos y tomar notas de cada uno" },
      { id: "f2_6", text: "Comprobar cargas en el Registro de la Propiedad (nota simple ~9€)" },
      { id: "f2_7", text: "Verificar ITE del edificio (obligatoria si >50 años)" },
      { id: "f2_8", text: "Consultar certificado energético" },
      { id: "f2_9", text: "Pedir certificado de deuda con la comunidad de propietarios" },
      { id: "f2_10", text: "Preguntar cuota mensual de comunidad y derramas pendientes o previstas" },
    ],
  },
  {
    title: "FASE 3 — Negociación y señal",
    items: [
      { id: "f3_1", text: "Comparar precio pedido vs precio real del barrio (pestaña Mapa de Precios)" },
      { id: "f3_2", text: "Hacer oferta (normalmente 5-15% por debajo del anunciado)" },
      { id: "f3_3", text: "Verificar que no haya inquilinos, ocupantes ni arrendamientos vigentes" },
      { id: "f3_4", text: "Firmar contrato de arras (normalmente 10% del precio, descontable)" },
      { id: "f3_5", text: "Pactar fecha de entrega de llaves y penalización por incumplimiento" },
      { id: "f3_6", text: "Fijar plazo para escritura (suele ser 1-3 meses)" },
    ],
  },
  {
    title: "FASE 4 — Hipoteca",
    items: [
      { id: "f4_1", text: "Comparar ofertas de al menos 3 entidades (fijo vs variable vs mixto)" },
      { id: "f4_2", text: "Solicitar la FEIN y la FIAE (documentos oficiales de la oferta vinculante)" },
      { id: "f4_3", text: "Contratar tasación oficial (300-500€, la pagas tú)" },
      { id: "f4_4", text: "Revisar vinculaciones (seguros, nómina, tarjetas) y negociar" },
      { id: "f4_5", text: "Visita obligatoria al notario 10 días antes de la firma (test de transparencia, Ley 5/2019)" },
      { id: "f4_6", text: "Si usas GazteAval: confirmar tramitación con entidad adherida (Kutxabank, CaixaBank, Laboral Kutxa, Abanca)" },
      { id: "f4_7", text: "Confirmar fecha de firma y que toda la documentación está lista" },
    ],
  },
  {
    title: "FASE 5 — Escritura y entrega",
    items: [
      { id: "f5_1", text: "Revisar el estado real de la vivienda el día antes de firmar" },
      { id: "f5_2", text: "Firma de escritura pública ante notario" },
      { id: "f5_3", text: "Pago del ITP en Hacienda Foral de Álava (plazo: 30 días hábiles)" },
      { id: "f5_4", text: "Inscripción en el Registro de la Propiedad" },
      { id: "f5_5", text: "Cambio de titularidad en suministros (agua, luz, gas)" },
      { id: "f5_6", text: "Empadronamiento en el nuevo domicilio" },
      { id: "f5_7", text: "Comunicar cambio de domicilio a Hacienda Foral, banco, trabajo, etc." },
      { id: "f5_8", text: "Contratar seguro de hogar (obligatorio con hipoteca)" },
    ],
  },
  {
    title: "FASE 6 — Optimización fiscal",
    items: [
      { id: "f6_1", text: "Aplicar deducción IRPF foral por vivienda habitual (18%, o 23% si <36 años). Requisito desde 2026: base liquidable ≤68.000€" },
      { id: "f6_2", text: "Guardar TODOS los recibos y facturas (notaría, registro, reforma...)" },
      { id: "f6_3", text: "Si vendes otra vivienda habitual: reinvertir para eximir ganancia patrimonial (desde 2026 necesitas causa justificada para el cambio)" },
      { id: "f6_4", text: "Cuenta vivienda si aún estás ahorrando (deducción del 18%, plazo ampliado a 10 años)" },
      { id: "f6_5", text: "Valorar donaciones familiares para la entrada (exentas en ISD hasta 30.000€ si <36 años, familiares hasta 3er grado)" },
    ],
  },
];

const TOTAL_ITEMS = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

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
// Componente principal
// ============================================================

export default function Checklist() {
  const { user } = useAuth();

  // localStorage para usuarios no logueados
  const [localChecks, setLocalChecks] = useLocalStorage<Record<string, boolean>>("checks", {});

  // Supabase para usuarios logueados
  const [cloudChecks, setCloudChecks] = useState<Record<string, boolean>>({});
  const [loadingCloud, setLoadingCloud] = useState(false);

  // Estado expandido/colapsado por fase
  const [expanded, setExpanded] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    SECTIONS.forEach((_, i) => { init[i] = true; });
    return init;
  });
  const [hasInitialized, setHasInitialized] = useState(false);

  // Decidir qué checks usar
  const checks = user ? cloudChecks : localChecks;

  // Cargar checks desde Supabase
  const loadCloudChecks = useCallback(async () => {
    if (!user) return;
    setLoadingCloud(true);
    const { data, error } = await supabase
      .from("checklist_progress")
      .select("check_id");

    if (!error && data) {
      const map: Record<string, boolean> = {};
      data.forEach(row => { map[row.check_id] = true; });
      setCloudChecks(map);
    }
    setLoadingCloud(false);
  }, [user]);

  useEffect(() => {
    loadCloudChecks();
  }, [loadCloudChecks]);

  // Auto-colapsar fases completadas tras la carga inicial
  useEffect(() => {
    if (hasInitialized) return;
    if (loadingCloud) return;
    // Para usuarios sin login, checks está disponible inmediatamente
    // Para usuarios con login, esperamos a que termine la carga
    SECTIONS.forEach((section, i) => {
      const complete = section.items.every(item => checks[item.id]);
      if (complete) {
        setExpanded(prev => ({ ...prev, [i]: false }));
      }
    });
    setHasInitialized(true);
  }, [checks, loadingCloud, hasInitialized]);

  // Toggle expandir/colapsar fase
  const togglePhase = (idx: number) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Toggle check
  const toggleCheck = async (checkId: string, phaseIdx: number) => {
    const wasChecked = checks[checkId];

    if (user) {
      if (wasChecked) {
        await supabase.from("checklist_progress").delete().eq("check_id", checkId);
      } else {
        await supabase.from("checklist_progress").insert({ user_id: user.id, check_id: checkId });
      }
      setCloudChecks(prev => {
        const next = { ...prev };
        if (next[checkId]) { delete next[checkId]; } else { next[checkId] = true; }
        return next;
      });
    } else {
      setLocalChecks({ ...localChecks, [checkId]: !localChecks[checkId] });
    }

    // Auto-colapsar si la fase se acaba de completar
    if (!wasChecked) {
      const phase = SECTIONS[phaseIdx];
      const othersChecked = phase.items.every(item =>
        item.id === checkId || checks[item.id]
      );
      if (othersChecked) {
        setTimeout(() => {
          setExpanded(prev => ({ ...prev, [phaseIdx]: false }));
        }, 800);
      }
    }
  };

  const totalChecked = Object.values(checks).filter(Boolean).length;
  const totalPct = Math.round((totalChecked / TOTAL_ITEMS) * 100);

  return (
    <div>
      <p className="text-sm text-[#5a5040] mb-4 leading-relaxed">
        Marca cada paso conforme lo vayas completando. Te servirá de guía para no dejarte nada en el proceso de compra.
      </p>

      {user && (
        <div className="text-center text-[10px] text-[#7a9e6d] mb-3">
          Tu progreso se guarda en la nube
        </div>
      )}

      {user && loadingCloud && (
        <div className="text-center text-sm text-[#8a7e6d] py-4">Cargando progreso...</div>
      )}

      {/* Progreso global arriba */}
      <div className="bg-gradient-to-br from-[#f0f5ee] to-[#e8f0e4] rounded-2xl p-4 border border-[#d5e5cf] mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-bold text-[#3d3528]">Progreso total</div>
          <div className="text-sm font-bold text-[#7a9e6d]">{totalChecked} / {TOTAL_ITEMS}</div>
        </div>
        <div className="bg-white/50 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${totalPct}%`,
              background: totalPct === 100 ? "#5a8a5a" : "linear-gradient(90deg, #6a8a5a, #8aaa6d)",
            }}
          />
        </div>
        <div className="text-xs text-[#8a7e6d] mt-1.5 text-center">
          {totalPct === 100
            ? "🎉 ¡Enhorabuena! ¡Ya tienes tu casa!"
            : `${totalPct}% completado`
          }
        </div>
      </div>

      {/* Secciones */}
      <div className="space-y-3">
        {SECTIONS.map((section, si) => {
          const sectionChecked = section.items.filter(i => checks[i.id]).length;
          const sectionTotal = section.items.length;
          const sectionPct = Math.round((sectionChecked / sectionTotal) * 100);
          const isComplete = sectionPct === 100;
          const isExpanded = expanded[si] ?? true;

          return (
            <div
              key={si}
              className={`bg-white rounded-2xl border shadow-sm transition-colors ${
                isComplete ? "border-[#7a9e6d]/30" : "border-[#e8e0d4]"
              }`}
            >
              {/* Cabecera clicable */}
              <button
                onClick={() => togglePhase(si)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                {/* Icono de estado */}
                {isComplete ? (
                  <div className="w-7 h-7 min-w-[28px] rounded-full bg-[#7a9e6d] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-7 h-7 min-w-[28px] rounded-full border-2 border-[#ddd5c8] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#8a7e6d]">{si + 1}</span>
                  </div>
                )}

                {/* Título + progreso */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold ${isComplete ? "text-[#7a9e6d]" : "text-[#3d3528]"}`}>
                    {section.title}
                  </div>
                  {/* Barra de progreso de la fase */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 bg-[#f0ebe3] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${sectionPct}%`,
                          background: isComplete ? "#7a9e6d" : "linear-gradient(90deg, #6a8a5a, #8aaa6d)",
                        }}
                      />
                    </div>
                    <span className="text-[11px] text-[#8a7e6d] font-medium shrink-0">
                      {sectionChecked}/{sectionTotal}
                    </span>
                  </div>
                </div>

                <Chevron expanded={isExpanded} />
              </button>

              {/* Items (colapsable) */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0">
                  <div className="border-t border-[#e8e0d4] pt-2">
                    {section.items.map(item => {
                      const isChecked = !!checks[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleCheck(item.id, si)}
                          className="flex items-start gap-3 py-2.5 cursor-pointer border-b border-[#f5f0e8] last:border-b-0 group"
                        >
                          {/* Checkbox */}
                          <div className={`w-6 h-6 min-w-[24px] rounded-lg mt-0.5 flex items-center justify-center transition-all duration-200 ${
                            isChecked
                              ? "bg-[#7a9e6d] shadow-sm"
                              : "border-2 border-[#c8c0b0] group-hover:border-[#7a9e6d]"
                          }`}>
                            {isChecked && (
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          {/* Texto */}
                          <span className={`text-sm leading-relaxed transition-colors duration-200 ${
                            isChecked ? "text-[#8a7e6d] line-through decoration-[#c8c0b0]" : "text-[#3d3528]"
                          }`}>
                            {item.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
