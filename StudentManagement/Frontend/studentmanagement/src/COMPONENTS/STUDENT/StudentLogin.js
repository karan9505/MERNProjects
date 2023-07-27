import React from 'react'
import '../../CSS/StudentLogin.css'
import { useLocation } from 'react-router-dom'
export default function StudentLogin(props) {

  const Location=useLocation();
  const studentDetails=Location.state.studentDetails;
  console.log(studentDetails)
  return (
    <div className='appMainBack'>
      <h1>STUDENT LOGIN</h1>
    </div>
  )
}
