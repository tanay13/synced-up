// const router = require('express').Router()
// const http = require("http");
// const socketIO = require("socket.io");
// let server = http.createServer(router);
// let io = socketIO(server);


module.exports = function(app,io)
{
    const router = require('express').Router()
    app.get('/youtube',(req,res)=>{
        res.render("youtube")
    })
    
    io.on('connection',(socket)=>{
        socket.on('vchange',(event)=>{
            console.log("caught")
            io.emit('videoChange',{
                videoId: event.linkID
            })
        })

        socket.on('yevent',(e)=>{
            socket.broadcast.emit('change',{
                videoState : e.event
            })
        })

        socket.on('sync',(event)=>{
            io.emit('time',{
                time : event.videoDur
            })
        })
    })
    return router;
    
}
