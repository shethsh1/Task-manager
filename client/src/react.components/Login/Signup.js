import React, { useEffect, useState, useRef } from 'react';
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import RegistrationHandler from './RegistrationHandler';

const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function Signup() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const successMessage = useRef(1)
    const errorMessage = useRef(1)



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
                        Sign up for your account
                    </div>

                    <div ref={successMessage} class="alert alert-success alert-msg" role="alert">
                        {success}
                    </div>
                    <div ref={errorMessage} class="alert alert-danger alert-msg" role="alert">
                        {error}
                    </div>

                    <RegistrationHandler
                        setError={setError}
                        setSuccess={setSuccess}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />



                    <div className="sign-up">
                        <span style={{ marginRight: '5px' }}>Already have an account? </span>
                        <Link to="/login">Login</Link>

                    </div>


                </div>
            </div>
            <div className="login-footer">
                <span id="copyright"></span>
            </div>
        </div>
    )
}