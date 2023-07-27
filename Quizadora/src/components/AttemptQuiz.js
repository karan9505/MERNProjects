import React from "react";
import axios from "axios";
import './CSS/AttemptQuiz.css'
import { Link } from "react-router-dom";
class AttemptQuiz extends React.Component{

    constructor(props){

        super(props);

        this.phonenumber = JSON.parse(localStorage.getItem('uphone'));                        // props.phonenumber
        this.url = "http://localhost:1010/quizapp/user/solve-quiz";
        this.total = 0;

        this.quizObj = JSON.parse(localStorage.getItem('ToAttempt'));
       this.quizObj.phonenumber=this.phonenumber
       console.log(this.quizObj) 

        this.postObj = {
            phonenumber : this.quizObj.phonenumber,
            quizId : this.quizObj.quizId,
            maxScore : this.quizObj.maxScore,
            queId : [],
            question : [],
            option1 : [],
            option2 : [], 
            option3 : [],
            option4 : [],
            correctanswer : [],
            studentanswer : [],
            score : [],
            remark : []
        }


        this.quizObj.questionList.map((value, index)=>{
           
            this.postObj.queId.push(value.queId.toString());
            this.postObj.question.push(value.question);
            this.postObj.option1.push(value.option1);
            this.postObj.option2.push(value.option2);
            this.postObj.option3.push(value.option3);
            this.postObj.option4.push(value.option4);
            this.postObj.correctanswer.push(value.correctAns);
            this.postObj.studentanswer.push("");
            this.postObj.score.push(value.score.toString());
            this.postObj.remark.push("null");
        })
    }

    optionChange = (e) =>{

        if(e.target.id[e.target.id.length-1] == "1"){
           
            this.postObj.studentanswer[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)] = this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)].option1;
        }else if(e.target.id[e.target.id.length-1] == "2"){

            this.postObj.studentanswer[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)] = this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)].option2;
        }else if(e.target.id[e.target.id.length-1] == "3"){

            this.postObj.studentanswer[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)] = this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)].option3;
        }else if(e.target.id[e.target.id.length-1] == "4"){

            this.postObj.studentanswer[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)] = this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)].option4;
        }
    }

    remarkChange = (e) =>{

        this.postObj.remark[e.target.parentNode.id.substring(e.target.parentNode.id.length, 1)] = e.target.value;
    }

    submitQuiz = (e) =>{
        this.postObj.score.map((value, index)=>{
            if(this.postObj.correctanswer[index] == this.postObj.studentanswer[index]){

                this.total += parseInt(value);
            }
        })

        console.log(this.postObj);
        // console.log(this.total);
        axios.post(this.url, this.postObj)
        .then((resp)=>{

            // console.log(resp.data);
            alert("Your Marks : "+this.total+" / "+this.quizObj.maxScore);
            console.log("Redirect to UserLogin Page");
            // props : this.phonenumber
            document.getElementsByClassName('ub')[0].click();
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

    render(){
        return(
            <div className="AdminLeft">
            <div className="AttemptQuiz" id="AttemptQuiz">
                <h3><span>Topic : {this.quizObj.title}</span>&emsp;&emsp;
                    <span>{"Total Marks : "+ this.quizObj.maxScore}</span>
                </h3>  
                <div >
                    {
                        this.quizObj.questionList.map((value, index)=>{
                            return(
                                <div key={index} id={"Q"+index} className="question">
                                    <p><span>Q{index+1} {value.question}</span>&emsp;&emsp;<span>Mark : {value.score}</span></p>
                                    <input type="radio" id={"Q"+index+"1"} name={"Q"+index} onClick={this.optionChange}></input>
                                    <label htmlFor={"Q"+index+"1"}>{value.option1}</label><br/>
                                    <input type="radio" id={"Q"+index+"2"} name={"Q"+index} onClick={this.optionChange}></input>
                                    <label htmlFor={"Q"+index+"2"}>{value.option2}</label><br/>
                                    <input type="radio" id={"Q"+index+"3"} name={"Q"+index} onClick={this.optionChange}></input>
                                    <label htmlFor={"Q"+index+"3"}>{value.option3}</label><br/>
                                    <input type="radio" id={"Q"+index+"4"} name={"Q"+index} onClick={this.optionChange}></input>
                                    <label htmlFor={"Q"+index+"4"}>{value.option4}</label><br/>
                                    <input type="text" placeholder="Enter Remark" onChange={this.remarkChange} className="qreview"></input>
                                </div>
                            );
                        })
                    }
                </div> 
                <button onClick={this.submitQuiz} className="quizatmpbutton">Submit</button>
                <Link to='/Unsolved' className="ub"></Link>          
            </div>
            </div>
        );
    }
}
export default AttemptQuiz;