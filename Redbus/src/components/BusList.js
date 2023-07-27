import React, { Component } from 'react'
import '../styles/styleBusList.css'
import suffule from '../images/icons8-sorting-arrows-horizontal-32.png'
import Showbuses from './Showbuses';
import axios from 'axios';

class BusList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         businfo:this.props.location.state.businfo,
         fromlocation:this.props.location.state.fromlocation,
         tolocation:this.props.location.state.tolocation
      }
    }
    sortRating=()=>{
        let fromlocation=this.state.fromlocation+"";
        let tolocation=this.state.tolocation+"";
        let strToken1=fromlocation.split(",");  
        let strToken2=tolocation.split(",");
        console.log(tolocation);
        fromlocation=strToken1[0];
        let fromlocationcity=strToken1[1];
        tolocation=strToken2[0];
        let tolocationcity=strToken2[1];
        let date=new Date();
        let currenttime=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        let currentdate=date.getFullYear()+"-0"+date.getMonth()+"-"+date.getDate();
        console.log(currentdate);
        axios.post('http://localhost:8000/user/get-busList-from-to-sortbyrating',{fromlocation,fromlocationcity,tolocation,tolocationcity,currentdate,currenttime})
        .then((response) =>{
            console.log(response.data);
            this.setState({
                businfo:response.data
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    sortFare=()=>{
        let fromlocation=this.state.fromlocation+"";
        let tolocation=this.state.tolocation+"";
        let strToken1=fromlocation.split(",");  
        let strToken2=tolocation.split(",");
        console.log(tolocation);
        fromlocation=strToken1[0];
        let fromlocationcity=strToken1[1];
        tolocation=strToken2[0];
        let tolocationcity=strToken2[1];
        let date=new Date();
        let currenttime=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        let currentdate=date.getFullYear()+"-0"+date.getMonth()+"-"+date.getDate();
        console.log(currentdate);
        axios.post('http://localhost:8000/user/get-busList-from-to-sortbyfare',{fromlocation,fromlocationcity,tolocation,tolocationcity,currentdate,currenttime})
        .then((response) =>{
            console.log(response.data);
            this.setState({
                businfo:response.data
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    sortDeparture=()=>{
        let fromlocation=this.state.fromlocation+"";
        let tolocation=this.state.tolocation+"";
        let strToken1=fromlocation.split(",");  
        let strToken2=tolocation.split(",");
        console.log(tolocation);
        fromlocation=strToken1[0];
        let fromlocationcity=strToken1[1];
        tolocation=strToken2[0];
        let tolocationcity=strToken2[1];
        let date=new Date();
        let currenttime=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        let currentdate=date.getFullYear()+"-0"+date.getMonth()+"-"+date.getDate();
        console.log(currentdate);
        axios.post('http://localhost:8000/user/get-busList-from-to-sortbyDeparture',{fromlocation,fromlocationcity,tolocation,tolocationcity,currentdate,currenttime})
        .then((response) =>{
            console.log(response.data);
            this.setState({
                businfo:response.data
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
  render() {
    console.log("hello2")
    console.log(this.state.businfo);
    return (
      <section className='buslist'>
        <div className='buslist_container'>
            {/* <div className='journey_details'>
                <div className="journey_details_container">
                    <div className="journey_place">
                        <p>FROM</p>
                        <input type='text' name='from_location'></input>
                    </div>
                    <div className='suffule'><img src={suffule} alt='/'/></div>
                    <div className="journey_place">
                        <p>To</p>
                        <input type='text' name='to_location'></input>
                    </div>
                    <div className="journey_place">
                        <p>DATE</p>
                        <input type='date' name='date'></input>
                    </div>
                    <div className='search_button'>
                        <div className='button'>SEARCH</div>
                    </div>
                </div>
            </div> */}
            <div className='journey_slogan'>
                <h4>All bus ratings include safety as a major factor</h4>
            </div>
            <div className='bus_sort'>
                <div className='bus_count'>
                    <h4>Buses <span>found</span></h4>
                </div>
                <div className='sortby'>
                    <h4>Sort By:</h4>
                    <p onClick={this.sortDeparture}>Departure</p>
                    <p onClick={this.sortRating}>Ratings</p>
                    <p onClick={this.sortFare}>Fare</p>
                </div>
            </div>
            <Showbuses businfo={this.state.businfo} fromlocation={this.state.fromlocation} tolocation={this.state.tolocation}/>
        </div>
      </section>
    )
  }
}

export default BusList
