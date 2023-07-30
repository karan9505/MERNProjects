import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AppliedJobs(props) {
    const [allPost, setAllPost] = useState({});
    const my_feed_api = " http://localhost:8000/upwork/freelancer/my-applied-jobs";

    const getAllPosts = () => {
        console.log("In all applied posts")
        console.log(props.FreelancerID)
        axios.post(my_feed_api, {
            freelancerid: props.FreelancerID
        })
            .then((response) => {
                console.log("AL------", response.data)
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
                allPost.length > 0 ?
                    <>
                        {
                            allPost.map((posts, index) => {
                                return (
                                    <div id={posts.jobPostId} key={posts.jobPostId} className='jobPostDiv'>
                                        <p className='postDate'>{posts.date.slice(8, 10) + '-' + posts.date.slice(5, 7) + '-' + posts.date.slice(0, 4)}</p>
                                        <p className='postHeadP'>Title</p>
                                        <p className='postBodyP'>{posts.titel}</p>
                                        <p className='postHeadP'>Description</p>
                                        <p className='postBodyP'>{posts.discription}</p>
                                        <p className='postHeadP'>Skills required</p>
                                        <div className='skillwrap'>
                                            {
                                                posts.skills.map((skill, index) => {
                                                    return (<p className='skillp'>{skill}</p>)
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
                                    </div>
                                )
                            })
                        }
                    </> :
                    <><h1>Applied Post Empty</h1></>
            }
        </div>
    )
}
