export const roomActions = {
	vote: (socket, roomUUID, taskId, score) => {
		if (!socket?.connected) {
		throw new Error('Socket no conectado');
		}
		socket.emit('submit-vote', { roomUUID, taskId, score });
	},

	deleteTask: (socket, roomUUID, taskId) => {
		if (!socket?.connected) {
		throw new Error('Socket no conectado');
		}
		socket.emit('delete-task', { roomUUID, taskId });
	},

	createTask: (socket, roomUUID, title) => {
		if (!socket?.connected) {
		throw new Error('Socket no conectado');
		}
		socket.emit('create-task', { roomUUID, title });
	},

	startVoting: (socket, roomUUID, taskId) => {
		if (!socket?.connected) {
		throw new Error('Socket no conectado');
		}
		socket.emit('start-voting', { roomUUID, taskId });
	},

	completeVoting: (socket, roomUUID, taskId) => {
		if (!socket?.connected) {
		throw new Error('Socket no conectado');
		}
		socket.emit('complete-voting', { roomUUID, taskId });
	},
};