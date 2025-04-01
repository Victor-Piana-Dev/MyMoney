import { Provider } from 'react-redux'
import { routes } from '../routes'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'; // Importar o store e persistor

function App() {
 

  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes}></RouterProvider>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App

