import { memo, useCallback } from 'react'
import { MdMilitaryTech } from 'react-icons/md'

const BiSListsCard = memo(() => {
  const classColors = [
    { name: 'Warrior', colorHex: '#C79C6E' },
    { name: 'Paladin', colorHex: '#F48CBA' },
    { name: 'Hunter', colorHex: '#ABD473' },
    { name: 'Rogue', colorHex: '#FFF569' },
    { name: 'Priest', colorHex: '#FFFFFF' },
    { name: 'DK', colorHex: '#C41F3B' },
    { name: 'Shaman', colorHex: '#0070DE' },
    { name: 'Mage', colorHex: '#3FC7EB' },
    { name: 'Warlock', colorHex: '#8787ED' },
    { name: 'Druid', colorHex: '#FF7D0A' }
  ]

  const handleClassClick = useCallback((className) => {
    // TODO: Navigate to BiS page for this class
    console.log(`BiS Lists for ${className}`)
  }, [])

  return (
    <div
      className='flex flex-col rounded-xl border border-border-color bg-surface-dark p-6'
      id='bis'
    >
      <div className='flex items-center gap-3 mb-4'>
        <span
          className='material-symbols-outlined text-primary'
          style={{ fontSize: '28px' }}
        >
          <MdMilitaryTech />
        </span>
        <h3 className='text-xl font-bold text-white'>Best-in-Slot Lists</h3>
      </div>
      <p className='text-text-secondary mb-4'>
        Selecciona tu clase para ver las listas de equipo BiS.
      </p>
      <div className='grid grid-cols-3 gap-3 sm:grid-cols-4'>
        {classColors.map((classItem) => (
          <button
            key={classItem.name}
            onClick={() => handleClassClick(classItem.name)}
            className='flex items-center justify-center rounded-lg bg-surface-darker p-3 text-sm font-semibold transition-all hover:opacity-80'
            style={{ color: classItem.colorHex }}
          >
            {classItem.name}
          </button>
        ))}
      </div>
    </div>
  )
})

BiSListsCard.displayName = 'BiSListsCard'

export default BiSListsCard
