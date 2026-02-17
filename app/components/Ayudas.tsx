"use client";

// Badge reutilizable
function Badge({ children, color = "#c0935a" }: { children: string; color?: string }) {
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: color + "18", color }}
    >
      {children}
    </span>
  );
}

export default function Ayudas() {
  return (
    <div>
      {/* GazteAval */}
      <div className="bg-gradient-to-br from-[#f2f7f0] to-[#faf7f2] rounded-2xl p-5 border border-[#5a8a5a44] mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-base font-bold text-[#5a8a5a]">🔑 GazteAval — Aval del Gobierno Vasco</div>
          <Badge color="#5a8a5a">MUY RELEVANTE</Badge>
        </div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          Programa de avales para que jóvenes menores de 40 años puedan financiar hasta el{" "}
          <strong className="text-[#3d3528]">100% del valor de la vivienda</strong>, cubriendo ese 20% que normalmente no financian los bancos. Sin coste para el solicitante.
        </p>

        <div className="bg-[#f5f0e8] rounded-xl p-3.5 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Requisitos</div>
          <div className="text-sm text-[#5a5040] leading-relaxed space-y-1">
            <p><span className="text-[#3d3528] font-medium">Edad:</span> entre 18 y 39 años (ambos compradores)</p>
            <p><span className="text-[#3d3528] font-medium">Residencia:</span> al menos 2 años en Euskadi de los últimos 5</p>
            <p><span className="text-[#3d3528] font-medium">Primera vivienda:</span> no haber sido propietario antes (salvo herencia o divorcio)</p>
            <p><span className="text-[#3d3528] font-medium">Precio máximo:</span> 340.000€ (incluyendo anejos)</p>
            <p><span className="text-[#3d3528] font-medium">Ingresos máximos:</span> 50.400€/año (individual) o 86.400€ (dos solicitantes)</p>
            <p><span className="text-[#3d3528] font-medium">Ubicación:</span> vivienda en Euskadi (nueva o segunda mano)</p>
          </div>
        </div>

        <div className="bg-[#f5f0e8] rounded-xl p-3.5 mb-3">
          <div className="text-xs font-semibold text-[#7a9e6d] mb-2">Cómo solicitarlo</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Directamente en las sucursales de las entidades adheridas:{" "}
            <strong className="text-[#3d3528]">Kutxabank, CaixaBank, Laboral Kutxa, Abanca</strong> y BBVA.
            Plazo abierto hasta 31 de octubre de 2029 (o hasta agotar los 144M€ de dotación).
          </p>
        </div>

        <div className="bg-[#f0f5ee] rounded-xl p-3.5">
          <div className="text-sm font-bold text-[#5a8a5a] mb-1">💡 Consejo</div>
          <p className="text-sm text-[#5a5040] leading-relaxed">
            Si eres menor de 40 y es tu primera vivienda, este programa puede ser la clave para no necesitar los 40.000-60.000€ de entrada. Ya se han concedido 10,6M€ en los primeros 4 meses. ¡Ve cuanto antes!
          </p>
        </div>
      </div>

      {/* Deducción IRPF */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-base font-bold text-[#7a9e6d]">🧾 Deducción IRPF Foral por compra de vivienda</div>
          <Badge color="#5a7a5a">ANUAL</Badge>
        </div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-3">
          En Álava, a diferencia del régimen común (donde se eliminó en 2013),{" "}
          <strong className="text-[#3d3528]">aún se puede deducir la compra de vivienda habitual</strong> en el IRPF foral. Esto es un privilegio del sistema foral vasco.
        </p>
        <div className="bg-[#f5f0e8] rounded-xl p-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-[#8a7e6d] mb-1">General</div>
              <div className="text-2xl font-bold text-[#7a9e6d]">18%</div>
              <div className="text-[11px] text-[#8a7e6d]">Límite ~1.530€/año</div>
            </div>
            <div>
              <div className="text-xs text-[#8a7e6d] mb-1">Menores de 36 años</div>
              <div className="text-2xl font-bold text-[#5a8a5a]">23%</div>
              <div className="text-[11px] text-[#8a7e6d]">Límite ~1.955€/año</div>
            </div>
          </div>
          <div className="mt-2.5 text-xs text-[#8a7e6d] leading-relaxed">
            Se deduce sobre las cantidades pagadas (cuotas hipotecarias). Base liquidable máxima para aplicar: 68.000€ (desde 2026).
            El año de formalización de la compra no tiene límite en la deducción. Familias numerosas y colectivos protegidos: 25% con límite de 2.346€.
          </div>
        </div>
      </div>

      {/* Cuenta vivienda */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🏦 Cuenta Vivienda (si aún estás ahorrando)</div>
        <p className="text-sm text-[#5a5040] leading-relaxed mb-2.5">
          En Álava se puede abrir una cuenta vivienda y deducir el{" "}
          <strong className="text-[#3d3528]">18% de lo ahorrado</strong> (23% si menor de 36) en la declaración.
          El dinero se debe destinar a comprar vivienda habitual en un plazo de{" "}
          <strong className="text-[#3d3528]">6 años</strong>.
        </p>
        <div className="bg-[#f5f0e8] rounded-xl p-3 text-xs text-[#8a7e6d] leading-relaxed">
          Novedad 2025: el plazo se ha ampliado de 5 a 6 años. Ideal si aún estás juntando la entrada.
        </div>
      </div>

      {/* Emantzipa */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🏡 Emantzipa — Ayuda a la emancipación</div>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          Ayuda de <strong className="text-[#3d3528]">300€/mes durante 2 años</strong> para jóvenes de 25-29 años, destinada a alquiler o hipoteca.
          Requisitos: empadronado en Euskadi, ingresos ≤30.000€/año (individual) o ≤36.764€ (unidad familiar). Compatible con otras ayudas.
        </p>
      </div>

      {/* Gaztelagun */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🎓 Gaztelagun — Ayuda al alquiler joven</div>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          Hasta el <strong className="text-[#3d3528]">60% del alquiler mensual (máx. 300€)</strong> para jóvenes de 18-35 años.
          Más orientado a alquiler, pero útil si necesitas un paso intermedio antes de comprar. Presupuesto 2025: 32M€, más de 8.000 beneficiarios.
        </p>
      </div>

      {/* ITP reducido */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">📉 ITP reducido en Álava</div>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          Si compras vivienda de segunda mano como habitual y ≤120m², el ITP baja del 4% al{" "}
          <strong className="text-[#5a8a5a]">2,5%</strong>. En un piso de 200.000€ eso son{" "}
          <strong className="text-[#3d3528]">3.000€ de ahorro</strong> solo en impuestos.
          Comparado con la Comunidad Valenciana (10%) te ahorras 15.000€.
        </p>
      </div>

      {/* Exención reinversión */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e0d4] mb-4">
        <div className="text-base font-bold text-[#7a9e6d] mb-2">🔄 Exención por reinversión en vivienda habitual</div>
        <p className="text-sm text-[#5a5040] leading-relaxed">
          Si en el futuro vendes tu vivienda habitual y reinviertes en otra, la ganancia patrimonial queda{" "}
          <strong className="text-[#5a8a5a]">exenta de IRPF</strong>. Plazo: 2 años antes o después de la venta. También exentos mayores de 65 años.
        </p>
      </div>

      {/* Estimación ahorro */}
      <div className="bg-gradient-to-br from-[#f8f4ed] to-[#faf7f2] rounded-2xl p-4 border border-[#5a7a5a22] mb-4">
        <div className="text-sm font-bold text-[#7a9e6d] mb-3">💰 Estimación del ahorro total (ejemplo)</div>
        <p className="text-sm text-[#5a5040] mb-3">
          Supongamos un piso de 200.000€ de segunda mano, vivienda habitual, ≤120m², menor de 36:
        </p>

        {[
          { label: "GazteAval (no necesitas 20% de entrada)", value: "Ahorro: ~40.000€ en efectivo necesario", color: "#5a8a5a" },
          { label: "ITP reducido (2,5% vs 4%)", value: "Ahorro: 3.000€", color: "#5a8a5a" },
          { label: "Deducción IRPF (23% x ~8.500€/año hipoteca)", value: "Ahorro: ~1.955€/año en impuestos", color: "#5a7a5a" },
          { label: "Emantzipa (si aplica, 25-29 años)", value: "Ahorro: hasta 7.200€ en 2 años", color: "#c0935a" },
        ].map((item, i) => (
          <div key={i} className={`flex justify-between py-2 text-sm ${i < 3 ? "border-b border-[#e8e0d4]" : ""}`}>
            <span className="text-[#5a5040]">{item.label}</span>
            <span className="font-semibold whitespace-nowrap ml-3" style={{ color: item.color }}>{item.value}</span>
          </div>
        ))}

        <div className="mt-3 p-3 bg-[#f5f0e8] rounded-xl text-center">
          <div className="text-xs text-[#8a7e6d]">Nota: los importes exactos dependen de las circunstancias de cada persona.</div>
          <div className="text-xs text-[#8a7e6d] mt-1">Consulta siempre con un asesor fiscal en Álava para optimizar al máximo.</div>
        </div>
      </div>

      {/* Links útiles */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4]">
        <div className="text-sm font-bold text-[#7a9e6d] mb-2.5">🔗 Enlaces útiles</div>
        {[
          { label: "GazteAval — Solicitud", url: "ivf-fei.euskadi.eus" },
          { label: "Gaztelagun — Alquiler joven", url: "euskadi.eus/gaztelagun" },
          { label: "Emantzipa — Emancipación", url: "euskadi.eus" },
          { label: "Hacienda Foral de Álava — IRPF", url: "web.araba.eus" },
          { label: "Etxebide — Registro demandantes vivienda", url: "etxebide.euskadi.eus" },
          { label: "Perales Digital — Precios por zona en Vitoria", url: "peralesdigital.com" },
        ].map((link, i) => (
          <div key={i} className={`flex justify-between py-2 text-sm ${i < 5 ? "border-b border-[#e8e0d4]" : ""}`}>
            <span className="text-[#5a5040]">{link.label}</span>
            <span className="text-[#5a7a5a] text-xs">{link.url}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
