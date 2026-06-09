import { v4 as uuidv4 } from 'uuid';
import { validateUsername, validateScore, FIBONACCI_NUMBERS } from '../utils/validation.js';
import { rooms, getRoomOrError, isMaster, getUser, getTask } from '../store/rooms.js';

// Crear sala
export const handleCreateRoom = (io, socket, { username }) => {
    const validation = validateUsername(username);
    if (!validation.valid) {
        return socket.emit('error', { message: validation.error });
    }

    const roomUUID = uuidv4();
    const cleanUsername = validation.username;

    rooms[roomUUID] = {
        name: '',
        password: '',
        masterSocketId: socket.id,
        users: [{
            socketId: socket.id,
            username: cleanUsername,
            role: 'master',
            hasVoted: false
        }],
        tasks: [],
        createdAt: new Date().toISOString()
    };

    socket.join(roomUUID);

    console.log(`✅ Sala creada: ${roomUUID} por ${cleanUsername}`);
    socket.emit('room-created', { roomUUID });
    socket.emit('user-list-updated', rooms[roomUUID].users);
};

// Unirse a sala
export const handleJoinRoom = (io, socket, { roomUUID, username }) => {
    if (!roomUUID) {
        return socket.emit('error', { message: 'El código de sala es obligatorio' });
    }

    const validation = validateUsername(username);
    if (!validation.valid) {
        return socket.emit('error', { message: validation.error });
    }

    const room = getRoomOrError(roomUUID, socket);
    if (!room) return;

    const cleanUsername = validation.username;

    // Verificar si el usuario ya existe
    const existingUser = room.users.find(u => u.socketId === socket.id);
    if (existingUser) {
        return socket.emit('error', { message: 'Ya estás en esta sala' });
    }

    // Agregar usuario
    room.users.push({
        socketId: socket.id,
        username: cleanUsername,
        role: 'participant',
        hasVoted: false
    });

    socket.join(roomUUID);

    console.log(`✅ ${cleanUsername} se unió a sala ${roomUUID}`);

    // Notificar a todos
    io.to(roomUUID).emit('user-list-updated', room.users);

    // Enviar datos iniciales al nuevo usuario
    socket.emit('room-joined', {
        tasks: room.tasks,
        users: room.users,
        votingTaskId: room.tasks.find(t => t.state === 'voting')?.id || null
    });
};

// Crear tarea
export const handleCreateTask = (io, socket, { roomUUID, title }) => {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return socket.emit('error', { message: 'El título de la tarea es obligatorio' });
    }

    if (title.length > 200) {
        return socket.emit('error', { message: 'El título no puede exceder 200 caracteres' });
    }

    const room = getRoomOrError(roomUUID, socket);
    if (!room) return;

    if (!isMaster(socket, room)) {
        return socket.emit('error', { message: 'Solo el administrador puede crear tareas' });
    }

    // Verificar que no haya tarea activa
    const activeTask = room.tasks.find(t => t.state === 'pending' || t.state === 'voting');
    if (activeTask) {
        return socket.emit('error', { message: 'Ya hay una tarea activa. Complétala primero.' });
    }

    const task = {
        id: uuidv4(),
        title: title.trim(),
        state: 'pending',
        votes: [],
        results: null,
        createdAt: new Date().toISOString()
    };

    room.tasks.push(task);

    console.log(`✅ Tarea creada en ${roomUUID}: ${task.title}`);
    io.to(roomUUID).emit('task-created', task);
};

// Iniciar votación
export const handleStartVoting = (io, socket, { roomUUID, taskId }) => {
    const room = getRoomOrError(roomUUID, socket);
    if (!room) return;

    if (!isMaster(socket, room)) {
        return socket.emit('error', { message: 'Solo el administrador puede iniciar votaciones' });
    }

    const task = getTask(taskId, room);
    if (!task) {
        return socket.emit('error', { message: 'Tarea no encontrada' });
    }

    if (task.state !== 'pending') {
        return socket.emit('error', { message: 'La tarea no está en estado pendiente' });
    }

    // Actualizar estado de la tarea
    task.state = 'voting';
    task.votes = [];
    task.results = null;

    // Resetear votos de usuarios
    room.users.forEach(u => u.hasVoted = false);

    console.log(`🗳️  Votación iniciada en ${roomUUID} para tarea: ${task.title}`);

    // Emitir eventos
    io.to(roomUUID).emit('voting-started', { taskId });
    io.to(roomUUID).emit('task-updated', task);
    io.to(roomUUID).emit('user-list-updated', room.users);
};

