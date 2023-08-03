import React, { useEffect } from 'react'


import axios from 'axios'

export default function AccountsFreelancer(props) {
 console.log("..............", props.email)
console.log("ACCOUNT PROPS : ",props)
 const getTransaction = () => {
  axios.post('http://localhost:8000/upwork/transaction', { email: "f" })
   .then((response) => {
   console.log("TRANSACTION LIST : ",response.data)
   })
   .catch((error) => {
   console.log(error.message)
  })
 }

 useEffect(() => {
  getTransaction();
 },[])

  return (
    <div>
      <h1>Acoount</h1>
    </div>
  )
}
