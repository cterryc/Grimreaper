import Home from './views/Home/Home'
import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import NavBar from './components/Navbar/NavBar'
import Login from './components/Login/Login'
import { useState } from 'react'
import Register from './components/Register/Register'
import ItemBis from './views/ItemsBis/ItemsBis'
import Footer from './components/Footer/Footer'

const App = () => {
  const [showAddDKP, setShowAddDkp] = useState(false)
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div className='App flex flex-col min-h-screen'>
      {pathname !== '/login' && pathname !== '/register' && <NavBar />}
      <main className='flex-1'>
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
          <Route
            path='/itembis/*'
            element={<ItemBis setShowAddDkp={setShowAddDkp} />}
          />
        </Routes>
      </main>
      {pathname !== '/login' && pathname !== '/register' && <Footer />}
    </div>
  )
}

export default App
