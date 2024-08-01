import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../views/Home/DkpsTable/DkpsTable.service'
import { objectPost } from '../../helpers/objetPost'

export const loginUser = createAsyncThunk(
  'user/fetchUser',
  async (userValue, thunkAPI) => {
    try {
      // Realiza la llamada a la API con los datos del usuario
      const response = await fetch(`${API}/login`, objectPost(userValue))

      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
        // Lanza un error con el texto del estado si la respuesta no fue exitosa
        throw new Error('Failed to login: ' + response.statusText)
      }

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
