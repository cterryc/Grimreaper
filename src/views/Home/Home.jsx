import AddDkp from '../../components/AddDKP/AddDkp'
import DkpsTable from './DkpsTable/DkpsTable'
import './Home.css'

const Home = ({ showAddDKP }) => {
  return (
    <div className='Home'>
      <DkpsTable />
      {showAddDKP && <AddDkp />}
    </div>
  )
}

export default Home
