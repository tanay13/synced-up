if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const fs = require('fs');
const formidable = require('formidable');
const app = express();
let server = http.createServer(app);
let io = socketIO(server);
const Video = require('./models/Video');
var bodyParser = require('body-parser');
const Room = require('./models/Room');

//multer is a middleware used to parse multipart/form-data
const multer = require('multer');

const { storage, cloudinary } = require('./cloudinary');

const upload = multer({ storage });

require('./mongooseConnection');

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

//path.join() method joins the specified path segments into one path
const publicPath = path.join(__dirname, '/public');

//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(publicPath));

// Requiring routes with io param
const youtubeRoute = require('./routes/youtube')(app, io);
const customRoute = require('./routes/custom')(app, io, publicPath);

// setting up view engine
app.set('view engine', 'ejs');

// Main Routing starts

app.use('/youtube', youtubeRoute);

app.use('/custom', customRoute);

app.get('/', (req, res) => {
  res.render('details');
});

app.post('/', async (req, res) => {
  var name = req.body.name;
  Room.findOne({ name: name }, async (err, foundRoom) => {
    if (!foundRoom) {
      const room = new Room();
      room.name = req.body.name;
      await room.save();
      console.log('room saved');
      res.redirect('/landing/' + room._id);
    } else {
      res.redirect('/landing/' + foundRoom._id);
    }
  });
});

app.get('/landing/:roomid', (req, res) => {
  var roomId = req.params.roomid;
  res.render('landing', { roomId });
});

app.post('/landing/:roomid', async (req, res) => {
  new formidable.IncomingForm().parse(req).on('file', function (name, file) {
    cloudinary.uploader.upload(
      file.path,
      { resource_type: 'video', public_id: file.name },
      async (error, result) => {
        const video = new Video();
        video.originalname = result.public_id;
        video.size = result.bytes;
        video.url = result.url;
        video.createdIn = req.params.roomid;
        await video.save();
      }
    );
  });
});

io.on('connection', (socket) => {
  console.log('success');
});

app.get('/local', (req, res) => {
  res.render('localVideo');
});

app.get('/watch', (req, res) => {
  res.render('watch');
});

server.listen(port, () => {
  console.log('Server running');
});
