import React from 'react'
import { useState, useEffect} from 'react';


const Home = ({socket, error}) => {
  const [roomCode, setRoomCode] = useState("")
  const [username, setUserName] = useState("")
  const [connected, setConnected] = useState(false)

  const connectServer = () => {
    if(username===""){
      alert("Enter a username")
    } else {
      if(!connected){
        setConnected(true)
        socket.auth = {username};
        socket.connect();
      }
    }
  }

  const validateRoomCode = () => {
    connectServer()
    alert("clkicked")
    socket.emit("join-room");
  }

  const createRoom = () => {
    connectServer()
    socket.emit("create-room");
  }

  console.log(username);
  return (
     <div>
      <div className='fixed top-2 left-4 right-0  font-bold z-50'> 
        FIT CHEQUE
      </div>
      <div className='h-screen w-screen grid grid-cols-12 max-h-screen'>
        <div className="col-span-4 h-screen max-h-screen bg-[url('/assets/receipt.jpg')]">
            <div className='grid grid-cols-1 text-3xl py-48 px-8 place-content-start bg-white bg-opacity-40'>
              <div className='py-8'>
                <input onChange={(e) =>setUserName(e.target.value)} maxLength={8} type="text" className='outline outline-none border-black border-4 text-center py-2 text-heading font-light' placeholder='USERNAME...'></input>
              </div>  

              <div className='underline underline-offset-8 text-left text-heading'>
              JOIN
              </div>
              <form className='gap-4 flex flex-row py-6'>
                <input onChange={(e) =>setRoomCode(e.target.value)} type="text" className='outline outline-none border-black border-4 text-center w-72 py-2 text-heading font-light' placeholder='ROOM CODE'></input>
                <button onClick={validateRoomCode} className='bg-black w-16 h-16 items-center border-black border-4 hover:scale-105 hover:shadow-xl'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-14 h-14">
                  <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
                </button>
              </form>  
              {error === "" ? <p className='text-transparent py-2'>j</p> : <p className='text-red-300'>{error}</p>}

              <div className='w-16 pb-24'>
                <button onClick={createRoom} className='underline underline-offset-8 hover:font-bold hover:cursor-pointer text-left text-heading'>
                    HOST
                </button>
              </div>
              <img src='/assets/barcode.png' className='h-16 w-full'/>
              <div className='text-center'>Made by Abhinav and Sumedh. Designed by Lillian. Images retreived from SSENSE.</div>
            </div>
        </div>
        <div className='col-span-8 h-screen bg-white'>

        </div>
      </div>
     </div>
  )
}



export default Home;