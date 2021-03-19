
module.exports = function(app,io)
{
    const router = require('express').Router()

    app.get('/custom',(req,res)=>{
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




