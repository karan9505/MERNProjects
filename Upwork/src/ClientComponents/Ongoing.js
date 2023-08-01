import axios from 'axios'
import React, { useEffect } from 'react'
export default function Ongoing(props) {

 const getAllOngoing = () => {
  console.log("IN ALL : ", props.clientEmail)
  axios.post("http://localhost:8000/upwork/client/get-projects-info",
   {
    email: props.clientEmail,
    status: "incomplete"
   })
   .then((response) => {
   console.log(response.data)
   })
   .catch((error) => {
   console.log(error.message)
  })
 }

 useEffect(() => {
  getAllOngoing();
 },[])

  return (
    <div>
      <h1>ongoing</h1>
    </div>
  )
}
