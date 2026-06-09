import { useCallback } from 'react';
import { useSocketEvent } from './useSocketEvent';

export const useVotingEvents = (socket, handlers) => {
	const { onVotingStarted, onVotingCompleted } = handlers;

	const handleVotingStarted = useCallback(({ taskId }) => {
		console.log('Votación iniciada:', taskId);
		onVotingStarted(taskId);
	}, [onVotingStarted]);

	const handleVotingCompleted = useCallback(({ taskId, results }) => {
		console.log('Votación completada:', { taskId, results });
		onVotingCompleted(taskId, results);
	}, [onVotingCompleted]);

	useSocketEvent(socket, 'voting-started', handleVotingStarted);
	useSocketEvent(socket, 'voting-completed', handleVotingCompleted);
};