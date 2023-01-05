import {React, useEffect, useState, useReducer} from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
import socket from './utils/socket'
import Home from './components/homepage/Home'
import Lobby from './components/lobby/Lobby'

function App() {

  const roomReducer = (state, action) => {
    switch (action.type) {
      case "update-room":
        return {
          code: action.newCode,
          players: action.newPlayers,
          state: action.newState,
          host: action.newHost,
        }
      default:
        return state;
    }
  };
  
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("/")

  const initialRoomData = {code: 0, players: [], state: "home", host: null}
  const [roomData, dispatch] = useReducer(roomReducer, initialRoomData)

  useEffect(() => {
    socket.on("error", (data) => {
      setError(data.error)
    })

    socket.on("connect_error", (data) => {
      alert(data.message)
    });

    socket.on("update-state", (data) => {
      const room = data.room;
      dispatch({type: "update-room", newCode: room.code, newPlayers: room.players, newState: room.state, newHost: room.host})
      if(currState !== room.state){
        if(room.state === "game"){
          navigate("/game")
        } else if (room.state === "loading"){
          navigate("/loading")
        } else if(room.state === "lobby"){
          navigate("/lobby")
        }
      }
    })

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on("error", (data) => {
        alert(data.message)
    })

    return () => {
      socket.off("error")
      socket.off("connect-error")
      socket.off("lobby")
      socket.off("session")
      socket.off("update-state")
    }
  },[])

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
