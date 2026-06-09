export const initialState = JSON.parse(window.localStorage.getItem('card')) || []

export const reducer = (state, action) => {
	const { type: actionType, payload: actionPayload } = action

	if (actionType === 'addcard') {
		const { id } = actionPayload
		const existCard = state.findIndex((item) => item.id === id)
		if (existCard >= 0) {
			const newState = structuredClone(state)
			return newState
		}
		const newState = [
			...state,
			{
				...actionPayload,
			},
		]
		window.localStorage.setItem('card', JSON.stringify(newState))
		return newState
	}

	if (actionType === 'removecard') {
		const { id } = actionPayload
		const newState = state.filter((item) => item.id !== id)
		window.localStorage.setItem('card', JSON.stringify(newState))
		return newState
	}

	return state
}
