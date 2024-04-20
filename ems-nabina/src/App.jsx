import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import HRdash from './Components/HRdash'
import Empdash from './Components/Empdash'
import EmployeeList from './Components/EmployeeList'
import HRhome from './Components/HRhome'
import Emphome from './Components/Emphome'
import FullList from './Components/FullList'

function App() {
  const adminid=localStorage.getItem("adminid")
  const hrid=localStorage.getItem("hrid")
  const empid=localStorage.getItem("empid")
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/viewlist' element={<FullList />}></Route>


      <Route path='/Empdash' element={
        <PrivateRoute >
          <Empdash empid={empid} />
        </PrivateRoute>        
      }>
        <Route path='' element={<Emphome />}></Route>
        <Route path='/Empdash/EmployeeDetail/:empid' element={<EmployeeDetail />}></Route>
      </Route>
      
      <Route path='/HRdash' element={
        <PrivateRoute >
          <HRdash hrid={hrid} />
        </PrivateRoute>
      }>
      <Route path='' element={<HRhome />}></Route>
        <Route path='/HRdash/employeelist' element={<EmployeeList />}></Route>
        <Route path='/HRdash/category' element={<Category />}></Route>
        <Route path='/HRdash/EmployeeDetail/:hrid' element={<EmployeeDetail />}></Route>
        <Route path='/HRdash/add_category' element={<AddCategory />}></Route>
      </Route>

      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard adminid={adminid} />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/EmployeeDetail/:adminid' element={<EmployeeDetail />}></Route> {/*remove :id */ }
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
