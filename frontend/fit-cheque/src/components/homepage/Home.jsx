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
        Fit Cheque
      </div>
      <div className='h-screen w-screen grid grid-cols-12'>
        <div className="col-span-4 h-screen bg-[url('/assets/receipt.jpg')]">
            <div className='flex flex-col py-40 px-4 gap-4 place-content-start font-semibold text-3xl'>
              <button>
                <div className=' hover:underline hover:cursor-pointer'>
                HOST
                </div>
              </button>
              <button>
                <div className=' hover:underline hover:cursor-pointer'>
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