import React from "react";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="top"><Link to="/" className="lin"><span className="logo">Hostel Booking Admin</span></Link></div>
      <hr />

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li><DashboardIcon className="icon" /><span>Dashboard</span></li>
          <p className="title">LISTS</p>
          <Link to="/users" className="lin"><li><PersonOutlineIcon className="icon" /><span>Users</span></li></Link>
          <Link to="/hotels" className="lin"><li><StoreIcon className="icon" /><span>Hotels</span></li></Link>
          <Link to="/hostels" className="lin"><li><StoreIcon className="icon" /><span>Hostels</span></li></Link>
          <Link to="/apartments" className="lin"><li><StoreIcon className="icon" /><span>Apartments</span></li></Link>
          <Link to="/rentals" className="lin"><li><StoreIcon className="icon" /><span>Rentals</span></li></Link>
          <Link to="/rooms" className="lin"><li><StoreIcon className="icon" /><span>Rooms</span></li></Link>
        </ul>
      </div>
    </div>
  );

};

export default Sidebar;
