import React from 'react'
import { useState } from 'react';
import '../index.css';
import createId from '../utils/roomCodeGenerator';
import {Link} from 'react-router-dom';


const Homepage = () => {
  const [roomCode, setRoomCode] = useState('')

  const validateRoomCode = (roomCode) => {
    if(roomCode === ''){
      console.log('wrong')
    } else {
      return roomCode
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
              <input className='text-center homepage-btn' placeholder='enter game code' onChange={event => setRoomCode(event.target.value)}></input>
              <Link to={`/play?room=${validateRoomCode(roomCode)}`} className='bg-yellow-200 homepage-btn text-center'>
              <button >join</button>
              </Link>   
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