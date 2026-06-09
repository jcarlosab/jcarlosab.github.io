import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header.js'
import Home from './pages/ListPage.js'
import NoPage from './pages/NoPage.js'
import DetailPage from './pages/DetailPage.js'
import LikeListPage from './pages/LikeListPage.js'
import { LikeCardProvider } from './context/LikeCard.js'

function App() {
	return (
		<LikeCardProvider>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path='/home' element={<Home />}></Route>
					<Route path='/detail/:id' element={<DetailPage />}></Route>
					<Route path='/favourites' element={<LikeListPage />}></Route>
					<Route path='/' element={<Navigate to='/home' />}></Route>
					<Route path='*' element={<NoPage />}></Route>
				</Routes>
			</BrowserRouter>
		</LikeCardProvider>
	)
}

export default App
