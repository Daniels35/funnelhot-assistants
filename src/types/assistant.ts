// src/types/assistant.ts

export type AssistantTone = 'Formal' | 'Casual' | 'Profesional' | 'Amigable';
export type AssistantLanguage = 'Español' | 'Inglés' | 'Portugués';

export interface ResponseConfig {
  short: number;
  medium: number;
  long: number;
  audioEnabled: boolean;
}

export interface Assistant {
  id: string;
  name: string;
  language: AssistantLanguage;
  tone: AssistantTone;
  responseConfig: ResponseConfig;
  createdAt: string;
  trainingData?: string; // Prompt del sistema
}

// Datos de prueba iniciales (Mock Data)
export const INITIAL_ASSISTANTS: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseConfig: { short: 30, medium: 50, long: 20, audioEnabled: true },
    createdAt: new Date().toISOString(),
    trainingData: "Eres un experto en ventas..."
  },
  {
    id: "2",
    name: "Soporte Técnico",
    language: "Inglés",
    tone: "Amigable",
    responseConfig: { short: 20, medium: 30, long: 50, audioEnabled: false },
    createdAt: new Date().toISOString(),
    trainingData: "Ayudas a resolver problemas técnicos..."
  }
];