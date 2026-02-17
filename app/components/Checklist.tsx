"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@/app/lib/useLocalStorage";
import { useAuth } from "@/app/lib/AuthContext";
import { supabase } from "@/app/lib/supabase";

// Datos del checklist con todas las fases
const SECTIONS = [
  { title: "📋 FASE 1 — Preparación financiera", items: [
    { id: "f1_1", text: "Calcular presupuesto máximo (precio + gastos + reforma si aplica)" },
    { id: "f1_2", text: "Revisar ahorros disponibles (necesitas al menos 20-25% del precio)" },
    { id: "f1_3", text: "Comprobar si cumples requisitos del aval GazteAval (menores de 40, primera vivienda, ≤340.000€)" },
    { id: "f1_4", text: "Pedir preaprobación hipotecaria en 2-3 bancos (Kutxabank, CaixaBank, Laboral Kutxa...)" },
    { id: "f1_5", text: "Solicitar informe de vida laboral y últimas nóminas" },
    { id: "f1_6", text: "Consultar si tienes deudas en CIRBE (Central de Información de Riesgos del Banco de España)" },
  ]},
  { title: "🔍 FASE 2 — Búsqueda y selección", items: [
    { id: "f2_1", text: "Definir zona/barrio preferido (usa la pestaña Mapa de Precios)" },
    { id: "f2_2", text: "Establecer criterios mínimos (m², habitaciones, ascensor, garaje...)" },
    { id: "f2_3", text: "Crear alertas en Idealista, Fotocasa y Pisos.com" },
    { id: "f2_4", text: "Contactar con inmobiliarias locales (Perales, General Inmobiliaria, Etikalia...)" },
    { id: "f2_5", text: "Visitar pisos y registrarlos en el Comparador" },
    { id: "f2_6", text: "Comprobar cargas en el Registro de la Propiedad (nota simple)" },
    { id: "f2_7", text: "Verificar ITE del edificio (Inspección Técnica de Edificios)" },
    { id: "f2_8", text: "Consultar certificado energético" },
    { id: "f2_9", text: "Preguntar por derramas pendientes o previstas" },
  ]},
  { title: "🤝 FASE 3 — Negociación y señal", items: [
    { id: "f3_1", text: "Comparar precio pedido vs precio real del barrio (pestaña Mapa)" },
    { id: "f3_2", text: "Hacer oferta (normalmente 5-15% por debajo del anunciado)" },
    { id: "f3_3", text: "Firmar contrato de arras (normalmente 10% del precio, descontable)" },
    { id: "f3_4", text: "Fijar plazo para escritura (suele ser 1-3 meses)" },
  ]},
  { title: "🏦 FASE 4 — Hipoteca", items: [
    { id: "f4_1", text: "Comparar ofertas de al menos 3 entidades (tipo fijo vs variable vs mixto)" },
    { id: "f4_2", text: "Solicitar la FEIN y la FiAE (documentos oficiales de la oferta vinculante)" },
    { id: "f4_3", text: "Contratar tasación oficial (300-500€, la paga el comprador)" },
    { id: "f4_4", text: "Revisar vinculaciones (seguros, nómina, tarjetas) y negociar" },
    { id: "f4_5", text: "Visita obligatoria al notario 10 días antes de la firma (ley hipotecaria)" },
    { id: "f4_6", text: "Si usas GazteAval: tramitar con la entidad adherida (Kutxabank, CaixaBank, Laboral Kutxa, Abanca)" },
  ]},
  { title: "📝 FASE 5 — Escritura y entrega", items: [
    { id: "f5_1", text: "Firma de escritura pública ante notario" },
    { id: "f5_2", text: "Pago del ITP en Hacienda Foral de Álava (30 días hábiles)" },
    { id: "f5_3", text: "Inscripción en el Registro de la Propiedad" },
    { id: "f5_4", text: "Cambio de titularidad en suministros (agua, luz, gas)" },
    { id: "f5_5", text: "Empadronamiento en el nuevo domicilio" },
    { id: "f5_6", text: "Comunicar cambio de domicilio a Hacienda Foral, banco, trabajo, etc." },
    { id: "f5_7", text: "Contratar seguro de hogar (obligatorio con hipoteca)" },
  ]},
  { title: "💰 FASE 6 — Optimización fiscal", items: [
    { id: "f6_1", text: "Aplicar deducción por adquisición de vivienda habitual en IRPF foral (18%, 23% si <36 años)" },
    { id: "f6_2", text: "Guardar TODOS los recibos y facturas (notaría, registro, reforma...)" },
    { id: "f6_3", text: "Si vendes otra vivienda habitual: reinvertir para eximir ganancia patrimonial" },
    { id: "f6_4", text: "Considerar cuenta vivienda si aún estás ahorrando (deducción del 18% con límite, plazo 6 años)" },
  ]},
];

