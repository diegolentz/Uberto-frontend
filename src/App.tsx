import './App.css'
import { ToastProvider } from './hooks/toast/toast.context'
import { AppRouter } from './routes'

function App() {

  return (
    <>
      <ToastProvider key={1}>
        <AppRouter/>
      </ToastProvider>
    </>
  )
}

export default App

