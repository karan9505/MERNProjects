import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/styleLogin.css';
import { Link } from 'react-router-dom';
import History from './History';
import loginicon from '../images/desktop-payment-offers.svg'
class Login extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           phoneno:'',
           passcode:'',
        }
      }
      handleMnumberChange=(e)=>{
        this.setState({
            phoneno:e.target.value
        })
    }
    handlePasswordChange=(event)=>{
        this.setState({
            passcode:event.target.value
        })
        document.getElementById('incorrect_pass').style.visibility="hidden"
    }

    clickSubmit=e=>{
      e.preventDefault(); 
       if(this.state.phoneno==="1234567890"){
           axios.post('http://localhost:8000/validation/log-in',this.state)
           .then(response=>{
            console.log(response)
            if(response.data===10){
              alert("Admin Login Successfully")
              localStorage.setItem("phoneno",this.state.phoneno);
              History.push({
                pathname: '/',
                state: {
                phoneno:this.state.phoneno
                }
            })
            }else if(response.data===2){
              document.getElementById('incorrect_pass').style.visibility="visible"
            }else{
              alert("Admin Already Logged In")
              localStorage.setItem("phoneno",this.state.phoneno);
              History.push({
                pathname: '/',
                state: {
               phoneno:this.state.phoneno
                }
            })
            }
         })
         .catch(error=>{
           console.log(error)
         })
       }else{
         axios.post('http://localhost:8000/validation/log-in',this.state)
         .then(response=>{
          console.log(response)
           if(response.data===1){
            alert("Login Successfully")
            localStorage.setItem("phoneno",this.state.phoneno);
            History.push({
              pathname: '/',
              state: {
              phoneno:this.state.phoneno
              }
          })
          }else if(response.data===2){
            document.getElementById('incorrect_pass').style.display="block"
          }else if(response.data===3){
            alert("User Doesn't Exist, Plese Sign Up")
          }else{
            alert("User Already Logged In")
            localStorage.setItem("phoneno",this.state.phoneno);
            History.push({
              pathname: '/',
              state: {
              phoneno:this.state.phoneno
              }
          })
          }     
       })
       .catch(error=>{
         console.log(error)
       })
      }
      localStorage.setItem("phoneno",this.state.phoneno);
      localStorage.setItem("isLogin",1);
    } 
  handleRedirect=()=>{

    History.push("/signup");  
  }
  render() {
    const {mNumber, pass}=this.state
    return (
      <section className='login_page'>
        <div className='login_container'>
            <div className='inner_login'>
                <div className='login_logo'>
                  <img src="https://s3.rdbuz.com/Images/logo_r.png" alt='logo'/>
                </div>
                <div className='login_info'>
                    <div className='login_head'>
                        <h1>Login</h1>
                        <p>Welcome back please Login into your account</p>
                    </div>
                    <div className='input_method_container'>
                      <form onSubmit={this.clickSubmit}>
                          <div className='input_method'>
                              <label>Mobile Number</label>
                              <input type='text' name='number' value={mNumber} placeholder='Mobile Number' onKeyPress={(event)=> {if (!/[0-9]/.test(event.key)){event.preventDefault();}}} onChange={this.handleMnumberChange} minLength='10' maxLength='10' required/>
                          </div>
                          <div className="input_method input_method1">
                              <label>Password</label>
                              <input type='password' value={pass} placeholder='Password' minLength='8' maxLength='20' onChange={this.handlePasswordChange} required/>
                              <p id='incorrect_pass'>Password Incorrect</p>
                              <Link to='/forgetpassword'>Forget Password?</Link>
                          </div>
                          <div className="user_buttons">
                              <div className="button signup" onClick={()=>this.handleRedirect()}>SignUp</div>
                              <div className="button login" onClick={this.clickSubmit}>Login</div>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="inner_login backgdisp" >
                <img className='img3' src={loginicon} alt='login'/>
            </div>
        </div>
      </section>
    )
  }
}

export default withRouter(Login)


