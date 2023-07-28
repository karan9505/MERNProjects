import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    const [loginData,setLoginData]=useState({
      email:"",
      password:""
    });
    const [emptyFields,setEmpty]=useState({});

    const Navigate=useNavigate();

    const checkLogin=(e)=>{
      loginData.userType=props.userType;
      console.log(loginData)
      if(loginData.email==="")
        setEmpty({...setEmpty,ee:"Enter email !"})
      else if(loginData.password==="")
      setEmpty({...setEmpty,pe:"Enter password !"})
      else{
        axios.post("http://localhost:8000/Login",loginData)
        .then((response)=>{
          console.log(response.data)
          if(response.data.message==="Invalid email")
            setEmpty({...setEmpty,ee:"Invalid email !"})
          else if(response.data.message==="Invalid password")
            setEmpty({...setEmpty,pe:"Invalid password !"})
          else if(response.data.message==="Invalid usertype")
            setEmpty({...setEmpty,ee:"Invalid usertype !"})
          else{
            if(response.data.userType===1)
              Navigate('/Admin');
            else if(response.data.userType===0)
              Navigate('/Student',{state:{studentDetails:response.data}});
          }
        })
        .catch((error)=>{
          console.log(error.message)
        })
      }
    }
  return (
    <>
      <h1 className='sliderHeading' id="loginHeading"><span>Login</span></h1>
      <img src={props.loginImg} className='loginImage' alt='NotFound'></img>
      <div className='inputDataDiv' id="loginInputEmailDiv">
        <label for="loginEmail">Email</label>
        <input type='text' placeholder='Email...' id="loginEmail" className='inputField' value={loginData.email} onChange={(e)=>{setLoginData({...loginData,email:e.target.value})}} onClick={(e)=>{setEmpty({})}}></input>
        <p>{emptyFields.ee}</p>
      </div>

      <div className='inputDataDiv' id="loginInputpassilDiv">
        <label for="loginPass">Password</label>
        <input type='password' placeholder='Password...' id="loginPass" className='inputField' value={loginData.password} onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}} onClick={(e)=>{setEmpty({})}}></input>
        <p>{emptyFields.pe}</p>
      </div>

      <input type='button' value={"Login"} className='cardButton' id="loginButon" onClick={(e)=>{checkLogin(e)}}></input>
      
      <div id="loginSocialOptions">
        <p id="lsop1">or</p>
        <p id="lsop2">Continue with</p>
        <div id="lsopics">
          <a href='https://shorturl.at/CFJK0' target='blank'><img src='../IMAGES/Google.png' height="30px" alt='NotFound'></img></a>

          <a href='https://shorturl.at/fIJV5' target='blank'><img src='../IMAGES/Linkedin.png' height="30px" alt='NotFound'></img></a>

          <a href='https://shorturl.at/ivGRT' target='blank'><img src='../IMAGES/Twitter.png' height="30px" alt='NotFound'></img></a>
          
          <a href='https://shorturl.at/atzPR' target='blank'><img src='../IMAGES/Instagram.png' height="30px" alt='NotFound'></img></a>
        </div>
        </div>
        <p id="newLoginText">New to Veracross?<span onClick={(e)=>(props.loginSignupTogggel(e))}>Let's Signup</span></p>
    </>
  )
}
