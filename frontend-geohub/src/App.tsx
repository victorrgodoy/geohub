import './App.css'
import { Route, Routes } from 'react-router-dom'
import City from './pages/City'
import Country from './pages/Country'
import Continent from './pages/Continent'

function App() {

  return (
    <div className='container'>
      <Routes>
        {/* <Route path='/'></Route> */}
        <Route path='/city' element={<City/>}></Route>
        <Route path='/country' element={<Country/>}></Route>
        <Route path='/continent' element={<Continent/>}></Route>
      </Routes>
    </div>
  )
}

export default App
