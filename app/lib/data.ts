// Datos de mercado de Vitoria-Gasteiz — enero 2026
// Fuentes: General Inmobiliaria, Perales Digital, tasadorexperto.es, Observatorio Vasco de Vivienda

export type TipoBarrio = "premium" | "medio-alto" | "medio" | "asequible" | "económico";

export interface Barrio {
  name: string;
  precioM2: number;
  var: number; // variación interanual %
  tipo: TipoBarrio;
  lat: number;
  lng: number;
  desc: string;
  servicios: number; // 1-10
  transporte: number;
  zonaVerde: number;
  ambiente: string;
}

export const BARRIOS: Barrio[] = [
  { name: "Ensanche", precioM2: 3500, var: 8.0, tipo: "premium", lat: 42.847, lng: -2.673, desc: "Centro comercial y financiero, edificios históricos renovados", servicios: 10, transporte: 10, zonaVerde: 6, ambiente: "Urbano céntrico" },
  { name: "Lovaina", precioM2: 3300, var: 7.0, tipo: "premium", lat: 42.851, lng: -2.675, desc: "Zona noble junto a la Catedral Nueva, pisos amplios", servicios: 9, transporte: 9, zonaVerde: 5, ambiente: "Residencial señorial" },
  { name: "Mendizorrotza", precioM2: 2850, var: 5.0, tipo: "premium", lat: 42.838, lng: -2.688, desc: "Zona del estadio del Alavés, amplias zonas deportivas", servicios: 7, transporte: 7, zonaVerde: 9, ambiente: "Deportivo/residencial" },
  { name: "San Martín", precioM2: 2800, var: 5.0, tipo: "medio-alto", lat: 42.852, lng: -2.680, desc: "Barrio céntrico consolidado, ambiente familiar", servicios: 9, transporte: 9, zonaVerde: 6, ambiente: "Familiar céntrico" },
  { name: "Desamparados", precioM2: 2900, var: 7.0, tipo: "medio-alto", lat: 42.849, lng: -2.668, desc: "Muy bien ubicado, cerca del Ensanche", servicios: 8, transporte: 9, zonaVerde: 5, ambiente: "Urbano residencial" },
  { name: "Salburua", precioM2: 3200, var: 12.0, tipo: "premium", lat: 42.846, lng: -2.645, desc: "Barrio nuevo, humedales protegidos, familias jóvenes", servicios: 8, transporte: 7, zonaVerde: 10, ambiente: "Moderno familiar" },
  { name: "Judimendi", precioM2: 2650, var: 8.0, tipo: "medio", lat: 42.843, lng: -2.665, desc: "Rica historia, mezcla de tradición y modernidad", servicios: 8, transporte: 8, zonaVerde: 6, ambiente: "Tradicional vibrante" },
  { name: "Ariznabarra", precioM2: 2550, var: 7.0, tipo: "medio", lat: 42.840, lng: -2.685, desc: "Zona mixta, parte antigua más económica", servicios: 7, transporte: 7, zonaVerde: 7, ambiente: "Mixto residencial" },
  { name: "Txagorritxu", precioM2: 2700, var: 10.0, tipo: "medio", lat: 42.854, lng: -2.685, desc: "Cerca del hospital, subida fuerte de precios", servicios: 8, transporte: 8, zonaVerde: 5, ambiente: "Urbano práctico" },
  { name: "Lakua-Arriaga", precioM2: 3000, var: 10.0, tipo: "medio-alto", lat: 42.862, lng: -2.678, desc: "Residencial tranquilo, bien comunicado", servicios: 7, transporte: 8, zonaVerde: 7, ambiente: "Residencial moderno" },
  { name: "Zabalgana", precioM2: 3100, var: 8.0, tipo: "medio-alto", lat: 42.855, lng: -2.710, desc: "Desarrollo reciente, planificación moderna", servicios: 7, transporte: 6, zonaVerde: 8, ambiente: "Moderno en expansión" },
  { name: "Adurtza", precioM2: 2350, var: 7.0, tipo: "asequible", lat: 42.838, lng: -2.665, desc: "Clase trabajadora, nuevas promociones en Esmaltaciones", servicios: 6, transporte: 7, zonaVerde: 6, ambiente: "Obrero en renovación" },
  { name: "Casco Viejo", precioM2: 1950, var: 5.0, tipo: "asequible", lat: 42.849, lng: -2.672, desc: "Centro histórico medieval, mucho encanto, pisos pequeños", servicios: 8, transporte: 9, zonaVerde: 4, ambiente: "Histórico con carácter" },
  { name: "Coronación", precioM2: 2200, var: 8.0, tipo: "asequible", lat: 42.857, lng: -2.670, desc: "Muchas transacciones, barrio activo", servicios: 7, transporte: 7, zonaVerde: 5, ambiente: "Popular dinámico" },
  { name: "Santa Lucía", precioM2: 2300, var: 8.0, tipo: "asequible", lat: 42.845, lng: -2.660, desc: "Zona en revalorización", servicios: 6, transporte: 7, zonaVerde: 5, ambiente: "En transformación" },
  { name: "Sansomendi", precioM2: 1950, var: 8.0, tipo: "económico", lat: 42.866, lng: -2.672, desc: "Demanda creciente, zonas verdes amplias", servicios: 6, transporte: 6, zonaVerde: 7, ambiente: "Popular accesible" },
  { name: "El Pilar", precioM2: 2750, var: 12.0, tipo: "medio", lat: 42.852, lng: -2.672, desc: "Edificios años 60-70, cerca del centro, fuerte subida", servicios: 7, transporte: 8, zonaVerde: 5, ambiente: "Práctico céntrico" },
  { name: "Zaramaga", precioM2: 2300, var: 10.0, tipo: "asequible", lat: 42.860, lng: -2.665, desc: "Origen obrero, junto CC Boulevard, en auge", servicios: 7, transporte: 7, zonaVerde: 4, ambiente: "Popular comercial" },
  { name: "Aranbizkarra", precioM2: 2250, var: 8.0, tipo: "asequible", lat: 42.863, lng: -2.660, desc: "De los más económicos, subida notable", servicios: 5, transporte: 6, zonaVerde: 5, ambiente: "Económico funcional" },
  { name: "Abetxuko", precioM2: 1900, var: 10.0, tipo: "económico", lat: 42.870, lng: -2.680, desc: "El más asequible urbano, buena opción primeros compradores", servicios: 5, transporte: 5, zonaVerde: 6, ambiente: "Económico periférico" },
  { name: "Armentia", precioM2: 2900, var: 5.0, tipo: "premium", lat: 42.832, lng: -2.695, desc: "Residencial exclusivo, entorno natural, Parque de Armentia", servicios: 5, transporte: 5, zonaVerde: 10, ambiente: "Exclusivo natural" },
];

