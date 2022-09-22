import React from "react";
import "./datatable.css"; 
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [list, setList] = useState();
  const {data, loading, error} = useFetch(`https://hostel7booking.herokuapp.com/api/${path}`);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hostel7booking.herokuapp.com/api/${path}/${id}`);
    setList(list.filter((item) => item._id !== id));
    } catch (error) {
      
    }
  };
useEffect(()=>{
  setList(data);
},[data])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton"  onClick={() => navigate(`/properties/${path}/view/${params.row._id}`)}>View</div>
            
            <div className="viewButton"
              onClick={() => navigate(`/properties/${path}/${params.row._id}`)}>
              Update
            </div>
            <div
              className="deleteButton"
             // onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/properties/${path}/new`} className="link">
          Add New {path.substring(0,path.length-1)}
        </Link>
      </div>
      {list && 
       <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
         />
      }
    </div>
  );
};

export default Datatable;
