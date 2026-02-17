import { useCallback, useEffect, useRef, memo, useState } from 'react'
import { selectColor } from '../DkpsTable.service'
import { itemsLeft, itemsBottom, itemsRight } from './RowTables.service'
import { usePlayerInfo } from './usePlayerInfo'
import './RowPlayer.css'

const PlayerModal = ({ player, alters, onClose }) => {
  const [percent, setPercent] = useState(0)
  const modalRef = useRef(null)
  const {
    scanning,
    playerName,
    playerInfo,
    error,
    fetchPlayerInfo,
    getItemData
  } = usePlayerInfo()

  useEffect(() => {
    if (percent < 100) {
      const interval = setInterval(() => {
        setPercent((prev) => (prev < 100 ? prev + 2 : 0))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [percent])

  // Fetch initial player data
  useEffect(() => {
    if (player) {
      fetchPlayerInfo(player.name)
    }
  }, [player, fetchPlayerInfo])

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleAlterClick = useCallback(
    (alterName) => {
      fetchPlayerInfo(alterName)
    },
    [fetchPlayerInfo]
  )

  const handleRetryFetch = useCallback(() => {
    setPercent(0)
    if (playerName) {
      fetchPlayerInfo(playerName)
    }
  }, [playerName, fetchPlayerInfo])

  const displayPlayerName = playerName || player?.name

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        ref={modalRef}
        className='player-alters'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
      >
        <h1>{player.name}</h1>
        <button
          className='player-alters-button'
          onClick={onClose}
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
                {scanning && <span>{percent}%</span>}
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
              🔗 Ver en Warmane
            </a>
          </div>
          <div className='rowplayer-alters'>
            <h1 className='alter-head'>Alters</h1>
            <div className='alters-container'>
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
                    style={{ '--class-color': selectColor(elemento.class) }}
                  >
                    {elemento.name}
                  </h3>
                )
              })}
            </div>
            {playerName && playerName !== player.name && (
              <h3
                onClick={() => handleAlterClick(player.name)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAlterClick(player.name)
                  }
                }}
                style={{ '--class-color': selectColor(player.class) }}
              >
                {player.name}
              </h3>
            )}
          </div>
        </div>
      </div>
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
                  target='_blank'
                >
                  {hasImage ? (
                    <img src={item.src} alt={slotName} />
                  ) : (
                    <span className='no-equiped'>No equipado</span>
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

export default PlayerModal
