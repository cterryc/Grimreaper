import { memo, useCallback } from 'react'

const HeroSection = memo(() => {
  const handleScrollToTable = useCallback(() => {
    const element = document.getElementById('dkp')
    if (element) {
      // Calculamos la posición del elemento relativa al documento
      const yOffset = -80 // El margen que quieres dejar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  return (
    <div className='mb-8 @container'>
      <div className='@[480px]:p-0'>
        <div
          className='flex min-h-100 flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4'
          style={{
            backgroundImage: `linear-gradient(rgba(16, 22, 34, 0.7) 0%, rgba(16, 22, 34, 0.9) 100%), url("https://res.cloudinary.com/dniekrmqb/image/upload/f_auto,w_auto/v1771267757/grimreaper/grimreaperbackground_dpcnze")`
          }}
        >
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-4xl font-black leading-tight tracking-[-0.033em] text-white @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]'>
              Bienvenido a GrimReaper
            </h1>
            <h2 className='text-sm font-normal leading-normal text-white/80 @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal'>
              Conquistadores de la Ciudadela de la Corona de Hielo. ¡Por la
              Alianza! - Servidor Warmane
            </h2>
          </div>
          <button
            onClick={handleScrollToTable}
            className='flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-primary-hover transition-colors'
          >
            <span className='truncate'>Ver lista de DKP</span>
          </button>
        </div>
      </div>
    </div>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
