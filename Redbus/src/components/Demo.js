import React, { Component } from 'react'

class Demo extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         seats:"OOORRRORRW",
        seatsArray: [],
      }
      this.obj={
        seat:[],
      }
    }
    buttonx=()=>{
        let count=1;
        let seats=this.state.seats+"";
        console.log(seats);
        let tempArr = [];
        for(let i=0; i<seats.length; i++){
                const obj = {
                    id: count,
                    number: seats[i]
                }
                tempArr.push(obj)
            count++;
        }
        this.setState({
            seatsArray: tempArr
        },()=>{
            console.log(this.state.seatsArray)
        })

    }
  render() {
    let seatsArray=this.state.seatsArray;
    console.log(seatsArray)
    return (
      <div id='new'>
        <button onClick={this.buttonx}> clear</button>
        <div className='seat'>
            {
                seatsArray.length?
                seatsArray.map(seat=><div className='single_seat' height="20px" width="20px" margin="10px" background="red">{seat.id}</div>):null
            }
            
        </div>
      </div>
    )
  }
}

export default Demo
