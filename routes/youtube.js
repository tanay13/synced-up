// const router = require('express').Router()
// const http = require("http");
// const socketIO = require("socket.io");
// let server = http.createServer(router);
// let io = socketIO(server);

module.exports = function (app, io) {
  const router = require('express').Router();
  app.get('/youtube/:roomid', (req, res) => {
    res.render('youtube');
  });

  io.on('connection', (socket) => {
    socket.on('join room', (room) => {
      socket.join(room.roomId);
      socket.on('play other', (e) => {
        socket.broadcast.to(room.roomId).emit('just play');
      });
      socket.on('pause other', (e) => {
        socket.broadcast.to(room.roomId).emit('just pause');
      });

      socket.on('sync', (event) => {
        io.to(room.roomId).emit('time', {
          time: event.videoDur,
        });
      });
    });
  });
  return router;
};
