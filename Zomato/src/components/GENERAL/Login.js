import React, { Component } from 'react'
import Welcome from './Welcome'
import '../CSS/Login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import History from '../History'
export class Login extends Component {
  constructor(props) {
    super(props)
    document.addEventListener('click',this.back)
    // console.log(this.props.location.state.id)
    this.state = {
       number:0,
       url:"http://localhost:8000/zomato/user/login"
    }
  }
  
  back=(e)=>
  {
    
    if(e.target.id==="loginback")
    {
      if(document.getElementById("loginx")!==null)
      {
        document.getElementById("loginx").click();
      }
    }
  }

  checkLogin=(e)=>
  {
      e.preventDefault();
      let phonenum = Number(document.getElementById("phonenum").value)
      let password = document.getElementById("loginpass").value
      if(phonenum===0 || password==="")
      {
        if(phonenum===0)
        {
          document.getElementById("loginfalse1").innerHTML="Please enter phone number"
          document.getElementById("phonenum").style.borderColor="rgba(215,65,85)";
          document.getElementById("numselec").style.borderColor="rgba(215,65,85)";
          document.getElementById("phonenum").style.borderWidth="2px"
          document.getElementById("numselec").style.borderWidth="2px";
        }
        if(password==="")
        {
          document.getElementById("loginfalse2").innerHTML="Please enter password"
          document.getElementById("loginpass").style.borderColor="rgba(215,65,85)";
          document.getElementById("loginpass").style.borderWidth="2px";
          return;
        }
        return;
      }

      axios.post("http://localhost:8000/zomato/user/login",{phonenumber:phonenum,password:password})
      .then((res)=>{
        if(res.data==="phone")
        {
          document.getElementById("loginfalse1").innerHTML="Invalid phone number"
        }
        else if(res.data==="success_admin")
        {
          History.push({
            pathname:"/Admin",
          })
          localStorage.setItem('ap',JSON.stringify(phonenum))
        }
        else if(res.data==="success_user")
        {
          History.push({
            pathname:"/User",
            state:{
              phonenum:String(phonenum)
            }
          })
        }
        else if(res.data==="password")
        {
          document.getElementById("loginfalse2").innerHTML="Invalid password"
        }
      })
      
      .catch((err)=>
      {
        console.log(err.message)
      })

  }

  checkNum=(e)=>
  {
    if(Number(e.target.value)===0 && e.key==="0")
    {
      e.preventDefault();
    }
    if(e.key!=="Backspace" && e.key!=="Tab")
    {
      if(String(e.target.value).length===10 || e.key==="e")
      {
        e.preventDefault();
      }
    }
  }

  clearInavlid=()=>
  {
    document.getElementById("loginfalse1").innerHTML="";
    document.getElementById("loginfalse2").innerHTML="";
    document.getElementById("phonenum").style.borderColor="rgba(0,0,0,0.2)";
    document.getElementById("numselec").style.borderColor="rgba(0,0,0,0.2)";
    document.getElementById("loginpass").style.borderColor="rgba(0,0,0,0.2)";
    document.getElementById("phonenum").style.borderWidth="1px"
    document.getElementById("loginpass").style.borderWidth="1px"
    document.getElementById("numselec").style.borderWidth="1px";
  }

  render() {
    return (
      <div>
        <Welcome/>
        <div id="loginback">
            <div id="loginwindow">
                <div id="loginw1">
                    <p id="loginhead">Login</p>
                    <Link to="/"><img src='../IMAGES/x.png' alt='Not Found' id="loginx"></img></Link>
                </div>
                <input type='number' id="phonenum" placeholder='Phone' onKeyDown={this.checkNum} onClick={this.clearInavlid} autoComplete="off"></input>
                <p id="loginfalse1"></p>
                <input type='password' id="loginpass" placeholder='Password' onClick={this.clearInavlid} autoComplete="off"></input >
                <p id="loginfalse2"></p>
                <input type='button' id="otp" value="Login" onClick={this.checkLogin}></input>
                <div id="or"><p id="ortext">or</p></div>
                <div id="mail">
                    <img src='../IMAGES/mail.png' alt='Not Found' id="mailpic"></img>
                    <p id="mailline">Continue with Email</p>
                </div>
                <div id="google">
                    <img src='../IMAGES/google.png' alt='Not Found' id="googlepic"></img>
                    <p id="googleline">Continue with Google</p>
                </div>
                <div id="newzom">
                    <p id="newline1">New to Zomato?</p>
                    <Link to='/Signup' className="newline2link"><p id="newline2">Create account</p></Link>
                    <Link to='/Forgotpassword' className="newline2link"><p id="newline3">Forgot Password?</p></Link>
                </div>
                <div id="numselec">
                    <img src='../IMAGES/Flag.png' id="numselecpic" alt="Not Found"></img>
                    <p id="numselecnum">+91</p>
                    <img src='../IMAGES/Downarr.png' alt="Not Found" id="numselecdar"></img>
                    <div id="rl"></div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Login
