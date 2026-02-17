import { GiReaperScythe, GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className='fixed top-0 z-50 flex w-full items-center justify-center border-b border-white/10 bg-background-dark/80 px-4 py-3 backdrop-blur-sm dark:bg-background-dark/80 sm:px-10'>
      <div className='flex w-full max-w-7xl items-center justify-between'>
        {/* Logo and Guild Name */}
        <Link to={'/'} className='flex items-center gap-4 text-white'>
          <div className='size-6'>
            <GiReaperScythe size={24} />
          </div>
          <h2 className='text-lg font-bold leading-tight tracking-[-0.015em] text-white'>
            &lt;GrimReaper&gt;
          </h2>
        </Link>

        {/* Desktop Navigation Links */}
        <div className='hidden items-center gap-9 md:flex'>
          <Link
            to='/'
            className='text-sm font-medium leading-normal text-white/80 hover:text-white'
          >
            DKP
          </Link>
          <Link
            to='/itembis'
            className='text-sm font-medium leading-normal text-white/80 hover:text-white'
          >
            BiS Lists
          </Link>
        </div>

        {/* Right side: Login + Hamburger */}
        <div className='flex items-center gap-2'>
          <Link
            to='/login'
            className='flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors'
            rel='noopener noreferrer'
          >
            <span className='truncate'>Login</span>
          </Link>

          {/* Hamburger button (visible only on mobile) */}
          <button
            onClick={toggleMenu}
            className='flex size-10 items-center justify-center rounded-lg text-white/80 hover:text-white md:hidden'
            aria-label='Toggle menu'
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className='absolute left-0 top-full w-full bg-black/90 backdrop-blur-3xl border-b border-white/10 py-4 px-4 shadow-lg md:hidden'>
          <div className='flex flex-col space-y-3'>
            <Link
              to='/'
              onClick={closeMenu}
              className='text-sm font-medium leading-normal text-white/80 hover:text-white py-2'
            >
              DKP
            </Link>
            <Link
              to='/itembis'
              onClick={closeMenu}
              className='text-sm font-medium leading-normal text-white/80 hover:text-white py-2'
            >
              BiS Lists
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBar
