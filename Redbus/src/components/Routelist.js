import React, { Component } from 'react'
import axios from 'axios';
import '../styles/routelist.css';
export default class Routelist extends Component {
    constructor(props) {
        super(props)
      
        this.state={
          routes:[],
          errorMsg:""
  
        }
      }
       componentDidMount(){
          console.log("hello")
            axios.get("http://localhost:8000/admin/show-routes-all")
            .then(response=>{
                console.log(response)
                this.setState({routes:response.data.body})
            })
           .catch(error=>{
                console.log(error)
                this.setState({errorMsg:"Error retreving data"})
            })
         }
       delRoute=(e)=>{
        let routeid=e.routeid
        axios.post('http://localhost:8000/admin/delete-route',{routeid})
        .then((Response) =>{
            console.log(Response.data);
            if(Response.data===1){
              axios.get("http://localhost:8000/admin/show-routes-all")
              .then(response=>{
                  console.log(response)
                  this.setState({routes:response.data.body})
              })
            .catch(error=>{
                  console.log(error)
                  this.setState({errorMsg:"Error retreving data"})
              })
            }
        })
        .catch((err)=>{
            console.log(err);
            this.setState({errorMsg:"Error retreving data"})
        })
         
       }
  render() {
    const {routes}=this.state
    console.log(this.props.search)
    return (
      <div>
      <section className='showbus'>
      {
      routes.length?
      routes.map(routes=><div className='showbus_container'>
      <div className='buslist1'>
          <div className="bus_info_container">
              <div className="bus_info_part bus_part2">
                <h3>From Location: {routes.fromlocation}</h3>
                <p>From Location City: {routes.fromlocationcity}</p>
              </div>
              <div className="bus_info_part bus_part3">
                <p>Distance: {routes.distance}</p>
              </div>
              <div className="bus_info_part bus_part4">
                <h3>To Location: {routes.tolocation}</h3>
                <p>To Location City: {routes.tolocationcity}</p>
              </div>
             
              <div className="bus_info_part bus_part6">
                <p>Registration Date: <span><h3>{routes.registrationdate}</h3></span></p>
              </div>
             
              <div className="bus_info_part bus_part8">
              
                <button onClick={this.editRoute}>Edit Rout</button>
                <button onClick={()=>this.delRoute(routes)}>Delet Rout</button>
              </div>
          </div>
      </div>
  </div>):
          null  
      }
      {routes.errorMsg ? <div>{routes.errorMsg}</div>:null}
      {/* <div className='showbus_container'>
          <div className='buslist1' onClick={()=>this.handlebusClick(buses)}>
              <div className="bus_info_container">
                  
                  <div className="bus_info_part bus_part2">
                    <h3>departure time</h3>
                    <p>departure place</p>
                  </div>
                  <div className="bus_info_part bus_part3">
                    <p>travel time</p>
                  </div>
                  <div className="bus_info_part bus_part4">
                    <h3>reach time</h3>
                    <p>Arrivel place <br/> with date</p>
                  </div>
                 
                  <div className="bus_info_part bus_part6">
                    <p>INR <span><h3>4666.67</h3></span></p>
                  </div>
                  
                  <div className="bus_info_part bus_part8">
                  
                  <button id='edit'>Edit Rout</button>
                  <button id='delet'>Delete Rout</button>
                  </div>
              </div>
          </div>
      </div> */}
    </section>
      </div>
    )
  }
}
