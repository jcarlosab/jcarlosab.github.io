import { render, screen } from '@testing-library/react'
import LikeListPage from './LikeListPage'

describe('LikeListPage', () => {
	test('should render title LikeListPage', () => {
		render(<LikeListPage />)
		expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
	})
})
