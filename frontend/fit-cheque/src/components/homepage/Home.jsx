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
      <div className='flex flex-row justify-center h-screen'>
        <div className='lg:basis-2/5 lg:bg-red-300 lg:flex hidden'>
        </div>
        <div className='basis-3/5 bg-blue-300 flex'>
          <div className='p-24 bg-green-300 m-auto grid-cols-1 flex flex-col space-y-4'>
            <h1 className='text-8xl pb-6 font-extrabold'>Fit Cheque</h1>
            <div className='flex flex-col space-y-2 text-center'>
              <input className='text-center rounded-full h-16 text-3xl font-bold' placeholder='enter game code' onChange={event => setRoomCode(event.target.value)} value={roomCode}></input>
              {error ? (
                <p claseName='text-sm text-center' role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                 Invalid code
                </p>
              ) : <div className='h-1'/>}
              <button className=' text-3xl font-bold  bg-yellow-200 text-center rounded-full h-16'
              onClick={validateRoomCode}>join</button>
            </div>
            <h3 className='text-xl font-semibold text-center'>or</h3>
            <button className='bg-yellow-200 text-3xl font-bold  text-center rounded-full h-16'>create</button>
          </div>
        </div>
      </div>
  )
}



export default Homepage