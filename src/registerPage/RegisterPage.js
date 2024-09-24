import './RegisterPage.css'
import defult_user from '../pictures/defult_user.jpg'
import { getNextUserId, addUser, checkUserByUsername } from '../fakeDatabase/usersFakeDatabase.js'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, SetConfirmPassword] = useState('');
  const [name, SetName] = useState('');
  const [profilePic, SetProfilePic] = useState('');
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfirmPassword, SetAlertConfirmPassword] = useState('');
  const [alertPassword, SetAlertPassword] = useState('');
  const [alertUsername, SetAlertUsername] = useState('');





  const handleRegister = (e) => {
    e.preventDefault();
    setAlertVisible(true);
    SetAlertConfirmPassword('');
    SetAlertPassword('');
    SetAlertUsername('');


    const passwordIsValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password); // Validate password

    if (!passwordIsValid) {
      SetAlertPassword("Password must be between 8 and 15 characters and contain both letters and numbers.");
      setAlertVisible(false);
    }

    if (password != confirmPassword) {
      SetAlertConfirmPassword("Password verification is not the same as a password.");
      setAlertVisible(false);
    }

    if (checkUserByUsername(username)) {
      SetAlertUsername('The username exists in the system.');
      setAlertVisible(false);
    }

    if (setAlertVisible) {
      // Add the user to the temporary database
      const newUser = {
        Id: getNextUserId(),
        username,
        password,
        name,
        profilePic: profilePic || defult_user // Use default picture if none uploaded
      };
      addUser(newUser);
    }
  }

  const handleAlertClose = () => {
    setAlertVisible(false); // Hide alert
    navigate('/'); // Navigate to login page
  };



  return (
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="login-container text-center">
        <h2 class="mb-4">Registration</h2>
        <form onSubmit={handleRegister}>
          <div class="mb-3">
            <input type="email" class="form-control" id="username" placeholder="Username" required
              onChange={(e) => setUsername(e.target.value)}></input>
          </div>
          {alertUsername && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {alertUsername}
            </div>
          )}
          <div class="mb-3">
            <input type="password" class="form-control" id="password" placeholder="Password" required
              onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          {alertPassword && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {alertPassword}
            </div>
          )}
          <div class="mb-3">
            <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" required
              onChange={(e) => SetConfirmPassword(e.target.value)}></input>
          </div>
          {alertConfirmPassword && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {alertConfirmPassword}
            </div>
          )}
          <div class="mb-3">
            <input type="text" class="form-control" id="display-name" placeholder="Display Name" required
              onChange={(e) => SetName(e.target.value)}></input>
          </div>
          <div class="mb-3">
            <input type="file" class="form-control" id="profile-pic" accept="image/*"
              onChange={(e) => SetProfilePic(e.target.files[0])}></input>
          </div>
          <div class="d-grid mb-3">
            <button type="submit" class="btn login-btn btn-lg">Register</button>
          </div>
        </form>

        {alertVisible && (
          <div className="alert alert-success fade show" role="alert">
            <strong>You have successfully registered</strong> Clicking will take you to the login.
            <button type="button" className="btn-close" onClick={handleAlertClose} aria-label="Close"></button>
          </div>
        )}

        <div>
          <Link to="/" className="register-btn">You already have a user</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;