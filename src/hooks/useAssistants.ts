"use client";

import { useState, useEffect } from "react";
import { Assistant, INITIAL_ASSISTANTS } from "@/types/assistant";

const STORAGE_KEY = "funnelhot_assistants_v1";

export function useAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Cargar datos al montar el componente (solo en el cliente)
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setAssistants(JSON.parse(savedData));
        } else {
          // Si no hay datos, cargamos los de prueba (Mock Data)
          setAssistants(INITIAL_ASSISTANTS);
        }
      } catch (error) {
        console.error("Error cargando asistentes:", error);
        setAssistants(INITIAL_ASSISTANTS);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // 2. Guardar automáticamente cada vez que cambie la lista
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assistants));
    }
  }, [assistants, isLoading]);

  // --- ACCIONES (CRUD) ---

  const addAssistant = (newAssistant: Assistant) => {
    setAssistants((prev) => [newAssistant, ...prev]);
  };

  const updateAssistant = (id: string, updatedFields: Partial<Assistant>) => {
    setAssistants((prev) =>
      prev.map((ast) => (ast.id === id ? { ...ast, ...updatedFields } : ast))
    );
  };

  const deleteAssistant = (id: string) => {
    setAssistants((prev) => prev.filter((ast) => ast.id !== id));
  };

  return {
    assistants,
    isLoading,
    addAssistant,
    updateAssistant,
    deleteAssistant,
  };
}