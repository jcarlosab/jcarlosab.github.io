import { render, screen } from '@testing-library/react'
import CharacterInfo from './CharacterInfo'
import { LikeCardProvider } from '../context/LikeCard'

const CharacterInfoWithContext = () => (
	<LikeCardProvider>
		<CharacterInfo id={'1011334'} />
	</LikeCardProvider>
)

jest.mock('../hooks/useCharacter', () => {
	return () => ({
		character: [
			{
				id: '1009149',
				name: 'A-Bomb (HAS)',
				thumbnail: {
					path: 'http://i.annihil.us/u/prod/marvel/i/mg/7/00/599b1cf83439a',
					extension: 'jpg',
				},
				description: 'Description',
			},
		],
	})
})

describe('CharacterInfo', () => {
	test('should render CharacterInfo', () => {
		render(<CharacterInfoWithContext />)
	})

	test('should render image character', () => {
		render(<CharacterInfoWithContext />)
		expect(screen.getByRole('img')).toBeVisible()
	})

	test('should render name character', () => {
		render(<CharacterInfoWithContext />)
		expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
	})

	test('should render description character', () => {
		render(<CharacterInfoWithContext />)
		expect(screen.getByText('Description')).toBeVisible()
	})
})
