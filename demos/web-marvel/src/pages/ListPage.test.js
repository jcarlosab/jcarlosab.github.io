import { render, screen } from '@testing-library/react'
import ListPage from './ListPage'

describe('ListPage', () => {
	test('should render ListPage', () => {
		render(<ListPage />)
		expect(
			screen.getByPlaceholderText('SEARCH A CHARACTER...'),
		).toBeInTheDocument()
		expect(screen.getByText('0 Results')).toBeInTheDocument()
	})
})
