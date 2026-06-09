import { useContext } from 'react'
import { LikeCardContext } from '../context/LikeCard.js'

export const useLike = () => {
	const context = useContext(LikeCardContext)
	return context
}
