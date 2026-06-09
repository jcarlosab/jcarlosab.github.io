import { render, screen } from '@testing-library/react'
import Form from './Form'
import userEvent from '@testing-library/user-event'

describe('Form', () => {
	test('should render text input', () => {
		render(<Form />)
		expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toBeVisible()
	})

	test('should update text input changes', () => {
		render(<Form />)
		userEvent.type(
			screen.getByPlaceholderText('SEARCH A CHARACTER...'),
			'spider...',
		)
		expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toHaveValue(
			'spider...',
		)
	})

	test('should number of characters', () => {
		render(<Form />)
		expect(screen.getByText(/Results/)).toBeVisible()
	})

	test('renders input and shows number of results', () => {
		render(<Form onSearch={jest.fn()} numResults={50} />)

		const inputElement = screen.getByPlaceholderText('SEARCH A CHARACTER...')
		expect(inputElement).toBeInTheDocument()

		const resultsText = screen.getByText(/50 Results/i)
		expect(resultsText).toBeInTheDocument()
	})
})
