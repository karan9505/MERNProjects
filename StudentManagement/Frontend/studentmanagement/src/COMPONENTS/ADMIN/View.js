import React, { useEffect, useState } from 'react'
import '../../CSS/ViewEdit.css'
import axios from 'axios'
export default function View(props) {
  console.log("CSID : ", props.studentId)

  const [studentData, setStudentdat] = useState({});
  const getSpecificStudent = () => {
    axios.post('http://localhost:8000/Admin/ViewStudent', { semail: props.semail })
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

  return (
    <div className='viewBackMain'>
      <div className='detailsBack'>
        <img src='../IMAGES/Close.png' alt="Not" className='closeImg' onClick={(e) => {Back(e)}}></img>
        {
          Object.keys(studentData).length === 0 ?
            <></> :
            <>
              <h1 id="welshead">Student's Details</h1>
              <p id="sname" className='datap'><span>Student Name : </span>{' ' + studentData.firstName + ' ' + studentData.lastName}</p>
              <div id="classDetails">
                <p className='datap'><span>Class :</span>{' ' + studentData.class}</p>
                <p className='datap'><span>Section :</span>{' ' + studentData.section}</p>
                <p className='datap'><span>Roll Number :</span>{' ' + studentData.rollNumber}</p>
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
                    <td>{studentData.result.maths + '-' + studentData.result.mstatus}</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Physics</td>
                    <td>{studentData.result.physics + '-' + studentData.result.pstatus}</td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Chemistry</td>
                    <td>{studentData.result.chemistry + '-' + studentData.result.cstatus}</td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>Computer</td>
                    <td>{studentData.result.computer + '-' + studentData.result.costatus}</td>
                  </tr>
                  <tr>
                    <td>5.</td>
                    <td>English</td>
                    <td>{studentData.result.english + '-' + studentData.result.estatus}</td>
                  </tr>
                </table>
              </div>
              <div id="resultDiv">
                <p className='datap'><span>RESULT :- </span>{studentData.result.finalResult.status}</p>
                <p className='datap'><span>Total : </span>{studentData.result.finalResult.total + '/500'}</p>
                <p className='datap'><span>Percentage : </span>{studentData.result.finalResult.percentage}</p>
                <p className='datap'><span>Status : </span>{studentData.result.finalResult.status}</p>
              </div>
            </>
        }
      </div>
    </div>
  )
}
