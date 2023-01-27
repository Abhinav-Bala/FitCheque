const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors")
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();
const { createRoom, joinRoom, ready} = require('./methods');
const { readSync } = require('fs');
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//follow this to fix no module found error https://www.freecodecamp.org/news/error-cannot-find-module-node-npm-error-solved/

//retrieved from https://socket.io/get-started/private-messaging-part-2/
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      console.log("user already exists: " + userID)
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  // create new session
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  socket.join(socket.userID);
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.on("join", (payload) => {

    console.log("tried joining room: " + payload.code)
    const {error, currRoom}  = joinRoom({uid: socket.sessionID, username:socket.username, code: payload.code})
    if(error){
      return socket.emit("error", {message: error})
    }
    socket.join(currRoom.code)
    console.log(currRoom)
    io.to(currRoom.code).emit("update-state", {room: currRoom})

  });

  socket.on("startGame", (payload) => {
    currRoom = payload.room
    currRoom.state = "game"
    io.to(currRoom.code).emit("update-state", {room: currRoom})

  })

  socket.on("checkedOut", (payload) => {
    payload.guess

    io.to(currRoom.code).emit("update-state", {room: currRoom})

  })

  socket.on("create", () => {
    
    console.log("tried to create room")
    const currRoom = createRoom({uid: socket.sessionID, username: socket.username})
    currRoom.players[0].isReady=true;
    socket.join(currRoom.code);
    console.log(currRoom)
    socket.emit("update-state", {room: currRoom});
   
  });

  socket.on("ready", (data) => {
    console.log(socket.username + " is ready")
    currRoom = ready({room: data.room, uid: socket.sessionID})
    io.to(currRoom.code).emit("update-state", {room: currRoom})
  })

  socket.on("disconnect", async () => {
  const matchingSockets = await io.in(socket.userID).fetchSockets();
  const isDisconnected = matchingSockets.size === 0;
  if (isDisconnected) {
    // notify other users
    socket.broadcast.emit("user disconnected", socket.userID);
    // update the connection status of the session
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID,
      username: socket.username,
      connected: false,
    });
  }
  });

})

server.listen(3001, () => {
  console.log("Hey");
})



