import React from 'react'
import { useState, useEffect } from 'react'
import receipt from "/assets/receipt.jpg"
import UserList from './UserList';

const main_bg = {
  width: '100vw',
  height: '130vh',
  backgroundImage: ``,
  backgroundPosition: 'auto',
  backgroundSize: 'auto',
  backgroundRepeat: 'no-repeat',
  };

const list_bg = {
  width: '30vw',
  height: '48vh',
  backgroundImage: `url(${receipt})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  opacity: '1',
  center: true,
};

const Lobby = ({socket, roomData}) => {
  const sessionID = localStorage.getItem("sessionID");
  const [host, setHost] = useState(false)

  useEffect(() => {

    if(sessionID === roomData.host){
      setHost(true)
    }
  },[])

  const ready = () => {
    socket.emit("ready", {room: roomData});
  }

  

  console.log(roomData)
  return (
    <div> 
      <div className='bg-white max-h-screen'>
        <div className='py-12 flex flex-col-reverse items-center justify-center'>
          <div className='flex flex-col space-y-4 text-black justify-center items-center'>
            <div className='animate-bounce text-center text-black text-lobbyCode font-extrabold'>
              {roomData.code}
            </div>
            <hr className="text-gray-800 border-2 w-4/5"></hr>
            <p className='text-center text-gray-800 font-normal text-lobbyItem'>
              {roomData.players.length}/10
            </p>
            <hr className="text-gray-800 border-2 w-4/5"></hr>
          <div className='px-8'>
            <div className="justify-center items-center" style={list_bg}>
            <div className="text-userList px-1 grid gap-1 font-extralight text-justify">
              {roomData.players.map((player, i) => {
                return <UserList user={player.username} isReady={player.isReady} host={sessionID == roomData.host} i={i} gamers={roomData.players}/>
              })}
              </div>
            </div>
          </div>
            <div className='flex justify-center space-x-10 pt-3'>
              {host ? null : <button  className='px-4 py-3 text-black bg-gray-200 baseline hover:bg-black hover:text-white active:bg-green-400 focus:outline-white focus:animate-pulse focus:text-white focus:bg-green-400 focus:border-green-700 transition duration-150 ease-in-out'>
                <p className='max-w-3xl w-auto h-auto text-center text-lobbyItem'>
                  READY
                </p>
              </button>
              }
              {host ? 
                <button className='px-4 py-3 bg-black text-white hover:bg-green-400  active:bg-green-600 focus:bg-green-400 focus:border-green-700 transition duration-150 ease-in-out'>
                <p className='text-lobbyItem text-center'>
                  START GAME
                </p>
              </button>
              :
              null              
            }   
            </div>
          </div>
        </div>
        <div className='fixed top-5 left-5 flex text-black'>
          <button href='#' className='font-semibold text-heading px-10 -left text-black bg-white baseline outline outline-gray-600 hover:bg-gray-400 hover:outline-white hover:text-white active:bg-gray-600 active:text-white focus:bg-gray-600 focus:text-white transition duration-150 ease-in-out'>
            <p className='max-w-sm text-left'>
              BACK
            </p>
          </button>
         
        </div> 
        <div className='fixed text-black top-44 left-20'>
          <h1>
            [SICK ASS FIT]
          </h1>
          </div>
        <div className='text-left fixed text-black top-40 right-24 space-y-4'>
          <h1>FIT CHEQUE</h1>
          <h1>FIT CHEQUE</h1>
          <h1>FIT CHEQUE</h1>
          <h1>FIT CHEQUE</h1>
        </div>
      </div>
    </div>
  );
}

export default Lobby;