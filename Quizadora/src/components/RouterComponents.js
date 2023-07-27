import React, { Component } from 'react'
import Welcome from './Welcome'
import Loginsignup from './Loginsignup'
import LoginWindow from './Loginwindow'
import Signupwindow from './Signupwindow'
import ForgotPassword from './ForgotPassword'
import Admin from './Admin'
import User from './User'
import ShowQuizAdmin from './ShowQuizAdmin'
import {Route,Routes} from 'react-router-dom'
import AddQuiz from './AddQuiz'
import ShowUnsolvedQuiz from './ShowUnsolvedQuiz'
import ShowSolvedQuiz from './ShowSolvedQuiz'
import AttemptQuiz from './AttemptQuiz'
import QuizResult from './Userresult'
import UserLeaderBoard from './UserLeaderBoard'
import EditQuiz from './EditQuizAdmin'
import AdminQuizLeaderboard from './AdminQuizLeaderboard'
import AdminQuizRemarks from './AdminQuizRemarks'
export class RouterComponents extends Component {
  render() {
    return (
      <div>
        <Routes>
            <Route path='/' element={
                <React.Fragment>
                    <Welcome/>
                    <Loginsignup/>
                </React.Fragment>
            }></Route>
            <Route path='/Login' element={
                <React.Fragment>
                    <Welcome/>
                    <LoginWindow/>
                </React.Fragment>
            }></Route>
            <Route path='/Signup' element={
                <React.Fragment>
                    <Welcome/>
                    <Signupwindow/>
                </React.Fragment>
            }></Route>
            <Route path='/Forgotpassword' element={
                <React.Fragment>
                    <Welcome/>
                    <ForgotPassword/>
                </React.Fragment>
            }></Route>
            <Route path='/Admin' element={
                <React.Fragment>
                    <Admin/>
                    <ShowQuizAdmin/>
                </React.Fragment>
            }></Route>
            <Route path='/Addquiz' element={
                <React.Fragment>
                    <Admin/>
                    <AddQuiz/>
                </React.Fragment>
            }></Route>
            <Route path='/User' element={
                <React.Fragment>
                    <User/>
                    <ShowUnsolvedQuiz/>
                </React.Fragment>
            }></Route>
            <Route path='/Usersolvedquiz' element={
                <React.Fragment>
                    <User/>
                    <ShowSolvedQuiz/>
                </React.Fragment>
            }></Route>
            <Route path='/Solve' element={
                <React.Fragment>
                    <User/>
                </React.Fragment>
            }></Route>
            <Route path='/Attemptquiz' element={
                <React.Fragment>
                    <User/>
                    <AttemptQuiz/>
                </React.Fragment>
            }></Route>
            <Route path='/Unsolved' element={
                <React.Fragment>
                    <User/>
                    <ShowUnsolvedQuiz/>
                </React.Fragment>
            }></Route>
            <Route path='/Result' element={
                <React.Fragment>
                    <User/>
                    <QuizResult/>
                </React.Fragment>
            }></Route>
            <Route path='/Aresult' element={
                <React.Fragment>
                    <Admin/>
                    <QuizResult/>
                </React.Fragment>
            }></Route>
            <Route path='/Uremark' element={
                <React.Fragment>
                    <Admin/>
                    <AdminQuizRemarks/>
                </React.Fragment>
            }></Route>
            <Route path='/Leaderboard' element={
                <React.Fragment>
                    <User/>
                    <UserLeaderBoard/>
                </React.Fragment>
            }></Route>
            <Route path='/Aqleaderboard' element={
                <React.Fragment>
                    <Admin/>
                    <AdminQuizLeaderboard/>
                </React.Fragment>
            }></Route>
            <Route path='/Editquiz' element={
                <React.Fragment>
                    <Admin/>
                    <EditQuiz/>
                </React.Fragment>
            }></Route>
        </Routes>
      </div>
    )
  }
}
export default RouterComponents;
