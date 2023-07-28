import '../CSS/AddPost.css'
import { useState } from 'react'
import axios from 'axios'
export default function AddPost(props) {

    const addpost_api_key = "http://localhost:8000/upwork/client/add-job-post";

    const getskills_api_key = "http://localhost:8000/upwork/admin/get-skills-byword";

    const [postData, setPostData] = useState({
        jobTitle: '',
        jobDescription: '',
        jobCategory: '',
        jobSkills: [],
        jobScope: '',
        jobBudget: '',
        clientId: props.ClientId
    })

    const [skillSet, setSkillSet] = useState([]);

    const jobTitleFun = (e) => {
        if (e.target.value.length <= 100)
            setPostData({ ...postData, jobTitle: e.target.value });
    }

    const jobDescriptionFun = (e) => {
        setPostData({ ...postData, jobDescription: e.target.value })
    }

    const jobCategoryFun = (e) => {
        if(e.target.value!=="Select your domain")
            setPostData({ ...postData, jobCategory: e.target.value })
    }

    // const jobSkillsFun=(e)=>
    // {
    //     setPostData({...postData,jobSkills:e.target.value})
    // }

    const jobScopeFun = (e) => {
        setPostData({ ...postData, jobScope: e.target.value })
    }

    const jobBudgetFun = (e) => {
        setPostData({ ...postData, jobBudget: e.target.value })
    }

    const postJob = (e) => {
        console.log(postData)
        axios.post(addpost_api_key, postData)
            .then((response) => {
                if (response.data.message === 'Post Added') {
                    console.log(response.data, 'okkkkkkk')
                    props.Function(prevState => !prevState)
                }
            })
            .catch((error) => {
                console.log(error.message)
            })

    }

    const setSkill = (e) => {
        axios.post(getskills_api_key, { skills: e.target.value })
            .then((response) => {
                console.log(response.data)
                setSkillSet(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
        setSkillSet([])
    }

    const skillSelect = (e) => {
        setPostData({ ...postData, jobSkills: [...postData.jobSkills, e.target.parentNode.id] })
        setSkillSet([])
    }

    return (
        <div id="AddPostBoard">
            <div id="PostDta" onClick={() => { setSkillSet([]) }}>
                <h1 id="AddPostHeading">Create post</h1>
                <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.Function(prevState => !prevState) }} id='BackImg'></img>
                <div id="jobTitlediv" className='PostDiv'>
                    <label for='jobTitle'>Project Title</label>
                    <input type='text' id="jobTitle" placeholder='Project Title...(Max 100 Characters)' onChange={(e) => { jobTitleFun(e) }} value={postData.jobTitle}></input>
                </div>

                <div id="jobDescriptiondiv" className='PostDiv'>
                    <label for='jobDescription'>Project Description</label>
                    <textarea type='text' id="jobDescription" placeholder='Project Description...' onChange={(e) => { jobDescriptionFun(e) }} value={postData.jobDescription} spellCheck={false}></textarea>
                </div>

                <div id="jobCategorydiv" className='PostDiv'>
                    <label for="jobCategory">Select your domain</label>
                    <select onChange={(e) => { jobCategoryFun(e) }} id="jobCategory">
                        <option>Select your domain</option>
                        <option>Full Stack Developer</option>
                        <option>Back-end Developer</option>
                        <option>Front-end Developer</option>
                        <option>Database Engineer</option>
                        <option>Devops Engineer</option>
                        <option>Tester</option>
                        <option>Q/A Analyst</option>
                    </select>
                </div>

                <div id="jobSkillsdiv" className='PostDiv'>
                    <label for='jobSkills'>Mention your skills</label>
                    <input type='text' id='jobSkills' placeholder='Skills' onChange={(e) => { setSkill(e) }}></input>
                    {
                        skillSet.length === 0 ?
                            <></> :
                            <div className='SkillSet'>
                                {
                                    skillSet.map((value) =>

                                        <div id={value}>
                                            <p>{value}</p>
                                            <input type='button' value='+' onClick={(e) => { skillSelect(e) }}></input>
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>

                <div id="jobTermdiv" className='PostDiv'>
                    <label for='Radiomaindiv'>Job term</label>
                    <div id="Radiomaindiv">
                        <div>
                            <input type='radio' id='ShortTermRadio' name='jobTerm' value="Short Term" onChange={(e) => { jobScopeFun(e) }}></input>
                            <label for='ShortTermRadio'>ShortTerm</label>
                        </div>
                        <div>
                            <input type='radio' id='LongTermRadio' name='jobTerm' value="Long Term" onChange={(e) => { jobScopeFun(e) }}></input>
                            <label for='LongTermRadio'>LongTerm</label>
                        </div>
                    </div>
                </div>

                <div id="jobBudgetdiv" className='PostDiv'>
                    <label for='jobBudgetInpdiv'>Budget</label>
                    <div id="jobBudgetInpdiv">
                        <input type='number' id='jobBudgetMax' placeholder='Min.'></input>
                        <img src='../IMAGES/Rupee.png' id='MaxRupeeSign' alt='Not Found'></img>
                        <input type='number' id='jobBudgetMin' placeholder='Max.' value={postData.jobBudget} onChange={(e) => { jobBudgetFun(e) }}></input>
                        <img src='../IMAGES/Rupee.png' id='MinRupeeSign' alt='Not Found'></img>
                    </div>
                </div>

                <input type='button' value="Post" id="PostJobButton" onClick={(e) => { postJob(e) }}></input>
            </div>

        </div>
    )
}
