import React, { Component } from 'react'
import axios from 'axios';
import '../styles/addbus.css';
export default class Addbus extends Component {
    constructor(props){
        super(props)
        this.obj={
            busname:"",
            bustype:"",
            rating:"0",
            totalseats:"",
            reservedseats:""
        }
    };
        handleChange1=(e)=>{
            this.obj.busname=e.target.value
        }
        handleChange2=(e)=>{
            this.obj.bustype=e.target.value;
            console.log(this.obj.bustype);
        }
        handleChange3=(e)=>{
            this.obj.rating=e.target.value
        }
        handleChange4=(e)=>{
            this.obj.totalseats=e.target.value;
            console.log(this.obj.totalseats)
        }
        handleChange5=(e)=>{
            this.obj.reservedseats=e.target.value
        }

        handleChange=(e)=>{
            e.preventDefault();
            console.log("abc");
            console.log(this.obj);
            axios.post('http://localhost:8000/admin/add-bus',this.obj)
            .then((res)=>{
              
              console.log(res)
            })
            .catch((err=>{
              console.log(err.message)
            }))
        }

    
     render() {
    return (
      <div>
        <div id='addbus'>
            <h1>ADD NEW <span id='bus'>BUS</span> </h1>
            <div className='box'>
                <p>BUS NAME:-</p>
                <input type="text" id='busname' onChange={this.handleChange1} placeholder='enter bus name'  onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15"/>
                <p>BUS TYPE:-</p>
                <select name="bustype" id="bustype"  onChange={this.handleChange2} placeholder='select bus type'>
                    <option value="AC">AC</option>
                    <option value="nonAC">NON AC</option>
                </select>
                <p>Number of Seat:-</p>
                <select name="seat" id="seat" onChange={this.handleChange4} placeholder='select bus type'>
                    <option value="20">20</option>
                    <option value="24">24</option>
                </select>
                <p>Reserved Seat:-</p>
                <input type="text" id='reservedseats' onChange={this.handleChange5} placeholder='no of reserved seat' onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15"/>
                <input type="button" id='add' onClick={this.handleChange} value="Add Bus" />
            </div>
        
        </div>
      </div>
    )
  }
}
