"use client";

import { useState, useEffect } from "react";

// Hook personalizado para guardar estado en localStorage
// Funciona igual que useState pero persiste los datos entre sesiones
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Inicializar con el valor guardado o el valor por defecto
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const saved = localStorage.getItem("hogar_" + key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Guardar automáticamente cuando cambie el valor
  useEffect(() => {
    try {
      localStorage.setItem("hogar_" + key, JSON.stringify(value));
    } catch {
      // localStorage lleno o no disponible — ignorar
    }
  }, [key, value]);

  return [value, setValue] as const;
}
