import { useState } from 'react'
import { selectColor } from '../DkpsTable.service'
import './RowPlayer.css'
import { extract } from '@extractus/article-extractor'

const RowPlayer = ({
  ele,
  i,
  playerRefs,
  greenColor,
  showAlters,
  setShowAlters
}) => {
  const [color, setColor] = useState(i % 2 !== 0 && '#86868623')
  const [playerInfo, setPlayerInfo] = useState({
    left: [],
    right: [],
    botton: []
  })

  const rowColor = (e) => {
    if (e) {
      setColor('#43000091')
    } else {
      setColor(i % 2 !== 0 && '#86868623')
    }
  }

  const scrapPlayer = async () => {
    const player = await extract(
      `https://armory.warmane.com/character/${ele.name}/Icecrown/summary`
    )
    console.log(player)
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
        scrapPlayer()
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
          <button onClick={() => setShowAlters(!showAlters)}>X</button>
          <div>
            <a
              href='https://wotlk.ultimowow.com?item=50472&domain=es'
              className='item-show'
              rel='gems=23121&amp;ench=3832&amp;'
              // rel='ench=3820&gems=3627:3879:0'
            >
              <img
                src='https://cdn.warmane.com/wotlk/icons/large/inv_helmet_156.jpg'
                alt='item wow'
              />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default RowPlayer
