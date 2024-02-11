const express = require('express');
const cors = require('cors');
require('./db/config');
const User= require('./db/User');
const  Product = require('./db/Product');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async(req,res)=> {
    const user= new User(req.body);
    let result= await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post('/login', async(req,res)=> {
    if(req.body.password && req.body.email) {
        const user= await User.findOne(req.body).select("-__v -password");
        user?res.send(user):res.send({"Result": "User not found"});
    }
    else {
        res.send({"Result": "Please enter Email or Password!"});
    }
    
});

app.post("/add-product",async (req,res)=> {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get('/products', async (req,res)=>{
    let products = await Product.find(); 
    if(products.length>0) {
        res.send(products);
    }else {
        res.send({"Result": "Product not found"});
    }
});

app.delete('/product/:id', async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
});

app.put('/product/:id', async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body,
        }
    )
    res.send(result);
})

app.get('/product/:id', async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result) {
        res.send(result);
    }else {
        res.send("Product not found");
    }
});

app.get('/search/:key', async (req,res)=>{
    const result = await Product.find({
        "$or" :[
            {name:{$regex: req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
        ]
    });
    res.send(result);
});

app.listen(5000);