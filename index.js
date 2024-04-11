const express= require('express');
const app=express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("You have sucessfully connected to the database !!")
}).catch(()=>{
    console.log("connection failed !!")
})

const port =1111
app.listen(port,()=>{

    console.log("App is listening on " + port + '....')
})

app.get('/',(req,res)=>{

    res.send("The server is up and running perfectly !!")
})

