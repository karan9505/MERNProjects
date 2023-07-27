import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../CSS/Welcome.css'
import Gridr from './Grid'
import Label from './Label'
// import axios from 'axios'
export class Welcome extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       img:true
    }
  }

  // getData=()=>
  // {
  //   axios.post("http://192.168.206.39/facebook/sign-up",
  //   {
  //     mobileNumber:"7028",
  //     firstName:"ganesh",
  //     lastName:"bagav",
  //     password:"1234",
  //     securityQuestion:"pet name ?",
  //     securityAnswe:"nick",
  //     date:"2001-02-01",
  //     gender:"male"

  //   })
  //   .then((resp)=>{
  //     console.log(resp.data)
  //   })
  //   .catch((err)=>{
  //     console.log(err.message)
  //   })
  // }
  render() {
    return (
      <div>
        <img src='../IMAGES/Zomatoback.jpg' alt="Not Found" id='BackImage'></img>
        <Link id='AddRestaurantL' to="/">Add restaurant</Link>
        <Link to="./Login" id='Login'>Log in</Link>
        <Link to='/Signup' id='Signup'>Signup</Link>
        <div id='ZomatoTitle'>
            <img src='../IMAGES/ZomatoText.png' alt='Not Found' id="ZomatoText"></img>
            <p id="Line1">
            Find the best restaurants, cafés
            </p>
            <p id="Line2">
            and bars in India
            </p>
        </div>
        <div id="IndiaHeading">
            <div id="India1">
                <p id="Line3">Popular locations in</p>
                <img src='../IMAGES/Flag.png' alt="Not Found" id="Flag"></img>
                <p id="Line4">India</p>
            </div>
            <div id="About">
                <p>
                From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food,<br></br> Zomato covers it all. Explore menus, and millions of restaurant photos and reviews from users<br></br> just like you, to find your next great meal.
                </p>
            </div>
            <div id="cities">
                <Gridr imgLink1="" name1="Agra Restaurants" name2="Ahmedabad Restaurants" name3="Ajmer Restaurants"/>
                <Gridr imgLink="" name1="Alappuzha Restaurants" name2="Allahabad Restaurants" name3="Amravati Restaurants"/>
                <Gridr imgLink="" name1="Amritsar Restaurants" name2="Aurangabad Restaurants" name3="Bengaluru Restaurants"/>
                <Gridr imgLink="" name1="Bhopal Restaurants" name2="Bhubneswar Restaurants" name3="Chandigarh Restaurants"/>
                <Gridr imgLink="" name1="Chennai Restaurants" name2="Coimbatore Restaurants" name3="Cuttack Restaurants"/>
                <Gridr imgLink="" name1="Darjeeling Restaurants" name2="Dehradun Restaurants" name3="Delhi NCR Restaurants"/>
                <Gridr imgLink="" name1="Dharamshala Restaurants" name2="Guntur Restaurants" name3="Guwahati Restaurants"/>
                <Gridr imgLink="" name1="Gorakhpur Restaurants" name2="Ahmedabad Restaurants" name3="Ajmer Restaurants"/>
                <Gridr imgLink="" name1="Gwalior Restaurants" name2="Haridwar Restaurants" name3="Hyderabad Restaurants"/>
                <Gridr imgLink="" name1="Indore Restaurants" name2="Jabalpur Restaurants" name3="Jaipur Restaurants"/>
                <Gridr imgLink="" name1="Jalandhar Restaurants" name2="Jammu Restaurants" name3="Jamnagar Restaurants"/>
                <Gridr imgLink="" name1="Jamshedpur Restaurants" name2="Jhansi Restaurants" name3="Jodhpur Restaurants"/>
                <Gridr imgLink="" name1="Junagadh Restaurants" name2="Kanpur Restaurants" name3="Khajuraho Restaurants"/>
                <Gridr imgLink="" name1="Khamgaon Restaurants" name2="Kharagpur Restaurants" name3="Kochi Restaurants"/>
                <Gridr imgLink="" name1="Kolhapur Restaurants" name2="Kolkata Restaurants" name3="Kota Restaurants"/>
                <Gridr imgLink="" name1="Lucknow Restaurants" name2="Ludhiana Restaurants" name3="Madurai Restaurants"/>
                <Gridr imgLink="" name1="Manali Restaurants" name2="Mangalore Restaurants" name3="Manipal Restaurants"/>
                <Gridr imgLink="" name1="Meerut Restaurants" name2="Mumbai Restaurants" name3="Mussoorie Restaurants"/>
                <Gridr imgLink="" name1="Mysore Restaurants" name2="Nagpur Restaurants" name3="Nainital Restaurants"/>
                <Gridr imgLink="" name1="Nashik Restaurants" name2="Neemrana Restaurants" name3="Ooty Restaurants"/>
                <Gridr imgLink="" name1="Palakkad Restaurants" name2="Patiala Restaurants" name3="Patna Restaurants"/>
                <Gridr imgLink="" name1="Puducherry Restaurants" name2="Pune Restaurants" name3="Pushkar Restaurants"/>
                <Gridr imgLink="" name1="Raipur Restaurants" name2="Rajkot Restaurants" name3="Ranchi Restaurants"/>
                <Gridr imgLink="" name1="Rishikesh Restaurants" name2="Salem Restaurants" name3="Shimla Restaurants"/>
                <Gridr imgLink="" name1="Siliguri Restaurants" name2="Srinager Restaurants" name3="Surat Restaurants"/>
                <Gridr imgLink="" name1="Thrissur Restaurants" name2="Tirupati Restaurants" name3="Trichy Restaurants"/>
                <Gridr imgLink="" name1="Trivandrum Restaurants" name2="Udaipur Restaurants" name3="Vadodara Restaurants"/>
                <Gridr imgLink="" name1="Varanasi Restaurants" name2="Vellore Restaurants" name3="Vijavawada Restaurants"/>
                <Label imgLink="" name="Visakhapatman Restaurants"/>
            </div>
            <p id="Allcountry">All Countries</p>
            <div id="countries">
                <Gridr imgS={true} imgLink1="../IMAGES/CF/india.png" imgLink2="../IMAGES/CF/austallia.png" imgLink3="../IMAGES/CF/brazil.png" name1="India" name2="Australia" name3="Brazil"/>
                <Gridr imgS={true} imgLink1="../IMAGES/CF/canada.png" imgLink2="../IMAGES/CF/chile.png" imgLink3="../IMAGES/CF/canada.png" name1="Canada" name2="Chile" name3="Czech Republic"/>
                <Gridr imgS={true} imgLink1="../IMAGES/CF/indonesia.png" imgLink2="../IMAGES/CF/ireland.png" imgLink3="../IMAGES/CF/italy.png" name1="Indonesia" name2="Ireland" name3="Italy"/>
                <Gridr imgS={true} imgLink1="../IMAGES/CF/lebanon.png" imgLink2="../IMAGES/CF/malaysia.png" imgLink3="../IMAGES/CF/new.png" name1="Lebanon" name2="Malaysia" name3="New Zealand"/>
                <Gridr imgS={true} imgLink1="../IMAGES/CF/philippines.png" imgLink2="../IMAGES/CF/poland.png" imgLink3="../IMAGES/CF/portugal.png" name1="Philippines" name2="Poland" name3="Portugal"/>
                <Gridr imgS={true} imgLink1="../IMAGES/CF/qatar.png" imgLink2="../IMAGES/CF/singapore.png" imgLink3="../IMAGES/CF/slovakia.png" name1="Qatar" name2="Singapore" name3="Slovakia"/>
                <Gridr imgS={true} imgLink1="../IMAGES/CF/south.png" imgLink2="../IMAGES/CF/sri.png" imgLink3="../IMAGES/CF/turkey.png" name1="South Africa" name2="Sri Lanka" name3="Turkey"/>
                <Gridr imgS={true} imgLink1="../IMAGES/CF/uae.png" imgLink2="../IMAGES/CF/unitedk.png" imgLink3="../IMAGES/CF/uniteds.png" name1="UAE" name2="United Kingdom" name3="United States"/>
            </div>
        </div>
        <div id="Footer">
          <div id="Footer1">
            <img src='../IMAGES/zomatoblack.png' alt='' id="Zblack"></img>
            <div id="Footer11">
              <img src='../IMAGES/Flag.png' alt='' id="FFlag"></img>
              <p id="Line5">India</p>
              <img src='../IMAGES/Downarr.png' alt='' id="Downarr1"></img>
            </div>
            <div id="Footer12">
              <img src='../IMAGES/web.png' alt='' id="web"></img>
              <p id="Line6">English</p>
              <img src='../IMAGES/Downarr.png' alt='' id="Downarr2"></img>
            </div>
          </div>
          <div id="Footer2">
            <div id="aboutzomato">
              <p id="Head1">ABOUT ZOMATO</p>
              <p id="Line7">Who We Are<br></br>Blog<br></br>Work With us<br></br>Investor Relations<br></br>Report Fraud<br></br>Contact Us</p>
            </div>
            <div id="zomaverse">
              <p id="Head2">ZOMAVERSE</p>
              <p id="Line8">Zomato<br></br>Blinkit<br></br>Feeding India<br></br>Hyperpure<br></br>Zomaland</p>
            </div>
            <div id="resenp">
              <div id="restaurant">
                <p id="Head3">FOR RESTAURANTS</p>
                <p id="Line9">Partner With Us<br></br>Apps For You</p>
             </div>
             <div id="enterprise">
              <p id="Head4">FOR ENTERPRISES</p>
              <p id="Line10">Zomato For Enterprise</p>
              </div>
            </div>
            <div id="learnmore">
              <p id="Head5">LEARN MORE</p>
              <p id="Line11">Privacy<br></br>Security<br></br>Terms<br></br>Sitemap</p>
            </div>
            <div id="social">
              <p id="Head6">SOCIAL LINKS</p>
              <div id="socialimg">
                <img src='../IMAGES/SOCIAL/Linked.png' alt='NOt Found' className='simg'></img>
                <img src='../IMAGES/SOCIAL/Insta.png' alt='NOt Found' className='simg'></img>
                <img src='../IMAGES/SOCIAL/Twitter.png' alt='NOt Found' className='simg'></img>
                <img src='../IMAGES/SOCIAL/Youtube.png' alt='NOt Found' className='simg'></img>
                <img src='../IMAGES/SOCIAL/Facebook.png' alt='NOt Found' className='simg'></img>
              </div>
              <img src='../IMAGES/SOCIAL/ios.png' alt='' id='store1'></img>
              <img src='../IMAGES/SOCIAL/android.png' alt='' id='store2'></img>
            </div>
          </div>
          <p id='lastline'>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-<br></br>2023 © Zomato™ Ltd. All rights reserved.</p>
        </div>
        {/* <button onClick={this.getData}>CLICK</button> */}
      </div>
    )
  }
}
export default Welcome
