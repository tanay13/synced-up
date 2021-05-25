module.exports = function (app, io, publicPath) {
  const router = require('express').Router();
  const Video = require('../models/Video');

  app.get('/custom/:roomid', async (req, res) => {
    Video.find({ createdIn: req.params.roomid }, function (err, foundvideo) {
      if (err) return console.err(err);
      res.render('index', { foundvideo });
    });
  });

  io.on('connection', (socket) => {
    console.log('Connected successfully');
    socket.on('join room', (room) => {
      socket.join(room.roomId);

      socket.on('toggle', (classname) => {
        io.to(room.roomId).emit('change', {
          className: classname.nameofclass,
          user: classname.user,
        });
      });

      socket.on('videoChange', (url) => {
        io.to(room.roomId).emit('changeVideo', {
          fileurl: url.fileUrl,
        });
      });

      socket.on('yevent', (e) => {
        io.to(room.roomId).emit('change', {
          event: e,
        });
      });
      socket.on('sync', (time) => {
        io.to(room.roomId).emit('synctime', {
          syncTime: time.currTime,
        });
      });

      socket.on('newUser', (user) => {
        socket.broadcast.to(room.roomId).emit('newMsg', {
          from: 'Admin',
          text: user.user + ' joined',
        });
      });

      socket.on('createmsg', (msg) => {
        io.to(room.roomId).emit('newMsg', {
          from: msg.from,
          text: msg.text,
        });
      });
    });
  });
  return router;
};
