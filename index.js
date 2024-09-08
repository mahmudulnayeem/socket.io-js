const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.join("room1");
  let roomSize = io.sockets.adapter.rooms.get("room1").size;
  io.sockets
    .in("room1")
    .emit("chat", `Hello, room1! There are ${roomSize} people in this room`);

  socket.join("room2");
  io.sockets.in("room2").emit("chat", "Hello, room2!");
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
