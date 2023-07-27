import React, { Component } from 'react'
import '../styles/dashboard.css';
import History from './History';
export default class Dashboard extends Component {
  addBus=()=>{
    History.push("/addbus")
  }
  dashBoard=()=>{
    History.push("/adminbuslist")
  }
  addroute=()=>{
    History.push("/addroute")
  }
  showRoute=()=>{
    History.push("/routelist")
  }
  assignRoute=()=>{
    History.push("/assignroute")
  }
  render() {
    return (
      <div>
        <div  className='Dashboard'>
            <div className='dash'>
                <div className='admininfo'>
                    <h3>ADMIN</h3>
                    <img src="admin.png" id='admin' alt="" height="60px" width="50px" />
                </div>
                
                <div className='link'>
                    <p onClick={this.dashBoard}  id='dashboard'>Dashboard</p>
                    <p onClick={this.addBus} id='addbus1'>Add Bus</p>
                    <p onClick={this.addroute}  id='addroute'>Add Route</p>
                    <p onClick={this.showRoute}  id='addroute'>Show Route</p>
                    <p onClick={this.assignRoute}  id='addroute'>Assign Route</p>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
