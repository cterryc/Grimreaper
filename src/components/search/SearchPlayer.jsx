import { useState } from 'react'
import './SearchPlayer.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  getActual,
  getFirst,
  getSecond
} from '../../redux/actions/actionsCharacters'

const SearchPlayer = ({
  players,
  onPlayerClick,
  setRenderData,
  showAddDKP,
  setButtonShowAddDkp
}) => {
  const [found, setFound] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [colorH1, setColorH1] = useState({})
  const [lastDays, setLastDays] = useState(false)
  const [listDays, setListDays] = useState(false)
  const { date } = useSelector((state) => state.players)
  let hoursMin = ''
  let day = ''
  let month = ''
  if (date) {
    const [dateOne, dateTwo] = date.split(' ')
    hoursMin = dateTwo
    const [first, second] = dateOne.split('-')
    day = first
    month = second
    console.log(date)
  }

  const dispatch = useDispatch()

  const find = (e) => {
    e.preventDefault()
    if (e.target.value.length <= 0) {
      setFound([])
      setInputValue(e.target.value)
      return
    }
    let primeraLetra = e.target.value.charAt(0).toUpperCase()
    let restoDelInput = e.target.value.slice(1)
    const resultado = players
      .filter((ele) => ele.name.startsWith(primeraLetra + restoDelInput))
      .slice(0, 10)
    setFound(resultado)
    setInputValue(e.target.value)
  }

  const color = (backColor, name) => {
    setColorH1({ name, backColor })
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    let primeraLetra = inputValue.charAt(0).toUpperCase()
    let restoDelInput = inputValue.slice(1)
    const resultado = players.filter((ele) =>
      ele.name.startsWith(primeraLetra + restoDelInput)
    )
    setInputValue('')
    setFound([])
    setRenderData(resultado)
  }

  const getDkps = (day) => {
    if (day === 'actual') {
      dispatch(getActual())
    } else if (day === 'undia') {
      dispatch(getFirst())
    } else if (day === 'dosdias') {
      dispatch(getSecond())
    }
  }

  return (
    <div className='searchplayer-form-container'>
      <form className='searchplayer-form' onSubmit={onSubmitForm}>
        <div>
          <input
            value={inputValue}
            type='text'
            onChange={find}
            placeholder='Buscar Personaje Main'
          />
          {found.length > 0 && (
            <div className='searchplayer-found'>
              {found.map((ele, i) => {
                return (
                  <h1
                    style={{
                      backgroundColor:
                        ele.name === colorH1.name && colorH1.backColor
                    }}
                    onMouseEnter={() => color('#371d94', ele.name)}
                    onMouseLeave={() => color('')}
                    onClick={() => {
                      onPlayerClick(ele.name)
                      setFound([])
                      setInputValue('')
                    }}
                    key={i}
                    id={ele.name}
                  >
                    {ele.name}
                  </h1>
                )
              })}
            </div>
          )}
        </div>
        <button type='submit'>Buscar</button>
      </form>
      {showAddDKP && (
        <div className='button-add-dkp-container'>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setButtonShowAddDkp(true)
            }}
            className='button-add-dkp'
          >
            Add Dkp
          </button>
        </div>
      )}
      <div className='date-container'>
        <div
          onMouseLeave={() => {
            setLastDays(false)
            setListDays(false)
          }}
          onMouseEnter={() => setLastDays(true)}
          onClick={(e) => {
            e.stopPropagation()
            setListDays(true)
          }}
          className='date'
        >
          {lastDays ? (
            <h1>Ver días anteriores</h1>
          ) : (
            <>
              <h1>Ultima actualizacion:</h1>
              <h1>{`${day} de ${month} - ${hoursMin}`}</h1>
            </>
          )}
          {listDays && (
            <div className='list-days'>
              <button onClick={() => getDkps('actual')}>Actual</button>
              <button onClick={() => getDkps('undia')}>Hace 1 día</button>
              <button onClick={() => getDkps('dosdias')}>Hace 2 días</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPlayer
