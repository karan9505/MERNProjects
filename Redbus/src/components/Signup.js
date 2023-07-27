import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import img3 from '../images/budget-dribbble.gif'
import "../styles/styleSignup.css"
import logo from '../images/mainlogo.png'
import { Link } from 'react-router-dom';
import History from './History';
import loginicon from '../images/desktop-payment-offers.svg'

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: "",
            userMiddleName: "",
            lastname: "",
            phoneno: "",
            passcode: "",
            rePassword: "",
            qid: "0",
            answer: "",
            age: "",
            city: "",
            states: "",
            pincode: ""
        }
    }

    componentDidMount() {
        console.log("Inside")
    }
    handlefNameChange = (e) => {
        console.log(e);
        this.setState({
            firstname: e.target.value
        })
    }
    handlemNameChange = (e) => {
        console.log(e);
        this.setState({
            userMiddleName: e.target.value
        })
    }
    handlelNameChange = (e) => {
        console.log(e);
        this.setState({
            lastname: e.target.value
        })
    }
    handleCityChange = (e) => {
        console.log(e);
        this.setState({
            city: e.target.value
        })
    }
    handleCityChange = (e) => {
        console.log(e);
        this.setState({
            states: e.target.value
        })
    }
    handleNumberChange = (e) => {
        console.log(e);
        this.setState({
            phoneno: e.target.value
        })
        document.getElementById("errorNumber").style.display = "none"
    }
    handlePincodeChange = (e) => {
        console.log(e);
        this.setState({
            pincode: e.target.value
        })
        document.getElementById("errorPincode").style.display = "none"
    }
    handleAgeChange = (e) => {
        console.log(e);
        this.setState({
            age: e.target.value
        })
        document.getElementById("errorAge").style.display = "none"
    }
    handlePasswordChange = (e) => {
        console.log(e);
        this.setState({
            passcode: e.target.value
        })
    }
    handlerePasswordChange = (e) => {
        console.log(e);
        this.setState({
            rePassword: e.target.value
        })
        document.getElementById("errorpass").style.display = "none"
    }
    handleQuestion = (e) => {
        this.setState({
            qid: e.target.value
        })
    }
    handleAnswerChange = (e) => {
        console.log(e);
        this.setState({
            answer: e.target.value
        })
    }
    clickSubmit = e => {
        e.preventDefault()
        if (document.getElementById('number').value === '' || document.getElementById('number').value.length < 10) {
            document.getElementById("errorNumber").style.display = "block"
            return
        }
        if (document.getElementById('age').value === "" || document.getElementById('age').value === "0") {
            document.getElementById("errorAge").style.display = "block"
            return
        }
        if (document.getElementById('pincode').value.length < 6) {
            document.getElementById("errorPincode").style.display = "block"
            return
        }
        if (document.getElementById('re-EnterPass').value !== document.getElementById('password').value) {
            document.getElementById("errorpass").style.display = "block"
            return
        }

        axios.post('http://localhost:8000/validation/sign-up', this.state)
            .then(response => {
                console.log(response.data + "get")
                if (response.data === 1) {
                    alert("Sign Up Successfully")
                    History.push("/")
                } else {
                    document.getElementById("errorNumber").style.display = "block"
                    alert("Mobile Number Already Existed")
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { fname, mname, lname, number, passcode, rePassword, question, answer, age, city, states, pincode } = this.state;
        return (
            <section className='signup_page'>
                <div className='signup_container'>
                    <div className='inner_signup'>
                        <div className='signup_logo'>
                            <img src="https://s3.rdbuz.com/Images/logo_r.png" alt='logo' />
                        </div>
                        <div className='signup_info'>
                            <div className='signup_head'>
                                <h1>signup</h1>
                                <p>Welcome Please Signup your account</p>
                            </div>
                            <div className='input_method_container' id="signup_input_container">
                                <div className='input_method' id="sign_input_method">
                                    <input id='upinput' type="text" Value={fname} placeholder="First Name" onChange={this.handlefNameChange} onKeyPress={(event) => { if (!/^[a-zA-Z]+$/.test(event.key)) { event.preventDefault(); } }} maxLength='15' required />
                                    <input id='upinput' type="text" Value={lname} placeholder="Last Name" onChange={this.handlelNameChange} onKeyPress={(event) => { if (!/^[a-zA-Z]+$/.test(event.key)) { event.preventDefault(); } }} maxLength='15' required />
                                </div>
                                <div className="input_method_signup">
                                    <input type='text' id='number' name='phoneno' defaultValue={number} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} placeholder="Mobile Number" onChange={this.handleNumberChange} minLength='5' maxLength='15' required />
                                    <p id='errorNumber'>Enter Valid Mobile Number</p>
                                </div>
                                <div className="input_method_signup">
                                    <input type='text' id='age' name='age' defaultValue={age} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} placeholder="Enter Age" onChange={this.handleAgeChange} minLength='0' maxLength='2' required />
                                    <p id='errorAge'>Enter Valid Age</p>
                                </div>
                                <div className='input_method' id="sign_input_method">
                                    <input id='upinput' type="text" Value={city} placeholder="Enter City" onChange={this.handleCityChange} onKeyPress={(event) => { if (!/^[a-zA-Z]+$/.test(event.key)) { event.preventDefault(); } }} maxLength='15' required />
                                    <input id='upinput' type="text" Value={states} placeholder="Enter State" onChange={this.handlelStateChange} onKeyPress={(event) => { if (!/^[a-zA-Z]+$/.test(event.key)) { event.preventDefault(); } }} maxLength='15' required />
                                </div>
                                <div className="input_method_signup">
                                    <input type='text' id='pincode' name='pincode' defaultValue={pincode} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} placeholder="Enter Pincode" onChange={this.handlePincodeChange} minLength='1' maxLength='6' required />
                                    <p id='errorPincode'>Enter Valid Pincode</p>
                                </div>
                                <div className="input_method_signup">
                                    <input type='password' id="password" name='name' defaultValue={passcode} placeholder="Password" onChange={this.handlePasswordChange} minLength='5' maxLength='15' required />
                                </div>
                                <div className="input_method_signup">
                                    <input type='password' id="re-EnterPass" Value={rePassword} placeholder='Re-Enterpasscode' minLength='8' maxLength='20' onChange={this.handlerePasswordChange} required />
                                    <p id='errorpass'>Password Doesn't match</p>
                                </div>
                                <div className="input_method_signup">
                                    <select name="secret_uestion"
                                        id="secret_question"
                                        tabindex="8" onChange={this.handleQuestion}>
                                        <option Value="0">What is Your Pet Name?</option>
                                        <option Value="1">What is Your Favourite Color?</option>
                                    </select>
                                    <input type='text' defaultValue={answer} placeholder="Security Question" onKeyPress={(event) => { if (!/^[a-zA-Z]+$/.test(event.key)) { event.preventDefault(); } }} minLength='4' maxLength='10' onChange={this.handleAnswerChange} required />
                                </div>
                                <div className="user_buttons">
                                    <Link to="/"><div className="button signup">Cancle</div></Link>
                                    <div className="button signup" onClick={this.clickSubmit}>signup</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inner_signup backgdisp" >
                        <img className='img3' src={loginicon} alt='signup' />
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Signup)
