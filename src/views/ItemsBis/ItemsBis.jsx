import { useState } from 'react'
import {
  englishListItemsBis,
  spanishListItemsBis,
  colorsClass
} from './ItemBis.service'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const slotSpanish = Object.keys(spanishListItemsBis)
const valuesSpanish = Object.values(spanishListItemsBis)
const valuesEnglish = Object.values(englishListItemsBis)

const ItemBis = () => {
  const [slotSelected, setSlotSelected] = useState(0)
  const [items, setItems] = useState({
    names: [],
    class: []
  })
  const [language, setLanguage] = useState(true)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

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
    setSlotSelected(i)
  }

  return (
    <div className='w-full relative flex flex-col md:flex-row justify-center gap-5 mt-20 px-4'>
      {/* Lista de slots (izquierda) */}
      <ul className='p-0 flex flex-col items-start m-0 w-full md:w-48'>
        {slotSpanish.map((itemSlot, i) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'h-10 w-full md:w-48 pl-5 border-b border-r border-[#818181] font-bold bg-[#ffffffc9] text-[#000000d5] flex justify-start items-center no-underline'
                : 'h-10 w-full md:w-48 pl-5 border-b border-r border-[#818181] font-bold text-white bg-[rgba(87,87,87,0.637)] flex justify-start items-center no-underline hover:bg-[#424242] active:bg-red-600 cursor-pointer'
            }
            onClick={() => changeSlot(i)}
            key={i}
            to={`${itemSlot}`}
          >
            {itemSlot}
          </NavLink>
        ))}
      </ul>

      {/* Botón de idioma */}
      <div className='flex justify-center w-auto md:absolute right-5 top-1 p-1 z-100'>
        <button
          onClick={() => setLanguage(!language)}
          className='w-25 flex text-xl h-10 items-center justify-center p-0 bg-blue-600 text-white rounded'
        >
          {language ? 'English' : 'Spanish'}
        </button>
      </div>

      {loader ? (
        <>
          {/* Grid de tres columnas responsive */}
          <div className='grid grid-cols-1 gap-4 max-w-2xl w-full'>
            {/* Columna 1: nombres de items */}
            <ul className='flex gap-2.5 my-0 md:my-10 p-0 flex-col'>
              {items &&
                items.names.map((itemName, i) => (
                  <div
                    className="flex items-center border-t border-white w-full text-sm md:text-lg font-['Franklin_Gothic_Medium','Arial_Narrow',Arial,sans-serif] p-0 flex-col gap-5"
                    key={i}
                  >
                    <div className="flex h-14 items-center border-t border-white w-full text-sm md:text-lg font-['Franklin_Gothic_Medium','Arial_Narrow',Arial,sans-serif] p-0">
                      <a
                        href={`https://wotlk.ultimowow.com?item=${items.class[i].id}&domain=${!language ? 'en' : 'es'}`}
                        className='h-14'
                      >
                        <img
                          style={{
                            border:
                              (itemName === 'Agonía de Sombras' ||
                                itemName === 'Shadowmourne') &&
                              'solid 2px rgb(197 73 0)'
                          }}
                          src={items.class[i].img}
                          alt={itemName}
                          className='min-h-14 min-w-14 rounded-[5px] border-2 border-[#55008d]'
                        />
                      </a>
                      <li className='w-full list-none truncate ml-2'>
                        {itemName}
                      </li>
                      <h2 className='text-red-400'>{items.class[i].drop}</h2>
                    </div>
                    <div className='flex gap-2'>
                      {items.class[i].class.map((classEle, j) => {
                        const color = colorsClass.find((color) =>
                          color.type?.includes(classEle)
                        )
                        console.log('color', color)

                        return (
                          <li
                            key={j}
                            className={`list-none text-xs md:text-base font-medium`}
                            style={{ color: color ? color.color : '#FFFFFF' }}
                          >
                            {classEle}{' '}
                            {items.class[i].class.length - 1 !== j && '|'}
                          </li>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <h1 className='text-white text-2xl'>Loading...</h1>
      )}
    </div>
  )
}

export default ItemBis
