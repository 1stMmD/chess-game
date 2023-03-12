import { useEffect, useState } from 'preact/hooks'
import Table from './components/Table'
import { socket, socket_error } from './signals/SocketSignal'
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import AuthProtected from './signals/AuthProtected'
import Play from './pages/Play'
import Auth from './pages/Auth'
import Home from './pages/Home'

const Game = () => {

  if(!!socket_error.value) return(
    <div>
      Error
    </div>
  )

  return (
    <Router>
      <div
      className={`
      flex
      justify-evenly
      items-center
      h-screen
      w-full
      p-2
      gap-2
      `}>
        <Routes>

          <Route path="/play" element={<AuthProtected><Play/></AuthProtected>} />
          <Route path="/play/:id" element={<AuthProtected><Play/></AuthProtected>} />

          <Route path="/" element={<AuthProtected><Home/></AuthProtected>} />
          
          <Route path="/auth" element={<Auth/>} />

        </Routes>
      </div>
    </Router>
  )
}

export default Game