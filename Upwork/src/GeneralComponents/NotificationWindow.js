import axios from 'axios'
import { useEffect, useState } from 'react'
import '../CSS/Notification.css'
export default function NotificationWindow(props) {


  let notification_api;
  if (props.userType === 'clientid')
    notification_api = "http://localhost:8000/upwork/notificationClient";
  else
    notification_api = "http://localhost:8000/upwork/notificationFreelancer";

  const [latestNotifications, setLatestNotifications] = useState([])
  const [previousNotifications, setPeviousNotifications] = useState([])


  const getNotifications = (e) => {
    let Id = props.Id;
    axios.post(notification_api, { key: Id })
      .then((response) => {
        setLatestNotifications(response.data.notViewed)
        setPeviousNotifications(response.data.viewed)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  useEffect(() => {
    getNotifications();
  }, [])
  return (
    <div className='AccountBack'>
      <div className='notifivationWindow'>
        <h1 className='notificationHead'>Notifications</h1>
        <img src='../IMAGES/Close.png' alt='Not Found' onClick={() => { props.setNotWindow(prevState => !prevState) }} id='BackImg'></img>
        {
          latestNotifications.length > 0 && previousNotifications.length > 0 ?
            <>
              <div className='notificationWrapper1'>
                <p className='notiHead'>Latest notifications</p>
                <div className='notificationScroll'>
                  {
                    latestNotifications.map((data, index) => {
                      return (
                        <>
                          <div className='notificationElementL'>
                            <p>{data.notification}</p>
                            <div>
                              <p>{data.time}</p>
                              <p> {". ." + data.date}</p>
                            </div>
                          </div>

                        </>
                      )
                    })
                  }
                </div>
              </div>

              <div className='notificationWrapper'>
                <p className='notiHead'>Older notifications</p>
                <div className='notificationScroll'>
                  {
                    previousNotifications.map((data, index) => {
                      return (
                        <>
                          <div className='notificationElement' id={data.notificationId}>
                            <p>{data.notification}</p>
                            <div>
                              <p>{data.time}</p>
                              <p> {". ." + data.date}</p>
                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                </div>
              </div>
            </> :
            <>
              {
                latestNotifications.length > 0 ?
                  <>
                    <div className='notificationWrapper1'>
                      <p className='notiHead'>Latest notifications</p>
                      <div className='notificationScroll'>
                        {
                          latestNotifications.map((data, index) => {
                            return (
                              <>
                                <div className='notificationElementL'>
                                  <p>{data.notification}</p>
                                  <div>
                                    <p>{data.time}</p>
                                    <p> {". ." + data.date}</p>
                                  </div>
                                </div>

                              </>
                            )
                          })
                        }
                      </div>
                    </div>

                  </> : <></>
              }
              {
                previousNotifications.length > 0 ?
                  <>
                    <div className='notificationWrapper2'>
                      <p className='notiHead'>Older notifications</p>
                      <div className='notificationScroll'>
                        {
                          previousNotifications.map((data, index) => {
                            return (
                              <>
                                <div className='notificationElement' id={data.notificationId}>
                                  <p>{data.notification}</p>
                                  <div>
                                    <p>{data.time}</p>
                                    <p> {". ." + data.date}</p>
                                  </div>
                                </div>
                              </>
                            )
                          })
                        }
                      </div>
                    </div>
                  </> : <></>
              }
            </>
        }
      </div>
    </div>
  )
}