// Enviar voto
export const handleSubmitVote = (io, socket, { roomUUID, taskId, score }) => {
    const room = getRoomOrError(roomUUID, socket);
    if (!room) return;

    const task = getTask(taskId, room);
    if (!task) {
        return socket.emit('error', { message: 'Tarea no encontrada' });
    }

    if (task.state !== 'voting') {
        return socket.emit('error', { message: 'La votación no está activa para esta tarea' });
    }

    if (!validateScore(score)) {
        return socket.emit('error', {
            message: `Puntuación inválida. Usa números de Fibonacci: ${FIBONACCI_NUMBERS.join(', ')}`
        });
    }

    const user = getUser(socket, room);
    if (!user) {
        return socket.emit('error', { message: 'Usuario no encontrado en la sala' });
    }

    // Verificar si ya votó - si es así, ACTUALIZAR el voto
    const existingVoteIndex = task.votes.findIndex(v => v.socketId === socket.id);

    if (existingVoteIndex !== -1) {
        // CAMBIAR voto existente
        const oldScore = task.votes[existingVoteIndex].score;
        task.votes[existingVoteIndex] = {
            socketId: socket.id,
            username: user.username,
            score
        };
        console.log(`🔄 Voto actualizado en ${roomUUID}: ${user.username} cambió de ${oldScore} a ${score}`);
    } else {
        // NUEVO voto
        task.votes.push({
            socketId: socket.id,
            username: user.username,
            score
        });
        user.hasVoted = true;
        console.log(`✅ Voto registrado en ${roomUUID}: ${user.username} votó ${score}`);
    }

    // Emitir actualizaciones
    io.to(roomUUID).emit('task-updated', task);
    io.to(roomUUID).emit('user-list-updated', room.users);
};

// Completar votación
export const handleCompleteVoting = (io, socket, { roomUUID, taskId }) => {
    const room = getRoomOrError(roomUUID, socket);
    if (!room) return;

    if (!isMaster(socket, room)) {
        return socket.emit('error', { message: 'Solo el administrador puede completar votaciones' });
    }

    const task = getTask(taskId, room);
    if (!task) {
        return socket.emit('error', { message: 'Tarea no encontrada' });
    }

    if (task.state !== 'voting') {
        return socket.emit('error', { message: 'La tarea no está en votación' });
    }

    if (task.votes.length === 0) {
        return socket.emit('error', { message: 'No hay votos para completar' });
    }

    // Completar votación
    task.state = 'completed';
    task.results = task.votes;
    task.completedAt = new Date().toISOString();

    // Resetear estado de votación de usuarios
    room.users.forEach(u => u.hasVoted = false);

    console.log(`✅ Votación completada en ${roomUUID}: ${task.title} (${task.votes.length} votos)`);

    // Emitir eventos
    io.to(roomUUID).emit('voting-completed', { taskId, results: task.votes });
    io.to(roomUUID).emit('task-updated', task);
    io.to(roomUUID).emit('user-list-updated', room.users);
};

// Eliminar tarea
export const handleDeleteTask = (io, socket, { roomUUID, taskId }) => {
    const room = getRoomOrError(roomUUID, socket);
    if (!room) return;

    if (!isMaster(socket, room)) {
        return socket.emit('error', { message: 'Solo el administrador puede eliminar tareas' });
    }

    const taskIndex = room.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return socket.emit('error', { message: 'Tarea no encontrada' });
    }

    const task = room.tasks[taskIndex];

    // No permitir eliminar tarea en votación
    if (task.state === 'voting') {
        return socket.emit('error', { message: 'No puedes eliminar una tarea en votación. Complétala primero.' });
    }

    room.tasks.splice(taskIndex, 1);

    console.log(`🗑️  Tarea eliminada en ${roomUUID}: ${task.title}`);

    io.to(roomUUID).emit('task-deleted', taskId);
};

// Desconexión
export const handleDisconnect = (io, socket) => {
    for (const roomUUID in rooms) {
        const room = rooms[roomUUID];
        const userIndex = room.users.findIndex(u => u.socketId === socket.id);

        if (userIndex !== -1) {
            const user = room.users[userIndex];
            console.log(`👋 ${user.username} se desconectó de ${roomUUID}`);

            room.users.splice(userIndex, 1);

            // Si era el master, eliminar sala
            if (room.masterSocketId === socket.id) {
                console.log(`🗑️  Sala eliminada: ${roomUUID} (master desconectado)`);
                delete rooms[roomUUID];
                io.to(roomUUID).emit('room-deleted');
            } else {
                // Notificar a los demás usuarios
                io.to(roomUUID).emit('user-list-updated', room.users);
            }

            break;
        }
    }
};