// ============================================================
// Geocodificación y cálculo de precio por ubicación
// ============================================================

/**
 * Distancia en metros entre dos puntos (fórmula de Haversine).
 * Precisa para distancias cortas dentro de una ciudad.
 */
export function distanciaMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Radio de la Tierra en metros
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Resultado de la interpolación de precio por ubicación.
 */
export interface PrecioUbicacion {
  precioM2: number;          // Precio interpolado €/m²
  barrioMasCercano: string;  // Nombre del barrio más cercano
  distanciaBarrio: number;   // Distancia al barrio más cercano en metros
  confianza: "alta" | "media" | "baja"; // Según distancia al centro urbano
}

/**
 * Calcula el precio de referencia €/m² para unas coordenadas dadas,
 * usando interpolación por distancia inversa ponderada (IDW).
 *
 * En vez de asignar el precio plano de un barrio, pondera los precios
 * de los barrios cercanos según la distancia inversa al cuadrado.
 * Esto crea una transición suave entre barrios y elimina los saltos
 * bruscos en las fronteras.
 *
 * Parámetro `potencia`:
 *   - 2 (default): transición suave, influencia amplia de barrios cercanos
 *   - 3: transición más local, el barrio más cercano domina más
 *
 * Solo se consideran barrios dentro del radio máximo (3km por defecto).
 */
