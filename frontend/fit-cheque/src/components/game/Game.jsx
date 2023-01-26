import React from 'react'
import { useState } from 'react'
import Leaderboard from './Leaderboard';
import receipt from "/assets/receipt.jpg"
import { jackets_women, jackets_men} from '../../jackets';

export const isHost = true;

var time = 10;

const roomCode = "1234 5678";
const round = 1;
const cost = 90000;

const newFit = () => {
    var arr = null;
    var coin = Math.floor(Math.random() * (2) + 0);
    console.log(coin);

    if (coin){
        arr = jackets_men;
    }
    else{
        arr = jackets_women;
    }

    var max = arr.length;
    var new_index = Math.floor(Math.random()*(max))
    var newLink = arr[new_index].Image;
    var newPrice = arr[new_index].Price;
    console.log(newPrice);
    const fit = {link: newLink, price: newPrice};
    console.log(fit.link);
    return fit;
}

const fit = newFit();

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
  height: '100vh',
  backgroundImage: `url(${receipt})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundOpacity: '0.5',
  center: true,
};

const mascot = {
    width: '40vw',
    height: '50vw',
    objectFit: 'scale-down'
}

const barcode = {
    width: '20vw',
    height: '6vw',
    opacity: '0.7'
}

const box = {
    width: '35vw',
    height: '50vw'
}

const getTotal = (arr) =>{

    let sum = 0;

    for (let i=0; i < arr.length; i++){
        sum = sum + arr[i].total;
    }

    return sum;
}

const countdown = (x) => {
    x = x-1;
}

const Game = ({socket, gameData}) => {
  
    const players = [
    {user: "Alice", checkedOut: -2, guess: 100, total: 5000, host: true},
    {user: "Bob", checkedOut: -2, guess: 200, total: 5000},
    {user: "player3kk", checkedOut: -1, guess: 300, total: 5000},
    {user: "player4", checkedOut: -2, guess: 400, total: 5000},
    {user: "player5", checkedOut: -2, guess: 500, total: 5000},
    {user: "player6", checkedOut: -1, guess: 600, total: 5000},
    {user: "player7", checkedOut: -1, guess: 700, total: 5000},
    {user: "player8", checkedOut: -2, guess: 800, total: 5000},
    {user: "player9", checkedOut: -2, guess: 900, total: 5000},
    {user: "player10", checkedOut: -2, guess: 1000, total: 5000},
  ];
  
    const roundOver = false;
    const [rover, setRover] = useState(roundOver);

    const [gamers, setGamers] = useState(players);

    const newGamers = (arr) => {
      setGamers(arr);
    };

    const difference = null;

    const [diff, setDiff] = useState(difference);

    const checkOut = () => {
        var input = document.getElementById("guess").value;
        var guess = parseInt(input);
        console.log(guess, typeof(guess));

        if (!(guess)){
            alert("Please enter a valid number.");
            return;
        }

        input = Math.floor(input);
        setDiff(Math.abs(fit.price - input));

        const btn = document.getElementById("checkout");
        const btnText = document.getElementById("checkout text")
        setRover(true);

        document.getElementById("guess").disabled = true;
        btn.disabled = true;
        btn.style.backgroundColor= 'black';
        return input;
    };

    return (
    <div> 
        <div className='bg-white max-h-screen'>
                <div className='absolute flex flex-col-reverse'>
                    <div className="justify-center items-center" style={list_bg}>
                        <div className='h-full bg-white bg-opacity-50'>


                        <div className='text-center py-1 text-lobbyCode'>
                            FIT CHEQUE
                        </div>
                        <div className='py-1 text-heading text-center'>
                            LEADERBOARD
                        </div>
                        <hr className="m-auto text-black border-black border-2 w-3/5"></hr>
                        <div className="mt-3 text-userList px-1 grid gap-0 font-extralight text-justify">
                            {gamers.map((player) => {
                                return <Leaderboard user={player.user} info={player.checkedOut} host={player.host}/>
                            })}
                        </div>
                        <div className="py-2">
                        </div>
                        <hr className=" m-auto text-black border-black border-1"></hr>

                        <div className= "px-3 text-heading pt-3 text-left grid grid-cols-1 grid-flow-col-dense justify-center items-center">
                            <div >
                            SUBTOTAL  
                            </div>
                            <div className='pr-3'>
                                ${getTotal(players)}
                            </div>
                        </div>
                        
                        <img className='m-auto pt-2' src="/assets/barcode.png" alt="" style={barcode} />


                        <div className='py-0 text-center text-gray-500'>
                            <div>
                                THANKS FOR SHOPPING WITH US!
                            </div>
                            <div>
                                MADE BY ABHINAV AND SUMEDH
                            </div>
                            <div>
                                DESIGNED BY LILLIAN
                            </div>
                            <div>
                                ALL IMAGES RETREIVED FROM SSENSE
                            </div>
                            <div>
                                PLEASE COME AGAIN.
                            </div>
                            
                        </div>
                        
                        </div>

                    </div>
                </div>

                <div className='absolute px-80 pt-12'>
                    <img className="hover:resize pl-48 align-middle" alt="oops" src={fit.link} style ={mascot}></img>
                </div>

                <div className='text-left text-heading fixed text-black top-4 right-8 font-bold'>
                    <h1>ROUND {round}/10</h1>
                    <h1 className='text-right' id='sec'>00:00</h1>
                   
                </div>


                <div className='grid text-heading text-right pt-52 pr-28 space-y-4'>
                   
                   
                   {rover? 
                   
                        <div className='animate-bounce'>

                            <div className='pr-10'>
                                THIS ITEM COSTS...
                            </div>
                            <div className='animate-bounce decoration-violet-800 underline-offset-1 underline text-red-500 pr-32 font-bold'>
                                $ {fit.price}
                            </div>
                        </div>
                   
                   :

                        null
                    
                    }

                    <div className='pt-3 pl-28 text-right space-x-4'>
                        <input type='number' min='0' step='1' className="px-0 py-2 text-center bg-white font-light text-black outline outline-4" id="guess" maxLength={8} placeholder="$ PRICE" autoFocus>
                        </input>      
                    </div>
                   
                    <div className=''>
                           <button id='checkout' className="text-center px-2 py-2 rounded-none bg-gray-500 text-white hover:bg-green-200 focus:text-black focus:animate-pulse active:rounded-none transition duration-150 ease-in-out" onClick={checkOut}>
                            
                            <div id='checkout text'>
                            CHECK OUT
                            </div>
                            
                        </button>
                    </div> 

                    {rover ?

                        <div className='pt-3 pr-2'>
                            YOU WERE OFF BY&#160;

                            <div className='inline-block text-red-500'>
                             ${diff}
                            </div>
                        </div>

                    :

                    null
                    
                    }
                </div>
        </div>
    </div>
    
  );
}

export default Game;