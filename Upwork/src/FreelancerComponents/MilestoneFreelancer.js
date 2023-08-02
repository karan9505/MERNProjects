
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
export default function MilestoneFreelancer(props) {
  const [mileStoneArray, setMileArray] = useState([]);

  // const [mileSubData, setMileSubData] = useState(props.mileSubData);

  const [onGoingMileStone, setOngoingNum] = useState()


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


  const getMileStone = () => {
    axios.post("http://localhost:8000/upwork/client/get-project-milestones", { projectid: props.selectedPost })
      .then((response) => {
        console.log("FREE MILESTONES", response.data)
        setMileArray(response.data.mileStones)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    getMileStone();
  },[])

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

  return (
    <div id="milestonemainback">
      <h1>Milestone</h1>
      {
        mileStoneArray.map((data, index) => {
          return (<div className='milestoneDiv' id={data.milestoneId}>
            <p className='milestoneheading1'>Milestone : {index + 1}</p>
            <p className='milestonetitle'>Title : {data.title}</p>
            <p className='milestonedes1'>Despription :</p>
            <textarea className='milestonedestext'>{data.description}</textarea>
            {
              index < Number(onGoingMileStone) - 1 ?
                <>
                  {console.log("CHECKING")}
                  <div className='postHiderDiv'></div>
                </> :
                <>
                  {
                    data.submission ?
                      <>
                        <input type='button' value={"VERIFY"} className='verifypending' ></input>
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
      <input type='button' value={"BACK"} onClick={(e) => { props.mileStatus(prev => !prev) }}></input>
    </div>
  )
}
