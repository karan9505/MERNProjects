import React, { useEffect, useState } from 'react'
import '../CSS/FreelancerDashboard.css'
import CountUp from 'react-countup'
export default function ClientDashboard() {
  return (
        <>
          <div id="CDNavbar">
        <img src='../IMAGES/UwFullLogo.png' alt="Not Found" id="UwImgLogo"></img>
        <div id="CDNavbar1">
            <div className="CDNavbar11">
                <p>Find Talent</p>
                <img src='../IMAGES/DownArrow.png' className='CDDownArrow' alt="Not Found"></img>
            </div>
            <div className="CDNavbar11">
                <p>Find Work</p>
                <img src='../IMAGES/DownArrow.png' className='CDDownArrow' alt="Not Found"></img>
            </div>
            <div className="CDNavbar11">
                <p>Why Upwork</p>
                <img src='../IMAGES/DownArrow.png' className='CDDownArrow' alt="Not Found"></img>
            </div>
            <div className="CDNavbar11">
                <p>Enterprise</p>
            </div>   
        </div>
        <div id="CDNavbar2">
            <div id="CDNavbar21">
                <img src='../IMAGES/SearchIcon.png' alt="Not Found" id="CDNavSearch"></img>
                <input type='text' placeholder='Search' className='CDNavSearch'></input>
            </div>
            <input type='button' value='Talent' id="CDTalentButton"></input>
        </div>
    </div>
    <div id="FLBoard">
        <div id="FLAlalytics">
            <div id="" className='FLAData'>
                <h1>
                    <CountUp start={0} end={100} duration={2}></CountUp>+
                </h1>
                <p>Posts</p>
            </div>
            <div id="" className='CDAData'>
                <h1>
                    <CountUp start={0} end={100} duration={2}></CountUp>+
                </h1>
                <p>On going projects</p>
            </div>
            <div id="" className='CDAData'>
                <h1>
                    <CountUp start={0} end={100} duration={2}></CountUp>+
                </h1>
                <p>Completed projects</p>
            </div>
            <div id="" className='CDAData'>
                <h1>
                    Account<br></br>Billing
                </h1>
            </div>
        </div>
        <div id="FLPost">
            <div className='FLSearchDiv'>
                <input type='text' placeholder='Search....' id="FLSearchText"></input>
            </div>
        </div>
        <div id="FLProfile"></div>
    </div>
        </>
  )
}
