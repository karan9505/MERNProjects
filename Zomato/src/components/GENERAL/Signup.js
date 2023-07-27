import React, { Component } from 'react'
import Welcome from './Welcome'
import '../CSS/Signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import History from '../History'
export class Signup extends Component {
  constructor(props) {
    super(props)
    document.addEventListener('click',this.back)
  }

  back=(e)=>
  {
    if(document.getElementById("signupx")!==null)
    {
      if(e.target.id==="signupback")
      {
        document.getElementById("signupx").click();
      }
    }
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

  createAccount=()=>
  {
    let fname=document.getElementById("signupfname");
    let lname=document.getElementById("signuplname");
    let phnnum=document.getElementById("signupphone");
    let add=document.getElementById("signupadd");
    let secque=document.getElementById("signupques");
    let secans=document.getElementById("signupans");
    let pass=document.getElementById("signuppass");
    let rpass=document.getElementById("signuprpass");
    if(fname.value==="" || lname.value==="" || Number(phnnum.value)<100000000 || secque.value==="Select Security Question" || add.value==="" || secans.value==="" || pass.value==="" || rpass.value==="" || pass.value!==rpass.value)
    {
      if(fname.value==="")
      {
        fname.style.borderColor="rgba(215,65,85)"
        fname.style.borderWidth="2px"
        document.getElementById("sf1").innerHTML="Enter first name"
      }
      if(lname.value==="")
      {
        lname.style.borderColor="rgba(215,65,85)"
        lname.style.borderWidth="2px"
        document.getElementById("sf2").innerHTML="Enter last name"
      }
      if(Number(phnnum.value)<1000000000)
      {
        phnnum.style.borderColor="rgba(215,65,85)"
        phnnum.style.borderWidth="2px"
        document.getElementById("sf3").innerHTML="Please enter 10-digits"
      }
      if(add.value==="")
      {
        add.style.borderColor="rgba(215,65,85)"
        add.style.borderWidth="2px"
        document.getElementById("sf4").innerHTML="Enter address"
      }
      if(secque.value==="Select Security Question")
      {
        secque.style.borderColor="rgba(215,65,85)"
        secque.style.borderWidth="2px"
        document.getElementById("sf5").innerHTML="Security question not selected"
      }
      if(secans.value==="")
      {
        secans.style.borderColor="rgba(215,65,85)"
        secans.style.borderWidth="2px"
        document.getElementById("sf6").innerHTML="Enter security answer"
      }
      if(pass.value!=="" && pass.value!==rpass.value && rpass.value!=="")
      {
        pass.style.borderColor="rgba(215,65,85)"
        pass.style.borderWidth="2px"
        document.getElementById("sf7").innerHTML="Password did'nt matched"
        rpass.style.borderColor="rgba(215,65,85)"
        rpass.style.borderWidth="2px"
        document.getElementById("sf8").innerHTML="Password did'nt matched"
      }
      else
      {
        if(pass.value==="")
        {
          pass.style.borderColor="rgba(215,65,85)"
          pass.style.borderWidth="2px"
          document.getElementById("sf7").innerHTML="Enter password"
        }
        if(rpass.value==="")
        {
          rpass.style.borderColor="rgba(215,65,85)"
          rpass.style.borderWidth="2px"
          document.getElementById("sf8").innerHTML="Re-Enter password"
        }
      }
      return;
    }
    History.push('/Login')
    axios.post("http://localhost:8000/zomato/user/signup",{
      name:fname.value+" "+lname.value,
      phonenumber:phnnum.value,
      address:add.value,
      secretquestion:secque.value,
      answer:secans.value,
      password:pass.value
    }) 
  }

  clear=()=>
  {
    let fname=document.getElementById("signupfname");
    let lname=document.getElementById("signuplname");
    let phnnum=document.getElementById("signupphone");
    let add=document.getElementById("signupadd");
    let secque=document.getElementById("signupques");
    let secans=document.getElementById("signupans");
    let pass=document.getElementById("signuppass");
    let rpass=document.getElementById("signuprpass");
    let sf1=document.getElementById("sf1");
    let sf2=document.getElementById("sf2");
    let sf3=document.getElementById("sf3");
    let sf4=document.getElementById("sf4");
    let sf5=document.getElementById("sf5");
    let sf6=document.getElementById("sf6");
    let sf7=document.getElementById("sf7");
    let sf8=document.getElementById("sf8");
    fname.style.borderColor="rgba(0,0,0,0.2)"
    fname.style.borderWidth="1px"
    lname.style.borderColor="rgba(0,0,0,0.2)"
    lname.style.borderWidth="1px"
    phnnum.style.borderColor="rgba(0,0,0,0.2)"
    phnnum.style.borderWidth="1px"
    add.style.borderColor="rgba(0,0,0,0.2)"
    add.style.borderWidth="1px"
    secans.style.borderColor="rgba(0,0,0,0.2)"
    secans.style.borderWidth="1px"
    pass.style.borderColor="rgba(0,0,0,0.2)"
    pass.style.borderWidth="1px"
    rpass.style.borderColor="rgba(0,0,0,0.2)"
    rpass.style.borderWidth="1px"
    secque.style.borderColor="rgba(0,0,0,0.2)"
    secque.style.borderWidth="1px"
    sf1.innerHTML=""
    sf2.innerHTML=""
    sf3.innerHTML=""
    sf4.innerHTML=""
    sf5.innerHTML=""
    sf6.innerHTML=""
    sf7.innerHTML=""
    sf8.innerHTML=""
  }
  render() {
    return (
      <div>
        <Welcome/>
        <div id="signupback">
            <div id="signupwindow">
                <div id="signupw1">
                    <p id="signuphead">Signup</p>
                    <Link to='/'><img src='../IMAGES/x.png' alt='Not Found' id="signupx"></img></Link>
                </div>
                <input type='text' id="signupfname" placeholder='First Name' onClick={this.clear} autocomplete="off"></input>
                <p id="sf1"></p>
                <input type='text' id="signuplname" placeholder='Last Name' onClick={this.clear} autocomplete="off"></input>
                <p id="sf2"></p>
                <input type='number' id="signupphone" placeholder='Phone' maxLength="10" onKeyDown={this.checkNum} onClick={this.clear} autocomplete="off"></input>
                <p id="sf3"></p>
                <input type='text' id="signupadd" placeholder='Address' onClick={this.clear} autocomplete="off"></input>
                <p id="sf4"></p>
                <select id="signupques" onClick={this.clear}>
                  <option>Select Security Question</option>
                  <option>What’s your favorite movie?</option>
                  <option>What was your first car?</option>
                  <option>What is your astrological sign?</option>
                  <option>What city were you born in?</option>
                  <option>What’s your favorite movie?</option>
                </select>
                <p id="sf5"></p>
                <input type='text' placeholder='Security answer' id="signupans" onClick={this.clear} autocomplete="off"></input>
                <p id="sf6"></p>
                <input type='password' id="signuppass" placeholder='Password' onClick={this.clear} autocomplete="off"></input>
                <p id="sf7"></p>
                <input type='password' id="signuprpass" placeholder='Re-enter Password' onClick={this.clear} autocomplete="off"></input>
                <p id="sf8"></p>
                <div id="tc">
                  <input type='checkbox' id="agree"></input>
                  <label for="agree" id="agreetext">
                  I agree to Zomato's <a href='http://www.zomato.com/policies/terms-of-service/' target='blank' className='agred'><span>Terms of Service, Privacy Policy</span></a> and<br></br>
                  <a href='http://www.zomato.com/policies/' className='agred' target='blank'><span>Content Policies</span></a>
                  </label>
                </div>
                <input type='button' value="Create account" id="createacc" onClick={this.createAccount}></input>
                <div id="ahacc">
                    <p id="newline1">Already have an account?</p>
                    <Link to="/Login" className='newline2link'><p id="newline2">Log in</p></Link>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Signup
