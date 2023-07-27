import React, { Component } from 'react'
import '../styles/cancel.css';
import axios from 'axios';
import History from './History';
export default class Cancel extends Component {
    constructor(props) {
        super(props);
        this.obj = {
          ticket_No:"",
          phoneno:"",  
        };
  
      };
  
      handleChange1 = (e) =>{
        
          console.log(e.target.value);
          this.obj.ticket_No = e.target.value
        
       
      }
      
      handleChange2 = (e) =>{
          this.obj.phoneno=e.target.value
  
      }
     
        
  
      deleteticket = (e) =>{
        if(document.getElementById("ticket_No").value==="" || document.getElementById("phoneno").value===""){
          alert("Enter Valid Data");
          return;
        }
         let phoneno=this.obj.phoneno;
         let ticketnum=this.obj.ticket_No;
        e.preventDefault();
        console.log(this.obj);
        axios.post('http://localhost:8000/user/delete-ticket',{phoneno,ticketnum}) // method post
          .then((res)=>{
            alert("Ticket Successfully Deleted")
            console.log(res);
            History.push("/");
          })
          .catch((err=>{
            console.log(err.message)
          }))
      }
  render() {
    return (
      <div className='canclet'>
        <div className='cancel_ticket'>
            <h1>Cancel Your Ticket</h1>
            <div className='info'>
                <input type="text" id='ticket_No' onChange={this.handleChange1} placeholder="Enter ticket No" />
                <input type="phone" id='phoneno' onChange={this.handleChange2} placeholder="Enter Mobile No"  onKeyPress={(event)=> {if (!/[0-9]/.test(event.key)){event.preventDefault();}}} minLength='10' maxLength='10'/>
            
            </div>
            <input type="button" className='select' id='select_passanger' onClick={this.deleteticket} value="Cancle Ticket" />
        </div>
      </div>
    )
  }
}
