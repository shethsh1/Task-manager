import React, { useEffect, useState, useRef } from 'react';
import './Login.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import RegistrationHandler from './RegistrationHandler';
import { useNavigate } from 'react-router-dom';


const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function Signup() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const successMessage = useRef(1)
    const errorMessage = useRef(1)



    useEffect(() => {

        if (localStorage.getItem('id') != undefined) {
            navigate('/home')
            return
        }

        setLoading(false)

    }, [])


    if (loading) {
        return <></>
    }



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
                <span id="copyright">© Shaahid Sheth {new Date().getFullYear()}</span>
            </div>
        </div>
    )
}