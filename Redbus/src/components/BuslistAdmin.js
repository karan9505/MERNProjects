

    import React, { Component } from 'react';
    import '../styles/styleShowbuses.css';
    import axios from 'axios';
    import History from './History';

    class BuslistAdmin extends Component {
        constructor(props) {
          super(props)
        
          this.state={
            buses:[],
            errorMsg:""
    
          }
          this.obj={
            view:false,
          }
        }
        
    componentDidMount(){
      axios.get('http://localhost:8000/admin/show-buses')
      .then((Response) =>{
          console.log(Response.data);
          this.setState({buses:Response.data.body})
      })
      .catch((err)=>{
          console.log(err);
          this.setState({errorMsg:"Error retreving data"})
      })
  }

         delBus=(e)=>{
          let busname=e.busname
          axios.post('http://localhost:8000/admin/delete-bus',{busname})
          .then((Response) =>{
              console.log(Response.data);
              if(Response.data===1){
                axios.get('http://localhost:8000/admin/show-buses')
                .then((Response) =>{
                    console.log(Response.data);
                    this.setState({buses:Response.data.body})
                })
                .catch((err)=>{
                    console.log(err);
                    this.setState({errorMsg:"Error retreving data"})
                })
              }
          })
          .catch((err)=>{
              console.log(err);
              this.setState({errorMsg:"Error retreving data"})
          })
           
         }
         editBus(buses){
          History.push({
            pathname: '/updatebus',
            state: {
                bus:buses,
            }
           })
         }
         seeRoute(busname){
          axios.post('http://localhost:8000/admin/show-routes-bus',{busname})
                .then((Response) =>{
                    console.log(Response.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
         }
      render() {
        const {buses}=this.state
        return (   
          <section className="showbus " id='adminshowbus'>
            {
            buses.length?
            buses.map(buses=> <div className='showbus_container'>
            <div className='buslist1' >
                <div className="bus_info_container">
                    <div className="bus_info_part bus_part1">
                      <h4>Bus Name: {buses.busname}</h4>
                      <p>Bus Type: {buses.bustype}</p>
                    </div>
                    <div className="bus_info_part bus_part5">
                      <h4>Bus Rating: {buses.rating}</h4>
                    </div>
                    <div className="bus_info_part bus_part6">
                      <p>Resrved Seats: {buses.reservedseats}</p>
                    </div>
                    <div className="bus_info_part bus_part7">
                      <p>Total Seats: {buses.totalseats}</p>
                    </div>
                    <div className="bus_info_part bus_part8">
                        <div onClick={()=>this.delBus(buses)} className='admin_button'>
                          <h3>Delete Bus</h3>
                        </div>
                        <div className='admin_button' onClick={()=>this.editBus(buses)}>
                          <h3>Edit Bus</h3>
                        </div>
                    </div>
                </div>
                <div className='routelist_container'></div>
            </div>
        </div>):
                null  
            }
            {buses.errorMsg ? <div>{buses.errorMsg}</div>:null}
            
          </section>
        )
      }
    }
    
    export default BuslistAdmin
    