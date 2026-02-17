import { memo } from 'react'
import { MdCalendarMonth } from 'react-icons/md'

const RaidScheduleCard = memo(() => {
  return (
    <div
      className='flex flex-col rounded-xl border border-border-color bg-surface-dark p-6'
      id='schedule'
    >
      <div className='flex items-center gap-3 mb-4'>
        <span
          className='material-symbols-outlined text-primary'
          style={{ fontSize: '28px' }}
        >
          <MdCalendarMonth />
        </span>
        <h3 className='text-xl font-bold text-white'>Raid Horario</h3>
      </div>
      <div className='space-y-4 text-text-secondary'>
        <div>
          <h4 className='font-semibold text-white'>Icecrown Citadel 25 H/N</h4>
          <p>Viernes &amp; Sabado</p>
          <p>01:00 AM - 04:00 AM (Server Time)</p>
        </div>
        <div>
          <h4 className='font-semibold text-white'>
            Trial of the Crusader 25 H/N
          </h4>
          <p>Miercoles</p>
          <p>01:00 AM - 04:00 AM (Server Time)</p>
        </div>
      </div>
    </div>
  )
})

RaidScheduleCard.displayName = 'RaidScheduleCard'

export default RaidScheduleCard
