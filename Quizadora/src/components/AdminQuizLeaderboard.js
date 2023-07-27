import React, { Component } from 'react';
import axios from 'axios';
import './CSS/Adminqleaderboard.css'
import { Link } from 'react-router-dom';
export default class AdminQuizLeaderboard extends Component {
    constructor(props){
        super(props);
        this.quizTitle = JSON.parse(localStorage.getItem('resultQuizTitle'));       // props.quizTitle
        this.quizId = JSON.parse(localStorage.getItem('resultQuizID'));
        this.state = {leadersObj : []};
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

    quizResult = (e) =>{

        console.log(this.state.leadersObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].phonenumber);
        console.log(this.quizTitle);
        console.log(this.quizId);
        
        localStorage.setItem('resultQuizTitle',JSON.stringify(this.quizTitle));
        localStorage.setItem('resultQuizID',JSON.stringify(this.quizId));
        localStorage.setItem('uphone',JSON.stringify(this.state.leadersObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].phonenumber));
        document.getElementById('arlear').click();
    }
    

    getBack = (e) =>{
        console.log("Redirect ShowQuizAdmin Page no props");
    }

    render() {
        if(this.state.leadersObj.length == 0){
            return(
                <div className='AdminLeft'>
                <div className='AdminLeaderBoard'>
                    <p id="pqtitle2">Leaderboard : {this.quizTitle}</p>
                    <h3>No Users attempted this quiz</h3>
                </div>
                </div>
            );
        }else{
            return (
                <div className='AdminLeft'>
                <div className='AdminLeaderBoard'>
                <p id="pqtitle2">Leaderboard : {this.quizTitle}</p>
                <div className='lmtabel'>
                    <table className='lbt'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Marks</th>
                                <th>Rank</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.leadersObj.map((value, index)=>{
                                return(
                                    <tr key={index} id={'User'+index}>
                                        <td>{value.name}</td>
                                        <td>{value.marks}</td>
                                        <td>{value.position}</td>
                                        <td><button onClick={this.quizResult} className="alr">Result</button></td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                </div>
                <Link to="/Aresult" id="arlear"></Link>
                </div>
            );
        }
    }
}