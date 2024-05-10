

import axios from "axios";
import React, {useState , useEffect} from "react"; 


import style from "../StudentDashboard.module.css";

import baseUrl from "../../../baseUrl";


function Result() {

 const [results , setResults] = useState([]);

  useEffect(()=>{    
     async function getAllResults(){
         let value = await axios.get(`${baseUrl}/user/${sessionStorage.getItem("user")}/result`);
         
         setResults(value.data);
        // console.log(value.data);
     }
         getAllResults();
  },[]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
 return (
     <>
         <div id={style.displayHeadingBox}>
             <h2>My Result</h2>

             <div id={style.resultContainer}>
                 <div id={style.tableBox}>
             <table >
                 <thead>
                     <tr>
                                 <th id={style.center}>User Email</th>
                                 <th id={style.center}>Exam Name</th>
                                 <th id={style.center}>Exam Description</th>
                                 <th id={style.center}>Exam Date</th>
                                 <th id={style.center}>Result Status</th>
                                 <th id={style.center}>Your Score</th>
                                 <th id={style.center}>Total Marks</th>
                                 <th id={style.center}>Total Time</th> 
                     </tr>
                 </thead>
                 <tbody >
                 {
                     results.map((data , i) => {
                                 return(
                                       <tr key={i}>
                                         <td>{data.email.email}</td>
                                         <td>{data.sname.name}</td>
                                         <td>{data.examId.desc}</td>
                                         <td>{data.edate}</td>
                                         <td>{data.status}</td>
                                         <td>{data.score}</td>
                                         <td>{data.totalMarks}</td>
                                         <td>{formatTime(data.totalTime)}</td>
                                       </tr>
                                 );

                             })
                         }

                 </tbody>
             </table>
                 </div>
             </div>
         </div>
         
     </>
 );
}

export default Result;