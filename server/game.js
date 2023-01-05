class Player {
    constructor(obj){
        this.username = obj.username;
        this.isReady = false;
        this.uid = obj.uid;
        this.score = 0;
        this.guess = [];
        this.checkedOut = false;
    }
}


class Room {
    constructor(obj){
        this.host = obj.uid; // userID
        this.code = obj.code;
        this.players = [new Player({username: obj.username, uid: obj.uid})]
        this.state = "lobby";
        this.rounds = [];
        this.currentRound = 0;
    }
}

module.exports = {
    Player,
    Room
  };
