import { render, screen } from '@testing-library/react'
import Header from './Header'
import { LikeCardProvider } from '../context/LikeCard'

const HeaderWithContext = () => (
	<LikeCardProvider>
		<Header />
	</LikeCardProvider>
)

describe('Header', () => {
	test('should render logo', () => {
		render(<HeaderWithContext />)
		expect(screen.getByRole('img', { name: 'Marvel logo' })).toBeVisible()
	})

	test('should render like icon', () => {
		render(<HeaderWithContext />)
		expect(screen.getByRole('img', { name: 'like' })).toBeVisible()
	})

	test('should render link logo', () => {
		render(<HeaderWithContext />)
		expect(screen.getByRole('link', { name: 'Marvel logo' })).toBeVisible()
	})

	test('should render link like icon', () => {
		render(<HeaderWithContext />)
		expect(screen.getByRole('link', { name: 'like 0' })).toBeVisible()
	})
})
