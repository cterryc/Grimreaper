import { useState, useCallback } from 'react'
import { APISCRAP } from '../DkpsTable.service'
import { allGemsList } from './RowTables.service'

const API_HEADERS = {
  method: 'GET',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
}

/**
 * Parse item information and extract enchantments and gems
 */
const parseItemData = (rel) => {
  if (!rel) return { id: '', ench: '', gems: '' }

  const itemId = rel.split('&')
  let ench = ''
  let gems = ''

  if (!itemId[1]) {
    return { id: itemId[0], ench, gems }
  }

  // Parse enchantment (ench parameter)
  if (itemId[1]?.[0] === 'e') {
    ench = itemId[1]
  }

  // Parse gems from itemId[1] or itemId[2]
  const gemsData = itemId[1]?.[0] === 'g' ? itemId[1] : itemId[2]
  if (gemsData?.[0] === 'g') {
    const allGems = gemsData.split('=')
    const idGems = allGems[1]?.split(':') || []
    const [gem1 = 0, gem2 = 0, gem3 = 0] = idGems

    gems = `gems=${gem1 !== 0 ? allGemsList[gem1] : 0}:${
      gem2 !== 0 ? allGemsList[gem2] : 0
    }:${gem3 !== 0 ? allGemsList[gem3] : 0}`
  }

  return { id: itemId[0], ench, gems }
}

/**
 * Custom hook to manage player info fetching and caching
 */
export const usePlayerInfo = () => {
  const [scanning, setScanning] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerInfo, setPlayerInfo] = useState({
    left: [],
    right: [],
    bottom: []
  })
  const [error, setError] = useState(null)

  const fetchPlayerInfo = useCallback(async (playerNameToFetch) => {
    if (!playerNameToFetch) {
      setError('Player name is required')
      return
    }

    try {
      setScanning(true)
      setError(null)
      setPlayerName(playerNameToFetch)

      const response = await fetch(
        `${APISCRAP}/api/${playerNameToFetch}`,
        API_HEADERS
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch player data: ${response.statusText}`)
      }

      const data = await response.json()

      setPlayerInfo({
        left: data.left || [],
        right: data.right || [],
        bottom: data.bottom || []
      })
    } catch (err) {
      console.error('Error fetching player data:', err)
      setError(err.message)
      setPlayerInfo({ left: [], right: [], bottom: [] })
    } finally {
      setScanning(false)
    }
  }, [])

  const resetPlayerInfo = useCallback(() => {
    setPlayerName('')
    setPlayerInfo({ left: [], right: [], bottom: [] })
    setError(null)
  }, [])

  const getItemData = useCallback(
    (index, side) => {
      try {
        const item = playerInfo[side]?.[index]
        return parseItemData(item?.rel)
      } catch (err) {
        console.error('Error parsing item data:', err)
        return { id: '', ench: '', gems: '' }
      }
    },
    [playerInfo]
  )

  return {
    scanning,
    playerName,
    playerInfo,
    error,
    fetchPlayerInfo,
    resetPlayerInfo,
    getItemData
  }
}
