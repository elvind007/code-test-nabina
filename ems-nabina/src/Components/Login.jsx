import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '' 
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post('${process.env.REACT_APP_BACKEND_URL}/auth/adminlogin', values)
            .then(result => {
                if(result.data.loginStatus) {
                    localStorage.setItem("valid", true)
                    const userid = result.data.id;
                    localStorage.setItem("userid", userid)
                    console.log(userid)
                    if(result.data.role === "ADMIN") {
                        console.log("admin entering")
                        console.log(userid)     /* TEstting */
                        localStorage.setItem("adminid", userid)
                        navigate('/dashboard', { state: { adminid: userid } })
                    } else if(result.data.role === "HR") {
                        localStorage.setItem("hrid", userid)
                        navigate('/HRdash', { state: { hrid: userid } })
                    } else if(result.data.role === "EMPLOYEE") {
                        localStorage.setItem("empid", userid)
                        navigate('/Empdash', { state: { empid: userid } })
                    }
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                     onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                <div className="text-center">
                <div className='mb-1'>
                    <input
                        type="checkbox"
                        name="tick"
                        id="tick"
                        className='me-2'
                        required
                    />
                    <label htmlFor="password">Agree with terms & conditions</label>
                </div>
</div>
            </form>
        </div>
    </div>
  )
}

export default Login