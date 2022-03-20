import React, { useEffect, useState } from 'react';
import './Login.css'
import { Link } from "react-router-dom";

const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleInput = () => {
        console.log('email: ' + email)
        console.log('password: ' + password)
        setEmail('')
        setPassword('')
    }




    /* on mount */
    useEffect(() => {
        var today = new Date();
        var year = today.getFullYear();
        var copyright = document.getElementById("copyright");
        copyright.innerHTML = '© Shaahid Sheth ' + year;
    }, [])





    return (
        <div className="login-wrapper">

            <div className="login-container">

                <div className="login-box">
                    <div className="login-header">
                        Log in to your account
                    </div>

                    <div className="login-form">

                        <div className="email">
                            <p>Email address</p>
                            <input autoFocus={true} className="form-control" id="email" name="email" placeholder="Email address"
                                type="email"
                                onChange={event => setEmail(event.target.value)}
                                value={email} />
                        </div>

                        <div className="password">
                            <p>Password</p>
                            <input autoComplete="off" className="form-control password" id="password" name="password"
                                placeholder="Password" type="password"
                                onChange={event => setPassword(event.target.value)}
                                value={password} />

                        </div>

                        <div className="login">
                            <div className="button" onClick={handleInput}>
                                Log In
                            </div>
                        </div>

                    </div>

                    <div className="sign-up">
                        <span style={{ marginRight: '5px' }}>New to this app? </span>
                        <Link to="/signup">Sign up</Link>

                    </div>


                </div>
            </div>
            <div className="login-footer">
                <span id="copyright"></span>
            </div>
        </div>
    )
}