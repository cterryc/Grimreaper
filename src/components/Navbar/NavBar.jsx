import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='NavBar'>
      <NavLink className='navlink' to={'/'}>
        Grim Reaper
      </NavLink>
      <NavLink className='navlink' to='/login'>
        Login
      </NavLink>
    </div>
  )
}

export default NavBar
