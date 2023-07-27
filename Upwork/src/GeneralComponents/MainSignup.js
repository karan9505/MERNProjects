import React, { useState } from 'react'
import '../CSS/MainSignup.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
export default function MainSignup(props) {
    const Location=useLocation();
    let signup_api;
    if(Location.state.userType==='Client')
    {
        signup_api="http://localhost:8000/upwork/client/sign-up";
    }
    else
    {
        signup_api="http://localhost:8000/upwork/freelancer/sign-up";
    }
    console.log(signup_api)
    const [userData,setUserData]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        country:'',
        userType:Location.state.userType
    });

    const sigupUser=()=>
    {
        console.log(userData)
        axios.post(signup_api,userData)
        .then((resp)=>{
            console.log(resp.data,'ok')
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

  return (
    <>
    <div id="MSNavbar">
        <img src='../IMAGES/UwFullLogo.png' alt="Not Found" id="UwImgLogo"></img>
        <p id="MSL1">Looking for work? <span>Apply as talent</span></p>
    </div>
    <div id="MainSigupBoard">
        <p id="MSL2">Sign up to hire talent</p>
        <div id="MSBD">
            <input type='button' id='MSBD1' value="Continue with Apple"></input>
            <img src='../IMAGES/Google.jpg' alt='Not found' id="GoogleImg"></img>
            <input type='button' id='MSBD2' value="Continue with Google"></input>
            <img src='../IMAGES/Apple.png' alt='Not found' id="AppleImg"></img>
            <p id="MSL3">or</p>
        </div>
        <div id="MSNames">
            <input type='text' id='MSFirst' placeholder='First Name' className='MSinputs' value={userData.firstName} onChange={e=>{setUserData({...userData,firstName:e.target.value})}}></input>

            <input type='text' id='MSLast' placeholder='Last Name' className='MSinputs' value={userData.lastName} onChange={(e)=>{setUserData({...userData,lastName:e.target.value})}}></input>
        </div>

        <input type='text' id="MSEmail" placeholder='Work email address' className='MSinputs' value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}></input>

        <input type='password' id="MSPassword" placeholder='Password (8 or more characters)' className='MSinputs' value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}}></input>
        <select className='MSinputs' id="MScountry" onChange={(e)=>{setUserData({...userData,country:e.target.value})}}>
            <option>India</option>
            <option>United States</option>
            <option>Australia</option>
            <option>Japan</option>
        </select>
        <div id="MSCD1" className='MSCD'>
            <input type='checkbox' id="MScheck1" className='MSCheck'></input>
            <label for="MScheck1">Send me emails with tips on how to find talent that fits my needs.</label>
        </div>
        <div id="MSCD2" className='MSCD'>
            <input type='checkbox' id="MScheck1"  className='MSCheck'></input>
            <label for="MScheck1">Yes, i understand and agree to the Upwork Terms of Services, includig the User Agreement and <br></br>Privacy Policy</label>
        </div>
        <input type='button' id="MSCAButton" value="Create my account" onClick={sigupUser}></input>
        <p id="MSL4">Already have an account? <span>Log in</span></p>
    </div>
    <div id="MSLastD"></div>
    </>
  )
}
