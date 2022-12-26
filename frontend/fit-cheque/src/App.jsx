import React from 'react'
import Home from './components/homepage/Home'
import Lobby from './components/lobby/Lobby'
function App() {
  return (
    <div className="font-display">
      <Route path='/' exact component={Home} />
      <Route path='/lobby' exact component={Game} />
    </div>
  )
}

export default App
