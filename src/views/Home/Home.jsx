import AddDkp from './AddDKP/AddDkp'
import DkpsTable from './DkpsTable/DkpsTable'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
      <DkpsTable />
      <AddDkp />
    </div>
  )
}

export default Home
