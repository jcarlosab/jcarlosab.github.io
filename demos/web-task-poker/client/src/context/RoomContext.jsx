import { createContext, useContext, useReducer, useState, useCallback } from 'react';
import { useSocketConnection } from '../hooks/useSocketConnection';
import { useRoomEvents } from '../hooks/useRoomEvents';
import { useUserEvents } from '../hooks/useUserEvents';
import { useTaskEvents } from '../hooks/useTaskEvents';
import { useVotingEvents } from '../hooks/useVotingEvents';
import { tasksReducer, tasksActions } from '../reducers/tasksReducer';
import { usersReducer, usersActions } from '../reducers/usersReducer';
import { roomActions } from '../services/roomActions';

const RoomContext = createContext();

export function RoomProvider({ children }) {
	// Socket connection
	const { socket, isConnected } = useSocketConnection();

	// Estado simple
	const [roomUUID, setRoomUUID] = useState('');
	const [currentUser, setCurrentUser] = useState({ username: '', role: '' });
	const [votingTaskId, setVotingTaskId] = useState(null);

	// Estado complejo con reducers
	const [tasks, dispatchTasks] = useReducer(tasksReducer, []);
	const [users, dispatchUsers] = useReducer(usersReducer, []);

	// ============================================
	// HANDLERS DE EVENTOS
	// ============================================

	const handleRoomCreated = useCallback((uuid) => {
		setRoomUUID(uuid);
	}, []);

	const handleRoomJoined = useCallback(({ tasks: roomTasks, users: roomUsers }) => {
		dispatchTasks({ type: tasksActions.SET_TASKS, payload: roomTasks });
		dispatchUsers({ type: usersActions.SET_USERS, payload: roomUsers });
		if (votingTaskId) {
			setVotingTaskId(votingTaskId);
		}
	}, []);

	const handleUsersUpdated = useCallback((updatedUsers) => {
		dispatchUsers({ type: usersActions.SET_USERS, payload: updatedUsers });
	}, []);

	const handleTaskCreated = useCallback((task) => {
		dispatchTasks({ type: tasksActions.ADD_TASK, payload: task });
	}, []);

	const handleTaskUpdated = useCallback((task) => {
		dispatchTasks({ type: tasksActions.UPDATE_TASK, payload: task });
		
		// Actualizar estado de votación de usuarios si es necesario
		if (task.state === 'voting' && Array.isArray(task.votes)) {
		dispatchUsers({ 
			type: usersActions.UPDATE_USER_VOTE_STATUS, 
			payload: { votes: task.votes } 
		});
		}
	}, []);

	const handleTaskDeleted = useCallback((taskId) => {
		dispatchTasks({ type: tasksActions.DELETE_TASK, payload: taskId });
	}, []);

	const handleVotingStarted = useCallback((taskId) => {
		setVotingTaskId(taskId);
		dispatchTasks({ type: tasksActions.START_VOTING, payload: taskId });
	}, []);

	const handleVotingCompleted = useCallback((taskId, results) => {
		setVotingTaskId(null);
		dispatchTasks({ 
		type: tasksActions.COMPLETE_VOTING, 
		payload: { taskId, results } 
		});
	}, []);
	
	// ============================================
	// REGISTRAR EVENTOS
	// ============================================

	useRoomEvents(socket, {
		onRoomCreated: handleRoomCreated,
		onRoomJoined: handleRoomJoined,
	});

	useUserEvents(socket, handleUsersUpdated);

	useTaskEvents(socket, {
		onTaskCreated: handleTaskCreated,
		onTaskUpdated: handleTaskUpdated,
		onTaskDeleted: handleTaskDeleted,
	});

	useVotingEvents(socket, {
		onVotingStarted: handleVotingStarted,
		onVotingCompleted: handleVotingCompleted,
	});

	// ============================================
	// ACCIONES PÚBLICAS
	// ============================================

	const actions = {
		vote: useCallback((score) => {
		try {
			roomActions.vote(socket, roomUUID, votingTaskId, score);
		} catch (error) {
			console.error('Error al votar:', error);
			alert('Error de conexión. Por favor, recarga la página.');
		}
		}, [socket, roomUUID, votingTaskId]),

		deleteTask: useCallback((taskId) => {
		try {
			roomActions.deleteTask(socket, roomUUID, taskId);
		} catch (error) {
			console.error('Error al eliminar tarea:', error);
			alert('Error de conexión. Por favor, recarga la página.');
		}
		}, [socket, roomUUID]),

		createTask: useCallback((title) => {
		try {
			roomActions.createTask(socket, roomUUID, title);
		} catch (error) {
			console.error('Error al crear tarea:', error);
			alert('Error de conexión. Por favor, recarga la página.');
		}
		}, [socket, roomUUID]),

		startVoting: useCallback((taskId) => {
		try {
			roomActions.startVoting(socket, roomUUID, taskId);
		} catch (error) {
			console.error('Error al iniciar votación:', error);
			alert('Error de conexión. Por favor, recarga la página.');
		}
		}, [socket, roomUUID]),

		completeVoting: useCallback((taskId) => {
		try {
			roomActions.completeVoting(socket, roomUUID, taskId);
		} catch (error) {
			console.error('Error al completar votación:', error);
			alert('Error de conexión. Por favor, recarga la página.');
		}
		}, [socket, roomUUID]),
	};

	// ============================================
	// CONTEXT VALUE
	// ============================================

	const value = {
		// Estado
		socket,
		isConnected,
		roomUUID,
		setRoomUUID,
		currentUser,
		setCurrentUser,
		users,
		tasks,
		votingTaskId,

		// Acciones
		...actions,
	};

	return (
		<RoomContext.Provider value={value}>
		{children}
		</RoomContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRoom = () => {
	const context = useContext(RoomContext);
	if (!context) {
		throw new Error('useRoom debe usarse dentro de RoomProvider');
	}
	return context;
};