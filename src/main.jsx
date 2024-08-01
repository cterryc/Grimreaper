import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

// Estos son las importaciones para el persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// aqui creamos persistor que pasaremos como prop al componente "PersistGate"
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </BrowserRouter>
)
