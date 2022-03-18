import React, { useEffect, useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom'

const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleInput = () => {
        console.log('firstname: ' + firstName)
        console.log('lastname: ' + lastName)
        console.log('email: ' + email)
        console.log('password: ' + password)

    }



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

                        <div className="first-name">
                            <p>First name</p>
                            <input autoFocus={true} className="form-control" name="firstName" placeholder="First name"
                                type="text"
                                onChange={(event) => setFirstName(event.target.value)}
                                value={firstName} />
                        </div>

                        <div className="last-name">
                            <p>Last name</p>
                            <input className="form-control" name="lastName" placeholder="Last name"
                                type="text"
                                onChange={(event) => setLastName(event.target.value)}
                                value={lastName}
                            />
                        </div>

                        <div className="email">
                            <p>Email address</p>
                            <input className="form-control" id="email" name="email" placeholder="Email address"
                                type="email"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="password">
                            <p>Password</p>
                            <input autoComplete="off" className="form-control password" id="password" name="password"
                                placeholder="Password"
                                type="password"
                                onChange={event => setPassword(event.target.value)}
                                value={password}
                            />

                        </div>

                        <div onClick={handleInput} className="login">
                            <div className="button">
                                Sign up
                            </div>
                        </div>

                    </div>

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