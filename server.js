const express = require('express')
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

//path.join() method joins the specified path segments into one path
const publicPath = path.join(__dirname,"/public")
//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(publicPath));


io.on('connection',(socket)=>{
    console.log("Connected successfully");

    socket.on('toggle',(classname)=>{
        io.emit('change',{
            className:classname.nameofclass,
            user:classname.user
        })
    })
})




server.listen(3000,()=>{
    console.log("Server running");
})