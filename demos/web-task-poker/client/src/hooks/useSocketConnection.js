import { useEffect, useState } from 'react';
import { initSocket } from '../services/socket';

export const useSocketConnection = () => {
	const [socket, setSocket] = useState(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const socketInstance = initSocket();
		setSocket(socketInstance);

		const handleConnect = () => {
			console.log('Socket conectado:', socketInstance.id);
			setIsConnected(true);
		};

		const handleDisconnect = () => {
			console.log('Socket desconectado');
			setIsConnected(false);
		};

		socketInstance.on('connect', handleConnect);
		socketInstance.on('disconnect', handleDisconnect);

		return () => {
			socketInstance.off('connect', handleConnect);
			socketInstance.off('disconnect', handleDisconnect);
			socketInstance.disconnect();
		};
	}, []);

	return { socket, isConnected };
};