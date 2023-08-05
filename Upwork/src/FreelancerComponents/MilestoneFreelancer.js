import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import '../CSS/MilestoneFreelancer.css'
export default function MilestoneFreelancer(props) {
  const [mileStoneArray, setMileArray] = useState([]);

  const [solution, setSolution] = useState('');

  const [onGoingMileStone, setOngoingNum] = useState()

  const [selectedPost, setSP] = useState(props.selectedPost);
  console.log("SELECTED POST : ",selectedPost)

  // const updateMileStone = () => {
  //   axios.post("http://localhost:8000/upwork/client/get-project-milestones", mileSubData)
  //     .then((response) => {
  //       console.log(response.data)
  //       setMileArray(response.data.mileStoneArray)
  //       setOngoingNum(response.data.onGoingMilestone)
  //     })
  //     .catch((error) => {
  //       console.log(error.message)
  //     })
  // }

  console.log()
  const getMileStone = () => {
    console.log(selectedPost.projectid)
    axios.post("http://localhost:8000/upwork/client/get-project-milestones", { projectid: selectedPost.projectId })
      .then((response) => {
        console.log("FREE MILESTONES", response.data)
        setMileArray(response.data.mileStones)
        setOngoingNum(response.data.onGoingMilestone)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    getMileStone();
  }, [])

  // const submitMileStone = (e) => {
  //   mileSubData.milestoneid = e.target.parentElement.id;
  //   console.log("MILE DATA : ", mileSubData)
  //   axios.post("http://localhost:8000/upwork/client/verify-milestone", mileSubData)
  //     .then((response) => {
  //       if (response.data.message === "successful")
  //         updateMileStone();
  //     })
  //     .catch((error) => {
  //       console.log(error.message)
  //     })
  // }

  const checkSolution = (e,index) => {
    if (e.target.value !== '')
      e.target.parentElement.childNodes[7].style.display = "block";
    else
      e.target.parentElement.childNodes[7].style.display = "none";
    setSolution(e.target.value);
  }

  const submitMileStone = (e) => {
    for (let i = 0; i < mileStoneArray.length; i++)
    {
      if (mileStoneArray[i].milestoneId === Number(e.target.parentElement.id)){
        selectedPost.milestoneid= e.target.parentElement.id;
        break;
      }
    }
    selectedPost.solution = solution;
    console.log("POST",selectedPost)
    axios.post("http://localhost:8000/upwork/freelancer/submit-milestone", selectedPost)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "successful")
          getMileStone();
      })
      .catch((error) => {
      console.log(error.message)
    })
  }

  return (
    <div id="milestonemainback">
      <h1 className='mileStoneMainHeading'>Milestone</h1>
      {
        mileStoneArray.map((data, index) => {
          return (<div className='milestoneDivFree' id={data.milestoneId}>
            <p className='milestoneheading1'>Milestone : {index + 1}</p>
            {
              index < Number(onGoingMileStone) - 1 ?
                <p className='mileStoneStatus'>Completed</p>:
                <>
                  {
                    index == Number(onGoingMileStone)-1 ?
                      <p className='mileStoneStatus'>Ongoing</p> :
                      <p className='mileStoneStatus'>Pending</p>
                  }
                </>
            }
            <p className='milestonetitle'>Title : {data.title}</p>
            <p className='milestonedes1'>Despription :</p>
            <textarea className='milestonedestext1' disabled>{data.description}</textarea>
            <p className='milestonesolution'>Solution :</p>
            <textarea className='milestonesolutiontext' placeholder='Define your solution...' onChange={(e) => { checkSolution(e,index) }}>{data.solution}</textarea>
            {
              index === Number(onGoingMileStone) - 1 ?
                <>
                  {
                    data.submission ?
                      <p className='freemilesubmitted'>SUBMITED</p> :
                      <input type='button' value={"SUBMIT"} className='verifypending1' onClick={(e) => { submitMileStone(e) }}></input>
                  }
                </> :
                <>
                  <div className='postHiderDivFree'></div>
                </>
            }
          </div>)
        })
      }
      <input type='button' value={"BACK"} onClick={(e) => { props.mileStatus(prev => !prev) }} className='mileToProjectButton'></input>
    </div>
  )
}
