import { useState } from 'react'
import AddDkp from '../../components/AddDKP/AddDkp'
import DkpsTable from './DkpsTable/DkpsTable'
import './Home.css'

const Home = ({ showAddDKP }) => {
  const [buttonShowAddDkp, setButtonShowAddDkp] = useState(false)
  return (
    <div className='Home' onClick={() => setButtonShowAddDkp(false)}>
      <DkpsTable
        showAddDKP={showAddDKP}
        setButtonShowAddDkp={setButtonShowAddDkp}
      />
      {buttonShowAddDkp && <AddDkp setButtonShowAddDkp={setButtonShowAddDkp} />}
    </div>
  )
}

export default Home
