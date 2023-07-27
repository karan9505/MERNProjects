import React from 'react'
import '../CSS/Signup.css'
import { useNavigate} from 'react-router-dom';
import { useState ,useEffect} from 'react';
export default function Signup() {

    const Navigate=useNavigate();

    const[userType,setUserType]=useState('');
    const radioChecked=(e)=>
    {
        let Button=document.getElementById("SBButtonhide");
        Button.style.visibility="hidden";
        e.target.parentElement.style.backgroundColor="rgb(242,247,242)";
        e.target.parentElement.style.borderColor="rgba(16,168,0,1)";
        e.target.parentElement.style.borderWidth="3px";
        if(e.target.parentElement.id==="SBGE1")
        {
            setUserType('Client');
            document.getElementById("SBGE2").style.backgroundColor="rgb(255,255,255)";
            document.getElementById("SBGE2").style.borderColor="rgba(0,0,0,0.1)";
            Button.value="Join as a Client";
        }
        else if(e.target.parentElement.id==="SBGE2")
        {
            setUserType('Freelancer');
            document.getElementById("SBGE1").style.backgroundColor="rgb(255,255,255)";
            document.getElementById("SBGE1").style.borderColor="rgba(0,0,0,0.1)";
            Button.value="Apply as a Freelancer";
        }
    }
    const setbutton=()=>
    {
        let Button=document.getElementById("SBButton");
        Button.setAttribute("disabled","true");
    }
  return (
    <>
        <img src='../IMAGES/UwFullLogo.png' alt="Not Found" id="UwImgLogo"></img>
        <div id="SigupBoard">
            <p id="SBL1">Join as a client or freelancer</p>
            <div id="SBG">
                <div className="SBGE" id="SBGE1">
                    <input type='radio' id="ClientRadio" className='SBradio' name="SignupType" onClick={(e)=>{radioChecked(e)}}></input>
                    <img src='../IMAGES/Client.png' alt='Not Found' id="SBCpng"></img>
                    <p className='SBL2'>I'm a client, hiring<br></br>for a project</p>
                </div>
                <div className="SBGE" id="SBGE2">
                    <input type='radio' id="FreelancerRadio" className='SBradio' name="SignupType" onClick={(e)=>{radioChecked(e)}}></input>
                    <img src='../IMAGES/Freelancer.png' alt='Not Found' id="SBFpng"></img>
                    <p className='SBL2'>I'm a freelancer,<br></br>looking for work</p>
                </div>
            </div>
            <input type='button' id="SBButton" value="Create Account" onClick={()=>{Navigate('/Signup',{state:{userType:userType}})}}></input>
            <div id="SBButtonhide"></div>
            <p id="SBL3">Already have an account? <span>Log in</span></p>
        </div>
    </>
  )
}
