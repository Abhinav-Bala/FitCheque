import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './components/homepage/Home'
import Lobby from './components/lobby/Lobby'
function App() {
  return (
    <div className="font-display">
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path="/lobby" element={<Lobby/>} exact />
      </Routes>
    </div>
  )
}

export default App
