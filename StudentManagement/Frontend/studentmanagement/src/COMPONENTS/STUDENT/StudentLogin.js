import React, { useEffect, useState } from 'react'
import '../../CSS/StudentLogin.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function StudentLogin() {

  const Navigate = useNavigate();
  const Location = useLocation();

  const [studentData, setStudentdat] = useState({})

  const getSpecificStudent = () => {
    axios.post('http://localhost:8000/Admin/ViewStudent', { semail: "S" })
      .then((response) => {
        console.log("MAIN DATA", response.data);
        setStudentdat(response.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  useEffect(() => {
    getSpecificStudent();
  }, [])

  const [studentImage, setStudentImg] = useState('../IMAGES/Student.png');

  const imageConvert = (e) => {
    const base64Img = new FileReader();
    base64Img.addEventListener('load', () => {
      setStudentImg(base64Img.result);
    })
    if (e.target.files[0] !== undefined)
      base64Img.readAsDataURL(e.target.files[0]);
  }

  const Logout = (e) => {
    Navigate('/');
  }

  return (
    <>
      {

        Object.keys(studentData).length === 0 ?
          <></> :
          <>
            <div className='appMainBack'>
              <h1 className="welcomeHeading">Veracross's<br></br>Student's<br></br>Section...</h1>
              <div className='userDeatilBack'>
                <p id="welcomeP">Welcome<br></br><span>{studentData.firstName + ' ' + studentData.lastName}</span></p>
                <div id="studentImage">
                  <img src={studentImage} id="studentImage1"></img>
                </div>
                <input type='file' id="studentImg" onChange={(e) => { imageConvert(e) }}></input>
                <img src='../IMAGES/Camera.png' id="camera"></img>
                <div className='LogoutDiv' onClick={(e) => { Logout(e) }}>
                  <img src='../IMAGES/LogoutLogo.png' id="LogoutImg"></img>
                  <p>LOG-OUT</p>
                </div>
              </div>
              <div className='studentDataBack'>
                <h1 id="welshead">Student's Details</h1>
                <p id="sname" className='datap'><span>Student Name : </span>{studentData.firstName + ' ' + studentData.lastName}</p>
                <div id="classDetails">
                  <p className='datap'><span>Class : </span>{studentData.class}</p>
                  <p className='datap'><span>Section : </span>{studentData.section}</p>
                  <p className='datap'><span>Roll Number : </span>{studentData.rollNumber}</p>
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
                      <td>
                        {studentData.result.maths + ' - ' + studentData.result.mstatus}
                      </td>
                    </tr>
                    <tr>
                      <td>2.</td>
                      <td>Physics</td>
                      <td>
                        {studentData.result.physics + ' - ' + studentData.result.pstatus}
                      </td>
                    </tr>
                    <tr>
                      <td>3.</td>
                      <td>Chemistry</td>
                      <td>
                        {studentData.result.chemistry + ' - ' + studentData.result.cstatus}
                      </td>
                    </tr>
                    <tr>
                      <td>4.</td>
                      <td>Computer</td>
                      <td>
                        {studentData.result.computer + ' - ' + studentData.result.costatus}
                      </td>
                    </tr>
                    <tr>
                      <td>5.</td>
                      <td>English</td>
                      <td>
                        {studentData.result.english + ' - ' + studentData.result.estatus}
                      </td>
                    </tr>
                  </table>
                </div>
                <div id="resultDiv">
                  <p className='datap'><span>RESULT :- </span></p>
                  <p className='datap'><span>Total : </span>{studentData.result.finalResult.total}</p>
                  <p className='datap'><span>Percentage : </span>{studentData.result.finalResult.percentage}</p>
                  <p className='datap'><span>Status : </span>{studentData.result.finalResult.status}</p>
                </div>
              </div>
            </div>
          </>
      }
    </>

  )
}
