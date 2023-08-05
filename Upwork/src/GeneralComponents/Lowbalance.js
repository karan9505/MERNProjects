import React from 'react'

export default function Lowbalance(props) {
  return (
   <div className='LowBalanceBack'>
    <div className='lowbalanceDiv'>
     <h1>Low Balance</h1>
        <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.setBalanceDown(prevState => !prevState) }} id='BackImg'></img>
        <p>{"Add : "+props.requiredBalance}</p>
    </div>
    </div>
  )
}
