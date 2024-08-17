import { useState } from 'react'
import { englishListItemsBis, spanishListItemsBis } from './ItemBis.service'
import { useEffect } from 'react'
import './ItemBis.css'
import { NavLink, useNavigate } from 'react-router-dom'

const slotSpanish = Object.keys(spanishListItemsBis)
console.log(slotSpanish)
const valuesSpanish = Object.values(spanishListItemsBis)
console.log(valuesSpanish)

const slotEnglish = Object.keys(englishListItemsBis)
console.log(slotEnglish)
const valuesEnglish = Object.values(englishListItemsBis)
console.log(valuesEnglish)

const ItemBis = () => {
  const [slotSelected, setSlotSelected] = useState(0)
  const [items, setItems] = useState({
    names: [],
    class: []
  })
  const [language, setLanguage] = useState(true)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  console.log('esto es items ??>', items.class)

  useEffect(() => {
    navigate('/itembis/Neck')
    setTimeout(() => {
      setLoader(true)
    }, 500)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (language) {
      setItems({
        names: Object.keys(valuesSpanish[slotSelected]),
        class: Object.values(valuesEnglish[slotSelected])
      })
    } else {
      setItems({
        names: Object.keys(valuesEnglish[slotSelected]),
        class: Object.values(valuesEnglish[slotSelected])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotSelected, language])

  const changeSlot = (i) => {
    console.log(i)
    setSlotSelected(i)
  }

  return (
    <div className='item-bis'>
      <ul className='slot-container'>
        {slotSpanish.map((itemSlot, i) => {
          return (
            <NavLink
              className={({ isActive }) => (isActive ? 'slot-active' : 'slot')}
              onClick={() => changeSlot(i)}
              key={i}
              to={`${itemSlot}`}
            >
              {itemSlot}
            </NavLink>
          )
        })}
      </ul>
      {loader ? (
        <>
          <ul className='items-names-container'>
            {items &&
              items.names.map((itemName, i) => {
                return (
                  <div className='items-names' key={i}>
                    <a
                      href={`https://wotlk.ultimowow.com?item=${
                        items.class[i].id
                      }&domain=${!language ? 'en' : 'es'}`}
                      style={{ height: '57px' }}
                    >
                      <img src={items.class[i].img} alt={itemName} />
                    </a>
                    <li>{itemName}</li>
                  </div>
                )
              })}
          </ul>
          <ul className='items-class-container'>
            {items &&
              items.class.map((ele, i) => {
                console.log(ele)
                return (
                  <div key={i} className='class-container'>
                    {ele.class.map((classEle, j) => {
                      return <li key={j}>{classEle}</li>
                    })}
                  </div>
                )
              })}
          </ul>
          <div className='item-language'>
            {language ? (
              <button onClick={() => setLanguage(!language)}>English</button>
            ) : (
              <button onClick={() => setLanguage(!language)}>Spanish</button>
            )}
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default ItemBis
