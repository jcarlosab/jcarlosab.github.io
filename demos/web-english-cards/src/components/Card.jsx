/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const Card = ({ currentWord, bgColor, handleNextWord }) => {
	const { word, translation, description, type, tense } = currentWord
	const [showInfo, setShowInfo] = useState(false)

	const toggleInfo = () => {
		setShowInfo(!showInfo)
	}

	useEffect(() => {
		setShowInfo(false)
	}, [word])

	return (
		<div className={`card ${bgColor}`}>
			<div className='btn-help' onClick={toggleInfo}>?</div>
			<p className="word">{word}</p>
			{(showInfo || bgColor == 'red') && (
				<div className="bottom-text-card">
					{bgColor == 'red' &&
						<p className="word">{translation}</p>
					}
					<p><span className='bold'>Type:</span> {type}</p>
					{
						tense !== undefined && (
							<p><span className='bold'>Tense:</span> {tense}</p>
						)
					}
					<p><span className='bold'>Description:</span> {description}</p>
					{bgColor == 'red' &&
						<button onClick={handleNextWord}>
							Continuar
						</button>
					}
				</div>
			)}
		</div>
	)
}

export default Card
