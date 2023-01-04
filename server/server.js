const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors")
const { createRoom, joinRoom} = require('./methods');
app.use(cors())


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});


io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  const username = socket.username
  console.log("this user: " + username)
  
  socket.on("join-room", () => {
    console.log("tried to")
    console.log("room code: ")
    console.log("join triggered")

  });

  socket.on("create-room", () => {
    console.log("tried to create room")
    const currRoom = createRoom({id: socket.id, name: username, isReady: false, checkedOut: false, guess: null, total: 0, host: true})
    socket.join(currRoom.code);
    console.log(currRoom)
    socket.emit("lobby", {room: currRoom});
   
  });

})

server.listen(3001, () => {
  console.log("Hey");
})



