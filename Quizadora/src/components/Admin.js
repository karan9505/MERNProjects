import React from "react";
import AddQuiz from "./AddQuiz"
import ShowQuizAdmin from './ShowQuizAdmin.js'
import { Link } from "react-router-dom";
class Admin extends React.Component
{
    AddQuiz=()=>
    {
        document.getElementById('addqlink').click();
    }
    render()
    {

            return(
                <>
                    <div className="Adminleft">
                        <div className="AdminHead">
                            <img src="../IMAGES/ADMIN/AdminDP.png" alt="Not Found" id="AdminDP"></img>
                            <div>
                                <p id="Tag0">Admin</p>
                                <p id="Tag1">Dashboard</p>
                            </div>
                            <button onClick={this.AddQuiz} id="AddButton">ADD QUIZ</button>
                        </div>
                        <Link to="/Addquiz" id="addqlink" ></Link>
                        <Link to='/Admin'><img src='../IMAGES/Home.png' alt="o" className="userHome" title="HOME"></img></Link>
                        <Link to='/Login'><img src='../IMAGES/Logout.png' alt="o" className="userLogout" title="LOGOUT"></img></Link>
                    </div>
                </>
            )
    }
}
export default Admin;