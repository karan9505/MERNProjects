import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
export default function Viewapplicants(props) {

 const [applicantList, setApplicantist] = useState([]);
 const get_applicants_api = "http://localhost:8000/upwork/client/get-job-post-proposals";
 const getApplicants = () => {
  axios.post(get_applicants_api, { jobPostId: props.viewId })
   .then((response) => {
    console.log(response.data);
    setApplicantist(response.data)
   })
   .catch((error) => {
    console.log(error.message)
   })
 }

 useEffect(() => {
  getApplicants();
 },[])

 console.log("VIEW ID : ",props.viewId)
  return (
   <div className="viewapplicantsback">
    <div className='applicantscroll'>
     <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.vappStatus(prevState => !prevState) }} id='BackImg'></img>
     <h1 id="viewApplicantHeading">Applicant's List</h1>
     <div id="applcantcrolldiv">
      {
       applicantList.length>0 ?
        <>{
         applicantList.map((data, index) => {
          return (
           <div className='jobPostDiv'>
            <p className='postHeadP'>Name</p>
            <p className='postBodyP'>{data.firstName + ' ' + data.lastName}</p>
            <p className='postHeadP'>Skills</p>
            <div className='skillwrap'>
             {
              data.skills.map((skill, index) => {
               return (<p className='skillp'>{skill}</p>)
              })
             }
            </div>
            <input type='button' value={"Hire"} className="hirebuttonfinal"></input>
           </div>
          )
         })
        }</> :
        <>
        </>
     }
     </div>
    </div> 
   </div>
  )
}
