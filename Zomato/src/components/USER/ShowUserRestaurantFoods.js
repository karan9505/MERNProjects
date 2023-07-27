import React, { Component } from 'react';
import axios from 'axios';
import History from '../History';
import '../CSS/Showusrrf.css'
export default class ShowUserRestaurantFoods extends Component {
    constructor(props){
        super(props);
        this.restaurantname = this.props.location.state.orddata.restaurantname;      // this.props.restaurantname
        
        this.userPhoneNumber = this.props.location.state.orddata.phonenumber;     // this.props.userPhoneNumber
        console.log("CHECK")
        console.log(this.userPhoneNumber)
        console.log(this.props.location.state.phonenum)
        this.obj = {restaurantid : this.props.location.state.orddata.restaurantid};   // this.props.restaurantid
        this.state = {listOfFoods:null};
        this.order = {           
            restaurantid : this.obj.restaurantid,
            restaurantname : this.restaurantname,
            phonenumber : this.userPhoneNumber,
            deliveryaddress : null,
            totalamount : 0,
            fooditemid : [],
            foodname : [],
            amount : [],
            quantity : []
        }
    }

    componentDidMount(){
        axios.post("http://localhost:8000/zomato/get-fooditems", this.obj)
        .then((resp)=>{
            console.log(resp.data);
            if(resp.data.length > 0){
                this.setState({listOfFoods : resp.data});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    orderFoods = (e) =>{

        this.state.listOfFoods.map((value,index)=>{
            if(document.getElementById('select'+index).checked == true){
                this.order.fooditemid.push(value.fooditemid);
                this.order.foodname.push(value.foodname);
                this.order.amount.push(value.price);
                this.order.quantity.push("1");
            }
        })
        console.log("Redirect to Place Order");
        console.log("In add more",this.props.location.state.orddata);
        History.push({
            pathname:"/Placeorder",
            state:{
            orddata:this.order,
            phonenum:this.userPhoneNumber
        }
        })
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

        if(this.state.listOfFoods === null){
            return(
                <div className='AdminCheckFood'>
                    <h1>{this.restaurantname}</h1>
                    No Foods Available
                </div>
            );
        }else{
            return (
                <>
                <div id="Adlogback"></div>
                <div id="Admintag">
                    <img src='../IMAGES/Userpic.png' alt='Not found' onClick={this.back}></img>
                    <p>USER</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
                <div className='Addmorewindow'>
                <h1 id="artext6">Restaurant : {this.restaurantname}</h1>
                <div className='SMFlist'>
                    {
                        this.state.listOfFoods.map((value,index)=>{
                            return(
                                <div className="restaurant1" key={value.fooditemid} id={value.fooditemid}>
                                    <div id="fooddata">
                                        <p>Dish : {value.foodname}</p>
                                        <p>Price : Rs.{value.price}/-</p>
                                        <p className='Description'>Description : {value.description }</p>
                                        <p>Rating : {value.fooditemrating.toPrecision(2) + " / 5"}</p>
                                    </div>
                                    <img src={value.image} alt={value.foodname+value.fooditemid} className='Checkfood'></img>
                                    <label htmlFor={'select'+index} id="selectfood">Select</label>
                                    <input type="checkbox" id={'select'+index}className='selectedfoodc'></input>
                                </div>
                            );
                        })
                    }
                    <button id='orderFoods' onClick={this.orderFoods}>Order Foods</button>
                </div>
                </div>
                </>
            );
        }
    }
}