const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

const connections = [];
const port = process.env.PORT || 3003;

server.listen(port);

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body);
});

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${connections.length} sockets connected`);
  });

  socket.on("sendCommand", (command) => {
    io.sockets.emit("newCommand", { command })
  })
});

console.log(`AidsServer running on port ${port}`);