export function calcularPrecioReferencia(
  lat: number,
  lng: number,
  potencia: number = 2,
  radioMaxMetros: number = 3000
): PrecioUbicacion {
  // Calcular distancia a cada barrio
  const distancias = BARRIOS.map(b => ({
    barrio: b,
    dist: distanciaMetros(lat, lng, b.lat, b.lng),
  }));

  // Ordenar por cercanía
  distancias.sort((a, b) => a.dist - b.dist);

  const masCercano = distancias[0];

  // Si estamos prácticamente encima de un centro de barrio (<50m),
  // usar directamente su precio
  if (masCercano.dist < 50) {
    return {
      precioM2: masCercano.barrio.precioM2,
      barrioMasCercano: masCercano.barrio.name,
      distanciaBarrio: Math.round(masCercano.dist),
      confianza: "alta",
    };
  }

  // Filtrar solo barrios dentro del radio máximo
  const cercanos = distancias.filter(d => d.dist <= radioMaxMetros);

  // Si no hay barrios dentro del radio (ubicación fuera de Vitoria),
  // usar el más cercano con confianza baja
  if (cercanos.length === 0) {
    return {
      precioM2: masCercano.barrio.precioM2,
      barrioMasCercano: masCercano.barrio.name,
      distanciaBarrio: Math.round(masCercano.dist),
      confianza: "baja",
    };
  }

  // Interpolación por distancia inversa ponderada (IDW)
  let sumaPesoPrecio = 0;
  let sumaPesos = 0;

  for (const { barrio, dist } of cercanos) {
    const peso = 1 / dist ** potencia;
    sumaPesoPrecio += peso * barrio.precioM2;
    sumaPesos += peso;
  }

  const precioInterpolado = Math.round(sumaPesoPrecio / sumaPesos);

  // Confianza según distancia al barrio más cercano
  let confianza: "alta" | "media" | "baja";
  if (masCercano.dist <= 500) confianza = "alta";
  else if (masCercano.dist <= 1500) confianza = "media";
  else confianza = "baja";

  return {
    precioM2: precioInterpolado,
    barrioMasCercano: masCercano.barrio.name,
    distanciaBarrio: Math.round(masCercano.dist),
    confianza,
  };
}

/**
 * Geocodifica una dirección usando la API de Nominatim (OpenStreetMap).
 * Gratuita, sin API key, límite de 1 petición/segundo.
 * Devuelve null si no encuentra resultados.
 */
export async function geocodificarDireccion(
  direccion: string
): Promise<{ lat: number; lng: number; displayName: string } | null> {
  // Añadir "Vitoria-Gasteiz" si no lo incluye para mejorar resultados
  const query = direccion.toLowerCase().includes("vitoria")
    ? direccion
    : `${direccion}, Vitoria-Gasteiz, Álava`;

  const url = `https://nominatim.openstreetmap.org/search?` +
    `format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=es` +
    `&viewbox=-2.75,42.90,-2.60,42.81&bounded=1`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "HogarJusto/1.0 (hogarjusto.es)" },
    });
    const data = await res.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }
    return null;
  } catch {
    return null;
  }
}

// ============================================================
// Resto de utilidades (sin cambios)
// ============================================================

// Nombres de las pestañas
export const TABS = ["Mapa de Precios", "¿Precio justo?", "Costes Compra", "Hipoteca", "Checklist", "Ayudas", "Guía"];

