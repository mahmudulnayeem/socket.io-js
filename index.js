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
  socket.on("chat", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
