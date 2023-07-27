import React, { Component } from 'react'
import axios from 'axios';

export default class AdminQuizRemarks extends Component {

    constructor(props){
        super(props);
        this.quizTitle = JSON.parse(localStorage.getItem('resultQuizTitle'));  // props.quizTitle
        this.quizId = JSON.parse(localStorage.getItem('resultQuizID'));      // props.quizId
        this.state = {remarkObj : []};
    }

    componentDidMount(){
        axios.post("http://localhost:1010/quizapp/admin/show-question-reports", {quizId : this.quizId})
        .then((resp)=>{
            console.log(resp.data);
            this.setState({remarkObj : resp.data});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    getBack = (e) =>{
        console.log("Redirect to back Page");
    }

    render() {
        if(this.state.remarkObj.length == 0){
            return(
                <div className='AdminLeft'>
                <div className='AdminQuizRemarks'>
                    <h3>No Remarks Given</h3>
                </div>
                </div>
            );
        }else{
            return (
                <div className='AdminLeft'>
                <div className='AdminQuizRemarks'>
                    <p id="pqtitle2">Remarks : {this.quizTitle}</p>
                    <div className='rback'>
                    {
                        this.state.remarkObj.map((value, index)=>{
                            return(
                                <div key={index}>
                                    <h3>{(index+1)+". "+ value.question+" : "}</h3>
                                    {
                                        value.username.map((user,i)=>{
                                            return(
                                                <h4 key={i}>{user + " : " + value.remark[i]}</h4>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
                </div>
            );
        }
    }
}