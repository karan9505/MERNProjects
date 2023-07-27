import React, { Component } from 'react'
import axios from 'axios'
export default class EditRoute extends Component {
    constructor(props){
        super(props)
        this.obj={
            fromlocation:"",
            fromlocationcity:"",
            tolocation:"",
            tolocationcity:"",
            distance:"",
            registrationdate:"",
        }
    };
        handleChange1=(e)=>{
            this.obj.fromlocation=e.target.value
        }
        handleChange2=(e)=>{
            this.obj.fromlocationcity=e.target.value
        }
        handleChange3=(e)=>{
            this.obj.tolocation=e.target.value
        }
        handleChange4=(e)=>{
            this.obj.tolocationcity=e.target.value
        }
        handleChange6=(e)=>{
            this.obj.distance=e.target.value
        }
        handleChange8=(e)=>{
            this.obj.registrationdate=e.target.value
        }

        handleChange=(e)=>{
            e.preventDefault();
            
            console.log(this.obj);
            axios.post('http://localhost:8000/admin/update-route',this.obj)
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
            <h1>ADD <span id='bus'>BUS</span> ROUTE </h1>
            <div className='box'>
                <div className='box1'>
                    <p>Frome Location:-</p>
                    <input type="text" id='fromelocation' onChange={this.handleChange1} placeholder='From' />
                    <p>From Location City:-</p>
                    <input type='text' id="fromelocationcity" onChange={this.handleChange2} placeholder='city name'/>
                        
                    <p>To Location:-</p>
                    <input type="text" id='tolocation' onChange={this.handleChange3} placeholder='To'/>
                    <p>To Location City:-</p>
                    <input type="text" id=' tolocationcity' onChange={this.handleChange4} placeholder='to city name' />
                    <p>Distance</p>
                    <input type="text" id='distance' onChange={this.handleChange6} placeholder='enter total distance' />
               
                    <p>Registration Date:-</p>
                    <input type='date' id="registrationdate" onChange={this.handleChange8} placeholder='bus registration date'/>
                    </div>
                <input type="button" id='add' onClick={this.handleChange} value="Add route" />
            </div>
        </div>
      </div>
    )
  }
}
