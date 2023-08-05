import React, { useEffect ,useState} from 'react'
import axios from 'axios'
export default function CompletedFreelancer(props) {


 const [completedFreeArray, setCompletedFree] = useState([]);


 const getAllCompletedPosts = () => {
  axios.post("http://localhost:8000/upwork/freelancer/get-projects-info",
   {
    email: props.email,
    status: "complete"
   })
   .then((response) => {
    console.log("FREELANCE COMPLETE RESPONSE : ", response.data)
    setCompletedFree(response.data)
   })
   .catch((error) => {
    console.log(error.message)
   })
 }

 useEffect(()=> {
  getAllCompletedPosts();
 },[])

  return (
    <div>
    {
     completedFreeArray.length > 0 ?
      <>
       {
        completedFreeArray.map((posts, index) => {
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
             <p className='postHeadP'>Earned</p>
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
           </div>
          </div>
         )
        })
       }
      </> :
      <><h1>Ongoing Post Empty</h1></>
    }
    </div>
  )
}
