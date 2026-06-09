# 🃏 Web Task Poker

**Web Task Poker** es una aplicación web moderna y en tiempo real para la estimación de tareas utilizando la metodología "Planning Poker". Ideal para equipos ágiles que buscan una forma rápida y colaborativa de puntuar historias de usuario.

![License](https://img.shields.io/badge/license-GPLv3-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16-green.svg)
![React](https://img.shields.io/badge/react-v19-blue.svg)

## ✨ Características

-   **🗳️ Votación en Tiempo Real**: Sincronización instantánea entre todos los participantes usando WebSockets.
-   **🔢 Secuencia Fibonacci**: Puntuación estándar ágil (1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?).
-   **🚪 Gestión de Salas**: Crea salas privadas y comparte el enlace con tu equipo.
-   **👑 Roles**: Sistema de Administrador (Master) y Participantes.
-   **📊 Resultados**: Visualización clara de los votos al finalizar cada ronda.
-   **📱 Diseño Responsivo**: Funciona en escritorio y dispositivos móviles.

## 🛠️ Stack Tecnológico

### Frontend (`/client`)
-   **React 19**: Biblioteca de UI.
-   **Vite**: Build tool rápido y ligero.
-   **Socket.io-client**: Comunicación en tiempo real.
-   **React Router**: Navegación SPA.
-   **CSS Modules / Vanilla CSS**: Estilos modernos.

### Backend (`/server`)
-   **Node.js & Express**: Servidor API REST.
-   **Socket.io**: Motor de WebSockets.
-   **UUID**: Generación de identificadores únicos.

## 🚀 Configuración y Ejecución

### Requisitos previos
-   [Node.js](https://nodejs.org/) (v16 o superior)
-   npm (incluido con Node.js)

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/web-task-poker.git
    cd web-task-poker
    ```

2.  **Instalar dependencias del Servidor:**
    ```bash
    cd server
    npm install
    ```

3.  **Instalar dependencias del Cliente:**
    ```bash
    cd ../client
    npm install
    ```

### Ejecución en Desarrollo

Necesitarás dos terminales abiertas:

**Terminal 1: Servidor (Backend)**
```bash
cd server
npm run dev
# El servidor iniciará en http://localhost:5000
```

**Terminal 2: Cliente (Frontend)**
```bash
cd client
npm run dev
# La aplicación abrirá en http://localhost:5173
```

## 📂 Estructura del Proyecto

```
web-task-poker/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── context/        # Contexto global (Socket, Room)
│   │   ├── pages/          # Páginas principales
│   │   └── ...
│   └── ...
├── server/                 # Backend (Node + Express)
│   ├── handlers/           # Manejadores de eventos Socket.io
│   ├── store/              # Estado en memoria
│   ├── utils/              # Utilidades y validaciones
│   └── index.js            # Punto de entrada
└── README.md               # Documentación
```

## 📄 Licencia

Este proyecto está bajo la Licencia **GNU General Public License v3.0**. Consulta el archivo `LICENSE` para más detalles.
