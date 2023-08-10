import React, { useEffect, useState } from 'react'
import '../CSS/ViewEditFree.css'
import axios from 'axios'
import EditFreelancer from './EditFreelancer';
export default function ViewEditFree(props) {

 const [profileData, setProfileData] = useState({});

 const [editWindow, setEditWindow] = useState(false)

 const profileDetails = () => {
  axios.post("http://localhost:8000/upwork/freelancer/get-freelancer-profile", { key: props.Id })
   .then((response) => {
    console.log(response.data)
    setProfileData(response.data)
   })
   .catch((error) => {
    console.log(error.message)
   })
 }

 useEffect(() => {
  profileDetails();
 }, [])



 return (
  <div className='viewMainBack'>
   {
    editWindow ?
     <> 
      <div className='viewWindow'>
       <h1 id="profileViewHead">Edit Details</h1>
       <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.setViewProf(prevState => !prevState) }} id='BackImg'></img>
       {
        Object.keys(profileData).length > 0 ?
         <>
          <div className='viewName'>
           <div>
            <label htmlFor='inputFname'>First name : </label>
            <input type='text' id='inputFname' value={profileData.firstname}></input>
           </div>
           <div>
            <label htmlFor='inputFname'>Last name : </label>
            <input type='text' id='inputFname' value={profileData.lastname}></input>
           </div>
           </div>
          <div className='viewAboutWrap'>
           <p>About</p>
           <textarea id='viewAbtTxt' value={profileData.about}></textarea>
          </div>
          <div className='viewCECwrap'>
           <div>
            <label htmlFor='editPhone'>Contact</label>
            <input type='number' value={Number(profileData.phone)}></input>
           </div>
           <div>
            <label htmlFor='editPhone'>Email</label>
            <input type='text' value={profileData.email}></input>
           </div>
           <div>
            <label htmlFor='editPhone'>Country</label>
            <select value={profileData.country}>
             <option>India</option>
             <option>United State</option>
             <option>Australia</option>
             <option>Japan</option>
            </select>
           </div>
          </div>


          <div className='projectPreffWrap'>
           
           <p>Project type preference : </p>
           {
            profileData.projectPreference === 'S' ?
             <>
              <input type='radio' id='shortTermTypeJob' name='jobTerm' checked></input>
              <label htmlFor='shortTermTypeJob'>Short-Term : </label>

              <input type='radio' id='longTermTypeJob'  name='jobTerm'></input>
              <label htmlFor='longTermTypeJob'>Long-Term : </label>

              <input type='radio' id='bothTermTypeJob' name='jobTerm'></input>
              <label htmlFor='bothTermTypeJob'>Both : </label>
             </> :
             <>
              {
               profileData.projectPreference === 'L' ?
                <>
                 <input type='radio' id='shortTermTypeJob' name='jobTerm'></input>
                 <label htmlFor='shortTermTypeJob'>Short-Term : </label>

                 <input type='radio' id='longTermTypeJob' name='jobTerm' checked></input>
                 <label htmlFor='longTermTypeJob'>Long-Term : </label>

                 <input type='radio' id='bothTermTypeJob' name='jobTerm'></input>
                 <label htmlFor='bothTermTypeJob'>Both : </label>
                </> :
                <>
                 <input type='radio' id='shortTermTypeJob' name='jobTerm'></input>
                 <label htmlFor='shortTermTypeJob'>Short-Term : </label>

                 <input type='radio' id='longTermTypeJob' name='jobTerm'></input>
                 <label htmlFor='longTermTypeJob'>Long-Term : </label>

                 <input type='radio' id='bothTermTypeJob' checked name='jobTerm'></input>
                 <label htmlFor='bothTermTypeJob'>Both : </label>
                </>
              }
             </>
           }
          </div>


          <div className='editExperience'>
           <label htmlFor='editExp'>Experience : </label>
           <input type='range' min={0} max={10} onChange={(e)=>{console.log(e.target.value)}} step={2}></input>
          </div>
          <div className='viewSkillwrap'>
           <p>Skills : </p>
           {
            profileData.skills.map((skill, index) => {
             return (<p className='skillp'>{skill.skills}</p>)
            })
           }
          </div>
         </> : <></>
       }
      </div>
     </> :
     <>
      <div className='viewWindow'>
       <h1 id="profileViewHead">Profile Details</h1>
       <img src='../IMAGES/Edit.png' onClick={(e) => { setEditWindow(prev=>!prev)}}></img>
       <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.setViewProf(prevState => !prevState) }} id='BackImg'></img>
       {
        Object.keys(profileData).length > 0 ?
         <>
          <p className='viewName'>Name : {profileData.firstname + " " + profileData.lastname}</p>
          <div className='viewAboutWrap'>
           <p>About</p>
           <textarea id='viewAbtTxt' disabled>{profileData.about}</textarea>
          </div>
          <div className='viewCECwrap'>
           <p>Contact : {profileData.phone}</p>
           <p>Email : {profileData.email}</p>
           <p>Country : {profileData.country}</p>
          </div>
          <p className='viewExperience'>Experience : {profileData.experience}</p>
          <div className='viewSkillwrap'>
           <p>Skills : </p>
           {
            profileData.skills.map((skill, index) => {
             return (<p className='skillp'>{skill.skills}</p>)
            })
           }
          </div>
          <div className='projectPreffWrap'>
           <p>Project type preference : </p>

           {
            profileData.projectPreference === 'S' ?
             <>
              <p>Short-Term</p>
             </> :
             <>
              {
               profileData.projectPreference === 'L' ?
                <>
                 <p>Long-Term</p>
                </> :
                <>
                 <p> Short-Term & Long-Term</p>
                </>
              }
             </>
           }
          </div>
         </> : <></>
       }
      </div>
     </>
   }
  </div>
 )
}