// Checklist del proceso de compra
export const CHECKLIST_ITEMS = [
  { fase: "Preparación", items: ["Calcular presupuesto máximo (precio + gastos)", "Consultar si tengo derecho a ITP reducido (2,5%)", "Revisar ayudas: GazteAval, deducciones IRPF, Emantzipa", "Inscribirme en Etxebide (VPO)", "Pedir informe CIRBE (gratis en Banco de España)", "Ahorrar para la entrada (mínimo 10-20% del precio)"] },
  { fase: "Búsqueda", items: ["Definir zona/barrios preferidos", "Activar alertas en Idealista y Fotocasa", "Visitar al menos 8-10 pisos antes de decidir", "Apuntar pros/contras de cada visita", "Comprobar precios medios del barrio en HogarJusto"] },
  { fase: "Análisis", items: ["Valorar el piso en HogarJusto (¿precio justo?)", "Pedir nota simple del Registro (9€ online)", "Revisar certificado energético", "Preguntar por ITE del edificio", "Consultar IBI anual y cuota de comunidad", "Pedir actas de últimas juntas de vecinos", "Comprobar si hay derramas previstas"] },
  { fase: "Financiación", items: ["Pedir hipoteca en al menos 3-4 bancos", "Comparar FEIN de cada oferta", "Considerar bróker hipotecario", "Obtener preaprobación antes de ofertar"] },
  { fase: "Negociación y compra", items: ["Hacer oferta razonada (5-10% por debajo si procede)", "Firmar contrato de arras (con hipoteca preaprobada)", "Elegir notario (derecho del comprador)", "Revisar escritura antes de firmar", "Firmar ante notario", "Pagar impuestos (ITP o IVA+AJD)", "Inscribir en el Registro de la Propiedad", "Dar de alta suministros", "¡Mudanza y celebración!"] },
];

// Funciones de formato
export const formatEur = (n: number): string =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const formatPct = (n: number): string =>
  (n >= 0 ? "+" : "") + n.toFixed(1) + "%";

// Color por precio €/m²
export const getColor = (precio: number): string => {
  if (precio >= 3000) return "#c0735e";
  if (precio >= 2600) return "#d4956a";
  if (precio >= 2200) return "#c4a55a";
  if (precio >= 1900) return "#7a9e6d";
  return "#5a8a5a";
};

// Etiqueta legible del tipo de barrio
export const getLabel = (tipo: TipoBarrio): string => {
  const map: Record<string, string> = {
    premium: "Premium",
    "medio-alto": "Medio-Alto",
    medio: "Medio",
    asequible: "Asequible",
    "económico": "Económico",
  };
  return map[tipo] || tipo;
};

// Tipo para los pisos que valora el usuario
export interface PisoForm {
  nombre: string;
  url: string;
  barrio: string;        // Se asigna automáticamente desde la dirección
  direccion: string;     // NUEVO: dirección introducida por el usuario
  lat: number | null;    // NUEVO: latitud geocodificada
  lng: number | null;    // NUEVO: longitud geocodificada
  precio: number | string;
  m2: number | string;
  planta: number;
  ascensor: boolean;
  estado: string;
  energetica: string;
  exterior: boolean;
  orientacionSur: boolean;
  garaje: boolean;
  trastero: boolean;
  terraza: boolean;
  antiguedad: string;
  notas: string;
}

export interface Piso extends PisoForm {
  id: number;
  precio: number;
  m2: number;
}

// Resultado de la valoración
export interface Valoracion {
  precioEstimado: number;
  precioM2Est: number;
  precioM2Pedido: number;
  diferencia: number;
  veredicto: string;
  vColor: string;
  baseBarrio: number;       // Precio de referencia usado (interpolado o de barrio)
  barrioNombre: string;     // NUEVO: nombre del barrio más cercano
  confianza: "alta" | "media" | "baja"; // NUEVO: confianza de la estimación
}

/**
 * Modelo de valoración: estima precio justo.
 *
 * Si el piso tiene coordenadas (lat/lng), usa interpolación geográfica
 * para calcular el precio base. Si no, usa el barrio seleccionado
 * (retrocompatibilidad con pisos guardados sin coordenadas).
 */
