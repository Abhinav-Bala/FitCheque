import React from 'react'
import { useState } from 'react';
import '../index.css';
import createId from '../utils/roomCodeGenerator';
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
          <img className='m-auto' src={require('../assets/clothing.png')} alt='hero'/>
        </div>
        <div className='basis-3/5 bg-blue-300 flex'>
          <div className='p-24 bg-green-300 m-auto grid-cols-1 flex flex-col space-y-4'>
            <h1 className='text-7xl pb-6'>Fit Cheque</h1>
            <div className='flex flex-col space-y-2'>
              <input className='text-center homepage-btn' placeholder='enter game code' onChange={event => setRoomCode(event.target.value)} value={roomCode}></input>
              {error ? (
                <p claseName='text-sm text-center' role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                  Please make sure you've entered a valid room code
                </p>
              ) : <div className='h-8'/>}
              <button className='bg-yellow-200 homepage-btn text-center'
              onClick={validateRoomCode}>join</button>
            </div>
            <h3 className='text-md font-semibold text-center'>OR</h3>
            <Link className='bg-purple-200 homepage-btn text-center' to={`/play?room=${createId(6)}`}>
              <button className=''>create</button>
            </Link>
           
          </div>
        </div>
      </div>
  )
}



export default Homepage