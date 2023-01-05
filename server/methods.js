const {Room, Player} = require('./game.js')

const rooms = new Set();
const roomArray = [];

const generateCode = () => {
    var result = '';
    var characters = '012346789';
    var charactersLength = characters.length;
    var length = 8;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const ready = (data) => {
    data.currRoom.players
}

const joinRoom = (data) => {
    if(rooms.has(data.code) == false){
        return {error: "This room does not exist."}
    } else {
        const currRoomFiltered = roomArray.filter(room => room.code = data.code);
        const currRoom = currRoomFiltered[0];
        if(currRoom.players.length > 10){
            return {error: "This room is full."}
        }
        if(currRoom.state !== "lobby"){
            return {error: "This room's game is in progress."}
        }
        player = new Player({username: data.username, uid: data.uid})
        currRoom.players.push(player);
        return {currRoom:currRoom};
    }
}

const createRoom = (player) => {
    const newCode = generateCode()
    
    const newRoom = new Room({code: newCode, uid: player.uid, username: player.username})

    //check if this is the optimal method
    rooms.add(newCode)
    roomArray.push(newRoom);
    return newRoom;
}

module.exports = {createRoom, joinRoom, generateCode};
