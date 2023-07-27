import React, { Component } from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'
import Welcome from './GENERAL/Welcome'
import Login from './GENERAL/Login'
import Signup from './GENERAL/Signup'
import Forgotpassword from './GENERAL/Forgotpassword'
import AdminLogin from './ADMIN/AdminLogin'
import Addrestaurant from './ADMIN/Addrestaurant'
import AdminEditRest from './ADMIN/Editrestaurant'
import Checkfood from './ADMIN/Checkfood'
import Addfood from './ADMIN/Addfood'
import Editfood from './ADMIN/Editfood'
import ShowUserFood from './USER/ShowUserFoods'
import ShowUserRestaurants from './USER/ShowUserRestaurants'
import PlaceOrder from './USER/PlaceOrder'
import ShowUserRestaurantFoods from './USER/ShowUserRestaurantFoods'
import UserOrders from './USER/UserOrders'
import RateOrder from './USER/RateOrder'
export class Routercomponents extends Component {
  render() {
    return (
      <div>
        <Switch>
            <Route exact path="/" component={Welcome}></Route>
            <Route exact path="/Addrestaurant" component={Addrestaurant}></Route>
            <Route exact path="/Login" component={Login}></Route>
            <Route exact path="/Signup" component={Signup}></Route>
            <Route exact path="/Forgotpassword" component={Forgotpassword}></Route>
            <Route exact path="/Admin" component={AdminLogin}></Route>
            <Route exact path="/Edit" component={AdminEditRest}></Route>
            <Route exact path="/Viewmenu" component={Checkfood}></Route>
            <Route exact path="/Addfood" component={Addfood}></Route>
            <Route exact path="/Editfood" component={Editfood}></Route>
            <Route exact path="/User" component={ShowUserFood}></Route>
            <Route exact path="/Userrestaurant" component={ShowUserRestaurants}></Route>
            <Route exact path="/Placeorder" component={PlaceOrder}></Route>
            <Route exact path="/Orders" component={UserOrders}></Route>
            <Route exact path="/Rate" component={RateOrder}></Route>
            <Route exact path="/Addmore" component={ShowUserRestaurantFoods}></Route>
        </Switch>        
      </div>
    )
  }
}

export default withRouter(Routercomponents);
