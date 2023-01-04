import {React, useEffect, useState, useReducer} from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
import socket from './utils/socket'
import Home from './components/homepage/Home'
import Lobby from './components/lobby/Lobby'

function App() {

  const roomReducer = (state, action) => {
    switch (action.type) {
      case "init-room":
        return {
          code: action.newCode,
          players: action.newPlayers,
          state: action.newState
        }
      default:
        return state;
    }
  };
  
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const initialRoomData = {code: 0, players: [], state: "home"}
  const [roomData, dispatch] = useReducer(roomReducer, initialRoomData)

  useEffect(() => {
    socket.on("error", (data) => {
      setError(data.error)
    })

    socket.on("connect_error", (err) => {
      alert(err.message)
    });

    socket.on("lobby", (data) => {
      dispatch({type: "init-room", newCode: data.room.code, newPlayers: data.room.players, newState: data.room.state})
      navigate('/lobby')
    })

    return () => {
      socket.off("error")
      socket.off("connect-error")
      socket.off("lobby")
    }
  },[])

  console.log(error)
  return (
    <div className="font-display">
      <Routes>
        <Route path='/' exact element={<Home socket={socket}  error={error}/>} />
        <Route path="/lobby" element={<Lobby socket={socket} roomData={roomData}/>} exact />
      </Routes>
    </div>
  )
}

export default App
