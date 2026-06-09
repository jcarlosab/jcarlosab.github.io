export const tasksActions = {
	ADD_TASK: 'ADD_TASK',
	UPDATE_TASK: 'UPDATE_TASK',
	DELETE_TASK: 'DELETE_TASK',
	START_VOTING: 'START_VOTING',
	COMPLETE_VOTING: 'COMPLETE_VOTING',
	SET_TASKS: 'SET_TASKS',
};

export const tasksReducer = (state, action) => {
	switch (action.type) {
		case tasksActions.ADD_TASK:
			return [...state, action.payload];

		case tasksActions.UPDATE_TASK:
			return state.map(task =>
				task.id === action.payload.id ? action.payload : task
			);

		case tasksActions.DELETE_TASK:
			return state.filter(task => task.id !== action.payload);

		case tasksActions.START_VOTING:
			return state.map(task =>
				task.id === action.payload
				? { ...task, state: 'voting', votes: [], results: null }
				: task
			);

		case tasksActions.COMPLETE_VOTING:
			return state.map(task =>
				task.id === action.payload.taskId
				? { ...task, state: 'completed', results: action.payload.results }
				: task
			);

		case tasksActions.SET_TASKS:
			return action.payload;

		default:
			return state;
	}
};