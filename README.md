# FunnelHot Assistants 🤖🔥

> **Gestor Inteligente de Asistentes de Ventas con Simulación en Tiempo Real.**

Una aplicación SaaS moderna construida con **Next.js 16** y **Tailwind CSS v4** que permite crear, configurar y entrenar agentes de IA para WhatsApp. Incluye un entorno de simulación de chat "Pixel-Perfect" y una gestión de estado robusta en el cliente.

🔗 **Demo en Vivo:** [https://funnelhot-assistants-module.vercel.app/](https://funnelhot-assistants-module.vercel.app/)

---

## ✨ Características Principales

### 🛠️ Gestión de Asistentes (CRUD)
- **Creación Guiada (Wizard):** Modal de 2 pasos con barras de progreso visuales.
- **Validación Estricta:**
  - Control de suma exacta del 100% en la distribución de respuestas.
  - Sanitización de nombres (evita espacios vacíos y caracteres peligrosos).
- **Edición Inteligente:** Reutilización de componentes para cargar datos existentes.
- **Eliminación Segura:** Patrón de "Doble Confirmación" (UI Visual de Peligro + Alerta Nativa).

### 🧠 Módulo de Entrenamiento
- **Simulador WhatsApp:** Interfaz idéntica a la real (burbujas, ticks de lectura, timestamps dinámicos).
- **Feedback Inmediato:** Indicadores de "Escribiendo..." y respuestas simuladas con delay natural.
- **Editor de Prompts:** Área de texto con contador de caracteres y alertas de límites (2000 chars).

### 🎨 UI/UX Premium
- **Diseño Responsivo:** Optimizado para móviles (ajuste de alturas y scroll nativo) y escritorio.
- **Temas:** Modo Oscuro (Brand FunnelHot) y Modo Claro automático.
- **Micro-interacciones:** Animaciones suaves, notificaciones Toast (Sonner) y efectos hover.

### 🛡️ Seguridad y Robustez
- **Sanitización de Inputs:** Protección contra inyecciones básicas.
- **Generación de IDs Híbrida:** Sistema dual que usa `crypto.randomUUID` en entornos seguros (HTTPS)

---

## 🚀 Tecnologías Utilizadas

- **Core:** [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes:** React 19
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Notificaciones:** [Sonner](https://sonner.emilkowal.ski/)
- **Persistencia:** LocalStorage (Custom Hook `useAssistants`)

---

## 📦 Instalación Local

Si quieres correr este proyecto en tu máquina:

1. **Clonar el repositorio:**

   git clone [https://github.com/Daniels35/funnelhot-assistants.git](https://github.com/Daniels35/funnelhot-assistants.git)
   
   cd funnelhot-assistants

## Instalar dependencias:

npm install

## Correr el servidor de desarrollo:

npm run dev
Abrir en el navegador: Visita http://localhost:3000

## 📂 Estructura del Proyecto

```bash
src/
├── app/
│   ├── assistant/[id]/  # Página dinámica de entrenamiento
│   ├── globals.css      # Variables de tema y estilos base
│   ├── layout.tsx       # Layout principal con Toaster y ThemeProvider
│   └── page.tsx         # Dashboard (Listado de asistentes)
├── components/
│   ├── assistants/      # Componentes de tarjetas y modales
│   ├── layout/          # Header y estructura común
│   ├── training/        # Panel de instrucciones y Simulador de Chat
│   └── ui/              # Componentes base (Toast, ThemeToggle)
├── hooks/               # Custom Hook (useAssistants) para lógica de negocio
├── lib/                 # Utilidades (Sanitización, Generador IDs)
└── types/               # Definiciones de TypeScript