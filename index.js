const express = require('express');
const Product = require('./models/product.model')
const mongoose = require('mongoose')

const app = express();
app.use(express.json())

mongoose.connect("mongodb+srv://dileepkumar:Hbn8TFLsX0JIUkJt@cluster0.gzzo1.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to Database")
    app.listen(5000,()=>{
        console.log("Server is running...")
    });
    
})
.catch(()=>{
    console.log("connection failed")
})


app.get("/api/products" , async (req , res)=>{
    try {
      const products =   await Product.find({})
      res.status(200).json(products)
    } catch (error) {
     res.status(500).json({message: error.message})
    }
 })

 app.get("/api/product/:id" , async (req , res)=>{
    try {
        const {id} = req.params;
      const product =   await Product.findById(id)
      res.status(200).json(product)
    } catch (error) {
     res.status(500).json({message: error.message})
    }
 })

app.post("/api/products" , async (req , res)=>{
    try {
     const product = await Product.create(req.body);
     res.status(200).json(product)
     
    } catch (error) {
     res.status(500).json({message: error.message})
    }
 })


 app.put("/api/product/:id" , async (req , res)=>{
    try {
    const {id} = req.params;
      const product =   await Product.findByIdAndUpdate(id,req.body)
      if(!product){
        return res.status(404).json({message:"Product Not Found"})
      }
    const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })

app.delete("/api/product/:id" ,async (req ,res)=>{
    try {
          const {id} = req.params;
          const product = await Product.findByIdAndDelete(id)
          if(!product){
            return res.status(404).json({message:"Product Not Found"})
          }

          res.status(200).json({message:"Product deleted successfully"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})