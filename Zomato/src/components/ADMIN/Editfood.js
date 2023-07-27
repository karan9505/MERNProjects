import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Editfood.css'
import History from '../History';
export default class EditFooditem extends Component {
    constructor(props){
        super(props);
        this.fooditem = {
            restaurantid : Number(this.props.location.state.resid),       // this.props.restaurantid    
            fooditemid : Number(this.props.location.state.resdata.fooditemid),      // this.props.obj.fooditemid 
            foodname : this.props.location.state.resdata.foodname,        // this.props.obj.foodname
            description : this.props.location.state.resdata.description,     // this.props.obj.description 
            price : String(this.props.location.state.resdata.price),           // this.props.obj.price 
            image :this.props.location.state.resdata.image            // this.props.obj.image
        };
        console.log(typeof(this.fooditem.price))

    }
    componentDidMount(){
        document.getElementById('foodname').value = this.fooditem.foodname;
        document.getElementById('fooddescription').value = this.fooditem.description;
        document.getElementById("foodprice").value = this.fooditem.price;
    }

    submit = (e) =>{
        e.preventDefault();
        this.fooditem.foodname = document.getElementById('foodname').value;
        this.fooditem.description = document.getElementById("fooddescription").value;
        this.fooditem.price = document.getElementById("foodprice").value;
        axios.post("http://localhost:8000/zomato/admin/edit-fooditems",this.fooditem)
        .then((resp)=>{
            console.log(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        History.push({
            pathname:"/Viewmenu",
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
        img.setAttribute('class','AAddedimg')
        
        let button = document.createElement('button');
        button.textContent = "X";
        button.onclick = this.removeImage;
        button.setAttribute('class','imgxf')
        section.appendChild(img);
        section.appendChild(button);
        document.getElementById('FoodImage').appendChild(section);


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
            <div className='EditFooditem' id='EditFooditem'>
                <h1 id="arhead">Edit Food Item</h1>
                <form id="addfoodform">
                    <input id='foodname' type="text" maxLength={50}></input>
                    <input id="fooddescription" type="text" maxLength={100}></input>
                    <input id="foodprice" type="text" onClick={this.changeType} onKeyDown={this.restrictE}></input>           
                    <div id='FoodImage'>
                        <div className='FoodImage' id={this.fooditem.fooditemid}>
                            <img className='AAddedimg' src={this.fooditem.image}></img>
                            <button onClick={this.removeImage} className='imgxf'>X</button>
                        </div>
                    </div>
                    <input id="enterFoodImage" type="url" placeholder='Enter Image URL'></input>
                    <input id="addFoodImage" type="button" value='+' onClick={this.uploadImage}></input>
                    <input type="submit" value='Submit' onClick={this.submit} id="editfoodsubmit"></input>
                </form>
            </div>
            </>
        );
    }
}