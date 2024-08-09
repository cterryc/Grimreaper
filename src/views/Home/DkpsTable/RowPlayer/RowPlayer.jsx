import { useState } from 'react'
import { API, selectColor } from '../DkpsTable.service'
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
  // const [alters, setAlter] = useState([])
  // const state = useSelector((state) => state.players)
  const [infoPlayer, setInfoPlayer] = useState({})
  // const [playerInfo, setPlayerInfo] = useState({
  //   left: [],
  //   right: [],
  //   botton: []
  // })

  const alters = state.alters.filter((eleAlter) => {
    return ele.name === eleAlter.mainPlayername
  })
  console.log(alters)

  const rowColor = (e) => {
    if (e) {
      setColor('#43000091')
    } else {
      setColor(i % 2 !== 0 && '#86868623')
    }
  }

  const fetchInfoPlayer = async () => {
    try {
      const player = await fetch(`${API}/scrap/${ele.name}`)
      const data = await player.json()
      console.log(data)
      setInfoPlayer(data)
    } catch (error) {
      console.error('Error fetching player data:', error)
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
              {infoPlayer?.equipment?.map((ele, index) => {
                return (
                  <div key={index}>
                    <a
                      href={`https://wotlk.ultimowow.com?item=${ele.item}&domain=es`}
                      className='item-show'
                      // rel='gems=23121&amp;ench=3832&amp;'
                    >
                      <img
                        src='https://cdn.warmane.com/wotlk/icons/large/inv_helmet_156.jpg'
                        alt='item wow'
                      />
                    </a>
                  </div>
                )
              })}
            </div>
            <div className='rowplayer-alters'>
              {alters.map((elemento, i) => {
                return <div key={i}>{elemento.name}</div>
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RowPlayer
