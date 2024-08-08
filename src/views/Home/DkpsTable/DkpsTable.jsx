import { useEffect, useState, useRef } from 'react'
import { header, rankPriority, API } from './DkpsTable.service'
import './DkpsTable.css'
import SearchPlayer from '../../../components/search/SearchPlayer'
import RowPlayer from './RowPlayer/RowPlayer'
import { useDispatch } from 'react-redux'
import { addAlters, addMains } from '../../../redux/slice/playerSlice'

const DkpsTable = ({ showAddDKP, setButtonShowAddDkp }) => {
  const [jsonData, setJsonData] = useState([])
  const [renderData, setRenderData] = useState([])
  const [loader, setLoader] = useState(false)
  const [greenColor, setGreenColor] = useState('')
  const playerRefs = useRef({})
  const [showAlters, setShowAlters] = useState(false)
  const dispatch = useDispatch()
  // const state = useSelector((state) => state)
  // console.log(state)

  // useEffect(() => {
  //   fetch(`${API}/scrap/terryq`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err))
  // }, [])

  useEffect(() => {
    setLoader(true)
    fetch(`${API}/main`)
      .then((res) => res.json())
      .then((result) => {
        const newORderMain = [...result.response]
        const newORderAlter = [...result.alters]
        newORderAlter.sort((a, b) => a.name.localeCompare(b.name))
        newORderMain.sort((a, b) => b.net - a.net)
        dispatch(addMains(newORderMain))
        dispatch(addAlters(newORderAlter))
        setLoader(false)
        setJsonData(newORderMain)
        setRenderData(newORderMain)
      })
      .catch((err) => console.error('Error fetching data:', err))
  }, [dispatch])

  // Ordena por Clase
  const classOrder = () => {
    const order = [...jsonData]
    const classMap = {
      Brujo: [],
      'Caballero de la Muerte': [],
      Cazador: [],
      Chamán: [],
      Druida: [],
      Guerrero: [],
      Mago: [],
      Maga: [],
      Paladín: [],
      Pícaro: [],
      Sacerdote: []
    }

    order.forEach((ele) => {
      if (classMap[ele.class]) {
        classMap[ele.class].push(ele)
      }
    })

    const array = []

    for (let ele in classMap) {
      array.push(classMap[ele].sort((a, b) => a.name.localeCompare(b.name)))
    }
    const newOrderMain = array.flat()
    return newOrderMain
  }

  // Ordena por Nombre
  const nameOrder = () => {
    const order = [...jsonData]
    const newORderMain = order.sort((a, b) => a.name.localeCompare(b.name))
    return newORderMain
  }

  // Ordena por Rango
  const rankOrder = () => {
    const newORderMain = classOrder().sort(
      (a, b) => rankPriority[a.rank] - rankPriority[b.rank]
    )
    return newORderMain
  }

  const dkpsOrder = () => {
    const order = [...jsonData]
    const newORderMain = order.sort((a, b) => b.net - a.net)
    return newORderMain
  }

  // Selecciona el Orden por Rango, Nombre o Clase!
  const order = (e) => {
    e.preventDefault()
    const buttonId = e.target.id || e.target.parentElement.id
    if (buttonId === 'Clase') {
      setRenderData(classOrder())
    } else if (buttonId === 'Personaje') {
      setRenderData(nameOrder())
    } else if (buttonId === 'Rango') {
      setRenderData(rankOrder())
    } else if (buttonId === 'Dkps') {
      setRenderData(dkpsOrder())
    }
  }

  const scrollToPlayer = (name) => {
    setGreenColor(name)
    playerRefs.current[name]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <div onClick={() => setShowAlters(false)} className='DkpsTable'>
      <SearchPlayer
        setButtonShowAddDkp={setButtonShowAddDkp}
        showAddDKP={showAddDKP}
        players={jsonData}
        onPlayerClick={scrollToPlayer}
        setRenderData={setRenderData}
      />
      <div className='header'>
        {header.map((ele, i) => {
          return (
            <button id={ele} onClick={order} key={i}>
              <h1 key={i}>{ele}</h1>
            </button>
          )
        })}
      </div>
      {loader ? (
        <div className='loader-container'>
          <span className='loader'></span>
        </div>
      ) : (
        <div className='all-players'>
          {renderData.map((ele, i) => {
            return (
              <RowPlayer
                key={i}
                ele={ele}
                i={i}
                playerRefs={playerRefs}
                greenColor={greenColor}
                showAlters={showAlters}
                setShowAlters={setShowAlters}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DkpsTable
