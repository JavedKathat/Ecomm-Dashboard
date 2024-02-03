import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="container">
        <div className="item-1">
          <img className="logo" src='logo512.png' alt="logo" />
          {auth?
        <div className="item-2">
        <ul className="navUl">
          <li className="navLi"><Link to="/"> Product</Link></li>
          <li className="navLi"><Link to="/add">Add Product</Link></li>
          <li className="navLi"><Link to="/update">Update Product</Link></li>
          <li className="navLi"><Link to="/about">About </Link></li>
          <li className="navLi"><Link to="/profile"> Profile</Link></li>
        </ul>
        </div>:<></>
        }
        </div>
        
        <div className="item-3">
          {auth?<>
              <div className="item-4">
                <h3>{JSON.parse(auth).name}</h3>
                <button className="btn-user" id="logout" onClick={logout}>Logout</button>
              </div>
          </>
            :
              <> 
                <button className="btn-user"><Link to="/login">Login</Link></button>
                <button className="btn-user"><Link to="/signup">Signup</Link></button>
              </>
            }
        </div>
      </div>
    </>
  );
};

export default Nav;