export const valorarPiso = (p: Piso): Valoracion | null => {
  let basePrecioM2: number;
  let barrioNombre: string;
  let confianza: "alta" | "media" | "baja" = "alta";

  if (p.lat && p.lng) {
    // NUEVO: usar interpolación geográfica
    const ref = calcularPrecioReferencia(p.lat, p.lng);
    basePrecioM2 = ref.precioM2;
    barrioNombre = ref.barrioMasCercano;
    confianza = ref.confianza;
  } else {
    // Retrocompatibilidad: usar barrio seleccionado manualmente
    const barrio = BARRIOS.find(b => b.name === p.barrio);
    if (!barrio) return null;
    basePrecioM2 = barrio.precioM2;
    barrioNombre = barrio.name;
  }

  let base = basePrecioM2;

  // Ajuste por estado
  const estadoAdj: Record<string, number> = { "nuevo": 0.12, "reformado": 0.05, "bueno": 0, "a reformar": -0.20 };
  base *= (1 + (estadoAdj[p.estado] || 0));

  // Ajuste por planta y ascensor
  if (!p.ascensor && p.planta >= 3) base *= 0.92;
  else if (!p.ascensor && p.planta <= 1) base *= 0.95;
  else if (p.ascensor && p.planta >= 5) base *= 1.04;
  else if (p.ascensor && p.planta >= 3) base *= 1.02;
  else if (p.planta === 0) base *= 0.90;

  // Ajuste por interior/exterior
  if (!p.exterior) base *= 0.88;

  // Ajuste por orientación sur (relevante en Vitoria por clima frío)
  if (p.orientacionSur) base *= 1.03;

  // Ajuste por extras
  if (p.garaje) base *= 1.05;
  if (p.trastero) base *= 1.02;
  if (p.terraza) base *= 1.04;

  // Ajuste por antigüedad del edificio
  const antAdj: Record<string, number> = { "pre1970": -0.10, "1970s-80s": -0.05, "1990s": 0, "2000s": 0.03, "2010s+": 0.06 };
  base *= (1 + (antAdj[p.antiguedad] || 0));

  // Ajuste por certificado energético
  const enerAdj: Record<string, number> = { "A": 0.05, "B": 0.03, "C": 0.01, "D": 0, "E": -0.02, "F": -0.04, "G": -0.06 };
  base *= (1 + (enerAdj[p.energetica] || 0));

  // Ajuste superficie: pisos más pequeños tienen €/m² más alto
  if (p.m2 < 60) base *= 1.06;
  else if (p.m2 < 80) base *= 1.02;
  else if (p.m2 > 120) base *= 0.96;
  else if (p.m2 > 100) base *= 0.98;

  const precioEstimado = Math.round(base * p.m2);
  const precioM2Pedido = p.precio / p.m2;
  const diferencia = ((p.precio - precioEstimado) / precioEstimado) * 100;

  let veredicto: string, vColor: string;
  if (diferencia < -12) { veredicto = "Muy por debajo — ¡chollo o hay gato encerrado!"; vColor = "#2e7d32"; }
  else if (diferencia < -5) { veredicto = "Buen precio — por debajo de lo esperado"; vColor = "#5a8a5a"; }
  else if (diferencia < 5) { veredicto = "Precio justo — en línea con el mercado"; vColor = "#c0935a"; }
  else if (diferencia < 12) { veredicto = "Algo caro — hay margen para negociar"; vColor = "#c0735e"; }
  else { veredicto = "Caro — negocia fuerte o descarta"; vColor = "#c0534f"; }

  return {
    precioEstimado,
    precioM2Est: Math.round(base),
    precioM2Pedido: Math.round(precioM2Pedido),
    diferencia,
    veredicto,
    vColor,
    baseBarrio: basePrecioM2,
    barrioNombre,
    confianza,
  };
};
