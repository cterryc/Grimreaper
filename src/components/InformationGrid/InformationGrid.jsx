import { memo } from 'react'
import RaidScheduleCard from '../Cards/RaidScheduleCard'
import LootRulesCard from '../Cards/LootRulesCard'
import BiSListsCard from '../Cards/BiSListsCard'

const InformationGrid = memo(() => {
  return (
    <section className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12'>
      <RaidScheduleCard />
      <LootRulesCard />
      <BiSListsCard />
    </section>
  )
})

InformationGrid.displayName = 'InformationGrid'

export default InformationGrid
