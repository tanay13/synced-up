
module.exports = function(app,io,publicPath)
{
    const router = require('express').Router()
    
    const fs = require('fs')



    app.get('/custom',(req,res)=>{
        const dir = publicPath+"/uploads";
        const files = fs.readdirSync(dir)
        var fileName = []
        for (const file of files) {
        fileName.push(file)
        }
        res.render("index",{fileName})
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




