const useTaskActions = (socket, roomUUID) => {
	const createTask = (title) => {
		if (!title.trim()) return;
		socket.emit('create-task', { roomUUID, title });
	};

	const startVoting = (taskId) => {
		socket.emit('start-voting', { roomUUID, taskId });
	};

	const completeVoting = (taskId) => {
		socket.emit('complete-voting', { roomUUID, taskId });
	};

  	return { createTask, startVoting, completeVoting };
};

export default useTaskActions;