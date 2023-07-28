import React from 'react'
import { useState } from 'react';
import axios from 'axios';
export default function Signup(props) {
    console.log(props.userType)
    const [userData,setUserData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""

    });
    const [emptyFields,setEmpty]=useState({});
    const sendData=()=>
    {
        userData.userType=props.userType;
        console.log(userData)
        if(userData.firstName==="")
            setEmpty({...emptyFields,fne:"Enter first name !"})
        else if(userData.lastName==="")
            setEmpty({...emptyFields,lne:"Enter last name !"})
        else if(userData.email==="")
            setEmpty({...emptyFields,ee:"Enter email !"})
        else if(userData.password==="")
            setEmpty({...emptyFields,pe:"Enter password !"})
        else{
        axios.post("http://localhost:8000/Signup",userData)
        .then((response)=>{
            console.log(response.data)
            if(response.data.message==='Signup Successful')
                props.loginSignupTogggel(prev=>!prev)
            else if(response.data.message==='User already exist')
                setEmpty({...emptyFields,ee:"Email already in use !"});
        })
        .catch((error)=>{
            console.log(error.message)
        })
        }
    }

  return (
    <>
        <h1 className='sliderHeading' id="signupHeading"><span>Sign-Up</span></h1>
        <div className='inputDataDiv' id="signupFNDiv">
            <label for="firstName">First Name</label>
            <input type="text" placeholder='First name...' id='firstName' onChange={(e)=>{setUserData({...userData,firstName:e.target.value})}} value={userData.firstName} onClick={()=>{setEmpty({})}}></input>
            <p>{emptyFields.fne}</p>
        </div>

        <div className='inputDataDiv' id='signupLNDiv'>
            <label for="lastName">Last Name</label>
            <input type="text" value={userData.lastName} placeholder='Last name...' id='lastName' onChange={(e)=>{setUserData({...userData,lastName:e.target.value})}} onClick={()=>{setEmpty({})}}></input>
            <p>{emptyFields.lne}</p>
        </div>
      
        <div className='inputDataDiv' id="signupEmailDiv">
            <label for="email">Email</label>
            <input type="text" placeholder='Email...' id='signupemail' onChange={(e)=>{setUserData({...userData,email:e.target.value})}} onClick={()=>{setEmpty({})}}></input>
            <p>{emptyFields.ee}</p>
        </div>
      
        <div className='inputDataDiv' id="signupPDiv">
            <label for="password">Password</label>
            <input type="password" placeholder='Password...' id='password' onChange={(e)=>{setUserData({...userData,password:e.target.value})}} onClick={()=>{setEmpty({})}}></input>
            <p>{emptyFields.pe}</p>
        </div>
        
        <input type='button' value="Sign-Up" onClick={()=>(sendData())} className='cardButton' id="SignUPButtton"></input>
        
        <p id="backLoginText">Already have account?<span onClick={(e)=>(props.loginSignupTogggel(e))}>Let's Login</span></p>
    </>
  )
}
