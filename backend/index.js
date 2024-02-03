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


app.listen(5000);