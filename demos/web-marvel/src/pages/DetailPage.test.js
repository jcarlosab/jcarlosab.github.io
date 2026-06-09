import { render } from '@testing-library/react'
import DetailPage from './DetailPage'
import { LikeCardProvider } from '../context/LikeCard'

const DetailWithContext = () => (
	<LikeCardProvider>
		<DetailPage />
	</LikeCardProvider>
)
describe('DetailPage', () => {
	test('should render DetailPage', () => {
		render(<DetailWithContext />)
	})
})
