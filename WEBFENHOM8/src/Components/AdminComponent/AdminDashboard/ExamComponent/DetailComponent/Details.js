
   import style from "../../SubjectComponent/Subject.module.css";

   import axios from "axios";

   import {useEffect , useState} from "react";
   import {useHistory , useParams} from "react-router-dom";

   import baseUrl from "../../../../baseUrl";


   function Details(){

      const {id} = useParams();

      const [exam  , setExam] = useState({
            name:"",
            desc:"",
            date: "",
            marks:"",
            totalQuestion:"",
            passMarks:"",
            level:"",
            totalTime: ""
      });

      useEffect(() => {
         
            async function getExamDetails(){
               const value = await axios.get(`${baseUrl}/exam/${id}`);
               setExam(value.data);
               console.log(value.data);
            }
            getExamDetails();
      },[id])

   // -------------------------Go back function---------------------------------------
   
      let history = useHistory();
      const formatTime = (time) => {
         const minutes = Math.floor(time / 60);
         const seconds = time % 60;
         return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
   };
      function handleGoBack(){
         history.push("/AdminDashboard/Exam");
   }


      return (
            <>
               <div id={style.displayHeadingBox}> 
                     <h2>Exam Details</h2>     
               </div>

               <div id={style.tableBox}>
                     <table >
                        <thead >
                           <tr>
                              <th id={style.center}>Exam Name</th>
                              <td id={style.center}> {exam.name.name} </td>
                           </tr>

                           <tr>
                              <th id={style.center}>Exam Description</th>
                              <td id={style.center}> {exam.desc} </td>
                           </tr>

                           <tr>
                                 <th id={style.center}>Exam Creation Date</th>
                                 <td id={style.center}> {exam.date} </td>
                           </tr>

                              <tr>
                                 <th id={style.center}>Exam TotalTime</th>
                                 <td id={style.center}> {formatTime(exam.totalTime)} </td>
                              </tr>

                              <tr>
                                 <th id={style.center}>Exam TotalQuestion</th>
                                 <td id={style.center}> {exam.totalQuestion} </td>
                              </tr>

                              <tr>
                                 <th id={style.center}>Exam PassMarks</th>
                                 <td id={style.center}> {exam.passMarks} </td>
                              </tr>

                              <tr>
                                 <th id={style.center}>Exam Level</th>
                                 <td id={style.center}> {exam.level} </td>
                              </tr>
                           </thead>
                        </table>
                     </div>

                  <div id={style.addSubjectBox}>
                     <button onClick={handleGoBack}>Go Back</button>
                  </div>
            </>
      );
   }

    export default Details;