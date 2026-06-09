import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import PageHistorical from './pages/PageHistorical'
import PageDetail from './pages/PageDetail'
import Error404 from './pages/Error404'
import './App.css'

function App() {
  
  return (
    <> 
		<BrowserRouter>
			<NavBar/>
			<Routes>
				<Route path='/detail/:id' element={<PageDetail />}></Route>
				<Route path='/historical' element={<PageHistorical />}></Route>
				<Route path='/' element={<Navigate to='/detail/market' />}></Route>
				<Route path='*' element={<Error404 />}></Route>
			</Routes>
		</BrowserRouter>
    </>
  )
}

export default App
