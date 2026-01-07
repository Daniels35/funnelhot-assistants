"use client";

import { useParams, useRouter } from "next/navigation";
import { useAssistants } from "@/hooks/useAssistants";
import { TrainingPanel } from "@/components/training/TrainingPanel";
import { ChatSimulator } from "@/components/training/ChatSimulator";
import { ArrowLeft, Bot } from "lucide-react"; // Importamos Bot para decorar
import Link from "next/link";

export default function TrainingPage() {
  const params = useParams();
  const router = useRouter();
  const { assistants, updateAssistant, isLoading } = useAssistants();
  
  // Encontrar el asistente actual basado en la URL
  const currentAssistant = assistants.find(a => a.id === params.id);

  if (isLoading) {
    return <div className="p-20 text-center">Cargando entrenamiento...</div>;
  }

  if (!currentAssistant) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-bold mb-2">Asistente no encontrado</h2>
        <button onClick={() => router.push("/")} className="text-hot hover:underline">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 h-auto lg:h-[calc(100vh-80px)] flex flex-col">
      
      {/* Header de la Página */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/" 
          className="p-2 rounded-lg hover:bg-surface-dark border border-transparent hover:border-border transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
        </Link>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground leading-none">
            Entrenamiento
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <Bot className="w-4 h-4 text-hot" />
            <span className="text-lg font-medium text-hot">
              {currentAssistant.name}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-dark border border-border text-muted-foreground ml-2 hidden sm:inline-block">
              {currentAssistant.language} • {currentAssistant.tone}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:min-h-0">
        
        {/* Columna Izquierda: Configuración */}
        <div className="flex flex-col min-h-[500px] lg:min-h-0">
          <TrainingPanel 
            assistant={currentAssistant} 
            onUpdate={updateAssistant} 
          />
        </div>

        {/* Columna Derecha: Simulador */}
        <div className="flex flex-col min-h-[500px] lg:min-h-0">
          <ChatSimulator assistantName={currentAssistant.name} />
        </div>

      </div>
    </div>
  );
}