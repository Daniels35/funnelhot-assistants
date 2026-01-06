import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background transition-colors">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-hot tracking-tighter">
          FunnelHot <span className="text-foreground">Assistants</span>
        </h1>
        
        <p className="text-xl text-foreground/60 max-w-lg mx-auto">
          Sistema de diseño híbrido (Dark/Light) configurado. 
          La identidad de fuego persiste en ambos mundos. 🔥
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 rounded-lg bg-gradient-fire text-white font-bold hover:shadow-glow-orange transition-all transform hover:scale-105">
            Crear Asistente
          </button>
          <button className="px-8 py-3 rounded-lg bg-card border border-border text-foreground font-medium hover:border-hot transition-all">
            Ver Documentación
          </button>
        </div>

        {/* Tarjeta de prueba para ver el cambio de fondo */}
        <div className="mt-12 p-6 rounded-xl bg-card border border-border max-w-sm mx-auto shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-sm text-foreground/80 font-mono">
            Status: System Operational<br/>
            Theme: Adaptive
          </p>
        </div>
      </div>
    </main>
  );
}