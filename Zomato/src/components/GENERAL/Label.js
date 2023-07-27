import React, { Component } from 'react'
import '../CSS/Label.css'
export class Label extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       i:true
    }
  }
  
  render() {
    return (
      <div id="Label">
        {this.props.imgS?
        <>
          <img src={this.props.imgLink} alt='' id="countryLogo"></img>
          <p>{this.props.name}</p>
        </>
        :
        <p>{this.props.name}</p>
        } 
        <img src='../IMAGES/Sidearr.png' alt="Not Found" className="Sidearr"></img>
      </div>
    )
  }
}

export default Label
