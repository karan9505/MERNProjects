import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Landing from './GENERAL/Landing'
import AdminLogin from './ADMIN/AdminLogin'
import StudentLogin from './STUDENT/StudentLogin'
export default function Routercomponent() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>

        <Route path='/Admin' element={<AdminLogin/>}></Route>
        
        <Route path='/Student' element={<StudentLogin/>}></Route>
      </Routes>
    </div>
  )
}
