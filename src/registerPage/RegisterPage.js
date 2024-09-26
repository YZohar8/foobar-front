import './RegisterPage.css'
import AlertRegister from '../alertRegister/AlertRegister.js';
import defaultPic from '../pictures/defult_user.jpg'
import {  addUser, checkUserByUsername } from '../fakeDatabase/usersFakeDatabase.js'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, SetConfirmPassword] = useState('');
  const [name, SetName] = useState('');
  const [profilePic, SetProfilePic] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(defaultPic); // For preview and passing to ProfileCard
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfirmPassword, SetAlertConfirmPassword] = useState('');
  const [alertPassword, SetAlertPassword] = useState('');
  const [alertUsername, SetAlertUsername] = useState('');




  const openModal = () => {
    const myModal = new window.bootstrap.Modal(document.getElementById('registerSuccessModal'));
    myModal.show();
};


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

    const profileImageUrl = profilePicUrl || defaultPic;

    if (setAlertVisible) {
      // Add the user to the temporary database
      const newUser = {
        username,
        password,
        name,
        profilePic: profileImageUrl
      };
      addUser(newUser);
      openModal();
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      SetProfilePic(file); // Store the file
      setProfilePicUrl(URL.createObjectURL(file)); // Generate a URL for preview and profile
    } else {
      setProfilePicUrl(defaultPic); // If no file is selected, use default image
    }
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
              onChange={handleFileChange}></input>
          </div>
          <div class="d-grid mb-3">
            <button type="submit" class="btn login-btn btn-lg">Register</button>
          </div>
        </form>
        <div>
          <Link to="/" className="register-btn">You already have a user</Link>
        </div>
      </div>
      <AlertRegister header="You have successfully registered" text="Go to the login page to log in to the system" textbtn="login" path="/"/>
    </div>
  );
}

export default RegisterPage;