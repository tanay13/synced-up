const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/synced-up', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("DATABASE CONNECTED")
    })
    .catch((err)=>{
        console.err(err)
    })




