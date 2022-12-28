import React from 'react'
import { useState } from 'react';
import createId from '../../utils/roomCodeGenerator';
import {Link} from 'react-router-dom';


const Home = () => {
  const [roomCode, setRoomCode] = useState("")

  const validateRoomCode = (roomCode) => {
    //replace with try catch later

    if(roomCode !== '000' || roomCode !== ''){
      alert("Please enter a valid room code")
      setRoomCode('')
    }
  }
  console.log(roomCode);
  return (
     <div>
      <div className='fixed top-2 left-4 right-0 text-9xl text-title font-bold z-50'>
        FIT CHEQUE
      </div>
      <div className='h-screen w-screen grid grid-cols-12 max-h-screen'>
        <div className="col-span-4 h-screen max-h-screen bg-[url('/assets/receipt.jpg')]">
            <div className='grid grid-cols-1 py-32 text-3xl px-8 place-content-start bg-white bg-opacity-40'>
              <div className='underline underline-offset-8 text-left text-heading pt-28'>
              JOIN
              </div>
              <form className='gap-4 flex flex-row py-6'>
                <input onChange={(e) =>setRoomCode(e.target.value)} type="text" className='outline outline-none border-black border-4 text-center w-72 py-2 text-heading font-light' placeholder='ROOM CODE'></input>
                <button className='bg-black w-16 h-16 items-center border-black border-4 hover:scale-105 hover:shadow-xl'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-14 h-14">
                  <path fill-rule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clip-rule="evenodd" />
                </svg>
                </button>
              </form>  
             <div className='w-16 pt-8 pb-36'>
              <button className='underline underline-offset-8 hover:font-bold hover:cursor-pointer text-left text-heading'>
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