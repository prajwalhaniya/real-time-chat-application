const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

//create the server
const server = http.createServer(app);

//Giving permission (cors policy)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log(`user connected ${socket.id}`);

  //connecting to the exaxt emitted event
  socket.on("joinRoom",(data)=>{
      socket.join(data)
    console.log(`User with id ${socket.id} joined the room ${data}`);
  });

  socket.on("send_message",(data)=>{
    console.log(data);
    socket.to(data.room).emit("recieve_message",data)
  });


  socket.on('disconnect',()=>{
      console.log("user disconnected");
  });

 
});

server.listen(3001, () => {
  console.log("Server is running on the port 3001");
});
