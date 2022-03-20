import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
function RegistrationHandler(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setError, setSuccess, errorMessage, successMessage } = props;



    const handleInput = async (event) => {
        console.log('firstname: ' + firstName)
        console.log('lastname: ' + lastName)
        console.log('email: ' + email)
        console.log('password: ' + password)
        event.preventDefault()

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:5000/users/registration', user)

            if (response.status == 200) {
                setSuccess("Successfully created account")

                successMessage.current.style.display = 'block';
                errorMessage.current.style.display = 'none'
            }
        } catch (err) {
            console.log(err.response)
            setError(err.response.data.error)
            successMessage.current.style.display = 'none';
            errorMessage.current.style.display = 'block'
        }





    }


    return (


        <form className="login-form" onSubmit={handleInput}>

            <div className="first-name">
                <p>First name</p>
                <input required autoFocus={true} className="form-control" name="firstName" placeholder="First name"
                    type="text"
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName} />
            </div>

            <div className="last-name">
                <p>Last name</p>
                <input required className="form-control" name="lastName" placeholder="Last name"
                    type="text"
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                />
            </div>

            <div className="email">
                <p>Email address</p>
                <input required className="form-control" id="email" name="email" placeholder="Email address"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                />
            </div>

            <div className="password">
                <p>Password</p>
                <input required autoComplete="off" className="form-control password" id="password" name="password"
                    placeholder="Password"
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />

            </div>

            <button className="login" type="submit" style={{ width: '100%' }}>
                <div className="button" >
                    Sign up
                </div>
            </button>

        </form>
    );



}

export default RegistrationHandler;