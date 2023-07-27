import React from 'react';
import axios from 'axios';
import './CSS/ForgotPassword.css';
import {Link} from 'react-router-dom'
class ForgotPassword extends React.Component{

    constructor(props){
        super(props);
        this.urlnumber = "http://localhost:1010/quizapp/user/forgot-password";
        this.urlreset =  "http://localhost:1010/quizapp/user/reset-password";
        this.postObjNumber = {phonenumber:null};
        this.postObjReset = {phonenumber:null, secretquestion:null, answer:null, newpassword:null};
    }
    
    numbercheck = (e) =>{
        let num = document.getElementById('resetphone').value;
        if(num.length === 10){
         
            this.postObjNumber.phonenumber = num;
            axios.post(this.urlnumber, this.postObjNumber)
            .then((resp) =>{
                if(resp.data !== 'phone'){
                    document.getElementById('resetquestion').value = resp.data;
                }
                // console.log(resp.data);
            })
            .catch((err) =>{
                console.log(err.message);
            })
            this.postObjReset.phonenumber = this.postObjNumber.phonenumber;
            this.postObjNumber.phonenumber = null;
        }
    };

    submit = (e) =>{
        e.preventDefault();
        this.postObjReset.secretquestion = document.getElementById('resetquestion').value;
        this.postObjReset.answer = document.getElementById('resetanswer').value;
        this.postObjReset.newpassword = document.getElementById('resetrepassword').value;

        axios.post(this.urlreset, this.postObjReset)
        .then((resp)=>{console.log(resp.data)})
        .catch((err) =>{console.log(err.message)})
    };
    
    phoneCheck = (e)=>{
        let phone = document.getElementById('resetphone');
        if(e.key!=='Backspace')
        {
            if(e.key === 'e' || phone.value.length >= 10){
                e.preventDefault();
            }
        }
    };

    render(){
        return (
            <div className='ForgotPassword'>
                <Link to='/Login'><img src="../IMAGES/Return.png" alt="Not Found" className="ReturnF"></img></Link>
                <p className="ForHeader">Fill respective details</p>
                <p className='ForgotText'></p>
                <form id='resetform' onSubmit={this.submit}>
                    <input type='number' id='resetphone' placeholder='Enter Your Phone number' onInput={this.numbercheck} onKeyDown={this.phoneCheck}/>
                    <input id='resetquestion' placeholder='Your Question will appear here'></input>
                    <input type='text' id='resetanswer' placeholder='Enter Answer'/>
                    <input type='password' id='resetnewpassword' placeholder='Enter New Password'/>
                    <input type='password' id='resetrepassword' placeholder='Re-Enter New Password'/>
                    <input type='submit' id='resetsubmit' value={"SUBMIT"}/>
                </form>
            </div>
        );
    }
}
export default ForgotPassword;