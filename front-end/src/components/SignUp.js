import React, { useState, useEffect} from "react";
const { useNavigate } = require("react-router-dom");

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    },[]);

  const collectData = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    if (result) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
    }
  };

  return (
    <>
      <div className="register">
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
        />
        <input
          className="inputBox"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Email"
        />
        <input
          className="inputBox"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter Password"
        />
        <button type="submit" onClick={collectData} className="btnSubmit">
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignUp;
