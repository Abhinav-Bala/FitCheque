import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './components/homepage/Home'
import Lobby from './components/lobby/Lobby'
import Game from './components/game/Game'
function App() {
  return (
    <div className="font-display">
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path="/lobby" element={<Lobby/>} exact />
        <Route path="/game" element={<Game/>} exact />
      </Routes>
    </div>
  )
}

export default App
