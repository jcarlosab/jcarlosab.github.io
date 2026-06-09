import { useEffect, useState } from 'react'
import Form from '../components/Form.js'
import ListCards from '../components/CardsList.js'
import useCharacters from '../hooks/useCharacters.js'
import Spinner from '../components/Spinner.js'

const ListPage = () => {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(0)
	const {
		isLoading,
		isLoadPagination,
		setLoadPagination,
		characters,
		getCharacters,
	} = useCharacters()

	useEffect(() => {
		getCharacters(search, page)
	}, [page, search])

	const handleScroll = () => {
		const { scrollTop, scrollHeight } = document.documentElement
		const { innerHeight } = window
		if (innerHeight + scrollTop + 1 >= scrollHeight && !isLoadPagination) {
			setLoadPagination(true)
			setPage((prev) => prev + 1)
		}
	}

	const handleSearch = (query) => {
		setSearch(query)
		setPage(0)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isLoadPagination])

	return (
		<main>
			<Form onSearch={handleSearch} numResults={characters.length} />
			<div className='grid-cards'>
				{isLoading && characters.length === 0 ? (
					<Spinner />
				) : (
					<ListCards results={characters} />
				)}
			</div>
			{isLoadPagination && <Spinner />}
		</main>
	)
}

export default ListPage
