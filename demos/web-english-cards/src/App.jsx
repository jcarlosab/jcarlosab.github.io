import './App.css'
import Level from './pages/Level'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/level/:category' element={<Level/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App
