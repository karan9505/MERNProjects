import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ShowUnsolvedQuiz extends React.Component{
    
    constructor(props){
        super(props);
 
        this.url = "http://localhost:1010/quizapp/user/show-quizzes";
        this.phonenumber = JSON.parse(localStorage.getItem('uphone')); 
        console.log(this.phonenumber)                     // props.phonenumber
        this.state = {obj : []};
        
    }

    componentDidMount(){
        axios.post(this.url, {phonenumber : this.phonenumber})
        .then((resp)=>{
            this.setState({obj : resp.data});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    attemptQuiz = (e) =>{
        console.log("Redirect to attempt quiz page "+e.target.parentNode.id.substring(e.target.parentNode.id.length, 8));
        console.log(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 8)]);
        // props : this.phonenumber & this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 8)]
        localStorage.setItem('ToAttempt', JSON.stringify(this.state.obj[e.target.parentNode.id.substring(e.target.parentNode.id.length, 8)]))
        console.log(JSON.parse(localStorage.getItem('ToAttempt')).quizId)
        document.getElementById('Attemptquizlink').click();
    }

    render(){
        if(this.state.obj.length == 0){
            return(
                <div className="AdminLeft">
                    <p id="pqtitle1">No Unsolved Quiz Present</p>
                <div className="ShowUnsolvedQuiz" id="ShowUnsolvedQuiz">
                </div>
                </div>
            ); 
        }else{
            return(
                <div className='AdminLeft'>
                    <p id="pqtitle1">Unsolved Quizes</p>
                <div className="ShowUnsolvedQuiz" id="ShowUnsolvedQuiz">
                    {
                        this.state.obj.map((value, index)=>{
                            return(
                                <div key={index} id={"Unsolved"+index} className="uunql">
                                    <p>Topic : {value.title}</p>&emsp;&emsp;
                                    <span>Marks : {value.maxScore}</span>
                                    <button onClick={this.attemptQuiz} className="aunq">Attempt</button>
                                </div>
                            );
                        })
                    }
                    </div>
                    <Link to='/Attemptquiz' id="Attemptquizlink"></Link>
                </div>
            );
        }
    }
}

export default ShowUnsolvedQuiz;