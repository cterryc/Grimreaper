import { useEffect, useState, useRef } from 'react'
import { header, rankPriority } from './DkpsTable.service'
import './DkpsTable.css'
import './DkpsTable.header.css'
import SearchPlayer from '../../../components/search/SearchPlayer'
import RowPlayer from './RowPlayer/RowPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { getMainAndAlters } from '../../../redux/actions/actionsCharacters'

const DkpsTable = ({ showAddDKP, setButtonShowAddDkp }) => {
  // const [jsonData] = useState([])
  const [renderData, setRenderData] = useState([])
  // const [loader, setLoader] = useState(false)
  const [greenColor, setGreenColor] = useState('')
  const playerRefs = useRef({})
  const [showAlters, setShowAlters] = useState(false)
  const dispatch = useDispatch()
  const { alters, mains, loader } = useSelector((state) => state.players)

  useEffect(() => {
    // if (renderData.length === 0) {
    setRenderData(mains)
    // }
    console.log(mains)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mains])

  useEffect(() => {
    dispatch(getMainAndAlters())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ordena por Clase
  const classOrder = () => {
    const order = [...mains]
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
    const order = [...mains]
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
    const order = [...mains]
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
        players={mains}
        onPlayerClick={scrollToPlayer}
        setRenderData={setRenderData}
      />
      <div className='header'>
        {header.map((ele, i) => {
          return (
            <button
              id={ele}
              onClick={order}
              key={i}
              className={`header-button ${
                renderData ===
                (ele === 'Clase'
                  ? classOrder()
                  : ele === 'Personaje'
                  ? nameOrder()
                  : ele === 'Rango'
                  ? rankOrder()
                  : ele === 'Dkps'
                  ? dkpsOrder()
                  : '')
                  ? 'active'
                  : ''
              }`}
            >
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
          {renderData?.map((ele, i) => {
            return (
              <RowPlayer
                state={alters}
                key={i}
                ele={ele}
                i={i}
                playerRefs={playerRefs}
                greenColor={greenColor}
                setGreenColor={setGreenColor}
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
