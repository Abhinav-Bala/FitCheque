import React from 'react'

import { isHost } from './Lobby';

const UserList = ({user, isReady, host}) => {
       return(
           <div className= "pt-2 text-left text-2xl grid grid-cols-1 grid-flow-col-dense items-center">
               
              
               {host ? 

                   <div className='underline ml-4'>
                       [{user}]:
                   </div>
               
               :   

                   <div className='ml-4'>
                       [{user}]:
                   </div>
                   
               }
           

               {isReady ? 
           
                   <div className='text-left pl-50'>READY</div>

               :  
               
                   <div className='px-2 bg-gray-400 text-white text-left pl-50'>NOT READY</div>
               }

               {isHost ? 
                  
                   <div className='pl-10 flex col-span-6'>
                       <a href='#' className='px-2 text-black hover:bg-black hover:text-white active:bg-red-400 transition duration-150 ease-in-out'>
                       <p className='max-w-sm text-right'>
                           X
                       </p>
                       </a>
                     </div> : null}
           </div> 
       );   
     }             


export default UserList;