import { useState } from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import InformationGrid from '../../components/InformationGrid/InformationGrid'
import AddDkp from '../../components/AddDKP/AddDkp'
import DkpsTable from './DkpsTable/DkpsTable'
import PlayerModal from './DkpsTable/RowPlayer/PlayerModal'
import './Home.css'

const Home = ({ showAddDKP }) => {
  const [buttonShowAddDkp, setButtonShowAddDkp] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const handleCloseModal = () => {
    setSelectedPlayer(null)
  }

  return (
    <div className='Home'>
      <div className='flex w-full flex-col items-center'>
        <div className='flex w-full max-w-7xl flex-col p-4 sm:p-6 lg:p-8'>
          <HeroSection />

          <section id='dkp' className='mb-12'>
            <DkpsTable
              showAddDKP={showAddDKP}
              setButtonShowAddDkp={setButtonShowAddDkp}
              onPlayerSelect={setSelectedPlayer}
            />
          </section>

          <InformationGrid />
        </div>
      </div>

      {buttonShowAddDkp && <AddDkp setButtonShowAddDkp={setButtonShowAddDkp} />}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer.player}
          alters={selectedPlayer.alters}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default Home
