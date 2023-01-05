import React from "react";

const Leaderboard = ({user, info, host}) => {

       return(
           <div className= "font-normal py-2 text-left grid grid-cols-1 grid-flow-col-dense justify-center items-center">
                
                {host ? 

                    <div className='underline ml-4'>
                        [{user}]:
                    </div>
                
                :   

                    <div className='ml-4'>
                        [{user}]:
                    </div>
                    
                }
           

                <div className="pr-4">

                {info == -1 ? 
            
                    <div className='pr-1 text-green-500'>
                        <span className='pr-1 max-w-sm text-center material-symbols-outlined'>
                        done_outline
                        </span>
                    </div>

                :  
                
                    null
                }

                {info == -2? 
           
                    <div className='pr-1 text-gray-500'>
                        <span className='pr-1 max-w-sm text-center material-symbols-outlined'>
                            remove
                        </span>
                    </div>

                :  
                
                    null

                }

                {info >= 0 ?
                
                <div className='pr-1'>
                    <div className='pr-1 max-w-sm text-center'>
                        ${info}
                    </div>
                </div>

                :
            
                    null

                }      

            </div>  

           </div> 
       );   
     }             

export default Leaderboard;