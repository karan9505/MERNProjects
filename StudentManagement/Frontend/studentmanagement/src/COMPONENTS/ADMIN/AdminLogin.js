import React, { useEffect, useState } from 'react'
import '../../CSS/AdminLogin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Edit from './Edit';
import View from './View';
export default function AdminLogin() {

  const Navigate = useNavigate();
  const [vebs,setvebs]=useState('b');
  const [studenList, setStudentList] = useState([]);
  const [currentStudentId,setcsid] = useState('');
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

  const vebsfunction=()=>{
    if(vebs==='b')
      return(<></>);
    else if(vebs==='e')
      return(<Edit/>)
    else if(vebs==='v');
      return(<View BackFunction={setvebs} studentId={currentStudentId}/>)   
  }

  const switchTab=(e)=>{
    if(e.target.id==='v'){
      setvebs('v');
      setcsid(e.target.parentElement.parentElement.id)
    }
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
          <h1 id="welshead">Admin's Section</h1>
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
                    studenList.map((data, index) => {
                      return (
                        <div className='stulistele' id={data._id}>
                          <img src='../IMAGES/Student.png' alt='Not' className='sleimg1'></img>
                          <div className='stulistelesd' >
                            <p>Name : {data.firstName} {data.lastName}</p>
                            <p>Class : {data.class}</p>
                            <p>Section : {data.section}</p>
                            <p>Roll No. : {data.rollNumber}  </p>
                          </div>
                          <div className='stulisteleimgsd'>
                            <img src='../IMAGES/View.png' alt='Not' title='View' id='v' onClick={(e)=>{switchTab(e)}}></img>
                            <img src='../IMAGES/Edit.png' alt='Not' title='Edit' value='e' onClick={(e)=>{switchTab(e)}}></img>
                            <img src='../IMAGES/Delete.png' alt='Not' title='Delete'></img>
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
      {vebsfunction()}
    </>
  )
}
