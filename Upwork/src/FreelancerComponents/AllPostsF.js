import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import '../CSS/FreelancerDashboard.css'
export default function AllPostsF(props) {

    console.log("ALL POST : ",props)

    const [allPost, setAllPost] = useState([]);
    const my_feed_api = " http://localhost:8000/upwork/freelancer/get-freelancer-feed";

    const getAllPosts = () => {
        console.log("MAIL MAIL :")
        axios.post(my_feed_api, { email: props.email })
            .then((response) => {
                console.log("DEFAULT POSTS : ", response.data)
                    props.getDashBoardData();
                    setAllPost(response.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
    }

    useEffect(() => {
        getAllPosts();
    }, [props.reloader])

    const getHiered = (e) =>
    {
        console.log(props.FreelancerID, e.target.parentElement.id)
        axios.post("http://localhost:8000/upwork/freelancer/send-job-proposal",
            {
                freelancerid: props.FreelancerID,
                jobpostid: e.target.parentElement.id
            })
            .then((response) => {
                console.log("C R : ",response.data)
                if (response.data.message === "Please Add Balance") {
                    props.setReqBal(response.data.required)
                    props.setBalanceDown(prev => !prev)
                }
                else    
                    getAllPosts();
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <div>
            {
                allPost.length>0 ?
                    <>
                        {
                            allPost.map((posts, index) => {
                                return (
                                    <div id={posts.jobPostId} key={posts.jobPostId} className='jobPostDiv'>
                                        <p className='postDate'>{posts.date.slice(8, 10) + '-' + posts.date.slice(5, 7) + '-' + posts.date.slice(0, 4)}</p>
                                        <p className='postHeadP'>Title</p>
                                        <p className='postBodyP'>{posts.jobTitle}</p>
                                        <p className='postHeadP'>Description</p>
                                        <p className='postBodyP'>{posts.jobDescription}</p>
                                        <p className='postHeadP'>Skills required</p>
                                        <div className='skillwrap'>
                                            {
                                                posts.skills.map((skill, index) => {
                                                    return(<p className='skillp'>{skill}</p>)
                                                })
                                            }
                                        </div>
                                        <div className='extraDataPost'>
                                            <div className='edpsd'>
                                                <p className='postBodyP'>Category : <span>{posts.category}</span></p>
                                            </div>
                                            <div className='edpsd'>
                                                <p className='postBodyP'>Scope : <span>{posts.scope}</span></p>
                                            </div>
                                            <div className='edpsd'>
                                                <p className='postBodyP'>Budget : <span>{posts.budget}</span></p>
                                            </div>
                                        </div>
                                        <input type='button' value={"Get Hired"} className='jobApplyButton' onClick={(e)=>{getHiered(e)}}></input>
                                    </div>
                                )
                            })
                        }
                    </> :
                    <><h1>All Post Empty</h1></>
            }
        </div>
    )
}
