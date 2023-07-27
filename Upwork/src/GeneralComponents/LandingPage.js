import React from 'react'
import "../CSS/LandingPage.css"
import { useNavigate } from 'react-router-dom'
export default function LandingPage() {
    const Navigate=useNavigate();

    const log=(e)=>
    {
        console.log("ok")
    }
  return (
    <>
    <div id="Navbar">
        <img src='../IMAGES/UwFullLogo.png' alt="Not Found" id="UwImgLogo"></img>
        <div id="Navbar1">
            <div className="Navbar11">
                <p>Find Talent</p>
                <img src='../IMAGES/DownArrow.png' className='DownArrow' alt="Not Found"></img>
            </div>
            <div className="Navbar11">
                <p>Find Work</p>
                <img src='../IMAGES/DownArrow.png' className='DownArrow' alt="Not Found"></img>
            </div>
            <div className="Navbar11">
                <p>Why Upwork</p>
                <img src='../IMAGES/DownArrow.png' className='DownArrow' alt="Not Found"></img>
            </div>
            <div className="Navbar11">
                <p>Enterprise</p>
            </div>   
        </div>
        <div id="Navbar2">
            <div id="Navbar21">
                <img src='../IMAGES/SearchIcon.png' alt="Not Found" id="NavSearch"></img>
                <input type='text' placeholder='Search' className='NavSearch'></input>
            </div>
            <input type='button' value='Talent' id="TalentButton"></input>
        </div>
        <p id="LoginButton" onClick={()=>{Navigate('/Login')}}>Log In</p>
        <input type='button' value="Sign Up" id="SignupButton" onClick={()=>{Navigate('/Usertype')}}></input>
    </div>
    <div id="SecondNavbar">
        <div id="SecondNlist">
            <p>Development & IT</p>
            <p>AI Services</p>
            <p>Design & Creative</p>
            <p>Sales & Marketing</p>
            <p>Admin & Customer Support</p>
            <p>More</p>
        </div>
    </div>
    <div className='Board1'>
        <h1 id="Heading">How work<br></br>should work</h1>
        <p id="Tagline1">Forget the old rules. You can have the best people.<br></br>
            Right now. Right here.</p>
        <input type="button" value="Get started" id="GetStarted"></input>
        <img src='../IMAGES/Circle.jpg' id="Cicimg" alt="Not Found"></img>
        <div id="B1P2">
            <p>Trusted by</p>
            <div id="B1Images">
                <img src='../IMAGES/Microsoft.png'alt="Not Found" id="B1img1"></img>
                <img src='../IMAGES/Airbnb.png'alt="Not Found" id="B1img2"></img>
                <img src='../IMAGES/Bissell.png'alt="Not Found" id="B1img3"></img>
            </div>
        </div>
    </div>
    <div className='Board2'>
        <img src="../IMAGES/B2Img.png" alt='Not Found'id="B2img"></img>
        <div id="Board2left">
            <p id="Taglin2">Up your work game, it's free</p>
            <div id="B2T1">
                <img src='../IMAGES/Notepad.png' alt="Not Found" id="Noteimg"></img>
                <div>
                    <p className='Taghead'>No cost to join</p>
                    <p className='Tagcont'>Register and browse professionals, explore projects, or even book a consultation.</p>
                </div>
            </div>
            <div id="B2T2">
                <img src='../IMAGES/Pin.png' alt="Not Found" id="Pinimg"></img>
                <div>
                    <p className='Taghead'>Post a job and hire top talent</p>
                    <p className='Tagcont'>Finding talent doesn’t have to be a chore. Post a job or we can search for you!</p>
                </div>
            </div>
            <div id="B2T3">
                <img src='../IMAGES/Badge.png' alt="Not Found" id="Badgeimg"></img>
                <div>
                    <p className='Taghead'>Work with the best—without breaking the bank</p>
                    <p className='Tagcont'>Upwork makes it affordable to up your work and take advantage of low transaction rates.</p>
                </div>
            </div>
            <input type='button' value="Sign up for free" id="signupb2"></input>
            <input type='button' value="Learn how to hire" id="hirebutton"></input>
        </div>
    </div>
    <div className='Board3'>
        <p id="Tagline3">Browse talent by category</p>
        <p id="Tagline4">Looking for work?<span id="browsejobs">Browser jobs</span></p>
        <div id="boardgrid1">
            <div className='bge'>
                <p className='bgeh'>Development & IT</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star'></img>
                <div>
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
            <div className='bge'>
                <p className='bgeh'>AI Services</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star'></img>
                <div>
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
            <div className='bge'>
                <p className='bgeh'>Design & Creative</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star'></img>
                <div>
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
            <div className='bge'>
                <p className='bgeh'>Sales & Marketing</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star'></img>
                <div>
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
        </div>
        <div id="boardgrid2">
            <div className='bge'>
                <p className='bgeh'>Writing & Translation</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star'></img>
                <div>
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
            <div className='bge'>
                <p className='bgeh'>Admin & Customer Support</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star2'></img>
                <div id="lowdiv">
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
            <div className='bge'>
                <p className='bgeh'>Financing & Accounting</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star'></img>
                <div>
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
            <div className='bge'>
                <p className='bgeh'>Engineering & Architecture</p>
                <img src='../IMAGES/Star.png' alt='Not found' className='Star2'></img>
                <div id="lowdiv">
                    <p>4.85/5</p>
                    <p>1853 skills</p>
                </div>
            </div>
        </div>
    </div>
    <div id="Board4">
        <img src='../IMAGES/WheelChair.jpg' alt='Not Found' id="Wheelchair"></img>
        <div>
            <p id="B4L1">Enterprise Suite</p>
            <h1 id="B4L2">This is how<br></br><span>good companies<br></br>find good company.</span></h1>
            <p id="B4L3">Access the top 1% of talent on Upwork, and a full suite of hybrid workforce management tools. This is how innovation works now.</p>
            <div id="B4L4">
                <img src='../IMAGES/Tools.png' alt='Not Found' id="Toolimg"></img>
                <p>Access expert talent to fill your skill gaps</p>
            </div>
            <div id="B4L5">
                <img src='../IMAGES/Suitcase.png' alt='Not Found' id="Suitpng"></img>
                <p>Control your workflow: hire, classify and pay your talent</p>
            </div>
            <div id="B4L6">
                <img src='../IMAGES/CustCare.png' alt='Not Found' id="Custimg"></img>
                <p>Partner with Upwork for end-to-end support</p>
            </div>
        </div>
        <input type='button' value='Learn more' id="Learnmore"></input>
    </div>
    <div id="Board5">
        <p id="B5L1">For clients</p>
        <h1 id="B5L2">Find talent<br></br>your way</h1>
        <p id="B5L3">Work with the largest network of independent<br></br>professionals and get things done—from quick<br></br>turnarounds to big transformations.</p>
        <div id="B5Grid">
            <div className='B5GE'>
                <p className='B5GEL1'>Post a job<br></br>and hire a pro</p>
                <p className='B5GEL2'>Talent Marketplace &#8594;</p>
            </div>
            <div className='B5GE'>
                <p className='B5GEL1'>Browse and<br></br>buy projects</p>
                <p className='B5GEL2'>Project Catalog &#8594;</p>
            </div>
            <div className='B5GE'>
                <p className='B5GEL1'>Let us help you find<br></br>the right</p>
                <p className='B5GEL2'>Talent Scout<span>&#8594;</span></p>
            </div>
        </div>
    </div>
    <div id='last'></div>
    </>
  )
}
