import useComics from '../hooks/useComics.js'
import Spinner from './Spinner.js'

const Comics = (id) => {
	const { isLoading, comics } = useComics(id)
	return (
		<div className='container-comics'>
			<h2>Comics</h2>
			{isLoading ? (
				<Spinner />
			) : comics.length === 0 ? (
				<p>No comics</p>
			) : (
				<div className='comics'>
					{comics.map((result) => (
						<div key={result.id} className='comic'>
							<img
								style={{ width: '180px' }}
								src={result.thumbnail.path + '.' + result.thumbnail.extension}
								alt={'Image ' + result.title}
							/>
							<div>
								<h3>{result.title}</h3>
								<p>{result.dates[0].date.substring(0, 4)}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Comics
