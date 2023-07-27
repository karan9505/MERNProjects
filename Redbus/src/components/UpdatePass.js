import React, { Component } from 'react';
import axios from 'axios';
import img3 from '../images/budget-dribbble.gif'
import '../styles/styleUpdatepass.css';
import logo from '../images/mainlogo.png'
import { Link, withRouter } from 'react-router-dom';
import History from './History';


class UpdatePass extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
          mobileNumber:this.props.location.state.mobileNumber,
           password:'',
           rePassword:''
        }
      }
    handlePasswordChange=(e)=>{
           this.setState({password:e.target.value});
    }
    handlerePasswordChange=(e)=>{
        this.setState({
            rePassword:e.target.value
        })
        document.getElementById('incorrectup').style.display="none"
    }
    handleMobileNumber=(e)=>{
      this.setState({
          mobileNumber:e.target.value
      })
    }
    componentDidMount(){
      console.log(this.props.location.state)
    }
    clickSubmit=e=>{
      if(this.state.password===this.state.rePassword && this.state.password!==''){
        e.preventDefault()
        console.log(this.state);
        if(this.props.location.state==='9096129065'){
          axios.post('http://192.168.1.167:1010/e-library/login/admin/update-password',this.state)
            .then(response=>{
              console.log(response)
            })
            .catch(error=>{
              console.log(error)
            })
            alert("Update Password Successfully")
            History.push("/")
        }else{
          axios.post('http://192.168.1.167:1010/e-library/user/update-password',this.state)
            .then(response=>{
              console.log(response)
            })
            .catch(error=>{
              console.log(error)
            })
            alert("Update Password Successfully")
            History.push("/")
        }
      }else{
        document.getElementById('incorrectup').style.display="block"
      }
    } 
  render() {
    const {mobile,password,rePassword}=this.state
    return (
      <section className='updatepass_page'>
        <div className='updatepass_container'>
            <div className='inner_updatepass'>
                <div className='updatepass_logo'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='updatepass_info'>
                    <div className='updatepass_head'>
                        <h1>Update Password</h1>
                    </div>
                    <div className='input_method_container'>
                        <div className='input_method'>
                            <label>New Password</label>
                            <input type='password' name='password' value={password} placeholder='Enter New Password' onChange={this.handlePasswordChange} minLength='8' required/>
                        </div>
                        <div className='input_method'>
                            <label>Re-Enter Password</label>
                            <input type='password' name='repassword' value={rePassword} placeholder='Re-Enter Password' onChange={this.handlerePasswordChange} minLength='8' required/>
                            <p id="incorrectup">Re-Enter Password Incorrect</p>
                        </div>
                        <div className="user_buttons">
                            <Link to="/" ><div className="button updatepass">Cancle</div></Link>
                            <div className="button updatepass" onClick={this.clickSubmit}>Submit</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inner_updatepass backgdisp" >
                <img className='img3' src={img3} alt='updatepass'/>
            </div>
        </div>
      </section>
    )
  }
}

export default withRouter(UpdatePass);
