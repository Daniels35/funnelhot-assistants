"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Flame } from "lucide-react"; // Icono temporal para el logo

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Identidad de Marca */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-fire group-hover:shadow-glow-orange transition-all duration-300">
            <Flame className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            FunnelHot <span className="text-hot">AI</span>
          </span>
        </Link>

        {/* Acciones Derecha */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-hot transition-colors">
              Dashboard
            </Link>
            <span className="cursor-not-allowed opacity-50">Configuración</span>
          </div>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <ThemeToggle />
          
          {/* Avatar Simulado (Usuario) */}
          <div className="w-9 h-9 rounded-full bg-surface-card border border-border flex items-center justify-center overflow-hidden hover:border-hot transition-colors cursor-pointer">
            <span className="text-xs font-bold text-hot">FH</span>
          </div>
        </div>
      </div>
    </header>
  );
}