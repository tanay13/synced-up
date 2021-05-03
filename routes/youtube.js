// const router = require('express').Router()
// const http = require("http");
// const socketIO = require("socket.io");
// let server = http.createServer(router);
// let io = socketIO(server);

module.exports = function (app, io) {
  const router = require('express').Router();
  app.get('/youtube', (req, res) => {
    res.render('youtube');
  });

  io.on('connection', (socket) => {
    socket.on('play other', (e) => {
      socket.broadcast.emit('just play');
    });
    socket.on('pause other', (e) => {
      socket.broadcast.emit('just pause');
    });

    socket.on('sync', (event) => {
      io.emit('time', {
        time: event.videoDur,
      });
    });
  });
  return router;
};
