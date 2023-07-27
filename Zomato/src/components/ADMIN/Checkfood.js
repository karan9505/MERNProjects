import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Checkfood.css'
import History  from '../History';
export default class AdminCheckFood extends Component {
    constructor(props){
        
        super(props);
        console.log(this.props.location.state.resid)
        this.obj = {restaurantid : this.props.location.state.resid};   // this.props.restaurantid
        this.state = {listOfFoods:[]};
    }

    componentDidMount(){
        axios.post("http://localhost:8000/zomato/get-fooditems", this.obj)
        .then((resp)=>{
            this.setState({listOfFoods : resp.data});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    componentDidUpdate(){
        axios.post("http://localhost:8000/zomato/get-fooditems", this.obj)
        .then((resp)=>{
            this.setState({listOfFoods : resp.data});
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    addFood = (e) =>{
        History.push({
            pathname:"Addfood",
            state:{
            resid:this.obj.restaurantid}
        })
        // props : restaurant id, here - this.props.restaurantid
    }

    editFood = (e) =>{
        let obj = null;
        this.state.listOfFoods.map((index)=>{
            if(e.target.parentNode.parentNode.id == index.fooditemid){
                obj = index;
            }
        })
        History.push({
            pathname:'/Editfood',
            state:{
                resid:this.obj.restaurantid,
                resdata:obj
            }
        })
    }

    deleteFood = (e) =>{
        axios.post("http://localhost:8000/zomato/admin/delete-fooditem",
        {
            restaurantid:this.obj.restaurantid,
            fooditemid:e.target.parentNode.parentNode.id
        })
        .then((resp)=>
        {
            console.log(resp.data)
        })
        .catch((err)=>
        {
            console.log(err.message)
        })

    }

    back=()=>
    {
        History.push({
            pathname:"/Admin",
        })
    }

    render() {

        if(this.state.listOfFoods.length === 0){
            return(
                <>
                <div id="Adlogback"></div>
                <div id="Admintag">
                    <img src='../IMAGES/Adminic.png' alt='Not found'></img>
                    <p>ADMIN</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
                <div id="Checkwindow">
                <div className='AdminCheckFood'>
                <p id="artext4">Menu empty</p>
                    <button id='addFood2' onClick={this.addFood}>Add Food</button>
                </div>
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
                <div id="Checkwindow">
                <div className='AdminCheckFood'>
                    <p id="artext3">Our menu</p>
                    {
                        this.state.listOfFoods.map((index)=>{
                            return(
                                <div className="restaurant1" key={index.fooditemid} id={index.fooditemid}>
                                    <div id="fooddata">
                                        <p>Dish : {index.foodname}</p>
                                        <p>Price : Rs.{index.price}/-</p>
                                        <p className='Description'>Description : {index.description}</p>
                                    </div>
                                    <div className='Arbg1'>
                                    <button className="checkedit"onClick={this.editFood}>Edit</button>
                                    <button className="checkdelete"onClick={this.deleteFood}>Delete</button>
                                    </div>
                                    <img src={index.image} alt={index.foodname+index.fooditemid} className='Checkfood'></img>
                                </div>
                            );
                        })
                    }
                    <button id='addFood1' onClick={this.addFood}>Add Food</button>
                </div>
                </div>
                </>
            );
        }
    }
}