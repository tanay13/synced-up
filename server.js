const express = require('express')
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const app = express();
let server = http.createServer(app);
let io = socketIO(server);
const port = process.env.PORT || 3000

app.set("view engine","ejs");
//path.join() method joins the specified path segments into one path
const publicPath = path.join(__dirname,"/public")
//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(publicPath));

app.set("view engine","ejs");


app.get('/',(req,res)=>{
    res.render("index")
    
})

io.on('connection',(socket)=>{
    console.log("Connected successfully");

    socket.on('toggle',(classname)=>{
        io.emit('change',{
            className:classname.nameofclass,
            user:classname.user
        })
    })
    socket.on('sync',(time)=>{
        io.emit('synctime',{
            syncTime:time.currTime
        })
    })

    socket.on('newUser',(user)=>{
        socket.broadcast.emit('newMsg',{
            from:"Admin",
            text:user.user+" joined"
        })
    })

    socket.on('createmsg',(msg)=>{
        io.emit('newMsg',{
            from:msg.from,
            text:msg.text
        })
            
    })
})





server.listen(port,()=>{
    console.log("Server running");
})