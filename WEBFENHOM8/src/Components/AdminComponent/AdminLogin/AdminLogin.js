import style from "./AdminLogin.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";

function AdminLogin() {
    const [admin, setAdmin] = useState({
        admin_name: "",
        admin_password: ""
    });

    const history = useHistory();

    const handleInput = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${baseUrl}/admin/${admin.admin_name}`);
            const adminData = response.data;

            if (adminData && adminData.password === admin.admin_password) {
                alert("Login successful");
                history.push("/AdminDashboard");
            } else {
                alert("Wrong admin name or password");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in. Please try again later.");
        }
    };

    return (
        <>
            <div id={style.boxForm}>
                <div id={style.boxFormLeft}>
                    <div id={style.boxFormLeftOverlay}></div>
                </div>
                <div id={style.boxFormRight}>
                    <h5>Admin Login</h5>
                    <form id="LoginForm">
                        <div className={style.inputs}>
                            <input
                                type="text"
                                name="admin_name"
                                placeholder="Admin name"
                                value={admin.admin_name}
                                onChange={handleInput}
                                className={style.email}
                            />
                            <br />
                            <input
                                type="password"
                                name="admin_password"
                                placeholder="Password"
                                value={admin.admin_password}
                                onChange={handleInput}
                                className={style.password}
                            />
                        </div>
                        <br />
                        <button type="submit" onClick={login} id={style.login}>
                            Login
                        </button>
                        <NavLink id={style.goBackLink} exact to="/">
                            Go Back
                        </NavLink>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;