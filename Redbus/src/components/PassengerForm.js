import React, { Component } from 'react'
import '../styles/passengerForm.css';
import axios from 'axios';
import History from './History';

export default class PassengerForm extends Component {
    constructor(props){
        super(props)
        this.state={
            bookingSeat:this.props.location.state.bookingSeat,
            fare:this.props.location.state.fare,
            businfo:this.props.location.state.businfo[0],
            ticketnum:this.props.location.state.ticketnum
        }
        this.obj={
            passengerlist:[],
            email:""
        }
      }

    componentDidMount(){
        console.log(this.state.bookingSeat);
        
        let passengerlist=[];
        for(let i=0; i<this.state.bookingSeat.length; i++){
            const obj={
                firstname:"",
                lastname:"",
                age:"",
                gender:"M",
                seatno:"",
            }
            passengerlist.push(obj);
        }
        this.obj.passengerlist=passengerlist;
    }
     
    handleLastName(e,index){
         this.obj.passengerlist[index].lastname=e.target.value;
         console.log(this.obj.passengerlist);
         this.obj.passengerlist[index].seatno=this.state.bookingSeat[index]+"";
    }
   
    handleFirstName(e,index){
        this.obj.passengerlist[index].firstname=e.target.value;
         console.log(this.obj.passengerlist);
         this.obj.passengerlist[index].seatno=this.state.bookingSeat[index]+"";
    }
    handleGender(e,index){
        this.obj.passengerlist[index].gender=e.target.value;
    }
    handleAge(e,index){
        this.obj.passengerlist[index].age=e.target.value;
    }
    emailHandle=(e)=>{
        if(e.target.value==="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"){
            this.obj.email=e.target.value;
        }
        console.log(this.obj.email)
    }

    onProcced = () => {
        let date= new Date();
        const {businfo} = this.state;
        let reqBody = businfo;
        reqBody["passengers"] = this.obj.passengerlist;
        reqBody["bookdate"]=date.getFullYear()+"-0"+date.getMonth()+"-"+date.getDate();
        reqBody["booktime"]=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        reqBody["modeofpayment"]="upi";
        reqBody["price"]=this.state.fare+"";
        reqBody["numberofpassenger"]=this.state.bookingSeat.length+"";
        reqBody["phoneno"]=localStorage.getItem("phoneno");
        reqBody["ticketnum"]=this.state.ticketnum+"";
        console.log(reqBody);
        console.log(date);
        localStorage.setItem("ticketnum",this.state.ticketnum+"");
        axios.post('http://localhost:8000/user/book-Seats',reqBody)        
        .then((Response) =>{
            console.log(Response.data);
            History.push("/ticket")
            
        })
        .catch((err)=>{
            console.log(err);
            this.setState({errorMsg:"Error retreving data"})
        })       
    }
  
 
  render() {
    let seatCount=this.state.bookingSeat;
    let count=1;
    console.log(seatCount)
    return (
      <div className='Passengerinfo_section'>
        <div className='passengerinfo'>
            <h1 id='p_info_heading'>Passenger Details</h1>
            <div className='passengerinfo1'>
                <h3 id='passenger'><img src="passenger.png" alt="img" />Passenger Information</h3>
                <div className='passengerinfo2'>

                {
                    seatCount.length?
                    seatCount.map((seatCount,index)=><div className='passenger1'>
                    <div className='p_info'>
                        <p id='p_no'>Passenger:-{count++}</p>
                        <p id='p_seatno'>SeatNo:-{seatCount}</p>
                    </div>
                    <div className='p_name'>
                        <div className='p_name1'>
                            <p>First Name:-</p>
                            <input type="text" id='p_name' placeholder='Name' onChange={(e)=>this.handleFirstName(e,index)} onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15"/>
                        </div>
                        <div className='p_name2'>
                            <p>Last Name:-</p>
                            <input type="text" id='p_name' placeholder='Name' onChange={(e)=>this.handleLastName(e,index)} onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15"/>
                        </div>
                    
                    </div>
                    <div className='p_gender'>
                    
                        <div id='gender'>
                            <p>Gender</p>
                            <select name="genderoption" id="selectgender" placeholder='selectoption' onChange={(e)=>this.handleGender(e,index)} required>   
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        <div className='p_age'>
                            <p id='age'>Age</p>
                            <input type="text" id='p_age' onChange={(e)=>this.handleAge(e,index)} onKeyPress={(event)=> {if (!/^[0-9]+$/.test(event.key)){event.preventDefault();}}} maxLength="2"/>
                        </div>
                    </div>
                    <div className='p_city'>
                        <p id='pcity'>City Of Residence</p>
                        <input type="text" id='p_city' placeholder='Enter city name' onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15" />
                    </div>
                    <div className='p_state'>
                        <p id='pstate'>State Of Residence</p>
                        <input type="text" id='p_city' placeholder='Enter state name' onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15" />
                    </div>
                </div>):null
                }
                <div className='p_contact_details'>
                    <h3 id='c_details'><img src="contact.png" alt="img" id='contact_img' /> Contact Details</h3>
                </div>
                <div className='p_contact_details1'>
                    <p id='ticket_sent'>Your ticket will be sent to these details</p>
                    <div className='p_email'>
                        <p id='p_mail'>Email ID</p>
                        <input type="email" id='pemail' onChange={this.emailHandle} />
                    </div>
                    <div className='p_phone'>
                        <p id='pphone'> Phone</p>
                        <input type="text"  onKeyPress={(event)=> {if (!/^[0-9]+$/.test(event.key)){event.preventDefault();}}} maxLength="10"/>
                    </div>
                </div>
            </div>
            </div>
            <h6 id='p_agree'>By clicking on proceed, I agree that I have read and understood the TnCs and the Privacy Policy</h6>
            <div className='pay_button'>
                <h3 id='t_amount'> TotalAmount:- {this.state.fare} RS</h3>
                <button id='procedtopay' onClick={()=>{this.onProcced()}}> Proced To Pay </button>
            </div>
        </div>
      </div>
    )
  }
}
