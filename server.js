const express = require('express')
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.set("view engine","ejs");
//path.join() method joins the specified path segments into one path
const publicPath = path.join(__dirname,"/public")
//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(publicPath));

app.set("view engine","ejs");


app.get('/',(req,res)=>{
    res.render("index")
    io.on('connection',(socket)=>{
        console.log("Connected successfully");
    
        socket.on('toggle',(classname)=>{
            io.emit('change',{
                className:classname.nameofclass,
                user:classname.user
            })
        })
    })
})





server.listen(3000,()=>{
    console.log("Server running");
})