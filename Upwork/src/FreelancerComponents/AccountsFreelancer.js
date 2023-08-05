import React, { useEffect, useState } from 'react'
import '../CSS/AccountSection.css'
import axios from 'axios'

export default function AccountsFreelancer(props) {

  let addBalance_api;
  if (props.userType === 'F')
    addBalance_api = "http://localhost:8000/upwork/freelancer/add-balance";
  else
    addBalance_api = "http://localhost:8000/upwork/client/add-balance";

  const [detailView, setDetailView] = useState(false);
  console.log("..............", props.email)
  console.log("ACCOUNT PROPS : ", props)
  let tableClass;
  const [selectIndex,setSelectIndex]=useState(0);
  const [selectClass, setSelectClass] = useState('');
  const [addBalanceBody, setAddBalance] = useState({
    email: props.email,
    balance: '',
    password: ''
  })
  const [transactionData, setTransactionData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const getTransaction = () => {
    axios.post('http://localhost:8000/upwork/transaction', { email: props.email })
      .then((response) => {
        console.log("TRANSACTION LIST : ", response.data)
        setTransactionData(response.data)
        setUserDetails(response.data[response.data.length - 1])
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    getTransaction();
  }, [])

  const setClass = (e) => {
    tableClass = e;
  }

  const addBalance = () => {
    console.log("ADD BALANCE DATA : ", addBalanceBody);
    axios.post(addBalance_api, addBalanceBody)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "balance credited") {
          console.log("CREDITED")
          props.getNotificationCount();
          getTransaction();
          setAddBalance({email: props.email,balance:'',password:''})
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const viewSelected = (e,index) => {
    setSelectIndex(index);
    setSelectClass(e.target.parentElement.className);
    console.log(selectIndex,selectClass)
    setDetailView(prev => !prev);
  }

  return (
    <div className='AccountBack'>
      <div className='AccountWindow'>
        {
          detailView ?
            <div className='detailViewMain'>
              <div>
                <h1 id="transactionHeading">Transaction Recipt</h1>
                <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { setDetailView(prevState => !prevState) }} id='BackImg'></img>
                <img src='../IMAGES/UpWebLogo.png' alt="Not" className='transactionwatermark'></img>
                {
                  selectClass === "DebitedRow" ?
                    <>
                      <p>TRANSACTION TYPE : DEBIT</p>
                      <p>AMOUNT DEBITED : {transactionData[selectIndex].amount}</p>
                    </> :
                    <>
                      <p>TRANSACTION TYPE : CREDIT</p>
                      <p>AMOUNT CREDITED : {transactionData[selectIndex].amount}</p>
                    </>
                }
                <p>DATE OF TRANSACTION : {transactionData[selectIndex].date} </p>
                <p>TIME OF TRANSACTION : {transactionData[selectIndex].time} </p>
                <p>SENDER : {transactionData[selectIndex].from} </p>
                <p>RECIPIENT : {transactionData[selectIndex].to} </p>
                <p>TRANSACTION ID : {transactionData[selectIndex].transctionId}</p>
              </div>
            </div> :
            <></>
        }
        <h1 className='AccountHeading'>Acount Section</h1>
        <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.setView(prevState => !prevState) }} id='BackImg'></img>
        <div className='TransactionScroll'>
          {
            transactionData.length > 0 ?
              <>
                {
                  transactionData.map((data, index) => {
                    return (
                      index < transactionData.length - 1 ?
                        <>{
                          (data.from === data.to || data.from !== userDetails.name) ?
                            setClass("CreditedRow") :
                            setClass("DebitedRow")

                        }
                          {
                            index === 0 ?
                              <>
                                <div className='transctionHeading'>
                                  <p>Sr. No</p>
                                  <p>Date</p>
                                  <p>Time</p>
                                  <p>Credit / Debit</p>
                                  <p>Amount</p>
                                </div>
                                <div className={tableClass}>
                                  <td className='td1'>{index + 1}</td>
                                  <td className='td2'>{data.date}</td>
                                  <td className='td3'>{data.time}</td>
                                  {
                                    (data.from === data.to || data.from !== userDetails.name) ?
                                      <><td className='td4'>Credited</td></> :
                                      <><td className='td4'>Debited</td></>

                                  }
                                  {
                                    (data.from === data.to || data.from !== userDetails.name) ?
                                      <><td className='creditAmt'>{"+" + data.amount}</td></> :
                                      <><td className='debitAmt'>{"-" + data.amount}</td></>

                                  }
                                  <img src='../IMAGES/Tranview.png' alt="Not" className='TranView' onClick={(e) => { viewSelected(e, index) }} title='Click to view details'></img>
                                </div>
                              </> :
                              <div className={tableClass}>
                                <td className='td1'>{index + 1}</td>
                                <td className='td2'>{data.date}</td>
                                <td className='td3'>{data.time}</td>
                                {
                                  (data.from === data.to || data.from !== userDetails.name) ?
                                    <><td className='td4'>Credited</td></> :
                                    <><td className='td4'>Debited</td></>

                                }
                                {
                                  (data.from === data.to || data.from !== userDetails.name) ?
                                    <><td className='creditAmt'>{"+" + data.amount}</td></> :
                                    <><td className='debitAmt'>{"-" + data.amount}</td></>
                                }
                                <img src='../IMAGES/Tranview.png' alt="Not" className='TranView' onClick={(e) => { viewSelected(e, index) }} title='Click to view details'></img>
                              </div>
                          }
                        </> :
                        <></>
                    )
                  })
                }
              </>
              : <>Transaction Empty</>
          }
        </div>
        {
          userDetails.balance < 0 ?
            <div className='negetiveBalance'>
              <h1>Transaction : {transactionData.length - 1}</h1>
              <h1>Balance : {userDetails.balance}</h1>
            </div> :
            <div className='positiveBalance'>
              <h1>Transaction : {transactionData.length - 1}</h1>
              <h1>Balance : {userDetails.balance}</h1>
            </div>
        }
        <div className='AddBalanceSection'>
          <h1>Add Balance</h1>
          <div className='AddBalanceData'>
            <div>
              <label htmlFor='addBalanceAmount'>Enter Amount : </label>
              <input type='number' id='addBalanceAmount' placeholder='Enter amount...' onChange={(e) => { setAddBalance({ ...addBalanceBody, balance: String(e.target.value) }) }} value={addBalanceBody.balance}></input>
            </div>
            <div>
              <label htmlFor='addBalancePassword'>Enter Password : </label>
              <input type='password' id='addBalancePassword' placeholder='Enter password...' onChange={(e) => { setAddBalance({ ...addBalanceBody, password: e.target.value }) }} value={addBalanceBody.password}></input>
            </div>
          </div>
          <input type='button' value={"PROCEED"} onClick={(e) => { addBalance(e) }}></input>
        </div>
      </div>
    </div>
  )
}
