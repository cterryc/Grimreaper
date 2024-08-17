import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='NavBar'>
      <li>
        <NavLink className='navlink' to={'/'}>
          Grim Reaper
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'navbar-active' : 'navbar-link'
          }
        >
          DKP List
        </NavLink>
        <NavLink
          to='/itembis'
          className={({ isActive }) =>
            isActive ? 'navbar-active' : 'navbar-link'
          }
        >
          BiS Items
        </NavLink>
      </li>
      <li>
        <NavLink className='navlink' to='/login'>
          Login
        </NavLink>
      </li>
    </nav>
  )
}

export default NavBar
