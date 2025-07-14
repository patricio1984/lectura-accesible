# 🎧 Lectura Accesible

**Lectura Accesible** es una aplicación web inclusiva que convierte texto a voz de forma profesional, rápida y sencilla. Está pensada para personas con baja visión, dificultades lectoras o usuarios que simplemente prefieren escuchar el contenido.

---

## Características

- Conversión de texto a voz usando voces profesionales (ElevenLabs).
- Soporte para subir archivos `.txt` y `.pdf`.
- Extracción automática de texto desde archivos PDF.
- Descarga del audio generado.
- Modo claro y oscuro con alto contraste.
- Foco en accesibilidad: navegación por teclado, roles semánticos, foco visible.
- Tests automatizados con Vitest + React Testing Library.
- UI limpia y responsiva con TailwindCSS.
- Notificaciones con `sonner`.
- Permite ajustar la **velocidad de lectura** del audio generado.
- La velocidad seleccionada se conserva también en el **historial de audios**.

---

## Tecnologías

- **Next.js 15**
- **React 19**
- **TailwindCSS 4**
- **Zustand** para estado global
- **React Query**
- **ElevenLabs API**
- **react-pdftotext**
- **Vitest** + **RTL** para testing
- **Sonner** para toasts accesibles

---

## Cómo iniciar el proyecto

```bash
pnpm install
pnpm dev
```

---

## Tests

```bash
pnpm test
```

---

## Accesibilidad

- Navegación por teclado completa

- aria-live para feedback dinámico

- Roles semánticos y atributos accesibles

- Contraste validado para modo claro y oscuro

- Focus trap en modales y focus-visible personalizado

---

## Estructura de carpetas

```txt
src/
│
├── app/                   # Layouts y rutas Next.js App Router
│   └── page.tsx           # Página principal
│
├── common/                # Componentes reutilizables y UI compartida
│   └── ui/                # Botones, secciones, header, etc.
│
├── features/              # Lógica y UI por funcionalidad
│   └── tts/               # Texto a voz
│       ├── components/    # Componentes UI (formulario, historial)
│       ├── hooks/         # Hooks locales del feature
│       └── utils/         # Funciones auxiliares
│
├── hooks/                 # Hooks globales reutilizables
│
├── lib/                   # Lógica compartida (API, helpers, store Zustand)
│
├── styles/                # Estilos globales (tailwind + base.css)
│
├── tests/                 # Tests unitarios con Vitest
│
└── public/                # Assets estáticos (favicon, íconos)
```

---

## Objetivo

Este proyecto busca demostrar cómo se puede construir una aplicación accesible, escalable y moderna, integrando buenas prácticas de frontend con foco en usabilidad real para todos los públicos.

---

## Licencia

Este proyecto está licenciado bajo los términos de la [Licencia MIT](https://opensource.org/licenses/MIT).

---
