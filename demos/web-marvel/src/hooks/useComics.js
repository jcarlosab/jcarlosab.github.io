import searchComics from '../services/comics.js'
import { useEffect, useState } from 'react'

const useComics = (id) => {
	const [comics, setComics] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const getComics = async () => {
		setIsLoading(true)
		try {
			const newComics = await searchComics({ id })
			setComics(newComics.reverse())
		} catch (error) {
			throw new Error('Error on hook searching comics ' + error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getComics()
	}, [])

	return { isLoading, comics }
}

export default useComics
