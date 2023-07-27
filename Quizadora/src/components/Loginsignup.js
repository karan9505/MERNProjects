import React from "react";
import {Link} from 'react-router-dom'
class Loginsignup extends React.Component
{
    render()
    {
        return(
            <div className="LoginSignup">
            <div className="WelcomeRightUpper">
                <p className="LoginHeader">Let's get started...</p>
                <div className="Login">
                    <img src="../IMAGES/Login.png" alt="Not Found" className="LoginImg"></img>
                    <Link className="LoginButton" to='/Login'><p className="LoginName">LOGIN</p></Link>
                </div>
                <div className="Signup">
                    <img src="../IMAGES/Signup.png" alt="Not Found" className="SignupImg"></img>
                    <Link className="SignupButton" to='/Signup'><p className="SignupName">SIGNUP</p></Link>
                </div>
            </div>
            <div className="WelcomeRightLower">
                <p>Or continue with</p>
                <div className="Icons">
                    <img src="../IMAGES/Google.png" alt="Not Found" className="Google"></img>
                    <img src="../IMAGES/Linkedin.png" alt="Not Found" className="Linkedin"></img>
                    <img src="../IMAGES/Facebook.png" alt="Not Found" className="Facebook"></img>
                    <img src="../IMAGES/Twitter.png" alt="Not Found" className="Twitter"></img>
                 </div>
            </div>
            </div>
        );
    }
}

export default Loginsignup;