if(process.env.NODE_ENV != "production")
{
  require('dotenv').config();
}

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("DATABASE CONNECTED")
    })
    .catch((err)=>{
        console.err(err)
    })




