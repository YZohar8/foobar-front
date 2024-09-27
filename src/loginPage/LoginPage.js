import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {checkUserByUsernameAndPassword} from '../fakeDatabase/usersFakeDatabase.js'
import './LoginPage.css'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(checkUserByUsernameAndPassword(email, password));
        if (checkUserByUsernameAndPassword(email, password)) {
            navigate('/feed', { state: { username: email } });
        } else {
            setErrorMessage("username or password is uncorrect! try again.");
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
