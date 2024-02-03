import React, { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);
    const addProduct =async ()=> {
        if(!name|| !company|| !price|| !category){
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result= await fetch('http://localhost:5000/add-product',{
            method: 'POST',
            body: JSON.stringify({name, company, price, category, userId}),
            headers: {'Content-Type': 'application/JSON'},
        });
        result = await result.json();
        console.log(result);
    }
  return (
    <>
      <div className="product">
        
        <h1>AddProduct</h1>
        <div className="productContainer">
          <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e)=>{setName(e.target.value)}} value={name} />
            {error && !name && <span className="invalid-input">Please Enter valid name</span>}
          <input className="inputBox" type="text" placeholder="Enter Company Name" onChange={(e)=> {setCompany(e.target.value)}} value={company}/>
            {error && !company && <span className="invalid-input">Please Enter valid company</span>}
          <input className="inputBox" type="number" placeholder="Enter Product Price" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
            {error && !price && <span className="invalid-input">Please Enter valid price</span>}
          <input className="inputBox" type="text" placeholder="Enter Product Category" onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
            {error && !category && <span className="invalid-input">Please Enter valid category</span>}
          <button className="btnSubmit mt20" type="submit" onClick={addProduct}>Add </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
