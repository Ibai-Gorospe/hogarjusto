// Declaración de tipos para leaflet.heat
// El paquete no tiene @types, así que declaramos lo mínimo necesario

import * as L from "leaflet";

declare module "leaflet" {
  function heatLayer(
    latlngs: Array<[number, number] | [number, number, number]>,
    options?: {
      minOpacity?: number;
      maxZoom?: number;
      max?: number;
      radius?: number;
      blur?: number;
      gradient?: Record<number, string>;
    }
  ): L.Layer;
}
