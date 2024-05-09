

import { NavLink , useHistory } from "react-router-dom";

import axios from "axios";
import { useState } from "react";


 import style from "./StudentSignup.module.css";

 import baseUrl from "../../baseUrl";
 import React, { Component }  from 'react';


function StudentSignup() {

    const [userData , setUserData] = useState({
       name: "",
       email: "",
       password: ""
    });

    function onTextFieldChange(e){
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        });
    }


     const [password , setPassword] = useState("");

     function handlePassword(e){
       setPassword(e.target.value);
   }
   

   let history = useHistory();
   
  async function handleSignup(){
       // console.log(userData);
       // console.log(password);

       if(userData.password === password)
       {
           await axios.post(`${baseUrl}/user` , userData);
           alert("Your account has created");
           alert("Please Login");
           history.push("/StudentLogin");
       }
       else alert("password did not match");
   }



   return (
       <>
       <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link><div id={style.boxForm}>
           <div id={style.boxFormLeft}>
               <div id={style.boxFormLeftOverlay}></div>
           </div>


           <div id={style.boxFormRight}>
               <h5>Đăng Ký</h5>
               <form id={style.signInForm}>
                   <div class="inputs">
                       <input type="text" placeholder="Tên"
                           onChange={(e) => onTextFieldChange(e)} id={style.email} name="name" required></input>
                    
                       <input type="text" placeholder="Tên đăng nhập"
                           onChange={(e) => onTextFieldChange(e)} id={style.email} name="email" require></input>
                    
                       <input type="password" placeholder="Mật khẩu"
                           onChange={(e) => onTextFieldChange(e)} id={style.password} name="password" required></input>
                    
                       <input type="password" placeholder="Nhập lại mật khẩu"
                          onChange={(e) => handlePassword(e)} name="confirmPassword" required id={style.password}></input>
                   </div>

                   <br></br>

                   <button type="submit" onClick={handleSignup}>Đăng Ký </button>
                   <div id={style.login}>
                       Đã có tài khoản?  <NavLink exact to="/StudentLogin"> Đăng nhập</NavLink>
                   </div>
               </form>
           </div>
       </div>
       
       </>
   );
}

export default StudentSignup;