import React from 'react'

export default function EditFreelancer(props) {
  return (
    <div>
     <div className='viewWindow'>
      <h1 id="profileViewHead">Profile Edit</h1>
      <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.setViewProf(prevState => !prevState) }} id='BackImg'></img>
     
     </div>
    </div>
  )
}
