import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import '../CSS/ClientDashboard.css'
export default function AllPostsC(props) {

    const [allClientPosts, setClientPosts] = useState('');

    const all_client_post_api = 'http://localhost:8000/upwork/client/get-my-job-post';


    useEffect(() => {
        axios.post(all_client_post_api, { email: props.clientEmail })
            .then((response) => {
                console.log(response.data)
                setClientPosts(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }, [props.AddPostStatus,props.reloader])

    const view = (e) => {
        props.setViewId(e.target.parentElement.id);
        props.vappStatus(prev=>!prev)
    }
    return (
        <div>
            {
                allClientPosts.length>0?
                    <>
                        {
                            allClientPosts.map((posts, index) => {
                                return (
                                    <div id={posts.jobId} name={index} className='jobPostDiv'>
                                        <p className='postDate'>{posts.date.slice(8, 10) + '-' + posts.date.slice(5, 7) + '-' + posts.date.slice(0, 4)}</p>
                                        <p className='postHeadP'>Title</p>
                                        <p className='postBodyP'>{posts.jobTitle}</p>
                                        <p className='postHeadP'>Description</p>
                                        <p className='postBodyP'>{posts.jobDescription}</p>
                                        <p className='postHeadP'>Skills required</p>
                                        <div className='skillwrap'>
                                            {
                                                posts.skillTags.map((skill, index) => {
                                                    return (<p className='skillp'>{skill.skills}</p>)
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
                                        <input type='button' value={"Applicants : " + Number(posts.jobProposals.length)} className='applicantButton' onClick={(e) => { view(e) }}></input>
                                    </div>
                                )
                            })
                        }
                    </> :
                    <><h1>All Post Empty Main</h1></>
            }
        </div>
    )
}
