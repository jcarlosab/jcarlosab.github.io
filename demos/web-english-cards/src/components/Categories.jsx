import { Link } from 'react-router-dom'
import easy from '../levels/easy.json'
import medium from '../levels/medium.json'
import hard from '../levels/hard.json'
import verbs from '../levels/verbs.json'
import adjectives from '../levels/adjectives.json'
import adverbs from '../levels/adverbs.json'
import clothes from '../levels/clothes.json'
import foods from '../levels/foods.json'
import places from '../levels/places.json'
import iconCard from '../assets/style_48dp_wght.svg'

const Categories = () => {
	const levels = [
		{ path: '/level/easy', data: easy },
		{ path: '/level/medium', data: medium },
		{ path: '/level/hard', data: hard },
		{ path: '/level/verbs', data: verbs },
		{ path: '/level/adjectives', data: adjectives },
		{ path: '/level/adverbs', data: adverbs },
		{ path: '/level/clothes', data: clothes },
		{ path: '/level/foods', data: foods },
		{ path: '/level/places', data: places }
	]

	return (
		<div className='categories'>
			{
				levels.map((level, index) => (
					<div key={index} className='category-card'>
						<Link to={level.path} state={level.data}>
							<p className='emoji'>{level.data.icon}</p>
							<p>{level.data.title}</p>
							<div className='card-icon'>
								<img src={iconCard} alt='card' />
								<p className='cat-card-number'>{level.data.words.length}</p>
							</div>
						</Link>
					</div>
				))
			}
		</div>
	)
}

export default Categories
