import { useCallback } from 'react';
import { useSocketEvent } from './useSocketEvent';

export const useUserEvents = (socket, onUsersUpdated) => {
	const handleUserListUpdated = useCallback((users) => {
		console.log('Lista de usuarios actualizada:', users);
		onUsersUpdated(users);
	}, [onUsersUpdated]);

	useSocketEvent(socket, 'user-list-updated', handleUserListUpdated);
};