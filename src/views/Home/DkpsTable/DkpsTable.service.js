export const header = ['Personaje', 'Clase', 'Rango', 'Dkps']
export const colorsClass = [
  { color: '#8788EE', class: 'Brujo' },
  { color: '#C41E3A', class: 'Caballero de la Muerte' },
  { color: '#AAD372', class: 'Cazador' },
  { color: '#0070DD', class: 'Chamán' },
  { color: '#FF7C0A', class: 'Druida' },
  { color: '#C69B6D', class: 'Guerrero' },
  { color: '#3FC7EB', class: 'Mago' },
  { color: '#3FC7EB', class: 'Maga' },
  { color: '#F48CBA', class: 'Paladín' },
  { color: '#FFF468', class: 'Pícaro' },
  { color: '#FFFFFF', class: 'Sacerdote' }
]

export const selectColor = (playerClass, _elemento) => {
  const filter = colorsClass.find((ele) => ele.class === playerClass)
  // if (!filter) {
  //   console.log(elemento)
  // }
  return filter?.color
}

export const rankPriority = {
  'Guild Master': 1,
  Officer: 2,
  Veteran: 3,
  Member: 4,
  Initiate: 5,
  '*External*': 6
}

export const orderFunction = (array) => {
  const newORder = array.sort((a, b) => a.name.localeCompare(b.name))
  return newORder
}

// se encesita usar VITE en la variable de entorno
const BACK_END = import.meta.env.VITE_LOCAL
console.log(BACK_END)

let API_BACK
let VITE_SCRAP
if (BACK_END) {
  API_BACK = 'http://192.168.18.20:3001'
  VITE_SCRAP = 'http://192.168.18.20:4001'
} else {
  API_BACK = import.meta.env.VITE_API
  VITE_SCRAP = import.meta.env.VITE_SCRAP
}
export const API = API_BACK
export const APISCRAP = VITE_SCRAP
