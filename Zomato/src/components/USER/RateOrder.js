import React, { Component } from 'react';
import "../CSS/RateOrder.css";
import axios from 'axios';
import History from '../History';
export default class RateOrder extends Component {

    constructor(props){
        super(props);
        this.userPhoneNumber = this.props.location.state.phonenum;    // this.props.userPhoneNumber
        this.obj = this.props.location.state.obj;    // this.props.obj
        this.rateObj ={                 // Object To post Review through axios
            phonenumber: this.userPhoneNumber,
            orderid : this.obj.orderid,
            restaurantid: this.obj.restaurantid,
            restaurantrating : "0",
            restaurantreview : "",
            fooditemid: [],
            fooditemrating : [],
            fooditemreview:[]
        };
        this.obj.orderFoodItems.map((value, index)=>{
            this.rateObj.fooditemid[index] = value.fooditemid; 
            this.rateObj.fooditemrating[index] = "0";
            this.rateObj.fooditemreview[index] = "";
        })
    }

    reviewEnter = (e) =>{
        if(e.target.id == 'restaurant'){
            this.rateObj.restaurantreview = e.target.value;
        }else{
            this.rateObj.fooditemreview[e.target.id.substring(e.target.id.length, 4)] = e.target.value;
        }
    }

    starClicked = (e) =>{
        
        for(let i = 1; i <= 5; i++){
            if(e.target.className == "Restaurant"){
                this.rateObj.restaurantrating = parseInt(e.target.id[e.target.id.length-1]);
                if(i <= parseInt(e.target.id[e.target.id.length-1])){

                    let ele = document.getElementById("rest"+i);
                    ele.style.color = 'orange';
                }else{
                    let ele =  document.getElementById('rest'+i);
                    ele.style.color = 'black';
                }
            }else{
                this.rateObj.fooditemrating[e.target.parentNode.id.substring(e.target.parentNode.id.length,4)] = e.target.id[e.target.id.length-1];
                if(i <= parseInt(e.target.id[e.target.id.length-1])){

                    let ele = document.getElementById(this.obj.orderFoodItems[e.target.parentNode.id.substring(e.target.parentNode.id.length,4)].foodname+i);
                    ele.style.color = 'orange';
                }else{

                    let ele =  document.getElementById(this.obj.orderFoodItems[e.target.parentNode.id.substring(e.target.parentNode.id.length,4)].foodname+i);
                    ele.style.color = 'black';
                }
            }
        }
    }



    submitReview = (e) =>{
        console.log(this.rateObj);
        this.rateObj.fooditemid.map((val,i)=>{
            this.rateObj.fooditemid[i]=String(val)
        })
        axios.post("http://localhost:8000/zomato/user/rate-order", this.rateObj)
        .then((resp)=>{
            History.push({
                pathname:"Orders",
                state:{
                  phonenum:this.userPhoneNumber
                }
              });
        })
        .catch((err)=>{
            console.log(err);
        })
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
            <div id="rbback">
            <div className='RateOrder'>
                <h1 id="arhead">Rate Order (Order ID : {this.obj.orderid})</h1>
                <div id="rdatawrp">
                <div className="RestaurantRating" id='Reataurant'>
                    <span>Restaurant : {this.obj.restaurantname}</span>
                    <div className='resstar'>
                        <input id="radio1" type="radio" className="star" />
                        <label htmlFor="radio1" id='rest1' onClick={this.starClicked} className="Restaurant">&#9733;</label>
                        <input id="radio2" type="radio" className="star" />
                        <label htmlFor="radio2" id='rest2' onClick={this.starClicked} className="Restaurant">&#9733;</label>
                        <input id="radio3" type="radio" className="star" />
                        <label htmlFor="radio3" id='rest3' onClick={this.starClicked} className="Restaurant">&#9733;</label>
                        <input id="radio4" type="radio" className="star" />
                        <label htmlFor="radio4" id='rest4' onClick={this.starClicked} className="Restaurant">&#9733;</label>
                        <input id="radio5" type="radio" className="star" />
                        <label htmlFor="radio5" id='rest5' onClick={this.starClicked} className="Restaurant">&#9733;</label>
                    </div>
                    <input type="text" onChange={this.reviewEnter} id='restaurant' placeholder="Enter Restuarant Review" className='resrev'></input>
                </div>
                <div>
                        {
                            this.obj.orderFoodItems.map((value, index)=>{
                                return(
                                    <div key={index} className='ordfood'>
                                        <span>Dish : {value.foodname}</span>
                                        <div id={"Food"+index} className='starlist'>
                                            <input id="radio1" type="radio" className="star" />
                                            <label htmlFor="radio1" id={value.foodname+'1'} onClick={this.starClicked} className="FoodItem">&#9733;</label>
                                            <input id="radio2" type="radio" className="star" />
                                            <label htmlFor="radio2" id={value.foodname+'2'} onClick={this.starClicked} className="FoodItem">&#9733;</label>
                                            <input id="radio3" type="radio" className="star" />
                                            <label htmlFor="radio3" id={value.foodname+'3'} onClick={this.starClicked} className="FoodItem">&#9733;</label>
                                            <input id="radio4" type="radio" className="star" />
                                            <label htmlFor="radio4" id={value.foodname+'4'} onClick={this.starClicked} className="FoodItem">&#9733;</label>
                                            <input id="radio5" type="radio" className="star" />
                                            <label htmlFor="radio5" id={value.foodname+'5'} onClick={this.starClicked} className="FoodItem">&#9733;</label>
                                        </div>
                                        <input type="text" onChange={this.reviewEnter} id={'food'+index} placeholder="Enter Food Review" className='reviewtxt'></input>
                                    </div>
                                );
                            })
                        }
                </div>
                <button onClick={this.submitReview} id="rsub">Submit</button>
                </div>
            </div>
            </div>
            </>
        )
    }
}