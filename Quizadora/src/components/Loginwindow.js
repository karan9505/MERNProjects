import React from "react";
import axios from "axios";
import './CSS/Login.css'
import {Link} from 'react-router-dom'
class LoginWindow extends React.Component
{
    constructor(props)
    {
        super(props)
        this.phoneNum=null
        this.passWord=null
        this.loginAPI='http://localhost:1010/quizapp/user/login'
        this.loginData={phonenumber:"",password:""}
    }


    CheckLogin=(e)=>
    {
        e.preventDefault();
        if(document.querySelector(".LoginUsrnm").value<=100000000)
        {
            document.querySelector(".LoginFalse").innerHTML="Please Enter 10-digits";
            return;
        }
        if(document.querySelector(".LoginPass").value==="")
        {
            document.querySelector(".LoginFalse").innerHTML="Please Enter Password";
            return;
        }
        this.loginData.phonenumber=document.querySelector(".LoginUsrnm").value
        this.loginData.password=document.querySelector(".LoginPass").value
        axios.post(this.loginAPI,this.loginData)
        .then((response)=>{
            console.log(response)
            if(response.data==="success_admin")
            {
                document.querySelector("#AdminLogin").click();
            }
            else if(response.data==="success_user")
            {
                document.querySelector("#UserLogin").click();
                localStorage.setItem('uphone', JSON.stringify(document.querySelector(".LoginUsrnm").value))
            }
            else if(response.data==="phone")
            {
                document.querySelector(".LoginFalse").innerHTML="Invalid Phone Number";
            }
            else if(response.data==="password")
            {
                document.querySelector(".LoginFalse").innerHTML="Invalid Password";
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
        

    }

    CheckData=(e)=>
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
    render()
    {
        console.log(this.props)
        return(
            <div className="LoginWindow">
                <Link to='/'><img src="../IMAGES/Return.png" alt="Not Found" className="LoginReturn"></img></Link>
                <p className="LoginHeader2">Enter credentials</p>
                <p className="LoginFalse"></p>
                <input type={"number"} className="LoginUsrnm" placeholder="Phone Number" onKeyDown={this.CheckData} onClick={()=>{document.querySelector(".LoginUsrnm").disabled=false}}></input>
                <input type={"password"} className="LoginPass" placeholder="Password"></input>
                <button className="LoginCheckButton" onClick={this.CheckLogin}>LET's LOGIN</button>
                <Link className="ForgotPassButton" to='/Forgotpassword'><p className="ForgotButtonText">FORGOT PASSWORD</p></Link>
                <Link to='/Admin' id="AdminLogin"></Link>
                <Link to='/User' id="UserLogin"></Link>
            </div>
        )
    }
}

export default LoginWindow;