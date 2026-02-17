import { memo } from 'react'

const Footer = memo(() => {
  return (
    <footer className='w-full border-t border-white/10 bg-background-dark py-6 px-4 sm:px-10'>
      <div className='flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left w-full max-w-7xl mx-auto'>
        <p className='text-sm text-white/60'>
          © 2024 &lt;Tempest&gt; Guild. All rights reserved.
        </p>
        <div className='flex items-center gap-4'>
          <a
            href='#'
            className='text-sm text-white/60 hover:text-white transition-colors'
          >
            Warcraft Logs
          </a>
          <a
            href='#'
            className='text-sm text-white/60 hover:text-white transition-colors'
          >
            Wowhead
          </a>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
