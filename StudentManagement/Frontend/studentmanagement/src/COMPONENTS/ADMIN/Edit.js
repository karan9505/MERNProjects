import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
export default function Edit(props) {

  const [result, setResult] = useState({});
  const [finalResult, setFinalRes] = useState({});
  const [studentData, setStudentdat] = useState({});
  const getSpecificStudent = () => {
    axios.post('http://localhost:8000/Admin/ViewStudent', { studentId: props.studentId })
      .then((response) => {
        setStudentdat(response.data)
        setResult(response.data.result)
        setFinalRes(response.data.result.finalResult)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    getSpecificStudent();
  }, [])

  const Back = (e) => {
    props.BackFunction('b');
  }
  return (
    <div>
      {
        console.log("MY RESULT : ",result)
      }
      <div className='viewBackMain'>
        <div className='detailsBack1'>
          <img src='../IMAGES/Close.png' alt="Not" className='closeImg' onClick={(e)=>{Back(e)}}></img>
          <h1 id="welshead1">Student's Data Edit</h1>
          <div id="EditNameDiv">
            <p id="enamehead">NAME</p>
            <div>
              <label htmlFor='efn'>First Name : </label>
              <input type='text' id="efn" placeholder='Firstname...' value={studentData.firstName} onChange={(e)=>{setStudentdat({...studentData,firstName:e.target.value})}}></input>
            </div>
            <div>
              <label htmlFor='eln'>Last Name : </label>
              <input type='text' id="eln" placeholder='Lastname...' value={studentData.lastName} onChange={(e) => { setStudentdat({ ...studentData, lastName: e.target.value })}}></input>
            </div> 
          </div>
          <div id="marksDiv">
            <p id="emarkshead">MARKS</p>
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
                  <div className="marksDiv" id="md1">
                    <label htmlFor='mmarks'>Enter marks :</label>
                    <input type='number' id="mmarks" className='marksInp' value={result.maths} onChange={(e) => {setResult({ ...result, maths:e.target.value})}}></input>
                  </div>  
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Physics</td>
                <td>
                  <div className="marksDiv" id="md2">
                    <label htmlFor='mmarks'>Enter marks :</label>
                    <input type='number' id="mmarks" className='marksInp' onChange={(e) => { setResult({ ...result, physics: e.target.value }) }}></input>
                  </div>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Chemistry</td>
                <td>
                  <div className="marksDiv" id="md3">
                    <label htmlFor='mmarks'>Enter marks :</label>
                    <input type='number' id="mmarks" className='marksInp'></input>
                  </div>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>Computer</td>
                <td>
                  <div className="marksDiv" id="md4">
                    <label htmlFor='mmarks'>Enter marks :</label>
                    <input type='number' id="mmarks" className='marksInp'></input>
                  </div>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>English</td>
                <td>
                  <div className="marksDiv" id="md5">
                    <label htmlFor='mmarks'>Enter marks :</label>
                    <input type='number' id="mmarks" className='marksInp'></input>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div id="editExtraDetails">
            <p id="enamehead">OTHERS</p>
            <div>
              <label htmlFor='editnc'>CLASS : </label>
              <input type='number' placeholder='Class' id="editnc"></input>
            </div>
            <div>
              <label htmlFor='editns'>SECTION : </label>
              <input type='number' placeholder='Class' id="editns"></input>
            </div>
            <div>
              <label htmlFor='editnr'>ROLL No. : </label>
              <input type='number' placeholder='Class' id="editnr"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
