import { createContext, useReducer } from 'react'
import { reducer, initialState } from '../reducer/LikeCard'

export const LikeCardContext = createContext()

export function LikeCardProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const addLikeCard = (card) =>
		dispatch({
			type: 'addcard',
			payload: card,
		})

	const removeLikeCard = (card) =>
		dispatch({
			type: 'removecard',
			payload: card,
		})

	return (
		<LikeCardContext.Provider
			value={{
				likeCard: state,
				addLikeCard,
				removeLikeCard,
			}}>
			{children}
		</LikeCardContext.Provider>
	)
}
