import React from "react";
import "./list.css"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = ({columns}) => {
  return (
    <div className="list">
      <div className="listContainer">
        <Navbar/>
        <Datatable columns={columns}/>
      </div>
    </div>
  )
}

export default List