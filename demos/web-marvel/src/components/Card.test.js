import { render, screen } from '@testing-library/react'
import Card from './Card'
import { LikeCardProvider } from '../context/LikeCard'

const CardWithContext = () => (
	<LikeCardProvider>
		<Card
			result={{
				id: '1011334',
				name: 'test',
				thumbnail: {
					path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
					extension: 'jpg',
				},
			}}
		/>
	</LikeCardProvider>
)

describe('Card', () => {
	test('should render image card', () => {
		render(<CardWithContext />)
		expect(screen.getByRole('img')).toBeVisible()
	})

	test('should render name card', () => {
		render(<CardWithContext />)
		expect(screen.getByRole('heading', { level: 3 })).toBeVisible()
	})

	test('should render button like', () => {
		render(<CardWithContext />)
		expect(screen.getByRole('button')).toBeVisible()
	})
})
