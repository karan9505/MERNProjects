import React, { Component } from 'react'
import axios from 'axios';
import '../styles/addbus.css';
import History from './History';
export default class Updatebus extends Component {
    constructor(props){
        super(props)
        this.obj={
            busname:this.props.location.state.bus.busname,
            bustype:"",
            totalseats:"",
            reservedseats:"",
            busid:this.props.location.state.bus.busid+""
        }
        this.state={
            bus:this.props.location.state.bus,
        }
    };
        handleChange1=(e)=>{
            this.obj.busname=e.target.value;
        }
        handleChange2=(e)=>{
            this.obj.bustype=e.target.value;
            console.log(e)
        }
        handleChange4=(e)=>{
            this.obj.totalseats=e.target.value
        }
        handleChange5=(e)=>{
            this.obj.reservedseats=e.target.value
        }
        componentDidMount(){
            document.getElementById('busName').value = this.state.bus.busname;  
            document.getElementById('seat').value = this.state.bus.totalseats;
            document.getElementById('reservedSeat').value = this.state.bus.reservedseats;
        }

        handleChange=(e)=>{
            console.log(this.obj)
            e.preventDefault();
            console.log("abc");
            console.log(this.obj);
            axios.post('http://localhost:8000/admin/update-bus',this.obj)
            .then((res)=>{
                console.log(res)
                if(res===1){
                    History.push("/BuslistAdmin")
                }
            })
            .catch((err=>{
              console.log(err.message)
            }))
        }
  render() {
    return (
      <div>
      <div id='addbus'>
      <h1>UPDATE <span id='bus'>BUS</span> </h1>
      <div className='box'>
          <p>BUS NAME:-</p>
          <input type="text" id='busName' onChange={this.handleChange1} placeholder='enter bus name' />
          <p>BUS TYPE:-</p>
          <select name="busType" id="busType" onChange={this.handleChange2} placeholder='select bus type'>
              <option value="AC">AC</option>
              <option value="nonAC">NON AC</option>
          </select>
          <p>Number of Seat:-</p>
          <select name="seat" id="seat" onChange={this.handleChange4} placeholder='select bus type'>
              <option value="20">20</option>
              <option value="24">24</option>
          </select>
          <p>Reserved Seat:-</p>
          <input type="text" id='reservedSeat' onChange={this.handleChange5} placeholder='no of reserved seat' />
          <input type="button" id='add' onClick={this.handleChange} value="UPDATE" />
      </div>
  
  </div>
      </div>
    )
  }
}
