import '../App.css'
import { useParams } from 'react-router-dom'
import Comics from '../components/Comics.js'
import CharacterInfo from '../components/CharacterInfo.js'

const DetailPage = () => {
	const { id } = useParams()

	return (
		<main>
			<CharacterInfo id={id} />
			<Comics comics={id} />
		</main>
	)
}

export default DetailPage
