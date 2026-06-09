import { useEffect } from 'react';

export const useSocketEvent = (socket, eventName, handler) => {
	useEffect(() => {
		if (!socket) return;

		socket.on(eventName, handler);
		return () => socket.off(eventName, handler);
	}, [socket, eventName, handler]);
};