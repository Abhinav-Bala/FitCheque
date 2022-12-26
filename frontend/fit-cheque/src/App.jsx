import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './components/homepage/Home'
import Lobby from './components/lobby/Lobby'
function App() {
  return (
    <div className="font-diaply">
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/lobby' exact component={<Lobby/>} />
      </Routes>
    </div>
  )
}

export default App
