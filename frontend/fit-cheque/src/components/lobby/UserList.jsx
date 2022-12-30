import React from 'react'
import { useState } from 'react';
import Lobby, { isHost} from './Lobby';


const UserList = ({user, isReady, host, i, gamers, setGamers}) => {

    const remove = (index) => {
        let a = gamers.slice(0, index);
        let b = a.concat(gamers.slice(index+1))
        setGamers(b);
    };

       return(
           <div className= "font-normal pt-2 text-left grid grid-cols-1 grid-flow-col-dense justify-center items-center">
              
               {host ? 

                   <div className='underline ml-4'>
                       [{user}]:
                   </div>
               
               :   

                   <div className='ml-4'>
                       [{user}]:
                   </div>
                   
               }
           
               {isReady? 
           
                   <div className='text-right'>READY</div>

               :  
               
                   <div className='px-2 bg-gray-400 text-white'>NOT READY</div>
               }

               {isHost & host ? 
               
               <div className='pl-10 flex col-span-6'>
                       <div className='pr-1 text-black'>
                       <span className='px-1 max-w-sm text-center material-symbols-outlined'>
                          browse_activity
                       </span>
                       </div>
                     </div> : null}

               {isHost & i!=0 ? 
                  
                   <div className='pl-6 flex col-span-6'>
                       <button className='px-2 text-black hover:bg-black hover:text-white active:bg-red-400 transition duration-150 ease-in-out' onClick={()=>remove(i)}>
                       <p className='max-w-sm text-right'>
                           X
                       </p>
                       </button>
                     </div> 

                    : 
            
                    null
                }
           </div> 
       );   
     }             

export default UserList;