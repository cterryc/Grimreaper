import { createSlice } from '@reduxjs/toolkit'
import {
  getActual,
  getFirst,
  getMainAndAlters,
  getSecond
} from '../actions/actionsCharacters'

const initialState = {
  mains: [],
  alters: [],
  error: '',
  loader: false,
  date: ''
}

// aqui se generan los reducers y las acciones
export const playerSlice = createSlice({
  // name es el nombre del slice
  name: 'player',
  initialState,
  // reducers => iran todos los reducers q vamos a crear
  reducers: {
    addMains: (state, action) => {
      // const { user } = action.payload
      console.log(action.payload)
      state.mains = action.payload
    },
    addAlters: (state, action) => {
      // const { user } = action.payload
      console.log(action.payload)
      state.alters = action.payload
    }
    // changeEmail: (state, action) => {
    //   state.email = action.payload
    // }
  },
  // 3 acciones asincronas por cada acción creada
  extraReducers: (builder) => {
    builder
      .addCase(getMainAndAlters.pending, (state) => {
        // Aquí puedes manejar el estado mientras la acción está en curso (cargando)
        // Puedes mostrar un indicador de carga, por ejemplo
        state.loader = true
      })
      .addCase(getMainAndAlters.fulfilled, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción se completa exitosamente
        state.loader = false
        const newORderMain = [...action.payload.response]
        const newORderAlter = [...action.payload.alters]
        newORderAlter.sort((a, b) => a.name.localeCompare(b.name))
        newORderMain.sort((a, b) => b.net - a.net)
        console.log(action.payload)
        state.mains = newORderMain
        state.alters = newORderAlter
        state.date = action.payload.date
      })
      .addCase(getMainAndAlters.rejected, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción es rechazada (error)
        state.loader = false
        state.error = action.error.message
      })
      .addCase(getActual.pending, (state) => {
        // Aquí puedes manejar el estado mientras la acción está en curso (cargando)
        // Puedes mostrar un indicador de carga, por ejemplo
        state.loader = true
      })
      .addCase(getActual.fulfilled, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción se completa exitosamente
        state.loader = false
        state.mains = action.payload
      })
      .addCase(getActual.rejected, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción es rechazada (error)
        state.loader = false
        state.error = action.error.message
      })
      .addCase(getFirst.pending, (state) => {
        // Aquí puedes manejar el estado mientras la acción está en curso (cargando)
        // Puedes mostrar un indicador de carga, por ejemplo
        state.loader = true
      })
      .addCase(getFirst.fulfilled, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción se completa exitosamente
        state.loader = false
        state.mains = action.payload
      })
      .addCase(getFirst.rejected, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción es rechazada (error)
        state.loader = false
        state.error = action.error.message
      })
      .addCase(getSecond.pending, (state) => {
        // Aquí puedes manejar el estado mientras la acción está en curso (cargando)
        // Puedes mostrar un indicador de carga, por ejemplo
        state.loader = true
      })
      .addCase(getSecond.fulfilled, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción se completa exitosamente
        state.loader = false
        state.mains = action.payload
      })
      .addCase(getSecond.rejected, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción es rechazada (error)
        state.loader = false
        state.error = action.error.message
      })
  }
})

// La funcion "createSlice" de redux-toolkit, crea 2 propiedades dentro de "userSlice"
// estas propieades son ".actions" y ".reducer"
export const { addMains, addAlters } = playerSlice.actions
export default playerSlice.reducer // esto es el userReducer usado en el archivo store.js
