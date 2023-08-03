import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CSS/Ongoing.css'
import MilestonesView from './MilestonesView';
export default function Ongoing(props) {

  const [ongoingPosts, setOngoingPost] = useState([]);

  const [mileStone, mileStatus] = useState(false)

  const [onGoingMileStone,setOngoingNum]=useState(1)

  const [mileStoneArray, setMileStoneArray] = useState([]);

  const [mileSubData, setMileSubData] = useState({});

  const getAllOngoing = () => {
    console.log("IN ALL : ", props.clientEmail)
    axios.post("http://localhost:8000/upwork/client/get-projects-info",
      {
        email: props.clientEmail,
        status: "incomplete"
      })
      .then((response) => {
        console.log("ALL ON GOING : ",response.data)
        setOngoingPost(response.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    getAllOngoing();
  }, [])

  const getDaysLeft = (startDate, endDate) => {
    let s = new Date(startDate);
    let e = new Date(endDate);
    let daysLeft = (s.getTime() - e.getTime()) / (1000 * 60 * 60 * 24);
    return (<p className='postBodyP'>{" : " + daysLeft}</p>)
  }

  const setMileStoneData = (e) => {
    
    for (let i = 0; i < ongoingPosts.length; i++)
    {
      if (ongoingPosts[i].jobPostId === Number(e.target.parentElement.id)) {
        setMileSubData({
          projectid: ongoingPosts[i].projectId,
          freelancerid: ongoingPosts[i].freelancerId,
          jobpostid: ongoingPosts[i].jobPostId,
          clientid: ongoingPosts[i].clientId
        })
        setMileStoneArray(ongoingPosts[i].millstones)
        setOngoingNum(ongoingPosts[i].onGoingMileStone)
        break;
      }
    }
    mileStatus(prev => !prev)
  }

  return (
    <div>
      {
        ongoingPosts.length > 0 ?
          <>
            {
              mileStone ?
                <>
                  <MilestonesView mileStatus={mileStatus} mileStoneArray={mileStoneArray} mileSubData={mileSubData} onGoingMileStone={onGoingMileStone} clientEmail={props.clientEmail} reloader={props.reloader} mileStatus={mileStatus} setClientTab={props.setClientTab} />
                </> :
                <>
                  {
                    ongoingPosts.map((posts, index) => {
                      return (
                        <div id={posts.jobPostId} name={index} className='jobPostDiv'>
                          <p className='postHeadP'>Title</p>
                          <p className='postBodyP'>{posts.title}</p>
                          <div className='ongoingsubdiv'>
                            <p className='postHeadP'>Freelancer </p>
                            <p className='postBodyP'>{" : " + posts.freelancerName}</p>
                          </div>
                          <div className='ongoingsubdiv'>
                            <p className='postHeadP'>Milestones</p>
                            <p className='postBodyP'>{" :  Total - " + posts.millstones.length}</p>
                          </div>
                          <div className='ongoingsubdivdates'>
                            <div>
                              <p className='postHeadP'>Budget</p>
                              <p className='postBodyP'>{" : " + posts.totalBudget}</p>
                            </div>
                            <div>
                              <p className='postHeadP'>Start Date</p>
                              <p className='postBodyP'>{" : " + posts.startDate.slice(8, 10) + '-' + posts.startDate.slice(5, 7) + '-' + posts.startDate.slice(0, 4)}</p>
                            </div>
                            <div>
                              <p className='postHeadP'>End Date</p>
                              <p className='postBodyP'>{" : " + posts.endDate.slice(8, 10) + '-' + posts.endDate.slice(5, 7) + '-' + posts.endDate.slice(0, 4)}</p>
                            </div>
                            <div>
                              <p className='postHeadP'>Days Left</p>
                              {getDaysLeft(posts.startDate, posts.endDate)}
                            </div>
                          </div>

                          <input type='button' value={"Milestones : " + Number(posts.millstones.length)} className='applicantButton' onClick={(e) => {setMileStoneData(e)}}></input>
                        </div>
                      )
                    })
                  }
                </>
            }

          </> :
          <><h1>All Ongoing Post Empty</h1></>
      }
    </div>
  )
}
