import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }else{
            navigate('/login');
        }
    },[]);

    const handleLogin= async()=> {
        console.log(email, password);
        let result = await fetch(`http://localhost:5000/login`,{
            method : 'post',
            body : JSON.stringify({email, password}),
            headers : {'Content-Type': 'application/json'},
        });
        result = await result.json();
        console.log(result);
        if(result._id) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        }else{
            alert("Please enter correct details");
        }
    }

    return (
        <>
            <div className="login">
                <input className="inputBox" type="email"
                onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email" value={email} />
                
                <input className="inputBox" type="password"
                onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Your Password"/>

                <button className="btnSubmit" type="submit" onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default Login;