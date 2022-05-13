const express = require('express');
const app = express();
const path = require('path');
//const ws = require('ws');
const io = require('socket.io');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


const port = process.env.PORT || 3000;


const server = app.listen(port, ()=> console.log(`listening on port ${port}`));

const socketServer = new io.Server(server);

socketServer.on('connection', (socket)=> {
  socket.timer = setInterval(()=> {
    const message = { time: new Date().toLocaleString() };
    socket.emit('time', message);
    if(!socket.connected){
      clearInterval(socket.timer);
    }
  }, 1000);
});

/*
const socketServer = new ws.Server({ server });

let sockets = [];
socketServer.on('connection', (socket)=> {
  sockets.push(socket);
  console.log(sockets.length);
  socket.interval = setInterval(()=> {
    const message = { time: new Date().toLocaleString()}; 
    socket.send(JSON.stringify(message));
  }, 1000);
  socket.on('close', ()=> {
    sockets = sockets.filter(s => s !== socket);
    clearInterval(socket.interval);
  });
});
*/
