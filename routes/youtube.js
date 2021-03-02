const router = require('express').Router()
const http = require("http");
const socketIO = require("socket.io");
let server = http.createServer(router);
let io = socketIO(server);


router.get('/',(req,res)=>{
    res.render("youtube")
})

io.on('connection',(socket)=>{
    // socket.on('vchange',(event)=>{
    //     console.log("caught")
    //     io.emit('videoChange',{
    //         videoId: event.linkID
    //     })
    // })

    socket.on('testing',(e)=>{
        console.log(e.msg)
    })
})

module.exports = router
