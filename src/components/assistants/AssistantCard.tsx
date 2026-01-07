"use client";

import { useState } from "react";
import { Assistant } from "@/types/assistant";
import { Edit2, Trash2, MessageSquare, Bot, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface AssistantCardProps {
  assistant: Assistant;
  onDelete: (id: string) => void;
  onEdit: (assistant: Assistant) => void;
}

export function AssistantCard({ assistant, onDelete, onEdit }: AssistantCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 5. Flujo Eliminación: Alert -> Toast
  const handleFinalDelete = () => {
    onDelete(assistant.id);
    setTimeout(() => {
      window.alert(`El asistente "${assistant.name}" fue eliminado con éxito.`);
      toast.success(`Asistente "${assistant.name}" eliminado`, { duration: 3000 });
    }, 100);
  };

  // Lógica para encontrar el porcentaje mayor
  const { short, medium, long } = assistant.responseConfig;
  const maxVal = Math.max(short, medium, long);
  let dominantLabel = "Equilibrado";
  if (short === maxVal) dominantLabel = "Cortas";
  if (medium === maxVal) dominantLabel = "Medias";
  if (long === maxVal) dominantLabel = "Largas";

  return (
    <div className={`group relative bg-card border rounded-xl p-5 transition-all duration-300 hover:shadow-lg flex flex-col
      ${isDeleting 
        ? "border-red-500/50 bg-red-500/5 shadow-red-500/10"
        : "border-border hover:border-hot/50 hover:shadow-hot/5"
      }
    `}>
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg border transition-colors 
            ${isDeleting 
              ? "bg-red-500/20 border-red-500/50" 
              : "bg-surface-dark border-border group-hover:border-hot/30"
            }`}>
            {isDeleting ? (
              <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
            ) : (
              <Bot className="w-6 h-6 text-hot" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-1">
              {assistant.name}
            </h3>
            <span className="text-xs font-medium text-muted-foreground bg-surface-dark px-2 py-0.5 rounded-full border border-border mt-1 inline-block">
              {assistant.language} • {assistant.tone}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 mb-6">
        {isDeleting ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded p-3 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm font-bold text-red-500 mb-0.5">¿Estás seguro?</p>
            <p className="text-xs text-red-400/80">
              Esta acción es irreversible y borrará el entrenamiento.
            </p>
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in">
            <div className="bg-surface-dark/50 p-2 rounded border border-border/50 flex justify-between items-center">
              <span className="text-muted-foreground text-xs">Respuestas</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-hot font-bold text-sm">
                  {maxVal}% {dominantLabel}
                </span>
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-center gap-1 text-[10px] text-muted-foreground hover:text-hot cursor-pointer py-1"
              >
                {showDetails ? "Ocultar detalles" : "Ver distribución completa"}
                {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              
              {showDetails && (
                <div className="grid grid-cols-3 gap-1 mt-1 animate-in slide-in-from-top-1 text-center bg-card border border-border rounded p-2 text-xs">
                  <div>
                    <span className="block text-muted-foreground scale-75">Cortas</span>
                    <span className="font-mono">{short}%</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground scale-75">Medias</span>
                    <span className="font-mono">{medium}%</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground scale-75">Largas</span>
                    <span className="font-mono">{long}%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-surface-dark/50 p-2 rounded border border-border/50 flex justify-between items-center mt-2">
              <span className="text-muted-foreground text-xs">Audio</span>
              <span className={`text-xs font-medium ${assistant.responseConfig.audioEnabled ? "text-green-500" : "text-gray-500"}`}>
                {assistant.responseConfig.audioEnabled ? "Activado" : "Desactivado"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ACCIONES: Footer */}
      <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
        {isDeleting ? (
          <div className="flex items-center gap-3 w-full justify-end animate-in fade-in">
            <button 
              onClick={() => setIsDeleting(false)}
              className="text-xs font-medium px-3 py-2 rounded-lg hover:bg-surface-dark text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              onClick={handleFinalDelete}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Sí, eliminar
            </button>
          </div>
        ) : (
          <>
            <Link 
              href={`/assistant/${assistant.id}`}
              className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground hover:text-hot transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Entrenar
            </Link>

            <div className="flex gap-1">
              <button 
                onClick={() => onEdit(assistant)}
                className="p-2 hover:bg-surface-dark rounded-md text-muted-foreground hover:text-blue-400 transition-colors cursor-pointer"
                title="Editar configuración"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsDeleting(true)}
                className="p-2 hover:bg-surface-dark rounded-md text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                title="Eliminar asistente"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}