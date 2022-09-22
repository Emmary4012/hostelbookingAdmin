import React from "react";
import "./new.css";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
//import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
const New = ({ inputs, title }) => {
  // const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  //const [url, setUrl] = useState([]);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const information = JSON.stringify(info);
    // var data = new FormData();

    // data.append("file", file);
    // data.append("upload_preset", "upload");
    // try {
    // const uploadRes = fetch('https://api.cloudinary.com/v1_1/emmanuel1240/image//upload',
    //   {
    //     method: 'POST',
    //     body: data
    //   }
    // );

    // const data = new FormData();
    // data.append("file", file);
    // data.append("upload_preset", "upload");
    // try {
    //   const uploadRes = await axios.post(
    //     "https://api.cloudinary.com/v1_1/emmanuel1240/image/upload",
    //     data
    //   );

      //const { url } = uploadRes.data;
      //console.log(uploadRes)
      // const newUser = {
      //   ...info,
      //  URLs
      // };
      console.log(information)
      try{
        // const uploadRes = fetch('https://immense-gorge-78562.herokuapp.com/https://hostel7booking.herokuapp.com/api/auth/register',
        //    {
        //      method: 'POST',
        //      body: information
        //    })

      await axios.post("http://localhost:5000/api/auth/register", 
      information);console.log("user created")
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
       <div className="newContainer">
         <Navbar />
         <div className="top">
           <h1>{title}</h1>
         </div>
         <div className="bottom">
           <div className="left">
             <img src={info.img? info.img: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}alt=""/>
           </div>
           <div className="right">
             <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
       </div>
     </div>
   );
 };

 export default New;
