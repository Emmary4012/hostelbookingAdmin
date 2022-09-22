import React from "react";
import "./newProperty.css";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { propertyInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const UpdateProperty = () => {
  const { id} = useParams();
  console.log(id)
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [urls, setUrls] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const {data, loading, error} = useFetch(`https://hostel7booking.herokuapp.com/api/${path}/find/${id}`);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
       e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // if(urls){const URLs = urls.split(",").map((url) => ({ img: url }))}
    
    try {
      if (files){const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/emmanuel1240/image/upload", data);
          const { url } = uploadRes.data;
          return url;
        })
      );
      console.log("Images already on Cloudinary");
    }
    
      const updatedproperty = (JSON.stringify({...info}));
      
      await axios.put(`https://hostel7booking.herokuapp.com/api/${path}`, updatedproperty); console.log("Property Updated");
    } catch (err) {console.log(err)}
  };
  return (
    <div className="new">
      <div className="newContainer">
        <Navbar />
        <div className="top"><h1>Update {data.name} {path.substring(0,path.length-1)}</h1></div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form className="form">
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {propertyInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                Rooms are updated from the rooms page
              </div>
              {/* <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;