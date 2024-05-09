

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams ,NavLink } from "react-router-dom";

 import style from "../StudentDashboard.module.css";

 import baseUrl from "../../../baseUrl";

function Exam() {

    let { category } = useParams();

    const [allExam, setAllExam] = useState([]);

    useEffect(() => {
        async function getAllExams() {
            let value = await axios.get(`${baseUrl}/exam`);
            setAllExam(value.data);
           // console.log(value.data);
        }
        getAllExams();
    }, [])

    return (
        <>
            <div id={style.displayBoxHeadingBox}>
                <h1>All {category} Exam</h1>
                <div id={style.examContainer}>
                {
                allExam.map((data, i) => {
                    if(data.name.name === category)
                    return (
                        <div id={style.displayBoxExamBox} key={i}>
                            <div id={style.div1}>
                                <div id={style.div2}> <span>Exam Description: {data.desc}</span> </div>
                                <div id={style.div3}><span>Total Question:{data.question}</span> </div>
                                <div id={style.div4}><span>Total Time:{data.time}</span></div>
                            </div>
                            <div id={style.div5}>
                                <NavLink exact to={`/StudentDashboard/Exam/${data.name.name}/${data.id}`}>
                                 <button>Go to Exam</button>
                               </NavLink>
                            </div>
                        </div>
                    );

                    return <React.Fragment key={i}></React.Fragment>

                })
            }
                </div>
                
            </div>
        </>
    );
}
export default Exam;