import React, { Component } from 'react';
import axios from 'axios';
import './CSS/Edit.css'
import { Link } from 'react-router-dom';
export default class EditQuiz extends Component {
    constructor(props){
        super(props);
  
        // this.quizObj = null;         // props.obj
        this.quizObj = JSON.parse(localStorage.getItem('toEditObj'))
        console.log(this.quizObj);
        this.postObj = {
            id : null,
            newtitle : null,
            question : [],
            option1 : [],
            option2 : [],
            option3 : [],
            option4 :[],
            correctanswer : [],
            score : []
        }
    }

    titleChange = (e) =>{
        this.quizObj.title = e.target.value;
    }

    quesChange = (e) =>{
        this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].question = e.target.value;
    } 

    option1Change = (e) =>{
        this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].option1 = e.target.value;
    }

    option2Change = (e) =>{
        this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].option2 = e.target.value;
    }

    option3Change = (e) =>{
        this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].option3 = e.target.value;
    }

    option4Change = (e) =>{
        this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].option4 = e.target.value;
    }

    correctAnsChange = (e) =>{
        this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].correctAns = e.target.value;
    }

    scoreChange = (e) =>{
        this.quizObj.questionList[e.target.parentNode.id.substring(e.target.parentNode.id.length, 4)].score = e.target.value;
    }

    delQuestion = (e) =>{
        if(this.quizObj.questionList.length == 1){
            this.quizObj.questionList = [];
        }else{
            this.quizObj.questionList.splice(e.target.parentNode.id.substring(e.target.parentNode.id.length, 4),1);
        }
        this.setState({obj : this.quizObj});
    }

    addQuestion = (e) =>{

        let temp = {
            queId : null,
            question : "Enter Question",
            option1 : "Enter Option1",
            option2 : "Enter Option2",
            option3 : "Enter Option3",
            option4 : "Enter Option4",
            correctAns : "Enter Correct Answer",
            score : 0   
        }
        
        this.quizObj.questionList.push(temp);
        this.setState({obj : this.quizObj});
    }

    submitQuiz = (e) =>{

        let flag = 0;
        this.postObj.id = this.quizObj.quizId;
        this.postObj.newtitle = this.quizObj.title;
        this.quizObj.questionList.map((value, index)=>{
            if(value.question == "Enter Question" || value.option1 ==  "Enter Option1" || value.option2 == "Enter Option2" || value.option3 == "Enter Option3" || value.option4 == "Enter Option4" || value.correctAns == "Enter Correct Answer" || value.score == 0){
                flag = 1;
                console.log("Please fill all fields");
            }else{
                this.postObj.question.push(value.question);
                this.postObj.option1.push(value.option1);
                this.postObj.option2.push(value.option2);
                this.postObj.option3.push(value.option3);
                this.postObj.option4.push(value.option4);
                this.postObj.correctanswer.push(value.correctAns);
                this.postObj.score.push(value.score.toString());
            }
        })
        if(flag == 0){
            axios.post("http://localhost:1010/quizapp/admin/edit-quiz", this.postObj)
            .then((resp)=>{
                console.log(resp.data + "Redirect to Admin Page");
                document.getElementsByClassName('ba')[0].click();
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    render() {
        return (
            <div className='AdminLeft'>
            <div className='EditQuiz'>
                <p id="pqtitle">Edit Quiz</p>
                <div className='eqback'>
                    <input type="text" placeholder={this.quizObj.title} onChange={this.titleChange} className='editqt'></input>
                    {
                        this.quizObj.questionList.map((value, index)=>{
                            return(
                                <div key={index} id={'ques'+index} className='Editqlist'>       {/* don't use queId (new question don't have queId) */}
                                    <input type='text' placeholder={value.question} onChange={this.quesChange} className='editq'></input>
                                    <input type='text' placeholder={value.option1} onChange={this.option1Change} className='edito1'></input>
                                    <input type='text' placeholder={value.option2} onChange={this.option2Change} className='edito2'></input>
                                    <input type='text' placeholder={value.option3} onChange={this.option3Change} className='edito3'></input>
                                    <input type='text' placeholder={value.option4} onChange={this.option4Change}className='edito4'></input>
                                    <input type='text' placeholder={value.correctAns} onChange={this.correctAnsChange} className='edita'></input>
                                    <input type='number' placeholder={value.score} max={100} onChange={this.scoreChange}className='editn'></input>
                                    <button onClick={this.delQuestion} className='eqdelet'>Delete Question</button>
                                </div>
                            );
                        })
                    }
                    <button onClick={this.addQuestion} id='addQuestion' className='eqaddb'>Add Question</button>
                    <button onClick={this.submitQuiz} id='submitQuiz' className='eqsubb'>Submit</button>
                </div>
                <Link to='/Admin' className='ba'></Link>
            </div>
            </div>
        )
    }
}