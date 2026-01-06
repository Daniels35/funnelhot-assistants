"use client";

import { useState, useEffect } from "react";
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

  const [formData, setFormData] = useState({
    name: "",
    language: "Español" as AssistantLanguage,
    tone: "Profesional" as AssistantTone,
    short: 30,
    medium: 40,
    long: 30,
    audioEnabled: false,
  });

  // Helper para contar caracteres reales (sin NINGÚN espacio)
  const getRealLength = (text: string) => {
    return text.replace(/\s/g, "").length; // Elimina todos los espacios (inicio, fin y entre palabras)
  };

  const nameRealLength = getRealLength(formData.name);

  // Limpiar error de porcentajes en Paso 2
  useEffect(() => {
    if (step === 2) {
      const total = Number(formData.short) + Number(formData.medium) + Number(formData.long);
      if (total === 100 && error) {
        setError(null);
      }
    }
  }, [formData.short, formData.medium, formData.long, step, error]);

  if (!isOpen) return null;

  // --- LÓGICA ---

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({ ...formData, name: newName });
    
    // Validación en tiempo real con longitud estricta
    if (error && getRealLength(newName) >= 3) {
      setError(null);
    }
  };

  const validateStep1 = () => {
    if (nameRealLength < 3) {
      setError("El nombre debe tener al menos 3 letras o números (los espacios no cuentan).");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const total = Number(formData.short) + Number(formData.medium) + Number(formData.long);
    if (total !== 100) {
      setError(`Los porcentajes deben sumar 100%. Actual: ${total}%`);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      const newAssistant: Assistant = {
        id: crypto.randomUUID(),
        name: formData.name.trim(),
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
    setFormData({ ...formData, name: "", short: 30, medium: 40, long: 30 });
    onClose();
  };

  const totalPercentage = Number(formData.short) + Number(formData.medium) + Number(formData.long);
  const isTotalValid = totalPercentage === 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl shadow-black animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Nuevo Asistente IA</h2>
            <div className="flex gap-2 mt-2">
              {/* CORRECCIÓN VISUAL: Barras de paso más visibles */}
              <span className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-hot" : "bg-border dark:bg-zinc-700"}`} />
              <span className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-hot" : "bg-gray-300 dark:bg-zinc-700"}`} />
            </div>
          </div>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {step === 1 ? (
            /* PASO 1 */
            <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-medium flex justify-between">
                  Nombre del Asistente
                  {/* Feedback visual con conteo real */}
                  {formData.name.length > 0 && (
                    <span className={`text-xs ${nameRealLength >= 3 ? "text-green-500" : "text-muted-foreground"}`}>
                      {nameRealLength >= 3 ? "Válido" : `${3 - nameRealLength} letras más`}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  className={`w-full bg-surface-dark border rounded-lg p-3 outline-none transition-all
                    ${error && nameRealLength < 3 ? "border-red-500 focus:border-red-500" : "border-border focus:border-hot focus:ring-1 focus:ring-hot"}
                  `}
                  placeholder="Ej. Vendedor Estrella"
                  value={formData.name}
                  onChange={handleNameChange}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Solo cuentan letras y números, no los espacios.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Idioma</label>
                  <select
                    className="w-full bg-surface-dark border border-border rounded-lg p-3 outline-none focus:border-hot transition-colors"
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
                    className="w-full bg-surface-dark border border-border rounded-lg p-3 outline-none focus:border-hot transition-colors"
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
            /* PASO 2 */
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Distribución de Respuestas</label>
                  <div className={`text-xs px-2 py-1 rounded border ${isTotalValid 
                    ? "bg-green-500/10 border-green-500/50 text-green-500" 
                    : "bg-hot/10 border-hot/50 text-hot"}`}>
                    Suma: {totalPercentage}% {isTotalValid ? "✅" : "(Debe ser 100%)"}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Cortas</span>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full bg-surface-dark border border-border rounded-lg p-2 text-center focus:border-hot outline-none"
                        value={formData.short}
                        onChange={(e) => setFormData({ ...formData, short: Number(e.target.value) })}
                      />
                      <span className="absolute right-3 top-2 text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Medias</span>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full bg-surface-dark border border-border rounded-lg p-2 text-center focus:border-hot outline-none"
                        value={formData.medium}
                        onChange={(e) => setFormData({ ...formData, medium: Number(e.target.value) })}
                      />
                      <span className="absolute right-3 top-2 text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Largas</span>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full bg-surface-dark border border-border rounded-lg p-2 text-center focus:border-hot outline-none"
                        value={formData.long}
                        onChange={(e) => setFormData({ ...formData, long: Number(e.target.value) })}
                      />
                      <span className="absolute right-3 top-2 text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden flex border border-border">
                  <div style={{ width: `${formData.short}%` }} className="bg-blue-500 h-full transition-all duration-300" />
                  <div style={{ width: `${formData.medium}%` }} className="bg-purple-500 h-full transition-all duration-300" />
                  <div style={{ width: `${formData.long}%` }} className="bg-hot h-full transition-all duration-300" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-dark rounded-lg border border-border hover:border-hot/50 transition-colors cursor-pointer"
                   onClick={() => setFormData({ ...formData, audioEnabled: !formData.audioEnabled })}>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Respuestas de Audio</span>
                  <span className="text-xs text-muted-foreground">Permitir que el bot envíe notas de voz</span>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${formData.audioEnabled ? "bg-hot" : "bg-border"}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${formData.audioEnabled ? "translate-x-4" : ""}`} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-between bg-surface-dark/50 rounded-b-xl">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-dark rounded-lg transition-colors">
              Atrás
            </button>
          ) : (
            <div /> 
          )}

          <button
            onClick={step === 1 ? handleNext : handleSubmit}
            disabled={step === 2 && !isTotalValid}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all active:scale-95
              ${(step === 2 && !isTotalValid) 
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" 
                : "bg-gradient-fire text-white hover:shadow-glow-orange shadow-lg shadow-hot/20"
              }`}
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