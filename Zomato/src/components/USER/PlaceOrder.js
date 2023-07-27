import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Placeorder.css'
import History from '../History'
import Lib from 'react-axios';
import { Link } from 'react-router-dom';
import RateOrder from '../USER/RateOrder'
export default class PlaceOrder extends Component {

    constructor(props){
        super(props);
        // this.obj = this.props.obj;
        console.log("STATE : ",this.props.location.state.orddata)               // use toString();
        this.obj = this.props.location.state.orddata
        this.userPhoneNumber=this.props.location.state.phonenum
        this.obj.totalamount = 0;
        this.obj.amount.map((value,index)=>{
            this.obj.totalamount += parseInt(value);
            this.obj.quantity[index] = "1";
        });
        this.state = {totalamount : this.obj.totalamount};
        console.log(this.obj)
    }

    billCheck = (e) =>{
      
        this.obj.fooditemid.map((value,index)=>{
            if(document.getElementById('quantity'+index).value != ""){
                if(document.getElementById('quantity'+index).value == 0){
                    if(this.obj.fooditemid.length === 1){
                        this.obj.fooditemid = [];
                        this.obj.foodname = [];
                        this.obj.quantity = [];
                        this.obj.amount = [];
                    }else if(index === 0){
                        this.obj.fooditemid.shift();
                        this.obj.foodname.shift();
                        this.obj.quantity.shift();
                        this.obj.amount.shift();
                    }else{
                        this.obj.fooditemid.splice(1, index);
                        this.obj.foodname.splice(1, index);
                        this.obj.quantity.splice(1,index);
                        this.obj.amount.splice(1,index);
                    }
                    console.log(this.obj);
                }else{
                    this.obj.quantity[index] = document.getElementById('quantity'+index).value.toString();
                }
            }
        })
        this.obj.totalamount = 0;
        this.obj.amount.map((value, index)=>{
            this.obj.totalamount += parseInt(value) * parseInt(this.obj.quantity[index]);
        }) 
        this.setState({totalamount : this.obj.totalamount});
    }

    addMore = (e) =>{
        this.props.location.state.orddata.totalamount=0
        History.push({
            pathname:"/Addmore",
            state:{
                orddata:this.props.location.state.orddata,
                phonenum:this.props.location.state.phonenum
            }
        })
    }

    order = (e) =>{  
        e.preventDefault();
        console.log(this.obj)
        this.obj.totalamount=Number(this.obj.totalamount)
        this.obj.fooditemid.map((data,i)=>{
            this.obj.fooditemid[i]=String(data)
            this.obj.amount[i] = String(this.obj.amount[i])
        })
        if( document.getElementById('deliveryAddress').value !== ""){
            this.obj.deliveryaddress = document.getElementById('deliveryAddress').value;
        }else{
            console.log("Fill Delivery Address");
        }
        axios.post("http://localhost:8000/zomato/user/place-order",this.obj)
        .then((resp)=>{
            console.log(resp.data);
            History.push({
                pathname:"Orders",
                state:{
                  phonenum:this.userPhoneNumber
                }
              })
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log("ordered")
    }

    increament=(e)=>
    {
        e.preventDefault();
        console.log(e.target.id)
        let qty=document.getElementsByClassName("ordqnt")[Number(e.target.id[1])].value
        if(qty==="")
        {
            document.getElementsByClassName("ordqnt")[Number(e.target.id[1])].value=1
        }
        else
        {
            document.getElementsByClassName("ordqnt")[Number(e.target.id[1])].value=Number(qty)+1
        }
        document.getElementsByClassName("ordqnt")[Number(e.target.id[1])].click();
    }

    decrement=(e)=>
    {
        e.preventDefault();
        let qty=document.getElementsByClassName("ordqnt")[Number(e.target.id[1])].value
        if(qty!=="" && qty!=="1")
        {
            document.getElementsByClassName("ordqnt")[Number(e.target.id[1])].
            value=Number(qty)-1
        }
        document.getElementsByClassName("ordqnt")[Number(e.target.id[1])].click();
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
        if(this.obj.fooditemid.length == 0){
            console.log("Redirect to User Login Page with props userPhoneNumber");
            return(
                <div className='PlaceOrder'>
                    Redirect to UserLogin Page with Props userPhoneNumber
                </div>
            );
        }else{
            return (
                <>
                <div id="Adlogback"></div>
                <div id="Admintag">
                    <img src='../IMAGES/Userpic.png' alt='Not found'></img>
                    <p>USER</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
                <div className='PlaceOrder'>
                    <h1 id="arhead">Place Order : {this.obj.restaurantname}</h1>
                    <form className='Orderform'>
                        {
                            this.obj.fooditemid.map((value,index)=>{
                                return(
                                    <div className='FoodItem' key={index} id={index}>
                                        <p className='Orddishname'>Dish : {this.obj.foodname[index]}</p>
                                        <p className='Orddishprice'>Price : {this.obj.amount[index]}</p>
                                        <label for={'quantity'+index} className='ordqntl'>Quantity : </label>
                                        <button className="ordi" onClick={this.increament} id={'i'+index}>+</button>
                                        <input type='number' min={0} placeholder='1' id={'quantity'+index} onClick={this.billCheck} className='ordqnt'></input>
                                        <button className="ordd" onClick={this.decrement} id={'d'+index}>-</button>
                                    </div>
                                );
                            })
                        }
                    </form>
                    <h3 className='Totalamt'>Total Amount : {this.state.totalamount}</h3>
                    <input type="text" placeholder='Enter Delivery Address' id='deliveryAddress'></input>
                    <input type="button" onClick={this.addMore} value={"Add More"} id="addmore"></input>
                    <input type="submit" onClick={this.order} value={"Order"} id="ordsub"></input>
                </div>
                </>
            );
        }
    }
}