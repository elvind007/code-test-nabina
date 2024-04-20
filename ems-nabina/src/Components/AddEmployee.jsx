import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    lname:"",
    email: "",
    password: "",
    category_id: "",
    role:"",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("https://code-test-nabina-production.up.railway.app/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(JSON.stringify(result.data.Error));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('lname', employee.lname);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('category_id', employee.category_id);
    formData.append('role', employee.role);
    formData.append('image', employee.image);

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/add_employee`, formData)
    .then(result => {
        if(result.data.Status) {            
            navigate('/dashboard/employee')
        } else {
            alert(JSON.stringify(result.data.Error))
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"              
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              required // Add required attribute
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputLName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLName"
              onChange={(e) =>
                setEmployee({ ...employee, lname: e.target.value })
              }
              required // Add required attribute
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              required // Add required attribute
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
              required // Add required attribute
            />          
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Department
            </label>
            <select name="category"  id="category" className="form-select"
             onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
             required // Add required attribute
            >
              <option value="">Select Department</option> 
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
               ))}
            </select>              
          </div>
          <div className="col-12">
            <label htmlFor="role" className="form-label">Role</label>
            <select name="role" id="role" className="form-select"
                onChange={(e) => setEmployee({...employee, role: e.target.value})}
                required // Add required attribute
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="HR">HR</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
              required // Add required attribute
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
