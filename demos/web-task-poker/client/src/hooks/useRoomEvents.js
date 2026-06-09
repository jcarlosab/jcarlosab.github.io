import { useCallback } from 'react';
import { useSocketEvent } from './useSocketEvent';

export const useRoomEvents = (socket, handlers) => {
	const {
		onRoomCreated,
		onRoomJoined,
		//onRoomDeleted,
		onError,
	} = handlers;

	const handleRoomCreated = useCallback((data) => {
		console.log('Sala creada:', data.roomUUID);
		onRoomCreated(data.roomUUID);
	}, [onRoomCreated]);

	const handleRoomJoined = useCallback((data) => {
		console.log('Unido a sala:', data);
		onRoomJoined(data);
	}, [onRoomJoined]);

	const handleRoomDeleted = useCallback(() => {
		alert('Sala eliminada por el administrador');
		window.location.href = '/';
	}, []);

	const handleError = useCallback(({ message }) => {
		console.error('Error del servidor:', message);
		if (onError) onError(message);
		else alert(message);
	}, [onError]);

	useSocketEvent(socket, 'room-created', handleRoomCreated);
	useSocketEvent(socket, 'room-joined', handleRoomJoined);
	useSocketEvent(socket, 'room-deleted', handleRoomDeleted);
	useSocketEvent(socket, 'error', handleError);
};