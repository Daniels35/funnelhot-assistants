"use client";

import { useAssistants } from "@/hooks/useAssistants";
import { AssistantCard } from "@/components/assistants/AssistantCard";
import { Plus } from "lucide-react";

export default function Home() {
  const { assistants, isLoading, deleteAssistant } = useAssistants();

  if (isLoading) {
    return <div className="p-20 text-center text-muted-foreground">Cargando motores de IA...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Header de la Sección */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Mis Asistentes
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tus agentes inteligentes para WhatsApp.
          </p>
        </div>
        <button 
          onClick={() => alert("Abrir Modal de Creación (Siguiente Paso)")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-fire text-white font-semibold shadow-lg shadow-hot/20 hover:shadow-hot/40 hover:scale-105 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Crear Asistente
        </button>
      </div>

      {/* Grid de Contenido */}
      {assistants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assistants.map((assistant) => (
            <AssistantCard 
              key={assistant.id} 
              assistant={assistant} 
              onDelete={deleteAssistant}
              onEdit={() => alert("Editar (Próximamente)")}
            />
          ))}
        </div>
      ) : (
        /* Estado Vacío */
        <div className="p-12 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center bg-card/30">
          <div className="p-4 rounded-full bg-surface-dark border border-border mb-4">
            <span className="text-4xl">🤖</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">No hay asistentes activos</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
            Tu ejército de ventas está vacío. Crea tu primer agente para comenzar a automatizar.
          </p>
        </div>
      )}
    </div>
  );
}