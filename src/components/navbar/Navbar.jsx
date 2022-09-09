import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="top"><Link to="/" className="lin"><span className="logo">Hostel Booking Admin</span></Link></div>
      </div>
    </div>
  );
};

export default Navbar;
