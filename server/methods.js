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

const joinRoom = (data) => {
    const code = data.code
    const player = data.player
    if(rooms.has(code) == false){
        return {error: "This room does not exist."}
    } else {
        const currRoomFiltered = roomArray.filter(room => room.code = code);
        const currRoom = currRoomFiltered[0];
        if(currRoom.players.length > 10){
            return {error: "This room is full."}
        }
        if(currRoom.state !== "lobby"){
            return {error: "This room's game is in progress."}
        }
        player.name = "player" + (currRoom.players.length + 1);
        currRoom.players.push(player);
        return {currRoom:currRoom};
    }
}

const createRoom = (player) => {
    const newCode = generateCode()
    const newRoom = {code: newCode, players: [], state: "lobby"};
    newRoom.players.push(player)
    rooms.add(newCode)
    roomArray.push(newRoom);
    return newRoom;
}
module.exports = {createRoom, joinRoom, generateCode};
