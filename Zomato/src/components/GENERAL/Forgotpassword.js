import React, { Component } from 'react'
import Welcome from './Welcome'
import {Link} from 'react-router-dom'
import '../CSS/Fpass.css'
import axios from 'axios'
export class Forgotpassword extends Component {
  componentDidMount()
  {
    document.getElementById("rsq").disabled=true
  }
  resetPass=()=>
  {
    let ans=document.getElementById("bsecans").value;
    let num=document.getElementById("fpphonenum").value;
    let sque=document.getElementById("bsecque").value;
    let newp=document.getElementById("brpass").value;
    if(newp==="" || ans==="")
    {
      if(newp==="")
      {
        document.getElementById("fpfalse3").innerHTML="New password is empty"
      }
      if(ans==="")
      {
        document.getElementById("fpfalse2").innerHTML="Answer is empty"
      }
      return;
    }
    axios.post("http://localhost:8000/zomato/user/reset-password",{
      phonenumber:num,
      secretquestion:sque,
      answer:ans,
      newpassword:newp
    })
    .then((resp)=>
    {
      if(resp.data==="answer")
      {
        document.getElementById("fpfalse2").innerHTML="Invalid answer"
      }
      else
      {
        console.log("updated")
        document.getElementById("fpx").click();
      }
    })
    .catch((err)=>
    {
      console.log(err.message)
    })
  }
  
  getQuestion=()=>
  {
    let num=document.getElementById("fpphonenum").value;
    if(String(num).length<10)
    {
      document.getElementById("fpfalse1").innerHTML="Please enter 10-digits"
      console.log("ok")
      return;
    }
    axios.post("http://localhost:8000/zomato/user/forgot-password",{phonenumber:num})
    .then((resp)=>{
      if(resp.data==="phone")
      {
        document.getElementById("fpfalse1").innerHTML="Invalid phone number"
      }
      else
      {
        document.getElementById("bsecque").value=resp.data;
        document.getElementById("rsq").disabled=false
      }
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
    document.getElementById("fpfalse1").innerHTML=""
    document.getElementById("fpfalse2").innerHTML=""
    document.getElementById("fpfalse3").innerHTML=""
  }
  render() {
    return (
      <div>
        <Welcome/>
        <div id="fpback">
            <div id="fpwindow">
                <div id="fpw1">
                    <p id="fphead">Forgot password</p>
                    <Link to="/"><img src='../IMAGES/x.png' alt='Not Found' id="fpx"></img></Link>
                </div>
                <input type='number' id="fpphonenum" placeholder='Phone' onKeyDown={this.checkNum} autocomplete="off" onClick={this.clearInavlid}></input>
                <p id="fpfalse1"></p>
                <input type='button' value='Get Question' id="gq" onClick={this.getQuestion}></input>
                <input id="bsecque" placeholder='Security question will appear here' onClick={this.clearInavlid}></input>
                <input type='text' id="bsecans" placeholder='Your answer' onClick={this.clearInavlid}></input>
                <p id="fpfalse2"></p>
                <input type='password' id="brpass" placeholder='New password' onClick={this.clearInavlid}></input>
                <p id="fpfalse3"></p>
                <input type='button' id="rsq" value="Reset password" onClick={this.resetPass}></input>
                <div id="fpselec">
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

export default Forgotpassword

