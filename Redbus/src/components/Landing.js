import React, { Component } from 'react'
import '../styles/landing.css';
import axios from 'axios';
import History from './History'
export default class Landing extends Component {
    constructor(props){
        super(props)
        this.state={
            from:[],
            to:[],
            errorMsg:"",
            userCount:"",
            busCount :"" ,
            ticketCount :"",
            businfo:"",   
        }
        this.obj={
            fromcity:"",
            tocity:"",
            currentdate:""
        }
        this.obj2={
            flag1:false,
            flag2:true
        }
      }
    componentDidMount(){
        axios.get('http://localhost:8000/admin/landing-page')
        .then((Response) =>{
            this.setState({
                userCount:Response.data.userCount,
                busCount:Response.data.busCount,
                ticketCount:Response.data.ticketCount
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
      
    fromLocation=(e)=>{
        this.obj.fromcity=e.target.value;
        let fromcity=this.obj.fromcity;
        let city={fromcity,flag:"1"};
        axios.post('http://localhost:8000/user/get-StopAndCity',city)
        .then((response) =>{
           this.setState({
                from:response.data["data"]
           })
        })
        .catch((err)=>{
            console.log(err);
        })
        if(this.obj.fromcity===""){
            document.getElementById("location_from").style.visibility="hidden";
        }else{
            document.getElementById("location_from").style.visibility="visible";
        }
    }
    toLocation=(e)=>{
        this.obj.tocity=e.target.value;
        let tocity=this.obj.tocity;
        let city={tocity,flag:"2"};
        axios.post('http://localhost:8000/user/get-StopAndCity',city)
        .then((response) =>{
           this.setState({
            to:response.data["data"]
       })
        })
        .catch((err)=>{
            console.log(err);
        })
        if(this.obj.tocity!==""){
            document.getElementById("location_to").style.visibility="visible";
        }else{
            document.getElementById("location_to").style.visibility="hidden";
        }
    }
    storeLocation1(from){
        this.obj2.flag1=true;
        this.obj.fromcity=from+"";
        document.getElementById("location_from").style.visibility="hidden";
        document.getElementById("from").value=from+"";
    }
    storeLocation2(to){
        this.obj2.flag1=true;
        this.obj.tocity=to+"";
        document.getElementById("location_to").style.visibility="hidden";
        document.getElementById("to").value=to+"";
    }
    changeDate=(e)=>{
        this.obj.currentdate=e.target.value;
        console.log(this.obj.currentdate)
    }
    searchLocation=()=>{
        if(this.obj.fromcity==="" || this.obj.to===""){
            alert("please Select From And To Locations")
            return
        }
        if(this.obj2.flag1!==true && this.obj2.flag2!==true){
            alert("please Select From And To Locations")
        }
        let fromlocation=this.obj.fromcity+"";
        let tolocation=this.obj.tocity+"";
        let strToken1=fromlocation.split(",");  
        let strToken2=tolocation.split(",");
        console.log(tolocation);
        fromlocation=strToken1[0];
        let fromlocationcity=strToken1[1];
        tolocation=strToken2[0];
        let tolocationcity=strToken2[1];
        let date=new Date();
        let currenttime=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        let currentdate=this.obj.currentdate;
        console.log(currentdate);
        if(document.getElementById("date").value===""){
            alert("Please Enter Date");
            return;
        }
        axios.post('http://localhost:8000/user/get-busList-from-to',{fromlocation,fromlocationcity,tolocation,tolocationcity,currentdate,currenttime})
        .then((response) =>{
            console.log(response.data);
            if(response.data.length!==0){
                History.push({
                    pathname: '/buslist',
                    state: {
                        businfo:response.data,
                        fromlocation:this.obj.fromcity,
                        tolocation:this.obj.tocity
                    }
                })
            }
        }).catch((err)=>{
            console.log(err);
        })

    }
  render() {
    let {from,to}=this.state
    let str = from[0]+""
    let strToken=str.split(",");
    let date=new Date();
    let today=date.getFullYear()+"-0"+date.getMonth()+"-"+date.getDate();
    console.log(today)
    return (
      <div>
        <div className='container'>
            <div className='img'>
                <img src="landing_img.png" id='landing_img' className='landing' alt="img" width="100%" />
                <div className='buslisforsearch'> 
                    <div className='location'>
                        <span className='cityicon'><img src="city_icon.png" width="20" alt="" /></span>
                        <span><input type="text" id='from' placeholder='FROM' onClick={this.hideData1} onChange={this.fromLocation} onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15"/></span>
                        <span><img src="arrow.png" className='arrow' width="20"  alt="" /></span>
                        <span><img src="city_icon.png" width="20" alt="" /></span>
                        <span> <input type="text" id='to' placeholder='TO' onChange={this.toLocation} onKeyPress={(event)=> {if (!/^[a-zA-Z]+$/.test(event.key)){event.preventDefault();}}} maxLength="15"/></span>
                        <span><input type="date" id='date' placeholder='DATE' onChange={this.changeDate} min={today}/></span>
                        <span ><input type="button" className='search_button' onClick={this.searchLocation} value="Search Buses" /></span>
                    </div>
                    <div className='location_list'>
                        <div className='location_from' id='location_from'>
                        {
                            from.length?
                            from.map(from=><div className="location_list_option" onClick={()=>this.storeLocation1(from)}><p>{from}</p></div>):
                                null  
                            }
                            {from.errorMsg ? <div>{from.errorMsg}</div>:null}
                        </div>
                        <div className='location_to' id='location_to'>
                        {
                            to.length?
                            to.map(to=><div className="location_list_option" onClick={()=>this.storeLocation2(to)}><p>{to}</p></div>):
                                null  
                            }
                            {to.errorMsg ? <div>{to.errorMsg}</div>:null}
                        </div>
                    </div>
                </div>  
                <div className='offers'>
                    <div className='offer1'>
                        <img src="first.png" alt="" />
                        <p><h3>SAVE UPTO RS 250* ON YOUR BUS TICKETS.</h3>
                        Book your favourite seat now.
                        </p>
                    </div>
                    <div className='coupon'>
                        <div className='coupon1'>
                            <p>Save upto Rs 300 on Ap and TS route</p>
                            <img src="superhit.png" alt="" />
                            <p>Use Code SUPERHIT</p>
                        </div>
                         <div className='coupon2'>
                            <p>Save upto Rs 200 on Delhi and North routes</p>
                            <img src="rb200.png" alt="" />
                            <p>Use code RB200</p>
                        </div>
                    </div>
                </div>
                <div className='promise'>
                    <div className='p_logo'>
                        <img src="promise.png" alt="img" />
                    </div>
                    <div className=''>
                        <h1>WE PROMISE TO DELIVER</h1>
                    </div>
                    <div className='box' id="box">
                        <div className='benefits'>
                            <img src="/benefits.png" alt="img" />
                            <p>UNMATCHED BENEFITS</p>
                            <br />
                            <p id='a'>We take care of your travel beyond ticketing by providing you with innovative and unique benefits.</p>
                        </div>
                         <div className='benefits'>
                            <img src="/customer_care.png" alt="img" />
                            <p>SUPERIOR CUSTOMER SERVICE</p>
                            <br />
                            <p id='b'>We put our experience and relationships to good use and are available to solve your travel issues.</p>
                        </div>
                         <div className='benefits'>
                            <img src="/lowest_Fare.png"  alt="img" />
                            <p>LOWEST PRICES</p>
                            <br />
                            <p id='c'>We always give you the lowest price with the best partner offers.</p>
                        </div>
                    </div>
                    <div className='box1'>
                        <h1>AWARDS & RECOGNITION</h1>
                        <div className='links'>
                            <a href="https://www.business-standard.com/article/companies/bs-annual-awards-saluting-the-spirit-of-entrepreneurship-114033100015_1.html" target="_blank"><img src="Business_Standard1.png" alt="img" /><p>Most Innovative Company</p></a>
                            <a href="https://thebrandtrustreport.wordpress.com/tag/redbus-in/" className='Brand_Trust' target="_blank"><img src="Brand_Trust_Report.png"  alt="img" /><p>Most Trusted Brand</p></a>
                            <a href="https://eyefortravelblog.blogspot.com/2014/04/winners-of-mobile-innovation-in-travel.html" className='eye_for_travel' target="_blank"><img src="Eye_For_Travel1.png"  alt="img" /><p>Mobile Innovation Award</p></a>
                        </div>
                    </div>
                    <div className='countries'>
                        <h1>OUR GLOBAL PRESENCE</h1>
                        <div className='row1'>
                            <a href=""> <img src="indian-Flag.png" alt=""  height="200" /><p>INDIA</p></a>
                            <a href="" className='colombia'> <img src="colombia.png" alt="" height="130" width="250" /><p>COLOMBIA</p></a>
                            <a href="" className='indonesia'> <img src="indonesia.png" alt=""  height="150"/><p>INDONESIA</p></a>
                        </div>
                        <div className='row2'>
                            <a href=""> <img src="Malaysia.png"  alt=""  /><p>MALAYSIA</p></a>
                            <a href="" className='peru'> <img src="peru.png" alt="" /><p>PERU</p></a>
                            <a href="" className='singapore'> <img src="singapore.png" alt=""/><p>SINGAPORE</p></a>
                        </div>
                    </div>
                    <div className='numbers'>
                        <h1>THE NUMBERS ARE GROWING!</h1>
                        <div className='row'>
                        <div className='customers'>
                            <h3>CUSTOMERS</h3>
                            <h1>{this.state.userCount} M</h1>
                            <p>redBus is trusted by over 36 million happy customers globally</p>
                        </div>
                        <div className='operators'>
                            <h3>BUSES</h3>
                            <h1>{this.state.busCount} K</h1>
                            <p>network of over 3500 bus operators worldwide</p>
                        </div>
                        <div className='bus_tickets'>
                            <h3>BUS TiCKETS</h3>
                            <h1>{this.state.ticketCount} M</h1>
                            <p>Over {this.state.ticketCount} million trips booked using redBus</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
