import React from 'react';
import axios from 'axios';
import '../components/CSS/Showquizadmin.css'
import { Link } from 'react-router-dom';
class ShowQuizAdmin extends React.Component{

    constructor(props){
        super(props);
        this.state = {quizzesObj : []};
        this.quizzesObj = [];
    }

    componentDidMount(){
        axios.get("http://localhost:1010/quizapp/admin/get-all-quiz")
        .then((resp)=>{
            console.log(resp.data);
            this.setState({quizzesObj : resp.data});
            this.quizzesObj = resp.data;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    addQuiz = (e) =>{
        console.log("Redirect to Add Quiz Page no props");
    }

    showLeaderboard = (e) =>{
        console.log("Redirect to Leaderboard Page ");

        console.log("Redirect Page to UserQuizResult ");
        localStorage.setItem('resultQuizTitle',JSON.stringify(this.state.quizzesObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].title))
        localStorage.setItem('resultQuizID',JSON.stringify(this.state.quizzesObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].quizId))
        document.getElementById('userleaderboard').click();

        
        console.log();
        console.log();
        // props : quizId & quizTitle , this.state.quizzesObj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].quizId 
        //                              this.state.quizzesObj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].title
    }

    showUserremarks = (e) =>{
        localStorage.setItem('resultQuizTitle',JSON.stringify(this.state.quizzesObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].title))
        localStorage.setItem('resultQuizID',JSON.stringify(this.state.quizzesObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].quizId))
        document.getElementById('uremark').click();
        // props : quizId & quizTitle , this.state.quizzesObj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].quizId 
        //                              this.state.quizzesObj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].title
    }

    editQuiz = (e) =>{
        console.log("Redirect to EditQuiz Page ");
        localStorage.setItem('toEditObj',JSON.stringify(this.state.quizzesObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)]))
        document.getElementById('Editquizclick').click();

    }

    removeQuiz = (e) =>{
        console.log("Remove ID : "+ this.state.quizzesObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].quizId);
        axios.post("http://localhost:1010/quizapp/admin/delete-quiz", {"id" : this.state.quizzesObj[e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4)].quizId})
        .then((resp)=>{
            console.log(resp.data);
            if(this.state.quizzesObj.length == 1){
                this.quizzesObj = [];
                this.setState({quizzesObj : []});
            }else{
                this.quizzesObj.splice(e.target.parentNode.parentNode.id.substring(e.target.parentNode.parentNode.id.length, 4), 1);
                this.setState({quizzesObj : this.quizzesObj});  
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render(){

        if(this.state.quizzesObj.length == 0){
            return(
                <div className='AdminLeft'>
                <div className='ShowQuizAdmin'>
                <h3>No Available Quizzes</h3>
                </div>
                </div>
            );
        }else{
            return (
                <div className='AdminLeft'>
                    <p id="pqtitle">Available Quizes</p>
                <div className='ShowQuizAdmin'>
                    {
                        this.state.quizzesObj.map((value, index)=>{
                            return(
                                <div key={index} id={"Quiz"+index} className='Quizele'>
                                    <p className='qtitle'>{value.title}</p>
                                    <p className='qmarks'>{"Total Marks : "+value.maxScore}</p>
                                    <div className='bwrap'>
                                    <button onClick={this.showLeaderboard} className='sqb'>LEADER BOARD</button>
                                    <button onClick={this.showUserremarks} className='sqb'>USER REMARKS</button>
                                    <button onClick={this.editQuiz} className='sqb'>EDIT QUIZ</button>
                                    <button onClick={this.removeQuiz} className='sqb'>REMOVE QUIZ</button>
                                    </div>
                                </div>    
                            );
                        })
                    }
                    </div>
                    <Link to='/Editquiz' id="Editquizclick"></Link>
                    <Link to='/Aqleaderboard' id='userleaderboard'></Link>
                    <Link to='/Uremark' id='uremark'></Link>
                </div>
            );
        }
    }
}

export default ShowQuizAdmin;