import { useLike } from '../hooks/useLike.js'

const Cards = ({ result }) => {
	const { likeCard, addLikeCard, removeLikeCard } = useLike()
	const isLike = likeCard.some((item) => item.id === result.id)

	return (
		<div key={result.id} className='card'>
			<a href={`/detail/${result.id}`} key={result.id} className='card'>
				<img
					className='card-image'
					src={result.thumbnail.path + '.' + result.thumbnail.extension}
					alt={'Image ' + result.name}
				/>
			</a>
			<div className='card-info'>
				<h3>{result.name}</h3>
				<div
					role='button'
					className='icon-like'
					onClick={() =>
						isLike ? removeLikeCard(result) : addLikeCard(result)
					}>
					<i className={isLike ? 'like active' : 'like inactive'} />
				</div>
			</div>
		</div>
	)
}

export default Cards
