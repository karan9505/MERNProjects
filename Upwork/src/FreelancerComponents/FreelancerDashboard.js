import React, { useEffect, useState } from 'react'
import '../CSS/FreelancerDashboard.css'
import CountUp from 'react-countup'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import AllPostsF from './AllPostsF'
import AppliedJobs from './AppliedJobs'
export default function ClientDashboard() {

    const Location = useLocation();


    console.log("START : ",Location.state.freelancerEmail)
        
    const freelancer_dashboard = "http://localhost:8000/upwork/freelancer/dashboard";
    
    const [freelancerDbData, freelancerDbDataSet] = useState({});

    const [freeTab,setFreeTab]=useState('All');

    const getDashBoardData=()=>{
        console.log("OK");
        axios.post(freelancer_dashboard,
        {
            email: Location.state.freelancerEmail
        })
        .then((response)=>{
            
            freelancerDbDataSet(response.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })

        
    }
    
    useEffect(()=>{
        getDashBoardData();
    }, [freeTab])

    const freeLancerTabSwitch = () => {
        if (Object.keys(freelancerDbData).length > 0) {
            if (freeTab === 'All')
                return (<AllPostsF FreelancerID={freelancerDbData.freelancerId} email={freelancerDbData.email} getDashBoardData={getDashBoardData} />)
            else if (freeTab === 'Applied')
                return (<AppliedJobs FreelancerID={freelancerDbData.freelancerId} />)
        }
    }

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
                    <div id="" className='FLAData' onClick={(e) => { setFreeTab("All") }}>
                        <h1>
                            <CountUp start={0} end={freelancerDbData.allPostCount
} duration={2}></CountUp>+
                        </h1>
                        <p>Posts</p>
                    </div>
                    <div id="" className='CDAData' onClick={(e)=>{setFreeTab("Applied")}}>
                        <h1>
                            <CountUp start={0} end={freelancerDbData.jobProposalCount} duration={2}></CountUp>+
                        </h1>
                        <p>Applied</p>
                    </div>
                    <div id="" className='CDAData'>
                        <h1>
                            <CountUp start={0} end={freelancerDbData.completeProjectCount
} duration={2}></CountUp>+
                        </h1>
                        <p>Completed projects</p>
                    </div>
                    <div id="" className='CDAData'>
                        <h1>
                            <CountUp start={0} end={freelancerDbData.incompleteProjectCount
} duration={2}></CountUp>+
                        </h1>
                        <p>Ongoing projects</p>
                    </div>
                </div>
                <div id="FLPost">
                    <div className='FLSearchDiv'>
                        <input type='text' placeholder='Search....' id="FLSearchText"></input>
                    </div>
                    <div id='FreePostsBack'>
                        {freeLancerTabSwitch()}
                    </div>
                </div>
                <div id="FLProfile"></div>
            </div>
        </>
    )
}
