import React, { useEffect, useState } from 'react'
import '../../CSS/AdminLogin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function AdminLogin() {

  const Navigate = useNavigate();

  const [studenList, setStudentList] = useState([]);

  const setStudentListFunction = () => {
    axios.post('http://localhost:8000/Admin')
      .then((response) => {
        console.log(response.data)
        setStudentList(response.data)
      })
  }

  useEffect(() => {
    setStudentListFunction();
  }, [])

  const Logout = (e) => {
    Navigate('/');
  }
  return (
    <>
      <div className='appMainBack'>
        <h1 className="welcomeHeading">Veracross's<br></br>Admin's<br></br>Section...</h1>
        <div className='userDeatilBack'>
          <p id="welcomeP">Welcome<br></br><span>Karan Khedkar</span></p>
          <div id="studentImage">
            <img src='' id="studentImage1"></img>
          </div>
          <input type='file' id="studentImg"></input>
          <img src='../IMAGES/Camera.png' id="camera"></img>
          <div className='LogoutDiv' onClick={(e) => { Logout(e) }}>
            <img src='../IMAGES/LogoutLogo.png' id="LogoutImg"></img>
            <p title='Logout'>LOG-OUT</p>
          </div>
        </div>
        <div className='studentDataBack'>
          <h1 id="welshead">Admin's Details</h1>
          <div id="adminSearchDiv">
            <img src='../IMAGES/Search.png' alt='NotFound' id="adminsearchimg"></img>
            <input type='text' id="adminSearchInput" placeholder='Search...'></input>
            <div id="adminsortdiv">
              <p>Sort:</p>
              <div>
                <input type='radio' id="searchAscenRadio" name="searchradio"></input>
                <label for="searchAccenRadio">Ascending </label>
              </div>
              <div>
                <input type='radio' id="searchDecenRadio" name="searchradio"></input>
                <label for="searchAccenRadio">Descending</label>
              </div>
            </div>
          </div>
          <div id="adminStudenList">
            {
              studenList.length === 0 ?
                <h1>Student Database is Empty</h1> :
                <>
                  {
                    studenList.dbResponseCred.map((data, index) => {
                      return (<div className='stulistele'>
                        <img src='../IMAGES/Student.png' alt='Not' className='sleimg1'></img>
                        <div className='stulistelesd'>
                          <p>Name : {data.firstName} {data.lastName}</p>
                          <p>Class : {studenList.dbResponseAcad[index].class}</p>
                          <p>Section : {studenList.dbResponseAcad[index].section}</p>
                          <p>Roll No. : {studenList.dbResponseAcad[index].rollNumber}  </p>
                        </div>
                        <div className='stulisteleimgsd'>
                          <img src='../IMAGES/View.png' alt='Not' title='View'></img>
                          <img src='../IMAGES/Edit.png' alt='Not' title='Edit'></img>
                        </div>
                      </div>
                      )
                    })
                  }
                </>
            }
          </div>
        </div>
      </div>
    </>
  )
}
