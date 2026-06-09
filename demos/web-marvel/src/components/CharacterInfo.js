import { useLike } from '../hooks/useLike.js'
import { useEffect, useState } from 'react'
import useCharacter from '../hooks/useCharacter.js'

const CharacterInfo = ({ id }) => {
	const { character } = useCharacter({ id })
	const { likeCard, addLikeCard, removeLikeCard } = useLike()
	const [stateCard, setStateCard] = useState()

	useEffect(() => {
		if (character[0] !== undefined)
			setStateCard(likeCard.some((item) => item.id === character[0].id))
	}, [character, likeCard])

	return (
		<>
			{character.map((result) => (
				<div key={result.id} className='character-info'>
					<img
						className='image-detail'
						src={result.thumbnail.path + '.' + result.thumbnail.extension}
						alt={'Image ' + result.name}
					/>
					<div className='text-container'>
						<div className='character-title'>
							<h1 className='title-detail'>{result.name}</h1>
							<div
								onClick={() =>
									stateCard ? removeLikeCard(result) : addLikeCard(result)
								}
								className='icon-like'>
								<i
									className={
										stateCard ? 'like big active' : 'like big inactive'
									}
								/>
							</div>
						</div>
						<p>
							{result.description === ''
								? 'No description'
								: `${result.description}`}
						</p>
					</div>
				</div>
			))}
		</>
	)
}

export default CharacterInfo
