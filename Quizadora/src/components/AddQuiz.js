import React from "react";
import axios from "axios";
import './CSS/AddQuiz.css';
import { Link } from "react-router-dom";

class AddQuiz extends React.Component{
    constructor(props){
        super(props);
        this.urltitle = "http://localhost:1010/quizapp/admin/title";
        this.urlquestion = "http://localhost:1010/quizapp/admin/add-questions";

        this.questionNo = -1;
        this.questionObj = {
                id:null,
                question:null,
                option1:null,
                option2:null,
                option3:null,
                option4:null,
                correctanswer:null,
                questionscore:null
        };
        this.quizObj={
                quizId : null,
                quizTitle : null,
                questions:[null]
        };
    }

    quizTitle = (e) =>{
        e.preventDefault();
        let title = document.getElementById('addquiztitle').value;
        if(title != null && title !== ""){

            axios.post(this.urltitle, {title:title})
            .then((resp)=>{
                if(resp.data !== 'title'){
                    this.quizObj.quizTitle = title;
                    this.quizObj.quizId = resp.data;
                    let parent = document.getElementById('AddQuiz');
                    let addButton = document.createElement('button');
                    addButton.textContent = "ADD QUESTION";
                    addButton.id = "addquestion";
                    addButton.onclick=this.addQuestion;
                    parent.appendChild(addButton);
                }
                console.log(resp.data)
            })
            .catch((err)=>{
                console.log(err.message);
            })
        }
        document.getElementById("QuestionList").scrollTop=document.getElementById("QuestionList").scrollHeight;
    }

    addQuestion=(e)=>
    {
            e.preventDefault();
            this.questionNo++;
            let questionForm = document.createElement('form');
            questionForm.setAttribute("class","QuestionForm")
            questionForm.id = this.quizObj.quizId + "-" + this.questionNo;
    
            
            let question = document.createElement("input");
            question.type = 'text';
            question.id = this.quizObj.quizId+"-"+this.questionNo+"-question";
            question.placeholder = "Enter Question";
            question.setAttribute("class","Question")

            let A = document.createElement("input");
            A.type = 'text';
            A.id = this.quizObj.quizId+"-"+this.questionNo+"-option1";
            A.placeholder = "Enter Option 1";
            A.setAttribute("class","optionA")

            let B = document.createElement("input");
            B.type = 'text';
            B.id = this.quizObj.quizId+"-"+this.questionNo+"-option2";
            B.placeholder = "Enter Option 2";
            B.setAttribute("class","optionB")
            

            let C = document.createElement("input");
            C.type = 'text';
            C.id = this.quizObj.quizId+"-"+this.questionNo+"-option3";
            C.placeholder = "Enter Option 3";
            C.setAttribute("class","optionC")
            
            
            let D = document.createElement("input");
            D.type = 'text';
            D.id = this.quizObj.quizId+"-"+this.questionNo+"-option4";
            D.placeholder = "Enter Option 4";
            D.setAttribute("class","optionD")

            let Correct = document.createElement("input");
            Correct.type = 'text';
            Correct.id = this.quizObj.quizId+"-"+this.questionNo+"-correctanswer";
            Correct.placeholder = "Enter Correct Option";
            Correct.setAttribute("class","correct")

            let Mark = document.createElement("input");
            Mark.type = 'text';
            Mark.id = this.quizObj.quizId+"-"+this.questionNo+"-questionscore";
            Mark.placeholder = "Enter Mark";
            Mark.setAttribute("class","Marks")

            let Add = document.createElement("input");
            Add.type = 'submit';
            Add.value="SUBMIT"
            Add.id = "add";
            Add.setAttribute("class","Add")
            Add.onclick=this.quesSubmit;
            Add.textContent = "Add";
        
            
            questionForm.appendChild(question);
            questionForm.appendChild(A);
            questionForm.appendChild(B);
            questionForm.appendChild(C);
            questionForm.appendChild(D);
            questionForm.appendChild(Correct);
            questionForm.appendChild(Mark);
            questionForm.appendChild(Add);

            document.getElementById('QuestionList').appendChild(questionForm);

            let ele = document.getElementById('AddQuiz');
            ele.removeChild(document.getElementById('addquestion'));
            if(this.questionNo > 0){
                ele.removeChild(document.getElementById('sendquiz'));
            }
            document.getElementById("QuestionList").scrollTop=document.getElementById("QuestionList").scrollHeight;
    }

    quesSubmit=(e)=>
    {
        console.log("icjdijci")
        e.preventDefault();

            this.questionObj.id = this.quizObj.quizId;
            this.questionObj.question = document.getElementById(this.quizObj.quizId+"-"+(this.questionNo)+"-question").value;            
            this.questionObj.option1 = document.getElementById(this.quizObj.quizId+"-"+(this.questionNo)+"-option1").value;
            this.questionObj.option2 = document.getElementById(this.quizObj.quizId+"-"+(this.questionNo)+"-option2").value;
            this.questionObj.option3 = document.getElementById(this.quizObj.quizId+"-"+(this.questionNo)+"-option3").value;
            this.questionObj.option4 = document.getElementById(this.quizObj.quizId+"-"+(this.questionNo)+"-option4").value;
            this.questionObj.correctanswer = document.getElementById(this.quizObj.quizId+"-"+(this.questionNo)+"-correctanswer").value;
            this.questionObj.questionscore = document.getElementById(this.quizObj.quizId+"-"+(this.questionNo)+"-questionscore").value;
            
            axios.post(this.urlquestion, this.questionObj)
            .then((resp)=>{
                console.log("success");
                this.quizObj.questions = resp.data;
                console.log(this.quizObj.questions);

                let ele = document.getElementById(this.quizObj.quizId + "-" + this.questionNo);
                ele.removeChild(document.getElementById('add'));

                let parent = document.getElementById('AddQuiz');
                let addButton = document.createElement('button');
                addButton.textContent = "ADD QUESTION";
                addButton.id = "addquestion";
                addButton.setAttribute('class','addButton')
                addButton.onclick=this.addQuestion;
                parent.appendChild(addButton);

                if(this.questionNo > -1){
                    let sendQuiz = document.createElement('button');
                    sendQuiz.textContent = "SEND QUIZ";
                    sendQuiz.id = "sendquiz";
                    sendQuiz.onclick = this.back;
                    parent.appendChild(sendQuiz);
                }
            })
            .catch((err)=>{console.log(err.message)})
            document.getElementById("QuestionList").scrollTop=document.getElementById("QuestionList").scrollHeight;
    }

    back = (e) =>{
        document.getElementById('adminback').click();
    }

    render(){
        return(
            <div className="AdminLeft">
            <div className="AddQuiz" id="AddQuiz">
                <form id="addquiztitleform" onSubmit={this.quizTitle}>
                    <input type='text' id="addquiztitle" placeholder="Enter Title Of Quiz"></input>
                    <input type='submit' id="TitleSubmit" value="ADD QUIZ TITLE"/>
                </form>
                <div id="QuestionList">
                </div>
                <Link to='/Admin' id="adminback"></Link>
            </div>
            </div>
        );
    }
}
export default AddQuiz;