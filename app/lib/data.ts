// Datos de mercado de Vitoria-Gasteiz — enero 2026
// Fuentes: General Inmobiliaria, Perales Digital, tasadorexperto.es, Observatorio Vasco de Vivienda
// 56 zonas con serie histórica 2015-2026

export type TipoBarrio = "premium" | "medio-alto" | "medio" | "asequible" | "económico";

/** Años correspondientes a cada posición del array historico */
export const AÑOS_HISTORICO = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export interface Barrio {
  id: number;           // ID de zona (portales inmobiliarios)
  name: string;         // Nombre de la zona
  precioM2: number;     // Precio actual €/m² (enero 2026)
  var: number;          // Variación interanual 2025→2026 (%)
  tipo: TipoBarrio;     // Clasificación por rango de precio
  lat: number;
  lng: number;
  historico: number[];  // Serie de precios €/m² [2015..2026] (12 valores, 0 = sin datos)
}

export const BARRIOS: Barrio[] = [
  { id: 33, name: "Abetxuko", precioM2: 2216, var: 22.0, tipo: "asequible", lat: 42.87511, lng: -2.68041, historico: [928, 1048, 1131, 1191, 1310, 1441, 1484, 1652, 1652, 1652, 1817, 2216] },
  { id: 49, name: "Ali Nuevo", precioM2: 2870, var: 20.0, tipo: "medio", lat: 42.85854, lng: -2.70976, historico: [1551, 1776, 1932, 2045, 2126, 2338, 2338, 2338, 2279, 2279, 2392, 2870] },
  { id: 30, name: "Ali Viejo", precioM2: 1995, var: 20.0, tipo: "económico", lat: 42.86363, lng: -2.71637, historico: [1009, 1021, 1092, 1187, 1246, 1308, 1308, 1438, 1509, 1584, 1663, 1995] },
  { id: 19, name: "Arana", precioM2: 2708, var: 18.0, tipo: "asequible", lat: 42.84899, lng: -2.65912, historico: [1305, 1368, 1464, 1591, 1877, 1844, 1807, 1987, 1987, 2087, 2295, 2708] },
  { id: 8, name: "Aranbizkarra", precioM2: 2780, var: 24.0, tipo: "asequible", lat: 42.85508, lng: -2.66167, historico: [1464, 1652, 1783, 1877, 2027, 2027, 1986, 2085, 2147, 2039, 2242, 2780] },
  { id: 39, name: "Arantzabal-Castilla Sur", precioM2: 5572, var: 10.0, tipo: "premium", lat: 42.84456, lng: -2.68157, historico: [3910, 4246, 4486, 4630, 5093, 5347, 5347, 5347, 4919, 4919, 5066, 5572] },
  { id: 18, name: "Aranzabela", precioM2: 3148, var: 21.0, tipo: "medio", lat: 42.85294, lng: -2.65625, historico: [1489, 1681, 1814, 1910, 2139, 2151, 2151, 2366, 2366, 2366, 2602, 3148] },
  { id: 25, name: "Ariznabarra", precioM2: 3570, var: 21.4, tipo: "medio-alto", lat: 42.84186, lng: -2.68993, historico: [1760, 1986, 2144, 2257, 2437, 2485, 2485, 2658, 2724, 2724, 2941, 3570] },
  { id: 24, name: "Armentia", precioM2: 4606, var: 15.0, tipo: "premium", lat: 42.83519, lng: -2.69852, historico: [3062, 3248, 3381, 3461, 3564, 3742, 3742, 3816, 3816, 3816, 4006, 4606] },
  { id: 52, name: "Armentia-Caserón", precioM2: 4158, var: 13.0, tipo: "medio-alto", lat: 42.83192, lng: -2.70268, historico: [2858, 3052, 3191, 3274, 3437, 3505, 3505, 3505, 3505, 3505, 3680, 4158] },
  { id: 34, name: "Asteguieta", precioM2: 1657, var: 25.0, tipo: "económico", lat: 42.86093, lng: -2.73057, historico: [972, 1019, 1090, 1185, 1185, 1185, 1149, 1263, 1263, 1263, 1326, 1657] },
  { id: 15, name: "Avenida Gasteiz", precioM2: 4024, var: 10.0, tipo: "medio-alto", lat: 42.8496, lng: -2.68137, historico: [2136, 2312, 2438, 2513, 2764, 3178, 3336, 3669, 3669, 3485, 3659, 4024] },
  { id: 50, name: "Betoño Chalets", precioM2: 2850, var: 12.0, tipo: "medio", lat: 42.86313, lng: -2.66401, historico: [1733, 1955, 2110, 2222, 2355, 2355, 2355, 2355, 2355, 2355, 2545, 2850] },
  { id: 60, name: "Betoño Pisos", precioM2: 1722, var: 19.1, tipo: "económico", lat: 42.87103, lng: -2.67191, historico: [825, 931, 1005, 1058, 1216, 1216, 1216, 1313, 1313, 1378, 1446, 1722] },
  { id: 1, name: "Casco Viejo", precioM2: 2196, var: 13.1, tipo: "económico", lat: 42.849, lng: -2.672, historico: [1427, 1574, 1684, 1830, 1920, 1824, 1735, 1908, 1850, 1850, 1942, 2196] },
  { id: 4, name: "Centro", precioM2: 3799, var: 15.0, tipo: "medio-alto", lat: 42.84552, lng: -2.67129, historico: [2249, 2434, 2567, 2646, 2910, 2979, 3068, 3313, 3147, 3147, 3304, 3799] },
  { id: 13, name: "Ciudad Jardín", precioM2: 4750, var: 13.0, tipo: "premium", lat: 42.83796, lng: -2.6768, historico: [3040, 3100, 3260, 3400, 3502, 3780, 3780, 3855, 3855, 3855, 4204, 4750] },
  { id: 6, name: "Coronación", precioM2: 2498, var: 15.0, tipo: "asequible", lat: 42.85209, lng: -2.67708, historico: [1353, 1419, 1518, 1650, 1730, 1765, 1765, 1976, 1976, 1976, 2173, 2498] },
  { id: 11, name: "Desamparadas-Plaza de Toros", precioM2: 4204, var: 14.0, tipo: "medio-alto", lat: 42.84133, lng: -2.66526, historico: [2204, 2369, 2487, 2558, 2941, 2999, 3058, 3363, 3447, 3447, 3688, 4204] },
  { id: 16, name: "El Pilar", precioM2: 2778, var: 16.0, tipo: "asequible", lat: 42.85822, lng: -2.67684, historico: [1280, 1445, 1559, 1642, 1888, 1941, 1999, 2198, 2252, 2139, 2395, 2778] },
  { id: 46, name: "Frente Hotel Lakua-Aramangelu", precioM2: 3390, var: 12.0, tipo: "medio", lat: 42.86849, lng: -2.68579, historico: [1661, 1875, 2023, 2130, 2343, 2575, 2497, 2746, 2746, 2883, 3027, 3390] },
  { id: 28, name: "Gazalbide-San Viator", precioM2: 3100, var: 16.0, tipo: "medio", lat: 42.85559, lng: -2.68257, historico: [1812, 2032, 2185, 2295, 2478, 2476, 2426, 2546, 2546, 2546, 2673, 3100] },
  { id: 61, name: "Goikolarra-Aretxabaleta", precioM2: 4255, var: 15.0, tipo: "medio-alto", lat: 42.82695, lng: -2.6738, historico: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3700, 4255] },
  { id: 41, name: "Ibaiondo", precioM2: 3046, var: 15.0, tipo: "medio", lat: 42.86926, lng: -2.69401, historico: [1660, 1873, 2022, 2129, 2341, 2341, 2294, 2523, 2523, 2523, 2649, 3046] },
  { id: 22, name: "Iturritxu-Zumaquera", precioM2: 3036, var: 17.0, tipo: "medio", lat: 42.83551, lng: -2.66687, historico: [1450, 1636, 1766, 1859, 2007, 2007, 2007, 2207, 2317, 2317, 2595, 3036] },
  { id: 10, name: "Judimendi", precioM2: 3300, var: 18.0, tipo: "medio", lat: 42.84532, lng: -2.66152, historico: [1500, 1694, 1828, 1925, 2213, 2434, 2434, 2677, 2677, 2543, 2797, 3300] },
  { id: 38, name: "Lakua-Baiona-Estella", precioM2: 3228, var: 18.0, tipo: "medio", lat: 42.86412, lng: -2.69425, historico: [1601, 1806, 1950, 2053, 2196, 2240, 2195, 2370, 2370, 2488, 2736, 3228] },
  { id: 36, name: "Lakua-Ertzaintza", precioM2: 3496, var: 15.0, tipo: "medio", lat: 42.86389, lng: -2.68603, historico: [1816, 2050, 2212, 2329, 2515, 2640, 2560, 2764, 2764, 2764, 3040, 3496] },
  { id: 37, name: "Lakua-Estación Autobuses", precioM2: 3923, var: 14.0, tipo: "medio-alto", lat: 42.85912, lng: -2.68535, historico: [1841, 2016, 2208, 2346, 2627, 2889, 2975, 3123, 3123, 3279, 3442, 3923] },
  { id: 29, name: "Lakua-Juntas Generales", precioM2: 2964, var: 20.0, tipo: "medio", lat: 42.86508, lng: -2.68023, historico: [1446, 1633, 1762, 1855, 2003, 2103, 2060, 2163, 2206, 2206, 2470, 2964] },
  { id: 45, name: "Lakua-Landaberde-Xabier", precioM2: 3065, var: 22.0, tipo: "medio", lat: 42.86502, lng: -2.69809, historico: [1912, 1985, 2037, 2194, 2303, 2303, 2233, 2456, 2394, 2394, 2513, 3065] },
  { id: 44, name: "Lakua-Plaza Cataluña", precioM2: 3489, var: 20.0, tipo: "medio", lat: 42.8673, lng: -2.69064, historico: [1688, 1906, 2057, 2165, 2489, 2538, 2461, 2707, 2639, 2770, 2908, 3489] },
  { id: 32, name: "Lakua-Telefónica", precioM2: 3294, var: 20.0, tipo: "medio", lat: 42.85653, lng: -2.6934, historico: [1433, 1618, 1746, 1839, 2022, 2224, 2224, 2335, 2335, 2451, 2745, 3294] },
  { id: 3, name: "Los Herrán-Arana", precioM2: 2998, var: 15.0, tipo: "medio", lat: 42.84614, lng: -2.6654, historico: [1879, 2121, 2289, 2410, 2530, 2530, 2530, 2656, 2576, 2370, 2607, 2998] },
  { id: 5, name: "Lovaina-Catedral Nueva", precioM2: 4461, var: 10.0, tipo: "medio-alto", lat: 42.84605, lng: -2.67837, historico: [2509, 2691, 2821, 2899, 3333, 3666, 3739, 3963, 3863, 3863, 4056, 4461] },
  { id: 14, name: "Mendizabala-Parque Prado", precioM2: 4579, var: 13.0, tipo: "premium", lat: 42.83689, lng: -2.68212, historico: [3100, 3250, 3250, 3500, 3605, 3785, 3785, 3860, 3860, 3860, 4053, 4579] },
  { id: 2, name: "Parque del Norte", precioM2: 2733, var: 14.0, tipo: "asequible", lat: 42.85461, lng: -2.67121, historico: [1716, 1936, 2090, 2200, 2350, 2232, 2187, 2405, 2405, 2284, 2398, 2733] },
  { id: 58, name: "Salburua Carta de Atenas-Aalbor", precioM2: 4054, var: 14.9, tipo: "medio-alto", lat: 42.85095, lng: -2.64679, historico: [2024, 2310, 2509, 2652, 2917, 2917, 2917, 3208, 3208, 3208, 3528, 4054] },
  { id: 59, name: "Salburua Juan Carlos I", precioM2: 3754, var: 12.0, tipo: "medio-alto", lat: 42.85579, lng: -2.65599, historico: [1865, 2130, 2315, 2448, 2815, 2815, 2758, 2978, 2903, 3048, 3352, 3754] },
  { id: 56, name: "Salburua S10-13 Izarra", precioM2: 3026, var: 20.0, tipo: "medio", lat: 42.84051, lng: -2.65251, historico: [1457, 1670, 1818, 1925, 2117, 2222, 2222, 2333, 2402, 2402, 2522, 3026] },
  { id: 57, name: "Salburua S9-Parque del Este", precioM2: 4458, var: 13.0, tipo: "medio-alto", lat: 42.84537, lng: -2.65182, historico: [1906, 2176, 2365, 2500, 2875, 3162, 3256, 3418, 3418, 3588, 3946, 4458] },
  { id: 55, name: "Salburua-Ibaialde-Arkaiate", precioM2: 3157, var: 15.0, tipo: "medio", lat: 42.84717, lng: -2.64378, historico: [1672, 1912, 2080, 2200, 2420, 2420, 2347, 2628, 2693, 2693, 2746, 3157] },
  { id: 12, name: "San Cristóbal-Fournier", precioM2: 3135, var: 11.0, tipo: "medio", lat: 42.83961, lng: -2.66811, historico: [1561, 1762, 1901, 2002, 2142, 2250, 2317, 2432, 2492, 2616, 2825, 3135] },
  { id: 26, name: "San Martín-Abendaño", precioM2: 4314, var: 10.0, tipo: "medio-alto", lat: 42.85164, lng: -2.68679, historico: [2070, 2323, 2499, 2626, 2888, 3027, 3178, 3559, 3736, 3736, 3922, 4314] },
  { id: 31, name: "Sansomendi", precioM2: 2642, var: 20.0, tipo: "asequible", lat: 42.85634, lng: -2.69843, historico: [1305, 1368, 1464, 1591, 1718, 1803, 1766, 1907, 1907, 2002, 2202, 2642] },
  { id: 20, name: "Santa Lucía-Astrónomos", precioM2: 3167, var: 19.0, tipo: "medio", lat: 42.8435, lng: -2.65672, historico: [1414, 1595, 1722, 1713, 2084, 2167, 2167, 2427, 2548, 2420, 2662, 3167] },
  { id: 9, name: "Santiago", precioM2: 2909, var: 11.7, tipo: "medio", lat: 42.84844, lng: -2.66339, historico: [1682, 1898, 2049, 2157, 2351, 2398, 2350, 2538, 2664, 2530, 2605, 2909] },
  { id: 23, name: "Sector Sur-Río Batán", precioM2: 4782, var: 18.0, tipo: "premium", lat: 42.84105, lng: -2.68195, historico: [2975, 3080, 3395, 3500, 3605, 3785, 3785, 3860, 3860, 3860, 4053, 4782] },
  { id: 40, name: "Seminario", precioM2: 3645, var: 13.0, tipo: "medio-alto", lat: 42.85104, lng: -2.69006, historico: [2168, 2446, 2641, 2780, 2919, 2919, 2831, 3057, 3133, 3133, 3226, 3645] },
  { id: 27, name: "Txagorritxu-B.T. Zumárraga", precioM2: 3647, var: 10.0, tipo: "medio-alto", lat: 42.853, lng: -2.684, historico: [1642, 1841, 1979, 2078, 2223, 2445, 2518, 2820, 2820, 2961, 3316, 3647] },
  { id: 51, name: "Zabalgana-Borinbizkarra", precioM2: 3532, var: 15.0, tipo: "medio-alto", lat: 42.852, lng: -2.7, historico: [1772, 2012, 2180, 2300, 2530, 2530, 2530, 2656, 2841, 2983, 3072, 3532] },
  { id: 48, name: "Zabalgana-S2 Senda Río Ali", precioM2: 4116, var: 10.0, tipo: "medio-alto", lat: 42.84282, lng: -2.69609, historico: [1828, 2088, 2270, 2400, 2760, 2760, 2842, 3126, 3204, 3402, 3742, 4116] },
  { id: 47, name: "Zabalgana-S3 Leclerc", precioM2: 4077, var: 12.0, tipo: "medio-alto", lat: 42.83883, lng: -2.69932, historico: [2041, 2329, 2530, 2674, 2941, 2999, 3058, 3303, 3303, 3468, 3641, 4077] },
  { id: 54, name: "Zabalgana-S6 Mariturri", precioM2: 3214, var: 12.0, tipo: "medio", lat: 42.83995, lng: -2.70738, historico: [1524, 1746, 1900, 2011, 2312, 2543, 2543, 2746, 2814, 2814, 2870, 3214] },
  { id: 17, name: "Zaramaga-Centro Comercial Bulevar", precioM2: 2625, var: 20.0, tipo: "asequible", lat: 42.8615, lng: -2.66805, historico: [1133, 1189, 1271, 1382, 1616, 1777, 1777, 1954, 1954, 1954, 2188, 2625] },
  { id: 7, name: "Zaramaga-Iparralde", precioM2: 2498, var: 14.0, tipo: "asequible", lat: 42.85504, lng: -2.66756, historico: [1406, 1475, 1578, 1715, 1800, 1836, 1780, 1993, 1993, 1993, 2192, 2498] },
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

// Color por precio €/m² (adaptado al rango 1.600–5.600 de las 56 zonas)
export const getColor = (precio: number): string => {
  if (precio >= 4500) return "#c0534f"; // premium alto
  if (precio >= 3500) return "#c0735e"; // medio-alto
  if (precio >= 3000) return "#d4956a"; // medio
  if (precio >= 2500) return "#c4a55a"; // asequible
  if (precio >= 2000) return "#7a9e6d"; // económico
  return "#5a8a5a";                     // muy económico
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
