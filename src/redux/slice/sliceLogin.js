import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../actions/actionsLogin'

const initialState = {
  user: {},
  error: '',
  loading: false
}

// aqui se generan los reducers y las acciones
export const userSlice = createSlice({
  // name es el nombre del slice
  name: 'user',
  initialState,
  // reducers => iran todos los reducers q vamos a crear
  reducers: {
    addUser: (state, action) => {
      const { user } = action.payload
      state.user = user
    }
    // changeEmail: (state, action) => {
    //   state.email = action.payload
    // }
  },
  // 3 acciones asincronas por cada acción creada
  extraReducers: (builder) => {
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
  }
})

// La funcion "createSlice" de redux-toolkit, crea 2 propiedades dentro de "userSlice"
// estas propieades son ".actions" y ".reducer"
export const { addUser } = userSlice.actions
export default userSlice.reducer // esto es el userReducer usado en el archivo store.js
