import React from 'react'
import '../../CSS/View.css'
export default function View(props) {
  return (
    <div className='viewBackMain'>
      <div className='detailsBack'>
      <img src='../IMAGES/Close.png' alt="Not" className='closeImg' onClick={(e)=>{props.BackFunction('b')}}></img>
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
  )
}
