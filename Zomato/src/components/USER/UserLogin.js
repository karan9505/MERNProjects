import React, { Component } from 'react';
import '../CSS/Userlogin.css'
import axios from 'axios';
import History from '../History';
export default class UserLogin extends Component {

  constructor(props){
    super(props);
    this.userPhoneNumber = this.props.phh;  // this.props.userPhoneNumber
  }

  showFoods = (e) =>{
    History.push({
      pathname:"/User",
      state:{
        phonenum:this.userPhoneNumber
      }
    })
  }

  showRestaurants = (e) =>{
    console.log("CHECK : ",this.userPhoneNumber)
    History.push({
      pathname:"Userrestaurant",
      state:{
        phonenum:this.userPhoneNumber
      }
    })
  }

  showOrders = (e) =>{
    History.push({
      pathname:"Orders",
      state:{
        phonenum:this.userPhoneNumber
      }
    })
  }

  back=()=>
    {
      console.log("OKK")
        History.push({
            pathname:"/User",
            state:{
                phonenum:this.userPhoneNumber
            }
        })
  }

  logout=()=>
    {
        axios.post("http://localhost:8000/zomato/user/logout",{phonenumber:this.userPhoneNumber })
        .then((resp)=>
        {
            console.log(resp.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
        History.push('/')
    }

  render() {
    return (
    <>
    <div id="Adlogback"></div>
    <div id="Admintag">
        <img src='../IMAGES/Userpic.png' alt='Not found'></img>
        <p>USER</p>
    </div>
    <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
    <img src="../IMAGES/Logout.png" alt="Not found" className='Logout' onClick={this.logout}></img>
    <div className='UserLoginBack'>
        <div className='UserLoginButton'>
            <button className='ShowFoodUsrB' onClick={this.showFoods}>Foods</button>
            <button className='ShowResUsrB' onClick={this.showRestaurants}>Restaurants</button>
            <button className='ShowOrderUsrB' onClick={this.showOrders}>My Orders</button>
        </div>
    </div>
    </>
    )
  }
}