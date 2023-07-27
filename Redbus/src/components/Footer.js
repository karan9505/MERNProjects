import React, { Component } from 'react'
import "../styles/styleFooter.css";

class Footer extends Component {
  render() {
    return (
      <section className='footer'>
        <div className='footer_container'>
            <div className='footer_part1'>
                <div className='footer_sec'>
                    <h4>Book</h4>
                    <p>Bus Tickets</p>
                    <p>rYde</p>
                    <p>Tempo Traveller</p>
                    <p>Car Rentals</p>
                    <p>Bus Hire</p>
                </div>
                <div className='footer_sec'>
                    <h4>About</h4>
                    <p>About Us</p>
                    <p>Contact Us</p>
                </div>
                <div className='footer_sec'>
                    <h4>Info</h4>
                    <p>T & C</p>
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                    <p>FAQ</p>
                </div>
                <div className='footer_sec'>
                    <h4>Global Sites</h4>
                    <p>India</p>
                    <p>Singapore</p>
                </div>
                <div className='footer_sec'>
                    <h4>Our Partners</h4>
                    <p>Bus Tickets</p>
                    <p>Goibibo</p>
                    <p>Makemytrip</p>
                </div>
            </div>
            <div className='footer_part2'>
                <div className="footer_part2_container">
                    <img src='https://www.redbus.in/bushire/static/mwebv2/header/logo_rb.svg' alt='logo'/>
                    <p>Ⓒ 2021 ibibogroup All rights reserved</p>
                </div>
            </div>
        </div>
      </section>
    )
  }
}

export default Footer;
