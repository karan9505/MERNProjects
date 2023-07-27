import React from 'react'
import {Route,Routes, ScrollRestoration} from 'react-router-dom'
import LandingPage from './GeneralComponents/LandingPage'
import Signup from './GeneralComponents/Signup'
import MainSignup from './GeneralComponents/MainSignup'
import Login from './GeneralComponents/Login'
import ClientDashboard from './ClientComponents/ClientDashboard'
import FreelancerDashboard from './FreelancerComponents/FreelancerDashboard'
export default function RouterComponent() {
  return (
    <Routes>
        <Route path='/' element={
            <React.Fragment>
                <LandingPage/>
            </React.Fragment>
        }></Route>
        <Route path='/Usertype' element={
            <React.Fragment>
                <Signup/>
            </React.Fragment>
        }></Route>
        <Route path='/Signup' element={
            <React.Fragment>
                <MainSignup/>
            </React.Fragment>
        }></Route>
        <Route path='/Login' element={
            <React.Fragment>
                <Login/>
            </React.Fragment>
        }></Route>
        <Route path='/ClientDashboard' element={
            <React.Fragment>
                <ClientDashboard/>
            </React.Fragment>
        }></Route>
        <Route path='/FreelancerDashboard' element={
            <React.Fragment>
                <FreelancerDashboard/>
            </React.Fragment>
        }></Route>
    </Routes>
  )
}
