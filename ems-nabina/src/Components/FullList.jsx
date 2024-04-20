import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FullList = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = () => {
    axios
      .get(`https://code-test-nabina-production.up.railway.app/auth/employee`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRefreshClick = () => {
    fetchEmployeeList();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Employee List</h3>
          <button type="button" className="btn btn-primary px-5 py-3" onClick={handleRefreshClick}>
                Refresh List
              </button>
        <button type="button" className="btn btn-primary px-5 py-3"  onClick={() => navigate('/')}>
                Main Menu
              </button>   
      </div>
      
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Image</th>
              <th>Email</th>              
            </tr>
          </thead>
          <tbody>
            {employee.map((e, index) => (
              <tr key={index}>
                <td>{e.name}</td>
                <td>{e.lname}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/Images/` + e.image}
                    className="employee_image"
                    alt={`${e.name}'s Image`}
                  />
                </td>
                <td>{e.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullList;
