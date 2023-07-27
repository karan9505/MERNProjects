import React, { useState } from 'react'
import '../../CSS/StudentLogin.css'
import { useLocation, useNavigate } from 'react-router-dom'
export default function StudentLogin(props) {

  const Navigate=useNavigate();
  const Location=useLocation();
  if(Location.state!==null){
    const studentDetails=Location.state.studentDetails;
    console.log(studentDetails)
  }

  const [studentImage,setStudentImg]=useState('../IMAGES/Student.png');

  const imageConvert=(e)=>{
    const base64Img=new FileReader();
    base64Img.addEventListener('load',()=>{
      setStudentImg(base64Img.result);
    })
    if(e.target.files[0]!==undefined)
      base64Img.readAsDataURL(e.target.files[0]);
  }

  const Logout=(e)=>
  {
    Navigate('/');
  }

  return (
    <>
      <div className='appMainBack'>
        <h1 className="welcomeHeading">Veracross's<br></br>Student's<br></br>Section...</h1>
        <div className='userDeatilBack'>
          <p id="welcomeP">Welcome<br></br><span>Karan Khedkar</span></p>
          <div id="studentImage">
            <img src={studentImage} id="studentImage1"></img>
          </div>
          <input type='file' id="studentImg" onChange={(e)=>{imageConvert(e)}}></input>
          <img src='../IMAGES/Camera.png' id="camera"></img>
          <div className='LogoutDiv' onClick={(e)=>{Logout(e)}}>
            <img src='../IMAGES/LogoutLogo.png' id="LogoutImg"></img>
            <p>LOG-OUT</p>
          </div>
        </div>
        <div className='studentDataBack'>
          <h1 id="welshead">Student's Details</h1>
          <p id="sname" className='datap'><span>Student Name :</span> Karan Khedkar</p>
          <div id="classDetails">
            <p className='datap'><span>Class :</span> 12</p>
            <p className='datap'><span>Section :</span> A</p>
            <p className='datap'><span>Roll Number :</span> 30</p>
          </div>
          <div id="marksDiv">
            <table id="marksTable">
              <tr>
                <th>Sr. No</th>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
              <tr>
                <td>1.</td>
                <td>Maths</td>
                <td>c</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Physics</td>
                <td>c</td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Chemistry</td>
                <td>c</td>
              </tr>
              <tr>
                <td>4.</td>
                <td>Computer</td>
                <td>c</td>
              </tr>
              <tr>
                <td>5.</td>
                <td>English</td>
                <td>c</td>
              </tr>
            </table>
          </div>
          <div id="resultDiv">
            <p className='datap'><span>RESULT :- </span></p>
            <p className='datap'><span>Total : </span>100</p>
            <p className='datap'><span>Percentage : </span>100</p>
            <p className='datap'><span>Status : </span>100</p>
          </div>
        </div>
      </div>
    </>
    
  )
}
