import { useState } from 'react'
import searchCharacters from '../services/characters.js'

const useCharacters = () => {
	const [characters, setCharacters] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadPagination, setLoadPagination] = useState(false)

	const getCharacters = async (search, page) => {
		setIsLoading(true)
		const newCharacters = await searchCharacters({ search, page })
		if (page === 0) {
			setCharacters(newCharacters)
		} else {
			setCharacters((prev) => [...prev, ...newCharacters])
		}
		setIsLoading(false)
		setLoadPagination(false)
	}

	return {
		isLoading,
		isLoadPagination,
		setLoadPagination,
		characters,
		getCharacters,
	}
}

export default useCharacters
