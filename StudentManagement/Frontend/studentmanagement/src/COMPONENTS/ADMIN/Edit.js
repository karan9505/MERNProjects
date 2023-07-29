import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
export default function Edit(props) {

  const [studentData, setStudentdat] = useState({});
  const getSpecificStudent = () => {
    axios.post('http://localhost:8000/Admin/GetStudent', { semail: props.semail })
      .then((response) => {
        setStudentdat(response.data)
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

  const sendUpdate = () => {
    axios.post('http://localhost:8000/Admin/UpdateStudent', studentData)
      .then((response) => {
        console.log(response.data)
        Back();
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const setMarks = (e) => {
    if (Number(e.target.value) > -1 && Number(e.target.value) < 101)
    {
      if (e.target.id === "mmarks") {
        if (e.target.value < 33)
          setStudentdat({ ...studentData, maths: Number(e.target.value), mstatus: "F" });
        else
          setStudentdat({ ...studentData, maths: Number(e.target.value), mstatus: "P" });
      }
      else if (e.target.id === "pmarks") {
        if (e.target.value < 33)
          setStudentdat({ ...studentData, physics: Number(e.target.value), pstatus: "F" });
        else
          setStudentdat({ ...studentData, physics: Number(e.target.value), pstatus: "P" });
      }
      else if (e.target.id === "cmarks") {
        if (e.target.value < 33)
          setStudentdat({ ...studentData, chemistry: Number(e.target.value), cstatus: "F" });
        else
          setStudentdat({ ...studentData, chemistry: Number(e.target.value), cstatus: "P" });
      }
      else if (e.target.id === "comarks") {
        if (e.target.value < 33)
          setStudentdat({ ...studentData, computer: Number(e.target.value), costatus: "F" });
        else
          setStudentdat({ ...studentData, computer: Number(e.target.value), costatus: "P" });
      }
      else if (e.target.id === "emarks") {
        if (e.target.value < 33)
          setStudentdat({ ...studentData, english: Number(e.target.value), estatus: "F" });
        else
          setStudentdat({ ...studentData, english: Number(e.target.value), estatus: "P" });
      }
    }
  }

  return (
    <div>
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
                    <input type='number' id="mmarks" className='marksInp' value={studentData.maths} onChange={(e) => { setMarks(e) }} onFocus={(e) => { if (Number(e.target.value) === 0) { e.target.value = '' } }}></input>
                    <p id="mstatus">{studentData.mstatus}</p>
                  </div>  
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Physics</td>
                <td>
                  <div className="marksDiv" id="md2">
                    <label htmlFor='pmarks'>Enter marks :</label>
                    <input type='number' id="pmarks" className='marksInp' value={studentData.physics} onChange={(e) => { setMarks(e) }} onFocus={(e) => { if (Number(e.target.value) === 0) { e.target.value = '' } }}></input>
                    <p id="pstatus">{studentData.pstatus}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Chemistry</td>
                <td>
                  <div className="marksDiv" id="md3">
                    <label htmlFor='cmarks'>Enter marks :</label>
                    <input type='number' id="cmarks" className='marksInp' value={studentData.chemistry} onChange={(e) => { setMarks(e) }} onFocus={(e) => { if (Number(e.target.value) === 0) { e.target.value = '' } }}></input>
                    <p id="cstatus">{studentData.cstatus}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>Computer</td>
                <td>
                  <div className="marksDiv" id="md4">
                    <label htmlFor='comarks'>Enter marks :</label>
                    <input type='number' id="comarks" className='marksInp' value={studentData.computer} onChange={(e) => { setMarks(e) }} onFocus={(e) => { if (Number(e.target.value) === 0) { e.target.value = '' } }}></input>
                    <p id="costatus">{studentData.costatus}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>English</td>
                <td>
                  <div className="marksDiv" id="md5">
                    <label htmlFor='emarks'>Enter marks :</label>
                    <input type='number' id="emarks" className='marksInp' value={studentData.english} onChange={(e) => { setMarks(e) }} onFocus={(e) => { if (Number(e.target.value) === 0) { e.target.value = '' } }}></input>
                    <p id="estatus">{studentData.estatus}</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div id="editExtraDetails">
            <p id="enamehead">OTHERS</p>
            <div>
              <label htmlFor='editnc'>CLASS : </label>
              <input type='number' placeholder='Class' id="editnc" value={studentData.class} onChange={(e) => { if (Number(e.target.value) < 13 && Number(e.target.value) > 0) setStudentdat({ ...studentData, class: e.target.value }) }} onFocus={(e) => { if (Number(e.target.value) === 0) { e.target.value = '' } }}></input>
            </div>
            <div>
              <label htmlFor='editns'>SECTION : </label>
              <input type='text' placeholder='Sec' id="editns" value={studentData.section} onChange={(e) => { setStudentdat({ ...studentData, section: e.target.value }) }} maxLength={"1"} onFocus={(e) => { if (e.target.value === '-') { e.target.value = '' } }}></input>
            </div>
            <div>
              <label htmlFor='editnr'>ROLL No. : </label>
              <input type='number' placeholder='Roll' id="editnr" value={studentData.rollNumber} onChange={(e) => { setStudentdat({ ...studentData, rollNumber: e.target.value }) }} onFocus={(e) => { if (Number(e.target.value) === 0) { e.target.value = '' } }}></input>
            </div>
          </div>
          <input type='button' value={"SAVE"} onClick={(e)=>{sendUpdate(e)}} id="updatedSave"></input>
        </div>
      </div>
    </div>
  )
}
