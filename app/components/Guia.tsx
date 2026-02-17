"use client";

/**
 * Guía — Guía práctica de compra de vivienda en Vitoria-Gasteiz
 * Contenido verificado a febrero 2026.
 */

// ============================================================
// Navegación sticky con scroll suave
// ============================================================

const NAV_ITEMS = [
  { id: "donde-buscar", label: "Dónde buscar" },
  { id: "vpo", label: "VPO" },
  { id: "que-mirar", label: "Qué mirar" },
  { id: "errores", label: "Errores típicos" },
  { id: "negociacion", label: "Negociación" },
  { id: "documentacion", label: "Documentación" },
  { id: "glosario", label: "Glosario" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================
// Link externo reutilizable
// ============================================================

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#7a9e6d] hover:underline font-medium">
      {children} ↗
    </a>
  );
}

// ============================================================
// Componente principal
// ============================================================

export default function Guia() {
  return (
    <div className="max-w-[800px] mx-auto">

      {/* ====== NAV STICKY ====== */}
      <div className="sticky top-0 z-10 bg-[#faf8f4]/95 backdrop-blur-sm pb-3 pt-1 -mx-1 px-1">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#e8e0d4] text-[#3d3528] hover:bg-[#7a9e6d] hover:text-white hover:border-[#7a9e6d] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================================
          SECCIÓN 1: DÓNDE BUSCAR VIVIENDA
          ================================================================ */}
      <div id="donde-buscar" className="scroll-mt-14 bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-3">🔍 Dónde buscar vivienda</div>

        {/* Portales online */}
        <div className="text-xs font-semibold text-[#8a7e6d] uppercase tracking-wider mb-2">Portales online</div>
        <div className="space-y-0 divide-y divide-[#f0ebe3] mb-4">
          {[
            { name: "Idealista", desc: "El portal más grande de España. Filtros avanzados, alertas por email, fotos y planos. Tiene historial de precios de cada anuncio (cuánto tiempo lleva publicado y si ha bajado el precio). Útil para negociar.", url: "https://www.idealista.com", domain: "idealista.com" },
            { name: "Fotocasa", desc: "Segundo portal en volumen. A veces tiene anuncios que no están en Idealista. Buen comparador de zonas.", url: "https://www.fotocasa.es", domain: "fotocasa.es" },
            { name: "Pisos.com", desc: "Tercer gran portal. Menos tráfico pero anuncios exclusivos de algunas agencias.", url: "https://www.pisos.com", domain: "pisos.com" },
            { name: "Habitaclia", desc: "Popular en Cataluña y País Vasco. Merece un vistazo, especialmente para obra nueva.", url: "https://www.habitaclia.com", domain: "habitaclia.com" },
          ].map((s, i) => (
            <div key={i} className="py-2.5">
              <div className="flex justify-between items-baseline gap-2">
                <span className="font-semibold text-sm text-[#3d3528]">{s.name}</span>
                <ExtLink href={s.url}>{s.domain}</ExtLink>
              </div>
              <p className="text-xs text-[#8a7e6d] mt-0.5 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Inmobiliarias locales */}
        <div className="text-xs font-semibold text-[#8a7e6d] uppercase tracking-wider mb-2">Inmobiliarias locales de referencia en Vitoria</div>
        <div className="space-y-0 divide-y divide-[#f0ebe3] mb-4">
          {[
            { name: "General Inmobiliaria", desc: "La inmobiliaria de referencia en Vitoria. Publica anualmente un informe de precios por zonas muy fiable. Es nuestra fuente principal de datos.", url: "https://www.generalinmobiliaria.com", domain: "generalinmobiliaria.com" },
            { name: "Perales Digital", desc: "Inmobiliaria con gran presencia digital. También publica datos de mercado por zonas. Fuente complementaria de precios.", url: "https://www.peralesdigital.com", domain: "peralesdigital.com" },
            { name: "Etikalia", desc: "Inmobiliaria innovadora con fuerte presencia en Euskadi. Buenos análisis de mercado.", url: "https://www.etikalia.es", domain: "etikalia.es" },
          ].map((s, i) => (
            <div key={i} className="py-2.5">
              <div className="flex justify-between items-baseline gap-2">
                <span className="font-semibold text-sm text-[#3d3528]">{s.name}</span>
                <ExtLink href={s.url}>{s.domain}</ExtLink>
              </div>
              <p className="text-xs text-[#8a7e6d] mt-0.5 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Otros canales */}
        <div className="text-xs font-semibold text-[#8a7e6d] uppercase tracking-wider mb-2">Otros canales</div>
        <div className="space-y-0 divide-y divide-[#f0ebe3]">
          <div className="py-2.5">
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-semibold text-sm text-[#3d3528]">Etxebide</span>
              <ExtLink href="https://www.etxebide.euskadi.eus">etxebide.euskadi.eus</ExtLink>
            </div>
            <p className="text-xs text-[#8a7e6d] mt-0.5 leading-relaxed">
              Registro de demandantes de vivienda del Gobierno Vasco. Imprescindible para VPO. Inscríbete cuanto antes, incluso si aún no vas a comprar. La antigüedad en el registro puede ser un factor de desempate.
            </p>
          </div>
          <div className="py-2.5">
            <span className="font-semibold text-sm text-[#3d3528]">Milanuncios / Wallapop</span>
            <p className="text-xs text-[#8a7e6d] mt-0.5 leading-relaxed">
              Particulares que venden sin intermediario. Más margen de negociación pero menos garantías. Cuidado con posibles fraudes: nunca pagues señal sin verificar la propiedad en el Registro.
            </p>
          </div>
          <div className="py-2.5">
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-semibold text-sm text-[#3d3528]">Subastas judiciales (BOE)</span>
              <ExtLink href="https://subastas.boe.es">subastas.boe.es</ExtLink>
            </div>
            <p className="text-xs text-[#8a7e6d] mt-0.5 leading-relaxed">
              Para compradores más experimentados. Precios muy por debajo de mercado pero requieren conocimiento legal y liquidez. Riesgo de ocupación.
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================
          SECCIÓN 2: VPO
          ================================================================ */}
      <div id="vpo" className="scroll-mt-14 bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🏛️ Vivienda de Protección Oficial (VPO)</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          En Euskadi las VPO tienen precios máximos regulados por el Gobierno Vasco, muy por debajo del mercado libre. Para optar a una:
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Requisitos principales</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p>Estar inscrito en <strong className="text-[#3d3528]">Etxebide</strong> (Registro de demandantes de vivienda).</p>
            <p>No ser titular de otra vivienda.</p>
            <p>Ingresos anuales ponderados por debajo de los baremos (varían según régimen): para compra, entre 9.000€ y 59.568€ según tipo de vivienda.</p>
            <p>Empadronamiento en Euskadi con antigüedad mínima (1-3 años según tipo).</p>
            <p>La adjudicación es por <strong className="text-[#3d3528]">sorteo</strong> entre los inscritos que cumplen requisitos.</p>
          </div>
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#5a8a5a] mb-2">Zonas con VPO en Vitoria</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Las principales promociones se concentran en <strong className="text-[#3d3528]">Salburua, Zabalgana, Lakua</strong> y la nueva zona de{" "}
            <strong className="text-[#3d3528]">Aretxabaleta (Goikolarra)</strong>. Hay VPO tanto de compra como de alquiler.
            El precio de venta está regulado: en torno a <strong className="text-[#3d3528]">1.400-1.800€/m²</strong> según el régimen, frente a los 2.500-3.500€ del mercado libre.
          </p>
        </div>

        {/* Promociones activas */}
        <div className="bg-white rounded-xl p-4 mb-3 border border-[#7a9e6d]/20">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Promociones activas en 2026</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p><strong className="text-[#3d3528]">42 viviendas tasadas en Aldaia</strong> (Vitoria-Gasteiz) — inscripción cerrada feb. 2026.</p>
            <p><strong className="text-[#3d3528]">40 viviendas tasadas en Borinbizkarra</strong> (Vitoria-Gasteiz) — inscripción cerrada feb. 2026.</p>
            <p>Nuevas promociones de VPO en <strong className="text-[#3d3528]">Aretxabaleta/Goikolarra</strong> — en construcción, entrega prevista 2026-2027.</p>
          </div>
          <p className="text-xs text-[#8a7e6d] mt-2">
            Consulta las promociones activas en <ExtLink href="https://www.etxebide.euskadi.eus">etxebide.euskadi.eus</ExtLink>
          </p>
        </div>

        {/* Tipos de vivienda protegida */}
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="bg-[#7a9e6d] text-white">
                <th className="text-left px-3 py-2 font-semibold rounded-tl-lg">Tipo</th>
                <th className="text-left px-3 py-2 font-semibold">Precio orientativo/m²</th>
                <th className="text-left px-3 py-2 font-semibold rounded-tr-lg">Ingresos máx.</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["VPO Régimen General", "~1.400-1.600€/m²", "~39.000€ ponderados"],
                ["VPO Régimen Tasado", "~1.600-1.800€/m²", "~50.000€ ponderados"],
                ["VPO Alquiler", "Renta ~4-7€/m²/mes", "~39.000€ ponderados"],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#faf8f4]"}>
                  <td className="px-3 py-2 font-medium text-[#3d3528]">{row[0]}</td>
                  <td className="px-3 py-2 text-[#5a5040]">{row[1]}</td>
                  <td className="px-3 py-2 text-[#5a5040]">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#8a7e6d]">Los baremos exactos se actualizan periódicamente. Consulta en Etxebide.</p>

        <div className="bg-[#f0f5ee] rounded-xl p-3 mt-3">
          <p className="text-sm text-[#5a7a5a] leading-relaxed">
            <strong>💡 Consejo:</strong> Inscríbete en Etxebide <strong>cuanto antes</strong>, incluso si aún no vas a comprar.
            La antigüedad en el registro puede ser un factor de desempate en los sorteos, y solo pueden participar las personas ya inscritas a fecha de inicio del plazo de cada promoción. No cuesta nada y no te compromete a nada.
          </p>
        </div>
      </div>

      {/* ================================================================
          SECCIÓN 3: QUÉ MIRAR
          ================================================================ */}
      <div id="que-mirar" className="scroll-mt-14 bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-3">👁️ En qué fijarse al visitar un piso</div>

        <div className="divide-y divide-[#f0ebe3]">
          {[
            { icon: "💧", title: "Humedades y estado del edificio", desc: "Mira techos, esquinas y bajo las ventanas. Pregunta por la ITE (Inspección Técnica de Edificios, obligatoria si el edificio tiene más de 50 años) y si hay derramas previstas. Si el edificio no ha pasado la ITE, puede ser un gasto importante a futuro." },
            { icon: "☀️", title: "Orientación y luz natural", desc: "Sur y suroeste son las mejores en Vitoria por el clima frío. La diferencia en calefacción entre un piso sur y uno norte puede ser de 50-100€/mes en invierno. Visita el piso a distintas horas si puedes: una por la mañana y otra por la tarde." },
            { icon: "🔊", title: "Ruido", desc: "Visita entre semana en hora punta. Comprueba el aislamiento: ventanas dobles, vecinos, bares cercanos. Las calles con tráfico pesado (Francia, Portal de Foronda, Los Herrán) son más ruidosas. Pregunta a los vecinos si puedes." },
            { icon: "🏢", title: "Comunidad de vecinos", desc: "Pide las actas de las últimas 3 juntas (tienes derecho). Revisa si hay derramas aprobadas o previstas, conflictos, obras pendientes. Pregunta la cuota mensual (en Vitoria suele oscilar entre 40-120€/mes). Pregunta también si hay morosidad en la comunidad." },
            { icon: "📐", title: "Metros reales vs anunciados", desc: "Los portales muestran m² construidos (incluyen muros). Los m² útiles son un 15-20% menos. Pide el plano catastral o la escritura para verificar. Un piso anunciado como \"90m²\" puede tener solo 72-75m² útiles." },
            { icon: "⚡", title: "Instalaciones", desc: "Antigüedad de la instalación eléctrica, fontanería, caldera. Una caldera nueva son 2.000-3.500€. Tubería de plomo = reforma obligada (habitual en edificios anteriores a 1980). Pregunta si la instalación eléctrica tiene boletín actualizado (necesario para cambios de titularidad con Iberdrola)." },
            { icon: "🏷️", title: "Certificado energético", desc: "De la A a la G. Un piso con G puede costar 100-200€/mes más en suministros que uno con B. Afecta mucho en Vitoria por el clima. Además, el certificado energético influye en el valor de reventa y en las ayudas disponibles (Avales ICO cubren hasta 25% si certificación D o superior)." },
            { icon: "🚗", title: "Garaje y trastero", desc: "En Vitoria el garaje es casi imprescindible por el clima (lluvia, nieve, heladas). Si no lo incluye, calcula 15.000-30.000€ extra por una plaza. Comprueba si la plaza está incluida en la escritura o es un anejo independiente (afecta a impuestos y financiación)." },
            { icon: "🔧", title: "Reforma necesaria", desc: "Si el piso necesita reforma, pide presupuestos ANTES de comprar. Reforma integral (baño + cocina + suelos + pintura): 800-1.200€/m² → un piso de 80m² = 64.000-96.000€. Solo baño: 4.000-8.000€. Solo cocina: 5.000-12.000€. Estos costes son deducibles en IRPF si forman parte de la adquisición de vivienda habitual." },
          ].map((item, i) => (
            <div key={i} className="py-3">
              <div className="font-semibold text-sm text-[#3d3528]">{item.icon} {item.title}</div>
              <p className="text-sm text-[#8a7e6d] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          SECCIÓN 4: ERRORES TÍPICOS
          ================================================================ */}
      <div id="errores" className="scroll-mt-14 bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#c0534f] mb-3">⚠️ Errores típicos al comprar</div>

        <div className="divide-y divide-[#f0ebe3]">
          {[
            { error: "No comparar hipotecas", tip: "Pide oferta en al menos 3-4 bancos. La diferencia puede ser de 20.000-40.000€ en intereses totales. Usa un bróker hipotecario si no quieres hacerlo tú. En Vitoria: Kutxabank, CaixaBank, Laboral Kutxa y BBVA son las más activas." },
            { error: "Olvidar los gastos de compra", tip: "Al precio del piso súmale un 8-12% en gastos. En Álava es menos que en otras CCAA (ITP 2,5-4% vs 6-10%), pero sigue siendo mucho. Usa la pestaña \"Costes Compra\" para calcularlo exacto." },
            { error: "No pedir la nota simple", tip: "Es el documento que confirma quién es el propietario real y si el piso tiene cargas (hipotecas, embargos). Cuesta 9,02€ + IVA online en registradores.org. NUNCA compres sin verla. Plazo de entrega: menos de 2 horas online." },
            { error: "Firmar arras sin pensar", tip: "Las arras penitenciales te comprometen: si te echas atrás pierdes el dinero (normalmente 10% del precio). Asegúrate de tener la hipoteca preaprobada antes de firmar. Incluye siempre una cláusula de contingencia hipotecaria (si el banco no te da la hipoteca, recuperas las arras)." },
            { error: "No negociar el precio", tip: "El precio publicado casi nunca es el precio final. En segunda mano se puede negociar un 5-15%. Investiga cuánto lleva publicado el anuncio (en Idealista puedes ver el historial). Si lleva más de 3 meses, hay más margen." },
            { error: "Calcular solo la cuota de la hipoteca", tip: "Una cuota de 700€ con comunidad de 80€, seguro de 40€, IBI de 50€ y suministros de 120€ son en realidad 990€/mes. Suma todo antes de decidir." },
            { error: "No revisar el IBI y la plusvalía", tip: "El IBI varía mucho entre barrios (300-900€/año en Vitoria). La plusvalía municipal la paga el vendedor, pero asegúrate de que quede por escrito." },
            { error: "Enamorarse del primer piso", tip: "Visita al menos 8-10 pisos antes de decidir. Así calibras lo que ofrece el mercado y negocias mejor." },
            { error: "No comprobar la orientación en invierno", tip: "Vitoria tiene inviernos largos y fríos. Un piso que parece luminoso en junio puede ser oscuro y helador en diciembre. Si puedes, visita en un día nublado de invierno." },
            { error: "Ignorar las ayudas disponibles", tip: "Muchos compradores jóvenes no saben que existen GazteAval, los avales ICO, la deducción IRPF foral del 23%, o Emantzipa. Revisa la pestaña \"Ayudas\" antes de comprar: puedes ahorrarte decenas de miles de euros." },
            { error: "No calcular la reforma", tip: "Un piso \"a reformar\" a 180.000€ puede costar realmente 250.000€ tras la reforma. Pide presupuestos de obra ANTES de comprar, no después." },
          ].map((item, i) => (
            <div key={i} className="py-3">
              <div className="font-semibold text-sm text-[#c0534f]">✗ {item.error}</div>
              <p className="text-sm text-[#5a7a5a] mt-1 leading-relaxed">→ {item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          SECCIÓN 5: NEGOCIACIÓN
          ================================================================ */}
      <div id="negociacion" className="scroll-mt-14 bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-3">🤝 Claves para negociar</div>

        <div className="divide-y divide-[#f0ebe3]">
          {[
            { key: "Investiga el tiempo en mercado", desc: "Si lleva más de 3 meses publicado, el vendedor tiene más prisa. Pregunta en la inmobiliaria o mira el historial en Idealista (se puede ver cuándo se publicó por primera vez y si ha bajado el precio). Un piso que ha bajado precio ya una vez es más negociable." },
            { key: "Ten la hipoteca preaprobada", desc: "Un comprador con financiación confirmada tiene mucho más poder de negociación. El vendedor prefiere certeza. Ve al banco ANTES de buscar piso." },
            { key: "Usa defectos como argumento", desc: "Si necesita reforma, pide presupuestos reales. Un baño = 4.000-8.000€. Una cocina = 5.000-12.000€. Presenta los números al vendedor con presupuestos reales de reforma." },
            { key: "Haz una oferta razonada", desc: "No ofrezcas un 30% menos. Un 5-10% por debajo con argumentos sólidos (precio de zona en HogarJusto, tiempo en mercado, reformas necesarias, comparables vendidos) es más efectivo. Lleva datos: \"según los datos de General Inmobiliaria, esta zona está a X€/m², su piso serían Y€\"." },
            { key: "No muestres urgencia", desc: "Si el vendedor sabe que tienes prisa, pierdes poder de negociación. Mantén un tono tranquilo. Siempre di que estás viendo más opciones." },
            { key: "Conoce el mercado de Vitoria", desc: "Vitoria ha subido un ~7-8% anual en 2024-2025, pero no todas las zonas igual. Los barrios más económicos (Abetxuko, Casco Viejo, Sansomendi) tienen más margen de negociación que los premium (Ensanche, Salburua). Usa la pestaña \"Mapa de Precios\" para tener datos reales." },
            { key: "Negociar los extras", desc: "Aparte del precio, puedes negociar: inclusión de garaje/trastero, electrodomésticos, fecha de entrega, quién paga los gastos de comunidad del mes de la firma, arreglos menores antes de la entrega." },
          ].map((item, i) => (
            <div key={i} className="py-3">
              <div className="font-semibold text-sm text-[#3d3528]">{item.key}</div>
              <p className="text-sm text-[#8a7e6d] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          SECCIÓN 6: DOCUMENTACIÓN
          ================================================================ */}
      <div id="documentacion" className="scroll-mt-14 bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-3">📄 Documentación que necesitarás</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {/* Para la hipoteca */}
          <div className="bg-[#f5f0e8] rounded-xl p-4">
            <div className="font-semibold text-sm text-[#3d3528] mb-2">Para la hipoteca</div>
            <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
              <p>DNI/NIE</p>
              <p>Últimas 3 nóminas</p>
              <p>Declaración IRPF (2 últimos años)</p>
              <p>Contrato de trabajo</p>
              <p>Vida laboral actualizada (gratis en <ExtLink href="https://sede.seg-social.gob.es">seg-social.es</ExtLink>)</p>
              <p>Extractos bancarios (6 meses)</p>
              <p>Informe CIRBE (gratis en <ExtLink href="https://app.bde.es/cir_www">bde.es</ExtLink>)</p>
              <p className="text-xs text-[#8a7e6d]">Si eres autónomo: últimas declaraciones trimestrales de IVA e IRPF + contabilidad</p>
            </div>
          </div>

          {/* Del piso */}
          <div className="bg-[#f0f5ee] rounded-xl p-4">
            <div className="font-semibold text-sm text-[#5a8a5a] mb-2">Del piso</div>
            <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
              <p><strong className="text-[#3d3528]">Nota simple</strong> del Registro (9,02€ + IVA en <ExtLink href="https://www.registradores.org">registradores.org</ExtLink>)</p>
              <p><strong className="text-[#3d3528]">Certificado energético</strong> (obligatorio, lo paga el vendedor)</p>
              <p>Último recibo <strong className="text-[#3d3528]">IBI</strong></p>
              <p><strong className="text-[#3d3528]">Certificado comunidad</strong> (deudas pendientes)</p>
              <p><strong className="text-[#3d3528]">ITE</strong> del edificio (si &gt;50 años)</p>
              <p>Cédula de habitabilidad</p>
              <p>Plano catastral (gratis en <ExtLink href="https://sede.catastro.gob.es">catastro.gob.es</ExtLink>)</p>
              <p>Últimas facturas de suministros (luz, gas, agua)</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-3">
          <p className="text-sm text-[#5a7a5a] leading-relaxed">
            <strong>💡 Consejo:</strong> Crea una carpeta (física o digital) para cada piso que visites. Guarda en ella la nota simple, certificado energético, fotos, notas de la visita y presupuestos de reforma si aplican. Te será muy útil para comparar.
          </p>
        </div>
      </div>

      {/* ================================================================
          SECCIÓN 7: GLOSARIO
          ================================================================ */}
      <div id="glosario" className="scroll-mt-14 bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm">
        <div className="text-base font-bold text-[#7a9e6d] mb-3">📖 Glosario rápido</div>

        <div className="divide-y divide-[#f0ebe3]">
          {[
            { term: "Arras", def: "Señal que se entrega al vendedor para reservar el piso. Si el comprador se echa atrás, las pierde. Si es el vendedor, devuelve el doble. Normalmente el 10% del precio. Existen tres tipos: penitenciales (las más comunes), confirmatorias y penales." },
            { term: "Avales ICO", def: "Programa del Gobierno de España para menores de 36 años o familias con hijos. Cubre hasta el 20-25% del préstamo. Vivienda ≤300.000€ en País Vasco.", tag: "NUEVO" },
            { term: "AJD", def: "Actos Jurídicos Documentados. Se paga en obra nueva: 0,5% en País Vasco. Desde 2019, el AJD de la escritura de hipoteca lo paga el banco." },
            { term: "CIRBE", def: "Central de Información de Riesgos del Banco de España. Informe gratuito con todas tus deudas. Los bancos lo consultan para concederte la hipoteca. Puedes pedirlo tú en bde.es." },
            { term: "Derrama", def: "Gasto extraordinario de la comunidad (ascensor nuevo, fachada, tejado). Pregunta siempre si hay derramas pendientes o previstas. Pueden ser de miles de euros." },
            { term: "Emantzipa", def: "Ayuda de 300€/mes durante 2 años del Gobierno Vasco para jóvenes de 25-29 años. Sirve para alquiler o hipoteca.", tag: "NUEVO" },
            { term: "Etxebide", def: "Registro de demandantes de vivienda protegida del Gobierno Vasco. Inscribirse es gratuito y necesario para optar a cualquier VPO.", tag: "NUEVO" },
            { term: "Euríbor", def: "Índice de referencia para las hipotecas variables en Europa. Si sube, tu cuota sube. En febrero 2026 está en torno al 2,3-2,5%." },
            { term: "FEIN", def: "Ficha Europea de Información Normalizada. El banco te la da con todas las condiciones de la hipoteca. Es vinculante: lo que dice ahí es lo que te ofrecen. Tienes 10 días para estudiarla." },
            { term: "FIAE", def: "Ficha de Advertencias Estandarizadas. Acompaña a la FEIN. Explica los riesgos de la hipoteca en lenguaje claro (qué pasa si suben los tipos, etc.)." },
            { term: "GazteAval", def: "Programa de avales del Gobierno Vasco para menores de 40 años. Cubre el 20% que no financian los bancos, permitiendo hipotecas del 100%. Vivienda ≤340.000€ en Euskadi.", tag: "NUEVO" },
            { term: "IBI", def: "Impuesto sobre Bienes Inmuebles. Se paga anualmente al ayuntamiento. En Vitoria oscila entre 300-900€/año según barrio, zona y tamaño." },
            { term: "ITE", def: "Inspección Técnica de Edificios. Obligatoria para edificios de más de 50 años. Si no la tiene, puede haber problemas. Pregunta siempre." },
            { term: "ITP", def: "Impuesto de Transmisiones Patrimoniales. Se paga al comprar vivienda de segunda mano. En Álava: 4% (o 2,5% reducido si vivienda habitual, ≤120m², no propietario de >25% de otra vivienda en el mismo municipio)." },
            { term: "IVA", def: "Impuesto sobre el Valor Añadido. Se paga en obra nueva: 10% general, 4% en VPO." },
            { term: "Nota simple", def: "Documento del Registro de la Propiedad que indica quién es el dueño y si hay cargas (hipotecas, embargos). Cuesta 9,02€ + IVA online. Imprescindible antes de firmar arras." },
            { term: "Subrogación", def: "Asumir la hipoteca que ya tiene el vendedor. A veces interesa (si tiene buenas condiciones), a veces no. Compara siempre con una hipoteca nueva." },
            { term: "Tasación", def: "Valoración oficial del inmueble realizada por una empresa homologada. Es obligatoria para la hipoteca. Cuesta entre 300-500€ y la paga el comprador. El banco no puede obligarte a usar su tasadora — puedes elegir la que quieras.", tag: "NUEVO" },
            { term: "Valor catastral", def: "Valor asignado al inmueble por el Catastro. Suele ser muy inferior al valor de mercado. Se usa para calcular el IBI y como referencia en algunos impuestos.", tag: "NUEVO" },
            { term: "VPO", def: "Vivienda de Protección Oficial. Precio regulado y limitaciones (no puedes venderla libremente durante varios años, normalmente 20-25 años según régimen)." },
          ].map((item, i) => (
            <div key={i} className="py-2.5">
              <span className="font-bold text-sm text-[#3d3528]">{item.term}</span>
              {item.tag && (
                <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#7a9e6d]/15 text-[#7a9e6d] uppercase">{item.tag}</span>
              )}
              <span className="text-sm text-[#8a7e6d] ml-1">— {item.def}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
