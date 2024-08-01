import { useEffect, useState, useRef } from 'react'
import { selectColor, header, rankPriority, API } from './DkpsTable.service'
import './DkpsTable.css'
import SearchPlayer from '../../../components/search/SearchPlayer'

const DkpsTable = ({ showAddDKP, setButtonShowAddDkp }) => {
  const [jsonData, setJsonData] = useState([])
  const [renderData, setRenderData] = useState([])
  const [loader, setLoader] = useState(false)
  const [greenColor, setGreenColor] = useState('')
  const playerRefs = useRef({})

  useEffect(() => {
    setLoader(true)
    fetch(`${API}/main`)
      .then((res) => res.json())
      .then((result) => {
        const newORder = [...result.response]
        newORder.sort((a, b) => a.name.localeCompare(b.name))
        setLoader(false)
        setJsonData(newORder)
        setRenderData(newORder)
      })
      .catch((err) => console.error('Error fetching data:', err))
  }, [])

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
    const newOrder = array.flat()
    return newOrder
  }

  // Ordena por Nombre
  const nameOrder = () => {
    const order = [...jsonData]
    const newORder = order.sort((a, b) => a.name.localeCompare(b.name))
    return newORder
  }

  // Ordena por Rango
  const rankOrder = () => {
    const newORder = classOrder().sort(
      (a, b) => rankPriority[a.rank] - rankPriority[b.rank]
    )
    return newORder
  }

  const dkpsOrder = () => {
    const order = [...jsonData]
    const newORder = order.sort((a, b) => b.net - a.net)
    return newORder
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
    <div className='DkpsTable'>
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
              <div
                ref={(el) => (playerRefs.current[ele.name] = el)}
                style={{
                  backgroundColor:
                    (greenColor === ele.name && '#008104') ||
                    (i % 2 !== 0 && '#86868623')
                }}
                className='player'
                key={i}
                id={ele.name}
              >
                <h1 style={{ color: selectColor(ele.class, ele) }}>
                  {ele.name}
                </h1>
                <h1 style={{ color: selectColor(ele.class) }}>{ele.class}</h1>
                <h1 style={{ color: selectColor(ele.class) }}>{ele.rank}</h1>
                <h1 style={{ color: selectColor(ele.class) }}>{ele.net}</h1>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DkpsTable
