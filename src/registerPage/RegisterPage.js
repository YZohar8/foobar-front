import './RegisterPage.css';
import AlertRegister from '../alertRegister/AlertRegister.js';
import defaultPic from '../pictures/defult_user.jpg';
import { addUser } from '../connectToDB/usersConnectToDB.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorNote from '../errorNote/ErrorNote.js';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(defaultPic); // For preview and passing to ProfileCard
  const [errorNote, setErrorNote] = useState(null);
  const [alert, setAlert] = useState('');

  const openModal = () => {
    const myModal = new window.bootstrap.Modal(document.getElementById('registerSuccessModal'));
    myModal.show();
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAlert('');
    
    const passwordIsValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password); // Validate password
    let flag = false;

    if (!passwordIsValid) {
      setAlert("Password must be between 8 and 15 characters and contain both letters and numbers.");
      flag = true;
    }

    if (!isValidEmail(username)) {
      setAlert("the email is not legal.");
      flag = true;
    }

    if (password !== confirmPassword) {
      setAlert("Password verification is not the same as a password.");
      flag = true;
    }

    if (flag) {
      return;
    }

    const profileImage = profilePic ? profilePic : defaultPic;
    // Add the user to the database
    const newUser = {
      name, 
      email: username,
      password,
      image: profileImage,
      friendsList: [],
    };
    let answer = await addUser(e, newUser);
    if (answer !== 'User created successfully!') {
      setErrorNote(answer);
      return;
    }

    setErrorNote(null);
    openModal();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      // When the file is read, set the base64 encoded image
      reader.onloadend = () => {
        const base64Image = reader.result; 
        setProfilePic(base64Image); 
        setProfilePicUrl(base64Image); 
      };

      // Read the file as a data URL (Base64)
      reader.readAsDataURL(file);
    } else {
      setProfilePicUrl(defaultPic); // If no file is selected, use default image
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-container text-center">
        <h2 className="mb-4">Registration</h2>
        <img src={profilePicUrl} alt="Profile Preview" className="profile-pic" />
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input type="email" className="form-control" id="username" placeholder="Username" required
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="password" placeholder="Password" required
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="confirm-password" placeholder="Confirm Password" required
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="display-name" placeholder="Display Name" required
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="file" className="form-control" id="profile-pic" accept="image/*"
              onChange={handleFileChange} />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn login-btn btn-lg">Register</button>
          </div>
        </form>
        {alert && (
          <div className="invalid-feedback" style={{ display: 'block' }}>
            {alert}
          </div>
        )}
        <div>
          <Link to="/" className="register-btn">I already have a user</Link>
        </div>
      </div>
      <AlertRegister header="You have successfully registered" text="Go to the login page to log in to the system" textbtn="login" path="/" />
      {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)} />}
    </div>
  );
}

export default RegisterPage;
