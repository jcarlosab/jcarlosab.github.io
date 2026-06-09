import logo from '../assets/Marvel logo.svg'
import iconLikeRed from '../assets/Heart icon red.svg'
import { useLike } from '../hooks/useLike.js'

const Header = () => {
	const { likeCard } = useLike()
	return (
		<header className='app-header'>
			<a href='/'>
				<img className='logo' src={logo} alt='Marvel logo' />
			</a>
			<a href='/favourites' className='like-counter'>
				<img src={iconLikeRed} alt='like' />
				<div>{likeCard.length}</div>
			</a>
		</header>
	)
}

export default Header
