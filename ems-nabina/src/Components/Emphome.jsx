import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Emphome = () => {
  const [admins, setAdmins] = useState([])
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get(`https://code-test-nabina-production.up.railway.app/auth/admin_records`)
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }



  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Welcome </h4>          
        </div> 
        </div>        
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
               <th>Name</th> 
              <th>Email</th>              
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr>
                    <td>{a.name}</td>                    
                  <td>{a.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Emphome