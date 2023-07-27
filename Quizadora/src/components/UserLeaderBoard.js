import React, { Component } from 'react'
import axios from 'axios'
import './CSS/Leaderboard.css'
export default class UserLeaderBoard extends Component {
    constructor(props){
        super(props);
        this.phonenumber = JSON.parse(localStorage.getItem('uphone'));        // props.phonenumber
        this.quizTitle = JSON.parse(localStorage.getItem('resultQuizTitle'));        // props.quizTitle
        this.quizId = JSON.parse(localStorage.getItem('resultQuizID')) ;               // props.quizId
        this.state = {leadersObj : []};
        console.log("In leader board")
    }

    componentDidMount(){
        
        axios.post("http://localhost:1010/quizapp/show-leaderboard", {"quizId":this.quizId})
        .then((resp)=>{
            console.log(resp.data);
            this.setState({leadersObj : resp.data});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    getBack = (e) =>{
        console.log("Redirect to ShowSolvedQuiz Page");
        // props : this.phonenumber
    }

    render() {
        return (
            <div className='AdminLeft'>
            <div className='UserLeaderBoard'>
            <p id="pqtitle2">Leaderboard : {this.quizTitle}</p>
            <div className='lmtabel'>
                <table className='lbt'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Marks</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.leadersObj.map((value, index)=>{
                            return(
                                <>
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.marks}</td>
                                    <td>{value.position}</td>
                                </tr>
                            
                                </>
                            );
                        })
                    }
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        )
    }
}