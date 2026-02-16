import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { selectColor } from '../DkpsTable.service'
import { itemsLeft, itemsBottom, itemsRight } from './RowTables.service'
import { usePlayerInfo } from './usePlayerInfo'
import './RowPlayer.css'

const RowPlayer = ({
  ele,
  i,
  playerRefs,
  greenColor,
  setGreenColor,
  showAlters,
  setShowAlters,
  state
}) => {
  const [color, setColor] = useState(i % 2 !== 0 ? '#86868623' : '')
  const greenColorTimeoutRef = useRef(null)
  const {
    scanning,
    playerName,
    playerInfo,
    error,
    fetchPlayerInfo,
    resetPlayerInfo,
    getItemData
  } = usePlayerInfo()

  // Filter alters for this player
  const alters = state.filter((eleAlter) => {
    return ele.name === eleAlter.mainPlayername
  })

  // Cleanup green color timeout on unmount
  useEffect(() => {
    return () => {
      if (greenColorTimeoutRef.current) {
        clearTimeout(greenColorTimeoutRef.current)
      }
    }
  }, [])

  // Cleanup refs on unmount
  useEffect(() => {
    const playerName = ele.name
    const current = playerRefs.current
    return () => {
      if (current[playerName]) {
        delete current[playerName]
      }
    }
  }, [ele.name, playerRefs])

  const handleRowColorChange = useCallback(
    (isHovering) => {
      if (isHovering) {
        setColor('#43000091')
      } else {
        setColor(i % 2 !== 0 ? '#86868623' : '')
      }
    },
    [i]
  )

  const handlePlayerClick = useCallback(() => {
    console.log('ele name', ele.name)

    fetchPlayerInfo(ele.name)
    setShowAlters(i)
  }, [ele.name, i, fetchPlayerInfo, setShowAlters])

  const handleAlterClick = useCallback(
    (alterName) => {
      fetchPlayerInfo(alterName)
    },
    [fetchPlayerInfo]
  )

  const handleRetryFetch = useCallback(() => {
    if (playerName) {
      fetchPlayerInfo(playerName)
    }
  }, [playerName, fetchPlayerInfo])

  const handleCloseAlters = useCallback(() => {
    setShowAlters(null)
    resetPlayerInfo()
  }, [setShowAlters, resetPlayerInfo])

  const getBackgroundColor = useCallback(() => {
    if (greenColor === ele.name) {
      greenColorTimeoutRef.current = setTimeout(() => {
        setGreenColor('')
      }, 3000)
      return '#008104'
    }
    return color
  }, [greenColor, ele.name, color, setGreenColor])

  const displayPlayerName = playerName || ele.name

  return (
    <div
      ref={(el) => (playerRefs.current[ele.name] = el)}
      style={{
        backgroundColor: getBackgroundColor(),
        transition: 'all 0.3s ease'
      }}
      className='player'
      id={ele.name}
      onClick={(e) => {
        e.stopPropagation()
        handlePlayerClick()
      }}
      onMouseEnter={() => handleRowColorChange(true)}
      onMouseLeave={() => handleRowColorChange(false)}
      role='button'
      tabIndex={0}
    >
      <h1 style={{ color: selectColor(ele.class, ele) }}>{ele.name}</h1>
      <h1 style={{ color: selectColor(ele.class) }}>{ele.class}</h1>
      <h1 style={{ color: selectColor(ele.class) }}>{ele.rank}</h1>
      <h1 style={{ color: selectColor(ele.class) }}>{ele.net}</h1>
      {showAlters === i && (
        <div
          onClick={(e) => e.stopPropagation()}
          className='player-alters'
          role='dialog'
        >
          <h1>{ele.name}</h1>
          <button
            className='player-alters-button'
            onClick={handleCloseAlters}
            aria-label='Close player details'
          >
            X
          </button>
          <div className='rowplayer-info-container'>
            <div className='rowplayer-items'>
              <div className='items-container'>
                <div className='background-elf'>
                  <h1 style={{ fontSize: '20px' }}>
                    {scanning
                      ? 'Scraping personaje de Warmane'
                      : displayPlayerName}
                  </h1>
                  {scanning && <span className='scanning-horizontal'></span>}
                </div>
                {error ? (
                  <ErrorDisplay onRetry={handleRetryFetch} />
                ) : (
                  <>
                    <ItemSlotsRenderer
                      itemsArray={itemsLeft}
                      playerItems={playerInfo.left}
                      side='left'
                      getItemData={getItemData}
                      scanning={scanning}
                    />
                    <ItemSlotsRenderer
                      itemsArray={itemsRight}
                      playerItems={playerInfo.right}
                      side='right'
                      getItemData={getItemData}
                      scanning={scanning}
                    />
                    <ItemSlotsRenderer
                      itemsArray={itemsBottom}
                      playerItems={playerInfo.bottom}
                      side='bottom'
                      getItemData={getItemData}
                      scanning={scanning}
                    />
                  </>
                )}
              </div>
              <a
                href={`https://armory.warmane.com/character/${displayPlayerName}/Icecrown/summary`}
                target='_blank'
                rel='noopener noreferrer'
                className='link-warmane'
              >
                https://warmane.com/{displayPlayerName}
              </a>
            </div>
            <div className='rowplayer-alters'>
              <h1 className='alter-head'>Alters</h1>
              {alters.map((elemento, index) => {
                return (
                  <h3
                    key={index}
                    onClick={() => handleAlterClick(elemento.name)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleAlterClick(elemento.name)
                      }
                    }}
                  >
                    {elemento.name}
                  </h3>
                )
              })}
              {playerName && playerName !== ele.name && (
                <h3
                  onClick={() => handleAlterClick(ele.name)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleAlterClick(ele.name)
                    }
                  }}
                >
                  {ele.name}
                </h3>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Error display component when player is not found
 */
const ErrorDisplay = memo(({ onRetry }) => {
  return (
    <div className='error-container'>
      <div className='error-icon'>⚠️</div>
      <h2 className='error-title'>Personaje no encontrado</h2>
      <p className='error-message'>
        El personaje cambió de nombre. Por favor, verificar dentro del juego o
        en la plataforma Warmane.
      </p>
      <button
        className='error-retry-button'
        onClick={onRetry}
        aria-label='Intentar de nuevo'
      >
        Intentar de nuevo
      </button>
    </div>
  )
})

ErrorDisplay.displayName = 'ErrorDisplay'

/**
 * Sub-component for rendering item slots - memoized for performance
 */
const ItemSlotsRenderer = memo(
  ({ itemsArray, playerItems, side, getItemData, scanning }) => {
    const sideClassName = {
      left: 'left-side',
      right: 'right-side',
      bottom: 'bottom-side'
    }[side]

    return (
      <div className={sideClassName}>
        {itemsArray.map((slotName, index) => {
          const itemData = getItemData(index, side)
          const item = playerItems?.[index]
          const hasImage = item?.src

          return (
            <div className={slotName} key={index}>
              {!scanning ? (
                <a
                  href={`https://wotlk.ultimowow.com?${itemData.id}&domain=es`}
                  className='item-show'
                  rel={`${itemData.gems}&amp;${itemData.ench}`}
                >
                  {hasImage ? (
                    <img src={item.src} alt={slotName} />
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
    )
  }
)

ItemSlotsRenderer.displayName = 'ItemSlotsRenderer'

export default RowPlayer
