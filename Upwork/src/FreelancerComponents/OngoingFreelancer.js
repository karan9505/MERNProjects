import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MilestoneFreelancer from './MilestoneFreelancer';

export default function OngoingFreelancer(props) {

  const [selectedPost, setSP] = useState();

  const [mileStone, mileStatus] = useState(false)

  const [ongoingFreeArray, setOngoingFree] = useState([]);

  const getAppliedPosts = () => {
    axios.post("http://localhost:8000/upwork/freelancer/get-projects-info",
      {
        email: props.email,
        status: "incomplete"
      })
      .then((response) => {
        console.log("FREELANCE RESPONSE : ", response.data)
        setOngoingFree(response.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  useEffect(() => {
    getAppliedPosts();
  }, [])

  const getDaysLeft = (startDate, endDate) => {
    let s = new Date(startDate);
    let e = new Date(endDate);
    let daysLeft = (s.getTime() - e.getTime()) / (1000 * 60 * 60 * 24);
    return (<p className='postBodyP'>{" : " + daysLeft}</p>)
  }

  const showMileStone = (e) => {
    for (let i = 0; i < ongoingFreeArray.length; i++) {
      if (ongoingFreeArray[i].jobPostId === Number(e.target.parentElement.id)) {
        setSP(ongoingFreeArray[i])
      }
    }
    mileStatus(prev => !prev)
  }

  return (
    <div>
      {mileStone ?
        <>
          <MilestoneFreelancer selectedPost={selectedPost} mileStatus={mileStatus} />
        </> :
        <>
          {
            ongoingFreeArray.length > 0 ?
              <>
                {
                  ongoingFreeArray.map((posts, index) => {
                    return (
                      <div id={posts.jobPostId} name={index} className='jobPostDiv'>
                        <p className='postHeadP'>Title</p>
                        <p className='postBodyP'>{posts.title}</p>
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

                        <input type='button' value={"Milestones : " + Number(posts.millstones.length)} className='applicantButton' onClick={(e) => { showMileStone(e) }}></input>
                      </div>
                    )
                  })
                }
              </> :
              <><h1>Ongoing Post Empty</h1></>
          }
        </>

      }
    </div>
  )
}
