
module.exports = function(app,io,publicPath)
{
    const router = require('express').Router()
    const Video = require('../models/Video')

    app.get('/custom',async(req,res)=>{
        
        Video.find({},function(err,foundvideo){
            if (err) return console.err(err);
            console.log(foundvideo)
            res.render("index",{foundvideo})
        })

        
    })
 
    io.on('connection',(socket)=>{
        console.log("Connected successfully");
    
        socket.on('toggle',(classname)=>{
            io.emit('change',{
                className:classname.nameofclass,
                user:classname.user
            })
        })

        socket.on('videoChange',(file)=>{
            io.emit('changeVideo',{
                fileName : file.fileName
            })
        })
    
        socket.on('yevent',(e)=>{
            io.emit('change',{
                event : e
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
    return router;
    
}




