// app/src/services/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Replace with production URL

export function initSocket() {
  const socket = io(SOCKET_URL, { 
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 10000, // Tiempo de espera para la conexión
  });

  socket.on('connect', () => {
    console.log('Socket conectado:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.warn('Socket desconectado:', reason);
    if (reason === 'io server disconnect') {
      socket.connect(); // Reconectar manualmente si el servidor desconecta
    }
  });

  socket.on('connect_error', (error) => {
    console.error('Error de conexión:', error.message);
  });

  return socket;
}

export function createRoom(socket, username) {
  console.log('Creando sala con usuario:', username);
  socket.emit('create-room', { username });
}

export function joinRoom(socket, roomUUID, username) {
  console.log('Uniéndose a sala:', { roomUUID, username });
  socket.emit('join-room', { roomUUID, username });
}

export function createTask(socket, roomUUID, title) {
  console.log('Creando tarea:', { roomUUID, title });
  socket.emit('create-task', { roomUUID, title });
}

export function startVoting(socket, roomUUID, taskId) {
  console.log('Iniciando votación:', { roomUUID, taskId });
  socket.emit('start-voting', { roomUUID, taskId });
}

export function submitVote(socket, roomUUID, taskId, score) {
  console.log('Enviando voto:', { roomUUID, taskId, score });
  if (!socket.connected) {
    console.error('Socket no está conectado');
    return;
  }
  socket.emit('submit-vote', { roomUUID, taskId, score });
}