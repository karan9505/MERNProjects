import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function MilestonesView(props) {
  const [mileStoneArray, setMileArray] = useState(props.mileStoneArray);

  const Navigate = useNavigate();

  const [mileSubData, setMileSubData] = useState(props.mileSubData);

  const [onGoingMileStone, setOngoingNum] = useState(props.onGoingMileStone)

  console.log("MILE ONGOING : ", onGoingMileStone)

  const updateMileStone = () => {
    axios.post("http://localhost:8000/upwork/client/get-project-milestones", mileSubData)
      .then((response) => {
        console.log(response.data)
        setMileArray(response.data.mileStones)
        setOngoingNum(response.data.onGoingMilestone)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const submitMileStone = (e) => {
    mileSubData.milestoneid = e.target.parentElement.id;
    console.log("MILE DATA : ", mileSubData)
    axios.post("http://localhost:8000/upwork/client/verify-milestone", mileSubData)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "successful")
          updateMileStone();
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const submitProjectFinal = (e) => {
    axios.post("http://localhost:8000/upwork/client/complete-project", mileSubData)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "Successful") {
          props.mileStatus(prev=>!prev)
          props.reloader(prev => !prev)
          props.setClientTab("AllPosts")
          Navigate('/ClientDashboard', { state: { clientEmail: props.clientEmail, clientId: mileSubData.clientId } })
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div id="milestonemainback">
      <h1 className='mileStoneMainHeading'>Milestones</h1>
      {
        mileStoneArray.map((data, index) => {
          return (<div className='milestoneDiv' id={data.milestoneId}>
            <p className='milestoneheading1'>Milestone : {index + 1}</p>
            <p className='milestonetitle'>Title : {data.title}</p>
            <p className='milestonedes1'>Despription :</p>
            <textarea className='milestonedestext'>{data.description}</textarea>
            <p className='milestonesolution'>Solution :</p>
            <textarea className='milestonesolutiontext' disabled>{data.solution}</textarea>
            {
              index < Number(onGoingMileStone) - 1 ?
                <>
                  <div className='postHiderDivFree'></div>
                </> :
                <>
                  {
                    data.submission ?
                      <>
                        <input type='button' value={"VERIFY"} className='verifypending' onClick={(e) => { submitMileStone(e) }}></input>
                      </> :
                      <>
                        <input type='button' value={"PENDING"} className='verifypending' ></input>
                      </>
                  }
                </>
            }
          </div>)
        })
      }
      <input type='button' value={"BACK"} onClick={(e) => { props.mileStatus(prev => !prev) }} className='mileToProjectButton'></input>
      {
        Number(onGoingMileStone) === mileStoneArray.length + 1 ?
          <>
            <input type='button' value={"COMPLETE PROJECT"} onClick={(e) => { submitProjectFinal(e) }}></input>
          </> : <>
          </>
      }
    </div>
  )
}
