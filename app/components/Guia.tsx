"use client";

export default function Guia() {
  const cardClass = "bg-white rounded-2xl p-5 border border-[#e8e0d4] mb-4";

  return (
    <div>
      {/* Dónde buscar */}
      <div className={cardClass}>
        <div className="text-base font-bold text-[#7a9e6d] mb-2.5">🔍 Dónde buscar vivienda</div>
        <div className="text-sm text-[#5a5040] leading-relaxed">
          {[
            { name: "Idealista", desc: "El portal más grande de España. Filtros avanzados, alertas por email, fotos y planos.", url: "idealista.com" },
            { name: "Fotocasa", desc: "Segundo portal en volumen. A veces tiene anuncios que no están en Idealista.", url: "fotocasa.es" },
            { name: "Pisos.com", desc: "Tercer gran portal. Menos tráfico pero anuncios exclusivos de algunas agencias.", url: "pisos.com" },
            { name: "General Inmobiliaria", desc: "La inmobiliaria de referencia en Vitoria. Informe anual de precios por zonas muy fiable.", url: "generalinmobiliaria.com" },
            { name: "Etxebide", desc: "Registro de demandantes de vivienda del Gobierno Vasco. Imprescindible para VPO.", url: "etxebide.euskadi.eus" },
            { name: "Milanuncios / Wallapop", desc: "Particulares que venden sin intermediario. Más negociación pero menos garantías." },
          ].map((s, i) => (
            <div key={i} className={`py-2.5 ${i < 5 ? "border-b border-[#e8e0d4]" : ""}`}>
              <div className="font-semibold text-[#3d3528]">{s.name}</div>
              <div className="text-xs text-[#8a7e6d]">{s.desc}</div>
              {s.url && <div className="text-[11px] text-[#5a7a5a]">{s.url}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* VPO */}
      <div className={cardClass}>
        <div className="text-base font-bold text-[#7a9e6d] mb-2.5">🏗️ Vivienda de Protección Oficial (VPO)</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-2.5">
          En Euskadi las VPO tienen precios máximos regulados por el Gobierno Vasco, muy por debajo del mercado libre. Para optar a una:
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-3.5 mb-2.5">
          <div className="font-semibold text-[#3d3528] text-sm mb-1.5">Requisitos principales</div>
          <div className="text-xs text-[#5a5040] leading-relaxed space-y-0.5">
            <p>• Estar inscrito en <strong>Etxebide</strong> (Registro de demandantes de vivienda)</p>
            <p>• No ser titular de otra vivienda</p>
            <p>• Ingresos anuales por debajo de los baremos (varían según régimen)</p>
            <p>• Empadronamiento en Euskadi con antigüedad mínima (1-3 años)</p>
            <p>• La adjudicación es por sorteo entre los inscritos que cumplen requisitos</p>
          </div>
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-3.5 mb-2.5">
          <div className="font-semibold text-[#5a7a5a] text-sm mb-1.5">Zonas con VPO en Vitoria</div>
          <p className="text-xs text-[#5a5040] leading-relaxed">
            Las principales promociones de VPO se concentran en <strong>Salburua</strong>, <strong>Zabalgana</strong> y <strong>Lakua</strong>.
            Hay VPO tanto de compra como de alquiler. El precio de venta está regulado: en torno a 1.400-1.800€/m² según el régimen, frente a los 2.500-3.500€ del mercado libre.
          </p>
        </div>

        <p className="text-xs text-[#8a7e6d]">
          Inscríbete en Etxebide cuanto antes, incluso si aún no vas a comprar. La antigüedad en el registro puede ser un factor de desempate.
        </p>
      </div>

      {/* En qué fijarse */}
      <div className={cardClass}>
        <div className="text-base font-bold text-[#7a9e6d] mb-2.5">🧐 En qué fijarse al visitar un piso</div>
        <div className="text-sm text-[#5a5040]">
          {[
            { icon: "💧", title: "Humedades y estado del edificio", desc: "Mira techos, esquinas y bajo las ventanas. Pregunta por la ITE y si hay derramas previstas." },
            { icon: "🧭", title: "Orientación y luz natural", desc: "Sur y suroeste son las mejores en Vitoria por el clima frío. Visita el piso a distintas horas si puedes." },
            { icon: "🔊", title: "Ruido", desc: "Visita entre semana en hora punta. Comprueba el aislamiento: ventanas dobles, vecinos, bares cercanos." },
            { icon: "🏢", title: "Comunidad de vecinos", desc: "Pide las actas de las últimas juntas. Revisa si hay derramas, conflictos, obras previstas. Pregunta la cuota mensual." },
            { icon: "📐", title: "Metros reales vs anunciados", desc: "Los portales muestran m² construidos (incluyen muros). Los m² útiles son un 15-20% menos. Pide el plano catastral." },
            { icon: "🔌", title: "Instalaciones", desc: "Antigüedad de la instalación eléctrica, fontanería, caldera. Una caldera nueva son 2.000-3.500€. Tubería de plomo = reforma obligada." },
            { icon: "📜", title: "Certificado energético", desc: "De la A a la G. Un piso con G puede costar 100-200€/mes más en suministros que uno con B. Afecta mucho en Vitoria." },
            { icon: "🅿️", title: "Garaje y trastero", desc: "En Vitoria el garaje es casi imprescindible por el clima. Si no lo incluye, calcular 15.000-30.000€ extra." },
          ].map((item, i) => (
            <div key={i} className={`py-2.5 ${i < 7 ? "border-b border-[#e8e0d4]" : ""}`}>
              <div className="font-semibold text-[#3d3528]">{item.icon} {item.title}</div>
              <div className="text-xs text-[#8a7e6d] mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Errores típicos */}
      <div className={cardClass}>
        <div className="text-base font-bold text-[#c0534f] mb-2.5">⚠️ Errores típicos al comprar</div>
        <div className="text-sm text-[#5a5040]">
          {[
            { error: "No comparar hipotecas", tip: "Pide oferta en al menos 3-4 bancos. La diferencia puede ser de 20.000-40.000€ en intereses totales. Usa un bróker hipotecario si no quieres hacerlo tú." },
            { error: "Olvidar los gastos de compra", tip: "Al precio del piso súmale un 8-12% en gastos. En Álava es menos que en otras CCAA, pero sigue siendo mucho." },
            { error: "No pedir la nota simple", tip: "Es el documento que confirma quién es el propietario real y si el piso tiene cargas. Cuesta 9€ online. NUNCA compres sin verla." },
            { error: "Firmar arras sin pensar", tip: "Las arras penitenciales te comprometen: si te echas atrás pierdes el dinero. Asegúrate de tener la hipoteca preaprobada antes." },
            { error: "No negociar el precio", tip: "El precio publicado casi nunca es el precio final. En segunda mano se puede negociar un 5-15%. Investiga cuánto llevan publicado." },
            { error: "Calcular solo la cuota", tip: "Una cuota de 700€ con comunidad de 80€, seguro de 40€, IBI de 50€ y suministros de 120€ son en realidad 990€/mes." },
            { error: "No revisar el IBI y la plusvalía", tip: "El IBI varía mucho entre barrios. La plusvalía municipal la paga el vendedor, pero asegúrate de que queda por escrito." },
            { error: "Enamorarse del primer piso", tip: "Visita al menos 8-10 pisos antes de decidir. Así calibras lo que ofrece el mercado y negocias mejor." },
          ].map((item, i) => (
            <div key={i} className={`py-2.5 ${i < 7 ? "border-b border-[#e8e0d4]" : ""}`}>
              <div className="font-semibold text-[#c0534f]">✗ {item.error}</div>
              <div className="text-xs text-[#5a7a5a] mt-0.5">→ {item.tip}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Negociación */}
      <div className={cardClass}>
        <div className="text-base font-bold text-[#7a9e6d] mb-2.5">🤝 Claves para negociar</div>
        <div className="text-sm text-[#5a5040]">
          {[
            { key: "Investiga el tiempo en mercado", desc: "Si lleva más de 3 meses publicado, el vendedor tiene más prisa. Pregunta en la inmobiliaria o mira el historial en Idealista." },
            { key: "Ten la hipoteca preaprobada", desc: "Un comprador con financiación confirmada tiene mucho más poder de negociación. El vendedor prefiere certeza." },
            { key: "Usa defectos como argumento", desc: "Si necesita reforma, pide presupuestos reales. Un baño = 4.000-6.000€. Una cocina = 5.000-10.000€." },
            { key: "Haz una oferta razonada", desc: "No ofrezcas un 30% menos. Un 5-10% por debajo con argumentos sólidos es más efectivo." },
            { key: "No muestres urgencia", desc: "Si el vendedor sabe que tienes prisa, pierdes poder de negociación." },
          ].map((item, i) => (
            <div key={i} className={`py-2.5 ${i < 4 ? "border-b border-[#e8e0d4]" : ""}`}>
              <div className="font-semibold text-[#3d3528]">{item.key}</div>
              <div className="text-xs text-[#8a7e6d] mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Documentación */}
      <div className={cardClass}>
        <div className="text-base font-bold text-[#7a9e6d] mb-2.5">📋 Documentación que necesitarás</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#f5f0e8] rounded-xl p-3">
            <div className="font-semibold text-[#3d3528] text-sm mb-1.5">Para la hipoteca</div>
            <div className="text-[11px] text-[#8a7e6d] leading-relaxed space-y-0.5">
              <p>• DNI/NIE</p>
              <p>• Últimas 3 nóminas</p>
              <p>• Declaración IRPF (2 últimos años)</p>
              <p>• Contrato de trabajo</p>
              <p>• Vida laboral actualizada</p>
              <p>• Extractos bancarios (6 meses)</p>
              <p>• Informe CIRBE (gratis en BdE)</p>
            </div>
          </div>
          <div className="bg-[#f0f5ee] rounded-xl p-3">
            <div className="font-semibold text-[#5a7a5a] text-sm mb-1.5">Del piso</div>
            <div className="text-[11px] text-[#8a7e6d] leading-relaxed space-y-0.5">
              <p>• Nota simple del Registro</p>
              <p>• Certificado energético</p>
              <p>• Último recibo IBI</p>
              <p>• Certificado comunidad (deudas)</p>
              <p>• ITE del edificio</p>
              <p>• Cédula de habitabilidad</p>
              <p>• Plano catastral</p>
            </div>
          </div>
        </div>
      </div>

      {/* Glosario */}
      <div className={cardClass}>
        <div className="text-base font-bold text-[#7a9e6d] mb-2.5">📖 Glosario rápido</div>
        <div className="text-sm text-[#5a5040]">
          {[
            { term: "Arras", def: "Señal que se entrega al vendedor para reservar el piso. Si el comprador se echa atrás, las pierde. Si es el vendedor, devuelve el doble." },
            { term: "Nota simple", def: "Documento del Registro de la Propiedad que indica quién es el dueño y si hay cargas (hipotecas, embargos)." },
            { term: "FEIN", def: "Ficha Europea de Información Normalizada. El banco te la da con todas las condiciones de la hipoteca. Es vinculante." },
            { term: "ITP", def: "Impuesto de Transmisiones Patrimoniales. Se paga al comprar vivienda de segunda mano. En Álava: 4% (o 2,5% reducido)." },
            { term: "AJD", def: "Actos Jurídicos Documentados. Se paga en obra nueva (0,5% en Álava). Lo paga el banco desde 2019 en hipotecas." },
            { term: "ITE", def: "Inspección Técnica de Edificios. Obligatoria para edificios de más de 50 años. Si no la tiene, puede haber problemas." },
            { term: "Derrama", def: "Gasto extraordinario de la comunidad (ascensor nuevo, fachada, tejado). Pregunta siempre si hay derramas previstas." },
            { term: "CIRBE", def: "Central de Información de Riesgos del Banco de España. Informe gratuito con tus deudas. Los bancos lo consultan." },
            { term: "Subrogación", def: "Asumir la hipoteca que ya tiene el vendedor. A veces interesa, a veces no. Compara siempre con una hipoteca nueva." },
            { term: "VPO", def: "Vivienda de Protección Oficial. Precio regulado y limitaciones (no puedes venderla libremente durante varios años)." },
          ].map((item, i) => (
            <div key={i} className={`py-2 ${i < 9 ? "border-b border-[#e8e0d4]" : ""}`}>
              <span className="font-bold text-[#3d3528]">{item.term}: </span>
              <span className="text-xs text-[#8a7e6d]">{item.def}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
