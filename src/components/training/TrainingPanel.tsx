"use client";

import { useState, useEffect } from "react";
import { Assistant } from "@/types/assistant";
import { Save, Sparkles } from "lucide-react";

interface TrainingPanelProps {
  assistant: Assistant;
  onUpdate: (id: string, data: Partial<Assistant>) => void;
}

export function TrainingPanel({ assistant, onUpdate }: TrainingPanelProps) {
  const [prompt, setPrompt] = useState(assistant.trainingData || "");
  const [isSaving, setIsSaving] = useState(false);

  // Efecto para actualizar el estado si cambiamos de asistente
  useEffect(() => {
    setPrompt(assistant.trainingData || "");
  }, [assistant.id, assistant.trainingData]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulamos un pequeño delay de red para realismo
    setTimeout(() => {
      onUpdate(assistant.id, { trainingData: prompt });
      setIsSaving(false);
    }, 800);
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
      <div className="flex-1 p-4 bg-background">
        <textarea
          className="w-full h-full bg-transparent resize-none outline-none text-sm leading-relaxed font-mono text-foreground placeholder:text-muted-foreground"
          placeholder="Escribe aquí las reglas del asistente. Ej: Eres un vendedor experto en zapatos deportivos..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Footer / Acciones */}
      <div className="p-4 border-t border-border bg-surface-dark/50 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          {prompt.length} caracteres
        </p>
        <button
          onClick={handleSave}
          disabled={isSaving || prompt === assistant.trainingData}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${isSaving || prompt === assistant.trainingData
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-gradient-fire text-white hover:shadow-glow-orange shadow-md"
            }`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
}