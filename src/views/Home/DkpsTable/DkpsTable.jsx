import { useEffect, useState } from 'react'
import { selectColor, header, rankPriority } from './DkpsTable.service'
import './DkpsTable.css'

// const header = ['Personaje', 'Clase', 'Rango', 'Dkps']

const DkpsTable = () => {
  const [jsonData, setJsonData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/main')
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setJsonData(result.response)
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
    // "bject.values()" devuelve un array de arrays y ".flat()" aplana un array de arrays en uno solo
    const newOrder = array.flat()
    return newOrder
  }

  // Ordena por Nombre
  const nameOrder = () => {
    const order = [...jsonData]
    const newORder = order.sort((a, b) => a.name.localeCompare(b.name))
    console.log(newORder)
    return newORder
  }

  // Ordena por Rango
  const rankOrder = () => {
    const newORder = classOrder().sort(
      (a, b) => rankPriority[a.rank] - rankPriority[b.rank]
    )
    console.log(newORder)
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
      setJsonData(classOrder())
    } else if (buttonId === 'Personaje') {
      setJsonData(nameOrder())
    } else if (buttonId === 'Rango') {
      setJsonData(rankOrder())
    } else if (buttonId === 'Dkps') {
      setJsonData(dkpsOrder())
    }
  }

  return (
    <div className='DkpsTable'>
      <div className='header'>
        {header.map((ele, i) => {
          return (
            <button id={ele} onClick={order} key={i}>
              <h1 key={i}>{ele}</h1>
            </button>
          )
        })}
      </div>
      <div className='all-players'>
        {jsonData.map((ele, i) => {
          return (
            <div
              style={{ backgroundColor: i % 2 !== 0 && '#86868623' }}
              className='player'
              key={i}
            >
              <h1 style={{ color: selectColor(ele.class, ele) }}>{ele.name}</h1>
              <h1 style={{ color: selectColor(ele.class) }}>{ele.class}</h1>
              <h1 style={{ color: selectColor(ele.class) }}>{ele.rank}</h1>
              <h1 style={{ color: selectColor(ele.class) }}>{ele.net}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DkpsTable
