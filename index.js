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

app.get('/api/product/:id',async (req,res)=>{

    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
        catch(error){
            res.status(500).json({
                message:error.message
            })

        }
})

app.put('/api/product/:id',async (req,res)=>{
    try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body)

    if(!product){
        return res.status(404).json({message: "Product not found"})
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
})

app.delete('/api/product/:id',async (req,res)=>{
    try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)

    if(!product){
        return res.status(404).json({message: "Product not found"})
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json({message:"Product deleted Sucessfully"});
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
})

