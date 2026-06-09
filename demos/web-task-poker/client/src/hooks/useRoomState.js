import { useRoom } from '../context/RoomContext';

export const useRoomState = () => {
	const { 
		users, 
		tasks, 
		currentUser, 
		votingTaskId, 
		isConnected,
		roomUUID,
	} = useRoom();

	return {
		users,
		tasks,
		currentUser,
		votingTaskId,
		isConnected,
		roomUUID,
	};
};