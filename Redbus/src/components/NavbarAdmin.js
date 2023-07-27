import React, { Component } from 'react'
import '../styles/styleNavbar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import History from './History';
// import { Link } from 'react-router-dom';
import History from './History';

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            collaps1: false,
            collaps2: false
        }
    }
    collapsDiv1 = () => {
        if (this.state.collaps1 === false) {
            document.getElementById("nav_collaps1").style.display = "block";
            this.setState({
                collaps1: true
            })
            document.getElementById("nav_collaps2").style.display = "none";
            this.setState({
                collaps2: false
            })
        } else {
            document.getElementById("nav_collaps1").style.display = "none";
            this.setState({
                collaps1: false
            })
        }
    }
    collapsDiv2 = () => {
        if (this.state.collaps2 === false) {
            document.getElementById("nav_collaps2").style.display = "block";
            this.setState({
                collaps2: true
            })
            document.getElementById("nav_collaps1").style.display = "none";
            this.setState({
                collaps1: false
            })
        } else {
            document.getElementById("nav_collaps2").style.display = "none";
            this.setState({
                collaps2: false
            })

        }
    }

    signout = () => {
        console.log(localStorage.getItem("phoneno"))
        axios.post('http://localhost:8000/validation/log-out', { phoneno: localStorage.getItem("phoneno") })
            .then(response => {
                console.log(response)
                localStorage.setItem("phoneno", "");
                History.push('/')
                document.getElementById("nav_collaps2").style.display = "none";
                this.setState({
                    collaps2: false
                })
                document.getElementById("nav_collaps1").style.display = "none";
                this.setState({
                    collaps1: false
                })
            })
    }
    redirectDash=()=>{
        History.push({
            pathname: '/adminbuslist',
            state: {
            phoneno:this.state.phoneno
            }
        })
    }
    cancleticket=()=>{
        History.push("cancel");
        this.collapsDiv1();
    }
    render() {
        return (
            <section className='navbar'>
                <div className='navbar-container'>
                    <div className='container_part'>
                        <div className='logo_container'>
                            <div className='logo'>
                                <img src='https://www.redbus.in/bushire/static/webv2/home/logo-rb.svg' alt='logo' />
                            </div>
                        </div>
                        <div className='containt_container'>
                            <div className='containt'>
                            <Link to="/"><p>BUS TICKET</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className='container_part'>
                        <div className='book_management'>
                            <div className="book_management_head" onClick={this.collapsDiv1}>
                                <h3>Manage Booking</h3>
                            </div>
                            <div className='manage_booking_collaps' id='nav_collaps1'>
                                <p onClick={this.cancleticket}>Cancel</p>
                                <p>Show My Ticket</p>
                            </div>
                        </div>
                        <div className='dashboardt'>
                             <h3 onClick={this.redirectDash}>Dashboard</h3>
                        </div>
                        <div className='profile_sign'>
                            <div className='signin_icon'>
                                <h3 onClick={this.collapsDiv2}><img src='https://www.redbus.in/bushire/static/mwebv2/header/ic-user-not-logged-in.svg' alt='/'></img></h3>
                                <div className="profile_sign_collaps" id='nav_collaps2'>
                                    <p>My Trips</p>
                                    <p onClick={this.signout}>Sign out</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        )
    }
}

export default NavBar
