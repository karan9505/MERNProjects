import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../CSS/Editres.css'
import History from '../History';
export default class AdminEditRest extends Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state.resobj);
        let imageObj = [];
        this.props.location.state.resobj.restaurantimages.map((value,index)=>{
            imageObj[index] = value.link;
        })
        this.restaurant = {             
            restaurantid : this.props.location.state.resobj.restaurantid,
            restaurantname : this.props.location.state.resobj.restaurantname,
            address : this.props.location.state.resobj.restaurantaddress,
            restaurantimages : imageObj
        };
        this.count = this.restaurant.restaurantimages.length;
    }

    componentDidMount(){
        document.getElementById('restaurantname').value = this.restaurant.restaurantname;
        document.getElementById('restaurantaddress').value = this.restaurant.address;
    }

    submit = (e) =>{
        console.log("okk")

        e.preventDefault();
        if(document.getElementById('restaurantname').value === null){
            this.restaurant.restaurantname = document.getElementById('restaurantname').placeholder;
        }else{
            this.restaurant.restaurantname = document.getElementById('restaurantname').value;
        }
        if(document.getElementById('restaurantaddress').value === null){
            this.restaurant.address = document.getElementById('restaurantaddress').placeholder;
        }else{
            this.restaurant.address = document.getElementById('restaurantaddress').value;
        }
        console.log("okk1")
        axios.post("http://localhost:8000/zomato/admin/edit-restaurant",this.restaurant)
        .then((resp)=>{
            console.log("okk")
            console.log(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        History.push({
            pathname:"/Admin"
        })
    }

    uploadImage = (e) =>{

         if(document.getElementById('enterImage').value!=="" && document.getElementById('enterImage').value.length<9501)
         { 
         this.restaurant.restaurantimages.push(document.getElementById('enterImage').value);
        
         let section = document.createElement('div');
         section.className = "Image";
         section.id = this.count;
         section.setAttribute("class","imgwrp")
 
         let img = document.createElement('img');
         img.src = document.getElementById('enterImage').value;
         img.setAttribute("class","Addedimg")
         
         let button = document.createElement('button');
         button.textContent = "X";
         button.setAttribute("class","imgx")
         button.onclick = this.removeImage;
         
         section.appendChild(img);
         section.appendChild(button);
         document.getElementById('restaurantImages').appendChild(section);
 
 
         this.count++;
         if(this.count === 5){                                            // validation : images must be less than 6 and greater than 0
             document.getElementById('addImage').disabled = true;
         }
         document.getElementById('enterImage').value = null;}
    }

    removeImage = (e) =>{
        e.preventDefault();
        if(this.count>1)
        {
        let ele = e.target.parentNode;
        this.restaurant.restaurantimages.splice(ele.id,1);
        console.log(this.restaurant.restaurantimages);
        this.count--;
        ele.parentNode.removeChild(ele);}
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
            <div id="Addresback"></div>
            <div id="Admintag">
                    <img src='../IMAGES/Adminic.png' alt='Not found'></img>
                    <p>ADMIN</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
            <div className='AdminEditRest' id='AdminEditRest'>
                <h1 id="edithead">Edit Restaurant</h1>
                <form  id="Editresform">
                    <input id='restaurantname' type="text" maxLength={50}></input>
                    <input id="restaurantaddress" type="text" maxLength={100}></input>
                    <div id='restaurantImages'>
                        {
                            this.restaurant.restaurantimages.map((image,index)=>{
                                return(
                                    <div className='Image' key={index} id={index}>
                                        <div className='imgwrp'>
                                        <img src={image} alt="Not found" className='Addedimg1' height={"10px"}></img>
                                        <button onClick={this.removeImage}className='imgx'>X</button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                
                    </div>
                    <input id="enterImage" type="url" placeholder='Enter Image URL'></input>
                    <input id="addImage" type="button" value='+' onClick={this.uploadImage}></input>
                    <Link to="/Admin"><button id="addresssubmit" onClick={this.submit}>SUBMIT</button></Link>
                </form>
            </div>
            </>
        );
    }
}