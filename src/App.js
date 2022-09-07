import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import SingleHostel from "./pages/singleHostel/SingleHostel";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  hostelInputs, userInputs } from "./formSource";
import { roomColumns, hotelColumns, hostelColumns, userColumns } from "./datatablesource";
import  NewHotel  from "./pages/hotel/NewHotel";
import  NewHostel  from "./pages/hostel/NewHostel";
import  NewRoom  from "./pages/newRoom/NewRoom";


function App() {
  

  return (
    <div className="darkMode">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List columns={userColumns}/>} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="hotels">
              <Route index element={<List columns={hotelColumns}/>} />
              <Route path=":hotelId" element={<SingleHotel />} />
              <Route
                path="new"
                element={<NewHotel />}
              />
            </Route>
            <Route path="hostels">
              <Route index element={<List columns={hostelColumns}/>} />
              <Route path=":hostelId" element={<SingleHostel />} />
              <Route
                path="new"
                element={<NewHostel inputs={hostelInputs}/>}
              />
            </Route>
            <Route path="rooms">
              <Route index element={<List columns={roomColumns}/>} />
              <Route path=":roomsId" element={<Single />} />
              <Route
                path="new"
                element={<NewRoom />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
