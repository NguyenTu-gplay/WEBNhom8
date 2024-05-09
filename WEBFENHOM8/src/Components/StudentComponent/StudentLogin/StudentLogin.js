

import style from "./StudentLogin.module.css";

import {NavLink , useHistory} from "react-router-dom";

 import {useState} from "react" ;
 import axios from "axios";
 import baseUrl from "../../baseUrl";
 //import React, { Component }  from 'react';


   function StudentLogin(){

      const [user , setUser] = useState({
          email:"",
          password:""
      });

      function onTextFieldChange(e){
          setUser({
              ...user ,
              [e.target.name] : e.target.value
          });
      }


        let history = useHistory();


    async function handleLogin()
     {
        let value  = await axios.get(`${baseUrl}/user/${user.email}`);
        

              if( value.data.email === user.email &&
                 value.data.password === user.password)
              {
                 alert("success");
                 sessionStorage.setItem("user" , user.email);
                 history.push("/StudentDashboard");
              }
              else alert(" Wrong User Email or password");
           
      }
      

       return(
          <>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link><div id={style.boxForm}>
               <div id={style.boxFormLeft}>
                   <div id={style.boxFormLeftOverlay}></div>
               </div>


               <div id={style.boxFormRight}>
                   <h5>Đăng Nhập</h5>
                   <div id={style.LoginForm}>
                       <p>Chưa có tài khoản? <NavLink exact to="/StudentSignup"> Đăng ký</NavLink> chỉ mất vài phút thôi</p>
                       
                       <div className="inputs">
                           <input name="email" placeholder="Tài khoản"
                              onChange={(e) => onTextFieldChange(e)} type="text" id={style.email} />
                           <br></br>
                           <input name="password" placeholder="Mật khẩu"
                              onChange={(e) => onTextFieldChange(e)} type="password" id={style.password} />
                       </div>

                       <br></br>

                       <NavLink id={style.goBackLink} exact to="/"> Quay lại</NavLink>
                       <button id={style.login} onClick={handleLogin}>Login</button>
                   </div>
               </div>
           </div>
          </>

       ); 
   }

   export default StudentLogin;