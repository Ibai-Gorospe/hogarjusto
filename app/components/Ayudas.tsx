"use client";

/**
 * Ayudas — Ayudas y ventajas fiscales en Álava
 * Contenido verificado a febrero 2026.
 */

// ============================================================
// Badge reutilizable
// ============================================================

function Badge({ children, color }: { children: string; color: string }) {
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap"
      style={{ background: color + "18", color }}
    >
      {children}
    </span>
  );
}

// ============================================================
// Componente principal
// ============================================================

export default function Ayudas() {
  return (
    <div className="max-w-[800px] mx-auto">

      {/* ====== CABECERA ====== */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#3d3528] mb-1">Ayudas y ventajas fiscales en Álava</h2>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          Álava tiene una de las fiscalidades más favorables de España para comprar vivienda. Aquí tienes todo lo que puedes aprovechar.
        </p>
        <p className="text-xs text-[#8a7e6d] mt-2">
          Datos verificados a febrero 2026. Consulta siempre con un asesor fiscal para tu caso concreto.
        </p>
      </div>

      {/* ====== SECCIÓN 1: GAZTEAVAL ====== */}
      <div className="bg-gradient-to-br from-[#f2f7f0] to-[#faf7f2] rounded-2xl p-5 border border-[#5a8a5a44] mb-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="text-base font-bold text-[#5a8a5a]">🔑 GazteAval — Aval del Gobierno Vasco</div>
          <Badge color="#5a8a5a">MUY RELEVANTE</Badge>
        </div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Programa de avales para que jóvenes menores de 40 años puedan financiar hasta el{" "}
          <strong className="text-[#3d3528]">100% del valor de la vivienda</strong>, cubriendo ese 20% que normalmente no financian los bancos. Sin coste para el solicitante.
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Requisitos</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p><strong className="text-[#3d3528]">Edad:</strong> 18 a 39 años (no haber cumplido 40). Ambos compradores si son dos.</p>
            <p><strong className="text-[#3d3528]">Residencia:</strong> al menos 2 años en Euskadi en los últimos 5.</p>
            <p><strong className="text-[#3d3528]">Primera vivienda:</strong> no haber sido propietario antes (salvo herencia parcial, divorcio o infravivienda).</p>
            <p><strong className="text-[#3d3528]">Precio máximo:</strong> 340.000€ (incluyendo anejos como garaje/trastero).</p>
            <p><strong className="text-[#3d3528]">Ingresos máximos:</strong> 52.012,80€/año (individual) o 89.164,80€ (dos solicitantes).</p>
            <p><strong className="text-[#3d3528]">Sin morosidad en CIRBE</strong> en la fecha de concesión.</p>
            <p><strong className="text-[#3d3528]">Ubicación:</strong> vivienda en Euskadi (nueva o segunda mano).</p>
          </div>
        </div>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Cómo solicitarlo</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Directamente en las entidades adheridas: <strong className="text-[#3d3528]">Kutxabank, CaixaBank, Laboral Kutxa, Abanca</strong> y BBVA.
            Plazo abierto hasta 31 de octubre de 2029 (o hasta agotar los 144M€ de dotación).
          </p>
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-4">
          <div className="text-sm font-bold text-[#5a8a5a] mb-1">💡 Consejo</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Si eres menor de 40 y es tu primera vivienda, este programa puede ser la clave para no necesitar los 40.000-60.000€ de entrada.
            El objetivo del Gobierno Vasco es facilitar 3.000 viviendas hasta 2029. ¡Ve cuanto antes!
          </p>
        </div>
      </div>

      {/* ====== SECCIÓN 2: AVALES ICO ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="text-base font-bold text-[#5b8cb8]">🏛️ Avales ICO — Aval del Gobierno de España</div>
          <Badge color="#5b8cb8">NUEVA AYUDA</Badge>
        </div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Línea de avales del Estado (2.500M€) que cubre hasta el{" "}
          <strong className="text-[#3d3528]">20% del préstamo hipotecario</strong>{" "}
          (25% si la vivienda tiene certificación energética D o superior). Permite financiar hasta el 100% del valor del inmueble.{" "}
          <strong className="text-[#3d3528]">Ampliada hasta el 31 de diciembre de 2027.</strong>
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#5b8cb8] mb-2">Requisitos</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p><strong className="text-[#3d3528]">Edad:</strong> menores de 36 años (no haber cumplido 36 al firmar la hipoteca). Sin límite de edad si tienes hijos menores a cargo.</p>
            <p><strong className="text-[#3d3528]">Residencia:</strong> legal en España de forma continuada los 2 años anteriores.</p>
            <p><strong className="text-[#3d3528]">Primera vivienda</strong> habitual y permanente en España.</p>
            <p><strong className="text-[#3d3528]">Ingresos máximos:</strong> 37.800€ brutos/año por persona (4,5x IPREM). Si compran dos jóvenes, la suma de ambos no puede superar 37.800€ cada uno.</p>
            <p><strong className="text-[#3d3528]">Patrimonio máximo:</strong> 100.000€ por persona.</p>
            <p><strong className="text-[#3d3528]">Precio máximo en País Vasco:</strong> 300.000€ (incluidos anejos).</p>
            <p><strong className="text-[#3d3528]">Sin ser propietario</strong> de otra vivienda (salvo herencia parcial o divorcio).</p>
          </div>
        </div>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#5b8cb8] mb-2">Cómo solicitarlo</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            En cualquier entidad adherida (más de 50 bancos). Consultar listado en ico.es. El aval dura 10 años.
          </p>
        </div>

        <div className="bg-[#eef4f8] rounded-xl p-4">
          <div className="text-sm font-bold text-[#5b8cb8] mb-1">💡 Consejo</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Este programa es <strong className="text-[#3d3528]">alternativo</strong> a GazteAval. Si tu vivienda cuesta menos de 300.000€ y cumples ambos requisitos, compara cuál te conviene más.
            GazteAval es más generoso en precio (340.000€) e ingresos (52.000€), pero el ICO cubre todo España.
          </p>
        </div>
      </div>

      {/* ====== SECCIÓN 3: COMPARATIVA ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#3d3528] mb-3">Comparativa GazteAval vs Avales ICO</div>

        {/* Desktop: tabla */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-[#e8e0d4]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#7a9e6d] text-white">
                <th className="text-left px-3 py-2.5 font-semibold">Concepto</th>
                <th className="text-left px-3 py-2.5 font-semibold">GazteAval (Gob. Vasco)</th>
                <th className="text-left px-3 py-2.5 font-semibold">Avales ICO (Estado)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Edad máxima", "39 años", "35 años (sin límite si hijos menores)"],
                ["Ingresos máximos", "52.012€ individual", "37.800€ individual"],
                ["Precio máx. vivienda", "340.000€", "300.000€ (en Euskadi)"],
                ["Cobertura del aval", "Hasta 20% (del 80 al 100%)", "Hasta 20% (25% si cert. energética D+)"],
                ["Ubicación vivienda", "Solo Euskadi", "Toda España"],
                ["Plazo vigencia", "Hasta oct. 2029", "Hasta dic. 2027"],
                ["Dónde solicitar", "Kutxabank, CaixaBank, Laboral Kutxa, Abanca, BBVA", "+50 entidades adheridas"],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#faf8f4]"}>
                  <td className="px-3 py-2.5 font-medium text-[#3d3528]">{row[0]}</td>
                  <td className="px-3 py-2.5 text-[#5a5040]">{row[1]}</td>
                  <td className="px-3 py-2.5 text-[#5a5040]">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Móvil: cards apiladas */}
        <div className="md:hidden space-y-3">
          {[
            { title: "GazteAval (Gob. Vasco)", color: "#5a8a5a", data: [
              ["Edad máxima", "39 años"],
              ["Ingresos máx.", "52.012€ individual"],
              ["Precio máx.", "340.000€"],
              ["Cobertura", "Hasta 20% (del 80 al 100%)"],
              ["Ubicación", "Solo Euskadi"],
              ["Vigencia", "Hasta oct. 2029"],
              ["Entidades", "Kutxabank, CaixaBank, Laboral Kutxa, Abanca, BBVA"],
            ]},
            { title: "Avales ICO (Estado)", color: "#5b8cb8", data: [
              ["Edad máxima", "35 años (sin límite si hijos menores)"],
              ["Ingresos máx.", "37.800€ individual"],
              ["Precio máx.", "300.000€ (en Euskadi)"],
              ["Cobertura", "Hasta 20% (25% si cert. energética D+)"],
              ["Ubicación", "Toda España"],
              ["Vigencia", "Hasta dic. 2027"],
              ["Entidades", "+50 entidades adheridas"],
            ]},
          ].map((card, ci) => (
            <div key={ci} className="rounded-xl border border-[#e8e0d4] overflow-hidden">
              <div className="px-3 py-2 font-semibold text-white text-sm" style={{ background: card.color }}>
                {card.title}
              </div>
              <div className="divide-y divide-[#f0ebe3]">
                {card.data.map((row, ri) => (
                  <div key={ri} className={`px-3 py-2 flex justify-between gap-2 text-sm ${ri % 2 === 0 ? "bg-white" : "bg-[#faf8f4]"}`}>
                    <span className="text-[#8a7e6d] shrink-0">{row[0]}</span>
                    <span className="text-[#3d3528] font-medium text-right">{row[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== SECCIÓN 4: DEDUCCIÓN IRPF ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="text-base font-bold text-[#7a9e6d]">📋 Deducción IRPF Foral por compra de vivienda</div>
          <Badge color="#8a7e6d">ANUAL</Badge>
        </div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          En Álava, a diferencia del régimen común (donde se eliminó en 2013),{" "}
          <strong className="text-[#3d3528]">aún se puede deducir la compra de vivienda habitual</strong>{" "}
          en el IRPF foral. Esto es un privilegio del sistema foral vasco.
        </p>

        {/* Dos columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="bg-[#f5f0e8] rounded-xl p-4">
            <div className="text-xs text-[#8a7e6d] font-semibold mb-1">General</div>
            <div className="text-3xl font-bold text-[#7a9e6d]">18%</div>
            <div className="text-sm text-[#5a5040] mt-1">de las cantidades invertidas</div>
            <div className="text-xs text-[#8a7e6d] mt-1">Límite: <strong>1.530€/año</strong></div>
            <div className="text-xs text-[#8a7e6d]">Base máxima deducible: 8.500€/año</div>
          </div>
          <div className="bg-[#f0f5ee] rounded-xl p-4">
            <div className="text-xs text-[#5a8a5a] font-semibold mb-1">Menores de 36 años / colectivos protegidos</div>
            <div className="text-3xl font-bold text-[#5a8a5a]">23%</div>
            <div className="text-sm text-[#5a5040] mt-1">de las cantidades invertidas</div>
            <div className="text-xs text-[#5a8a5a] mt-1">Límite: <strong>1.955€/año</strong></div>
            <div className="text-xs text-[#5a8a5a]"><strong>Sin límite el año de la compra</strong></div>
            <div className="text-[11px] text-[#8a7e6d] mt-1">Aplica a: familias numerosas, discapacidad ≥65%, víctimas de violencia de género</div>
          </div>
        </div>

        {/* Bonus pueblos */}
        <div className="bg-[#faf5ee] rounded-xl p-4 mb-3 border border-[#e8dcc8]">
          <div className="text-sm font-bold text-[#c0935a] mb-1">🏡 Bonus municipios rurales</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Si la vivienda está en un municipio alavés de <strong className="text-[#3d3528]">menos de 4.000 habitantes</strong>{" "}
            (Salvatierra, Alegría-Dulantzi, Campezo, etc.): deducción del <strong className="text-[#c0935a]">25%</strong>, límite <strong>2.346€/año</strong>.
          </p>
        </div>

        <div className="text-xs text-[#8a7e6d] leading-relaxed">
          Se deduce sobre las cantidades pagadas: cuotas hipotecarias (capital + intereses), notaría, registro, reforma...
          Base liquidable máxima para aplicar: <strong className="text-[#3d3528]">68.000€</strong> (desde 2026).
          El año de formalización de la compra no tiene límite en la deducción para menores de 36 años.
        </div>
      </div>

      {/* ====== SECCIÓN 5: CUENTA VIVIENDA ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🏠 Cuenta Vivienda (si aún estás ahorrando)</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          En Álava se puede abrir una cuenta vivienda y deducir el{" "}
          <strong className="text-[#3d3528]">18% de lo ahorrado</strong> (23% si menor de 36) en la declaración.
          El dinero se debe destinar a comprar vivienda habitual.
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Datos clave</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p>Plazo general: <strong className="text-[#3d3528]">6 años</strong> desde la apertura.</p>
            <p><strong className="text-[#3d3528]">Menores de 36 años al abrir la cuenta: plazo ampliado a 10 años</strong> (novedad desde enero 2025).</p>
            <p>Mismos porcentajes y límites que la deducción por adquisición.</p>
            <p>Solo una cuenta vivienda por persona.</p>
            <p>Si no compras en plazo, debes devolver las deducciones practicadas + intereses de demora.</p>
          </div>
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-3">
          <p className="text-sm text-[#5a7a5a] leading-relaxed">
            <strong>💡 Consejo:</strong> Ideal si aún estás juntando la entrada. Con 10 años de plazo y deducción del 23%, puedes ahorrar de forma fiscalmente eficiente desde los 25-26 años y comprar con 35.
          </p>
        </div>
      </div>

      {/* ====== SECCIÓN 6: DONACIONES FAMILIARES ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="text-base font-bold text-[#7a9e6d]">🎁 Donaciones familiares para vivienda</div>
          <Badge color="#c0935a">NOVEDAD 2025</Badge>
        </div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Si tus padres, abuelos u otros familiares te ayudan con la entrada, las donaciones de dinero para vivienda habitual están{" "}
          <strong className="text-[#3d3528]">exentas de impuestos</strong> en Álava.
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Condiciones</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p>Donación de <strong className="text-[#3d3528]">hasta 30.000€</strong> por donante.</p>
            <p>Destinada a la adquisición de <strong className="text-[#3d3528]">vivienda habitual</strong>.</p>
            <p>El comprador debe ser <strong className="text-[#3d3528]">menor de 36 años</strong>.</p>
            <p>Parentesco: familiares <strong className="text-[#3d3528]">hasta 3er grado</strong> (padres, abuelos, hermanos, tíos).</p>
            <p>Sin coste fiscal: exenta del Impuesto de Sucesiones y Donaciones (ISD).</p>
          </div>
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-3">
          <p className="text-sm text-[#5a7a5a] leading-relaxed">
            <strong>💡 Consejo:</strong> Si tu familia puede ayudarte con 20.000-30.000€ para la entrada, en Álava no pagaréis impuestos por ello. Esto puede ser la diferencia entre poder comprar o no.
          </p>
        </div>
      </div>

      {/* ====== SECCIÓN 7: EMANTZIPA ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🎯 Emantzipa — Ayuda a la emancipación</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Ayuda de <strong className="text-[#3d3528]">300€/mes durante 2 años</strong> del Gobierno Vasco para jóvenes.
          Sirve tanto para pagar el alquiler como para la cuota de la hipoteca o préstamo de compra.
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Requisitos</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p><strong className="text-[#3d3528]">Edad:</strong> 25 a 29 años (ambos incluidos). Pendiente: el Gobierno Vasco ha anunciado la posible bajada a 23 años en próximas convocatorias.</p>
            <p><strong className="text-[#3d3528]">Empadronamiento:</strong> 12 meses en Euskadi (o 3 años continuados en los últimos 10).</p>
            <p><strong className="text-[#3d3528]">Ingresos:</strong> entre 3.000€ y 30.000€/año (individual) o 36.500€ (tributación conjunta). Convocatoria 2025.</p>
            <p><strong className="text-[#3d3528]">Patrimonio:</strong> no superar 75.000€ (excluida vivienda habitual).</p>
            <p>Ser titular de contrato de alquiler o de compraventa (hipoteca/préstamo).</p>
            <p>No ser propietario de otra vivienda distinta a la habitual.</p>
          </div>
        </div>

        <div className="text-sm text-[#5a5040] leading-relaxed mb-2">
          <strong className="text-[#3d3528]">Compatible con:</strong> Gaztelagun, RGI, IMV. No compatible con vivienda protegida (Alokabide, etc.).
        </div>
        <div className="text-sm text-[#5a5040] leading-relaxed mb-2">
          <strong className="text-[#3d3528]">Cómo solicitarlo:</strong> Online con BakQ o presencialmente en Zuzenean. Convocatoria anual (suele abrirse en marzo-abril).
        </div>
        <div className="text-xs text-[#8a7e6d]">Presupuesto 2025: 25 millones de euros. En 2024 se adjudicaron 10,3M€.</div>
      </div>

      {/* ====== SECCIÓN 8: GAZTELAGUN ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🏘️ Gaztelagun — Ayuda al alquiler joven</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Ayuda directa al pago del alquiler: hasta el <strong className="text-[#3d3528]">60% de la renta mensual</strong>{" "}
          (máximo <strong className="text-[#3d3528]">300€/mes</strong>) para jóvenes de 18 a 35 años.{" "}
          <strong className="text-[#3d3528]">Solo para alquiler</strong>, no para compra.
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Requisitos principales</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p><strong className="text-[#3d3528]">Edad:</strong> 18-35 años.</p>
            <p>6 meses de empadronamiento en Euskadi.</p>
            <p><strong className="text-[#3d3528]">Ingresos:</strong> hasta 30.000€ individual / 36.764€ unidad familiar / 39.184€ familia numerosa. (Convocatoria 2025, novedad: límites ampliados).</p>
            <p><strong className="text-[#3d3528]">Renta máxima subvencionable:</strong> 900€/mes en Vitoria (novedad 2025, antes 800€), 800€ en áreas metropolitanas.</p>
            <p>Pagar el alquiler por transferencia bancaria.</p>
            <p>No ser propietario de otra vivienda.</p>
          </div>
        </div>

        <div className="text-xs text-[#8a7e6d] mb-2">
          En 2025 se superaron las 8.000 personas beneficiarias. Novedad: ahora pueden ser hasta 2 personas beneficiarias por vivienda en zonas tensionadas.
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-3">
          <p className="text-sm text-[#5a7a5a] leading-relaxed">
            <strong>💡 Nota:</strong> Aunque esta ayuda es solo para alquiler, es útil si necesitas un paso intermedio antes de comprar.
            Es compatible con Emantzipa (podrías recibir hasta 600€/mes combinando ambas).
          </p>
        </div>
      </div>

      {/* ====== SECCIÓN 9: ITP REDUCIDO ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">💰 ITP reducido en Álava</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Si compras vivienda de segunda mano como habitual y ≤120m², el ITP baja del 4% al{" "}
          <strong className="text-[#5a8a5a]">2,5%</strong>. En un piso de 200.000€ eso son{" "}
          <strong className="text-[#3d3528]">3.000€ de ahorro</strong> solo en impuestos.
          Comparado con la Comunidad Valenciana (10%) te ahorras 15.000€.
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-4">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Requisitos para el 2,5%</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1.5">
            <p>Vivienda habitual.</p>
            <p>Superficie ≤120m² construidos.</p>
            <p>No ser propietario de &gt;25% de otra vivienda en el mismo municipio.</p>
            <p><strong className="text-[#3d3528]">Desde 2025:</strong> se puede aplicar más de una vez (antes era uso único).</p>
          </div>
        </div>
      </div>

      {/* ====== SECCIÓN 10: EXENCIÓN REINVERSIÓN ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🔄 Exención por reinversión en vivienda habitual</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Si en el futuro vendes tu vivienda habitual y reinviertes en otra, la ganancia patrimonial queda{" "}
          <strong className="text-[#5a8a5a]">exenta de IRPF</strong>. Plazo: 2 años antes o después de la venta. También exentos mayores de 65 años.
        </p>

        <div className="bg-[#c0534f]/8 rounded-xl p-4">
          <div className="text-sm font-bold text-[#c0534f] mb-1">Cambio importante desde enero 2026</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Para viviendas adquiridas a partir de 2026, la exención por reinversión{" "}
            <strong className="text-[#c0534f]">solo aplica si justificas el cambio de vivienda</strong>.
            Causas aceptadas: necesidades familiares, traslado laboral, matrimonio o separación, dificultades económicas o circunstancias similares.
            Ya no vale vender y comprar otra vivienda sin causa.
          </p>
        </div>
      </div>

      {/* ====== SECCIÓN 11: ESTIMACIÓN AHORRO ====== */}
      <div className="bg-gradient-to-br from-[#f8f4ed] to-[#f0ebe3] rounded-2xl p-5 border border-[#ddd5c8] mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">💡 Estimación del ahorro total (ejemplo)</div>
        <p className="text-sm text-[#5a5040] mb-3">
          Supongamos: piso de 200.000€, segunda mano, vivienda habitual, ≤120m², menor de 36 años.
        </p>

        <div className="bg-white/70 rounded-xl overflow-hidden divide-y divide-[#e8e0d4]">
          {[
            { label: "GazteAval (no necesitas 20% de entrada)", value: "~40.000€ en efectivo necesario", color: "#5a8a5a" },
            { label: "ITP reducido (2,5% vs 4%)", value: "3.000€", color: "#5a8a5a" },
            { label: "Deducción IRPF (23% × ~8.500€/año hipoteca)", value: "~1.955€/año en impuestos", color: "#5a7a5a" },
            { label: "Donación familiar exenta (si aplica, hasta 30.000€)", value: "Ahorro en ISD", color: "#c0935a" },
            { label: "Emantzipa (si aplica, 25-29 años)", value: "Hasta 7.200€ en 2 años", color: "#c0935a" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-baseline gap-3 px-4 py-2.5 text-sm">
              <span className="text-[#5a5040]">{item.label}</span>
              <span className="font-semibold whitespace-nowrap" style={{ color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 bg-[#f0f5ee] rounded-xl p-3 text-center">
          <div className="text-sm font-bold text-[#5a8a5a]">Total estimado primer año: más de 5.000€ de ahorro fiscal + acceso sin entrada</div>
        </div>

        <div className="mt-2 text-xs text-[#8a7e6d] text-center leading-relaxed">
          Los importes exactos dependen de las circunstancias de cada persona. Consulta siempre con un asesor fiscal en Álava para optimizar al máximo.
        </div>
      </div>

      {/* ====== SECCIÓN 12: ENLACES ÚTILES ====== */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] shadow-sm">
        <div className="text-base font-bold text-[#7a9e6d] mb-3">🔗 Enlaces útiles</div>
        <div className="divide-y divide-[#e8e0d4]">
          {[
            { label: "GazteAval — Solicitud", url: "https://www.ivf-fei.euskadi.eus", domain: "ivf-fei.euskadi.eus" },
            { label: "Avales ICO — Información", url: "https://www.ico.es/linea-avales-hipoteca-primera-vivienda", domain: "ico.es" },
            { label: "Gaztelagun — Alquiler joven", url: "https://alokabide.euskadi.eus/gaztelagun", domain: "alokabide.euskadi.eus" },
            { label: "Emantzipa — Emancipación", url: "https://www.gazteaukera.euskadi.eus/emantzipa", domain: "gazteaukera.euskadi.eus" },
            { label: "Hacienda Foral de Álava — IRPF", url: "https://web.araba.eus", domain: "web.araba.eus" },
            { label: "Etxebide — Registro demandantes vivienda", url: "https://www.etxebide.euskadi.eus", domain: "etxebide.euskadi.eus" },
            { label: "Perales Digital — Precios por zona en Vitoria", url: "https://www.peralesdigital.com", domain: "peralesdigital.com" },
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center py-2.5 text-sm hover:bg-[#faf8f4] -mx-2 px-2 rounded-lg transition-colors"
            >
              <span className="text-[#3d3528]">{link.label}</span>
              <span className="text-[#7a9e6d] text-xs font-medium">{link.domain} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
