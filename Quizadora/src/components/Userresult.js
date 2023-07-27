import React, { Component } from 'react'
import axios from 'axios';
import './CSS/Result.css'
export default class QuizResult extends Component {

    constructor(props){
        super(props);
        this.obj = {
            phonenumber : JSON.parse(localStorage.getItem('uphone')),             // props.phonenumber
            quizId : JSON.parse(localStorage.getItem('resultQuizID'))                   // props.quizId
        }
        this.quizTitle = JSON.parse(localStorage.getItem('resultQuizTitle'));
        console.log(this.obj)
        console.log(this.quizTitle)              // props.quizTitle
        this.state = {showObj : []};
    }

    componentDidMount(){
        axios.post("http://localhost:1010/quizapp/user/get-solved-quiz", this.obj)
        .then((resp)=>{
            console.log(resp.data);
            this.setState({showObj : resp.data});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    getBack = (e) =>{
        console.log("Redirect to page solved quiz with userphonenumber");
        // props : this.obj.phonenumber
    }

    render() {
        return (
            <div className='AdminLeft'>
            <p id="pqtitle1">Topic : {this.quizTitle}</p>
            <div className='UserQuizResult'>
                {
                    this.state.showObj.map((value, index)=>{
                        return(
                            <div key={index} className='resele'>
                                <p>
                                    <p>{"Q"+(index+1) +".  "+ value.question}</p>&emsp;&emsp;
                                    <p>{"Your response : "+(value.studentAnswer == value.correctAns ? "Correct" : "Wrong")}</p>&emsp;&emsp;
                                    <p>{"Marks : " + value.marks+"/"+value.score}</p>
                                </p>
                                <p>
                                    <span>{"1) "+(value.option1)}</span>&emsp;&emsp;
                                    <span>{(value.correctAns == value.option1 ? "Correct" : value.studentAnswer == value.option1 ? "Wrong" : "")}</span>
                                </p>
                                <p>
                                    <span>{"2) "+(value.option1)}</span>&emsp;&emsp;
                                    <span>{(value.correctAns == value.option2 ? "Correct" : value.studentAnswer == value.option2 ? "Wrong" : "")}</span>
                                </p>
                                <p>
                                    <span>{"3) "+(value.option1)}</span>&emsp;&emsp;
                                    <span>{(value.correctAns == value.option3 ? "Correct" : value.studentAnswer == value.option3 ? "Wrong" : "")}</span>
                                </p>
                                <p>
                                    <span>{"4) "+(value.option1)}</span>&emsp;&emsp;
                                    <span>{(value.correctAns == value.option4 ? "Correct" : value.studentAnswer == value.option4 ? "Wrong" : "")}</span>
                                </p>
                                <p>{"Average accuracy : "+((value.correct/(value.correct+value.wrong))*100) +"%"}</p>
                            </div>
                        );
                    })
                }
            </div>
            </div>
        )
    }
}