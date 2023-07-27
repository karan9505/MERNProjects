import React, { Component } from 'react';
import axios from 'axios';
import UserLogin from './UserLogin';
import '../CSS/Showuserres.css'
import History from '../History';
export default class ShowUserRestaurants extends Component {
    constructor(props){
        super(props);
        this.userPhoneNumber = this.props.location.state.phonenum;     // this.props.userPhoneNumber
        this.state = {listOfRest:[], allRestaurants : []};
    }

    componentDidMount(){
        axios.get("http://localhost:8000/zomato/get-restaurants")
        .then((resp)=>{
            console.log(resp.data)
            if(resp.data.length > 0){
                this.setState({listOfRest : resp.data});
                this.setState({allRestaurants : resp.data});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    checkFoods = (e) =>{
        let obj={
            restaurantname:e.target.name,
            phonenumber:this.userPhoneNumber,
            restaurantid:Number(e.target.id[1])
        }
        console.log(obj)
        History.push({
            pathname:"/Addmore",
            state:{
                orddata:obj,
            }
        })
    }

    searchRestauarants = (e) =>{
        axios.post("http://localhost:8000/zomato/user/search-by-name", {"search" : document.getElementById('searchRestaurants').value})
        .then((resp)=>{
            console.log(resp.data);
            this.setState({listOfRest : resp.data});
            if(document.getElementById('searchRestaurants').value == ""){
                this.setState({listOfRest : this.state.allRestaurants});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render() {

        if(this.state.listOfRest.length == 0){
            return(
                <>
                <UserLogin phh={this.userPhoneNumber}/>
                <div className='ShowUserRestuarants'>
                    <input type="search" onChange={this.searchRestauarants} placeholder='Search Restaurant' id='searchRestaurants'></input>
                    <p id="nra">No Available Restaurants</p>
                </div>
                </>
            );
        }else{
            return (
                <>
                <UserLogin phh={this.userPhoneNumber}/>
                <div className='ShowUserRestuarants'>
                    <input type="search" onChange={this.searchRestauarants} placeholder='Search Restaurant' id='searchRestaurants'></input>
                    <div className='restlistuser'>
                    {
                        this.state.listOfRest.map((index)=>{
                            return(
                                <div className="restaurantsr" key={index.restaurantname} id={index.restaurantid}>
                                    <div  className='resname1'>{index.restaurantname}</div>
                                    <p  className='resnamerating'>{"Rating : "+index.restaurantrating + " / 5"}</p>
                                    <button className='usrvmenub' onClick={this.checkFoods} name={index.restaurantname} id={'v'+index.restaurantid}>View menu</button>
                                    <div id="imggrp1">
                                    {
                                        
                                        index.restaurantimages.map((image)=>{
                                            return(
                                                
                                                <img src={image.link} key={image.imageid} alt={index.restaurantname+image.imageid} className='Checkfood1'></img>
                                            );
                                        })
                                    }
                                    </div>
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