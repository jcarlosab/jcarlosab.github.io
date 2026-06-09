// Almacenamiento en memoria
export const rooms = {};

export const getRoomOrError = (roomUUID, socket) => {
    if (!rooms[roomUUID]) {
        socket.emit('room-not-found');
        return null;
    }
    return rooms[roomUUID];
};

export const isMaster = (socket, room) => {
    return socket.id === room.masterSocketId;
};

export const getUser = (socket, room) => {
    return room.users.find(u => u.socketId === socket.id);
};

export const getTask = (taskId, room) => {
    return room.tasks.find(t => t.id === taskId);
};
