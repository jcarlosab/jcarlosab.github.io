export const usersActions = {
	SET_USERS: 'SET_USERS',
	UPDATE_USER_VOTE_STATUS: 'UPDATE_USER_VOTE_STATUS',
};

export const usersReducer = (state, action) => {
	switch (action.type) {
		case usersActions.SET_USERS:
			return action.payload;

		case usersActions.UPDATE_USER_VOTE_STATUS:
			{ const { votes } = action.payload;
			return state.map(user => ({
				...user,
				hasVoted: votes.some(v => v.socketId === user.socketId),
			})); }

		default:
			return state;
	}
};