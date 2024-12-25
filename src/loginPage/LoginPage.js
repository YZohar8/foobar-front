import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../connectToDB/usersConnectToDB.js'
import './LoginPage.css'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      };


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Email and password are required.");
            return;
          }
      
          if (!isValidEmail(email)) {
            setErrorMessage("Please enter a valid email.");
            return;
          }



        const answer = await login(e, email, password);
        if (answer.success) {
            navigate('/loading', { state: { destination: '/feed'} });
        } else {
            setErrorMessage(answer.message);
        }
    }

    return (

        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="login-container text-center">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input type="email" className="form-control input-lg" id="email" placeholder="Email address" required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control input-lg" id="password" placeholder="Password" required
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                            {errorMessage}
                        </div>
                    )}
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn login-btn btn-lg btn-block">Log In</button>
                    </div>
                </form>
                <div>
                    <Link to="/register" className="register-btn">Create new account</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
