import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { Link } from "react-router-dom";
import axios from 'axios';


const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const errorMessage = useRef(1)



    const handleInput = async (event) => {
        event.preventDefault()
        console.log('email: ' + email)
        console.log('password: ' + password)


        const user = {
            "email": email,
            "password": password
        }
        try {
            const response = await axios.post(`${API_HOST_URL}/users/verify`, user)
            console.log(response.data[0].userid)
            if (response.status == 200) {

                errorMessage.current.style.display = 'none'
                localStorage.setItem('loggedin', 'true');
                localStorage.setItem('email', email);
                localStorage.setItem('id', response.data[0].userid);

                /*navigate(`/home/${localStorage.getItem('id')}`);*/
                navigate('/home')
            }
        } catch (err) {
            console.log(err.response)
            setError(err.response.data.error)
            errorMessage.current.style.display = 'block'
        }


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



                    <div ref={errorMessage} class="alert alert-danger alert-msg" role="alert">
                        {error}
                    </div>

                    <form className="login-form" onSubmit={handleInput}>

                        <div className="email">
                            <p>Email address</p>
                            <input required autoFocus={true} className="form-control" id="email" name="email" placeholder="Email address"
                                type="email"
                                onChange={event => setEmail(event.target.value)}
                                value={email} />
                        </div>

                        <div className="password">
                            <p>Password</p>
                            <input required autoComplete="off" className="form-control password" id="password" name="password"
                                placeholder="Password" type="password"
                                onChange={event => setPassword(event.target.value)}
                                value={password} />

                        </div>

                        <button className="login w-100" type="submit">
                            <div className="button">
                                Log In
                            </div>
                        </button>

                    </form>

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