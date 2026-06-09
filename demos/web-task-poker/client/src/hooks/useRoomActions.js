import { useRoom } from '../context/RoomContext';

export const useRoomActions = () => {
	const { 
		vote, 
		deleteTask, 
		createTask, 
		startVoting, 
		completeVoting 
	} = useRoom();

	return {
		vote,
		deleteTask,
		createTask,
		startVoting,
		completeVoting,
	};
};