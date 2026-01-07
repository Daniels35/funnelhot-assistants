"use client";

import { useState } from "react";
import { useAssistants } from "@/hooks/useAssistants";
import { AssistantCard } from "@/components/assistants/AssistantCard";
import { CreateAssistantModal } from "@/components/assistants/CreateAssistantModal";
import { Plus } from "lucide-react";
import { Assistant } from "@/types/assistant";
import { toast } from "sonner"; // Opcional: Feedback extra

export default function Home() {
  const { assistants, isLoading, deleteAssistant, addAssistant, updateAssistant } = useAssistants();
  
  // Estados para controlar el modal y la edición
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);

  // Abrir modal para CREAR
  const handleCreateOpen = () => {
    setEditingAssistant(null); // Nos aseguramos de que no haya datos "viejos"
    setIsModalOpen(true);
  };

  // Abrir modal para EDITAR
  const handleEditOpen = (assistant: Assistant) => {
    setEditingAssistant(assistant); // Cargamos los datos del asistente
    setIsModalOpen(true);
  };

  // Guardar (Discrimina entre Crear o Actualizar)
  const handleSaveAssistant = (assistantData: Assistant) => {
    if (editingAssistant) {
      // Estamos editando
      updateAssistant(assistantData.id, assistantData);
      toast.success("Asistente actualizado correctamente");
    } else {
      // Estamos creando
      addAssistant(assistantData);
      toast.success("Nuevo asistente creado");
    }
    
    setIsModalOpen(false);
    setEditingAssistant(null); // Limpieza final
  };

  if (isLoading) {
    return <div className="p-20 text-center text-muted-foreground">Cargando motores de IA...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl">
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
          onClick={handleCreateOpen} // Acción de crear
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-fire text-white font-semibold shadow-lg shadow-hot/20 hover:shadow-hot/40 hover:scale-105 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Crear Asistente
        </button>
      </div>

      {assistants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assistants.map((assistant) => (
            <AssistantCard 
              key={assistant.id} 
              assistant={assistant} 
              onDelete={deleteAssistant}
              onEdit={handleEditOpen} // Pasamos la función de editar
            />
          ))}
        </div>
      ) : (
        <div className="p-12 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center bg-card/30">
          <div className="p-4 rounded-full bg-surface-dark border border-border mb-4">
            <span className="text-4xl">🤖</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">No hay asistentes activos</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
            Tu ejército de ventas está vacío. Crea tu primer agente para comenzar a automatizar.
          </p>
          <button 
            onClick={handleCreateOpen}
            className="mt-6 text-hot hover:underline text-sm font-medium"
          >
            Crear uno ahora
          </button>
        </div>
      )}

      {/* Modal Inteligente (Creación/Edición) */}
      <CreateAssistantModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAssistant}
        initialData={editingAssistant} // Pasamos los datos si existen
      />
    </div>
  );
}