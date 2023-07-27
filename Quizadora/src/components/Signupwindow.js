import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import "./CSS/Signup.css"
class Signupwindow extends React.Component{
    constructor(props){
        super(props);
        this.url = "http://localhost:1010/quizapp/user/signup";
        this.postObj = {name:null, phonenumber:null, secretquestion:null, answer:null, password:null};
    }

    CheckData=(e)=>
    {
        if(e.key==="Backspace")
        {
            e.target.disabled=false;
        }
        else
        {
            if(String(e.target.value).length===10)
            {
                e.target.disabled=true;
            }
        }
    }

    submit = (e) =>{
        e.preventDefault();
        if(document.querySelector("#signupname").value==="")
        {
            console.log("ojdiej")
            document.querySelector(".SF").innerHTML="Name Not Filled"
            return;
        }
        this.postObj.name = document.getElementById('signupname').value;
        this.postObj.phonenumber = document.getElementById('signupphone').value;
        this.postObj.secretquestion = document.getElementById('signupquestion').value;
        this.postObj.answer = document.getElementById('signupanswer').value;
        this.postObj.password = document.getElementById('signuprepassword').value;
        axios.post(this.url,this.postObj)
        .then((response) => {
            console.log(response.data);
            document.getElementById('bl').click();
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    render(){
        return(
            <div className='SignUp' id='SignUp'>
                <Link to='/'><img src="../IMAGES/Return.png" alt="Not Found" className="SignupReturn"></img></Link>
                <p className="SignupHeader">Fill respective details</p>
                <p className="SF"></p>
                <form id='signupform' onSubmit={this.submit}>
                    <input type='text' id='signupname' placeholder='Full Name' maxLength="10"/>
                    <input type='number' id='signupphone' placeholder='Phone Number' onKeyDown={this.CheckData}/>
                    <input type='text' id='signupquestion' placeholder='Select Question'/>
                    <input type='text' id='signupanswer' placeholder='Answer Key'/>
                    <input type='password' id='signuppassword' placeholder='Password'/>
                    <input type='password' id='signuprepassword' placeholder='Re-Enter Password'/>
                    <input type='submit' id='signupsubmit' value="SUBMIT"/>
                </form>
            <Link to='/Login' id="bl"></Link>
            </div>
        );
    }
}
export default Signupwindow;