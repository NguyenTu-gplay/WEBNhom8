

import axios from "axios";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import style from "../StudentDashboard.module.css";

import baseUrl from "../../../baseUrl";

function Test() {

    // ---------------------------------------------------------
    let { id } = useParams();
    let { category } = useParams();

    const [allQuestions , setAllQuestions] = useState([]);



    useEffect(() => {
        async function getAllQuestions(){
            let value = await axios.get(`${baseUrl}/exam/${id}/question`);
            setAllQuestions(value.data);
            //console.log(value.data);
        }
        getAllQuestions();
    },[id]);

    // ---------------------------------------------------------
    
    // const [userAnswer , setUserAnswer] = useState({
    //     answer1:"",
    //     answer2:"",
    //     answer3:"",
    // });

    const [answer , setAnswer] = useState({
        answer1:"",
        answer2:"",
        answer3:"",
        answer4:"",
        answer5:"",
    });


    let  correctAnswer  = [] ;
    
    function onRadioButtonChange(e){
       setAnswer({
            ...answer, 
            [e.target.name] : e.target.value
    });
      
       
    }

    let count = 0;

    


    async function submitTest()
    {
        let score = 0;
        let status = "";
        for (let i = 0; i < allQuestions.length; i++) {
            correctAnswer.push(allQuestions[i].answer);
            if (correctAnswer[i] === answer[`answer${i + 1}`]) score++;
        }



        if (score / allQuestions.length * 10 >= 5) status = "Pass";
        else status = "Fail";




        var date = new Date();
        var d = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        var t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
   
        let data = {
            "status": status,
            "score": score / allQuestions.length * 10,
            "email": { "email": sessionStorage.getItem("user") },    // email
            "edate": d + " " + t,
            "sname": { "name": category },   // --  subject name
            "totalMarks": 10,
            "examId": { "id": id },         // exam id
            "totalQuestion": allQuestions.length
        };

       //console.log(data);
 
       await axios.post(`${baseUrl}/result` , data);
        history.push("/StudentDashboard/Result");
    }

     let history = useHistory();

    return (
        <>
            <div id={style.displayBoxQuestionHeadingBox}>
                <h1>Exam</h1>
                <div id={style.testContainer}>
                    <div id={style.testContainerLeft}>
                                        {
                                    
                                    allQuestions.map((data , i) => {
                                            count++;
                                        return (
                                            <div id={style.displayBoxQuestionBox} key={i}>
                                            <div id={style.divQuestion}> <span>{data.qname}</span> </div>
                            
                                            <div>
                                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionOne}
                                                id={style.option1} name={"answer"+count}   type="radio" />  
                                                <label htmlFor="option1">{data.optionOne}</label>
                                            </div>
                            
                                            <div>
                                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionTwo}
                                                id={style.option2} name={"answer"+count} type="radio" /> 
                                                <label htmlFor="option2">{data.optionTwo}</label>
                                            </div>
                            
                                            <div>
                                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionThree}
                                                id={style.option3} name={"answer"+count}  type="radio" /> 
                                                <label htmlFor="option3">{data.optionThree}</label>
                                            </div>
                            
                                            <div>
                                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionFour}
                                                id={style.option4} name={"answer"+count}  type="radio" /> 
                                                <label htmlFor="option4">{data.optionFour}</label>
                                            </div>
                                        </div>
                                        );
                                    
                                    })
                                }
                    </div>
                    <div id={style.testContainerRight}>
                        <div id={style.timer}>30:00</div>
                        <div id={style.questionNumberContainer}>
                               
                                <div id={style.questionNumberRow}>
                                     <div id={style.questionNumber}>1</div>
                                    <div id={style.questionNumber}>1</div>
                                    <div id={style.questionNumber}>1</div>
                                    <div id={style.questionNumber}>1</div>
                                </div>
                                <div id={style.questionNumberRow}>
                                     <div id={style.questionNumber}>1</div>
                                    <div id={style.questionNumber}>1</div>
                                    <div id={style.questionNumber}>1</div>
                                    <div id={style.questionNumber}>1</div>
                                </div>
                        </div>
                        <div id={style.submitExam}><button onClick={submitTest}>Submit</button></div>
                    </div>            
                </div>
            </div>
            
        </>
    );
}

export default Test