import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Showuserfood.css'
import UserLogin from './UserLogin'
import PlaceOrder from './PlaceOrder'
import History from '../History';

class ShowUserFoods extends Component {
    constructor(props){
        super(props);
        this.userPhoneNumber = this.props.location.state.phonenum;  // this.props.userPhoneNumber
        console.log("FC : ",this.userPhoneNumber)
        this.state = {listOfFoods:[], allFoods : []};
    }

    componentDidMount(){
        axios.get("http://localhost:8000/zomato/user/get-all-food-items")
        .then((resp)=>{
            if(resp.data.length > 0){
                this.setState({listOfFoods : resp.data});
                this.setState({allFoods : resp.data});
            } 
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    orderFood = (e) =>{
        let obj = {
            image:this.state.listOfFoods[e.target.parentNode.id].foodItem.image,
            restaurantid : this.state.listOfFoods[e.target.parentNode.id].restaurantid,
            restaurantname : this.state.listOfFoods[e.target.parentNode.id].restaurantname,
            phonenumber : this.userPhoneNumber,
            deliveryaddress : null,
            totalamount : null,
            fooditemid : [this.state.listOfFoods[e.target.parentNode.id].foodItem.fooditemid],
            foodname : [this.state.listOfFoods[e.target.parentNode.id].foodItem.foodname],
            amount : [this.state.listOfFoods[e.target.parentNode.id].foodItem.price],
            quantity : []
        }
        console.log(this.userPhoneNumber)
        History.push({
            pathname:"/Placeorder",
            state:{
                orddata:obj,
                phonenum:this.userPhoneNumber
            }
        })
    }

    searchingFood = (e) =>{
        axios.post("http://localhost:8000/zomato/user/search-by-fooditem", {"search" : document.getElementById('searchbyfood').value})
        .then((resp)=>{
            console.log(resp.data);
            this.setState({listOfFoods : resp.data});
            if(document.getElementById('searchbyfood').value == ""){
                this.setState({listOfFoods : this.state.allFoods});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    

    render() {

        if(this.state.listOfFoods.length == 0){
            return(
                <>
                <UserLogin phh={this.userPhoneNumber}/>
                <div className='ShowUserFoods'>
                    <input type="search" placeholder='Search Food item' onChange={this.searchingFood} id='searchbyfood'></input>
                    <p id="nfa">No Foods Available</p>
                </div>
                </>
            );
        }else{
            return (
                <>
                <UserLogin phh={this.userPhoneNumber}/>
                <div className='ShowUserFoods'>
                    <input type="search" placeholder='Search Food item' onChange={this.searchingFood} id='searchbyfood'></input>
                    <div className='foodlistuser'>
                    {
                        this.state.listOfFoods.map((value,index)=>{
                            {console.log(value)}
                            return(
                                <div className="restaurantsf" key={value.restaurantid+"-"+value.foodItem.fooditemid} id={index}>
                                    <div id="fooddata">
                                        <p>Dish : {value.foodItem.foodname}</p>
                                        <p>Price : Rs.{value.foodItem.price}/-</p>
                                        <p className='UFLResname'>Restaurant : {value.restaurantname}</p>
                                        <p className='UFLDescription'>Description : {value.foodItem.description}</p>
                                        <p className='UFLRating'>Rating : {value.foodItem.fooditemrating.toPrecision(2) + " / 5"} </p>
                                    </div>                      
                                    <button onClick={this.orderFood} className='UFLOrderb'>Order</button>
                                    <img src={value.foodItem.image} alt={value.foodItem.foodname + value.foodItem.fooditemid} className='Checkfood'></img>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
                </>
            );
        }
    }
}

export default ShowUserFoods;