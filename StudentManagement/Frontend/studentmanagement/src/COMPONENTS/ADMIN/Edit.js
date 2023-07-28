import React from 'react'

export default function Edit() {
  return (
    <div>
      <div className='viewBackMain'>
        <div className='detailsBack1'>
          <img src='../IMAGES/Close.png' alt="Not" className='closeImg'></img>
          <h1 id="welshead1">Student's Data Edit</h1>
          <div id="EditNameDiv">
            <p id="enamehead">NAME</p>
            <div>
              <label htmlFor='efn'>First Name : </label>
              <input type='text' id="efn" placeholder='Firstname...'></input>
            </div>
            <div>
              <label htmlFor='eln'>Last Name : </label>
              <input type='text' id="eln" placeholder='Lastname...'></input>
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
                    <input type='number' id="mmarks" className='marksInp'></input>
                  </div>  
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Physics</td>
                <td>
                  <div className="marksDiv" id="md2">
                    <label htmlFor='mmarks'>Enter marks :</label>
                    <input type='number' id="mmarks" className='marksInp'></input>
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
          <div>
            <h1>swds</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
