export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-4">
        {/* Usamos el color 'hot' que definimos para probar que Tailwind lo detecta */}
        <h1 className="text-4xl font-bold text-hot tracking-tight">
          FunnelHot Assistants
        </h1>
        <p className="text-zinc-400">
          Sistema de diseño activo. Preparado para el despegue. 🚀
        </p>
        
        {/* Botón de prueba con el gradiente de marca */}
        <button className="px-6 py-3 rounded-lg bg-gradient-fire text-white font-semibold hover:shadow-glow-orange transition-all">
          Iniciar Prueba
        </button>
      </div>
    </main>
  );
}