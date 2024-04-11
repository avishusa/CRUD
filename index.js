const express= require('express');
const app=express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product.model');

dotenv.config();

app.use(express.json())
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
});

app.post('/api/products',async (req,res)=>{

    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }
        catch(error){
            res.status(500).json({
                message:error.message
            })

        }
});

app.get('/api/products',async (req,res)=>{

    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }
        catch(error){
            res.status(500).json({
                message:error.message
            })

        }
})

