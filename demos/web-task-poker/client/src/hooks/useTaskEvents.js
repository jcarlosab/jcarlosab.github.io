import { useCallback } from 'react';
import { useSocketEvent } from './useSocketEvent';

export const useTaskEvents = (socket, handlers) => {
	const {
		onTaskCreated,
		onTaskUpdated,
		onTaskDeleted,
	} = handlers;

	const handleTaskCreated = useCallback((task) => {
		console.log('Tarea creada:', task);
		onTaskCreated(task);
	}, [onTaskCreated]);

	const handleTaskUpdated = useCallback((task) => {
		console.log('Tarea actualizada:', task);
		onTaskUpdated(task);
	}, [onTaskUpdated]);

	const handleTaskDeleted = useCallback((taskId) => {
		console.log('Tarea eliminada:', taskId);
		onTaskDeleted(taskId);
	}, [onTaskDeleted]);

	useSocketEvent(socket, 'task-created', handleTaskCreated);
	useSocketEvent(socket, 'task-updated', handleTaskUpdated);
	useSocketEvent(socket, 'task-deleted', handleTaskDeleted);
};