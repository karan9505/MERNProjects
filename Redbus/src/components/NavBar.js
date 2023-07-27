import React, { Component } from 'react'
import '../styles/styleNavbar.css';
import History from './History';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         collaps1:false,
         collaps2:false
      }
    }
    collapsDiv1=()=>{
        if(this.state.collaps1===false){
            document.getElementById("nav_collaps1").style.display="block";
            this.setState({
                collaps1:true
            })
            document.getElementById("nav_collaps2").style.display="none";
                this.setState({
                    collaps2:false
                })
        }else{
            document.getElementById("nav_collaps1").style.display="none";
            this.setState({
                collaps1:false
            })
        }
    }
    collapsDiv2=()=>{
        if(this.state.collaps2===false){
            document.getElementById("nav_collaps2").style.display="block";
            this.setState({
                collaps2:true
            })
            document.getElementById("nav_collaps1").style.display="none";
            this.setState({
                collaps1:false
            })
        }else{
            document.getElementById("nav_collaps2").style.display="none";
            this.setState({
                collaps2:false
            })
            
        }
    }

    signin=()=>{
        History.push('/login')
        document.getElementById("nav_collaps2").style.display="none";
            this.setState({
                collaps2:false
        })
        document.getElementById("nav_collaps1").style.display="none";
            this.setState({
                collaps1:false
        })
    }
    cancleticket=()=>{
        History.push("/cancel");
        this.collapsDiv1();
    }
    viewTicket=()=>{
        History.push("/viewticket");
        this.collapsDiv1();
    }
    
  render() {
    return (
      <section className='navbar'>
        <div className='navbar-container'>
            <div className='container_part'>
                <div className='logo_container'>
                    <div className='logo'>
                        <img src='https://www.redbus.in/bushire/static/webv2/home/logo-rb.svg' alt='logo'/>
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
                        <p onClick={this.viewTicket}>View Ticket</p>
                        <p onClick={this.cancleticket}>Cancellation</p>
                    </div>
                </div>
                <div className='profile_sign'>
                    <div className='signin_icon'>
                        <h3 onClick={this.collapsDiv2}><img src='https://www.redbus.in/bushire/static/mwebv2/header/ic-user-not-logged-in.svg' alt='/'></img></h3>
                        <div className="profile_sign_collaps" id='nav_collaps2'>
                           <p onClick={this.signin}>Sign In/Sign Up</p>
                            <p>Offers</p>
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
