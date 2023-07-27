import React, { Component } from 'react'
import '../styles/displayticket.css';
import axios from 'axios';
export default class DisplayTicket extends Component {
    constructor(props){
        super(props)
        this.state={
            myTicket:null,
            errorMsg:""
        }
        this.obj={
            ticketnum:localStorage.getItem("ticketnum"),
        }  
      }

    componentDidMount(){
        axios.post('http://localhost:8000/user/get-Ticket',this.obj)        
        .then((Response) =>{
            console.log(Response.data);
            this.setState({myTicket:Response.data})
        })
        .catch((err)=>{
            console.log(err);
            this.setState({errorMsg:"Error retreving data"})
        })
    }

    render() {
        if(this.state.myTicket == null){

        }else{
            return (
                <div className='ticektC'>
                    <div className='ticket_'>
                        <h1 id='jd'>Journey Details</h1>
                        <div className='t1'>
                            <div className='timeanddate'>
                            <p id='timeanddate'>Departure Date and Time</p>
                            <p id='date_time'>Date:- <span id='a'>{this.state.myTicket.journeydate} </span> Time:- <span id='a'>{this.state.myTicket.departuretime}</span> </p>
                            </div>
                            <div className='arrival'>
                                <p id='arrival'>Arrival  Time</p>
                                <p id='arrival_date'>Time:-<span id='a'> {this.state.myTicket.reachtime} </span></p>
                            </div>
                        </div>
                        <div className='t2'>
                            <div className='boarding_point'>
                                <p id='boarding_point1'>Boarding Point:</p>
                                <p id='boarding_point2'> Location:-<span id='a'>{this.state.myTicket.fromlocation},{this.state.myTicket.fromlocationcity}</span>  </p>
                            </div>
                            <div className='droping'>
                                <p id='droping1'>Droping Point</p>
                                <p id='droping2'>Location:-<span id='a'>{this.state.myTicket.tolocation},{this.state.myTicket.tolocationcity} </span></p>
                            </div>
                        
                        </div>
                        <p id='pdetails'>Passenger Details</p>
                        <div className='t3'>
                        {console.log(this.state.myTicket)}
                        {this.state.myTicket && this.state.myTicket.Passengers && this.state.myTicket.Passengers.length > 0 &&
                            this.state.myTicket.Passengers.map((ticket,index)=>{
                                return(
                                <div>
                                <div className='pdetails'>
                                    
                                    <p id='name_'>{++index}, name:-<span id='a'>{ticket.firstname} {ticket.lastname} </span>  </p> <p id='seatno'>Seat No:-<span id='a'>{ticket.seatno}</span></p> 
                                </div>
                                 
                                </div>
                                );
                            })
                        }
                        </div>
                    </div>
                </div>
            ) 
        }  
    }
}
