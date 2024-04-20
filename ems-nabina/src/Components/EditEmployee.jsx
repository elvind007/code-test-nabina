import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState({
        name: "",
        lname:"",
        email: "",
        category_id: "",
        role:"",
      });
      const [category, setCategory] = useState([])
      const [currentRole, setCurrentRole] = useState("");
      const [currentDept, setCurrentDepartment] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const navigate = useNavigate()

      useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/category`)
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/employee/` + id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    lname: result.data.Result[0].lname,
                    email: result.data.Result[0].email,
                    category_id: result.data.Result[0].category_id,
                    role: result.data.Result[0].role,
                })
                const currentRole = result.data.Result[0].role;
                setCurrentRole(currentRole);
                const currentDept = category.find(c=> c.id === result.data.Result[0].category_id);                
                setCurrentDepartment(currentDept ? currentDept.name  : "");
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedEmployee = { ...employee };
        // Add new password to the updated employee object if it's not empty
        if (newPassword) {
            updatedEmployee.password = newPassword;
        }
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/auth/edit_employee/`+id, updatedEmployee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputLName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLName"
              value={(employee.lname)}
              onChange={(e) =>
                setEmployee({ ...employee, lname: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
          <label>Current Department:</label>
              <input type="text" className="form-control" value={currentDept} disabled />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Select New Department:
            </label>
            <select name="category" id="category" className="form-select"            
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
                  <option value="">Select Department</option> 
              {category.map((c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label>Current Access Role:</label>
            <input type="text" className="form-control" value={currentRole} disabled />
            </div>
          <div className="col-12">
            <label for="role" className="form-label">
             New Access Role:
            </label>
            <select name="role" id="role" className="form-select"
                onChange={(e) => setEmployee({...employee, role: e.target.value})}>
              <option value="">Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="HR">HR</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
          </div>                   <div className="col-12">
                        <label htmlFor="inputNewPassword" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputNewPassword"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee