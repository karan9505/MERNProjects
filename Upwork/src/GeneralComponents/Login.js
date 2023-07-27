import React from 'react'
import '../CSS/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Login() {

    const login_api="http://localhost:8000/upwork/log-in";
    const Navigate=useNavigate();
    const[userData,setUserData]=useState({
        email:'',
        password:''
    })

    const login=(e)=>
    {
        console.log(userData)
        axios.post(login_api,userData)
        .then((response)=>
        {
            console.log(response.data)
            if(response.data.userType==='client')
            {
                Navigate('/ClientDashboard',{state:{clientEmail:userData.email}})
            }
            else if(response.data.userType==='freelancer')
            {
                Navigate('/FreelancerDashboard')
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }

    return (
        <>
        <div id="LPNavbar">
            <img src='../IMAGES/UwFullLogo.png' alt="Not Found" id="UwImgLogo"></img>
        </div>
        <div id="LPBoard">
            <p id="LPL1">Login to upwork</p>
            <input type='text' id="LPEmail" className='LPInput' placeholder='Email' onChange={(e)=>{setUserData({...userData,email:e.target.value})}} value={userData.email}></input>
            <input type='password' id="LPPassword" className='LPInput' placeholder='Password' onChange={(e)=>{setUserData({...userData,password:e.target.value})}} value={userData.passwordq}></input>
            <input type='button' value="Continue with Email" id="LPLoginb" className='LPButton' onClick={(e)=>{login(e)}}></input>
            <div id="LPButtons">
                <p id="LPTL1">or</p>
                <input type='button' value="Continue with Google" id="LPGB"></input>
                <img src='../IMAGES/Google.jpg' alt='Not Found' id="LPGimg"></img>
                <input type='button' value="Continue with Apple"  id="LPAB"></input>
                <img src='../IMAGES/Apple.png' id="LPAimg" alt="Not Found"></img>
                <p id="LPTL2">Don't have an Upwork account?</p>
            </div>
            <input type='button' id="LPSButon" value="Sign Up"></input>
        </div>
        <div id="LPBlack"><p>&#169;2015 - 2023 Upwork Global Inc. Privacy Policy</p></div>
        <div id="LPLastDiv"></div>
        </>
    )
}
