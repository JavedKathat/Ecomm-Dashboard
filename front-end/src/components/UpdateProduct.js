import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    // const [error, setError] = useState(false);

    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
      getProduct();
    });

    const getProduct=async ()=> {
      console.log(params);
      let result = await fetch(`http://localhost:5000/product/${params.id}`);
      result = await result.json();
      setName(result.name);
      setCompany(result.company);
      setPrice(result.price);
      setCategory(result.category);
    }

    const updateProduct =async () => {
        console.log({name, company, price, category});
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
          method: "PUT",
          body: JSON.stringify({name, company, price, category}),
          headers:{
            'Content-Type': 'application/json',
          }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    };

  return (
    <>
        <div className="product">
      
      <h1>Update Product</h1>
      <div className="productContainer">
        <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e)=>{setName(e.target.value)}} value={name} />
          {/* {error && !name && <span className="invalid-input">Please Enter valid name</span>} */}
        <input className="inputBox" type="text" placeholder="Enter Company Name" onChange={(e)=> {setCompany(e.target.value)}} value={company}/>
          {/* {error && !company && <span className="invalid-input">Please Enter valid company</span>} */}
        <input className="inputBox" type="number" placeholder="Enter Product Price" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
          {/* {error && !price && <span className="invalid-input">Please Enter valid price</span>} */}
        <input className="inputBox" type="text" placeholder="Enter Product Category" onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
        <button className="btnSubmit mt20" type="submit" onClick={updateProduct}>Update </button>
      </div>
    </div>
    </>
  )
}

export default UpdateProduct