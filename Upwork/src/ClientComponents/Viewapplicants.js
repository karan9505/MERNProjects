import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Viewapplicants(props) {
  const Navigate = useNavigate();
  const [hireWindow, setHire] = useState(false)
  const [applicantList, setApplicantist] = useState([]);
  const get_applicants_api = "http://localhost:8000/upwork/client/get-job-post-proposals";
  const getApplicants = () => {
    console.log("oooooooooooooooooooooooooooooo")
    axios.post(get_applicants_api, { jobPostId: props.viewId })
      .then((response) => {
        console.log(response.data);
        setApplicantist(response.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const [milestonesArray, setMilestoneArray] = useState([]);
  const [mileC, setMileC] = useState(0);
  const [projectData, setProject] = useState({
    jobpostid: props.viewId,
    clientid: props.clientId,
  })

  useEffect(() => {
    getApplicants();
  }, [])

  const Hire = (e) => {
    setHire(prev => !prev);
    setProject({ ...projectData,jobproposalid: e.target.parentElement.id,freelancerid:e.target.id })
  }

  const sendProject = (e) => {
    console.log(projectData)
    axios.post("http://localhost:8000/upwork/client/start-project", projectData)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === 'success') {
          console.log("pppp")
          props.vappStatus(prev => !prev)
          props.setReloader(prev=>!prev)
          Navigate('/ClientDashboard', { state: { clientEmail: props.clientEmail, clientId: props.clientId } })
        }
          
      })
      .catch((error) => {
      console.log(error.message)
    })
  }

  class Milestones{
    constructor(title, description, mstartdate, menddate) {
      this.title = title;
      this.description = description;
      this.mstartdate = mstartdate;
      this.menddate = menddate;
    }
  }

  const createMilestones = (e) => {
    document.getElementById('spsdmc').style.display = "none";
    document.getElementById('milestoneresetbutt').style.display = "block";
    document.getElementById('sendProjectButton').style.display = "block";

    setMilestoneArray([]);
    if (mileC < 11) {
      for (let i = 0; i < mileC; i++) {
        setMilestoneArray(prev=>[...prev, new Milestones()]);
      }
    }
  }

  const ressetMilestone = () => {
    document.getElementById('spsdmc').style.display = "block";
    document.getElementById('milestoneresetbutt').style.display = "none";
    document.getElementById('sendProjectButton').style.display = "none";

    setMilestoneArray([]);
  }

  const setMilestoneData = (e) => {
    if (e.target.id === "milestoneText") {
      if(e.target.value.length<51)
        setMilestoneArray(prev => prev, milestonesArray[e.target.parentElement.id].title = e.target.value)
    }
    else if (e.target.id === "milestoneDes")
      setMilestoneArray(prev => prev, milestonesArray[e.target.parentElement.id].description = e.target.value)
    else if (e.target.id === "milestoneSD")
      setMilestoneArray(prev => prev, milestonesArray[e.target.parentElement.id].mstartdate = e.target.value)
    else if (e.target.id === "milestoneED")
      setMilestoneArray(prev => prev, milestonesArray[e.target.parentElement.id].menddate = e.target.value)
    setProject({ ...projectData, milestone: milestonesArray })
  }

  return (
    <div className="viewapplicantsback">
      {
        hireWindow ?
          <>
            <div id="createprojectback">
              <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.vappStatus(prevState => !prevState) }} id='BackImg'></img>
              <h1 id="setuptHeading">Set-up Project</h1>

              <div id="startProjectDiv1">
                <div className="spSubD">
                  <label htmlFor='Budget'>Budget : </label>
                  <input type='number' id="Budget" placeholder='Budget...' onChange={(e) => { setProject({ ...projectData, budget:e.target.value })}}></input>
                </div>
                <div className="spSubD">
                  <label htmlFor='spstartdate'>Start Date : </label>
                  <input type='date' id="spstartdate" onChange={(e) => { setProject({ ...projectData, startdate: e.target.value }) }}></input>
                </div>
                <div className="spSubD">
                  <label htmlFor='spenddate'>End Date : </label>
                  <input type='date' id="spenddate" onChange={(e) => { setProject({ ...projectData, enddate: e.target.value }) }}></input>
                </div>
              </div>
              <div id="startProjectDiv2">
                <div id="spsdmc">
                  <label htmlFor='milestoneCount'>Total Milestones : </label>
                  <input type='number' id='milestoneCount' onChange={(e)=>{setMileC(e.target.value)}}></input>
                  <input type='button' onClick={(e) => { createMilestones(e) }} value={"SET"}></input>
                  
                </div>
                <input type='button' value={"RESET"} id="milestoneresetbutt" onClick={(e) => { ressetMilestone (e)}}></input>
                <div id="milestonescroll">
                  {
                    
                    milestonesArray.map((data, index) => {
                      return (<div className='milestoneDiv' id={index}>
                        <p className='milestoneheading'>Milestone : {index + 1}</p>
                        <p className='milestonetitle'>Title</p>
                        <input type='text' placeholder='Title...Max(50) Characters' onChange={(e) => { setMilestoneData(e) }} id="milestoneText" value={data.title} className='milestonetitleval'></input>
                        <p className='milestonedes'>Description</p>
                        <textarea placeholder='Description...' id="milestoneDes" onChange={(e) => { setMilestoneData(e) }} value={data.description} className='milestonedesval'></textarea> 
                      </div>)
                    })
                    
                  }
                </div>
                <input type="button" onClick={(e) => { sendProject(e) }} id="sendProjectButton" value={"START PROJECT"}></input>
              </div>

            </div>
          </> :
          <>
            <div className='applicantscroll'>
              <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.vappStatus(prevState => !prevState) }} id='BackImg'></img>
              <h1 id="viewApplicantHeading">Applicant's List</h1>
              <div id="applcantcrolldiv">
                {
                  applicantList.length > 0 ?
                    <>{
                      applicantList.map((data, index) => {
                        return (
                          <div className='jobPostDiv' id={data.jobProposalId}>
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
                            <input type='button' value={"Hire"} className="hirebuttonfinal" onClick={(e) => { Hire(e) }} id={data.freelancerId}></input>
                          </div>
                        )
                      })
                    }</> :
                    <>
                    </>
                }
              </div>
            </div>
          </>
      }
    </div>
  )
}
