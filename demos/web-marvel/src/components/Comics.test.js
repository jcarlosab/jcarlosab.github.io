import { render, screen } from '@testing-library/react'
import Comics from './Comics'

jest.mock('../hooks/useComics', () => {
	return () => ({
		comics: [
			{
				id: '1009149',
				title: 'Test comic',
				thumbnail: {
					path: 'http://i.annihil.us/u/prod/marvel/i/mg/7/00/599b1cf83439a',
					extension: 'jpg',
				},
				dates: [{ date: '1995' }],
			},
		],
	})
})

describe('Comics', () => {
	test('should render comics', () => {
		render(<Comics />)
	})

	test('should render title component comics', () => {
		render(<Comics />)
		expect(screen.getByRole('heading', { level: 2 })).toBeVisible()
	})

	test('should render list of comics', () => {
		render(<Comics />)
		expect(screen.getByText(/Comics/)).toBeVisible()
	})

	test('should render image comic', () => {
		render(<Comics />)
		expect(screen.getByRole('img')).toBeVisible()
	})

	test('should render title comic', () => {
		render(<Comics />)
		expect(screen.getByRole('heading', { level: 3 })).toBeVisible()
	})

	test('should render date comic', () => {
		render(<Comics />)
		expect(screen.getByText('1995')).toBeVisible()
	})
})
