import React from "react";
import { useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  propertyInputs, userInputs } from "./formSource";
import { roomColumns, propertyColumns, userColumns } from "./datatablesource";
import  NewProperty  from "./pages/property/NewProperty";
import  NewRoom  from "./pages/newRoom/NewRoom";
import UpdateProperty from "./pages/property/UpdateProperty";
import Property from "./pages/property/Property";


function App() {

  const [credentials, setCredentials] = useState({username: undefined, 
    email: undefined, fullname: undefined, propertyName: undefined, propertyType: undefined, address: undefined, 
    phone: undefined, price: undefined, months: undefined, 
    message: undefined, modeofpayment: undefined});
  const handleChange = (e) => { setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))};

  const [dates, setDates] = useState([ {startDate: new Date(), endDate: new Date(), key: "selection",},]);
  const [selectedRooms, setSelectedRooms] = useState([]);

    return (
    <div className="darkMode">
      <BrowserRouter>
        <Routes>
          <Route path="/">

            <Route index element={<Home username = {credentials.username}/>} />
            <Route path="login" element={<Login credentials = {credentials} handleChange = {handleChange}/>} />

            <Route path="users">
              <Route index element={<List columns={userColumns}/>} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
            </Route>
           
            <Route path="/properties/:property">
              <Route index element={<List columns={propertyColumns}/>} />
              <Route path="new" element={<NewProperty inputs={propertyInputs}/>} />      
              <Route path="view/:id" element={<Property credentials = {credentials} handleChange = {handleChange} 
                 dates={dates} setDates={setDates} selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms}/>} />
              <Route path=":id" element={<UpdateProperty />} />
            </Route>
            
            <Route path="/property/rooms">
              <Route index element={<List columns={roomColumns}/>} />
              <Route path=":roomsId" element={<Single />} />
              <Route path="new" element={<NewRoom />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
