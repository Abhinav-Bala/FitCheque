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

  const start = () => {
    socket.emit("startGame", {room: roomData});
  }

  

  console.log(roomData)
  return (
    <div> 
      <div className='bg-white max-h-screen grid grid-cols-12'>
        <div className='col-span-5'>
          <div className='px-36 py-16 object-fit '>
          <img className='' src='assets/lobby-g1.png'/>
          </div>
        </div>
        <div className='col-span-2'>
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
              {host ? null : <button onClick={ready}  className='px-4 py-3 text-black bg-gray-200 baseline hover:bg-black hover:text-white active:bg-green-400 focus:outline-white focus:animate-pulse focus:text-white focus:bg-green-400 focus:border-green-700 transition duration-150 ease-in-out'>
                <div className='max-w-3xl w-auto h-auto text-center text-lobbyItem'>
                  READY
                </div>
              </button>
              }
              {host ? 
                <button onClick={start} className='px-4 py-3 bg-black text-white hover:bg-green-400  active:bg-green-600 focus:bg-green-400 focus:border-green-700 transition duration-150 ease-in-out'>
                <div className='text-lobbyItem text-center'>
                  START GAME
                </div>
              </button>
              :
              null              
            }   
            </div>
          </div>
        </div>
        </div>
        <div className='col-span-5'>
        <div className='py-52 pl-36 pr-16 object-fit '>
          <img className='' src='assets/instructions.png'/>
          </div>
        </div>
        <div className='fixed top-5 left-5 flex text-black z-50'>
          <button href='#' className='font-semibold text-heading px-10 -left text-black bg-white baseline outline outline-gray-600 hover:bg-gray-400 hover:outline-white hover:text-white active:bg-gray-600 active:text-white focus:bg-gray-600 focus:text-white transition duration-150 ease-in-out'>
            <p className='max-w-sm text-left'>
              BACK
            </p>
          </button>
         
        </div> 
      </div>
    </div>
  );
}

export default Lobby;