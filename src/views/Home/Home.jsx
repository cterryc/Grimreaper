import { useState } from 'react'
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
      <DkpsTable
        showAddDKP={showAddDKP}
        setButtonShowAddDkp={setButtonShowAddDkp}
        onPlayerSelect={setSelectedPlayer}
      />
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
