"use client";

import { useState, useEffect } from "react";
import { Assistant } from "@/types/assistant";
import { Save, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner"; // <--- 1. Importamos el toast

interface TrainingPanelProps {
  assistant: Assistant;
  onUpdate: (id: string, data: Partial<Assistant>) => void;
}

export function TrainingPanel({ assistant, onUpdate }: TrainingPanelProps) {
  const [prompt, setPrompt] = useState(assistant.trainingData || "");
  const [isSaving, setIsSaving] = useState(false);

  const MAX_CHARS = 2000;

  // Efecto para sincronizar si cambias de asistente
  useEffect(() => {
    setPrompt(assistant.trainingData || "");
  }, [assistant.id, assistant.trainingData]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simular delay de red
    setTimeout(() => {
      onUpdate(assistant.id, { trainingData: prompt });
      setIsSaving(false);
      
      toast.success("Entrenamiento guardado", {
        description: "Las instrucciones del sistema se han actualizado correctamente.",
        duration: 3000,
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Header del Panel */}
      <div className="p-4 border-b border-border bg-surface-dark/50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-foreground">
          <Sparkles className="w-4 h-4 text-hot" />
          <h3 className="font-semibold">Instrucciones del Sistema</h3>
        </div>
        <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border border-border">
          Modelo: GPT-4o (Simulado)
        </span>
      </div>

      {/* Área de Texto */}
      <div className="flex-1 p-4 bg-background relative">
        <textarea
          className="w-full h-full bg-transparent resize-none outline-none text-sm leading-relaxed font-mono text-foreground placeholder:text-muted-foreground scrollbar-thin scrollbar-thumb-border"
          placeholder="Escribe aquí las reglas del asistente. Ej: Eres un vendedor experto en zapatos deportivos. Tu objetivo es cerrar la venta amablemente..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          spellCheck={false}
          maxLength={MAX_CHARS}
        />

        {prompt.length > MAX_CHARS - 100 && (
          <div className="absolute bottom-4 right-4 animate-in fade-in slide-in-from-bottom-2">
            <span className="text-xs font-bold text-orange-500 bg-background/90 border border-orange-500/20 px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Quedan {MAX_CHARS - prompt.length} caracteres disponibles.
            </span>
          </div>
        )}
      </div>

      {/* Footer / Acciones */}
      <div className="p-4 border-t border-border bg-surface-dark/50 flex justify-between items-center">
        {/* Contador de caracteres con cambio de color */}
        <p className={`text-xs font-mono transition-colors ${
          prompt.length === MAX_CHARS ? "text-red-500 font-bold" : "text-muted-foreground"
        }`}>
          {prompt.length} / {MAX_CHARS} caracteres
        </p>

        <button
          onClick={handleSave}
          disabled={isSaving || prompt === assistant.trainingData}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
            ${isSaving || prompt === assistant.trainingData
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              : "bg-gradient-fire text-white hover:shadow-glow-orange shadow-md hover:scale-105 active:scale-95"
            }`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
}