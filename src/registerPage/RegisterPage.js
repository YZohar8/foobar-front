import './RegisterPage.css'
import AlertRegister from '../alertRegister/AlertRegister.js';
import defaultPic from '../pictures/defult_user.jpg'
import { addUser, checkUserByUsername } from '../fakeDatabase/usersFakeDatabase.js'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorNote from '../errorNote/ErrorNote.js';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, SetConfirmPassword] = useState('');
  const [name, SetName] = useState('');
  const [profilePic, SetProfilePic] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(defaultPic); // For preview and passing to ProfileCard
  const [errorNote, setErrorNote] = useState(null);

  const [alertConfirmPassword, SetAlertConfirmPassword] = useState('');
  const [alertPassword, SetAlertPassword] = useState('');
  const [alertUsername, SetAlertUsername] = useState('');




  const openModal = () => {
    const myModal = new window.bootstrap.Modal(document.getElementById('registerSuccessModal'));
    myModal.show();
  };


  const handleRegister = (e) => {
    e.preventDefault();
    SetAlertConfirmPassword('');
    SetAlertPassword('');
    SetAlertUsername('');


    const passwordIsValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password); // Validate password
    let flag = false;

    if (!passwordIsValid) {
      SetAlertPassword("Password must be between 8 and 15 characters and contain both letters and numbers.");
      flag = true;
    }

    if (password !== confirmPassword) {
      SetAlertConfirmPassword("Password verification is not the same as a password.");
      flag = true;
    }

    if (checkUserByUsername(username)) {
      SetAlertUsername('The username exists in the system.');
      flag = true;
    }

    console.log(flag);
    if (flag) {
      return;
    }

    const profileImage = profilePic || defaultPic;
      // Add the user to the temporary database
      const newUser = {
        username,
        password,
        name,
        profilePic: profileImage,
        profilePicUrl: null,
        friendsList: [],
        friendsRequests: []
      };
      if (!addUser(newUser)) {
        setErrorNote("problem with create new user");
        return;
      }
      setErrorNote(null);
      openModal();
    
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
        <img src={profilePicUrl} alt="Profile Preview" className="profile-pic" />
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
          <div className="d-grid mb-3">
            <button type="submit" className="btn login-btn btn-lg">Register</button>
          </div>
        </form>
        <div>
          <Link to="/" className="register-btn">I already have a user</Link>
        </div>
      </div>
      <AlertRegister header="You have successfully registered" text="Go to the login page to log in to the system" textbtn="login" path="/" />
      {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)}/>}
    </div>
  );
}

export default RegisterPage;