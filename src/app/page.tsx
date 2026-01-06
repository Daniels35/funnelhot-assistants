export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mis Asistentes</h1>
        <p className="text-muted-foreground text-gray-500">
          Gestiona y entrena tus agentes de IA para WhatsApp.
        </p>
      </div>

      {/* Aquí irá el Grid de Tarjetas en el siguiente paso */}
      <div className="p-12 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-card">
          <span className="text-4xl">🤖</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">No tienes asistentes creados</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2">
            Comienza creando tu primer asistente de IA para automatizar tus ventas.
          </p>
        </div>
        <button className="mt-4 px-6 py-2 rounded-md bg-gradient-fire text-white font-medium hover:shadow-glow-orange transition-all">
          Crear Nuevo Asistente
        </button>
      </div>
    </div>
  );
}