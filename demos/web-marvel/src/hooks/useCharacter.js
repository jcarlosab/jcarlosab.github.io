import { useEffect, useState } from 'react'
import searchCharacter from '../services/character.js'

const useCharacter = ({ id }) => {
	const [character, setCharacter] = useState([])

	const getCharacter = async () => {
		const newCharacter = await searchCharacter({ id })
		setCharacter(newCharacter)
	}

	useEffect(() => {
		getCharacter()
	}, [])

	return { character }
}

export default useCharacter
