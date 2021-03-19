const express = require('express')
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const fs = require("fs");
const formidable = require('formidable')
const app = express();
let server = http.createServer(app);
let io = socketIO(server);



const port = process.env.PORT || 3000


app.set("view engine","ejs");
//path.join() method joins the specified path segments into one path
const publicPath = path.join(__dirname,"/public")
//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(publicPath));

const youtubeRoute = require('./routes/youtube')(app,io);
const customRoute = require('./routes/custom')(app,io,publicPath);

app.set("view engine","ejs");

app.use('/youtube',youtubeRoute)
app.use('/custom',customRoute)
app.get('/',(req,res)=>{
    res.render("landing")
    
})

app.post('/', function (req, res){
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file){
      file.path = __dirname + '/public/uploads/' + file.name;
  });

  form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
  });

  res.render('landing');
});




app.get('/local',(req,res)=>{
  res.render('localVideo')
})

app.get('/watch',(req,res)=>{
  res.render('watch')
})



app.get("/video", function (req, res) {
    // Ensure there is a range given for the video
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }
  
    // get video stats (about 61MB)
    const videoPath = req.videoPath||"C:/Users/TANAY RAJ/Downloads/DoorBotV!.mp4";
    const videoSize = fs.statSync(videoPath).size;
  
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);
  });




server.listen(port,()=>{
    console.log("Server running");
})