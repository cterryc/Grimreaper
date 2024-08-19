import { useState } from 'react'
import { API, selectColor } from '../DkpsTable.service'
import { itemsLeft, itemsBottom, itemsRight } from './RowTables.service'
import './RowPlayer.css'
// import { useSelector } from 'react-redux'
// import { extract } from '@extractus/article-extractor'

const RowPlayer = ({
  ele,
  i,
  playerRefs,
  greenColor,
  showAlters,
  setShowAlters,
  state
}) => {
  const [color, setColor] = useState(i % 2 !== 0 && '#86868623')
  const [scanning, setScaning] = useState(false)
  const [nameCharacter, setNameCharacter] = useState('')
  const [infoPlayer, setInfoPlayer] = useState({
    left: [],
    right: [],
    bottom: []
  })

  const alters = state.filter((eleAlter) => {
    return ele.name === eleAlter.mainPlayername
  })

  const rowColor = (e) => {
    if (e) {
      setColor('#43000091')
    } else {
      setColor(i % 2 !== 0 && '#86868623')
    }
  }

  const fetchInfoPlayer = async (namePlayer) => {
    if (namePlayer !== ele.name && namePlayer) {
      console.log('entro en namePlayer', namePlayer)
      try {
        if (scanning) {
          setScaning(false)
        }
        setNameCharacter(namePlayer)
        const player = await fetch(`${API}/scrap/${namePlayer}`)
        const data = await player.json()
        console.log(data)
        setScaning(true)
        setInfoPlayer({
          left: data.left,
          right: data.right,
          bottom: data.bottom
        })
      } catch (error) {
        console.error('Error fetching player data:', error)
      }
    } else {
      console.log('entro en ele.name', ele.name)
      try {
        if (scanning) {
          setScaning(false)
        }
        if (nameCharacter) {
          setNameCharacter('')
        }
        const player = await fetch(`${API}/scrap/${ele.name}`)
        const data = await player.json()
        console.log(data)
        setScaning(true)
        setInfoPlayer({
          left: data.left,
          right: data.right,
          bottom: data.bottom
        })
      } catch (error) {
        console.error('Error fetching player data:', error)
      }
    }
  }

  const getItemId = (index, side) => {
    try {
      const itemId = infoPlayer[side][index]?.rel?.split('&')
      let ench = ''
      let gems = ''
      if (!itemId[1]) {
        return { id: itemId[0], ench, gems }
      }
      if (itemId[1]) {
        console.log('entro cuando ==>', itemId)
        if (itemId[1][0] === 'e') {
          ench = itemId[1]
        } else if (itemId[1][0] === 'g') {
          gems = itemId[1]
        }
      }
      if (itemId[2]) {
        if (itemId[2][0] === 'g') {
          gems = itemId[2]
        }
      }
      console.log({ id: itemId[0], ench, gems })
      return { id: itemId[0], ench, gems }
    } catch (error) {
      console.log('Esperando respuesta')
    }
  }

  return (
    <div
      ref={(el) => (playerRefs.current[ele.name] = el)}
      style={{
        backgroundColor: (greenColor === ele.name && '#008104') || color
      }}
      className='player'
      key={i}
      id={ele.name}
      onClick={(e) => {
        e.stopPropagation()
        fetchInfoPlayer()
        setShowAlters(i)
      }}
      onMouseEnter={(e) => rowColor(e)}
      onMouseLeave={() => rowColor()}
    >
      <h1 style={{ color: selectColor(ele.class, ele) }}>{ele.name}</h1>
      <h1 style={{ color: selectColor(ele.class) }}>{ele.class}</h1>
      <h1 style={{ color: selectColor(ele.class) }}>{ele.rank}</h1>
      <h1 style={{ color: selectColor(ele.class) }}>{ele.net}</h1>
      {showAlters === i && (
        <div onClick={(e) => e.stopPropagation()} className='player-alters'>
          <h1>{ele.name}</h1>
          <button
            className='player-alters-button'
            onClick={() => setShowAlters(!showAlters)}
          >
            X
          </button>
          <div className='rowplayer-info-container'>
            <div className='rowplayer-items'>
              <div className='items-container'>
                <div className='background-elf'>
                  <h1>
                    {scanning
                      ? nameCharacter
                        ? nameCharacter
                        : `${ele.name}`
                      : 'Scanning Perfil'}
                  </h1>
                  {!scanning && <span className='scanning-horizontal'></span>}
                </div>
                <div className='left-side'>
                  {itemsLeft.map((ele, index) => {
                    return (
                      <div className={ele} key={index}>
                        {scanning ? (
                          <a
                            href={`https://wotlk.ultimowow.com?${
                              getItemId(index, 'left')?.id
                            }&domain=es`}
                            className='item-show'
                            rel={getItemId(index, 'left')?.ench}
                          >
                            {infoPlayer.left[index]?.src ? (
                              <img
                                src={infoPlayer.left[index]?.src}
                                alt={ele}
                              />
                            ) : (
                              <span className='no-equiped'>No Equiped</span>
                            )}
                          </a>
                        ) : (
                          <span className='scanning-circle'></span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className='right-side'>
                  {itemsRight.map((ele, index) => {
                    return (
                      <div className={ele} key={index}>
                        {scanning ? (
                          <a
                            href={`https://wotlk.ultimowow.com?${
                              getItemId(index, 'right')?.id
                            }&domain=es`}
                            className='item-show'
                            rel={getItemId(index, 'right')?.ench}
                          >
                            {infoPlayer.right[index]?.src ? (
                              <img
                                src={infoPlayer.right[index]?.src}
                                alt={ele}
                              />
                            ) : (
                              <span className='no-equiped'>No Equiped</span>
                            )}
                          </a>
                        ) : (
                          <span className='scanning-circle'></span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className='bottom-side'>
                  {itemsBottom.map((ele, index) => {
                    return (
                      <div className={ele} key={index}>
                        {scanning ? (
                          <a
                            href={`https://wotlk.ultimowow.com?${
                              getItemId(index, 'bottom')?.id
                            }&domain=es`}
                            className='item-show'
                            rel={getItemId(index, 'bottom')?.ench}
                          >
                            {infoPlayer.bottom[index]?.src ? (
                              <img
                                src={infoPlayer.bottom[index]?.src}
                                alt={ele}
                              />
                            ) : (
                              <span className='no-equiped'>No Equiped</span>
                            )}
                          </a>
                        ) : (
                          <span className='scanning-circle'></span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className='rowplayer-alters'>
              <h1 className='alter-head'>Alters</h1>
              {alters.map((elemento, index) => {
                return (
                  <h3
                    key={index}
                    onClick={() => fetchInfoPlayer(elemento.name)}
                  >
                    {elemento.name}
                  </h3>
                )
              })}
              {nameCharacter && (
                <h3 onClick={() => fetchInfoPlayer(ele.name)}>{ele.name}</h3>
              )}
            </div>
            {/* <a
              href='https://wotlk.ultimowow.com?item=25697&domain=es'
              rel='ench=2647'
            >
              Brazales de acechador vil
            </a> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default RowPlayer
