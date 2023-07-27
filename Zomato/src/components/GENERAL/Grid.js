import React, { Component } from 'react'
import Label from './Label'
import '../CSS/Grid.css'
export class Grid extends Component {
  render() {
    return (
      <div id="Grid">
        <Label imgS={this.props.imgS} name={this.props.name1} imgLink={this.props.imgLink1}/>
        <Label imgS={this.props.imgS} name={this.props.name2} imgLink={this.props.imgLink2}/>
        <Label imgS={this.props.imgS} name={this.props.name3} imgLink={this.props.imgLink3}/>
      </div>
    )
  }
}

export default Grid