const TOTAL_ITEMS = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

export default function Checklist() {
  const { user } = useAuth();

  // localStorage para usuarios no logueados
  const [localChecks, setLocalChecks] = useLocalStorage<Record<string, boolean>>("checks", {});

  // Supabase para usuarios logueados
  const [cloudChecks, setCloudChecks] = useState<Record<string, boolean>>({});
  const [loadingCloud, setLoadingCloud] = useState(false);

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

  // Toggle check
  const toggleCheck = async (checkId: string) => {
    if (user) {
      if (cloudChecks[checkId]) {
        // Desmarcar: borrar de Supabase
        await supabase.from("checklist_progress")
          .delete()
          .eq("check_id", checkId);
      } else {
        // Marcar: insertar en Supabase
        await supabase.from("checklist_progress")
          .insert({ user_id: user.id, check_id: checkId });
      }
      // Actualizar estado local inmediatamente (sin esperar recarga)
      setCloudChecks(prev => {
        const next = { ...prev };
        if (next[checkId]) { delete next[checkId]; } else { next[checkId] = true; }
        return next;
      });
    } else {
      setLocalChecks({ ...localChecks, [checkId]: !localChecks[checkId] });
    }
  };

  const totalChecked = Object.values(checks).filter(Boolean).length;
  const totalPct = Math.round((totalChecked / TOTAL_ITEMS) * 100);

  return (
    <div>
      <p className="text-sm text-[#8a7e6d] mb-4">
        Marca cada paso conforme lo vayas completando. Te servirá de guía para no dejarte nada.
      </p>

      {/* Indicador de almacenamiento */}
      {user && (
        <div className="text-center text-[10px] text-[#7a9e6d] mb-3">
          ☁️ Tu progreso se guarda en la nube
        </div>
      )}

      {/* Loading */}
      {user && loadingCloud && (
        <div className="text-center text-sm text-[#8a7e6d] py-4">Cargando progreso...</div>
      )}

      {/* Secciones */}
      {SECTIONS.map((section, si) => {
        const sectionChecked = section.items.filter(i => checks[i.id]).length;
        const sectionTotal = section.items.length;
        const sectionPct = Math.round((sectionChecked / sectionTotal) * 100);

        return (
          <div key={si} className="bg-white rounded-2xl p-4 border border-[#e8e0d4] mb-3">
            {/* Cabecera sección */}
            <div className="flex justify-between items-center mb-2.5">
              <div className={`text-sm font-bold ${sectionPct === 100 ? "text-[#5a8a5a]" : "text-[#7a9e6d]"}`}>
                {section.title}
              </div>
              <span className={`text-xs ${sectionPct === 100 ? "text-[#5a8a5a]" : "text-[#8a7e6d]"}`}>
                {sectionChecked}/{sectionTotal}
              </span>
            </div>

            {/* Barra progreso */}
            <div className="bg-[#f5f0e8] rounded h-1 mb-3 overflow-hidden">
              <div
                className="h-full rounded transition-all duration-300"
                style={{
                  width: `${sectionPct}%`,
                  background: sectionPct === 100 ? "#5a8a5a" : "linear-gradient(90deg, #6a8a5a, #8aaa6d)"
                }}
              />
            </div>

            {/* Items */}
            {section.items.map(item => (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-start gap-2.5 py-1.5 cursor-pointer border-b border-[#e8e0d4] last:border-b-0 text-sm"
              >
                <div className={`w-5 h-5 min-w-[20px] rounded-md mt-0.5 flex items-center justify-center transition-all ${
                  checks[item.id]
                    ? "bg-gradient-to-br from-[#6a8a5a] to-[#8aaa6d]"
                    : "border-2 border-[#c8c0b0]"
                }`}>
                  {checks[item.id] && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <span className={`leading-relaxed ${
                  checks[item.id] ? "text-[#8a7e6d] line-through" : "text-[#3d3528]"
                }`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        );
      })}

      {/* Progreso global */}
      <div className="bg-gradient-to-br from-[#f8f4ed] to-[#faf7f2] rounded-2xl p-5 border border-[#5a7a5a22] text-center">
        <div className="text-4xl font-bold text-[#7a9e6d]">{totalPct}%</div>
        <div className="text-sm text-[#8a7e6d] mt-1">
          Progreso total · {totalChecked} de {TOTAL_ITEMS} pasos completados
        </div>
        {totalPct === 100 && (
          <div className="text-base text-[#5a8a5a] font-bold mt-2">
            🎉 ¡Enhorabuena! ¡Ya tienes tu casa!
          </div>
        )}
      </div>
    </div>
  );
}
