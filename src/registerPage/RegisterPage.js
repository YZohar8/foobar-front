import './RegisterPage.css'
import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
    return (
        <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="login-container text-center">
          <h2 class="mb-4">Registration</h2>
          <form>
            <div class="mb-3">
              <input type="text" class="form-control" id="username" placeholder="Username" required></input>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Password" required></input>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" required></input>
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="display-name" placeholder="Display Name" required></input>
            </div>
            <div class="mb-3">
              <input type="file" class="form-control" id="profile-pic" accept="image/*" required></input>
            </div>
            <div class="d-grid mb-3">
              <button type="submit" class="btn login-btn btn-lg">Register</button>
            </div>
          </form>
          <div>
            <Link to="/" className="register-btn">You already have a user</Link>
          </div>
        </div>
      </div>
    );
}

export default RegisterPage;