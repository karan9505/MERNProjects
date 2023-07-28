import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import '../CSS/FreelancerDashboard.css'
export default function AllPostsF() {

    const [allPost, setAllPost] = useState('');
    let ss = '';
    const my_feed_api = " http://localhost:8000/upwork/freelancer/get-freelancer-feed";

    const getAllPosts = () => {
        console.log("In all posts")
        axios.post(my_feed_api, {})
            .then((response) => {
                console.log(response.data)
                setAllPost(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        getAllPosts();
    }, [])

    return (
        <div>
            {
                allPost.length ?
                    <>
                        {
                            allPost.map((posts, index) => {
                                return (
                                    <div id={posts.jobId} key={posts.jobId} className='jobPostDiv'>
                                        <p className='postDate'>{posts.date.slice(8, 10) + '-' + posts.date.slice(5, 7) + '-' + posts.date.slice(0, 4)}</p>
                                        <p className='postHeadP'>Title</p>
                                        <p className='postBodyP'>{posts.jobTitle}</p>
                                        <p className='postHeadP'>Description</p>
                                        <p className='postBodyP'>{posts.jobDescription}</p>
                                        <p className='postHeadP'>Skills required</p>
                                        <p className='postBodyP'>{posts.skills.toString()}</p>
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
                                        <input type='button' value={"Get Hired"} className='jobApplyButton'></input>
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
