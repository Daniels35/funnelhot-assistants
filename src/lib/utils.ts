import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. SEGURIDAD: Función para limpiar entradas (Satanizar)
export function sanitizeInput(text: string): string {
  if (!text) return "";
  // Elimina etiquetas HTML básicas para evitar inyecciones simples
  return text.replace(/<[^>]*>?/gm, "").trim();
}