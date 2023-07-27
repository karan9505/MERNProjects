import React, { Component } from 'react'
import axios from 'axios';
import History from './History';
export default class AssignRoutes extends Component {
    constructor(props){
        super(props)
        this.obj={
            busname:"",
            routeid:"",
            departuretime:"",
            totalseats:"",
            seats:"",
            reservedseats:"",
            reachtime:"",
            journeyday:"sunday",
            journeydate:"",
            journeytime:"",
            fare:""
        }
        this.state={
            buses:[],
            routes:[],
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
        handleChange5=(e)=>{
            this.obj.departuretime=e.target.value+":00"
        }
        handleChange6=(e)=>{
            this.obj.distance=e.target.value
        }
        handleChange7=(e)=>{
            this.obj.reachtime=e.target.value+":00"
        }
        handleChange8=(e)=>{
            this.obj.registrationdate=e.target.value
        }
        handleChange9=(e)=>{
            this.obj.journeyday=e.target.value
        }
        handleChange10=(e)=>{
            this.obj.journeydate=e.target.value
        }
        handleChange11=(e)=>{
            this.obj.journeytime=e.target.value+":00"
        }
        handleChange12=(e)=>{
            this.obj.fare=e.target.value;
        }

        assignRoute=()=>{
            axios.get('http://localhost:8000/admin/show-buses')
            .then((Response) =>{
                this.setState({
                    buses:Response.data.body
                    
                })
                // this.obj.busname=Response.data.body.busname;
                // this.obj.totalseats=Response.data.body.totalseats;
                // this.obj.reservedseats=Response.data.body.reservedseats;
                // this.obj.seats=Response.data.body.seats;
                // console.log(this.obj)
            })
        }
        componentDidMount(){
            axios.get('http://localhost:8000/admin/show-buses')
            .then((Response) =>{
                this.setState({
                    buses:Response.data.body
                })
                console.log(this.state.buses)
            })
            .catch((err)=>{
                console.log(err);
                this.setState({errorMsg:"Error retreving data"})
            })
            axios.get("http://localhost:8000/admin/show-routes-all")
            .then(response=>{
                this.setState({routes:response.data.body})
            })
           .catch(error=>{
                console.log(error)
                this.setState({errorMsg:"Error retreving data"})
            })
        }
        selectBus=(e)=>{
            console.log("hello")
            let bus=e.target.value
            let val=this.state.buses[bus]
            this.obj.busname=val.busname;
                this.obj.totalseats=val.totalseats+"";
                this.obj.reservedseats=val.reservedseats;
                this.obj.seats=val.seats;
        }
        selectRoute=(e)=>{
            let route=e.target.value
            let val=this.state.routes[route]
            this.obj.routeid=val.routeid+""
                console.log(this.obj)
        }
        handleChange=(e)=>{
            console.log(this.obj)
            axios.post('http://localhost:8000/admin/assign-route',this.obj)
            .then((response)=>{
                console.log(response);
                History.push("/adminbuslist")
            })
            .catch((err=>{
                console.log(err.massage)
            }))
            
        }
  render() {
    let {buses,routes}=this.state
    let count1=0;
    let count2=0;
    return (
      <div>
        <div id='addbus'>
            <h1>Assign <span id='bus'>BUS</span> ROUTE </h1>
            <div className='box'>
                <div className='box1'>
                    <p>Choose a Bus Name:</p>
                    <select name="bus" id="bus-select" onChange={(e)=>this.selectBus(e)}>
                        {
                        buses.length?
                        buses.map(buses=><option key={count1} value={count1++}>{buses.busname}</option> ):
                            null  
                        }
                        {buses.errorMsg ? <div>{buses.errorMsg}</div>:null}
                    </select>
                    <br/>
                    <p>Choose a Route:</p>
                    <select name="route" id="route-select" onChange={(e)=>this.selectRoute(e)}>
                        {
                        routes.length?
                        routes.map(routes=><option key={count2} value={count2++}>{routes.fromlocation},{routes.fromlocationcity} to {routes.tolocation},{routes.tolocationcity}</option> ):
                            null  
                        }
                        {routes.errorMsg ? <div>{routes.errorMsg}</div>:null}
                    </select>
                    <p>Departure Time:-</p>
                    <input type="time" id='departure' onChange={this.handleChange5} placeholder='departure time' />
                </div>
                <div className='box2'>
                    <p>Reach Time:-</p>
                    <input type="time" id='reachtime' onChange={this.handleChange7} placeholder='enter reach time' />
                    <p>Journy Day:-</p>
                    <select name="journeyday" id="seat" onChange={this.handleChange9} placeholder='Select Journey Day'>
                        <option value="sunady">Sunday</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                    </select>
                    <p>Journy Date:-</p>
                    <input type="date" id= 'journeydate' onChange={this.handleChange10} placeholder='journey date' />
                    <p>Journy Time:-</p>
                    <input type="time" id= 'journeytime' onChange={this.handleChange11} placeholder='journey date' />
                    <p>Fare:</p>
                    <input type="text" id='fare' onChange={this.handleChange12} placeholder='enter amount' onKeyPress={(event)=> {if (!/^[0-9]+$/.test(event.key)){event.preventDefault();}}} maxLength="5"/>
                </div>
                <input type="button" id='add' onClick={this.handleChange} value="Add route" />
            </div>
        </div>
      </div>
    )
  }
}
