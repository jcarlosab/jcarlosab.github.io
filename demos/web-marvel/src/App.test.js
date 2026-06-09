import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
	test('should render header', () => {
		render(<App />)
		expect(screen.getByRole('img', { name: 'Marvel logo' })).toBeVisible()

		expect(screen.getByRole('link', { name: 'Marvel logo' })).toBeVisible()
		expect(screen.getByRole('link', { name: 'like 0' })).toBeVisible()
	})
	test('should render like value 0', () => {
		render(<App />)
		expect(screen.getByRole('link', { name: 'like 0' })).toBeVisible()
	})
	test('should render results', () => {
		render(<App />)
		expect(screen.getByText(/0 Results/i)).toBeInTheDocument()
	})
})
