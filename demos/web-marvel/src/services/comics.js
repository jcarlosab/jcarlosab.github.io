const searchComics = async ({ id }) => {
	const { REACT_APP_BASE_URL, REACT_APP_API_KEY } = process.env
	const URL = `${REACT_APP_BASE_URL}/${id.comics}/comics${REACT_APP_API_KEY}&limit=20`
	try {
		const response = await fetch(URL)
		const json = await response.json()
		return json.data.results
	} catch (e) {
		throw new Error('Error searching comics')
	}
}

export default searchComics
