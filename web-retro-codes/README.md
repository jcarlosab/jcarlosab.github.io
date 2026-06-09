# RetroKodes

**RetroKodes** es una aplicación web estática para explorar, buscar y descubrir trucos y códigos de videojuegos retro. Cubre 14 plataformas con más de 300 juegos y 900+ trucos documentados en español.

## Características

-   **Búsqueda instantánea** por nombre de juego, truco o código.
-   **Filtrado por plataforma** — selecciona una o varias consolas.
-   **Modo "Todos"** — navega todos los juegos ordenados alfabéticamente.
-   **Tema oscuro/claro** con persistencia en localStorage.
-   **Carga progresiva** (lazy loading con Intersection Observer).
-   **Código Konami** oculto (↑↑↓↓←→←→BA).
-   **Diseño responsivo** para escritorio y móvil.

## Tecnologías

-   **[Next.js](https://nextjs.org/)** 16 — renderizado estático (Static Export).
-   **[React](https://react.dev/)** 19 — componentes e interactividad.
-   **CSS moderno** — variables, `color-mix`, animaciones, sin dependencias CSS.

## Instalación y uso

```bash
git clone <repo-url>
cd retro-codes
npm install
npm run dev        # http://localhost:3000
```

Para generar la versión estática:

```bash
npm run build      # salida en dist/
```

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.js          # Layout raíz, fuente, metadatos
│   ├── page.js            # Página principal (server component)
│   ├── lib/data.js        # Carga el índice de plataformas
│   └── ui/
│       ├── GameBrowser.js # Componente principal (búsqueda, filtros, Konami)
│       ├── Card.js        # Enruta a CardSimple o CardMultiple
│       ├── CardSimple.js  # Truco individual (acordeón)
│       ├── CardMultiple.js# Categoría con subtrucos
│       ├── HighlightText.js# Resalta coincidencias de búsqueda
│       ├── ScrollToTop.js # Botón flotante
│       ├── fonts.js       # Carga de fuentes locales
│       └── global.css     # Todos los estilos
public/
└── game_codes/            # Base de datos de trucos (un JSON por plataforma)
    ├── index.json          # Lista de plataformas disponibles
    ├── dreamcast.json      
    ├── megadrive.json      
    ├── nes.json            
    ├── nintendo-64.json    
    ├── playstation.json    
    ├── playstation-2.json  
    ├── saturn.json         
    ├── snes.json           
    ├── psp.json            
    ├── xbox.json           
    ├── gamecube.json       
    ├── gba.json            
    ├── gbc.json            
    └── gb.json             
```

## Licencia

**GPLv3** — ver `LICENSE`.
