import React from "react";
import './CSS/User.css'
import {Link} from 'react-router-dom'
class User extends React.Component
{
    render()
    {
        return(
            <>
                <div className="Userleft">
                        <div className="UserHead">
                            <img src="../IMAGES/SignUp.png" alt="Not Found" id="UserDP"></img>
                            <div>
                                <p id="Tag0" className="userheadone">User's</p>
                                <p id="Tag1">Dashboard</p>
                            </div>
                            <Link to='/Usersolvedquiz'><button id="Solved">SOLVED QUIZS</button></Link>
                            <Link to='/Unsolved'><button id="Unsolved">UNSOLVED QUIZ</button></Link>
                            <Link to='/Login'><img src='../IMAGES/Logout.png' alt="o" className="userLogoutP" title="LOGOUT"></img></Link>
                        </div>
                    </div>
            </>
        )
    }
}
export default User;