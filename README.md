## Estructura del Proyecto

El proyecto GrimReaper es una aplicación React que gestiona DKP para un guild de World of Warcraft [0-cite-0](#0-cite-0) . La aplicación ya tiene soporte multiidioma (español e inglés) implementado en varios componentes [0-cite-1](#0-cite-1) .

## Componentes Principales

### Sistema de Items BiS
El sistema muestra recomendaciones de equipamiento óptimo organizadas por slot de equipo [0-cite-2](#0-cite-2) . Los datos están disponibles en español e inglés [0-cite-3](#0-cite-3) , con nombres de slots como "Neck", "Cape", "Chest", etc. [0-cite-4](#0-cite-4) .

### Integración con APIs
La aplicación se conecta a múltiples servicios [0-cite-5](#0-cite-5) :
- API principal para datos de personajes y DKP
- Servicio de scraping para equipamiento
- Integración con UltimoWoW para tooltips de items
- Enlaces a Warmane Armory para perfiles de personajes

### Sistema de Clases
El proyecto incluye configuración de colores para todas las clases de WoW en español [0-cite-6](#0-cite-6) : Brujo, Caballero de la Muerte, Cazador, Chamán, Druida, Guerrero, Mago/Maga, Paladín, Pícaro y Sacerdote.

## Propuesta de README

Basándome en la estructura del código, un README en español debería incluir:

1. **Descripción del Proyecto**: Sistema de gestión de DKP para guilds de WoW
2. **Características**: 
   - Visualización de items Best-in-Slot por clase y especialización
   - Seguimiento de puntos DKP de jugadores
   - Soporte multiidioma (español/inglés)
   - Integración con armory de Warmane
3. **Configuración**: Variables de entorno necesarias (`VITE_LOCAL`, `VITE_API`, `VITE_SCRAP`) [0-cite-5](#0-cite-5) 
4. **Tecnologías**: React, Redux, React Router
5. **Estructura de Datos**: Explicación del sistema de slots y clases

## Notes

El proyecto ya tiene una base sólida de internacionalización con contenido en español, incluyendo headers de tabla [0-cite-7](#0-cite-7)  y nombres de clases traducidos. El componente ItemBis permite alternar entre idiomas mediante un botón [0-cite-8](#0-cite-8) . Si necesitas que genere el contenido completo del README.md en español con más detalles técnicos, instrucciones de instalación o ejemplos de uso, por favor especifica qué secciones te gustaría que incluyera.

### Citations

**File:** src/views/Home/DkpsTable/DkpsTable.service.js (L1-14)
```javascript
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
```

**File:** src/views/Home/DkpsTable/DkpsTable.service.js (L38-52)
```javascript
// se encesita usar VITE en la variable de entorno
const BACK_END = import.meta.env.VITE_LOCAL
console.log(BACK_END)

let API_BACK
let VITE_SCRAP
if (BACK_END) {
  API_BACK = 'http://192.168.18.20:3001'
  VITE_SCRAP = 'http://192.168.18.20:4000'
} else {
  API_BACK = import.meta.env.VITE_API
  VITE_SCRAP = import.meta.env.VITE_SCRAP
}
export const API = API_BACK
export const APISCRAP = VITE_SCRAP
```

**File:** src/views/ItemsBis/ItemsBis.jsx (L2-2)
```javascript
import { englishListItemsBis, spanishListItemsBis } from './ItemBis.service'
```

**File:** src/views/ItemsBis/ItemsBis.jsx (L17-25)
```javascript
const ItemBis = () => {
  const [slotSelected, setSlotSelected] = useState(0)
  const [items, setItems] = useState({
    names: [],
    class: []
  })
  const [language, setLanguage] = useState(true)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
```

**File:** src/views/ItemsBis/ItemsBis.jsx (L129-135)
```javascript
          <div className='item-language'>
            {language ? (
              <button onClick={() => setLanguage(!language)}>English</button>
            ) : (
              <button onClick={() => setLanguage(!language)}>Spanish</button>
            )}
          </div>
```

**File:** src/views/ItemsBis/ItemBis.service.js (L459-477)
```javascript
  Neck: {
    'Gargantilla carmesí de la Reina de Sangre': [
      'Rshamy',
      'Disci',
      'Mage',
      'Hpala',
      'Balance'
    ],
    'Garra cruel de Sindragosa': ['Rogue Combat', 'Hunter', 'Druid Cat'],
    'Amuleto de la elegía silenciosa': ['Shadow P', 'Warlock'],
    'Colgante de lobreguez': ['Warr Fury', 'Dk Uh', 'Pala Ret'],
    'Medallón con bilis incrustada': [
      'War Prot',
      'Pala Prot',
      'Dk Blood Tank',
      'Druid Bear'
    ],
    'Amuleto de centinela osario': ['Druid Rest']
  },
```
