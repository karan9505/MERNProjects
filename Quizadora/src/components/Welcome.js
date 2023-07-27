import React from "react";
import './CSS/Welcome.css'
import ShowQuizAdmin from "./ShowQuizAdmin";
class Welcome extends React.Component
{
    render()
    {
        return(
            <div>
                <div className="WelcomeLeft">
                    <div className="WelcomeTag">
                        <p className="Tag0">QuizAdora!!,</p>
                        <p className="Tag1">Welcomes</p>
                        <p className="Tag2">You</p>
                    </div>
                <img src="../IMAGES/Astro.png" alt="Not Found" className="Astro"></img>
                </div>
                <div className="WelcomeRight">
                    <img src="../IMAGES/Headimg.jpg" alt="Not Found" className="Headup"></img>
                    <img src="../IMAGES/Headimg.jpg" alt="Not Found" className="Headdown"></img>
                    <img src="../IMAGES/Minibg.png" alt="Not Found" className="Minibg"></img>
                </div>
            </div>
        )
    }
}
export default Welcome;