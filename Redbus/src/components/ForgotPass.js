import React, { Component } from 'react';
import axios from 'axios';
import img3 from '../images/desktop-payment-offers.svg'
import '../styles/styleForget.css'
import logo from '../images/mainlogo.png'
import { Link } from 'react-router-dom';
import History from './History';

class ForgotPass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneno: '',
        }
    }
    handleMobileChange = (e) => {
        this.setState({ phoneno: e.target.value });
        document.getElementById('user_nexist').style.display = "none"
    }

    nextPage = e => {
        let phoneno=this.state.phoneno
        e.preventDefault()
        if (this.state.mobileNumber === "1234567890") {
            axios.post('http://localhost:8000/validation/forgot-password',{phoneno})
                .then(response => {
                    console.log(response)

                     if (response.data === 3) {
                        document.getElementById('user_nexist').style.display = "block"
                    }else{
                        History.push({
                            pathname: '/updatePass',
                            state: {
                                mobileNumber: response.data,
                            }
                        })
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            axios.post('http://localhost:8000/validation/forgot-password', this.state)
                .then(response => {
                    console.log(response)

                     if (response.data === 3) {
                        document.getElementById('user_nexist').style.display = "block"
                    }else{
                        History.push({
                            pathname: '/updatePass',
                            state: {
                                mobileNumber: response.data,
                            }
                        })
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    render() {
        const { mobile } = this.state
        return (
            <section className='forgetpass_page'>
                <div className='forgetpass_container'>
                    <div className='inner_forgetpass'>
                        <div className='forgetpass_logo'>
                            <img src="https://s3.rdbuz.com/Images/logo_r.png" alt='logo' />
                        </div>
                        <div className='forgetpass_info'>
                            <div className='forgetpass_head'>
                                <h1>Forget Password</h1>
                            </div>
                            <div className='input_method_container'>
                                <div className='input_method'>
                                    <label>Mobile Number</label>
                                    <input type='text' name='number' value={mobile} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} placeholder='Enter Mobile Number..' onChange={this.handleMobileChange} minLength='10' maxLength='10' required />
                                    <p id="user_nexist">User Doesn't Exist</p>
                                </div>
                                <div className="user_buttons">
                                    <Link to="/" ><div className="button forgetpass">Cancle</div></Link>
                                    <div className="button forgetpass" onClick={this.nextPage}>Apply</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inner_forgetpass backgdisp" >
                        <img className='img3' src={img3} alt='forgetpass' />
                    </div>
                </div>
            </section>
        )
    }
}

export default ForgotPass;
