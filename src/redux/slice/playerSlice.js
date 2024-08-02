import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mains: [],
  alters: [],
  error: '',
  loading: false
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
  }
  // 3 acciones asincronas por cada acción creada
  /* extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // Aquí puedes manejar el estado mientras la acción está en curso (cargando)
        // Puedes mostrar un indicador de carga, por ejemplo
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción se completa exitosamente
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Aquí puedes manejar el estado cuando la acción es rechazada (error)
        state.loading = false
        state.error = action.error.message
      })
  } */
})

// La funcion "createSlice" de redux-toolkit, crea 2 propiedades dentro de "userSlice"
// estas propieades son ".actions" y ".reducer"
export const { addMains, addAlters } = playerSlice.actions
export default playerSlice.reducer // esto es el userReducer usado en el archivo store.js
