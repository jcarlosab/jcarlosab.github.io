import React from 'react'
import { render, screen } from '@testing-library/react'
import ListCards from './ListCards'

// Mock del componente Card
jest.mock('./Card', () => ({ result }) => (
	<div data-testid='card'>
		<h3>{result.title}</h3>
	</div>
))

describe('ListCards', () => {
	test('renders "No results" message when results are empty', () => {
		render(<ListCards results={[]} />)

		const noResultsMessage = screen.getByText(/no results/i)
		expect(noResultsMessage).toBeInTheDocument()
	})

	test('renders Card components when results are provided', () => {
		const mockResults = [
			{ id: 1, title: 'Result 1' },
			{ id: 2, title: 'Result 2' },
		]

		render(<ListCards results={mockResults} />)

		const cards = screen.getAllByTestId('card')
		expect(cards).toHaveLength(mockResults.length)

		mockResults.forEach((result, index) => {
			expect(cards[index]).toHaveTextContent(result.title)
		})
	})
})
