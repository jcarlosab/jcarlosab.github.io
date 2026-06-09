import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoginNavigation = (socket, roomUUID) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!socket) return;

		const handleRoomCreated = ({ roomUUID }) => {
		console.log('Sala creada, redirigiendo a:', `/room/${roomUUID}`);
		navigate(`/room/${roomUUID}`, { replace: true });
		};

		const handleRoomJoined = () => {
		console.log('Unido a sala, redirigiendo a:', `/room/${roomUUID}/vote`);
		navigate(`/room/${roomUUID}/vote`, { replace: true });
		};
		/*const handleRoomNotFound = () => {
    console.error('Sala no encontrada');
    navigate('/', { replace: true });
    alert('La sala no existe o ha sido eliminada');
  };*/

		socket.on('room-created', handleRoomCreated);
		socket.on('room-joined', handleRoomJoined);
		//socket.on('room-not-found', handleRoomNotFound);

		return () => {
		socket.off('room-created', handleRoomCreated);
		socket.off('room-joined', handleRoomJoined);
		//socket.off('room-not-found', handleRoomNotFound);
		};
	}, [socket, roomUUID, navigate]);
};