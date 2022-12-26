import React from 'react'
import { useState } from 'react';
import createId from '../../utils/roomCodeGenerator';
import {Link} from 'react-router-dom';


const Homepage = () => {
  const [roomCode, setRoomCode] = useState('')
  const [error, setError] = useState(false)

  const validateRoomCode = (roomCode) => {
    //replace with try catch later

    if(roomCode !== '000' || roomCode !== ''){
      setError(true)
      setRoomCode('')
    }
  }

  return (
     <div>
      <div className='fixed top-4 left-4 right-0 text-9xl font-extrabold z-50'>
        FIT CHEQUE
      </div>
      <div className='h-screen w-screen grid grid-cols-12'>
        <div className="col-span-4 h-screen bg-[url('/assets/receipt.jpg')]">
            <div className='grid grid-cols-1 py-40 px-4 gap-4 place-content-start text-3xl'>
              <button>
                <div className=' hover:underline hover:cursor-pointer text-left'>
                HOST
                </div>
              </button>
              <button>
                <div className=' hover:underline hover:cursor-pointer text-left'>
                JOIN
                </div>
              </button>
            </div>
        </div>
        <div className='col-span-8 h-screen bg-white'>

        </div>
      </div>
     </div>
  )
}



export default Homepage