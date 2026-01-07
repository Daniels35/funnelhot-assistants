"use client";

import { useState, useEffect } from "react";
import { Assistant, AssistantLanguage, AssistantTone } from "@/types/assistant";
import { X, ChevronRight, Check, AlertCircle } from "lucide-react";
import { sanitizeInput } from "@/lib/utils"; // Importamos seguridad

interface CreateAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assistant: Assistant) => void;
  initialData?: Assistant | null;
  existingAssistants: Assistant[];
}

export function CreateAssistantModal({ isOpen, onClose, onSave, initialData, existingAssistants }: CreateAssistantModalProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const MAX_NAME_LENGTH = 30;

  const [formData, setFormData] = useState({
    name: "",
    language: "Español" as AssistantLanguage,
    tone: "Profesional" as AssistantTone,
    short: 30,
    medium: 40,
    long: 30,
    audioEnabled: false,
  });

  // Cargar datos
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name,
          language: initialData.language,
          tone: initialData.tone,
          short: initialData.responseConfig.short,
          medium: initialData.responseConfig.medium,
          long: initialData.responseConfig.long,
          audioEnabled: initialData.responseConfig.audioEnabled,
        });
      } else {
        setFormData({
          name: "",
          language: "Español",
          tone: "Profesional",
          short: 30,
          medium: 40,
          long: 30,
          audioEnabled: false,
        });
      }
      setStep(1);
      setError(null);
    }
  }, [isOpen, initialData]);

  
  useEffect(() => {
    if (step === 2) {
      const total = Number(formData.short) + Number(formData.medium) + Number(formData.long);
      if (total === 100 && error) setError(null);
    }
  }, [formData.short, formData.medium, formData.long, step, error]);

  if (!isOpen) return null;

  // --- LÓGICA ---

  const getRealLength = (text: string) => text.replace(/\s/g, "").length;
  const nameRealLength = getRealLength(formData.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    // 7. Límite estricto al escribir
    if (newName.length <= MAX_NAME_LENGTH) {
      setFormData({ ...formData, name: newName });
      if (error && getRealLength(newName) >= 3) setError(null);
    }
  };

  const validateStep1 = () => {
    const cleanName = sanitizeInput(formData.name);

    if (getRealLength(cleanName) < 3) {
      setError("El nombre debe tener al menos 3 letras reales.");
      return false;
    }

    //Validación de Duplicados (Insensitive case)
    const isDuplicate = existingAssistants.some(ast => 
      ast.name.toLowerCase() === cleanName.toLowerCase() && ast.id !== initialData?.id
    );

    if (isDuplicate) {
      setError("Ya existe un asistente con este nombre. Elige otro.");
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
      const assistantData: Assistant = {
        id: initialData?.id || crypto.randomUUID(),
        createdAt: initialData?.createdAt || new Date().toISOString(),
        trainingData: initialData?.trainingData, 
        
        name: sanitizeInput(formData.name),
        language: formData.language,
        tone: formData.tone,
        responseConfig: {
          short: Number(formData.short),
          medium: Number(formData.medium),
          long: Number(formData.long),
          audioEnabled: formData.audioEnabled,
        },
      };

      onSave(assistantData);
      onClose();
    }
  };

  const totalPercentage = Number(formData.short) + Number(formData.medium) + Number(formData.long);
  const isTotalValid = totalPercentage === 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl shadow-black animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {initialData ? "Editar Asistente" : "Nuevo Asistente IA"}
            </h2>
            <div className="flex gap-2 mt-2">
              <span className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-hot" : "bg-border dark:bg-zinc-700"}`} />
              <span className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-hot" : "bg-gray-300 dark:bg-zinc-700"}`} />
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer hover:bg-surface-dark p-1 rounded-md"
          >
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
            <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Nombre del Asistente</label>
                  {/* 7. Contador de caracteres */}
                  <span className={`text-xs ${formData.name.length === MAX_NAME_LENGTH ? "text-red-500 font-bold" : "text-muted-foreground"}`}>
                    {formData.name.length}/{MAX_NAME_LENGTH}
                  </span>
                </div>
                <input
                  type="text"
                  className={`w-full bg-card border rounded-lg p-3 outline-none transition-all
                    ${error && nameRealLength < 3 ? "border-red-500 focus:border-red-500" : "border-border focus:border-hot focus:ring-1 focus:ring-hot"}
                  `}
                  placeholder="Ej. Vendedor Estrella"
                  value={formData.name}
                  onChange={handleNameChange}
                  autoFocus
                />
                {nameRealLength > 0 && nameRealLength < 3 && (
                   <span className="text-xs text-muted-foreground block mt-1">Faltan {3 - nameRealLength} letras más.</span>
                )}
              </div>

              {/* ... (Selects de Idioma y Tono sin cambios mayores, solo bg-card) ... */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Idioma</label>
                  <select
                    className="w-full bg-card border border-border rounded-lg p-3 outline-none focus:border-hot transition-colors cursor-pointer"
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
                    className="w-full bg-card border border-border rounded-lg p-3 outline-none focus:border-hot transition-colors cursor-pointer"
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
                  {["Cortas", "Medias", "Largas"].map((label, idx) => {
                    const field = idx === 0 ? "short" : idx === 1 ? "medium" : "long";
                    return (
                      <div key={field} className="space-y-1">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <div className="relative">
                          <input
                            type="number"
                            className="w-full bg-card border border-border rounded-lg p-2 text-center focus:border-hot outline-none"
                            // @ts-ignore
                            value={formData[field]}
                            // @ts-ignore
                            onChange={(e) => setFormData({ ...formData, [field]: Number(e.target.value) })}
                          />
                          <span className="absolute right-3 top-2 text-xs text-muted-foreground">%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="h-2 w-full bg-card/50 rounded-full overflow-hidden flex border border-border">
                  <div style={{ width: `${formData.short}%` }} className="bg-blue-500 h-full transition-all duration-300" />
                  <div style={{ width: `${formData.medium}%` }} className="bg-purple-500 h-full transition-all duration-300" />
                  <div style={{ width: `${formData.long}%` }} className="bg-hot h-full transition-all duration-300" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-hot/50 transition-colors cursor-pointer"
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
        <div className="p-6 border-t border-border flex justify-between bg-card/50 rounded-b-xl">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors cursor-pointer">
              Atrás
            </button>
          ) : (
            <div /> 
          )}

          <button
            onClick={step === 1 ? handleNext : handleSubmit}
            disabled={step === 2 && !isTotalValid}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all active:scale-95 cursor-pointer
              ${(step === 2 && !isTotalValid) 
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" 
                : "bg-gradient-fire text-white hover:shadow-glow-orange shadow-lg shadow-hot/20"
              }`}
          >
            {step === 1 ? (
              <>Siguiente <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>{initialData ? "Guardar Cambios" : "Crear Asistente"} <Check className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}