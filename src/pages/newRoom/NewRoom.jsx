import React from "react";
import "./newRoom.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [propertyId, setPropertyId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [property, setProperty] = useState("hostels");
  const properties = ["hostels", "rentals", "apartments"];

  const { data, loading, error } = useFetch(`https://hostel7booking.herokuapp.com/api/${property}`);
  const handleChange = (e) => {  setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })) };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`https://hostel7booking.herokuapp.com/api/rentalsrooms/${propertyId}`, { ...info, roomNumbers, propertyId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
            <div className="formInput">
                <label>Choose <div className="t">a property type</div></label>
                <select id="property"  onChange={(e) => setProperty(e.target.value)}  >
                  {properties.map((p) => ( <option key={p} value={p}>{p}</option> ))}
                </select>
              </div>

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={(e) => setRooms(e.target.value)} placeholder="give comma between room numbers."/>
              </div>
              <div className="formInput">
                <label>Choose <div className="t">a {property.substring(0,property.length-1)}</div></label>
                <select id="propertyId" onChange={(e) => setPropertyId(e.target.value) } >
                  {loading ? "loading" : data && data.map((property) => (
                        <option key={property._id} value={property._id} >{property.name}</option>))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
