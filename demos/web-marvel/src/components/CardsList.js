import Card from './Card'

const CardsList = ({ results }) => {
	return (
		<>
			{results.length === 0 ? (
				<p className='font-black'>No results</p>
			) : (
				results.map((result) => <Card key={result.id} result={result} />)
			)}
		</>
	)
}

export default CardsList
