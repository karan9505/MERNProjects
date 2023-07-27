import { useState } from 'react';
import '../../CSS/Landing.css'
import Login from './Login';
import Signup from './Signup';
export default function Landing() {


  const [loginImg,setLoginImg]=useState('');
  const [userType,setUserType]=useState('');
  const [loginSignup,setLS]=useState(true);

  const moveL=()=>
  {
    let slider=document.getElementById("slider");
    slider.style.transform="translateX(-514px)"
  }

  const moveR=()=>
  {
    let slider=document.getElementById("slider");
    slider.style.transform="translateX(0px)"
  }

  const radioClicked=(e)=>{
    let adminDiv=document.getElementById("adminDivid");
    let studentDiv=document.getElementById("studetDivid");
    let nextButton=document.getElementById("roleToLogin");
    nextButton.style.visibility="visible";
    if(e.target.parentElement.id==="adminDivid"){
      console.log("Admin")
      studentDiv.style.backgroundColor="rgb(255,255,255)";
      adminDiv.style.backgroundColor="rgba(227, 79, 79,0.5)";
      nextButton.value="Continue as admin...";
      setLoginImg('../IMAGES/AdminLogo.png');
      setUserType(1);
    }
    else{
      console.log("Student")
      adminDiv.style.backgroundColor="rgb(255,255,255)";
      studentDiv.style.backgroundColor="rgba(227, 79, 79,0.5)";
      nextButton.value="Continue as student...";
      setLoginImg('../IMAGES/StudentLogo.png');
      setUserType(0);
    }
  }

  const loginSignupTogggel=(e)=>
  {
    setLS(prev=>!prev)
  }

  return (
    <>
    <div className="landingBack">
      <div className="landingLeft">
        <h1 id="llHeading"><span>Veracross.</span><br></br>studentManagementSystem...</h1>
        <img src='../IMAGES/VeracrossLogo.png' alt='IamgeNotFpund' id="llimage1"></img>
        <img src='../IMAGES/LandingLOGO.png' alt='IamgeNotFpund' id="llimage2"></img>
      </div>
      <div className="landingRight" id="landingRight">
          <div id="slider">

            <div className='optioncard' id="card1">
              <h1 className='sliderHeading'><span>Welcome to Veracross</span><br></br>Choose your role</h1>
              <div className='roleDiv' id="adminDivid">
                <input type='radio' name="roleRadio" id="adminRoleRadio" onClick={(e)=>(radioClicked(e))}></input>
                <h1>Admin</h1>
              </div>
              <div className='roleDiv' id="studetDivid">
                <input type='radio' name="roleRadio" id="studentRoleRadio" onClick={(e)=>(radioClicked(e))}></input>
                <h1>Student</h1>
              </div>
              <input type='button' onClick={()=>(moveL())} className='cardButton' id="roleToLogin"></input>
            </div> 

          <div className='optioncard' id="card2">
            <img src="../IMAGES/Back.png" onClick={()=>(moveR())} id="BackButton" alt="NotGount"></img> 
            {
              loginSignup?
              <Login loginSignupTogggel={loginSignupTogggel} loginImg={loginImg} userType={userType}/>:
              <Signup loginSignupTogggel={loginSignupTogggel} userType={userType}/>
            }
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}
