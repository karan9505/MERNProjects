import React, { useEffect, useState } from 'react'
import '../CSS/FreelancerDashboard.css'
import CountUp from 'react-countup'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import AllPostsF from './AllPostsF'
import AppliedJobs from './AppliedJobs'
import OngoingFreelancer from './OngoingFreelancer'
import CompletedFreelancer from './CompletedFreelancer'
import AccountsFreelancer from './AccountsFreelancer'
import Lowbalance from '../GeneralComponents/Lowbalance'
import NotificationWindow from '../GeneralComponents/NotificationWindow'
import ViewEditFree from './ViewEditFree'
export default function ClientDashboard() {

    const Location = useLocation();

    const [viewSatus, setView] = useState(false);

    console.log("START : ",Location.state.freelancerEmail)
        
    const freelancer_dashboard = "http://localhost:8000/upwork/freelancer/dashboard";
    
    const [freelancerDbData, freelancerDbDataSet] = useState({});

    const [freeTab, setFreeTab] = useState('All');
    
    const [balanceDown, setBalanceDown] = useState(false);

    const [requiredBalance, setReqBal] = useState('');

    const getDashBoardData=()=>{
        console.log("OK");
        axios.post(freelancer_dashboard,
        {
            email: Location.state.freelancerEmail
        })
        .then((response)=>{
            console.log("freelancer dash",response.data)
            freelancerDbDataSet(response.data)
            setNotiCount(response.data.notification)
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
                return (<AllPostsF FreelancerID={freelancerDbData.freelancerId} email={freelancerDbData.email} getDashBoardData={getDashBoardData} setBalanceDown={setBalanceDown} setReqBal={setReqBal} />)
            else if (freeTab === 'Applied')
                return (<AppliedJobs FreelancerID={freelancerDbData.freelancerId} />)
            else if (freeTab === 'Ongoing')
                return (<OngoingFreelancer email={freelancerDbData.email} />)
            else if (freeTab === 'Completed')
                return (<CompletedFreelancer email={freelancerDbData.email} />)
        }
    }

    const [notificationWindow, setNotWindow] = useState(false)

    const [notificationCount, setNotiCount] = useState(0);

    const getNotificationCount = (e) => {
        axios.post('http://localhost:8000/upwork/notificationFreelancerCount', { key: freelancerDbData.freelancerId })
            .then((response) => {
                console.log("LATEST NOTIFICATION : ", response.data)
                setNotiCount(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const viewNotification = (e) => {
        setNotWindow(prev => !prev);
        setNotiCount(0);
    }

    const [viewProfStatus, setViewProf] = useState(false);

    return (
        <>
            {
                viewSatus ?
                    <>
                        <AccountsFreelancer email={freelancerDbData.email} setView={setView} userType={"F"} getNotificationCount={getNotificationCount} />
                    </> :
                    <></>
            }
            {
                balanceDown ?
                    <>
                        <Lowbalance setBalanceDown={setBalanceDown} requiredBalance={requiredBalance} />
                    </> :
                    <></>
            }
            {
                notificationWindow ?
                    <>
                        <NotificationWindow setNotWindow={setNotWindow} Id={freelancerDbData.freelancerId} userType={"freelancerid"} />
                    </> :
                    <></>
            }
            {
                viewProfStatus ?
                    <>
                        <ViewEditFree setViewProf={setViewProf} Id={freelancerDbData.freelancerId} />
                    </> :
                    <></>
            }
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
                    <div id="" className='CDAData' onClick={(e) => { setFreeTab("Applied") }}>
                        <h1>
                            <CountUp start={0} end={freelancerDbData.jobProposalCount} duration={2}></CountUp>+
                        </h1>
                        <p>Applied</p>
                    </div>
                    <div id="" className='CDAData' onClick={(e) => { setFreeTab("Ongoing") }}>
                        <h1>
                            <CountUp start={0} end={freelancerDbData.incompleteProjectCount
                            } duration={2}></CountUp>+
                        </h1>
                        <p>Ongoing projects</p>
                    </div>
                    <div id="" className='CDAData' onClick={(e) => { setFreeTab("Completed") }}>
                        <h1>
                            <CountUp start={0} end={freelancerDbData.completeProjectCount
                            } duration={2}></CountUp>+
                        </h1>
                        <p>Completed projects</p>
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
                <div id="FLProfile">
                    <h1 className='dashHead1'>Freelancer<br></br><span>Dashboard</span></h1>
                    <img src="../IMAGES/FreeDashImg.png" alt='Not' className='dashIconImg1'></img>
                    <div className='dashDataImgDiv'>
                        {
                            (Number(notificationCount)) > 0 ?
                                <>
                                    <div className='notificationCount' title="Notifications" onClick={(e) => { viewNotification(e) }}>
                                        <p>{notificationCount}</p>
                                    </div>
                                </> :
                                <>
                                </>
                        }
                        <img src='../IMAGES/Notification.png' alt="Not" className='notificationDashImg' onClick={(e) => { viewNotification(e) }} title='Notification'></img>
                        <img src='../IMAGES/Chat.png' alt="Not" className='chatDashImg' title='Chats'></img>
                        <img src='../IMAGES/View.png' alt="Not" className='editProfImg' title='View Profile' onClick={(e) => { setViewProf (prev=>!prev)}}></img>
                    </div>
                    <div id="freelancerAccount" className='CDAData' onClick={(e) => { setView(prev=>!prev) }}>
                        <h1>
                            Account<br></br>Billing
                        </h1>
                    </div>
                </div>
            </div>
            </>
    )
}
