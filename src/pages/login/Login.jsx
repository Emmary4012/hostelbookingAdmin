import React from 'react'
import "./login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

const Login = ({credentials, handleChange}) => {
    
    const navigate = useNavigate(); 
    const handleClick = async (e) => {
        e.preventDefault();
        try {   
            await axios.post("https://hostel7booking.herokuapp.com/api/auth/login", 
            {username: credentials.username, password: credentials.password});
            navigate("/")
        } catch (error) {
            console.log("Sorry, login failed. Please, try again.");
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
        </div>
    </div>
  )
}

export default Login;
