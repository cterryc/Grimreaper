import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../views/Home/DkpsTable/DkpsTable.service'
// import { objectPost } from '../../helpers/objetPost'

export const getMainAndAlters = createAsyncThunk(
  'players/getMainAndAlters',
  async (userValue, thunkAPI) => {
    try {
      // Realiza la llamada a la API con los datos del usuario
      const response = await fetch(`${API}/main`)

      // Convierte la respuesta en JSON
      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      // Manejo de errores: puedes utilizar thunkAPI.rejectWithValue para pasar el error
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
