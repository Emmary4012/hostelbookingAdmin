import React from 'react'
import "./login.css";
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const navigate = useNavigate;
    const handleChange = (e) => { setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))};
    const handleClick = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("https://hostel7booking.herokuapp.com/api/auth/login", JSON.stringify(credentials));
            if(res.data.isAdmin){
              res.status(200).JSON(credentials);
              navigate("/");
            }
            
        } catch (error) {
            console.log("Login failed");
        }
    }

  return (
    <div className = "login">
        <div className = "lContainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" /> 
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
            <div className="buttons">
                <button className='lButton'  onClick={handleClick}>Login</button> 
                <span className='sButton'>OR</span>
                <button className='lButton'>
                    <Link to="/register" style={{color:"inherit", textDecoration: "none"}}>
                        <span >Register</span>
                    </Link>
                </button> 
            </div> 
            {/* {err && <span>{err.message}</span>} */}
        </div>
    </div>
  )
}

export default Login;