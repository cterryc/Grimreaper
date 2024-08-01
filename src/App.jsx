import Home from './views/Home/Home'
import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import NavBar from './components/Navbar/NavBar'
import Login from './components/Login/Login'
import { useState } from 'react'
import Register from './components/Register/Register'

const App = () => {
  const [showAddDKP, setShowAddDkp] = useState(false)
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div className='App'>
      {(pathname !== '/login' && pathname !== '/register') && <NavBar />}
      <Routes>
        <Route path='/' element={<Home showAddDKP={showAddDKP} />} />
        <Route
          path='/login'
          element={<Login setShowAddDkp={setShowAddDkp} />}
        />
        <Route
          path='/register'
          element={<Register setShowAddDkp={setShowAddDkp} />}
        />
      </Routes>
    </div>
  )
}

export default App
