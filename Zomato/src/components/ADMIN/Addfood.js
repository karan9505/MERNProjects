import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Addfood.css'
import History from '../History'
export default class AddFooditem extends Component {
    constructor(props){
        super(props);
        this.fooditem = {
            restaurantid : Number(this.props.location.state.resid),             
            foodname : null,
            description : null,
            price : null,
            image : null
        };
        console.log(this.props.location.state.resid)
    }

    submit = (e) =>{
        e.preventDefault();
        console.log("ok")
        this.fooditem.foodname = document.getElementById('foodname').value;
        this.fooditem.description = document.getElementById("fooddescription").value;
        this.fooditem.price = document.getElementById("foodprice").value;
        console.log(this.fooditem)
        axios.post("http://localhost:8000/zomato/admin/add-fooditems",this.fooditem)
        .then((resp)=>{
            console.log(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        History.push({
            pathname:'/Viewmenu',
            state:{
                resid:this.fooditem.restaurantid
            }
        })
    }

    uploadImage = (e) =>{

        // console.log(document.getElementById("enterFoodImage").value.length); // validation : src link length should less than 9500 
        this.fooditem.image = document.getElementById("enterFoodImage").value;
        
        let section = document.createElement('div');
        section.className = "Image";
        section.id = this.count;

        let img = document.createElement('img');
        img.src = document.getElementById("enterFoodImage").value;
        img.setAttribute("class","AAddedimg")
        let button = document.createElement('button');
        button.textContent = "X";
        button.onclick = this.removeImage;
        button.setAttribute("class","imgxf")
        section.appendChild(img);
        section.appendChild(button);
        document.getElementById('FoodImage').appendChild(section);
        section.setAttribute("class","imgwrp")

        document.getElementById("addFoodImage").style.visibility = "hidden";
        document.getElementById("enterFoodImage").style.visibility = "hidden";
        
    }

    removeImage = (e) =>{
        let ele = e.target.parentNode;
        this.fooditem.image = null;
        ele.parentNode.removeChild(ele);
        document.getElementById("addFoodImage").style.visibility = "visible";
        document.getElementById("enterFoodImage").style.visibility = "visible";
    }

    changeType = (e) =>{
        e.target.type = "number";
    }

    restrictE = (e) =>{
        if((e.key === 'e' || e.target.value > 1000) && e.key !== "Backspace"){
            e.preventDefault();
        }
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
            <div className='AddFooditem' id='AddFooditem'>
                <h1 id="arhead">Add Food Item</h1>
                <form id="addfoodform">
                    <input id='foodname' type="text" maxLength={50} placeholder='Enter Food Name'></input>
                    <input id="fooddescription" type="text" maxLength={100} placeholder='Enter Food Description'></input>
                    <input id="foodprice" type="text" onClick={this.changeType} onKeyDown={this.restrictE} placeholder='Enter Food Price'></input>           
                    <div id='FoodImage'>

                    </div>
                    <input id="enterFoodImage" type="url" placeholder='Enter Image URL'></input>
                    <input id="addFoodImage" type="button" value='+' onClick={this.uploadImage}></input>
                    <input id="addfoodsubmit" type='button' value='Submit' onClick={this.submit}></input>
                </form>
            </div>
            </>
        );
    }
}