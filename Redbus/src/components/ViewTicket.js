import React, { Component } from 'react'
import '../styles/cancel.css';
import axios from 'axios';
import History from './History';
export default class Cancel extends Component {
    constructor(props) {
        super(props);
        this.obj = {
            ticket_No: "",
        };

    };

    handleChange1 = (e) => {

        console.log(e.target.value);
        this.obj.ticket_No = e.target.value


    }
    viewticket = (e) => {
        if (document.getElementById("ticket_No").value === "") {
            alert("Enter Valid Ticket Number");
            return;
        }
        localStorage.setItem("ticketnum", this.obj.ticket_No);
            History.push("/ticket");

    }
    render() {
        return (
            <div className='canclet'>
                <div className='cancel_ticket'>
                    <h1>Cancel Your Ticket</h1>
                    <div className='info'>
                        <input type="text" id='ticket_No' onChange={this.handleChange1} placeholder="Enter ticket No" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} maxLength='15' />
                    </div>
                    <input type="button" className='select' id='select_passanger' onClick={this.viewticket} value="View Ticket" />
                </div>
            </div>
        )
    }
}
