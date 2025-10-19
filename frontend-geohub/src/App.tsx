import { Route, Routes } from 'react-router-dom'
import './App.css'
import City from './pages/City'
import Country from './pages/Country'
import Continent from './pages/Continent'

function App() {
   return (
      <div className="max-w-[1800px] mx-auto px-10">
         <Routes>
            <Route path="/city" element={<City />} />
            <Route path="/country" element={<Country />} />
            <Route path="/continent" element={<Continent />} />
         </Routes>
      </div>
   )
}

export default App
