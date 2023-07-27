import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import '../CSS/ClientDashboard.css'
export default function AllPosts(props) {

    const [allClientPosts,setClientPosts]=useState([]);

    const all_client_post_api='http://localhost:8000/upwork/client/get-my-job-post';

    useEffect(()=>{
        axios.post(all_client_post_api,{email:props.clientEmail})
        .then((response)=>{
            console.log(response.data)
            setClientPosts(response.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    },[props.AddPostStatus])
  return (
    allClientPosts.map((posts)=>{
        return(
            <div id={posts.jobId} className='jobPostDiv'>
                <p>Title : {posts.jobTitle}</p>
                <p>{posts.jobDescription}</p>
            </div>
        )
    })
  )
}
