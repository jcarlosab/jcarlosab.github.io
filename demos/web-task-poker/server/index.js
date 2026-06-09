import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { rooms } from './store/rooms.js';
import * as handlers from './handlers/socketHandlers.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// ============================================
// CONFIGURACIÓN
// ============================================

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.CORS_ORIGIN || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    rooms: Object.keys(rooms).length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Stats endpoint
app.get('/stats', (req, res) => {
  const stats = {
    totalRooms: Object.keys(rooms).length,
    totalUsers: Object.values(rooms).reduce((sum, room) => sum + room.users.length, 0),
    totalTasks: Object.values(rooms).reduce((sum, room) => sum + room.tasks.length, 0),
    rooms: Object.entries(rooms).map(([uuid, room]) => ({
      uuid,
      users: room.users.length,
      tasks: room.tasks.length,
      createdAt: room.createdAt
    }))
  };
  res.json(stats);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Planning Poker API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      stats: '/stats'
    }
  });
});

// Crear servidor HTTP y Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});

// ============================================
// REGISTRO DE EVENTOS DE SOCKET.IO
// ============================================

io.on('connection', (socket) => {
  console.log(`🔌 Cliente conectado: ${socket.id}`);

  socket.on('create-room', (data) => {
    try {
      handlers.handleCreateRoom(io, socket, data);
    } catch (error) {
      console.error('Error en create-room:', error);
      socket.emit('error', { message: 'Error al crear la sala' });
    }
  });

  socket.on('join-room', (data) => {
    try {
      handlers.handleJoinRoom(io, socket, data);
    } catch (error) {
      console.error('Error en join-room:', error);
      socket.emit('error', { message: 'Error al unirse a la sala' });
    }
  });

  socket.on('create-task', (data) => {
    try {
      handlers.handleCreateTask(io, socket, data);
    } catch (error) {
      console.error('Error en create-task:', error);
      socket.emit('error', { message: 'Error al crear la tarea' });
    }
  });

  socket.on('start-voting', (data) => {
    try {
      handlers.handleStartVoting(io, socket, data);
    } catch (error) {
      console.error('Error en start-voting:', error);
      socket.emit('error', { message: 'Error al iniciar votación' });
    }
  });

  socket.on('submit-vote', (data) => {
    try {
      handlers.handleSubmitVote(io, socket, data);
    } catch (error) {
      console.error('Error en submit-vote:', error);
      socket.emit('error', { message: 'Error al enviar voto' });
    }
  });

  socket.on('complete-voting', (data) => {
    try {
      handlers.handleCompleteVoting(io, socket, data);
    } catch (error) {
      console.error('Error en complete-voting:', error);
      socket.emit('error', { message: 'Error al completar votación' });
    }
  });

  socket.on('delete-task', (data) => {
    try {
      handlers.handleDeleteTask(io, socket, data);
    } catch (error) {
      console.error('Error en delete-task:', error);
      socket.emit('error', { message: 'Error al eliminar tarea' });
    }
  });

  socket.on('disconnect', () => {
    try {
      handlers.handleDisconnect(io, socket);
    } catch (error) {
      console.error('Error en disconnect:', error);
    }
  });

  // Manejo de errores del socket
  socket.on('error', (error) => {
    console.error(`❌ Error en socket ${socket.id}:`, error);
  });
});

// ============================================
// MANEJO DE ERRORES GLOBAL
// ============================================

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// ============================================
// LIMPIEZA DE SALAS INACTIVAS
// ============================================

if (NODE_ENV === 'production') {
  // Limpiar salas vacías cada hora en producción
  setInterval(() => {
    let cleanedRooms = 0;

    for (const roomUUID in rooms) {
      const room = rooms[roomUUID];

      // Si la sala está vacía
      if (room.users.length === 0) {
        delete rooms[roomUUID];
        cleanedRooms++;
      }
    }

    if (cleanedRooms > 0) {
      console.log(`🧹 Salas limpiadas: ${cleanedRooms}`);
    }
  }, 3600000); // Cada hora
}

// ============================================
// INICIAR SERVIDOR
// ============================================

server.listen(PORT, () => {
  console.log(`
 ***********************************************
   🚀 Planning Poker Server                    
   📡 Port: ${PORT}                            
   🌐 CORS: ${FRONTEND_URL}                   
   🔧 Environment: ${NODE_ENV}                
   ⏰ Started: ${new Date().toLocaleString()}  
 ***********************************************
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});