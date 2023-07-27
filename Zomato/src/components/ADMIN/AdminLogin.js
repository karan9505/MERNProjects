import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import History from '../History';
import '../CSS/Adminlogin.css'
export default class AdminLogin extends Component {
  
    constructor(props){
        super(props);
        this.phone=JSON.parse(localStorage.getItem('ap'));
        this.state = {listOfRest:[]};
    }

    componentDidMount(){
        console.log(this.state.listOfRest.length)
        axios.get("http://localhost:8000/zomato/get-restaurants")
        .then((resp)=>{
            this.setState({listOfRest : resp.data});
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    componentDidUpdate(){
        axios.get("http://localhost:8000/zomato/get-restaurants")
        .then((resp)=>{
            this.setState({listOfRest : resp.data});
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    checkFoods = (e) =>{
        console.log(e.target.parentNode.parentNode.id)
        History.push({
            pathname:"Viewmenu",
            state:{
                resid:e.target.parentNode.parentNode.id
            }
        })
    }

    editRestaurant = (e) =>{
        let obj = null;
        this.state.listOfRest.map((index)=>{
            if(e.target.parentNode.parentNode.id == index.restaurantid){
                obj = index;
            }
        })
        console.log(obj);
        History.push({
            pathname:"/Edit",
            state:{
                resid:e.target.parentNode.parentNode.id,
                resobj:obj
            }
        }) 

    }

    deleteRestaurant = (e) =>{
        e.preventDefault();
        console.log(e.target.parentNode.parentNode.id)
        axios.post("http://localhost:8000/zomato/admin/delete-restaurant",{restaurantid:Number(e.target.parentNode.parentNode.id)})
        .then((resp)=>{
            console.log(resp.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    back=()=>
    {
        History.push({
            pathname:"/Admin",
        })
    }

    logout=()=>
    {
        axios.post("http://localhost:8000/zomato/user/logout",{phonenumber:this.phone})
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
        if(this.state.listOfRest.length === 0){
            return(
                <>
                <div id="Adlogback"></div>
                <div id="Admintag">
                    <img src='../IMAGES/Adminic.png' alt='Not found'></img>
                    <p>ADMIN</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
                <img src="../IMAGES/Logout.png" alt="Not found" className='Logout' onClick={this.logout}></img>
                <div className='AdminLogin'>
                    <p id="artext2">No restaurant available</p>
                    <Link to='/Addrestaurant/' ><button id='addRestaurant2' onClick={this.addRestaurant}>Add Restaurant</button></Link>
                </div>
                </>
            );
        }else{
            return (
                <>
                <div id="Adlogback"></div>
                <div id="Admintag">
                    <img src='../IMAGES/Adminic.png' alt='Not found'></img>
                    <p>ADMIN</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
                <img src="../IMAGES/Logout.png" alt="Not found" className='Logout' onClick={this.logout}></img>
                <div className='AdminLogin'>
                    <p id="artext2">Available Restaurants</p>
                    {
                        this.state.listOfRest.map((index)=>{
                            return(
                                <div className="restaurant" key={index.restaurantid} id={index.restaurantid}>
                                    <div onClick={this.checkFoods} className='resname'>{index.restaurantname}</div>
                                    <div className='Arbg'>
                                    <button onClick={this.checkFoods} className='resviewmenu'>View Menu</button>
                                    <button onClick={this.editRestaurant} className='resedit'>Edit Restaurant</button>
                                    <button onClick={this.deleteRestaurant}className='resdelet'>Delete Restaurant</button>
                                    </div>
                                    <div id="imggrp">
                                    {
                                        
                                        index.restaurantimages.map((image)=>{
                                            return(
                                                <img src={image.link} key={image.imageid} alt={index.restaurantname+image.imageid} className='hotelimg'></img>
                                            );
                                        })
                                    }
                                    </div>
                                </div>
                            );
                        })
                    }
                    <Link to='/Addrestaurant/' ><button id='addRestaurant1'>ADD RESTAURANT</button></Link>
                </div>
                </>

            );
        }
    }
}