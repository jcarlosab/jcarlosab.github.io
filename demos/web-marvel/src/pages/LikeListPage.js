import { useLike } from '../hooks/useLike.js'
import { useEffect, useState } from 'react'
import Form from '../components/Form.js'
import ListCards from '../components/CardsList.js'

const LikeListPage = () => {
	const { likeCard } = useLike()
	const [results, setResults] = useState([])

	const handleSearch = (query) => {
		const localCharactersFilter = likeCard.filter((character) =>
			character.name.toLowerCase().includes(query),
		)
		setResults(localCharactersFilter)
	}

	useEffect(() => {
		setResults(likeCard)
	}, [likeCard])

	return (
		<main>
			<h1 className='title-favorite'>Favorite</h1>
			<Form onSearch={handleSearch} numResults={results.length} />
			<div className='grid-cards'>
				<ListCards results={results} />
			</div>
		</main>
	)
}

export default LikeListPage
