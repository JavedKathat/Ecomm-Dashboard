import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      await getProducts();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    }
    else {
        getProducts();
    }
  };
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="searchInput"
        type="text"
        placeholder="Search"
        onChange={searchHandle}
      />
      <ul className="titles">
        <li>Sr. No.</li>
        <li>Name</li>
        <li>Company</li>
        <li>Price</li>
        <li>Category</li>
        <li>Action</li>
      </ul>
      {products.length>0 ? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.company}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
            <button className="deleteBtn" onClick={() => deleteProduct(item._id)}><FontAwesomeIcon icon={faTrash} /></button>
            <button className="updateBtn">
              <Link to={`/update/${item._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
            </button>
          </li>
        </ul>
        ))
        : <h5 style={{color:'red', fontWeight:'400', fontSize:'18px'}}>!Product Not Found</h5>
      }
    </div>
  );
};

export default ProductList;
