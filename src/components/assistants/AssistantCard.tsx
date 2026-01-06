"use client";

import { Assistant } from "@/types/assistant";
import { Edit2, Trash2, MessageSquare, Bot } from "lucide-react";
import Link from "next/link"; // <--- 1. Importante: Importar Link

interface AssistantCardProps {
  assistant: Assistant;
  onDelete: (id: string) => void;
  onEdit: (assistant: Assistant) => void;
}

export function AssistantCard({ assistant, onDelete, onEdit }: AssistantCardProps) {
  return (
    <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-hot/50 transition-all duration-300 hover:shadow-lg hover:shadow-hot/5">
      {/* Encabezado de la Tarjeta */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-surface-dark border border-border group-hover:border-hot/30 transition-colors">
            <Bot className="w-6 h-6 text-hot" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-hot transition-colors">
              {assistant.name}
            </h3>
            <span className="text-xs font-medium text-muted-foreground bg-surface-dark px-2 py-0.5 rounded-full border border-border mt-1 inline-block">
              {assistant.language} • {assistant.tone}
            </span>
          </div>
        </div>
      </div>

      {/* Estadísticas / Info Rápida */}
      <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
        <div className="bg-surface-dark/50 p-2 rounded border border-border/50">
          <span className="text-muted-foreground text-xs block">Respuestas</span>
          <span className="font-mono text-hot">
            {assistant.responseConfig.short}% Cortas
          </span>
        </div>
        <div className="bg-surface-dark/50 p-2 rounded border border-border/50">
          <span className="text-muted-foreground text-xs block">Audio</span>
          <span className={assistant.responseConfig.audioEnabled ? "text-green-500" : "text-gray-500"}>
            {assistant.responseConfig.audioEnabled ? "Activado" : "Desactivado"}
          </span>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
        {/* 2. REEMPLAZO DEL BOTÓN POR LINK */}
        <Link 
          href={`/assistant/${assistant.id}`} // <--- Redirección Dinámica
          className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground hover:text-hot transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Entrenar
        </Link>

        <div className="flex gap-1">
          <button 
            onClick={() => onEdit(assistant)}
            className="p-2 hover:bg-surface-dark rounded-md text-muted-foreground hover:text-blue-400 transition-colors"
            title="Editar"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(assistant.id)}
            className="p-2 hover:bg-surface-dark rounded-md text-muted-foreground hover:text-fire transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}