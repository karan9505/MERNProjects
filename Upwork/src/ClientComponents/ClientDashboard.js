import React, { useEffect, useState } from 'react'
import '../CSS/ClientDashboard.css'
import AddPost from './AddPost';
import CountUp from 'react-countup'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AllPostsC from './AllPostsC';
import Viewapplicants from './Viewapplicants';
import Ongoing from './Ongoing';
export default function ClientDashboard() {

    const [reloader,setReloader]=useState(false)

    const [AddPostStatus, setAddPost] = useState(false);

    const [dashBoardData, setDashData] = useState({});

    const [clientTab, setClientTab] = useState('AllPosts');

    const Client_dashboard_api = 'http://localhost:8000/upwork/client/dashboard';

    const Location = useLocation();
    const [viewApplicants, vappStatus] = useState(false);

    const [viewId, setViewId] = useState('');

    
    const clientEmail = Location.state.clientEmail;
    console.log(clientEmail)
    const getDashBoardData = () => {
        axios.post(Client_dashboard_api, { email: clientEmail })
            .then((response) => {
                setDashData(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            });
        clientTabSwitch();
    }
    useEffect(() => {
        getDashBoardData();
    }, [AddPostStatus, reloader])

    const clientTabSwitch = () => {
        if (clientTab === 'AllPosts') {
            return (<AllPostsC clientEmail={clientEmail} AddPostStatus={AddPostStatus} vappStatus={vappStatus} setViewId={setViewId} reloader={reloader} />)
        }
        else if (clientTab === 'Ongoing')
        {
            return (<Ongoing clientEmail={clientEmail} reloader={setReloader} setClientTab={setClientTab} />)
        }
    }

    return (
        <>
            {
                Object.keys(dashBoardData).length === 0 ?
                    <><p>KKK</p></> :
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
                        {AddPostStatus ?
                            <AddPost Function={setAddPost} ClientId={dashBoardData.clientId} clientEmail={Location.state.clientEmail} /> : <></>}
                        <div id="ClientBoard">
                            <div id="ClientAlalytics">
                                <div id="MyPost" className='CDAData' onClick={(e) => { setClientTab('AllPosts') }}>
                                    <h1>
                                        <CountUp start={0} end={dashBoardData.jobPostCount} duration={2}></CountUp>+
                                    </h1>
                                    <p>Posts</p>
                                </div>
                                <div id="OnGoingPro" className='CDAData' onClick={(e) => { setClientTab ('Ongoing')}}>
                                    <h1>
                                        <CountUp start={0} end={dashBoardData.incompleteProjectCount} duration={2}></CountUp>+
                                    </h1>
                                    <p>On going projects</p>
                                </div>
                                <div id="CompletedPro" className='CDAData'>
                                    <h1>
                                        <CountUp start={0} end={dashBoardData.completeProjectCount} duration={2}></CountUp>+
                                    </h1>
                                    <p>Completed projects</p>
                                </div>
                                <div id="Payment" className='CDAData'>
                                    <h1>
                                        Account<br></br>Billing
                                    </h1>
                                </div>
                            </div>
                            <div id="ClientPost">
                                <div className='ClientSearchDiv'>
                                    <input type='text' placeholder='Search....' id="ClientSearchText"></input>
                                    <input type='button' id="AddPostButton" value="New post" onClick={() => { setAddPost(prevState => !prevState) }}></input>
                                </div>
                                <div id='ClientPostsBack'>
                                    {clientTabSwitch()}
                                </div>
                            </div>
                            <div id="ClientProfile">
                                <h1>Client<br></br>Dashboard</h1>
                                <img src="../IMAGES/ClientDashImg.png" alt='Not' className='dashIconImg'></img> 
                            </div>
                        </div>
                        {
                            viewApplicants ?
                                <>
                                    <Viewapplicants vappStatus={vappStatus} viewId={viewId} clientId={Location.state.clientId} clientEmail={clientEmail} setReloader={setReloader} />
                                </> :
                                <></>
                        }
                    </>
            }
        </>
    )
}
