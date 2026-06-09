const searchCharacters = async ({ search, page }) => {
	const { REACT_APP_BASE_URL, REACT_APP_API_KEY } = process.env
	const URL = `${REACT_APP_BASE_URL}${REACT_APP_API_KEY}`
	let parametros = `&limit=50&offset=${50 * page}`

	try {
		if (search !== undefined && search !== '') {
			parametros += `&nameStartsWith=${search}`
		}
		const response = await fetch(URL + parametros)
		const json = await response.json()
		return json.data.results
	} catch (e) {
		throw new Error('Error searching characteres')
	}
}

export default searchCharacters
