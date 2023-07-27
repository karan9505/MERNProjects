import React, { Component } from 'react'
import axios from 'axios';
import '../CSS/Orderhis.css'
import History from '../History';
export default class UserOrders extends Component {

  constructor(props){
    super(props);
    this.userPhoneNumber = this.props.location.state.phonenum;  // Demo String   // this.props.userPhoneNumber
    console.log(this.userPhoneNumber    )
    this.state = {obj : []};
  }

  rateOrder = (e) =>{
    
    if(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 5)].orderflag == '1'){
        alert("Already Rated");
    }else{
        History.push({
            pathname:"/Rate",
            state:{
                obj:this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 5)],
                phonenum:this.userPhoneNumber
            }
        })
        console.log("Redirect to rating page with props given below");
        console.log(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 5)]);
        // this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 5)] & this.userPhoneNumber
    }
  }

  componentDidMount(){
    console.log(typeof(this.userPhoneNumber))
    axios.post("http://localhost:8000/zomato/user/get-all-order-details", {phonenumber : this.userPhoneNumber})
    .then((resp)=>{
      this.setState({obj : resp.data});
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  back=()=>
    {
        History.push({
            pathname:"/User",
            state:{
                phonenum:this.userPhoneNumber
            }
        })
    }

  render() {
    if(this.state.obj.length == 0){
      return (
        <>
        <div id="Adlogback"></div>
        <div id="Admintag">
            <img src='../IMAGES/Userpic.png' alt='Not found' onClick={this.back}></img>
            <p>USER</p>
        </div>
        <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
        <div className='ordback'>
            <h1 id="arhead">Your History</h1>
        <div className='UserOrders'>
          <p id="nrp">No Orders Placed</p>
        </div>
        </div>
        </>
      )
    }else{
      return (
        <>
        <div id="Adlogback"></div>
        <div id="Admintag">
            <img src='../IMAGES/Userpic.png' alt='Not found' onClick={this.back}></img>
            <p>USER</p>
        </div>
        <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
        <div className='ordback'>
            <h1 id="arhead">Your History</h1>
        <div className='UserOrders'>
         {
          this.state.obj.map((value, index)=>{
            
            return(
              <div className='Order' key={index} id={'order'+index}>
                <h3>Order ID : {value.orderid}</h3>
                <h4>Order from Restaurant : {value.restaurantname}</h4>
                <h4>Order Deliverd on : {value.deliveryaddress}</h4>
                <div>
                  <h4>Order Details</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Food Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        value.orderFoodItems.map((food,i)=>{
                          return(
                            <tr key={i}>
                              <td>{food.foodname}</td>
                              <td>{food.quantity}</td>
                              <td>{food.amount}</td>
                              <td>{parseInt(food.quantity) * parseInt(food.amount)}</td>
                            </tr>
                          );
                        })
                      }
                      </tbody>
                  </table>
                  <h4>Order Amount : {value.totalamount}</h4>
                </div>
                <button onClick={this.rateOrder} className='Rateb'>Rate This Order</button>
              </div>
            );
          })
         }
        </div>
        </div>
        </>
      )
    }
  }
}