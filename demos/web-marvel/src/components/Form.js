import { useState } from 'react'

const Form = ({ onSearch, numResults }) => {
	const [search, setSearch] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		onSearch(search)
	}

	return (
		<div className='form-results'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={search}
					placeholder='SEARCH A CHARACTER...'
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
			<div style={{ color: '#000' }}>{numResults} Results</div>
		</div>
	)
}

export default Form
