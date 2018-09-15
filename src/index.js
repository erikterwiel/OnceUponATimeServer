const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

const connections = [];

server.listen(process.env.PORT || 5000);

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`);

  io.sockets.emit("message", { message: "new connection !!!!" });

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${connections.length} sockets connected`);
  });

  socket.on("sendCommand", (command) => {
    io.sockets.emit("newCommand", { command })
  })
});

console.log("AidsServer running on port 5000");
