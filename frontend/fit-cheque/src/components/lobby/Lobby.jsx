import React from 'react'
import { useState } from 'react'
import receipt from "/assets/receipt.jpg"
import UserList from './UserList';

export const isHost = true;

const roomCode = "1234 5678";

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
  height: '55vh',
  backgroundImage: `url(${receipt})`,
  backgroundPosition: 'auto',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  opacity: '1',
};


const Lobby = () => {
  
  const players = [
    {user: "Alice", isReady: true, host: true},
    {user: "Bob", isReady: true},
    {user: "player3", isReady: false},
    {user: "player4", isReady: true},
    {user: "player5", isReady: true},
    {user: "player6", isReady: false},
    {user: "player7", isReady: false},
    {user: "player8", isReady: true},
    {user: "player9", isReady: true},
    {user: "player10", isReady: true},
  
  ]
  

  const othername = () => {
    var input = document.getElementById("newName").value;
    alert(input);
  };

  return (
    <div> 
      <div className='bg-white font-chivo' style={main_bg}>
  
        <div className='absolute container flex flex-col-reverse items-center px-6 mx-auto mt-10'>

          <div className='flex flex-col mb-32 space-y-2 text-black text-bold'>
            <p className='animate-bounce text-center text-black text-7xl'>
              {roomCode}
            </p>
            <hr className="my-8 text-gray-800 border-2"></hr>
            <p className='text-center text-gray-800 font-bold text-2xl'>
              {players.length}/10
            </p>
            <hr className="my-8 text-gray-800 border-2"></hr>

            <div className="py-1 text-center inline-block space-x-1">
              <input className="px-16 py-3 bg-white text-l text-black outline outline-2" id="newName" maxLength={10} placeholder="CHANGE USERNAME...">
              </input>
              <button className="px-2 pt-0.5 text-2xl text-bold rounded-none bg-black text-white material-symbols-outlined hover:bg-white hover:text-black active:rounded-none transition duration-150 ease-in-out" onClick={othername}>done</button>
            </div>
          <div className='pl-4'>
            <div className='px-2 bg-local bg-center text-center' style={list_bg}>
            <div className='-center px-1 grid gap-1 font-chivo text-justify '>
              {players.map((player) => {
                return <UserList user={player.user} isReady={player.isReady} host={player.host}/>
              })}
              </div>
            </div>
          </div>
            <div className='ml-4 flex justify-center space-x-10 pt-3 pb-0'>
              <a href='#' className='px-4 py-3 text-black bg-gray-200 baseline hover:bg-black hover:text-white active:bg-green-400 focus:outline-white focus:animate-pulse focus:bg-green-400 focus:border-green-700 transition duration-150 ease-in-out'>
                <p className='max-w-3xl text-4xl w-auto h-auto text-center'>
                  READY
                </p>
              </a>
              {isHost ? 
                <a href='#' className='px-4 py-3 bg-black text-white hover:bg-green-100 hover:text-black active:bg-green-600 focus:bg-green-400 focus:border-green-700 transition duration-150 ease-in-out'>
                <p className='max-w-3xl text-4xl text-center'>
                  START GAME
                </p>
              </a>
              :
              null              
            }

            
            </div>
          </div>
        </div>

        <div className='pt-3 pl-3 flex text-black'>
          <a href='#' className='px-10 -left text-black bg-white baseline outline outline-gray-600 hover:bg-gray-400 hover:outline-white hover:text-white active:bg-gray-600 active:text-white focus:bg-gray-600 focus:text-white transition duration-150 ease-in-out'>
            <p className='max-w-sm text-left text-2xl'>
              BACK
            </p>
          </a>
         
        </div> 
        <div className='absolute text-black pt-44 pl-20'>
          <h1>
            [SICK ASS FIT]
          </h1>
          </div>

        <div className='text-right text-black mt-40 mr-24 space-y-4'>
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