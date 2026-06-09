/* eslint-disable react/prop-types */
import iconCard from '../assets/style_48dp.svg'

const Counter = ({ numberCards, counter }) => {
	const value = numberCards - counter.correct - counter.incorrect

	return (
		<div className="counter">
			<div className="bold"><img src={iconCard} alt='icon card'/>{value}</div>
			<div className="bold color-red"><img src={iconCard} alt='icon card error'/>{counter.incorrect}</div>
		</div>
	)
}

export default Counter
