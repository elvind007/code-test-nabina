import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Import your CSS file

const url=process.env.REACT_APP_BACKEND_URL;

const Start = () => {
const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios.get(url`/verify`)
      .then(result => {
        if(result.data.Status) {
          if(result.data.role === "ADMIN") {
            navigate('/dashboard');
          } else if(result.data.role === "HR") {
            navigate('/HRdash/'+result.data.id);
          } else if(result.data.role === "EMPLOYEE") {
            navigate('/Empdash/'+result.data.id);
          }
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="loginPage">
      <div className="container">
        <div className="content">
          <div className="box">
            <h2 className="text-center">View List Updation</h2>
            <div className="text-center mt-3">
              <button type="button" className="btn btn-primary px-5 py-3" onClick={() => navigate('/viewlist')}>
                View Here
              </button>
            </div>
          </div>
          <div className="box">
            <h2 className="text-center">Login to Access your Dashboard</h2>
            <div className="text-center mt-3">
              <button type="button" className="btn btn-success px-5 py-3" onClick={() => navigate('/adminlogin')}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
