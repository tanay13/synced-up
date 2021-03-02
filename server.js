const express = require('express')
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

const youtubeRoute = require('./routes/youtube')
const customRoute = require('./routes/custom')

const port = process.env.PORT || 3000

app.set('socketio', io);

app.set("view engine","ejs");
//path.join() method joins the specified path segments into one path
const publicPath = path.join(__dirname,"/public")
//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(publicPath));

app.set("view engine","ejs");

app.use('/youtube',youtubeRoute)
app.use('/custom',customRoute)
app.get('/',(req,res)=>{
    res.render("landing")
    
})




server.listen(port,()=>{
    console.log("Server running");
})