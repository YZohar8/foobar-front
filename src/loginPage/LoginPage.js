import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'

function LoginPage () {
    return (
                
<div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="login-container text-center">
        <h2 className="mb-4">Login</h2>
        <form>
            <div className="mb-3">
                <input type="email" className="form-control input-lg" id="email" placeholder="Email address" required/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control input-lg" id="password" placeholder="Password" required/>
            </div>
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
