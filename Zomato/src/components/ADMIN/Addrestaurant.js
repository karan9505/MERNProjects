import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Addres.css'
import History from '../History';
export default class Addrestaurant extends Component {
  
    constructor(props){
        super(props);
        this.restaurant = {
            restaurantname : null,
            address : null,
            restaurantimages : []
        };
        this.count = 0;
    }

    submit = (e) =>{
        e.preventDefault();
        this.restaurant.restaurantname = document.getElementById('restaurantname').value;
        this.restaurant.address = document.getElementById('restaurantaddress').value;
        console.log("OKKK")
        axios.post("http://localhost:8000/zomato/admin/add-restaurant",this.restaurant)
        .then((resp)=>{
            console.log(resp.data);
        })
        .catch((err)=>{
            console.log(err.message);
        })
        History.push({
            pathname:"/Admin"
        })
    }

    uploadImage = (e) =>{

        if(document.getElementById('enterImage').value!=="" && document.getElementById('enterImage').value.length<9501)
        {
        if(document.getElementById('enterImage').value!=="")
        {
        this.restaurant.restaurantimages.push(document.getElementById('enterImage').value);
        
        let section = document.createElement('div');
        section.className = "Image";
        section.id = this.count;

        let img = document.createElement('img');
        img.src = document.getElementById('enterImage').value;
        img.setAttribute("class","Addedimg")
        
        let button = document.createElement('button');
        button.textContent = "X";
        button.setAttribute("class","imgx")
        button.onclick = this.removeImage;
        section.setAttribute("class","imgwrp")
        section.appendChild(img);
        section.appendChild(button);
        document.getElementById('restaurantImages').appendChild(section);


        this.count++;
        if(this.count === 5){                                            // validation : images must be less than 6 and greater than 0
            document.getElementById('addImage').disabled = true;
        }
        document.getElementById('enterImage').value = null;
        }
        }
        else if(document.getElementById('enterImage').value.length>=9501)
        {
            alert("Link too long")
        }
    }

    removeImage = (e) =>{
        let ele = e.target.parentNode;
        this.restaurant.restaurantimages.splice(ele.id,1);
        console.log(this.restaurant.restaurantimages);
        this.count--;
        ele.parentNode.removeChild(ele);
    }

    back=()=>
    {
        History.push({
            pathname:"/Admin",
        })
    }

    render() {
        return (
            <>
            <div id="Adlogback"></div>
            <div id="Admintag">
                    <img src='../IMAGES/Adminic.png' alt='Not found'></img>
                    <p>ADMIN</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
            <div className='AddRestaurant' id='AddRestaurant'>
                <h1 id="arhead">Add Restaurant</h1>
                <form id="Addresform">
                    <input id='restaurantname' type="text" maxLength={50} placeholder='Enter Restaurant Name'></input>
                    <input id="restaurantaddress" type="text" maxLength={100} placeholder='Enter Address'></input>
                    <div id='restaurantImages'>
                
                    </div>
                    <input id="enterImage" type="url" placeholder='Enter Image URL'></input>
                    <input id="addImage" type="button" value='+' onClick={this.uploadImage}></input>
                    <button type="submit" value='Submit' id="addresssubmit" onClick={this.submit}>SUBMIT</button>
                </form>
            </div>
            </>
        );
    }
}