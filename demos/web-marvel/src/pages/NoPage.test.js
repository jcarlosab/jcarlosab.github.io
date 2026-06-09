import { render, screen } from '@testing-library/react'
import NoPage from './NoPage'

describe('NoPage', () => {
	test('should render title page 404', () => {
		render(<NoPage />)
		expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
	})
})
