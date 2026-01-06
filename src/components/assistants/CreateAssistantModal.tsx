"use client";

import { useState } from "react";
import { Assistant, AssistantLanguage, AssistantTone } from "@/types/assistant";
import { X, ChevronRight, Check, AlertCircle } from "lucide-react";

interface CreateAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assistant: Assistant) => void;
}

export function CreateAssistantModal({ isOpen, onClose, onSave }: CreateAssistantModalProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    name: "",
    language: "Español" as AssistantLanguage,
    tone: "Profesional" as AssistantTone,
    short: 30,
    medium: 40,
    long: 30,
    audioEnabled: false,
  });

  if (!isOpen) return null;

  // --- LÓGICA DE VALIDACIÓN ---

  const validateStep1 = () => {
    if (formData.name.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep2 = () => {
    const total = Number(formData.short) + Number(formData.medium) + Number(formData.long);
    if (total !== 100) {
      setError(`Los porcentajes deben sumar 100%. Actual: ${total}%`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      // Crear el objeto Assistant final
      const newAssistant: Assistant = {
        id: crypto.randomUUID(), // Generamos ID único
        name: formData.name,
        language: formData.language,
        tone: formData.tone,
        responseConfig: {
          short: Number(formData.short),
          medium: Number(formData.medium),
          long: Number(formData.long),
          audioEnabled: formData.audioEnabled,
        },
        createdAt: new Date().toISOString(),
      };

      onSave(newAssistant);
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(1);
    setError(null);
    setFormData({ ...formData, name: "", short: 30, medium: 40, long: 30 }); // Reset parcial
    onClose();
  };

  // --- RENDERIZADO UI ---

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl shadow-black animate-in fade-in zoom-in duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Nuevo Asistente IA</h2>
            <div className="flex gap-2 mt-2">
              <span className={`h-1 w-8 rounded-full ${step >= 1 ? "bg-hot" : "bg-border"}`} />
              <span className={`h-1 w-8 rounded-full ${step >= 2 ? "bg-hot" : "bg-border"}`} />
            </div>
          </div>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {step === 1 ? (
            /* PASO 1: DATOS BÁSICOS */
            <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre del Asistente</label>
                <input
                  type="text"
                  className="w-full bg-surface-dark border border-border rounded-lg p-3 focus:border-hot focus:ring-1 focus:ring-hot outline-none transition-all"
                  placeholder="Ej. Vendedor Estrella"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Idioma</label>
                  <select
                    className="w-full bg-surface-dark border border-border rounded-lg p-3 outline-none"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value as AssistantLanguage })}
                  >
                    <option value="Español">Español 🇪🇸</option>
                    <option value="Inglés">Inglés 🇺🇸</option>
                    <option value="Portugués">Portugués 🇧🇷</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tono</label>
                  <select
                    className="w-full bg-surface-dark border border-border rounded-lg p-3 outline-none"
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value as AssistantTone })}
                  >
                    <option value="Profesional">Profesional 👔</option>
                    <option value="Amigable">Amigable 🤝</option>
                    <option value="Casual">Casual 😎</option>
                    <option value="Formal">Formal ⚖️</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* PASO 2: CONFIGURACIÓN */
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Longitud de Respuestas</label>
                  <span className={`text-xs ${Number(formData.short) + Number(formData.medium) + Number(formData.long) === 100 ? "text-green-500" : "text-hot"}`}>
                    Suma: {Number(formData.short) + Number(formData.medium) + Number(formData.long)}%
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Cortas (%)</span>
                    <input
                      type="number"
                      className="w-full bg-surface-dark border border-border rounded-lg p-2 text-center"
                      value={formData.short}
                      onChange={(e) => setFormData({ ...formData, short: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Medias (%)</span>
                    <input
                      type="number"
                      className="w-full bg-surface-dark border border-border rounded-lg p-2 text-center"
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Largas (%)</span>
                    <input
                      type="number"
                      className="w-full bg-surface-dark border border-border rounded-lg p-2 text-center"
                      value={formData.long}
                      onChange={(e) => setFormData({ ...formData, long: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-dark rounded-lg border border-border">
                <span className="text-sm font-medium">Habilitar respuestas de Audio</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-hot"
                  checked={formData.audioEnabled}
                  onChange={(e) => setFormData({ ...formData, audioEnabled: e.target.checked })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="p-6 border-t border-border flex justify-between bg-surface-dark/50 rounded-b-xl">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Atrás
            </button>
          ) : (
            <div /> 
          )}

          <button
            onClick={step === 1 ? handleNext : handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-fire text-white font-semibold hover:shadow-glow-orange transition-all active:scale-95"
          >
            {step === 1 ? (
              <>Siguiente <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>Crear Asistente <Check className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}