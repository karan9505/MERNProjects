import React, { Component } from 'react';
import '../styles/styleShowbuses.css';
import axios from 'axios'
import stearing from '../images/icons8-stearing-96.png'
import seati from "../images/icons8-seat-64.png";
import History from './History';
class Showbuses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buses: [],
      errorMsg: "",
      seatsArray: [],
    }
    this.obj = {
      count: 0,
      seat: [],
      bookingSeat: [],
      busval: [],
      fare: 0,
      fare1: 0,
    }
  }

  busDetails = (e, fare) => {
    let count = 1;
    let seats = e + "";
    let tempArr = [];
    for (let i = 0; i < seats.length; i++) {
      const obj = {
        id: count,
        number: seats[i]
      }
      tempArr.push(obj)
      count++;
      this.obj.busval[i] = false;
    }
    this.setState({
      seatsArray: tempArr
    }, () => {
      console.log(this.state.seatsArray)
    })
    if (this.obj.view === true) {
      document.getElementById("bus_details").style.display = 'none'
      this.obj.view = false
    } else {
      document.getElementById("bus_details").style.display = 'flex'
      this.obj.view = true
    }
    this.obj.fare = parseFloat(fare);
  }
  handleseatBook(e) {
    console.log(e + "")
    let id = e + "";
    if (this.obj.busval[e - 1] === false) {
      this.obj.fare1 = this.obj.fare1 + this.obj.fare;
      document.getElementById(id).style.backgroundColor = "#206ca0";
      this.obj.bookingSeat[this.obj.count++] = e;
      this.obj.busval[e - 1] = true;
    } else if (this.obj.busval[e - 1] === true) {
      document.getElementById(e + "").style.backgroundColor = "transparent";
      for (let i = 0; i < this.obj.bookingSeat.length; i++) {
        if (this.obj.bookingSeat.length === 1 || this.obj.bookingSeat[0] === e) {
          this.obj.bookingSeat.shift();
        } else if (this.obj.bookingSeat[i] === e) {
          this.obj.bookingSeat.splice(i, i);
        }
      }
      this.obj.busval[e - 1] = false;
      this.obj.count--;
      this.obj.fare1 = this.obj.fare1 - this.obj.fare;
    }
    document.getElementById("seatshow").innerHTML = this.obj.bookingSeat;
    document.getElementById("totalfare").innerHTML = this.obj.fare1 + ".00";
  }
  bookTicket = () => {
    if (this.obj.bookingSeat.length !== 0) {
      axios.get('http://localhost:8000/user/get-ticket-number')
        .then((Response) => {
          console.log(Response.data)
          History.push({
            pathname: '/passengerform',
            state: {
              bookingSeat: this.obj.bookingSeat,
              fare: this.obj.fare1,
              businfo: this.props.businfo,
              ticketnum: Response.data + ""
            }
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ errorMsg: "Error retreving data" })
        })

    } else {
      alert("Please Select Seat")
    }
  }
  render() {
    let seatsArray = this.state.seatsArray;
    let count = 1;
    return (
      <section className='showbus'>
        {
          this.props.businfo.length ?
            this.props.businfo.map(buses => <div><div className='showbus_container'>
              <div className='buslist1'  >
                <div className="bus_info_container">
                  <div className="bus_info_part bus_part1">
                    <h4>Bus Name: {buses.busname}</h4>
                    <p>Bus Type:{buses.bustype}</p>
                    <div><p>Travel Date:{buses.journeydate}</p></div>
                  </div>
                  <div className="bus_info_part bus_part2">
                    <h3>bus time {buses.journeytime}</h3>
                    <p>departur place: {this.props.fromlocation}</p>
                  </div>
                  <div className="bus_info_part bus_part3">
                    <p>travel time: {buses.journeytime}</p>
                  </div>
                  <div className="bus_info_part bus_part4">
                    <h3>reach time: {buses.reachtime}</h3>
                    <p>Arrivel place <br />{this.props.tolocation}</p>
                  </div>
                  <div className="bus_info_part bus_part5">
                    <h4>rating: {buses.busrating}</h4>
                  </div>
                  <div className="bus_info_part bus_part6">
                    <p>INR <span>{buses.fare}</span></p>
                  </div>
                  <div className="bus_info_part bus_part7">
                    <p>30 Seat Available</p>
                    <p>Total Seats: {buses.totalseats}</p>
                  </div>
                  <div className="bus_info_part bus_part8">
                    <button onClick={() => this.busDetails(buses.seats, buses.fare)}>View Seat</button>
                  </div>
                </div>
              </div>
            </div>
              <div className='bus_details' id='bus_details'>
                <div className='bus_layout_section'>
                  <div className='bus_layout'>
                    <div className='stearing'>
                      <img src={stearing} alt='/' />
                    </div>
                    <div className='seats'>
                      {
                        seatsArray && seatsArray.length ?
                          seatsArray.map(seat => <div className='seat_icon'><div className='imgc' style={{ backgroundColor: seat.number === "W" ? "#8e3374" : seat.number === "R" ? "#f25ac7" : seat.number === "X" ? "#918888" : "transparent" }}>
                            <img
                              src={seati}
                              id={count++ + ""}
                              alt='/'
                              style={{ backgroundColor: seat.number === "W" ? "#8e3374" : seat.number === "R" ? "#f25ac7" : seat.number === "X" ? "#918888" : "transparent" }}
                              onClick={seat.number === "X" ? null : () => this.handleseatBook(seat.id)} /></div>
                          </div>) : null
                      }
                    </div>
                  </div>
                </div>
                <div className='bus_info_single'>
                  <div className='seat_legend'>
                    <div className='available'><div className='available_seat' /><h6>Available</h6></div>
                    <div className='available'><div className='unavailable_seat' /><h6>Unavailable</h6></div>
                    <div className='available'><div className='women_seat' /><h6>Female</h6></div>
                  </div>
                  <div className="bus_ticket_info">
                    <div className='bus_destination'>
                      <h1>Boarding Point: <span>{this.props.fromlocation} </span></h1>
                      <h1>Boarding Point: <span>{this.props.tolocation} </span></h1>
                    </div>
                    <div className="seat_count">
                      <h4>Seat No:</h4>
                      <h6 ><span id='seatshow'></span></h6>
                    </div>
                    <div className='fairdetails'>
                      <h1>Fare Details</h1>
                      <div className='amount'>
                        <h3>Amount</h3>
                        <h3>INR <span id="totalfare" /> </h3>
                      </div>
                      <p>Taxes will be calculated during payment</p>
                    </div>
                    <div className='proceed_to_book'>
                      <div className='book_button' onClick={this.bookTicket}>
                        <h3 >PROCEED TO BOOK</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div></div>) :
            null
        }
        {this.props.businfo.errorMsg ? <div>{this.props.businfo.errorMsg}</div> : null}
      </section>
    )
  }
}

export default Showbuses
