import React, { Component } from 'react'
import { Route, Switch , withRouter} from 'react-router-dom'
import BuslistAdmin from './BuslistAdmin'
import NavBar from './NavBar'
import Footer from './Footer'
import Dashboard from './Dashboard'
import Addbus from './Addbus'
import Routelist from "./Routelist"
import AddRoute from './AddRoute'
import AssignRoutes from './AssignRoutes'
import Login from './Login';
import Signup from "./Signup";
import Landing from './Landing';
import BusList from './BusList';
import PassengerForm from './PassengerForm';
import DisplayTicket from "./DisplayTicket";
import Updatebus from "./Updatebus";
import NavBarUser from './NavBarUser';
import NavBarAdmin from "./NavbarAdmin";
import Cancel from './Cancel';
import ViewTicket from "./ViewTicket"
import ForgotPass from './ForgotPass'
// import UpdatePass from './UpdatePass'

class RouterComponents extends Component {
  componentDidMount(){
    localStorage.setItem("phoneno","");
  }
  render() {
    return (
      <div>
        {/* {
          (window.location.pathname === '/' || window.location.pathname === '/Signup' || window.location.pathname === '/forgetpassword' ||  window.location.pathname === '/updatePass') ? null:<Navbar/>
        } */}
        {
          (localStorage.getItem("phoneno")==="")?<NavBar/>: ((localStorage.getItem("phoneno")!=="1234567890")?<NavBarUser/>:<NavBarAdmin/>)
          
        }
        
        <Switch>
            <Route exact path="/" component={Landing}></Route>
        </Switch>
        <div className='admin_'>
          {
            (window.location.pathname === '/adminbuslist' || window.location.pathname ==="/addbus" ||window.location.pathname ==="/addroute" || window.location.pathname ==='/routelist' || window.location.pathname ==="/assignroute" || window.location.pathname ==="/updatebus") ? <Dashboard/> : null
          }
        <Switch>
            <Route exact path='/adminbuslist' component={BuslistAdmin}></Route>
            <Route exact path='/addbus' component={Addbus}></Route>
            <Route exact path="/addroute" component={AddRoute}></Route>
            <Route exact path="/routelist" component={Routelist}></Route>
            <Route exact path="/assignroute" component={AssignRoutes}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/buslist" component={BusList}></Route>
            <Route exact path="/passengerform" component={PassengerForm}></Route>
            <Route exact path="/ticket" component={DisplayTicket}/>
            <Route exact path="/updatebus" component={Updatebus}/>
            <Route exact path="/cancel" component={Cancel}/>
            <Route exact path="/viewticket" component={ViewTicket}/>
            <Route exact path="/forgetpassword" component={ForgotPass}/>
            {/* <Route exact path="updatepass" component={UpdatePass}/> */}
        </Switch>
        {/* {
          (window.location.pathname === '/' || window.location.pathname === '/Signup' || window.location.pathname === '/forgetpassword' ||  window.location.pathname === '/updatePass') ? null:<Footer/>
        } */}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(RouterComponents)
