import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/Usrsolvedquiz.css'
class ShowSolvedQuiz extends React.Component{

    constructor(props){
        super(props);
        this.url = "http://localhost:1010/quizapp/user/show-solved-quiz";
        this.phonenumber = JSON.parse(localStorage.getItem('uphone'));        // props.phonenumber
        this.state = {obj : []};
    }

    componentDidMount(){
        axios.post(this.url,{phonenumber:this.phonenumber})
        .then((resp)=>{
            console.log(resp.data);
            this.setState({obj : resp.data})
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

    showLeaderboard = (e) =>{
        console.log("Redirect Page to UserQuizResult ");
        localStorage.setItem('resultQuizTitle',JSON.stringify(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 6)].title))
        localStorage.setItem('resultQuizID',JSON.stringify(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 6)].quizId))
        document.getElementById('userleaderboard').click();

    }

    showResult = (e) =>{

        console.log("Redirect Page to UserQuizResult ");
        localStorage.setItem('resultQuizTitle',JSON.stringify(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 6)].title))
        localStorage.setItem('resultQuizID',JSON.stringify(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 6)].quizId))
        document.getElementById('userresult').click();
    }

    render(){
        if(this.state.obj.length == 0){
            return (
                <div className='AdminLeft'>
                    <p id="pqtitle1">Solved Quizes</p>
                    <div className='ShowSolvedQuiz' id='ShowSolvedQuiz'>
                     </div>
                </div>
            );
        }else{
            return (
                <div className='AdminLeft'>
                    <p id="pqtitle1">Solved Quizes</p>
                <div className='ShowSolvedQuiz' id='ShowSolvedQuiz'>
                    {
                        this.state.obj.map((value, index)=>{
                            return(
                                <div key={index} id={"Solved"+index} className="uunql">
                                    <p>Topic : {value.title}</p>&emsp;&emsp;
                                    <span>Marks : {value.obtainedMarks} / {value.maxScore}</span>
                                    <button onClick={this.showResult} className="aunq1">Result</button>
                                    <button onClick={this.showLeaderboard} className="aunq2">Leaderboard</button>
                                </div>
                            );
                        })
                    }
                </div>
                <Link to='/Result' id='userresult'></Link>
                <Link to='/Leaderboard' id='userleaderboard'></Link>
                </div>
            );
        }
    }
}

export default ShowSolvedQuiz;